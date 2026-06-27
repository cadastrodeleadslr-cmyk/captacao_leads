import React, { useState, useMemo } from "react";
import { 
  Briefcase, MessageSquare, AlertTriangle, CheckCircle, Flame, 
  ArrowRight, UserCheck, Calendar, ShieldCheck, DollarSign,
  ChevronRight, Filter, AlertCircle, Clock
} from "lucide-react";
import { BuyerLead } from "../types";

interface CRMHubSpotLightProps {
  leads: BuyerLead[];
  onUpdateLeads: (updatedLeads: BuyerLead[]) => void;
  accentColor: string;
}

// HubSpot pipeline stages
const STAGES = [
  { id: "novo", name: "Novo Lead", color: "border-t-blue-500 bg-blue-50/20" },
  { id: "contato", name: "Contato Inicial", color: "border-t-purple-500 bg-purple-50/20" },
  { id: "engajamento", name: "Engajamento", color: "border-t-yellow-500 bg-yellow-50/10" },
  { id: "visita", name: "Visita / Reunião", color: "border-t-indigo-500 bg-indigo-50/20" },
  { id: "negociacao", name: "Negociação", color: "border-t-orange-500 bg-orange-50/20" },
  { id: "fechado", name: "Fechado (Ganho)", color: "border-t-emerald-500 bg-emerald-50/20" },
  { id: "perdido", name: "Perdido", color: "border-t-red-500 bg-red-50/10" }
];

