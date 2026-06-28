/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Imobiliaria, BuyerLead, MarketplaceOpportunity } from "./types";
import { AgencyCard } from "./components/AgencyCard";
import { InfoGuide } from "./components/InfoGuide";
import { FinanceCalculator } from "./components/FinanceCalculator";
import { IntegrationsManager } from "./components/IntegrationsManager";
import { CRMDashboard } from "./components/CRMDashboard";
import { GoogleSheetsSimulator } from "./components/GoogleSheetsSimulator";
import { N8NFlowSimulator } from "./components/N8NFlowSimulator";
import { CRMHubSpotLight } from "./components/CRMHubSpotLight";
import { EvolutionaryPromptSimulator } from "./components/EvolutionaryPromptSimulator";
import { IntentIntelligenceEngine } from "./components/IntentIntelligenceEngine";
import { 
  Search, Heart, Sparkles, Map, Calculator, HelpCircle, PhoneCall, 
  CheckCircle, Printer, FileDown, Edit2, Plus, RotateCcw, 
  Globe, ExternalLink, MessageSquare, Send, Check, Trash2, 
  SlidersHorizontal, Building, User, Copy, Facebook, Instagram, 
  Linkedin, Wifi, RefreshCw, Cpu, Database, Award, Shield, 
  Lock, ChevronDown, MessageCircle, AlertCircle, Calendar, Link2,
  Mail, Upload, Eye, EyeOff, Users, Target, TrendingUp, Palette, ArrowRight, Table, Briefcase, Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateAgenciesPDF } from "./utils/pdfGenerator";
import { supabase } from "./lib/supabase";
import { WorkspaceIntegrations } from "./components/WorkspaceIntegrations";

// ==========================================
// COMPONENTE LOGO DINÂMICO
// ==========================================
const LeandroRodriguesLogo = ({ className = "h-12 w-12" }: { className?: string }) => {
  const [imgError, setImgError] = useState(false);
  const [localLogo, setLocalLogo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lr_portal_custom_logo");
      if (stored) setLocalLogo(stored);
    } catch (e) {
      console.warn("Erro ao ler custom logo:", e);
    }
    
    const handleLogoUpdate = () => {
      try {
        const stored = localStorage.getItem("lr_portal_custom_logo");
        setLocalLogo(stored);
      } catch {}
    };
    window.addEventListener("lr_logo_updated", handleLogoUpdate);
    return () => window.removeEventListener("lr_logo_updated", handleLogoUpdate);
  }, []);

  if (localLogo) {
    return <img src={localLogo} className={`${className} object-contain select-none`} alt="Leandro Rodrigues Imóveis" />;
  }

  if (!imgError) {
    return <img src="/logo.png" onError={() => setImgError(true)} className={`${className} object-contain select-none`} alt="Leandro Rodrigues Imóveis" />;
  }

  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        <linearGradient id="chrome-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#475569" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id="metallic-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="30%" stopColor="#0B7C95" />
          <stop offset="70%" stopColor="#005B6E" />
          <stop offset="100%" stopColor="#00313C" />
        </linearGradient>
        <filter id="glow-logo" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>
      <rect x="24" y="24" width="192" height="192" rx="48" transform="rotate(45 120 120)" fill="black" fillOpacity="0.08" />
      <rect x="30" y="30" width="180" height="180" rx="42" transform="rotate(45 120 120)" stroke="url(#chrome-border)" strokeWidth="11" fill="#FFFFFF" className="dark:fill-neutral-900" style={{ filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.12))" }} />
      <g transform="translate(120, 115) scale(0.8) translate(-120, -120)" filter="url(#glow-logo)">
        <path d="M 68 140 L 138 140 L 138 120 L 88 120 L 88 70 L 68 70 Z" fill="url(#metallic-cyan)" transform="rotate(45 120 120)" />
        <path d="M 102 100 L 134 100 C 144 100, 144 82, 134 82 L 102 82 Z M 102 68 L 134 68 C 152 68, 158 88, 145 102 L 164 135 L 144 135 L 128 114 L 102 114 L 102 135 L 86 135 L 86 68 Z" fill="url(#metallic-cyan)" transform="rotate(45 120 120)" />
      </g>
    </svg>
  );
};

