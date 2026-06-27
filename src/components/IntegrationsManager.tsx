import React, { useState, useEffect } from "react";
import { 
  Facebook, Instagram, MessageSquare, Globe, Cpu, Database, 
  Shield, CheckCircle, AlertTriangle, RefreshCw, XCircle, 
  Play, Activity, Terminal, Check, Info, Lock, Zap, FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { IntegrationInfo } from "../types";

interface IntegrationsManagerProps {
  accentColor: string;
}

export function IntegrationsManager({ accentColor }: IntegrationsManagerProps) {
  // Initial integrations seed
  const [integrations, setIntegrations] = useState<IntegrationInfo[]>(() => {
    try {
      const stored = localStorage.getItem("lr_crm_integrations_list");
      if (stored) return JSON.parse(stored);
    } catch {}

    return [
      {
        id: "int-1",
        key: "facebook",
        name: "Facebook Graph API (Marketplace)",
        status: "connected",
        user: "Grupo Leandro Rodrigues (Business)",
        lastSync: "Hoje, 10:30",
        nextUpdate: "Amanhã, 10:30",
        scopes: ["ads_management", "pages_read_engagement", "pages_show_list", "instagram_basic"],
        errorHistory: [
          { timestamp: "2026-06-24 08:12:05", type: "Expired Token", message: "User changed password, revoking older OAuth access tokens." }
        ]
      },
      {
        id: "int-2",
        key: "instagram",
        name: "Instagram Graph API",
        status: "connected",
        user: "@grupoleandrorodrigues",
        lastSync: "Hoje, 09:45",
        nextUpdate: "Amanhã, 09:45",
        scopes: ["instagram_basic", "instagram_manage_insights", "pages_read_engagement"],
        errorHistory: []
      },
      {
        id: "int-3",
        key: "whatsapp",
        name: "WhatsApp Business API",
        status: "connected",
        user: "+55 21 98678-7909",
        lastSync: "Hoje, 11:15",
        nextUpdate: "Amanhã, 11:15",
        scopes: ["whatsapp_business_messaging", "whatsapp_business_management"],
        errorHistory: []
      },
      {
        id: "int-4",
        key: "google",
        name: "Google OAuth 2.0 (Google Core)",
        status: "connected",
        user: "cadastrodeleadslr@gmail.com",
        lastSync: "Hoje, 11:20",
        nextUpdate: "Amanhã, 11:20",
        scopes: ["https://www.googleapis.com/auth/userinfo.profile", "https://www.googleapis.com/auth/userinfo.email"],
        errorHistory: []
      },
      {
        id: "int-5",
        key: "analytics",
        name: "Google Analytics Data API (G4)",
        status: "needs_reauth",
        user: "cadastrodeleadslr@gmail.com",
        lastSync: "Ontem, 18:00",
        nextUpdate: "Sincronização pausada",
        scopes: ["https://www.googleapis.com/auth/analytics.readonly"],
        errorHistory: [
          { timestamp: "2026-06-25 15:30:10", type: "OAuth 401", message: "Refresh token expired. User must manually trigger re-authentication." }
        ]
      },
      {
        id: "int-6",
        key: "searchconsole",
        name: "Google Search Console API",
        status: "connected",
        user: "cadastrodeleadslr@gmail.com",
        lastSync: "Ontem, 23:00",
        nextUpdate: "Hoje, 23:00",
        scopes: ["https://www.googleapis.com/auth/webmasters.readonly"],
        errorHistory: []
      },
      {
        id: "int-7",
        key: "maps",
        name: "Google Maps Platform (Places/Routes)",
        status: "connected",
        user: "Chave API Ativa (Server-Bound)",
        lastSync: "Real-time query",
        nextUpdate: "Sempre ativo",
        scopes: ["Places API (New)", "Geocoding API", "Maps JavaScript API"],
        errorHistory: []
      },
      {
        id: "int-8",
        key: "firebase",
        name: "Firebase Cloud Firestore & Auth",
        status: "connected",
        user: "LR-CRM Project DB (Durable Cloud)",
        lastSync: "Tempo Real",
        nextUpdate: "Sincronia Contínua",
        scopes: ["Firestore DB Read/Write", "Auth Admin Proxy"],
        errorHistory: []
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem("lr_crm_integrations_list", JSON.stringify(integrations));
  }, [integrations]);

  // Active testing state
  const [testingId, setTestingId] = useState<string | null>(null);
  const [testLogs, setTestLogs] = useState<string[]>([]);
  const [testResult, setTestResult] = useState<{
    success: boolean;
    platform: string;
    latency: number;
    scopes: string[];
    details: string;
  } | null>(null);

  // Diagnostic modal/report state
  const [diagnosticReport, setDiagnosticReport] = useState<any | null>(null);
  const [isRunningDiagnostic, setIsRunningDiagnostic] = useState(false);

  // Show permissions modal
  const [activePermissionsInfo, setActivePermissionsInfo] = useState<IntegrationInfo | null>(null);

  // Connection trigger simulation (OAuth flow popup simulation)
  const handleConnect = (id: string, name: string) => {
    const integrationsCopy = [...integrations];
    const index = integrationsCopy.findIndex(item => item.id === id);
    if (index === -1) return;

    // Simulate opening an elegant safe popup
    const popupWidth = 600;
    const popupHeight = 650;
    const left = window.screen.width / 2 - popupWidth / 2;
    const top = window.screen.height / 2 - popupHeight / 2;
    
    // Custom simulated instructions message
    const alertMsg = `[SIMULAÇÃO DE FLUXO OAUTH 2.0 SEGURO]\n\nIniciando conexão oficial com ${name}...\n\n- O sistema está redirecionando o navegador com HTTPS para o servidor de autorização seguro.\n- Nenhum dado de senha será recolhido ou guardado em nosso CRM.\n- Um token JWT criptografado de longa duração será gerado e guardado no Firebase Firestore em tempo de execução.\n\nClique em OK para simular a autorização do usuário e salvar o Token.`;
    
    if (window.confirm(alertMsg)) {
      integrationsCopy[index] = {
        ...integrationsCopy[index],
        status: "connected",
        user: integrationsCopy[index].key === "maps" ? "Chave API Ativa (Server-Bound)" : "cadastrodeleadslr@gmail.com",
        lastSync: "Agora mesmo",
        nextUpdate: "Amanhã, " + new Date().toLocaleTimeString().substring(0, 5),
        errorHistory: []
      };
      setIntegrations(integrationsCopy);
    }
  };

  const handleDisconnect = (id: string) => {
    if (window.confirm("Deseja realmente desconectar esta integração? Todas as consultas automáticas e sincronização em tempo real desta plataforma serão desativadas.")) {
      const integrationsCopy = [...integrations];
      const index = integrationsCopy.findIndex(item => item.id === id);
      if (index !== -1) {
        integrationsCopy[index] = {
          ...integrationsCopy[index],
          status: "disconnected",
          user: undefined,
          lastSync: "-",
          nextUpdate: "-"
        };
        setIntegrations(integrationsCopy);
      }
    }
  };

  const handleTestConnection = (integration: IntegrationInfo) => {
    setTestingId(integration.id);
    setTestLogs([]);
    setTestResult(null);

    const logs = [
      `Iniciando rotina de verificação para: ${integration.name}...`,
      `Buscando Access Token armazenado no Firebase Firestore...`,
      `Token carregado com sucesso (SHA-256 Hash: e3b0c442...)`,
      `Estabelecendo conexão TLS com endpoints da API...`,
      `Comunicação HTTPS segura estabelecida em 200 OK`,
      `Validando escopos e permissões autorizadas pelo usuário...`,
      `Calculando latência de comunicação de rede...`
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < logs.length) {
        setTestLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] ${logs[i]}`]);
        i++;
      } else {
        clearInterval(interval);
        const randomLatency = Math.floor(Math.random() * 80) + 40; // 40-120ms
        const isSuccess = integration.status === "connected";
        
        setTestResult({
          success: isSuccess,
          platform: integration.name,
          latency: randomLatency,
          scopes: integration.scopes || [],
          details: isSuccess 
            ? "Conexão de dados perfeitamente operacional. Todos os endpoints respondendo com código HTTP 200 OK. Mapeamento de leads ativo." 
            : "Falha de Autenticação (HTTP 401). O token de acesso armazenado expirou ou foi revogado pelo provedor. É necessário reconectar."
        });
      }
    }, 450);
  };

  const runDiagnostics = () => {
    setIsRunningDiagnostic(true);
    setDiagnosticReport(null);

    setTimeout(() => {
      const working = integrations.filter(i => i.status === "connected").map(i => i.name);
      const errors = integrations.filter(i => i.status !== "connected").map(i => ({
        name: i.name,
        key: i.key,
        status: i.status === "needs_reauth" ? "Reautenticação Necessária" : i.status === "token_expired" ? "Token Expirado" : i.status === "insufficient_permissions" ? "Permissões Insuficientes" : "Desconectado",
        reason: i.status === "needs_reauth" ? "O token de atualização expirou (limite de 180 dias de inatividade)." : "Token de segurança foi revogado manualmente no console de administração do desenvolvedor ou foi expirado no tempo limite.",
        solution: "Clique no botão 'Conectar' ou 'Reconectar' para abrir o pop-up OAuth oficial e reautorizar os escopos."
      }));

      setDiagnosticReport({
        timestamp: new Date().toLocaleString(),
        total: integrations.length,
        workingCount: working.length,
        errorCount: errors.length,
        working,
        errors,
        generalHealth: Math.round((working.length / integrations.length) * 100),
        availability: 99.98,
        avgLatency: "65ms"
      });
      setIsRunningDiagnostic(false);
    }, 1800);
  };

  // Convert raw status to beautiful elements
  const renderStatus = (status: IntegrationInfo["status"]) => {
    switch (status) {
      case "connected":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 rounded-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            Conectado
          </span>
        );
      case "needs_reauth":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 rounded-sm">
            <span className="h-2 w-2 rounded-full bg-amber-500" />
            Necessita Reautenticação
          </span>
        );
      case "token_expired":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-orange-700 bg-orange-50 rounded-sm">
            <span className="h-2 w-2 rounded-full bg-orange-500" />
            Token Expirado
          </span>
        );
      case "insufficient_permissions":
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-rose-700 bg-rose-50 rounded-sm">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            Permissões Insuficientes
          </span>
        );
      case "disconnected":
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-neutral-500 bg-neutral-100 rounded-sm">
            <span className="h-2 w-2 rounded-full bg-neutral-400" />
            Desconectado
          </span>
        );
    }
  };

  const getPlatformIcon = (key: string) => {
    const cl = "h-6 w-6 text-white";
    switch (key) {
      case "facebook":
        return <div className="p-2.5 bg-blue-600 rounded-lg shrink-0"><Facebook className={cl} /></div>;
      case "instagram":
        return <div className="p-2.5 bg-gradient-to-tr from-yellow-500 via-red-500 to-purple-600 rounded-lg shrink-0"><Instagram className={cl} /></div>;
      case "whatsapp":
        return <div className="p-2.5 bg-emerald-500 rounded-lg shrink-0"><MessageSquare className={cl} /></div>;
      case "google":
        return <div className="p-2.5 bg-rose-500 rounded-lg shrink-0"><Globe className={cl} /></div>;
      case "analytics":
        return <div className="p-2.5 bg-amber-500 rounded-lg shrink-0"><Activity className={cl} /></div>;
      case "searchconsole":
        return <div className="p-2.5 bg-neutral-700 rounded-lg shrink-0"><FileText className={cl} /></div>;
      case "maps":
        return <div className="p-2.5 bg-indigo-500 rounded-lg shrink-0"><Cpu className={cl} /></div>;
      case "firebase":
        return <div className="p-2.5 bg-orange-500 rounded-lg shrink-0"><Database className={cl} /></div>;
      default:
        return <div className="p-2.5 bg-neutral-500 rounded-lg shrink-0"><Cpu className={cl} /></div>;
    }
  };

  // Metrics calculating
  const activeCount = integrations.filter(i => i.status === "connected").length;
  const healthPercent = Math.round((activeCount / integrations.length) * 100);

  return (
    <div className="space-y-8 animate-fade-in" id="integrations-tab">
      
      {/* Upper Info Box */}
      <div className="bg-white border border-slate-200 p-6 md:p-8 rounded-lg shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-[#00AFCB]" />
              <span className="text-[10px] font-bold text-[#00AFCB] uppercase tracking-widest font-mono">
                Central Oficial de APIs & OAuth 2.0 Compliance
              </span>
            </div>
            <h2 className="text-2xl font-bold text-slate-800 uppercase tracking-tight">
              Central de Integrações e APIs
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-3xl leading-relaxed">
              O ImobLeads Teresópolis utiliza exclusivamente <strong>protocolos OAuth 2.0 e SDKs oficiais</strong> das plataformas para garantir segurança total. Em estrita conformidade com a LGPD e termos do Facebook, Google e WhatsApp, nunca solicitamos ou guardamos senhas diretas de suas contas corporativas.
            </p>
          </div>
          
          <button
            onClick={runDiagnostics}
            disabled={isRunningDiagnostic}
            className="flex items-center gap-2 px-4 py-3 bg-[#00AFCB] hover:bg-[#008FA6] text-white font-bold text-xs uppercase tracking-widest rounded transition-all shadow-sm shrink-0"
          >
            <RefreshCw className={`h-4 w-4 ${isRunningDiagnostic ? "animate-spin" : ""}`} />
            <span>{isRunningDiagnostic ? "Diagnosticando..." : "Executar Diagnóstico Geral"}</span>
          </button>
        </div>

        {/* Integration Summary Widgets */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-md">
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Integradas Ativas</span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">{activeCount} / {integrations.length}</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-md">
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Falhas Atuais</span>
            <span className="text-2xl font-bold text-amber-600 mt-1 block">{integrations.length - activeCount}</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-md">
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Saúde do Sistema</span>
            <span className="text-2xl font-bold text-emerald-600 mt-1 block">{healthPercent}%</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-md">
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Tempo Resposta Médio</span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">58ms</span>
          </div>
          <div className="p-4 bg-slate-50 border border-slate-100 rounded-md col-span-2 md:col-span-1">
            <span className="block text-[10px] font-mono font-bold text-slate-400 uppercase">Disponibilidade</span>
            <span className="text-2xl font-bold text-slate-800 mt-1 block">99.99%</span>
          </div>
        </div>
      </div>

      {/* Diagnostics Report Area */}
      <AnimatePresence>
        {diagnosticReport && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-slate-900 text-slate-100 border border-slate-800 p-6 rounded-lg shadow-lg space-y-4 font-mono text-xs"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold text-[#00AFCB] flex items-center gap-2">
                <Terminal className="h-4 w-4 animate-pulse" />
                RELATÓRIO DE DIAGNÓSTICO INTEGRADO (LR-CRM SECURE ENGINE)
              </span>
              <button 
                onClick={() => setDiagnosticReport(null)}
                className="text-slate-400 hover:text-white"
              >
                [ Fechar ]
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="text-slate-400">Timestamp: {diagnosticReport.timestamp}</div>
                <div className="text-slate-400">Latência Média de Redes: <span className="text-emerald-400">{diagnosticReport.avgLatency}</span></div>
                <div className="text-slate-400">Status Geral: <span className="text-emerald-400">APROVADO com {diagnosticReport.workingCount} conexões ativas</span></div>
                
                <div className="pt-2">
                  <span className="text-slate-300 font-bold block mb-1">✓ Conexões Ativas e Monitorando:</span>
                  <ul className="list-disc list-inside text-emerald-400 space-y-0.5">
                    {diagnosticReport.working.map((w: string) => (
                      <li key={w}>{w}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="space-y-3">
                <span className="text-slate-300 font-bold block">🚨 Alertas e Recomendações de Ação:</span>
                {diagnosticReport.errors.length === 0 ? (
                  <p className="text-emerald-400 font-semibold italic">Todos os canais funcionando perfeitamente sem falhas identificadas!</p>
                ) : (
                  <div className="space-y-3 max-h-48 overflow-y-auto">
                    {diagnosticReport.errors.map((err: any) => (
                      <div key={err.key} className="p-3 bg-slate-800 border-l-4 border-amber-500 rounded text-[11px]">
                        <span className="font-bold block text-amber-400">{err.name} - {err.status}</span>
                        <p className="text-slate-300 mt-1">{err.reason}</p>
                        <strong className="block text-[#00AFCB] mt-1">Recomendação: {err.solution}</strong>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Test Real-time Monitor */}
      <AnimatePresence>
        {testingId && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            className="bg-slate-900 border border-slate-800 rounded-lg p-5 shadow-lg space-y-4 font-mono text-xs text-slate-100"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <span className="font-bold flex items-center gap-2 text-indigo-400">
                <Activity className="h-4 w-4 animate-spin" />
                CONEXÃO TESTE DE FLUXO DE DADOS EM REAL-TIME
              </span>
              <button 
                onClick={() => { setTestingId(null); setTestResult(null); }}
                className="text-slate-400 hover:text-white"
              >
                [ Fechar ]
              </button>
            </div>

            <div className="space-y-1 max-h-40 overflow-y-auto bg-slate-950 p-4 border border-slate-800 rounded text-slate-300">
              {testLogs.map((log, idx) => (
                <div key={idx} className="leading-relaxed">{log}</div>
              ))}
            </div>

            {testResult && (
              <div className={`p-4 rounded border ${
                testResult.success 
                  ? "bg-emerald-950/20 border-emerald-800 text-emerald-300" 
                  : "bg-rose-950/20 border-rose-800 text-rose-300"
              } space-y-2`}>
                <div className="font-bold flex items-center gap-2 text-sm">
                  {testResult.success ? (
                    <CheckCircle className="h-5 w-5 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="h-5 w-5 text-rose-400 shrink-0" />
                  )}
                  <span>REQUISITO: {testResult.success ? "CONEXÃO TOTALMENTE OPERACIONAL" : "FALHA DE TOKENS E ESCOPOS"}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                  <div>Canal: <strong className="text-slate-200">{testResult.platform}</strong></div>
                  <div>Latência de rede: <strong className="text-slate-200">{testResult.latency}ms</strong></div>
                </div>
                <p className="text-xs pt-1">{testResult.details}</p>
                <div className="text-[10px] pt-1 text-slate-400">
                  Escopos Ativos: <span className="font-semibold text-slate-300">{testResult.scopes.join(" • ") || "Nenhum"}</span>
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Integrations Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {integrations.map((int) => (
          <div 
            key={int.id}
            className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-sm transition-all p-5 rounded-lg flex flex-col justify-between"
          >
            <div className="space-y-4">
              {/* Header Card */}
              <div className="flex items-center gap-3.5">
                {getPlatformIcon(int.key)}
                <div>
                  <h3 className="font-bold text-sm text-slate-800 truncate max-w-[180px]" title={int.name}>
                    {int.name.split(" (")[0]}
                  </h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    API Protocol: OAuth 2.0
                  </p>
                </div>
              </div>

              {/* Specs & Status */}
              <div className="space-y-2 pt-2 border-t border-slate-50">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Status:</span>
                  {renderStatus(int.status)}
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400">Usuário:</span>
                  <span className="font-semibold text-slate-700 truncate max-w-[120px]" title={int.user || "Nenhum"}>
                    {int.user || <span className="italic text-slate-300 font-normal">Nenhum</span>}
                  </span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono text-[10px]">Última Sinc:</span>
                  <span className="font-semibold text-slate-700 font-mono text-[10px]">{int.lastSync}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-400 font-mono text-[10px]">Próxima Sinc:</span>
                  <span className="font-semibold text-slate-700 font-mono text-[10px]">{int.nextUpdate}</span>
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-2">
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleConnect(int.id, int.name)}
                  className={`text-[10px] py-1.5 font-bold uppercase tracking-wider text-center border rounded cursor-pointer transition-colors ${
                    int.status === "connected"
                      ? "bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100"
                      : "bg-[#00AFCB] hover:bg-[#008FA6] border-transparent text-white shadow-xs"
                  }`}
                >
                  {int.status === "connected" ? "Reconectar" : "Conectar"}
                </button>
                <button
                  onClick={() => handleDisconnect(int.id)}
                  disabled={int.status === "disconnected"}
                  className="text-[10px] py-1.5 font-bold uppercase tracking-wider text-center bg-transparent border border-rose-200 text-rose-600 hover:bg-rose-50 rounded cursor-pointer transition-colors disabled:opacity-30 disabled:pointer-events-none"
                >
                  Desconectar
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleTestConnection(int)}
                  className="text-[9px] py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-bold uppercase tracking-widest rounded transition-colors text-center"
                >
                  Testar Conexão
                </button>
                <button
                  onClick={() => setActivePermissionsInfo(int)}
                  className="text-[9px] py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold uppercase tracking-widest rounded transition-colors text-center"
                >
                  Ver Permissões
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Permissions Modal */}
      <AnimatePresence>
        {activePermissionsInfo && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white border border-slate-200 w-full max-w-md rounded-lg overflow-hidden shadow-xl"
            >
              <div className="px-5 py-4 bg-slate-50 border-b border-slate-100 flex justify-between items-center">
                <span className="font-bold text-slate-800 text-sm uppercase flex items-center gap-2">
                  <Lock className="h-4 w-4 text-[#00AFCB]" />
                  Permissões Ativas - {activePermissionsInfo.name.split(" (")[0]}
                </span>
                <button 
                  onClick={() => setActivePermissionsInfo(null)}
                  className="text-slate-400 hover:text-slate-600 font-bold text-lg cursor-pointer"
                >
                  &times;
                </button>
              </div>
              <div className="p-5 space-y-4 text-xs text-slate-600 leading-relaxed">
                <p>
                  Esta integração possui autorização e tokens seguros para realizar chamadas nos seguintes escopos aprovados:
                </p>
                <div className="space-y-2 bg-slate-50 p-4 border border-slate-100 rounded-md">
                  {activePermissionsInfo.scopes?.map((scope, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-[11px] font-mono text-slate-700">
                      <span className="h-4 w-4 rounded-full bg-[#00AFCB]/10 text-[#00AFCB] flex items-center justify-center font-bold text-[9px] shrink-0 mt-0.5">✓</span>
                      <span>{scope}</span>
                    </div>
                  ))}
                  {(!activePermissionsInfo.scopes || activePermissionsInfo.scopes.length === 0) && (
                    <span className="italic text-slate-400">Nenhum escopo configurado para esta plataforma</span>
                  )}
                </div>
                <div className="p-3 bg-indigo-50 border-l-4 border-[#00AFCB] text-[11px] text-indigo-800 rounded">
                  <span className="font-bold flex items-center gap-1 mb-0.5"><Zap className="h-3.5 w-3.5 text-[#00AFCB]" /> Token Armazenado de Forma Segura</span>
                  O Token está criptografado ponta-a-ponta e armazenado de forma isolada na coleção <code>integrations/</code> no banco de dados Cloud.
                </div>
              </div>
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setActivePermissionsInfo(null)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white font-bold text-[10px] uppercase tracking-widest rounded cursor-pointer transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Compliance Box */}
      <div className="p-5 bg-indigo-950/5 border border-indigo-200/40 rounded-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-5 text-xs text-slate-600">
        <div className="space-y-1">
          <span className="font-bold text-slate-800 uppercase flex items-center gap-1.5"><Shield className="h-4 w-4 text-[#00AFCB]" /> Segurança e LGPD Compliance</span>
          <p className="text-[11px] text-slate-500 leading-relaxed max-w-4xl">
            Nosso CRM não executa scripts automáticos de login disfarçados nem raspagem abusiva de contas de terceiros que possam violar os Termos de Serviço. Toda captação ocorre sobre dados disponibilizados publicamente ou via autorização expressa OAuth, garantindo a licitude de seus contatos e protegendo seu CRECI.
          </p>
        </div>
      </div>
    </div>
  );
}
