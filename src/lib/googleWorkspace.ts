import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, User } from "firebase/auth";
import firebaseConfig from "../../firebase-applet-config.json";

// Initialize Firebase App safely (avoiding multiple initializations)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const auth = getAuth(app);

// Provider with required Google Workspace Scopes
const provider = new GoogleAuthProvider();

// Scopes requested by the application
const SCOPES = [
  "https://mail.google.com/",
  "https://www.googleapis.com/auth/gmail.compose",
  "https://www.googleapis.com/auth/gmail.send",
  "https://www.googleapis.com/auth/meetings.space.created",
  "https://www.googleapis.com/auth/drive",
  "https://www.googleapis.com/auth/drive.file",
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/calendar",
  "https://www.googleapis.com/auth/calendar.events"
];

// Add each scope to provider
SCOPES.forEach((scope) => {
  provider.addScope(scope);
});

// Prompt option to ensure permissions are asked
provider.setCustomParameters({
  prompt: "consent"
});

let isSigningIn = false;
let cachedAccessToken: string | null = null;

// Initialize auth state listener
export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  // Try retrieving from session cache first
  const storedToken = sessionStorage.getItem("google_workspace_token");
  if (storedToken) {
    cachedAccessToken = storedToken;
  }

  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user && cachedAccessToken) {
      if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
    } else {
      if (!isSigningIn) {
        cachedAccessToken = null;
        sessionStorage.removeItem("google_workspace_token");
        if (onAuthFailure) onAuthFailure();
      }
    }
  });
};

// Sign in with Google Popup
export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error("Não foi possível obter o Token de Acesso do Google Auth.");
    }

    cachedAccessToken = credential.accessToken;
    sessionStorage.setItem("google_workspace_token", cachedAccessToken);
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error("Erro no login do Google Workspace:", error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

// Get current Access Token
export const getAccessToken = (): string | null => {
  if (!cachedAccessToken) {
    cachedAccessToken = sessionStorage.getItem("google_workspace_token");
  }
  return cachedAccessToken;
};

// Log Out from Google Workspace
export const logout = async () => {
  await auth.signOut();
  cachedAccessToken = null;
  sessionStorage.removeItem("google_workspace_token");
};

/**
 * ============================================================================
 * GMAIL API INTEGRATION
 * ============================================================================
 */
export const sendGmailEmail = async (
  accessToken: string,
  to: string,
  subject: string,
  bodyText: string
): Promise<any> => {
  // Construct RFC 2822 compliant email message
  const emailLines = [
    `To: ${to}`,
    `Subject: =?utf-8?B?${btoa(unescape(encodeURIComponent(subject)))}?=`,
    "MIME-Version: 1.0",
    "Content-Type: text/html; charset=utf-8",
    "Content-Transfer-Encoding: 7bit",
    "",
    bodyText
  ];

  const emailContent = emailLines.join("\r\n");
  
  // Base64url encode the message
  const base64Encoded = btoa(unescape(encodeURIComponent(emailContent)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");

  const response = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/messages/send", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      raw: base64Encoded
    })
  });

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Erro ao enviar e-mail via Gmail.");
  }

  return response.json();
};

/**
 * ============================================================================
 * GOOGLE CALENDAR & MEET INTEGRATION
 * ============================================================================
 */
interface CalendarEventInput {
  summary: string;
  description: string;
  startTime: string; // ISO String
  endTime: string;   // ISO String
  attendeeEmail?: string;
  createMeet?: boolean;
}

export const createCalendarEvent = async (
  accessToken: string,
  event: CalendarEventInput
): Promise<any> => {
  const body: any = {
    summary: event.summary,
    description: event.description,
    start: {
      dateTime: event.startTime,
      timeZone: "America/Sao_Paulo"
    },
    end: {
      dateTime: event.endTime,
      timeZone: "America/Sao_Paulo"
    }
  };

  if (event.attendeeEmail) {
    body.attendees = [{ email: event.attendeeEmail }];
  }

  if (event.createMeet) {
    body.conferenceData = {
      createRequest: {
        requestId: `meet-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
        conferenceSolutionKey: {
          type: "hangoutsMeet"
        }
      }
    };
  }

  const response = await fetch(
    "https://www.googleapis.com/calendar/v3/calendars/primary/events?conferenceDataVersion=1",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Erro ao criar compromisso na agenda.");
  }

  return response.json();
};

export const listCalendarEvents = async (accessToken: string): Promise<any[]> => {
  const response = await fetch(
    `https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true&timeMin=${new Date().toISOString()}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao carregar compromissos do Google Agenda.");
  }

  const data = await response.json();
  return data.items || [];
};

/**
 * ============================================================================
 * GOOGLE DRIVE API INTEGRATION
 * ============================================================================
 */
export const listDriveFiles = async (accessToken: string): Promise<any[]> => {
  const response = await fetch(
    "https://www.googleapis.com/drive/v3/files?pageSize=15&q=mimeType%20%3D%20%27application%2Fvnd.google-apps.spreadsheet%27%20or%20mimeType%20%3D%20%27text%2Fplain%27%20or%20mimeType%20%3D%20%27application%2Fpdf%27&fields=files(id,name,mimeType,webViewLink,iconLink,modifiedTime)",
    {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }
  );

  if (!response.ok) {
    throw new Error("Erro ao listar arquivos do Google Drive.");
  }

  const data = await response.json();
  return data.files || [];
};

export const uploadFileToDrive = async (
  accessToken: string,
  name: string,
  content: string,
  mimeType: string = "text/plain"
): Promise<any> => {
  const metadata = {
    name,
    mimeType
  };

  const formData = new FormData();
  formData.append(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  formData.append("file", new Blob([content], { type: mimeType }));

  const response = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`
      },
      body: formData
    }
  );

  if (!response.ok) {
    const errData = await response.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Erro ao carregar arquivo para o Google Drive.");
  }

  return response.json();
};

/**
 * ============================================================================
 * GOOGLE SHEETS API INTEGRATION
 * ============================================================================
 */
export const createGoogleSheet = async (
  accessToken: string,
  title: string,
  headers: string[],
  rows: any[][]
): Promise<any> => {
  // 1. Create empty Spreadsheet
  const createRes = await fetch("https://sheets.googleapis.com/v4/spreadsheets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      properties: {
        title
      }
    })
  });

  if (!createRes.ok) {
    const errData = await createRes.json().catch(() => ({}));
    throw new Error(errData.error?.message || "Erro ao criar planilha no Sheets.");
  }

  const sheetData = await createRes.json();
  const spreadsheetId = sheetData.spreadsheetId;

  // 2. Append values
  const allRows = [headers, ...rows];
  const updateRes = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/Sheet1!A1:append?valueInputOption=USER_ENTERED`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        range: "Sheet1!A1",
        majorDimension: "ROWS",
        values: allRows
      })
    }
  );

  if (!updateRes.ok) {
    throw new Error("Planilha criada, mas falhou ao gravar os dados dos Leads.");
  }

  return {
    spreadsheetId,
    spreadsheetUrl: sheetData.spreadsheetUrl
  };
};
