import React, { useState, useMemo } from "react";
import { 
  Zap, ArrowRight, Play, Database, FileText, Cpu, MessageSquare, 
  Clock, RefreshCw, CheckCircle2, ChevronRight, Terminal, Download, 
  HelpCircle, Settings, Layers, Code, AlertCircle
} from "lucide-react";
import { BuyerLead } from "../types";

interface N8NFlowSimulatorProps {
  leads: BuyerLead[];
  accentColor: string;
}

const getClassificacao = (score: number) => {
  if (score >= 27) return "QUENTE";
  if (score >= 15) return "MORNO";
  if (score >= 8) return "SINAL ATIVO";
  return "FRIO";
};

export function N8NFlowSimulator({ leads, accentColor }: N8NFlowSimulatorProps) {
  const [activeFlowId, setActiveFlowId] = useState<"captacao" | "contato" | "followup" | "resposta">("captacao");
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>("node-trigger");
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [simLogs, setSimLogs] = useState<string[]>([]);
  const [currentActiveNodeIdx, setCurrentActiveNodeIdx] = useState<number>(-1);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Selected lead to run simulation on
  const [selectedSimLeadId, setSelectedSimLeadId] = useState<string>(leads[0]?.id || "");
  const selectedLead = useMemo(() => {
    return leads.find(l => l.id === selectedSimLeadId) || leads[0];
  }, [leads, selectedSimLeadId]);

  // JSON templates for n8n imports
  const n8nJsonTemplates = {
    captacao: {
      "meta": { "templateId": "imob-captacao-001" },
      "nodes": [
        { "parameters": { "path": "new-lead-webhook", "options": {} }, "id": "webhook-trigger", "name": "Google Sheets Form Webhook", "type": "n8n-nodes-base.webhook", "typeVersion": 1, "position": [100, 300] },
        { "parameters": { "conditions": { "string": [{ "value1": "={{ $json.nome }}", "operation": "isNotEmpty" }] } }, "id": "validate-lead", "name": "Normalize & Validate", "type": "n8n-nodes-base.if", "typeVersion": 1, "position": [300, 300] },
        { "parameters": { "model": "gemini-3.5-flash", "prompt": "Você é um classificador imobiliário... Analise o lead e forneça: score (0-40), classificação (QUENTE/MORNO/FRIO) e mensagens por canal." }, "id": "gemini-ai", "name": "Gemini AI Qualified Core", "type": "n8n-nodes-base.googleGenAi", "typeVersion": 1, "position": [500, 300] },
        { "parameters": { "documentId": "spreadsheetId-123456", "sheetName": "Leads", "columns": { "Nome": "={{ $json.nome }}", "Score": "={{ $json.score }}", "Classificação": "={{ $json.classificacao }}" } }, "id": "save-sheets", "name": "Save to Google Sheets", "type": "n8n-nodes-base.googleSheets", "typeVersion": 3, "position": [700, 300] },
        { "parameters": { "conditions": { "string": [{ "value1": "={{ $json.classificacao }}", "operation": "equal", "value2": "QUENTE" }] } }, "id": "check-hot", "name": "Is Hot Lead?", "type": "n8n-nodes-base.if", "typeVersion": 1, "position": [900, 300] },
        { "parameters": { "queue": "urgent-contact-pool" }, "id": "contact-queue", "name": "Push to Immediate Contact Queue", "type": "n8n-nodes-base.amqp", "typeVersion": 1, "position": [1120, 200] }
      ],
      "connections": {
        "webhook-trigger": { "main": [[{ "node": "validate-lead", "type": "main", "index": 0 }]] },
        "validate-lead": { "main": [[{ "node": "gemini-ai", "type": "main", "index": 0 }]] },
        "gemini-ai": { "main": [[{ "node": "save-sheets", "type": "main", "index": 0 }]] },
        "save-sheets": { "main": [[{ "node": "check-hot", "type": "main", "index": 0 }]] },
        "check-hot": { "main": [[{ "node": "contact-queue", "type": "main", "index": 0 }], []] }
      }
    },
    contato: {
      "meta": { "templateId": "imob-contato-002" },
      "nodes": [
        { "parameters": { "event": "status-change-sheets", "condition": "Status === QUENTE" }, "id": "trigger-sheets-hot", "name": "Status QUENTE Webhook", "type": "n8n-nodes-base.googleSheetsTrigger", "typeVersion": 1, "position": [100, 300] },
        { "parameters": { "documentId": "spreadsheetId-123456", "sheetName": "Leads", "rowId": "={{ $json.rowId }}" }, "id": "fetch-lead-details", "name": "Fetch Lead Row", "type": "n8n-nodes-base.googleSheets", "typeVersion": 3, "position": [300, 300] },
        { "parameters": { "prompt": "Crie uma abordagem personalizada para WhatsApp contendo contexto direto, prova de relevância e pergunta curta para o lead {{ $json.Nome }} no bairro {{ $json.Bairro }}." }, "id": "personalized-msg-gen", "name": "Gemini Approach Builder", "type": "n8n-nodes-base.googleGenAi", "typeVersion": 1, "position": [500, 300] },
        { "parameters": { "phone": "={{ $json.WhatsApp }}", "message": "={{ $json.message }}" }, "id": "whatsapp-cloud-send", "name": "WhatsApp Cloud API Send", "type": "n8n-nodes-base.httpHttpRequest", "typeVersion": 4, "position": [720, 300] },
        { "parameters": { "documentId": "spreadsheetId-123456", "sheetName": "Leads", "rowId": "={{ $json.rowId }}", "update": { "Status": "CONTATADO", "Último Contato": "={{ $now }}" } }, "id": "update-status-sheets", "name": "Update Status = CONTATADO", "type": "n8n-nodes-base.googleSheets", "typeVersion": 3, "position": [950, 300] }
      ],
      "connections": {
        "trigger-sheets-hot": { "main": [[{ "node": "fetch-lead-details", "type": "main", "index": 0 }]] },
        "fetch-lead-details": { "main": [[{ "node": "personalized-msg-gen", "type": "main", "index": 0 }]] },
        "personalized-msg-gen": { "main": [[{ "node": "whatsapp-cloud-send", "type": "main", "index": 0 }]] },
        "whatsapp-cloud-send": { "main": [[{ "node": "update-status-sheets", "type": "main", "index": 0 }]] }
      }
    },
    followup: {
      "meta": { "templateId": "imob-followup-003" },
      "nodes": [
        { "parameters": { "schedule": "every-day-09am" }, "id": "cron-daily", "name": "Daily 9:00 AM Cron", "type": "n8n-nodes-base.cron", "typeVersion": 1, "position": [100, 300] },
        { "parameters": { "query": "Status === CONTATADO AND Resposta_Lead IS NULL" }, "id": "find-no-response-leads", "name": "Fetch Unanswered Leads", "type": "n8n-nodes-base.googleSheets", "typeVersion": 3, "position": [300, 300] },
        { "parameters": { "conditions": { "number": [{ "value1": "={{ $json.daysSinceLastContact }}", "operation": "equal", "value2": 2 }] } }, "id": "check-48h", "name": "Is 48h Overdue?", "type": "n8n-nodes-base.if", "typeVersion": 1, "position": [520, 200] },
        { "parameters": { "conditions": { "number": [{ "value1": "={{ $json.daysSinceLastContact }}", "operation": "equal", "value2": 5 }] } }, "id": "check-5days", "name": "Is 5 Days Overdue?", "type": "n8n-nodes-base.if", "typeVersion": 1, "position": [520, 350] },
        { "parameters": { "conditions": { "number": [{ "value1": "={{ $json.daysSinceLastContact }}", "operation": "equal", "value2": 10 }] } }, "id": "check-10days", "name": "Is 10 Days Overdue?", "type": "n8n-nodes-base.if", "typeVersion": 1, "position": [520, 500] },
        { "parameters": { "phone": "={{ $json.WhatsApp }}", "message": "Olá {{ $json.Nome }}, tudo bem? Passando para saber se conseguiu avaliar as fichas que te enviei..." }, "id": "send-followup-48h", "name": "Send Light Follow-up (48h)", "type": "n8n-nodes-base.httpHttpRequest", "typeVersion": 4, "position": [800, 150] },
        { "parameters": { "phone": "={{ $json.WhatsApp }}", "message": "Oi {{ $json.Nome }}, Leandro do Grupo Leandro Rodrigues. Identifiquei que uma nova casa com preço reduzido entrou no mesmo bairro hoje. Quer dar uma olhada?" }, "id": "send-reactivation-5days", "name": "Send Reactivation (5 days)", "type": "n8n-nodes-base.httpHttpRequest", "typeVersion": 4, "position": [800, 320] },
        { "parameters": { "phone": "={{ $json.WhatsApp }}", "message": "Prezado {{ $json.Nome }}, como não obtive retorno, estarei arquivando este atendimento para focar em outras demandas. Se reativar o interesse, sigo às ordens." }, "id": "send-last-try-10days", "name": "Send Urgency Close (10 days)", "type": "n8n-nodes-base.httpHttpRequest", "typeVersion": 4, "position": [800, 480] }
      ],
      "connections": {
        "cron-daily": { "main": [[{ "node": "find-no-response-leads", "type": "main", "index": 0 }]] },
        "find-no-response-leads": { "main": [[{ "node": "check-48h", "type": "main", "index": 0 }, { "node": "check-5days", "type": "main", "index": 0 }, { "node": "check-10days", "type": "main", "index": 0 }]] },
        "check-48h": { "main": [[{ "node": "send-followup-48h", "type": "main", "index": 0 }]] },
        "check-5days": { "main": [[{ "node": "send-reactivation-5days", "type": "main", "index": 0 }]] },
        "check-10days": { "main": [[{ "node": "send-last-try-10days", "type": "main", "index": 0 }]] }
      }
    },
    resposta: {
      "meta": { "templateId": "imob-resposta-004" },
      "nodes": [
        { "parameters": { "event": "cell-change-sheets", "column": "Resposta do lead" }, "id": "trigger-on-response", "name": "On Lead Response Change", "type": "n8n-nodes-base.googleSheetsTrigger", "typeVersion": 1, "position": [100, 300] },
        { "parameters": { "model": "gemini-3.5-flash", "prompt": "Analise a intenção da resposta: '{{ $json.resposta }}'. Classifique a intenção como: curioso, interessado, frio, negativo. Sugira a próxima ação comercial recomendada." }, "id": "gemini-intent-analyzer", "name": "Gemini Intent Analyzer", "type": "n8n-nodes-base.googleGenAi", "typeVersion": 1, "position": [320, 300] },
        { "parameters": { "documentId": "spreadsheetId-123456", "sheetName": "Leads", "rowId": "={{ $json.rowId }}", "update": { "Próxima ação sugerida": "={{ $json.proximaAcao }}", "Nível interesse": "={{ $json.nivelInteresse }}" } }, "id": "update-action-sheets", "name": "Update Suggested Action", "type": "n8n-nodes-base.googleSheets", "typeVersion": 3, "position": [550, 300] },
        { "parameters": { "conditions": { "string": [{ "value1": "={{ $json.nivelInteresse }}", "operation": "equal", "value2": "QUENTE" }] } }, "id": "check-is-hot-reply", "name": "Should Suggest Close?", "type": "n8n-nodes-base.if", "typeVersion": 1, "position": [750, 300] },
        { "parameters": { "phone": "5521986787909", "message": "ALERTA DE FECHAMENTO: O lead {{ $json.Nome }} respondeu com alto interesse imobiliário! Proposta recomendada: {{ $json.proximaAcao }}. Ligue em 10 minutos." }, "id": "alert-broker-close", "name": "Alert Broker via SMS/WhatsApp", "type": "n8n-nodes-base.httpHttpRequest", "typeVersion": 4, "position": [980, 200] }
      ],
      "connections": {
        "trigger-on-response": { "main": [[{ "node": "gemini-intent-analyzer", "type": "main", "index": 0 }]] },
        "gemini-intent-analyzer": { "main": [[{ "node": "update-action-sheets", "type": "main", "index": 0 }]] },
        "update-action-sheets": { "main": [[{ "node": "check-is-hot-reply", "type": "main", "index": 0 }]] },
        "check-is-hot-reply": { "main": [[{ "node": "alert-broker-close", "type": "main", "index": 0 }], []] }
      }
    }
  };

  // Node structures to display visually in the UI for each flow
  const flowNodes = {
    captacao: [
      { id: "node-trigger", label: "Trigger: Entrada manual ou formulário", icon: Zap, desc: "Monitora novos cadastros de leads ou anúncios FSBO identificados.", type: "Webhook Node", schema: { "Nome": "Leandro Rodrigues", "WhatsApp": "5521971429905", "Bairro": "Agriões", "Tipo": "Casa", "Origem": "Facebook Marketplace" } },
      { id: "node-normalizer", label: "Normalize & Validate", icon: Layers, desc: "Formata os campos numéricos de WhatsApp e remove caracteres especiais.", type: "Validate Node", schema: { "validated": true, "formatted_phone": "5521971429905", "lead_type": "Proprietário" } },
      { id: "node-ai", label: "Envia para IA (Prompt Master)", icon: Cpu, desc: "A inteligência qualifica, calcula o score 0-40 e rascunha as mensagens.", type: "Gemini Core Node", schema: { "score": 35, "classificacao": "QUENTE", "status": "Novo", "whatsMsg": "Olá Leandro...", "instaMsg": "Oi Leandro...", "emailMsg": "Prezado Leandro..." } },
      { id: "node-sheets", label: "Salva no Google Sheets (Aba 1)", icon: Database, desc: "Insere uma nova linha com todos os dados qualificados da prospecção.", type: "Sheets Integrator Node", schema: { "success": true, "row_inserted": 42, "sync_timestamp": "2026-06-26 11:04" } },
      { id: "node-router", label: "Se QUENTE → Fila de Contato", icon: RefreshCw, desc: "Roteia leads com score >= 27 para envio prioritário de abordagem.", type: "Router Node", schema: { "routed_to": "urgent-whatsapp-pool", "priority": "CRITICAL" } }
    ],
    contato: [
      { id: "node-trigger", label: "Trigger: Status = QUENTE", icon: Zap, desc: "Dispara assim que o campo 'Classificação' do lead muda para QUENTE.", type: "Sheets Trigger Node", schema: { "leadId": "ld-871", "rowId": 14, "Nome": "Carlos Alberto", "WhatsApp": "5521986787909" } },
      { id: "node-fetch", label: "Buscar Lead na Planilha", icon: Database, desc: "Carrega os detalhes financeiros e de perfil do lead para subsidiar o texto.", type: "Sheets Node", schema: { "valorMaximo": 1250000, "bairroInteresse": "Agriões", "tipoImovel": "Cobertura" } },
      { id: "node-ai", label: "Gerar Abordagem Customizada", icon: Cpu, desc: "Gera a cópia exata do WhatsApp adaptada às preferências do comprador.", type: "Gemini Node", schema: { "text": "Olá Carlos, vi que busca uma cobertura em Agriões..." } },
      { id: "node-whatsapp", label: "Enviar via WhatsApp Cloud API", icon: MessageSquare, desc: "Aciona o disparador de templates do WhatsApp Business oficial.", type: "API Webhook Node", schema: { "message_id": "wa_msg_98124", "status": "sent", "timestamp": "2026-06-26 11:05" } },
      { id: "node-update", label: "Atualizar Status = CONTATADO", icon: Database, desc: "Registra na planilha o dia do contato e altera o status para evitar duplicidade.", type: "Sheets Node", schema: { "status": "Contatado", "last_contact_date": "2026-06-26" } }
    ],
    followup: [
      { id: "node-trigger", label: "Trigger: Cron 48h / 5 dias / 10 dias", icon: Clock, desc: "Executa uma rotina de verificação diária automática às 09h00.", type: "Cron Node", schema: { "executed_at": "09:00:00", "timezone": "America/Sao_Paulo" } },
      { id: "node-fetch", label: "Buscar Leads sem Resposta", icon: Database, desc: "Filtra leads que foram contatados há mais de 48h e não possuem resposta cadastrada.", type: "Sheets Node", schema: { "count": 3, "unanswered_leads": [{ "id": "ld-1", "days": 2 }, { "id": "ld-2", "days": 5 }] } },
      { id: "node-ai", label: "Avaliar Tempo de Espera", icon: Cpu, desc: "IA roteia cada lead conforme o atraso (48h leve, 5 dias reativação, 10 dias adeus).", type: "Gemini Router Node", schema: { "lead_1_action": "followup_48h", "lead_2_action": "reativacao_5dias" } },
      { id: "node-send", label: "Enviar Mensagem Adequada", icon: MessageSquare, desc: "Dispara a notificação de WhatsApp ou SMS correspondente ao tempo.", type: "WhatsApp Node", schema: { "success": true, "dispatched_messages": 2 } }
    ],
    resposta: [
      { id: "node-trigger", label: "Trigger: Resposta do Lead Modificada", icon: Zap, desc: "Disparado quando o corretor insere o texto da resposta do lead no CRM.", type: "Sheets Trigger Node", schema: { "rowId": 8, "resposta_lead": "quero saber mais, manda as fotos por favor" } },
      { id: "node-ai", label: "IA Analisa Intenção da Resposta", icon: Cpu, desc: "Categoriza em curioso, interessado, frio, negativo e altera a estratégia.", type: "Gemini Intent Node", schema: { "intent": "interessado", "confidence": 98, "nivel_interesse": "ALTO", "proxima_acao": "Agendar visita ao imóvel" } },
      { id: "node-update", label: "Atualiza Próxima Ação Sugerida", icon: Database, desc: "Atualiza a coluna Q (Ação) e coluna P (Nível Interesse) na planilha.", type: "Sheets Node", schema: { "success": true, "updated_columns": ["P", "Q"] } },
      { id: "node-router", label: "Se ALTO → Alerta no Celular", icon: RefreshCw, desc: "Se o interesse for qualificado, alerta o corretor imediatamente via SMS.", type: "Router Node", schema: { "broker_alert": "ALERTA URGENTE: Lead interessado em agendar visita!" } }
    ]
  };

  const activeNodes = useMemo(() => {
    return flowNodes[activeFlowId];
  }, [activeFlowId]);

  // Handle selected node details
  const selectedNodeInfo = useMemo(() => {
    if (!selectedNodeId) return activeNodes[0];
    return activeNodes.find(n => n.id === selectedNodeId) || activeNodes[0];
  }, [selectedNodeId, activeNodes]);

  // Run visual simulator of the flow step-by-step
  const handleRunSimulation = () => {
    if (isRunningSim) return;
    setIsRunningSim(true);
    setSimLogs([]);
    setCurrentActiveNodeIdx(0);
    setSelectedNodeId(activeNodes[0].id);

    const logs = [
      `[Trigger] Ativando nó inicial do fluxo: ${activeNodes[0].label}`,
      `[Trigger] Capturando payload de simulação para o lead: ${selectedLead?.nome || "Lead Simulado"}`,
      `[Passo 2] Executando nó: ${activeNodes[1].label}`,
      `[Passo 2] Normalização de dados completada com sucesso. WhatsApp verificado: ${selectedLead?.telefone || "5521971429905"}`,
      `[Passo 3] Executando nó: ${activeNodes[2].label}`,
      `[Passo 3] IA Core processou o prompt. Score Calculado: ${Math.round((selectedLead?.confidenceScore || 20) * 0.4)}/40. Classificação: ${getClassificacao(Math.round((selectedLead?.confidenceScore || 20) * 0.4))}`,
      `[Passo 4] Executando nó: ${activeNodes[3].label}`,
      `[Passo 4] Sincronizando com o Google Sheets API na linha ativa. Dados persistidos.`,
      `[Passo 5] Executando nó final: ${activeNodes[4].label}`,
      `[Fim] Fluxo n8n executado com 100% de sucesso. Logs fechados com código 200 OK.`
    ];

    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < activeNodes.length) {
        setSelectedNodeId(activeNodes[currentIdx].id);
        setCurrentActiveNodeIdx(currentIdx);
        setSimLogs(prev => [...prev, logs[currentIdx * 2], logs[currentIdx * 2 + 1]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setIsRunningSim(false);
      }
    }, 1500);
  };

  const handleCopyJSON = () => {
    const jsonString = JSON.stringify(n8nJsonTemplates[activeFlowId], null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopyStatus(activeFlowId);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="bg-white border border-[#1A1A1A]/15 overflow-hidden flex flex-col font-sans">
      
      {/* Header do n8n */}
      <div className="bg-[#1A1A1A] text-white p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-amber-400">
              Gerenciador & Simulador de Automações
            </span>
          </div>
          <h3 className="font-bold text-base uppercase tracking-tight">n8n Integration Hub • Fluxos Reais do Sistema</h3>
          <p className="text-xs text-neutral-400 max-w-2xl font-serif italic">
            Visualize, teste as rotas de execução e baixe os arquivos JSON oficiais prontos para importar de forma literal na sua ferramenta de automação (n8n local ou cloud).
          </p>
        </div>

        <div className="flex gap-2">
          {["captacao", "contato", "followup", "resposta"].map((flow) => (
            <button
              key={flow}
              onClick={() => {
                setActiveFlowId(flow as any);
                setSelectedNodeId("node-trigger");
                setSimLogs([]);
                setCurrentActiveNodeIdx(-1);
              }}
              className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-widest border cursor-pointer transition-all ${
                activeFlowId === flow
                  ? "bg-amber-600 border-transparent text-white"
                  : "bg-neutral-800 border-neutral-700 text-neutral-300 hover:text-white"
              }`}
            >
              {flow === "captacao" ? "1. Captação" :
               flow === "contato" ? "2. Abordagem" :
               flow === "followup" ? "3. Follow-up" :
               "4. Resposta Lead"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 h-[500px]">
        
        {/* Lado Esquerdo: Canvas Visual do n8n (Cols: 8) */}
        <div className="lg:col-span-8 bg-[#FAF9F6] border-r border-[#1A1A1A]/10 p-6 overflow-auto relative flex flex-col justify-between">
          
          {/* Seletor de Lead para Simular */}
          <div className="bg-white border border-[#1A1A1A]/10 p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shrink-0 rounded-sm mb-4">
            <span className="text-[10px] font-bold uppercase text-neutral-500 font-mono">Lead de Testes da Simulação:</span>
            <div className="flex gap-2">
              <select
                value={selectedSimLeadId}
                onChange={(e) => setSelectedSimLeadId(e.target.value)}
                className="p-1.5 bg-white border border-[#1A1A1A]/10 focus:outline-none text-[11px] font-semibold"
              >
                {leads.map(l => (
                  <option key={l.id} value={l.id}>{l.nome} ({l.tipoLead})</option>
                ))}
              </select>

              <button
                onClick={handleRunSimulation}
                disabled={isRunningSim}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-extrabold uppercase tracking-widest transition-colors cursor-pointer disabled:bg-neutral-300"
              >
                {isRunningSim ? (
                  <>
                    <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                    <span>Executando...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-3.5 w-3.5 fill-current" />
                    <span>Testar Fluxo</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Visual Canvas Diagram */}
          <div className="flex-1 flex flex-col justify-center py-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-3 flex-wrap">
              {activeNodes.map((node, idx) => {
                const IconComponent = node.icon;
                const isSelected = selectedNodeId === node.id;
                const isExecuting = currentActiveNodeIdx === idx;
                const wasExecuted = currentActiveNodeIdx > idx;

                return (
                  <React.Fragment key={node.id}>
                    {idx > 0 && (
                      <div className="hidden md:flex items-center text-[#1A1A1A]/20">
                        <ArrowRight className={`h-5 w-5 ${isExecuting ? "text-amber-500 animate-pulse" : ""}`} />
                      </div>
                    )}
                    
                    <button
                      onClick={() => setSelectedNodeId(node.id)}
                      className={`w-44 p-4 text-left border rounded-sm transition-all focus:outline-none flex flex-col space-y-2 relative cursor-pointer ${
                        isSelected 
                          ? "bg-[#1A1A1A] text-[#FAF9F6] border-transparent scale-105 shadow-md" 
                          : isExecuting 
                            ? "bg-amber-500 text-white border-transparent scale-105 animate-pulse shadow-md"
                            : wasExecuted
                              ? "bg-emerald-50 border-emerald-300 text-emerald-900"
                              : "bg-white border-[#1A1A1A]/10 text-neutral-800 hover:border-[#1A1A1A]/30"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`p-1.5 rounded-xs ${isSelected ? "bg-amber-500 text-white" : "bg-[#1A1A1A]/5 text-[#1A1A1A]"}`}>
                          <IconComponent className="h-4 w-4" />
                        </div>
                        <span className="text-[10px] font-bold font-mono uppercase truncate block flex-1">
                          {node.type}
                        </span>
                      </div>
                      
                      <div>
                        <h4 className="font-bold text-xs leading-snug line-clamp-2">
                          {node.label}
                        </h4>
                        <p className={`text-[9px] mt-1 ${isSelected ? "text-neutral-400" : "text-neutral-500"}`}>
                          clique para configurar
                        </p>
                      </div>

                      {wasExecuted && (
                        <div className="absolute -top-1.5 -right-1.5 bg-emerald-600 text-white rounded-full p-0.5">
                          <CheckCircle2 className="h-3.5 w-3.5" />
                        </div>
                      )}
                    </button>
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Terminal Logs */}
          <div className="bg-neutral-900 text-emerald-400 p-4 font-mono text-[9px] max-h-36 overflow-y-auto rounded-sm shrink-0 border-t border-neutral-800">
            <div className="flex items-center justify-between text-neutral-400 pb-1 border-b border-neutral-800 mb-2 font-bold">
              <span>🖥️ LR-CRM n8n EXECUTOR PROTOCOL LOGS</span>
              <span className={isRunningSim ? "text-amber-500 animate-pulse" : "text-emerald-500"}>
                {isRunningSim ? "● IN PROGRESS" : "● READY"}
              </span>
            </div>
            {simLogs.length === 0 ? (
              <p className="text-neutral-500 italic">Clique no botão "Testar Fluxo" para rodar uma simulação interativa baseada no lead selecionado.</p>
            ) : (
              <div className="space-y-1">
                {simLogs.map((log, idx) => (
                  <p key={idx}>{log}</p>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Lado Direito: Detalhes do Nó & Configuração JSON (Cols: 4) */}
        <div className="lg:col-span-4 bg-white p-5 overflow-auto flex flex-col justify-between border-b lg:border-b-0">
          
          <div className="space-y-4">
            <div className="border-b border-neutral-100 pb-2">
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase">Configuração do Nó</span>
              <h4 className="font-bold text-sm text-neutral-800">{selectedNodeInfo.label}</h4>
              <span className="text-[10px] font-mono text-amber-700 bg-amber-50 px-1.5 py-0.5 rounded-sm inline-block mt-1">
                Type: {selectedNodeInfo.type}
              </span>
            </div>

            <p className="text-xs text-neutral-600 leading-relaxed font-serif">
              {selectedNodeInfo.desc}
            </p>

            <div className="space-y-1">
              <span className="text-[9px] font-mono font-bold text-neutral-400 uppercase block">Payload de Entrada / Saída (JSON Schema):</span>
              <pre className="bg-[#FAF9F6] p-3 border border-neutral-200/50 rounded-sm font-mono text-[10px] text-neutral-800 overflow-x-auto max-h-48 leading-relaxed">
                {JSON.stringify(selectedNodeInfo.schema, null, 2)}
              </pre>
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[9px] font-bold uppercase text-neutral-400 font-mono">Código para Importar:</span>
              <button
                onClick={handleCopyJSON}
                className="text-[9px] font-bold uppercase text-amber-700 hover:underline flex items-center gap-1 cursor-pointer"
              >
                {copyStatus === activeFlowId ? (
                  <span>Copiado!</span>
                ) : (
                  <>
                    <Code className="h-3 w-3" />
                    <span>Copiar JSON n8n</span>
                  </>
                )}
              </button>
            </div>
            <p className="text-[10px] text-neutral-400 leading-snug">
              Copie o código de importação do fluxo acima para colar no n8n (Ctrl+V) de forma imediata.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