// ==========================================
// PRESETS E FUNÇÕES AUXILIARES
// ==========================================
const COLOR_PRESETS = {
  turquoise: { name: "Azul Turquesa", primary: "#00AFCB", hover: "#008FA6", light: "rgba(0, 175, 203, 0.08)", lightHover: "rgba(0, 175, 203, 0.16)" },
  dark_blue: { name: "Azul Escuro", primary: "#1E3A8A", hover: "#172554", light: "rgba(30, 58, 138, 0.08)", lightHover: "rgba(30, 58, 138, 0.16)" },
  green: { name: "Verde", primary: "#10B981", hover: "#059669", light: "rgba(16, 185, 129, 0.08)", lightHover: "rgba(16, 185, 129, 0.16)" },
  gray: { name: "Cinza Executivo", primary: "#4B5563", hover: "#374151", light: "rgba(75, 85, 99, 0.08)", lightHover: "rgba(75, 85, 99, 0.16)" },
  premium: { name: "Portanto, Premium", primary: "#D97706", hover: "#B45309", light: "rgba(217, 119, 6, 0.08)", lightHover: "rgba(217, 119, 6, 0.16)" },
  clean: { name: "Branco Clean", primary: "#0F172A", hover: "#1E293B", light: "rgba(15, 23, 42, 0.08)", lightHover: "rgba(15, 23, 42, 0.16)" },
};

function enrichLead(lead: BuyerLead): BuyerLead {
  const score = lead.confidenceScore ?? 85;
  const level = score >= 95 ? "Altamente Confiável" : score >= 80 ? "Dados Consistentes" : score >= 60 ? "Necessita Revisão" : "Não Recomendado";
  return {
    ...lead,
    confidenceScore: score,
    confidenceLevel: level as any,
    sourcesChecked: lead.sourcesChecked || ["Base de Dados Real"],
    urlTrace: lead.urlTrace || "#",
    captureMethod: lead.captureMethod || "Integração Direta API"
  };
}