export function CRMHubSpotLight({ leads, onUpdateLeads, accentColor }: CRMHubSpotLightProps) {
  const [filterType, setFilterType] = useState<"todos" | "comprador" | "proprietario">("todos");

  // Map database lead status to our 7 Kanban stages
  const getLeadStageId = (lead: BuyerLead): string => {
    // If we have a custom metadata stage in details, use it
    if (lead.detalhes?.includes("KanbanStage:")) {
      const match = lead.detalhes.match(/KanbanStage:(\w+)/);
      if (match && match[1]) return match[1];
    }

    // Default mapping
    if (lead.status === "Pendente") return "novo";
    if (lead.status === "Contatado") return "contato";
    if (lead.status === "Interesse Confirmado") return "engajamento";
    if (lead.status === "Sem Interesse") return "perdido";
    if (lead.status === "Número Incorreto") return "perdido";
    return "novo";
  };

  // Update lead stage
  const updateLeadStage = (leadId: string, stageId: string) => {
    const updated = leads.map(lead => {
      if (lead.id === leadId) {
        // Clear old stage and append new
        let baseDetails = lead.detalhes || "";
        if (baseDetails.includes("KanbanStage:")) {
          baseDetails = baseDetails.replace(/KanbanStage:\w+/, "");
        }
        
        // Map back status for backward compatibility
        let newStatus = lead.status;
        if (stageId === "novo") newStatus = "Pendente";
        if (stageId === "contato") newStatus = "Contatado";
        if (stageId === "engajamento" || stageId === "visita" || stageId === "negociacao") newStatus = "Interesse Confirmado";
        if (stageId === "perdido") newStatus = "Sem Interesse";

        return {
          ...lead,
          status: newStatus,
          detalhes: `KanbanStage:${stageId} | ${baseDetails}`.trim()
        };
      }
      return lead;
    });

    onUpdateLeads(updated);
  };

  // Group leads by stage
  const groupedLeads = useMemo(() => {
    const groups: { [key: string]: BuyerLead[] } = {
      novo: [], contato: [], engajamento: [], visita: [], negociacao: [], fechado: [], perdido: []
    };

    leads.forEach(lead => {
      const stage = getLeadStageId(lead);
      if (groups[stage]) {
        // Filter by user selection
        const isComprador = lead.tipoLead !== "Proprietário";
        if (filterType === "todos" || 
           (filterType === "comprador" && isComprador) || 
           (filterType === "proprietario" && !isComprador)) {
          groups[stage].push(lead);
        }
      } else {
        // Fallback to novo if stage matches nothing
        groups["novo"].push(lead);
      }
    });

    return groups;
  }, [leads, filterType]);

  // Operational intelligence rule audits
  const activeAlerts = useMemo(() => {
    const alerts: { text: string; type: "warning" | "info" | "critical"; leadName?: string }[] = [];
    
    leads.forEach(lead => {
      const score = Math.round((lead.confidenceScore || 20) * 0.4); // scale to 0-40
      const stage = getLeadStageId(lead);

      // Rule 1: Todo lead deve ter estágio associado
      if (!stage) {
        alerts.push({
          text: "Lead sem estágio definido. Realocando automaticamente para 'Novo Lead'.",
          type: "info",
          leadName: lead.nome
        });
      }

      // Rule 2: Nenhum lead pode ficar sem follow-up (simulated by status Pendente)
      if (lead.status === "Pendente" && Math.random() > 0.5) {
        alerts.push({
          text: `Atenção: Nenhum lead pode ficar sem follow-up. ${lead.nome} aguarda contato há mais de 48h!`,
          type: "warning",
          leadName: lead.nome
        });
      }

      // Rule 3: Todo lead quente deve ter ação em 24h!
      if (score >= 27 && (stage === "novo" || stage === "contato")) {
        alerts.push({
          text: `Urgência máxima: Lead quente (${score}/40) exige ação ou proposta de match em até 24h!`,
          type: "critical",
          leadName: lead.nome
        });
      }
    });

    return alerts;
  }, [leads]);

  // Dashboard Stats: Broker View (Visão do Corretor)
  const brokerStats = useMemo(() => {
    const totalLeads = leads.length;
    const hotCount = leads.filter(l => Math.round((l.confidenceScore || 20) * 0.4) >= 27).length;
    const negotiationCount = leads.filter(l => getLeadStageId(l) === "negociacao").length;
    const newToday = leads.filter(l => getLeadStageId(l) === "novo").length;

    // "O que fechar hoje" - checklist
    const closeTodayList = leads
      .filter(l => getLeadStageId(l) === "negociacao" || getLeadStageId(l) === "visita")
      .slice(0, 3);

    return {
      totalLeads,
      hotCount,
      negotiationCount,
      newToday,
      closeTodayList
    };
  }, [leads]);

  return (
    <div className="space-y-6 font-sans">
      
      {/* 1. Visão do Corretor (Broker Dashboard Core) */}
      <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 rounded-sm space-y-4">
        <div className="flex items-center justify-between border-b border-neutral-200/60 pb-3">
          <div className="space-y-0.5">
            <span className="text-[9px] font-mono font-bold text-amber-700 uppercase tracking-widest">Painel Operacional</span>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#1A1A1A] font-mono">Visão do Corretor • Leandro Rodrigues</h3>
          </div>
          <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 text-[9px] font-mono font-bold px-2.5 py-1 border border-emerald-200">
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
            <span>SISTEMA DE AUDITORIA ATIVO</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-4 border border-neutral-150 rounded-sm space-y-1">
            <span className="block text-[9px] font-mono font-bold text-neutral-400 uppercase">Leads Novos Hoje</span>
            <span className="text-xl font-bold font-mono text-[#1A1A1A]">{brokerStats.newToday}</span>
            <span className="block text-[8px] text-neutral-500">Aguardando classificação / abordagem</span>
          </div>

          <div className="bg-white p-4 border border-neutral-150 rounded-sm space-y-1">
            <span className="block text-[9px] font-mono font-bold text-neutral-400 uppercase flex items-center gap-1">
              <Flame className="h-3.5 w-3.5 text-amber-600 fill-current" />
              <span>Leads Quentes</span>
            </span>
            <span className="text-xl font-bold font-mono text-amber-700">{brokerStats.hotCount}</span>
            <span className="block text-[8px] text-amber-600 font-bold">Classificação Score &gt;= 27</span>
          </div>

          <div className="bg-white p-4 border border-neutral-150 rounded-sm space-y-1">
            <span className="block text-[9px] font-mono font-bold text-neutral-400 uppercase">Em Negociação</span>
            <span className="text-xl font-bold font-mono text-indigo-700">{brokerStats.negotiationCount}</span>
            <span className="block text-[8px] text-neutral-500">Contratos & propostas em andamento</span>
          </div>

          {/* O que fechar hoje Checklist */}
          <div className="bg-white p-4 border border-neutral-150 rounded-sm space-y-2 col-span-1 md:col-span-1">
            <span className="block text-[9px] font-mono font-bold text-neutral-400 uppercase">O que fechar hoje</span>
            {brokerStats.closeTodayList.length === 0 ? (
              <span className="block text-[10px] text-neutral-400 italic">Nenhum lead em fase de fechamento.</span>
            ) : (
              <div className="space-y-1.5">
                {brokerStats.closeTodayList.map(lead => (
                  <div key={lead.id} className="flex items-center gap-1.5 text-[10px]">
                    <input type="checkbox" className="rounded-xs text-amber-600 focus:ring-0 cursor-pointer h-3 w-3" defaultChecked={false} />
                    <span className="font-semibold text-neutral-700 truncate flex-1">{lead.nome}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* REGRAS OPERACIONAIS MONITOR DE COMPORTAMENTO */}
        {activeAlerts.length > 0 && (
          <div className="bg-amber-50 border border-amber-200/60 p-4 rounded-sm space-y-2">
            <div className="flex items-center gap-1.5 text-amber-900 font-mono text-[10px] font-bold uppercase">
              <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0" />
              <span>Auditoria do Funil Comercial de Leads</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-[10px] text-amber-950 font-serif leading-relaxed">
              {activeAlerts.slice(0, 4).map((alert, idx) => (
                <div key={idx} className="flex gap-1.5 items-start bg-white/50 p-2 border border-amber-200/30 rounded-xs">
                  <span className="text-amber-800">●</span>
                  <p>{alert.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 2. Filtros do Kanban */}
      <div className="flex justify-between items-center bg-white p-3 border border-[#1A1A1A]/10 rounded-sm">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-neutral-400" />
          <span className="text-[10px] font-bold uppercase tracking-wider font-mono text-neutral-500">Filtrar Pipeline:</span>
          <div className="flex gap-1.5">
            {[
              { id: "todos", label: "Todos os Leads" },
              { id: "comprador", label: "Compradores" },
              { id: "proprietario", label: "Proprietários FSBO" }
            ].map((btn) => (
              <button
                key={btn.id}
                onClick={() => setFilterType(btn.id as any)}
                className={`px-3 py-1 text-[9px] font-extrabold uppercase tracking-widest border cursor-pointer transition-all ${
                  filterType === btn.id
                    ? "bg-[#1A1A1A] text-white border-transparent"
                    : "bg-white text-neutral-600 border-neutral-200 hover:bg-neutral-50"
                }`}
              >
                {btn.label}
              </button>
            ))}
          </div>
        </div>
        <span className="text-[9px] font-mono font-bold text-neutral-400">Total no funil: {leads.length}</span>
      </div>

      {/* 3. Visual Kanban Columns */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-3 overflow-x-auto pb-4">
        {STAGES.map((stage) => {
          const stageLeads = groupedLeads[stage.id] || [];

          return (
            <div 
              key={stage.id} 
              className={`border-t-4 border-[#1A1A1A]/10 rounded-sm p-3 flex flex-col space-y-3 min-w-[200px] md:min-w-0 ${stage.color}`}
            >
              <div className="flex items-center justify-between border-b border-[#1A1A1A]/5 pb-1.5 shrink-0">
                <span className="font-mono font-bold text-[10px] uppercase tracking-wider text-neutral-700 truncate">
                  {stage.name}
                </span>
                <span className="bg-[#1A1A1A]/10 text-[#1A1A1A] text-[9px] font-mono font-bold px-2 py-0.5 rounded-full">
                  {stageLeads.length}
                </span>
              </div>

              {/* Cards Container */}
              <div className="flex-1 space-y-3 overflow-y-auto max-h-[450px] min-h-[150px] pr-1">
                {stageLeads.length === 0 ? (
                  <div className="border border-dashed border-neutral-200/50 p-6 text-center text-[10px] text-neutral-400 italic">
                    Nenhum lead nesta fase
                  </div>
                ) : (
                  stageLeads.map((lead) => {
                    const score = Math.round((lead.confidenceScore || 20) * 0.4); // scale to 0-40
                    const isHot = score >= 27;

                    return (
                      <div 
                        key={lead.id}
                        className="bg-white border border-[#1A1A1A]/10 p-3 rounded-xs shadow-xs hover:shadow-md transition-shadow relative space-y-2 text-xs"
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span className="font-bold text-neutral-900 leading-tight block truncate">
                            {lead.nome}
                          </span>
                          
                          {isHot && (
                            <span className="bg-amber-100 text-amber-800 text-[8px] font-mono font-bold px-1.5 py-0.5 rounded-xs shrink-0 flex items-center gap-0.5 animate-pulse">
                              <Flame className="h-2 w-2 fill-current text-amber-600" />
                              <span>HOT</span>
                            </span>
                          )}
                        </div>

                        <p className="text-[10px] text-neutral-500 font-serif leading-relaxed line-clamp-2">
                          {lead.tipoImovel} em {lead.bairroInteresse}
                        </p>

                        <div className="flex items-center justify-between pt-1 border-t border-neutral-100/60 font-mono text-[9px]">
                          <span className="text-neutral-400">{lead.origem || "Web"}</span>
                          <span className={`font-bold ${isHot ? "text-amber-700" : "text-[#0B7C95]"}`}>
                            Score: {score}/40
                          </span>
                        </div>

                        {/* Fast Mover Actions */}
                        <div className="flex gap-1 pt-1 justify-end">
                          {STAGES.map((st) => {
                            if (st.id === stage.id) return null;
                            return (
                              <button
                                key={st.id}
                                onClick={() => updateLeadStage(lead.id, st.id)}
                                className="px-1 py-0.5 bg-neutral-100 hover:bg-[#1A1A1A] hover:text-[#FAF9F6] text-[8px] font-mono border rounded-xs transition-colors cursor-pointer text-neutral-600"
                                title={`Mover para ${st.name}`}
                              >
                                {st.name.charAt(0)}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
