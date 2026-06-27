import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Mail,
  Video,
  HardDrive,
  FileSpreadsheet,
  Calendar,
  RefreshCw,
  Check,
  LogOut,
  LogIn,
  ExternalLink,
  Plus,
  Clock,
  Sparkles,
  Upload,
  AlertCircle,
  CheckCircle,
  FileText
} from "lucide-react";
import {
  googleSignIn,
  logout,
  initAuth,
  getAccessToken,
  sendGmailEmail,
  createCalendarEvent,
  listCalendarEvents,
  listDriveFiles,
  uploadFileToDrive,
  createGoogleSheet
} from "../lib/googleWorkspace";
import { User } from "firebase/auth";

interface WorkspaceIntegrationsProps {
  buyerLeads: any[];
  accentColor?: string;
}

export const WorkspaceIntegrations: React.FC<WorkspaceIntegrationsProps> = ({
  buyerLeads,
  accentColor = "amber"
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  // Service States
  const [events, setEvents] = useState<any[]>([]);
  const [driveFiles, setDriveFiles] = useState<any[]>([]);
  const [sheetUrl, setSheetUrl] = useState<string | null>(null);

  // Widget Form States
  const [emailTo, setEmailTo] = useState("");
  const [emailSubject, setEmailSubject] = useState("Atualização Imobiliária - Grupo Leandro Rodrigues");
  const [emailBody, setEmailBody] = useState("<p>Prezado cliente,<br><br>Gostaria de agendar uma conversa sobre as novas opções imobiliárias em Teresópolis.<br><br>Atenciosamente,<br><strong>Leandro Rodrigues Imóveis</strong></p>");
  const [emailStatus, setEmailStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const [calSummary, setCalSummary] = useState("Visita ao Imóvel - Grupo Leandro Rodrigues");
  const [calDesc, setCalDesc] = useState("Apresentação das casas em condomínio na Serra.");
  const [calDate, setCalDate] = useState("");
  const [calTime, setCalTime] = useState("");
  const [calAttendee, setCalAttendee] = useState("");
  const [calCreateMeet, setCalCreateMeet] = useState(true);
  const [calStatus, setCalStatus] = useState<{ success?: boolean; message?: string; hangoutLink?: string } | null>(null);

  const [driveFileName, setDriveFileName] = useState("leads-comerciais.txt");
  const [driveFileContent, setDriveFileContent] = useState("Relatório de Leads imobiliários captados no painel de inteligência.");
  const [driveStatus, setDriveStatus] = useState<{ success?: boolean; message?: string; link?: string } | null>(null);

  const [sheetStatus, setSheetStatus] = useState<{ success?: boolean; message?: string; url?: string } | null>(null);

  // Load auth state and prefilled lead info
  useEffect(() => {
    const prefilledEmail = sessionStorage.getItem("workspace_prefill_email");
    const prefilledName = sessionStorage.getItem("workspace_prefill_name");
    
    if (prefilledEmail) {
      setEmailTo(prefilledEmail);
      setCalAttendee(prefilledEmail);
      if (prefilledName) {
        setEmailBody(`<p>Prezado(a) <strong>${prefilledName}</strong>,<br><br>Gostaria de agendar uma conversa sobre as novas opções imobiliárias em Teresópolis.<br><br>Atenciosamente,<br><strong>Leandro Rodrigues Imóveis</strong></p>`);
        setCalSummary(`Reunião de Apresentação - ${prefilledName}`);
      }
      // Keep in session for a moment then clean up
      sessionStorage.removeItem("workspace_prefill_email");
      sessionStorage.removeItem("workspace_prefill_name");
    }

    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setLoading(false);
        // Pre-load data
        loadWorkspaceData(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  const loadWorkspaceData = async (accessToken: string) => {
    try {
      const [calEvents, files] = await Promise.all([
        listCalendarEvents(accessToken).catch(() => []),
        listDriveFiles(accessToken).catch(() => [])
      ]);
      setEvents(calEvents);
      setDriveFiles(files);
    } catch (err) {
      console.error("Erro ao carregar dados do Workspace:", err);
    }
  };

  const handleConnect = async () => {
    try {
      setActionLoading("connect");
      const res = await googleSignIn();
      if (res) {
        setUser(res.user);
        setToken(res.accessToken);
        loadWorkspaceData(res.accessToken);
      }
    } catch (err: any) {
      alert("Falha na autenticação do Google Workspace: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDisconnect = async () => {
    try {
      setActionLoading("disconnect");
      await logout();
      setUser(null);
      setToken(null);
      setEvents([]);
      setDriveFiles([]);
      setSheetUrl(null);
    } catch (err: any) {
      alert("Erro ao desconectar: " + err.message);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setActionLoading("email");
      setEmailStatus(null);
      await sendGmailEmail(token, emailTo, emailSubject, emailBody);
      setEmailStatus({ success: true, message: "E-mail enviado com sucesso via Gmail!" });
      setEmailTo("");
    } catch (err: any) {
      setEmailStatus({ success: false, message: err.message || "Falha ao enviar e-mail." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleCreateMeeting = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setActionLoading("calendar");
      setCalStatus(null);

      const startTime = `${calDate}T${calTime || "14:00"}:00`;
      const endHour = parseInt((calTime || "14:00").split(":")[0]) + 1;
      const endHourStr = endHour < 10 ? `0${endHour}` : `${endHour}`;
      const endTime = `${calDate}T${endHourStr}:00:00`;

      const result = await createCalendarEvent(token, {
        summary: calSummary,
        description: calDesc,
        startTime,
        endTime,
        attendeeEmail: calAttendee || undefined,
        createMeet: calCreateMeet
      });

      setCalStatus({
        success: true,
        message: "Compromisso agendado na agenda com sucesso!",
        hangoutLink: result.hangoutLink || result.conferenceData?.entryPoints?.[0]?.uri
      });

      // Reload events list
      const calEvents = await listCalendarEvents(token).catch(() => []);
      setEvents(calEvents);

      // Reset fields
      setCalDate("");
      setCalTime("");
      setCalAttendee("");
    } catch (err: any) {
      setCalStatus({ success: false, message: err.message || "Falha ao agendar compromisso." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleUploadDriveFile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    try {
      setActionLoading("drive");
      setDriveStatus(null);
      const result = await uploadFileToDrive(token, driveFileName, driveFileContent, "text/plain");
      setDriveStatus({
        success: true,
        message: "Arquivo criado com sucesso no seu Google Drive!",
        link: result.webViewLink
      });

      // Reload files
      const files = await listDriveFiles(token).catch(() => []);
      setDriveFiles(files);
      setDriveFileName("leads-comerciais.txt");
      setDriveFileContent("");
    } catch (err: any) {
      setDriveStatus({ success: false, message: err.message || "Falha no envio para o Drive." });
    } finally {
      setActionLoading(null);
    }
  };

  const handleExportLeadsToSheets = async () => {
    if (!token) return;
    try {
      setActionLoading("sheets");
      setSheetStatus(null);

      const headers = [
        "ID",
        "Categoria",
        "Nome do Lead",
        "Telefone",
        "E-mail",
        "Bairro de Interesse",
        "Tipo de Imóvel",
        "Orçamento",
        "Data de Entrada"
      ];

      const rows = buyerLeads.map((lead) => [
        lead.id || "",
        lead.category || "",
        lead.title || lead.contactName || "",
        lead.contactPhone || "",
        lead.contactEmail || "",
        lead.region || lead.bairro || "",
        lead.propertyType || "",
        lead.value || lead.price || "",
        lead.date || ""
      ]);

      const timestamp = new Date().toLocaleDateString("pt-BR");
      const title = `CRM Leads - Grupo Leandro Rodrigues (${timestamp})`;

      const result = await createGoogleSheet(token, title, headers, rows);

      setSheetStatus({
        success: true,
        message: "Todos os Leads foram exportados para o Google Sheets com sucesso!",
        url: result.spreadsheetUrl
      });
      setSheetUrl(result.spreadsheetUrl);
    } catch (err: any) {
      setSheetStatus({ success: false, message: err.message || "Erro ao exportar planilhas." });
    } finally {
      setActionLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 bg-white border border-[#1A1A1A]/10 p-8 rounded-sm space-y-4">
        <RefreshCw className="h-8 w-8 text-neutral-400 animate-spin" />
        <p className="text-xs text-neutral-500 font-mono">Carregando conexões seguras do Google...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Cabecalho Principal */}
      <div className="bg-[#F3F1ED] border border-[#1A1A1A]/10 p-6 md:p-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-amber-600 animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 font-mono">
                Google Workspace Suite Oficial
              </span>
            </div>
            <h2 className="font-serif italic text-2xl md:text-3xl text-[#1A1A1A]">
              Central de Integrações & Workspace APIs
            </h2>
            <p className="text-xs text-[#1A1A1A]/60 max-w-2xl leading-relaxed">
              Vincule sua conta oficial do Google para automatizar tarefas cotidianas de captação, agendamento de visitas, acompanhamento de clientes e relatórios Live do Grupo Leandro Rodrigues.
            </p>
          </div>

          <div>
            {!user ? (
              <button
                onClick={handleConnect}
                disabled={actionLoading === "connect"}
                className="px-5 py-2.5 bg-neutral-900 hover:bg-[#5A5A40] text-white text-[11px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-md disabled:bg-neutral-300"
              >
                {actionLoading === "connect" ? (
                  <RefreshCw className="h-4 w-4 animate-spin" />
                ) : (
                  <LogIn className="h-4 w-4" />
                )}
                <span>Vincular Conta Google</span>
              </button>
            ) : (
              <div className="flex items-center gap-4 bg-white border border-emerald-500/20 px-4 py-2.5 rounded-sm">
                {user.photoURL && (
                  <img src={user.photoURL} alt="Avatar" className="w-8 h-8 rounded-full border border-neutral-200" referrerPolicy="no-referrer" />
                )}
                <div className="text-left">
                  <p className="text-[10px] font-extrabold text-[#1A1A1A] truncate max-w-[150px]">{user.displayName || "Google User"}</p>
                  <p className="text-[9px] font-mono text-emerald-700 truncate max-w-[150px]">{user.email}</p>
                </div>
                <button
                  onClick={handleDisconnect}
                  disabled={actionLoading === "disconnect"}
                  className="p-1.5 text-neutral-400 hover:text-red-600 transition-colors"
                  title="Sair da Conta Google"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {!user ? (
        /* Estado Desconectado */
        <div className="bg-white border border-[#1A1A1A]/10 p-8 text-center max-w-3xl mx-auto space-y-6 rounded-sm">
          <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto text-neutral-400">
            <LogIn className="h-7 w-7" />
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#1A1A1A] font-mono">Conecte o seu Google Workspace</h3>
            <p className="text-xs text-neutral-500 max-w-md mx-auto leading-relaxed">
              Uma vez autenticado, você terá acesso imediato às ferramentas imobiliárias com suporte a Gmail, Google Meet, Google Calendar, Google Drive e Google Sheets.
            </p>
          </div>
          <button
            onClick={handleConnect}
            className="px-6 py-3 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer inline-flex items-center gap-2"
          >
            <LogIn className="h-4 w-4" />
            <span>Conectar Agora</span>
          </button>
        </div>
      ) : (
        /* Estado Conectado: Dashboard de APIs Workspace */
        <div className="space-y-8">
          {/* Status das APIs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: "Gmail API", desc: "Envio de alertas e e-mails", icon: Mail, color: "text-red-600 bg-red-50" },
              { name: "Google Meet", desc: "Geração de salas de vídeo", icon: Video, color: "text-blue-600 bg-blue-50" },
              { name: "Google Drive", desc: "Backup e mídias de imóveis", icon: HardDrive, color: "text-emerald-600 bg-emerald-50" },
              { name: "Google Sheets", desc: "Planilha ativa de leads", icon: FileSpreadsheet, color: "text-green-600 bg-green-50" },
              { name: "Google Calendar", desc: "Agendamento imobiliário", icon: Calendar, color: "text-indigo-600 bg-indigo-50" }
            ].map((api) => {
              const ApiIcon = api.icon;
              return (
                <div key={api.name} className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm flex flex-col justify-between space-y-3">
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-sm ${api.color}`}>
                      <ApiIcon className="h-5 w-5" />
                    </div>
                    <span className="inline-flex items-center gap-1 text-[8px] font-extrabold font-mono uppercase bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded-sm">
                      <Check className="h-2.5 w-2.5" /> Ativo
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xs font-bold font-mono text-[#1A1A1A]">{api.name}</h4>
                    <p className="text-[10px] text-neutral-400 leading-tight mt-0.5">{api.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* widget 1: GOOGLE SHEETS LIVE EXPORT */}
            <div className="bg-white border border-[#1A1A1A]/10 p-6 space-y-4 rounded-sm">
              <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                <FileSpreadsheet className="h-5 w-5 text-green-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                  Google Sheets Lead Sync
                </h3>
              </div>
              <p className="text-xs text-neutral-500 leading-relaxed">
                Gere uma planilha integrada oficial na sua conta do Google Sheets e envie todos os leads registrados no CRM imobiliário com apenas um clique.
              </p>

              <div className="bg-[#FAF9F6] p-4 border border-[#1A1A1A]/5 rounded-sm space-y-3 text-xs">
                <div className="flex justify-between items-center text-[10px] font-mono uppercase font-bold text-neutral-500">
                  <span>Leads no CRM local:</span>
                  <span className="text-[#1A1A1A]">{buyerLeads.length} leads</span>
                </div>
                {sheetUrl && (
                  <div className="bg-green-50 text-green-900 border border-green-200 p-2.5 rounded-xs flex items-center justify-between">
                    <span className="truncate max-w-[200px] font-mono text-[10px]">Planilha criada com sucesso!</span>
                    <a href={sheetUrl} target="_blank" rel="noreferrer" className="text-green-700 font-extrabold hover:underline inline-flex items-center gap-1 text-[10px]">
                      Abrir <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                )}
                {sheetStatus && !sheetStatus.success && (
                  <div className="bg-red-50 text-red-900 border border-red-200 p-2.5 rounded-xs text-[10px] font-mono">
                    ❌ {sheetStatus.message}
                  </div>
                )}
                <button
                  onClick={handleExportLeadsToSheets}
                  disabled={actionLoading === "sheets"}
                  className="w-full py-2.5 bg-green-600 hover:bg-green-700 text-white text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {actionLoading === "sheets" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <FileSpreadsheet className="h-3.5 w-3.5" />
                  )}
                  <span>Exportar Leads para Nova Planilha</span>
                </button>
              </div>
            </div>

            {/* widget 2: GOOGLE CALENDAR & MEET SCHEDULER */}
            <div className="bg-white border border-[#1A1A1A]/10 p-6 space-y-4 rounded-sm">
              <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                  Agendar Visita & Google Meet
                </h3>
              </div>
              
              <form onSubmit={handleCreateMeeting} className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Título do Evento</label>
                    <input
                      required
                      type="text"
                      value={calSummary}
                      onChange={(e) => setCalSummary(e.target.value)}
                      className="w-full p-2 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 mb-1">E-mail do Cliente</label>
                    <input
                      type="email"
                      placeholder="cliente@email.com"
                      value={calAttendee}
                      onChange={(e) => setCalAttendee(e.target.value)}
                      className="w-full p-2 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Data</label>
                    <input
                      required
                      type="date"
                      value={calDate}
                      onChange={(e) => setCalDate(e.target.value)}
                      className="w-full p-2 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Horário de Início</label>
                    <input
                      required
                      type="time"
                      value={calTime}
                      onChange={(e) => setCalTime(e.target.value)}
                      className="w-full p-2 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between py-1 bg-neutral-50 px-2 border border-neutral-100 rounded-sm">
                  <div className="flex items-center gap-2">
                    <Video className="h-4 w-4 text-blue-600" />
                    <span className="text-[10px] font-bold uppercase font-mono">Gerar Link do Google Meet</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={calCreateMeet}
                    onChange={(e) => setCalCreateMeet(e.target.checked)}
                    className="h-4 w-4 accent-neutral-900 cursor-pointer"
                  />
                </div>

                {calStatus && (
                  <div className={`p-3 rounded-xs text-[10px] leading-normal font-mono border ${calStatus.success ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-red-50 border-red-200 text-red-900"}`}>
                    <p>{calStatus.message}</p>
                    {calStatus.hangoutLink && (
                      <div className="mt-1.5 flex items-center justify-between bg-white border border-emerald-100 p-1 px-2 rounded-xs">
                        <span className="truncate max-w-[150px] text-[9px] text-neutral-400">{calStatus.hangoutLink}</span>
                        <a href={calStatus.hangoutLink} target="_blank" rel="noreferrer" className="text-blue-600 font-bold hover:underline inline-flex items-center gap-0.5 text-[9px]">
                          Participar <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={actionLoading === "calendar"}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {actionLoading === "calendar" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Calendar className="h-3.5 w-3.5" />
                  )}
                  <span>Agendar Compromisso</span>
                </button>
              </form>
            </div>

            {/* widget 3: GMAIL QUICK DISPATCH */}
            <div className="bg-white border border-[#1A1A1A]/10 p-6 space-y-4 rounded-sm">
              <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                <Mail className="h-5 w-5 text-red-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                  Gmail Quick Dispatcher
                </h3>
              </div>
              
              <form onSubmit={handleSendEmail} className="space-y-3 text-xs">
                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Destinatário (E-mail)</label>
                  <input
                    required
                    type="email"
                    placeholder="exemplo@email.com"
                    value={emailTo}
                    onChange={(e) => setEmailTo(e.target.value)}
                    className="w-full p-2 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Assunto</label>
                  <input
                    required
                    type="text"
                    value={emailSubject}
                    onChange={(e) => setEmailSubject(e.target.value)}
                    className="w-full p-2 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                  />
                </div>

                <div>
                  <label className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 mb-1">Mensagem (HTML Suportado)</label>
                  <textarea
                    required
                    rows={3}
                    value={emailBody}
                    onChange={(e) => setEmailBody(e.target.value)}
                    className="w-full p-2 bg-[#FAF9F6] border border-[#1A1A1A]/10 text-xs font-mono focus:outline-none focus:border-neutral-500"
                  />
                </div>

                {emailStatus && (
                  <div className={`p-2.5 rounded-xs text-[10px] font-mono border ${emailStatus.success ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-red-50 border-red-200 text-red-900"}`}>
                    {emailStatus.success ? "✓" : "❌"} {emailStatus.message}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={actionLoading === "email"}
                  className="w-full py-2 bg-red-600 hover:bg-red-700 text-white text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  {actionLoading === "email" ? (
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                  ) : (
                    <Mail className="h-3.5 w-3.5" />
                  )}
                  <span>Enviar E-mail Oficial</span>
                </button>
              </form>
            </div>

            {/* widget 4: GOOGLE DRIVE FILE CABINET */}
            <div className="bg-white border border-[#1A1A1A]/10 p-6 space-y-4 rounded-sm">
              <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                <HardDrive className="h-5 w-5 text-emerald-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                  Google Drive File Cabinet
                </h3>
              </div>

              {/* Upload Form */}
              <form onSubmit={handleUploadDriveFile} className="space-y-3 bg-[#FAF9F6] p-4 border border-[#1A1A1A]/5 rounded-sm text-xs">
                <span className="text-[9px] font-extrabold font-mono uppercase text-emerald-800 tracking-wider">Criar Arquivo de Texto no Drive</span>
                
                <div className="grid grid-cols-1 gap-2 mt-1">
                  <input
                    required
                    type="text"
                    value={driveFileName}
                    onChange={(e) => setDriveFileName(e.target.value)}
                    className="w-full p-2 bg-white border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                  />
                  <textarea
                    required
                    rows={2}
                    placeholder="Conteúdo do arquivo imobiliário..."
                    value={driveFileContent}
                    onChange={(e) => setDriveFileContent(e.target.value)}
                    className="w-full p-2 bg-white border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-neutral-500"
                  />
                </div>

                {driveStatus && (
                  <div className={`p-2 rounded-xs text-[10px] leading-normal font-mono border ${driveStatus.success ? "bg-emerald-50 border-emerald-200 text-emerald-900" : "bg-red-50 border-red-200 text-red-900"}`}>
                    <p>{driveStatus.message}</p>
                    {driveStatus.link && (
                      <a href={driveStatus.link} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline font-bold mt-1 inline-flex items-center gap-1 text-[9px]">
                        Abrir Arquivo <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={actionLoading === "drive"}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Upload className="h-3.5 w-3.5" />
                  <span>Upload para o Google Drive</span>
                </button>
              </form>

              {/* Files List */}
              <div className="space-y-2 max-h-[160px] overflow-y-auto pr-1">
                <span className="text-[9px] font-extrabold font-mono uppercase text-neutral-500">Arquivos Recentes no Drive:</span>
                {driveFiles.length === 0 ? (
                  <p className="text-[10px] font-mono text-neutral-400">Nenhum arquivo imobiliário listado.</p>
                ) : (
                  <div className="space-y-1.5">
                    {driveFiles.map((f) => (
                      <div key={f.id} className="flex items-center justify-between p-2 bg-neutral-50 hover:bg-neutral-100 border border-neutral-100 transition-colors rounded-xs text-[10px]">
                        <div className="flex items-center gap-2 truncate pr-4">
                          <FileText className="h-3.5 w-3.5 text-neutral-500 shrink-0" />
                          <span className="truncate text-neutral-700 font-mono font-medium">{f.name}</span>
                        </div>
                        <a href={f.webViewLink} target="_blank" rel="noreferrer" className="text-neutral-500 hover:text-neutral-900 font-bold uppercase tracking-wider text-[8px] border border-neutral-200 bg-white p-1 px-1.5 rounded-sm shrink-0 inline-flex items-center gap-0.5">
                          Ver <ExternalLink className="h-2.5 w-2.5" />
                        </a>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Agenda Eventos List */}
          <div className="bg-white border border-[#1A1A1A]/10 p-6 space-y-4 rounded-sm">
            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-indigo-600" />
                <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                  Seus Próximos Compromissos (Google Agenda Live)
                </h3>
              </div>
              <button
                onClick={() => token && loadWorkspaceData(token)}
                className="p-1 text-neutral-400 hover:text-[#1A1A1A] transition-colors"
                title="Sincronizar compromissos"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </div>

            {events.length === 0 ? (
              <div className="py-8 text-center text-neutral-400 font-mono text-[11px]">
                Nenhum compromisso agendado para os próximos dias no Google Agenda.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {events.map((ev) => {
                  const hasMeet = ev.hangoutLink || ev.conferenceData?.entryPoints?.[0]?.uri;
                  return (
                    <div key={ev.id} className="p-4 bg-neutral-50 hover:bg-neutral-100/85 border border-[#1A1A1A]/5 rounded-sm transition-all text-xs flex flex-col justify-between space-y-3">
                      <div className="space-y-1.5">
                        <div className="flex items-start justify-between">
                          <h4 className="font-serif italic font-bold text-sm text-[#1A1A1A] line-clamp-1">{ev.summary}</h4>
                          <span className="text-[9px] font-mono bg-indigo-50 text-indigo-800 border border-indigo-200 px-1.5 py-0.5 rounded-xs">
                            {new Date(ev.start?.dateTime || ev.start?.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                        <p className="text-[10px] text-neutral-500 line-clamp-2 leading-relaxed">{ev.description || "Sem descrição."}</p>
                      </div>

                      <div className="flex items-center justify-between border-t border-neutral-200/50 pt-2 text-[10px]">
                        <span className="font-mono text-neutral-400">
                          {new Date(ev.start?.dateTime).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                        </span>
                        {hasMeet && (
                          <a
                            href={hasMeet}
                            target="_blank"
                            rel="noreferrer"
                            className="bg-blue-600 hover:bg-blue-700 text-white font-extrabold px-2.5 py-1 rounded-sm uppercase tracking-wider text-[9px] inline-flex items-center gap-1 shadow-sm"
                          >
                            <Video className="h-3 w-3" /> Meet <ExternalLink className="h-2.5 w-2.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