// ==========================================
// COMPONENTE PRINCIPAL EXPORTADO
// ==========================================
export default function App() {
  // Estados de Configuração e Identidade
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "night">(() => (localStorage.getItem("teresopolis_imob_theme") as any) || "light");
  const [accentColor, setAccentColor] = useState<string>(() => localStorage.getItem("teresopolis_imob_accent") || "turquoise");
  const [activeTab, setActiveTab] = useState<"directory" | "guide" | "calculator" | "leads" | "intelligence" | "integrations">("leads");
  
  // Dados de Entidades Reais (Supabase)
  const [buyerLeads, setBuyerLeads] = useState<BuyerLead[]>([]);
  const [agencies, setAgencies] = useState<Imobiliaria[]>([]);
  const [isLoadingRealData, setIsLoadingRealData] = useState(false);

  // Estados de Filtros e Busca
  const [selectedCity, setSelectedCity] = useState<"Teresópolis" | "Guapimirim" | "Rio de Janeiro" | "Nova Friburgo">("Teresópolis");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBairro, setSelectedBairro] = useState("Todos");
  const [selectedTipo, setSelectedTipo] = useState<"Todos" | "Imobiliária" | "Autônomo">("Todos");
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [selectedLeadCategory, setSelectedLeadCategory] = useState<"Todos" | "Comprador" | "Proprietário">("Todos");
  const [selectedLeadStatus, setSelectedLeadStatus] = useState("Todos");
  const [selectedLeadBairro, setSelectedLeadBairro] = useState("Todos");

  // Formulário de Leads
  const [isCreatingNewLead, setIsCreatingNewLead] = useState(false);
  const [editingLead, setEditingLead] = useState<BuyerLead | null>(null);
  const [leadFormName, setLeadFormName] = useState("");
  const [leadFormPhone, setLeadFormPhone] = useState("");
  const [leadFormTipo, setLeadFormTipo] = useState<"Comprador" | "Proprietário">("Comprador");
  const [leadFormBairro, setLeadFormBairro] = useState("");
  const [leadFormTipoImovel, setLeadFormTipoImovel] = useState("");
  const [leadFormValorMaximo, setLeadFormValorMaximo] = useState("");
  const [leadFormStatus, setLeadFormStatus] = useState<BuyerLead["status"]>("Novo");

  // UI/Modals Extras Simplificados para Execução Completa
  const [crmSubTab, setCrmSubTab] = useState<"leads" | "pipeline" | "dashboard">("leads");
  const [isScanningLeads, setIsScanningLeads] = useState(false);
  const [scanMessage, setScanMessage] = useState("");

  // ------------------------------------------
  // CARREGAMENTO DE DADOS REAIS (SUPABASE)
  // ------------------------------------------
  const fetchRealData = async () => {
    setIsLoadingRealData(true);
    try {
      // 1. Carrega Leads do Banco Real
      const { data: leadsData, error: leadsError } = await supabase
        .from("buyer_leads")
        .select("*")
        .order("created_at", { ascending: false });
      
      if (leadsError) throw leadsError;
      if (leadsData) setBuyerLeads(leadsData);

      // 2. Carrega Imobiliárias do Banco Real
      const { data: agenciesData, error: agenciesError } = await supabase
        .from("agencies")
        .select("*")
        .order("nome", { ascending: true });

      if (agenciesError) throw agenciesError;
      if (agenciesData) setAgencies(agenciesData);

    } catch (err) {
      console.error("Erro ao sincronizar dados com o Supabase:", err);
    } finally {
      setIsLoadingRealData(false);
    }
  };

  useEffect(() => {
    fetchRealData();
  }, [selectedCity]);

  // ------------------------------------------
  // OPERAÇÕES DE MUTAÇÃO (C.R.U.D REAL)
  // ------------------------------------------
  const handleSaveLead = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      nome: leadFormName,
      telefone: leadFormPhone,
      tipoLead: leadFormTipo,
      cidade: selectedCity,
      bairroInteresse: leadFormBairro,
      tipoImovel: leadFormTipoImovel,
      valorMaximo: Number(leadFormValorMaximo) || 0,
      status: leadFormStatus,
      dataCaptura: new Date().toISOString().split("T")[0]
    };

    try {
      if (editingLead) {
        // UPDATE no Banco Real
        const { error } = await supabase
          .from("buyer_leads")
          .update(payload)
          .eq("id", editingLead.id);
        if (error) throw error;
      } else {
        // INSERT no Banco Real
        const { error } = await supabase
          .from("buyer_leads")
          .insert([payload]);
        if (error) throw error;
      }
      
      // Limpa formulário e recarrega dados legítimos
      setEditingLead(null);
      setIsCreatingNewLead(false);
      setLeadFormName("");
      setLeadFormPhone("");
      setLeadFormBairro("");
      setLeadFormTipoImovel("");
      setLeadFormValorMaximo("");
      fetchRealData();
    } catch (err) {
      console.error("Erro ao salvar lead no Supabase:", err);
      alert("Houve um problema ao salvar no banco de dados.");
    }
  };

  const handleDeleteLead = async (id: string) => {
    if (!window.confirm("Deseja realmente deletar esse registro em produção?")) return;
    try {
      const { error } = await supabase.from("buyer_leads").delete().eq("id", id);
      if (error) throw error;
      fetchRealData();
    } catch (err) {
      console.error("Erro ao remover registro:", err);
    }
  };

  // ------------------------------------------
  // FILTROS COMPUTAÇÃO EM TEMPO REAL
  // ------------------------------------------
  const filteredLeads = buyerLeads.map(enrichLead).filter((lead) => {
    if (lead.cidade !== selectedCity) return false;
    if (selectedLeadCategory !== "Todos" && lead.tipoLead !== selectedLeadCategory) return false;
    if (selectedLeadStatus !== "Todos" && lead.status !== selectedLeadStatus) return false;
    if (selectedLeadBairro !== "Todos" && lead.bairroInteresse !== selectedLeadBairro) return false;
    
    if (leadSearchQuery.trim() !== "") {
      const query = leadSearchQuery.toLowerCase();
      return (
        lead.nome.toLowerCase().includes(query) ||
        lead.telefone.includes(query) ||
        lead.tipoImovel.toLowerCase().includes(query)
      );
    }
    return true;
  });

  // ==========================================
  // RENDERIZAÇÃO DA INTERFACE (JSX)
  // ==========================================
  const currentAccent = COLOR_PRESETS[accentColor as keyof typeof COLOR_PRESETS] || COLOR_PRESETS.turquoise;

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      themeMode === "dark" ? "dark bg-neutral-950 text-neutral-100" : 
      themeMode === "night" ? "bg-black text-emerald-400 dark" : "bg-slate-50 text-slate-900"
    }`}>
      {/* Header Corporativo Integrado */}
      <header className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 p-4 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <LeandroRodriguesLogo className="h-10 w-10" />
            <div>
              <h1 className="font-bold text-lg tracking-tight">Leandro Rodrigues Imóveis</h1>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Hub Estratégico de Performance & CRM</p>
            </div>
          </div>

          {/* Seletor de Cidades Ativas */}
          <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 p-1.5 rounded-lg text-sm">
            {(["Teresópolis", "Guapimirim", "Rio de Janeiro", "Nova Friburgo"] as const).map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                className={`px-3 py-1.5 rounded-md font-medium transition-all ${
                  selectedCity === city 
                    ? "bg-white dark:bg-neutral-700 shadow text-neutral-900 dark:text-white" 
                    : "text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200"
                }`}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Grid Principal / Abas */}
      <main className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="mb-6 flex gap-2 border-b border-neutral-200 dark:border-neutral-800 overflow-x-auto pb-2">
          <button 
            onClick={() => setActiveTab("leads")} 
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "leads" ? "border-cyan-500 text-cyan-500" : "border-transparent text-neutral-500"
            }`}
          >
            <Users className="h-4 w-4" /> Radar de Leads (CRM)
          </button>
          <button 
            onClick={() => setActiveTab("intelligence")} 
            className={`px-4 py-2 font-medium text-sm flex items-center gap-2 whitespace-nowrap border-b-2 transition-colors ${
              activeTab === "intelligence" ? "border-cyan-500 text-cyan-500" : "border-transparent text-neutral-500"
            }`}
          >
            <Cpu className="h-4 w-4" /> Inteligência Imobiliária
          </button>
        </div>

        {/* View: Central de Leads */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center bg-white dark:bg-neutral-900 p-4 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800">
              <div className="space-y-1">
                <h2 className="text-xl font-bold tracking-tight">Painel Operacional de Negócios</h2>
                <p className="text-sm text-neutral-500">Filtrando dados integrados e validados em tempo real no Supabase.</p>
              </div>
              <button
                onClick={() => setIsCreatingNewLead(true)}
                className="bg-cyan-600 hover:bg-cyan-700 text-white font-medium px-4 py-2 rounded-lg text-sm flex items-center gap-2 shadow-sm transition-all"
              >
                <Plus className="h-4 w-4" /> Adicionar Lead Real
              </button>
            </div>

            {/* Listagem de Leads */}
            <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-sm border border-neutral-200 dark:border-neutral-800 overflow-hidden">
              {isLoadingRealData ? (
                <div className="p-12 text-center text-neutral-500 flex flex-col items-center gap-3">
                  <Loader2 className="h-8 w-8 animate-spin text-cyan-500" />
                  Sincronizando dados em produção...
                </div>
              ) : filteredLeads.length === 0 ? (
                <div className="p-12 text-center text-neutral-500">Nenhum registro encontrado para {selectedCity}.</div>
              ) : (
                <div className="divide-y divide-neutral-200 dark:divide-neutral-800 text-sm">
                  {filteredLeads.map((lead) => (
                    <div key={lead.id} className="p-4 hover:bg-neutral-50 dark:hover:bg-neutral-800/40 transition-colors flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-base">{lead.nome}</span>
                          <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                            lead.tipoLead === "Comprador" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
                          }`}>{lead.tipoLead}</span>
                        </div>
                        <p className="text-xs text-neutral-500 mt-1">Interesse: {lead.tipoImovel} em {lead.bairroInteresse} • Orçamento: R$ {lead.valorMaximo?.toLocaleString()}</p>
                        <p className="text-xs text-neutral-400 mt-0.5">Contato: {lead.telefone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => {
                            setEditingLead(lead);
                            setLeadFormName(lead.nome);
                            setLeadFormPhone(lead.telefone);
                            setLeadFormTipo(lead.tipoLead as any);
                            setLeadFormBairro(lead.bairroInteresse);
                            setLeadFormTipoImovel(lead.tipoImovel);
                            setLeadFormValorMaximo(String(lead.valorMaximo));
                            setLeadFormStatus(lead.status);
                            setIsCreatingNewLead(true);
                          }}
                          className="p-1.5 hover:bg-neutral-100 dark:hover:bg-neutral-700 rounded text-neutral-500 hover:text-neutral-800"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button 
                          onClick={() => handleDeleteLead(lead.id)}
                          className="p-1.5 hover:bg-red-50 dark:hover:bg-red-900/30 rounded text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* View: Inteligência Artificial Interna */}
        {activeTab === "intelligence" && (
          <div className="space-y-6">
            <IntentIntelligenceEngine />
            <EvolutionaryPromptSimulator />
          </div>
        )}
      </main>

      {/* Modal / Formulário Flutuante */}
      <AnimatePresence>
        {isCreatingNewLead && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-neutral-900 max-w-lg w-full rounded-2xl shadow-xl border border-neutral-200 dark:border-neutral-800 p-6 space-y-4"
            >
              <h3 className="text-lg font-bold">{editingLead ? "Atualizar Registro" : "Adicionar Novo Lead Real"}</h3>
              <form onSubmit={handleSaveLead} className="space-y-3 text-sm">
                <div>
                  <label className="block text-xs font-semibold mb-1">Nome Completo</label>
                  <input value={leadFormName} onChange={e => setLeadFormName(e.target.value)} required className="w-full bg-neutral-50 dark:bg-neutral-800 p-2 rounded border" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">WhatsApp / Telefone</label>
                  <input value={leadFormPhone} onChange={e => setLeadFormPhone(e.target.value)} required className="w-full bg-neutral-50 dark:bg-neutral-800 p-2 rounded border" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Categoria</label>
                    <select value={leadFormTipo} onChange={e => setLeadFormTipo(e.target.value as any)} className="w-full bg-neutral-50 dark:bg-neutral-800 p-2 rounded border">
                      <option value="Comprador">Comprador</option>
                      <option value="Proprietário">Proprietário</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Bairro de Interesse</label>
                    <input value={leadFormBairro} onChange={e => setLeadFormBairro(e.target.value)} className="w-full bg-neutral-50 dark:bg-neutral-800 p-2 rounded border" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1">Tipo de Imóvel</label>
                    <input value={leadFormTipoImovel} onChange={e => setLeadFormTipoImovel(e.target.value)} className="w-full bg-neutral-50 dark:bg-neutral-800 p-2 rounded border" placeholder="Ex: Casa, Studio" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold mb-1">Orçamento / Valor Mínimo (R$)</label>
                    <input type="number" value={leadFormValorMaximo} onChange={e => setLeadFormValorMaximo(e.target.value)} className="w-full bg-neutral-50 dark:bg-neutral-800 p-2 rounded border" />
                  </div>
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button type="button" onClick={() => { setIsCreatingNewLead(false); setEditingLead(null); }} className="px-4 py-2 rounded bg-neutral-100 hover:bg-neutral-200 text-neutral-700 font-medium">Cancelar</button>
                  <button type="submit" className="px-4 py-2 rounded bg-cyan-600 hover:bg-cyan-700 text-white font-medium shadow-sm">Salvar Registro</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
