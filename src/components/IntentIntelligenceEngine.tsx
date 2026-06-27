import React, { useState, useMemo } from "react";
import { 
  Cpu, Sparkles, Sliders, Layers, Users, Database, Play, CheckCircle, 
  AlertTriangle, PhoneCall, ArrowRight, Table, Server, RefreshCw, 
  TrendingUp, Search, MessageSquare, AlertCircle, FileText, Share2, 
  Activity, MapPin, BadgePercent, Zap, HelpCircle, BarChart3, Clock, Lock,
  Award, Hourglass, Smile, Target, Shield, Copy, Check, PlusCircle, Trash2
} from "lucide-react";
import { BuyerLead } from "../types";

interface IntentIntelligenceEngineProps {
  leads: BuyerLead[];
  onUpdateLeads: (updatedLeads: BuyerLead[]) => void;
  accentColor: string;
}

// Interfaces for our interactive simulators
interface IntentSignal {
  id: string;
  source: "Google Search" | "Facebook Comment" | "Facebook Marketplace" | "OLX" | "Facebook Group" | "Instagram Reply";
  user_identifier: string;
  userName: string;
  raw_text: string;
  intent_score: number;
  intent_level: "FRIO" | "SINAL ATIVO" | "MORNO" | "QUENTE";
  location: string;
  created_at: string;
  type: "buyer" | "seller";
  phone?: string;
  ips_score?: number; // pressure score for sellers
  linked_sources?: string[];
}

interface DBProperty {
  id: string;
  ownerName: string;
  contact: string;
  location: string;
  price: string;
  originalPrice: string;
  status: "Ativo" | "Negociando" | "Fechado";
  ips_score: number;
  priceDrops: number;
  created_at: string;
  description: string;
  urgencyReason: string;
}

export function IntentIntelligenceEngine({ leads, onUpdateLeads, accentColor }: IntentIntelligenceEngineProps) {
  const [activeSubTab, setActiveSubTab] = useState<"diagnosis" | "simulator" | "seller" | "n8n" | "database" | "metrics">("diagnosis");

  // State for simulated database signals
  const [signals, setSignals] = useState<IntentSignal[]>([
    {
      id: "sig-1",
      source: "Facebook Comment",
      user_identifier: "fb_user_ana_silva",
      userName: "Ana Silva",
      raw_text: "Ainda está disponível? Tenho muito interesse em agendar uma visita essa semana",
      intent_score: 31,
      intent_level: "QUENTE",
      location: "Agriões, Teresópolis",
      created_at: "2026-06-26 10:15",
      type: "buyer",
      phone: "+55 (21) 98112-4422",
      linked_sources: ["Facebook Profile", "Messenger Chat"]
    },
    {
      id: "sig-2",
      source: "Facebook Marketplace",
      user_identifier: "fb_user_carlos_mendes",
      userName: "Carlos Mendes",
      raw_text: "Aceita financiamento da Caixa? Quanto custa a taxa de condomínio desse apartamento na Várzea?",
      intent_score: 18,
      intent_level: "SINAL ATIVO",
      location: "Várzea, Teresópolis",
      created_at: "2026-06-26 09:30",
      type: "buyer",
      phone: "+55 (21) 97204-1188",
      linked_sources: ["OLX Listing"]
    },
    {
      id: "sig-3",
      source: "Google Search",
      user_identifier: "google_search_uid_99",
      userName: "Pesquisa Anônima (ID: 994)",
      raw_text: "comprar casa de 3 quartos urgente direto com proprietário em teresópolis",
      intent_score: 28,
      intent_level: "QUENTE",
      location: "Alto, Teresópolis",
      created_at: "2026-06-26 08:45",
      type: "buyer",
      linked_sources: []
    },
    {
      id: "sig-4",
      source: "Facebook Group",
      user_identifier: "fb_prop_roberto_souza",
      userName: "Roberto Souza (Proprietário)",
      raw_text: "Vendo urgente casa linear no Vale do Paraíso por motivo de mudança. R$ 420.000,00 direto comigo. Dispenso corretores intrometidos.",
      intent_score: 35,
      intent_level: "QUENTE",
      location: "Vale do Paraíso",
      created_at: "2026-06-26 07:12",
      type: "seller",
      phone: "+55 (21) 96322-8811",
      ips_score: 85, // High Pressure
      linked_sources: ["OLX ID: 9023", "Facebook Marketplace"]
    },
    {
      id: "sig-5",
      source: "Instagram Reply",
      user_identifier: "insta_gabriela_m",
      userName: "Gabriela Martins",
      raw_text: "Nossa, que lindo! Qual é o valor?",
      intent_score: 12,
      intent_level: "SINAL ATIVO",
      location: "Teresópolis",
      created_at: "2026-06-26 06:30",
      type: "buyer",
      linked_sources: []
    },
    {
      id: "sig-6",
      source: "OLX",
      user_identifier: "olx_prop_marcio_p",
      userName: "Marcio Pedrosa",
      raw_text: "[ATUALIZADO - PREÇO CAIU] Sobrado em Agriões de 390k por 350k para fechar essa semana! Estudo propostas rápidas.",
      intent_score: 38,
      intent_level: "QUENTE",
      location: "Agriões",
      created_at: "2026-06-25 18:40",
      type: "seller",
      phone: "+55 (21) 98845-3121",
      ips_score: 95, // Extreme Pressure
      linked_sources: ["Facebook Group"]
    }
  ]);

  // Simulated DB Properties for Seller Intent Engine
  const [properties, setProperties] = useState<DBProperty[]>([
    {
      id: "prop-1",
      ownerName: "Roberto Souza",
      contact: "+55 (21) 96322-8811",
      location: "Vale do Paraíso, Teresópolis",
      price: "R$ 420.000",
      originalPrice: "R$ 450.000",
      status: "Ativo",
      ips_score: 85,
      priceDrops: 1,
      created_at: "2026-06-26 07:12",
      description: "Vendo urgente casa linear no Vale do Paraíso por motivo de mudança. 3 quartos, suíte, garagem. Direto comigo. Dispenso corretores.",
      urgencyReason: "Motivo de Mudança / Transferência de Emprego"
    },
    {
      id: "prop-2",
      ownerName: "Marcio Pedrosa",
      contact: "+55 (21) 98845-3121",
      location: "Agriões, Teresópolis",
      price: "R$ 350.000",
      originalPrice: "R$ 390.000",
      status: "Ativo",
      ips_score: 95,
      priceDrops: 2,
      created_at: "2026-06-25 18:40",
      description: "[ATUALIZADO - PREÇO CAIU] Sobrado em Agriões de 390k por 350k para fechar essa semana! Estudo propostas rápidas ou permuta.",
      urgencyReason: "Pressão Financeira / Compra de outro imóvel em andamento"
    },
    {
      id: "prop-3",
      ownerName: "Lucia Maria Ferreira",
      contact: "+55 (21) 97112-5500",
      location: "Alto, Teresópolis",
      price: "R$ 580.000",
      originalPrice: "R$ 580.000",
      status: "Ativo",
      ips_score: 45,
      priceDrops: 0,
      created_at: "2026-06-24 11:20",
      description: "Apartamento aconchegante no Alto, reformado recente. Sem intermediários, favor não insistir.",
      urgencyReason: "Desejo de venda comum, sem urgência visível"
    },
    {
      id: "prop-4",
      ownerName: "Geraldo Alencar",
      contact: "+55 (21) 99112-8877",
      location: "Vale Alpino, Teresópolis",
      price: "R$ 1.150.000",
      originalPrice: "R$ 1.250.000",
      status: "Ativo",
      ips_score: 55,
      priceDrops: 1,
      created_at: "2026-06-23 09:15",
      description: "Espetacular casa em condomínio de alto padrão no Vale Alpino. Vista deslumbrante, piscina, 4 suítes, segurança 24h. Negociação direta.",
      urgencyReason: "Oportunidade de investimento fora do estado"
    }
  ]);

  // SYSTEM STATES FOR WAR ENGINE (MUTLI-AGENT BATTLE)
  const [isSimulatingOrchestrator, setIsSimulatingOrchestrator] = useState(false);
  const [orchestratorLogs, setOrchestratorLogs] = useState<string[]>([]);
  const [activeAgentWinner, setActiveAgentWinner] = useState<string>("agent-2");
  const [battleModeRealtime, setBattleModeRealtime] = useState(false);
  const [simulationComplete, setSimulationComplete] = useState(false);
  
  // Dynamic adaptive success counters (Continuous Learning Loop)
  const [agentStats, setAgentStats] = useState([
    { id: "agent-1", name: "Agente 1: Autoridade Técnica", successes: 18, total: 30, color: "text-blue-600 bg-blue-50 border-blue-200" },
    { id: "agent-2", name: "Agente 2: Velocidade de Venda", successes: 24, total: 35, color: "text-amber-600 bg-amber-50 border-amber-200" },
    { id: "agent-3", name: "Agente 3: Dor do Proprietário", successes: 29, total: 40, color: "text-red-600 bg-red-50 border-red-200" },
    { id: "agent-4", name: "Agente 4: Conexão Humana", successes: 22, total: 32, color: "text-emerald-600 bg-emerald-50 border-emerald-200" },
    { id: "agent-5", name: "Agente 5: Conversão Direta", successes: 27, total: 38, color: "text-indigo-600 bg-indigo-50 border-indigo-200" }
  ]);

  // Saved owner responses logs
  const [feedbackHistory, setFeedbackHistory] = useState<Array<{
    id: string;
    propName: string;
    agentName: string;
    feedbackType: "positive" | "neutral" | "negative";
    timestamp: string;
  }>>([
    { id: "feed-1", propName: "Roberto Souza", agentName: "Agente 2: Velocidade de Venda", feedbackType: "positive", timestamp: "26/06 06:15" },
    { id: "feed-2", propName: "Marcio Pedrosa", agentName: "Agente 3: Dor do Proprietário", feedbackType: "positive", timestamp: "25/06 19:30" }
  ]);

  const [notification, setNotification] = useState<string | null>(null);
  const triggerNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 4000);
  };

  // Simulator dynamic inputs
  const [simText, setSimText] = useState("");
  const [simSource, setSimSource] = useState<IntentSignal["source"]>("Facebook Comment");
  const [simUser, setSimUser] = useState("Ricardo Santos");
  const [simPhone, setSimPhone] = useState("+55 (21) 97722-0055");
  const [simType, setSimType] = useState<"buyer" | "seller">("buyer");
  const [simLocation, setSimLocation] = useState("Agriões");

  // Logs for the simulator running
  const [n8nLogs, setN8nLogs] = useState<string[]>([]);
  const [lastProcessedResult, setLastProcessedResult] = useState<any | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  // Active Selected Node in n8n flowchart
  const [activeNodeId, setActiveNodeId] = useState<string>("webhook");

  // Selected Distress Owner for WhatsApp Approach Generator
  const [selectedSellerId, setSelectedSellerId] = useState<string>("prop-2");

  // Dynamic agent strategy generator
  const currentStrategies = useMemo(() => {
    const prop = properties.find(p => p.id === selectedSellerId);
    if (!prop) return [];
    
    const firstName = prop.ownerName.split(" ")[0];
    const locationShort = prop.location.split(",")[0];
    const isUrgente = prop.ips_score >= 80;
    const isAnuncioAntigo = prop.ips_score >= 60 && prop.priceDrops > 0;
    const isAltoPadrao = parseInt(prop.price.replace(/\D/g, "")) >= 550000;

    return [
      {
        id: "agent-1",
        agentName: "Agente 1 – Autoridade Técnica",
        focus: "Credibilidade & Avaliação de Mercado",
        strategy: "Apresenta dados técnicos e posicionamento profissional sobre a região.",
        message: `Olá, ${firstName}. Analisei os dados de transações recentes em ${locationShort} e vi que sua oferta de ${prop.price} está com um excelente posicionamento técnico de mercado. Sou especialista da região e gostaria de validar se a documentação está regular para podermos apresentar formalmente à nossa rede de compradores. Sem custo de divulgação. Podemos analisar?`,
        probability: isAltoPadrao ? 85 : 62,
        risk: 10,
        naturalness: 88,
        badgeColor: "bg-blue-50 text-blue-700 border-blue-200"
      },
      {
        id: "agent-2",
        agentName: "Agente 2 – Velocidade de Venda",
        focus: "Urgência & Demanda Ativa",
        strategy: "Destaca compradores com crédito aprovado em busca de imóveis imediatamente.",
        message: `Olá, ${firstName}! Vi seu anúncio do imóvel em ${locationShort}. Tenho clientes com carta de crédito aprovada buscando imóvel exatamente nesse perfil e região para fechar negócio rápido. Como notei que seu anúncio tem urgência (${prop.urgencyReason.toLowerCase()}), aceitaria fazer uma parceria simples para apresentarmos o seu imóvel a eles ainda essa semana?`,
        probability: isUrgente ? 88 : 74,
        risk: 28,
        naturalness: 82,
        badgeColor: "bg-amber-50 text-amber-700 border-amber-200"
      },
      {
        id: "agent-3",
        agentName: "Agente 3 – Dor do Proprietário",
        focus: "Problema Oculto & Frustração FSBO",
        strategy: "Explora a dor de tentar vender sozinho, receber apenas curiosos e o imóvel ficar parado.",
        message: `Olá, ${firstName}. Imagino que lidar direto com o público, agendar visitas que desmarcam de última hora e responder dezenas de curiosos no chat seja extremamente cansativo e gaste muito do seu tempo livre. Minha equipe faz toda a triagem de crédito antes de agendar qualquer visita. Vamos tirar esse peso das suas costas e acelerar a venda sem você perder tempo?`,
        probability: isAnuncioAntigo ? 84 : 70,
        risk: 35,
        naturalness: 85,
        badgeColor: "bg-red-50 text-red-700 border-red-200"
      },
      {
        id: "agent-4",
        agentName: "Agente 4 – Conexão Humana",
        focus: "Parceria Casual & Linguagem Simples",
        strategy: "Remove barreira institucional, usando tom de conversa de WhatsApp comum e informal.",
        message: `Tudo bem, ${firstName}? Vi seu anúncio do imóvel em ${locationShort}. Cara, parece muito legal e com ótimo preço! Eu trabalho com vendas aqui na região e se você aceitar parceria, eu posso ajudar a dar um gás na divulgação pros meus contatos particulares, sem compromisso nenhum. Se der certo, dividimos a comissão padrão. Que que você acha?`,
        probability: 78,
        risk: 8,
        naturalness: 96,
        badgeColor: "bg-emerald-50 text-emerald-700 border-emerald-200"
      },
      {
        id: "agent-5",
        agentName: "Agente 5 – Conversão Direta",
        focus: "Proposta Comercial & Tráfego Pago",
        strategy: "Anuncia investimento direto em tráfego pago para colocar o imóvel no topo das redes sociais.",
        message: `Olá, ${firstName}! Sou gestor de tráfego imobiliário. Se você quer vender de verdade seu imóvel em ${locationShort}, depender apenas de posts orgânicos vai demorar meses. Consigo patrocinar anúncios focados do seu imóvel direto no Instagram para o público de alta renda qualificado hoje. Me dá um ok que te mostro em 2 minutos.`,
        probability: isUrgente && !isAltoPadrao ? 86 : 72,
        risk: 42,
        naturalness: 76,
        badgeColor: "bg-indigo-50 text-indigo-700 border-indigo-200"
      }
    ];
  }, [properties, selectedSellerId]);

  // Auto generated WhatsApp approach message from winning agent
  const generatedWhatsAppMessage = useMemo(() => {
    const winnerObj = currentStrategies.find(s => s.id === activeAgentWinner);
    if (winnerObj) {
      return winnerObj.message;
    }
    return "";
  }, [currentStrategies, activeAgentWinner]);

  // Decisor Orquestrador
  const runOrchestrator = () => {
    const prop = properties.find(p => p.id === selectedSellerId);
    if (!prop) return;

    setIsSimulatingOrchestrator(true);
    setSimulationComplete(false);
    setOrchestratorLogs([]);

    const logSteps = [
      `🔍 [INICIANDO] Orquestrador Central de Captação ativado para o imóvel de ${prop.ownerName}.`,
      `📊 [ENRIQUECIMENTO] Analisando histórico do anúncio em ${prop.location}. Preço: ${prop.price} (Anterior: ${prop.originalPrice}).`,
      `⚙️ [MOLDAGEM DE PERFIL] Classificação do Imóvel: IPS = ${prop.ips_score}%, Qtd Reduções = ${prop.priceDrops}, Urgência: "${prop.urgencyReason}".`,
      `🤖 [DISPARO PARALELO] Instanciando 5 Agentes Cognitivos em ambiente de simulação de disputa...`,
      `💬 [GERADOR MULTIAGENTE] Agentes formularam 5 estratégias de abordagem únicas para ${prop.ownerName}.`,
      `🧠 [SIMULADOR DE RESPOSTA] Calculando probabilidade de conversão baseada em padrões comportamentais...`,
      `⚖️ [SCORE DE COMPETIÇÃO] Ajustando heurística final (Probabilidade - Risco de Rejeição)...`
    ];

    let delay = 0;
    logSteps.forEach((log, index) => {
      setTimeout(() => {
        setOrchestratorLogs(prev => [...prev, log]);
      }, delay);
      delay += 350;
    });

    // Final decision step
    setTimeout(() => {
      // Choose winner based on logic rules
      const strategies = currentStrategies;
      let highestScore = -999;
      let winnerId = "agent-2";

      const isUrgente = prop.ips_score >= 80;
      const isAnuncioAntigo = prop.ips_score >= 60 && prop.priceDrops > 0;
      const isAltoPadrao = parseInt(prop.price.replace(/\D/g, "")) >= 550000;

      strategies.forEach(strat => {
        let score = strat.probability - strat.risk;
        
        // Apply Orchestrator brain adjustments
        if (isUrgente && (strat.id === "agent-2" || strat.id === "agent-5")) {
          score += 20; // boost urgency and direct
        }
        if (isAnuncioAntigo && (strat.id === "agent-3" || strat.id === "agent-1")) {
          score += 20; // boost pain and technical
        }
        if (!isUrgente && !isAnuncioAntigo && (strat.id === "agent-4" || strat.id === "agent-1")) {
          score += 20; // boost casual and technical
        }
        if (isAltoPadrao && strat.id === "agent-1") {
          score += 30; // strong technical boost for expensive properties
        }

        if (score > highestScore) {
          highestScore = score;
          winnerId = strat.id;
        }
      });

      const winnerObj = strategies.find(s => s.id === winnerId);
      setActiveAgentWinner(winnerId);
      setOrchestratorLogs(prev => [
        ...prev, 
        `🏆 [GANHADOR SELECIONADO] Orquestrador elegeu o ${winnerObj?.agentName} com Score Final de ${(highestScore).toFixed(1)}!`,
        `✅ [PRONTO] Mensagem de WhatsApp otimizada gerada com sucesso para disparo.`
      ]);
      setSimulationComplete(true);
      setIsSimulatingOrchestrator(false);
      triggerNotification(`Orquestrador selecionou o ${winnerObj?.agentName}!`);
    }, delay + 200);
  };

  // Simulation templates
  const buyerTemplates = [
    { text: "procuro apartamento na planta parcelado com entrega rápida em agriões", src: "Google Search" as const, user: "Mariana Alencar", phone: "+55 (21) 99112-3399" },
    { text: "quanto custa a taxa de condomínio e se aceita carta de crédito do consórcio?", src: "Facebook Marketplace" as const, user: "Fabio Dutra", phone: "+55 (21) 98044-2211" },
    { text: "quais casas vocês têm à venda em condomínio fechado no Alto que aceitem permuta por menor valor?", src: "Facebook Group" as const, user: "Claudio G.", phone: "+55 (21) 97631-0022" }
  ];

  const sellerTemplates = [
    { text: "PREÇO IMPRÓPRIO PARA DEMORAR: Baixei a casa no Alto de 650k por 590k para vender até sexta-feira! Ligar fone 96554-1122", src: "Facebook Group" as const, user: "Geraldo Neto", phone: "+55 (21) 96554-1122" },
    { text: "Vendo apartamento 2 quartos varzea urgente direto com o dono parcelo direto uma parte", src: "OLX" as const, user: "Silvia Helena", phone: "+55 (21) 98451-9955" }
  ];

  const applyTemplate = (tpl: { text: string; src: any; user: string; phone: string }, type: "buyer" | "seller") => {
    setSimText(tpl.text);
    setSimSource(tpl.src);
    setSimUser(tpl.user);
    setSimPhone(tpl.phone);
    setSimType(type);
  };

  // Run the full Pipeline simulator (simulates the n8n flow node-by-node)
  const handleRunSimulation = () => {
    if (!simText.trim()) return;
    setIsSimulating(true);
    setN8nLogs([]);
    setLastProcessedResult(null);

    const steps = [
      "⚡ [Node 1: Webhook Trigger] - Ingerindo sinal bruto recebido em tempo real.",
      `🔍 [Node 2: Switch Fonte] - Fonte identificada: ${simSource}. Tipo de interação mapeado.`,
      "🧹 [Node 3: HTML/Text Parser] - Eliminando ruídos, hashtags e limpando texto bruto.",
      "🧠 [Node 4: Classificador NLP] - Analisando semântica com Inteligência Artificial para detectar intenção imobiliária.",
      "📊 [Node 5: Motor de Scoring] - Calculando peso de palavras-chave, repetições e urgência do linguajar.",
      "🔗 [Node 6: Correlacionador de Identidade] - Buscando registros anteriores e criando identidade probabilística para evitar duplicações.",
      "💾 [Node 7: Database Node] - Registrando o sinal em 'signals' e vinculando em 'identity_map'.",
      "⚖️ [Node 8: Router Condicional] - Avaliando o score final para tomada de decisão no pipeline.",
      "🚀 [Node 9/10: Integração de CRM e Ativação] - Sinais Quentes de compradores convertidos em Lead e enviados ao CRM!"
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      if (currentStep < steps.length) {
        setN8nLogs(prev => [...prev, steps[currentStep]]);
        currentStep++;
      } else {
        clearInterval(interval);
        setIsSimulating(false);

        // Process final score
        let score = 5;
        const lowercaseText = simText.toLowerCase();
        
        // Keyword checks
        if (lowercaseText.includes("urgente") || lowercaseText.includes("até sexta") || lowercaseText.includes("para fechar") || lowercaseText.includes("urgência")) score += 20;
        if (lowercaseText.includes("procuro") || lowercaseText.includes("comprar") || lowercaseText.includes("vendo")) score += 12;
        if (lowercaseText.includes("quanto custa") || lowercaseText.includes("valor") || lowercaseText.includes("preço") || lowercaseText.includes("condomínio")) score += 8;
        if (lowercaseText.includes("financiamento") || lowercaseText.includes("caixa") || lowercaseText.includes("carta de crédito")) score += 10;
        if (lowercaseText.includes("direto comigo") || lowercaseText.includes("dispenso") || lowercaseText.includes("sem intermediários")) score += 15;

        // Limit score to 40 max
        if (score > 40) score = 40;

        let level: IntentSignal["intent_level"] = "FRIO";
        if (score >= 27) level = "QUENTE";
        else if (score >= 15) level = "MORNO";
        else if (score >= 8) level = "SINAL ATIVO";

        const newSignal: IntentSignal = {
          id: `sig-sim-${Date.now()}`,
          source: simSource,
          user_identifier: `uid_${simUser.toLowerCase().replace(/\s+/g, "_")}`,
          userName: simUser,
          raw_text: simText,
          intent_score: score,
          intent_level: level,
          location: simLocation,
          created_at: new Date().toISOString().slice(0,16).replace("T", " "),
          type: simType,
          phone: simPhone,
          ips_score: simType === "seller" ? Math.round(score * 2.5) : undefined,
          linked_sources: [simSource, "WhatsApp API"]
        };

        // Add to signals list
        setSignals(prev => [newSignal, ...prev]);

        // If it's a seller, add to properties too
        if (simType === "seller") {
          const newProperty: DBProperty = {
            id: `prop-sim-${Date.now()}`,
            ownerName: simUser,
            contact: simPhone,
            location: `${simLocation}, Teresópolis`,
            price: `R$ ${score * 15000}`,
            originalPrice: `R$ ${Math.round(score * 1.15 * 15000)}`,
            status: "Ativo",
            ips_score: Math.round(score * 2.5),
            priceDrops: score > 20 ? 1 : 0,
            created_at: newSignal.created_at,
            description: simText,
            urgencyReason: score >= 25 ? "Pressão financeira expressa" : "Venda comum direta"
          };
          setProperties(prev => [newProperty, ...prev]);
        }

        // If high score buyer, automatically append to CRM leads!
        if (simType === "buyer" && (level === "QUENTE" || level === "MORNO")) {
          const newLead: BuyerLead = {
            id: `lead-sim-${Date.now()}`,
            tipoLead: "Comprador",
            nome: simUser,
            telefone: simPhone,
            whatsapp: simPhone,
            email: `${(simUser || "usuario").toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "")}@exemplo.com.br`,
            cidade: "Teresópolis",
            bairroInteresse: simLocation,
            tipoImovel: "Casa em Condomínio",
            valorMaximo: score * 20000,
            quartos: 3,
            origem: simSource,
            dataCaptura: new Date().toLocaleDateString("pt-BR"),
            status: level === "QUENTE" ? "Interesse Confirmado" : "Pendente",
            detalhes: `NLP_CAPTURED_SIGNAL | Original text: "${simText}" | Score: ${score}/40`,
            confidenceScore: Math.round((score / 40) * 100),
            confidenceLevel: score >= 30 ? "Altamente Confiável" : "Dados Consistentes",
            sourcesChecked: [simSource],
            captureMethod: "NLP Signal Engine (Antigravity v2)"
          };

          onUpdateLeads([newLead, ...leads]);
        }

        setLastProcessedResult({
          score,
          level,
          identidade: `Linked profile a ${simSource} e banco de dados imobiliários.`,
          leadCriado: simType === "buyer" && (level === "QUENTE" || level === "MORNO") ? "Sim, exportado ao CRM local!" : "Não (Sinal mantido em Nurturing/Monitoramento de Ativos)"
        });
      }
    }, 600);
  };

  // Metrics calculations
  const totalSignals = signals.length;
  const signalsConvertedToIntent = signals.filter(s => s.intent_level !== "FRIO").length;
  const confirmedLeadsFromSignals = leads.filter(l => l.detalhes?.includes("NLP_CAPTURED_SIGNAL")).length;
  const conversionRate = totalSignals > 0 ? ((leads.length / (totalSignals * 15)) * 100).toFixed(2) : "0.00";

  const sourceCounts = useMemo(() => {
    const counts: { [key: string]: number } = {};
    signals.forEach(s => {
      counts[s.source] = (counts[s.source] || 0) + 1;
    });
    return counts;
  }, [signals]);

  return (
    <div className="space-y-6">
      {/* Menu Superior do Motor de Intenção */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-50 border border-indigo-100 rounded-lg">
            <Cpu className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-800 uppercase tracking-tight text-sm flex items-center gap-1.5">
              Intel Core: Motor de Intenção Distribuída
              <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200">
                ZERO SUBCAPTURA
              </span>
            </h3>
            <p className="text-xs text-slate-500">Transformando interações públicas em oportunidades e caçando ofertas particulares.</p>
          </div>
        </div>

        {/* Botoes de Navegacao */}
        <div className="flex flex-wrap gap-1">
          {[
            { id: "diagnosis", label: "1. Diagnóstico Técnico", icon: FileText },
            { id: "simulator", label: "2. Simulador de Ingestão", icon: Play },
            { id: "seller", label: "3. Guerra de Captação (Multiagente)", icon: Zap, highlight: true },
            { id: "n8n", label: "4. Engenharia de Fluxo (n8n)", icon: Server },
            { id: "database", label: "5. Bancos de Sinais (SQL)", icon: Database },
            { id: "metrics", label: "6. Métricas & Heatmap", icon: BarChart3 }
          ].map((tab) => {
            const Icon = tab.icon;
            const isSelected = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider rounded transition-all cursor-pointer border ${
                  isSelected 
                    ? "bg-[#1A1A1A] border-[#1A1A1A] text-white shadow-sm"
                    : tab.highlight
                      ? "bg-amber-50 border-amber-200 text-amber-800 hover:bg-amber-100/50"
                      : "bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-800 hover:bg-slate-100"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${tab.highlight && !isSelected ? "text-amber-600" : ""}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* RENDER VIEW CONFORME SUB TAB */}

      {/* 1. DIAGNÓSTICO E MODELO MENTAL */}
      {activeSubTab === "diagnosis" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Card Esquerdo - Diagnóstico Tecnico */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-3">
              <span className="text-[10px] font-bold font-mono text-indigo-600 uppercase">ANÁLISE DE FALHA SISTÊMICA</span>
              <h4 className="text-base font-extrabold text-slate-800 uppercase tracking-tight mt-1">
                Por que Sistemas Tradicionais Apresentam Subcaptura Severa?
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Muitos corretores e imobiliárias acreditam que têm um problema de "pouco tráfego", quando na verdade sofrem com <strong>vazamento de dados massivo no topo do funil</strong>. No ambiente imobiliário do Facebook, Marketplace e Google, 90% das interações acontecem sob o radar dos formulários de contato tradicionais.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="bg-[#FAF9F6] border-l-4 border-red-500 p-3.5 space-y-1">
                <span className="font-extrabold text-slate-800 uppercase block tracking-tight">1. Interação Pública vs. Lead Estruturado</span>
                <p className="text-slate-500 leading-normal">Focar apenas no lead que preencheu e-mail/telefone ignora comentários como <em>"Ainda tem? Me passa o valor no Inbox"</em>, onde reside a real urgência.</p>
              </div>

              <div className="bg-[#FAF9F6] border-l-4 border-red-500 p-3.5 space-y-1">
                <span className="font-extrabold text-slate-800 uppercase block tracking-tight">2. Perda em Comentários & Threads</span>
                <p className="text-slate-500 leading-normal">Filtros rígidos ignoram Replies de segundo nível em grupos imobiliários, onde compradores discutem detalhes do imóvel diretamente com o postador.</p>
              </div>

              <div className="bg-[#FAF9F6] border-l-4 border-red-500 p-3.5 space-y-1">
                <span className="font-extrabold text-slate-800 uppercase block tracking-tight">3. Limitações de Scraping Rígido</span>
                <p className="text-slate-500 leading-normal">Web scrapers focam apenas em posts principais, deixando de ler interações em threads públicas e caixas de perguntas frequentes do Marketplace.</p>
              </div>

              <div className="bg-[#FAF9F6] border-l-4 border-red-500 p-3.5 space-y-1">
                <span className="font-extrabold text-slate-800 uppercase block tracking-tight">4. Filtros Binários Descartadores</span>
                <p className="text-slate-500 leading-normal">Critérios binários como "Não forneceu telefone = descarta" eliminam sinais de micro-intenção de alto valor que poderiam ser nutridos.</p>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-md text-xs text-amber-900 flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <span className="font-extrabold uppercase">O Sintoma Real: 13 leads estruturados em 10 dias</span>
                <p className="leading-relaxed text-amber-800">
                  Enquanto a imobiliária cadastrou apenas 13 pessoas, houve mais de <strong>200 comentários e 500 pesquisas locais no Google</strong> por imóveis semelhantes que foram perdidos por falta de monitoramento inteligente distribuído.
                </p>
              </div>
            </div>
          </div>

          {/* Card Direito - Novo Modelo Mental */}
          <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-lg p-6 text-white space-y-6 shadow-md">
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] font-bold font-mono text-emerald-400 uppercase">A ARQUITETURA CORRIGIDA</span>
              <h4 className="text-base font-extrabold text-slate-100 uppercase tracking-tight mt-1">
                A Revolução da Tripla Camada de Inteligência
              </h4>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              O novo motor abandona a dependência de formulários rígidos e trabalha em 3 níveis integrados de absorção:
            </p>

            <div className="space-y-4 text-xs">
              <div className="border border-slate-800 p-3 bg-slate-950/50 rounded flex items-start gap-3">
                <div className="p-1 bg-slate-800 rounded text-emerald-400 font-mono font-bold text-xs shrink-0">C1</div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-200 block uppercase">Camada 1: Sinais de Intenção (Ingestão)</span>
                  <p className="text-slate-400">Captura em tempo real de Google Search, Comentários, Replies, DMs e menções em redes sociais sem descartar nada.</p>
                </div>
              </div>

              <div className="border border-slate-800 p-3 bg-slate-950/50 rounded flex items-start gap-3">
                <div className="p-1 bg-slate-800 rounded text-amber-400 font-mono font-bold text-xs shrink-0">C2</div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-200 block uppercase">Camada 2: Inteligência & NLP (Scoring)</span>
                  <p className="text-slate-400">Extração semântica com pesos matemáticos de urgência. Atribui categorias como <strong>Sinal Ativo</strong> e armazena em bancos estruturados.</p>
                </div>
              </div>

              <div className="border border-slate-800 p-3 bg-slate-950/50 rounded flex items-start gap-3">
                <div className="p-1 bg-slate-800 rounded text-indigo-400 font-mono font-bold text-xs shrink-0">C3</div>
                <div className="space-y-1">
                  <span className="font-bold text-slate-200 block uppercase">Camada 3: Lead Confirmado (CRM)</span>
                  <p className="text-slate-400">Conversão de sinais quentes em perfis consolidados enriquecidos com cruzamento de identidade probabilística.</p>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button 
                onClick={() => setActiveSubTab("simulator")}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase text-xs rounded transition-all cursor-pointer tracking-wider"
              >
                <span>Acessar Simulador de Ingestão</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. SIMULADOR DE INGESTÃO NLP */}
      {activeSubTab === "simulator" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 animate-fadeIn">
          {/* Coluna Config - Formulador de Sinais */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-3 flex justify-between items-center">
              <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight">
                Disparador de Sinais Brutos
              </h4>
              <span className="text-[10px] font-mono bg-indigo-50 text-indigo-700 px-1.5 py-0.5 font-bold rounded">NLP Parser</span>
            </div>

            {/* Templates Rápidos */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-slate-400 block uppercase font-mono">Injetar Sinais Pré-Prontos de Sucesso</span>
              
              <div className="space-y-2">
                <span className="text-[9px] font-bold text-slate-500 block">Sinais de Compradores (Demanda):</span>
                <div className="grid grid-cols-1 gap-1">
                  {buyerTemplates.map((tpl, i) => (
                    <button
                      key={i}
                      onClick={() => applyTemplate(tpl, "buyer")}
                      className="text-left text-[10px] p-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded truncate cursor-pointer text-slate-600 font-medium"
                    >
                      🗣️ "{tpl.text}"
                    </button>
                  ))}
                </div>

                <span className="text-[9px] font-bold text-slate-500 block mt-2">Sinais de Proprietários FSBO (Venda Direct):</span>
                <div className="grid grid-cols-1 gap-1">
                  {sellerTemplates.map((tpl, i) => (
                    <button
                      key={i}
                      onClick={() => applyTemplate(tpl, "seller")}
                      className="text-left text-[10px] p-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded truncate cursor-pointer text-amber-800 font-medium"
                    >
                      🏷️ "{tpl.text}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Form de Edicao */}
            <div className="space-y-3 pt-3 border-t border-slate-100 text-xs">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Anunciante / Perfil</label>
                  <input 
                    type="text" 
                    value={simUser} 
                    onChange={(e) => setSimUser(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 font-medium text-slate-700" 
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Contato / Telefone</label>
                  <input 
                    type="text" 
                    value={simPhone} 
                    onChange={(e) => setSimPhone(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 font-medium text-slate-700" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Fonte Ingestora</label>
                  <select 
                    value={simSource} 
                    onChange={(e: any) => setSimSource(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 font-medium text-slate-700"
                  >
                    <option value="Facebook Comment">Facebook Comment</option>
                    <option value="Facebook Marketplace">Facebook Marketplace</option>
                    <option value="Facebook Group">Facebook Group</option>
                    <option value="Google Search">Google Search (SEO)</option>
                    <option value="OLX">OLX</option>
                    <option value="Instagram Reply">Instagram Reply</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Bairro / Local</label>
                  <input 
                    type="text" 
                    value={simLocation} 
                    onChange={(e) => setSimLocation(e.target.value)}
                    className="w-full border border-slate-200 rounded px-2.5 py-1.5 font-medium text-slate-700" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Classificação de Intenção Inicial</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setSimType("buyer")}
                    className={`flex-1 py-1.5 font-bold uppercase tracking-wider border rounded text-center text-[10px] cursor-pointer ${
                      simType === "buyer" ? "bg-indigo-600 text-white border-indigo-600" : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    Comprador (Demanda)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSimType("seller")}
                    className={`flex-1 py-1.5 font-bold uppercase tracking-wider border rounded text-center text-[10px] cursor-pointer ${
                      simType === "seller" ? "bg-amber-600 text-white border-amber-600" : "bg-slate-50 text-slate-600 border-slate-200"
                    }`}
                  >
                    Vendedor / FSBO (Oferta)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-500 uppercase font-mono mb-1">Texto Bruto Capturado (NLP Input)</label>
                <textarea 
                  rows={3}
                  value={simText}
                  onChange={(e) => setSimText(e.target.value)}
                  placeholder="Ex: Procuro urgente casa linear direto com proprietario..."
                  className="w-full border border-slate-200 rounded p-2 text-slate-700 font-medium text-xs leading-relaxed"
                />
              </div>

              <button
                onClick={handleRunSimulation}
                disabled={isSimulating || !simText.trim()}
                className={`w-full py-2.5 rounded font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-all ${
                  isSimulating 
                    ? "bg-slate-300 text-slate-500 cursor-not-allowed" 
                    : "bg-indigo-600 hover:bg-indigo-700 text-white"
                }`}
              >
                {isSimulating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    <span>Processando Motor NLP...</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Processar Sinal por n8n & NLP</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Coluna Logs e Resultados da Simulação */}
          <div className="lg:col-span-7 bg-slate-950 border border-slate-900 rounded-lg p-6 text-white space-y-6 flex flex-col justify-between shadow-md">
            <div>
              <div className="border-b border-slate-900 pb-3 flex justify-between items-center">
                <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">n8n Execution Logs (Simulated)</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Logs */}
              <div className="space-y-2 mt-4 max-h-[220px] overflow-y-auto font-mono text-[10px] text-slate-300 leading-relaxed bg-black/40 p-3 rounded border border-slate-900">
                {n8nLogs.length === 0 ? (
                  <span className="text-slate-500 italic block">Nenhuma simulação ativa no momento. Clique em "Processar Sinal por n8n" no painel esquerdo para disparar o motor inteligente.</span>
                ) : (
                  n8nLogs.map((log, i) => (
                    <div key={i} className={`${log.includes("⚡") ? "text-amber-400 font-bold" : log.includes("🧠") || log.includes("📊") ? "text-emerald-400" : "text-slate-300"}`}>
                      {log}
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Resultado Final */}
            {lastProcessedResult && (
              <div className="bg-slate-900 border border-slate-800 p-4 rounded space-y-3 mt-4">
                <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-200">Sucesso do Pipeline de Ingestão</span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-[11px] font-mono">
                  <div className="space-y-1">
                    <span className="text-slate-500 uppercase block">Score de Intenção:</span>
                    <span className="text-slate-200 font-bold text-xs">{lastProcessedResult.score}/40</span>
                  </div>
                  <div className="space-y-1">
                    <span className="text-slate-500 uppercase block">Classificação:</span>
                    <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                      lastProcessedResult.level === "QUENTE" ? "bg-red-500/20 text-red-400 border border-red-500/30" :
                      lastProcessedResult.level === "MORNO" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                      lastProcessedResult.level === "SINAL ATIVO" ? "bg-indigo-500/20 text-indigo-400 border border-indigo-500/30" :
                      "bg-slate-500/20 text-slate-400 border border-slate-500/30"
                    }`}>
                      {lastProcessedResult.level}
                    </span>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <span className="text-slate-500 uppercase block">Identidade Mapeada:</span>
                    <span className="text-slate-300">{lastProcessedResult.identidade}</span>
                  </div>
                  <div className="space-y-1 col-span-2">
                    <span className="text-slate-500 uppercase block">Exportado para Leads (CRM):</span>
                    <span className="text-emerald-400 font-bold">{lastProcessedResult.leadCriado}</span>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-slate-900/40 p-2.5 rounded text-[10px] text-slate-400 border border-slate-900/50 mt-4 leading-relaxed">
              <strong>Regra de Negócio:</strong> Sinais fracos ou médios (ex: "lindo!") não são excluídos. Eles ficam salvos em 'signals' para cruzamento futuro de perfil probabilístico caso o mesmo usuário interaja novamente.
            </div>
          </div>
        </div>
      )}

      {/* 3. CAPTURA DE PROPRIETÁRIOS (SELLER INTENT ENGINE) */}
      {activeSubTab === "seller" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Alerta de Estrategia Agressiva */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 p-4 rounded-lg text-xs text-amber-900 flex items-start gap-3 shadow-xs">
            <Zap className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 animate-bounce" />
            <div className="space-y-1">
              <span className="font-extrabold uppercase text-slate-800">Módulo Seller Intent: Caçador de Ofertas Diretas do Proprietário (FSBO)</span>
              <p className="leading-relaxed text-slate-600">
                O maior trunfo imobiliário é capturar a oferta antes que ela chegue ao mercado aberto ou às imobiliárias concorrentes. Este módulo monitora publicações de proprietários particulares, detectando <strong>sinais de pressão de venda e vulnerabilidade financeira</strong> (redução de preço frequente, urgência verbal, multi-postagens).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Monitor de Imóveis e Sinais de Venda */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-lg p-5 space-y-4 shadow-sm">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                Monitor Ativo de Anúncios FSBO (Proprietários)
              </span>

              <div className="space-y-3">
                {properties.map((prop) => (
                  <div 
                    key={prop.id}
                    onClick={() => setSelectedSellerId(prop.id)}
                    className={`border p-4 rounded-md transition-all cursor-pointer relative ${
                      selectedSellerId === prop.id 
                        ? "border-amber-600 bg-amber-50/20 ring-1 ring-amber-400"
                        : "border-slate-200 hover:bg-slate-50/50"
                    }`}
                  >
                    {/* IPS Badge */}
                    <div className="absolute top-3 right-3 text-right">
                      <span className="text-[9px] text-slate-400 font-mono font-bold block uppercase">Pressão de Venda (IPS)</span>
                      <span className={`text-xs font-extrabold font-mono ${
                        prop.ips_score >= 80 ? "text-red-600" : prop.ips_score >= 50 ? "text-amber-600" : "text-slate-500"
                      }`}>
                        {prop.ips_score}% {prop.ips_score >= 80 ? "🔥 URGENTE" : ""}
                      </span>
                    </div>

                    <div className="space-y-1.5 pr-20">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-800">{prop.ownerName}</span>
                        <span className="text-[10px] font-mono text-slate-400">{prop.contact}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                        <MapPin className="h-3 w-3 text-indigo-500" />
                        <span>{prop.location}</span>
                        <span className="font-mono bg-slate-100 text-slate-700 px-1 rounded">{prop.created_at}</span>
                      </div>
                      <p className="text-xs text-slate-600 italic">"{prop.description}"</p>

                      <div className="flex flex-wrap gap-2 pt-1.5 text-[10px] font-semibold">
                        <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 px-1.5 rounded">
                          Preço: {prop.price}
                        </span>
                        {prop.priceDrops > 0 && (
                          <span className="bg-red-50 text-red-800 border border-red-200 px-1.5 rounded flex items-center gap-1">
                            <TrendingUp className="h-3 w-3 rotate-180" />
                            Redução: -R$ {parseInt(prop.originalPrice.replace(/\D/g, "")) - parseInt(prop.price.replace(/\D/g, ""))}
                          </span>
                        )}
                        <span className="bg-slate-50 text-slate-600 border border-slate-200 px-1.5 rounded font-mono">
                          Canal: Facebook Marketplace / OLX
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Abordagem Automatizada e Resumos */}
            <div className="lg:col-span-5 bg-white border border-slate-200 rounded-lg p-5 space-y-5 shadow-sm">
              <div className="border-b border-slate-100 pb-3">
                <span className="text-[10px] font-bold font-mono text-amber-600 uppercase">CO-CORRETAGEM AUTOMÁTICA</span>
                <h4 className="text-sm font-extrabold text-slate-800 uppercase tracking-tight mt-1">
                  Abordagem Conversiva de Proprietários
                </h4>
              </div>

              <div className="space-y-3 text-xs">
                <p className="text-slate-500 leading-normal">
                  Nossa inteligência NLP detecta o "gatilho de dor" do proprietário (falta de visitas, pressa por mudança) e redige uma mensagem de alta conversão sem parecer invasiva.
                </p>

                <div className="bg-slate-950 text-slate-300 p-4 rounded font-mono text-[11px] leading-relaxed relative border border-slate-900">
                  <div className="absolute top-2 right-2 flex items-center gap-1.5">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    <span className="text-[9px] text-slate-500 uppercase">Pronto para Enviar</span>
                  </div>
                  <p className="whitespace-pre-line text-slate-300">
                    {generatedWhatsAppMessage}
                  </p>
                </div>

                <div className="pt-2">
                  <a 
                    href={`https://api.whatsapp.com/send?phone=${properties.find(p=>p.id === selectedSellerId)?.contact.replace(/\D/g, "")}&text=${encodeURIComponent(generatedWhatsAppMessage)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold uppercase text-xs rounded transition-all cursor-pointer tracking-wider shadow-sm"
                  >
                    <PhoneCall className="h-4 w-4" />
                    <span>Enviar Abordagem pelo WhatsApp</span>
                  </a>
                </div>

                {/* Camada de Vulnerabilidade */}
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-md space-y-1.5">
                  <span className="text-[10px] font-bold text-indigo-700 uppercase block tracking-wider font-mono">
                    🛡️ Detecção de Vulnerabilidade Financeira Ativada
                  </span>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Proprietários com preço depreciado sequencialmente ou anúncios repostados há mais de 4 semanas são marcados para captação direta agressiva com oferta de consultoria documental gratuita.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. ENGENHARIA DE FLUXO (N8N NODE-BY-NODE) */}
      {activeSubTab === "n8n" && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">ESQUEMA DE INTEGRAÇÃO INTEGRADO</span>
            <h4 className="text-base font-extrabold text-slate-800 uppercase tracking-tight mt-1">
              Engenharia do Fluxo Técnico de Ingestão (n8n Blueprint)
            </h4>
            <p className="text-xs text-slate-500 mt-1">Clique em qualquer nó do fluxo abaixo para visualizar o schema de dados, o JSON de entrada/saída e o prompt do classificador NLP.</p>
          </div>

          {/* Interactive Flow Nodes */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3 pt-2">
            {[
              { id: "webhook", label: "1. Webhook Trigger", type: "trigger", icon: Zap, desc: "Início de Ingestão" },
              { id: "switch", label: "2. Switch Fonte", type: "switch", icon: Sliders, desc: "Filtro Google / FB" },
              { id: "parser", label: "3. Parser de Conteúdo", type: "parser", icon: FileText, desc: "Filtro de Ruídos" },
              { id: "nlp", label: "4. Classificador NLP", type: "nlp", icon: Cpu, desc: "OpenAI / Gemini Prompt" },
              { id: "scoring", label: "5. Motor de Scoring", type: "logic", icon: BadgePercent, desc: "Score de Urgência" },
              { id: "identity", label: "6. Matcher Identidade", type: "logic", icon: Users, desc: "Agrupador Provável" },
              { id: "database", label: "7. SQL Database Node", type: "db", icon: Database, desc: "Inserir Signals / Leads" },
              { id: "router", label: "8. IF Node Roteamento", type: "switch", icon: Sliders, desc: "Verificar Limiar" },
              { id: "whatsapp", label: "9. WhatsApp Notify", type: "notify", icon: PhoneCall, desc: "Disparo ao Corretor" },
              { id: "crm", label: "10. CRM Push (HubSpot)", type: "crm", icon: Table, desc: "Criar Ficha Lead" },
              { id: "scheduler", label: "11. Scheduler Node", type: "scheduler", icon: Clock, desc: "Disparo 24h/72h" }
            ].map((node) => {
              const Icon = node.icon;
              const isActive = activeNodeId === node.id;
              return (
                <button
                  key={node.id}
                  onClick={() => setActiveNodeId(node.id)}
                  className={`border p-3 rounded-md text-left transition-all cursor-pointer relative flex flex-col justify-between h-24 ${
                    isActive 
                      ? "border-indigo-600 bg-indigo-50/35 ring-1 ring-indigo-500"
                      : "border-slate-200 bg-slate-50 hover:bg-slate-100"
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <Icon className={`h-4.5 w-4.5 ${isActive ? "text-indigo-600" : "text-slate-400"}`} />
                    <span className="text-[9px] font-mono text-slate-400 uppercase font-bold">{node.type}</span>
                  </div>
                  <div>
                    <span className="text-[11px] font-bold text-slate-800 block leading-tight">{node.label}</span>
                    <span className="text-[9px] text-slate-400 font-medium block mt-0.5">{node.desc}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Node Detail Sheet */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            {activeNodeId === "webhook" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Zap className="h-4 w-4 text-amber-500" />
                    Nó 1: Webhook Trigger (Ingestão Distribuída)
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Escuta requisições POST vindas de múltiplos scrapers automatizados operando no Facebook Marketplace, OLX e classificados de jornais locais. O webhook é totalmente assíncrono e não bloqueia o scraper.
                  </p>
                  <div className="bg-slate-100 p-2.5 rounded font-mono text-[10px] text-slate-700">
                    URL de Escuta: <span className="text-indigo-600">https://n8n.leandrorodrigues.com/v1/webhook/incoming-signals</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Exemplo de Payload Recebido (JSON):</span>
                  <pre className="bg-slate-900 text-slate-300 p-3 rounded font-mono text-[9px] leading-relaxed overflow-x-auto max-h-40">
{`{
  "source": "facebook_marketplace",
  "raw_text": "me passa as fotos por favor, aceita CEF?",
  "user_identifier": "ana_silva_profile_901",
  "timestamp": "2026-06-26T14:15:00Z",
  "location": "Agriões"
}`}
                  </pre>
                </div>
              </>
            )}

            {activeNodeId === "switch" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-indigo-500" />
                    Nó 2: Switch Fonte
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Mapeia o formato específico de cada plataforma. Por exemplo, formata dados do Google Search e separa metadados de posts do Facebook vs. conversas no Marketplace.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Lógica Condicional (Switch Rules):</span>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                    <li>Se <code className="bg-slate-100 px-1 font-mono">source === 'facebook'</code> → Encaminha para o Parser de Threads.</li>
                    <li>Se <code className="bg-slate-100 px-1 font-mono">source === 'google'</code> → Extrai palavras-chave de intenção ativa de busca.</li>
                    <li>Se <code className="bg-slate-100 px-1 font-mono">source === 'olx'</code> → Formata como sinal do proprietário.</li>
                  </ul>
                </div>
              </>
            )}

            {activeNodeId === "parser" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <FileText className="h-4 w-4 text-slate-500" />
                    Nó 3: Parser de Conteúdo
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Remove tags HTML de scrapers brutos, filtra emojis excessivos, extrai telefones embutidos por expressão regular (Regex) e limpa o texto deixando apenas as intenções legíveis.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">RegEx Utilizada para Extrair Contatos:</span>
                  <code className="bg-slate-900 text-emerald-400 p-2 rounded block font-mono text-[10px] text-center">
                    {"/(\\(?\\d{2}\\)?\\s)?(\\d{4,5}-\\d{4})/g"}
                  </code>
                </div>
              </>
            )}

            {activeNodeId === "nlp" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Cpu className="h-4 w-4 text-emerald-500" />
                    Nó 4: Classificador NLP (Gemini / OpenAI Prompt)
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Envia o texto limpo para o motor LLM visando mapear o comportamento real do usuário e capturar a dor implícita (ex: se quer comprar ou se é parceiro corretor de fora).
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Prompt Sistemático NLP:</span>
                  <pre className="bg-slate-900 text-slate-300 p-3 rounded font-mono text-[9px] leading-normal overflow-x-auto max-h-40 whitespace-pre-wrap">
{`"Classifique este texto como intenção imobiliária: {{ $json.raw_text }}.
Identifique se o autor deseja COMPRAR (demand) ou VENDER (FSBO).
Retorne a urgência inferida em nível numérico de 1 a 10.
Extraia se ele é um corretor parceiro."`}
                  </pre>
                </div>
              </>
            )}

            {activeNodeId === "scoring" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <BadgePercent className="h-4 w-4 text-amber-500" />
                    Nó 5: Motor de Scoring
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Atribui valores lógicos ao texto baseado em semântica imobiliária comercial. Evita o descarte binário de sinais ao classificar intermediários valiosos.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Lógica do Cálculo de Score (JS Function):</span>
                  <pre className="bg-slate-900 text-slate-300 p-3 rounded font-mono text-[9px] leading-relaxed overflow-x-auto max-h-40">
{`let score = 5;
if (text.includes("urgente")) score += 20;
if (text.includes("financiamento")) score += 10;
if (text.includes("condomínio")) score += 8;
return { "score": score };`}
                  </pre>
                </div>
              </>
            )}

            {activeNodeId === "identity" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Users className="h-4 w-4 text-blue-500" />
                    Nó 6: Matcher de Identidade Probabilística
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Evita perdas decorrentes de fragmentação. Se o mesmo usuário fizer buscas de preço no Google e comentários no Facebook, o algoritmo cruza por nome, perfil ou telefone e agrupa no mesmo dossiê.
                  </p>
                </div>
                <div className="space-y-2 text-slate-600 leading-normal">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Índice de Confiança do Match:</span>
                  <div className="space-y-1 text-[11px]">
                    <div className="flex justify-between font-mono"><span>Mesmo Telefone:</span> <span className="text-emerald-600 font-bold">100% (Matching Determinístico)</span></div>
                    <div className="flex justify-between font-mono"><span>Nome + Localização:</span> <span className="text-amber-600 font-bold">85% (Matching Probabilístico)</span></div>
                    <div className="flex justify-between font-mono"><span>Padrão Linguístico:</span> <span className="text-slate-500 font-bold">60%</span></div>
                  </div>
                </div>
              </>
            )}

            {activeNodeId === "database" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Database className="h-4 w-4 text-indigo-500" />
                    Nó 7: SQL Database Node
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Registra o sinal bruto de forma não destrutiva no banco local. Diferente de sistemas comuns, nenhum sinal é jogado fora por falta de telefone. Tudo é catalogado para cruzamento posterior.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block font-mono">Query de Inserção:</span>
                  <code className="bg-slate-900 text-emerald-400 p-2.5 rounded block font-mono text-[9px] overflow-x-auto leading-relaxed">
                    INSERT INTO signals (source, raw_text, intent_score, intent_level) VALUES ($1, $2, $3, $4);
                  </code>
                </div>
              </>
            )}

            {activeNodeId === "router" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Sliders className="h-4 w-4 text-pink-500" />
                    Nó 8: IF Node Roteamento (Router)
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Segmenta as rotas de acordo com a pontuação do Sinal:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-slate-600 text-[11px]">
                    <li>Score &gt;= 27 (QUENTE) -&gt; Dispara Alerta WhatsApp + CRM.</li>
                    <li>Score 8 a 26 (SINAL ATIVO) -&gt; Guarda e cria fluxo de Nurturing.</li>
                    <li>Score &lt; 8 (FRIO) -&gt; Apenas registra no Log de histórico.</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Regra Principal do Arquiteto:</span>
                  <div className="bg-amber-50 text-amber-800 border border-amber-200 p-2 rounded">
                    "Jamais exclua um lead potencial por não ter contato estruturado na primeira mensagem."
                  </div>
                </div>
              </>
            )}

            {activeNodeId === "whatsapp" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <PhoneCall className="h-4 w-4 text-emerald-500" />
                    Nó 9: WhatsApp Notification
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Dispara uma notificação em tempo real diretamente para o WhatsApp do corretor responsável com o link do dossiê do lead imobiliário, permitindo conversão rápida em menos de 5 minutos.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Mensagem de Alerta ao Corretor:</span>
                  <div className="bg-slate-900 text-slate-300 p-2.5 rounded font-mono text-[9px] leading-relaxed">
                    ⚠️ <strong>[ALERTA CO-BROKER]</strong> Novo Sinal Quente de Proprietário no Alto. IPS: 85%. Texto: "Vendo urgente..." Fone: 96322-8811.
                  </div>
                </div>
              </>
            )}

            {activeNodeId === "crm" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Table className="h-4 w-4 text-indigo-500" />
                    Nó 10: CRM Push (HubSpot Integration)
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Sincroniza automaticamente os leads confirmados na base do CRM HubSpot Light para o funil Kanban de vendas e prospecção ativa de captação comercial.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block">Mapeamento de Estágios:</span>
                  <div className="bg-slate-900 text-slate-300 p-2 rounded font-mono text-[9px]">
                    Sinal Quente -&gt; Pipeline Stage "Novo Lead"
                  </div>
                </div>
              </>
            )}

            {activeNodeId === "scheduler" && (
              <>
                <div className="space-y-3">
                  <h5 className="font-extrabold text-slate-800 uppercase tracking-tight flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-purple-500" />
                    Nó 11: Scheduler Node (Follow-up de 24h a 7 dias)
                  </h5>
                  <p className="text-slate-600 leading-relaxed">
                    Garante prospecção ativa agendando disparos sequenciais de follow-up em intervalos de 24 horas, 72 horas e 7 dias, evitando o esquecimento e aumentando em até 300% a taxa de resposta dos clientes.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] font-mono font-bold text-slate-400 uppercase block font-mono">Rotina Cron do Scheduler:</span>
                  <code className="bg-slate-900 text-emerald-400 p-2 rounded block font-mono text-[10px] text-center">
                    0 9 * * 1-5 (Seg a Sex às 09:00)
                  </code>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* 5. BANCOS DE DADOS (SQL SCHEMA VIEWER) */}
      {activeSubTab === "database" && (
        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6 shadow-sm animate-fadeIn">
          <div className="border-b border-slate-100 pb-3">
            <span className="text-[10px] font-mono font-bold text-indigo-600 uppercase">MODELAGEM RELACIONAL</span>
            <h4 className="text-base font-extrabold text-slate-800 uppercase tracking-tight mt-1">
              Estrutura de Tabelas de Banco de Dados (Zero Leakage Schema)
            </h4>
            <p className="text-xs text-slate-500 mt-1">
              Visualização das tabelas PostgreSQL utilizadas pelo sistema. Esta estrutura armazena separadamente os <strong>sinais brutos de intent</strong> dos <strong>leads estruturados</strong>, garantindo que nenhum contato em potencial seja descartado.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tabela Signals */}
            <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
              <div className="bg-[#FAF9F6] border-b border-slate-200 p-3 flex justify-between items-center font-mono">
                <span className="font-extrabold text-slate-800">tabela: signals</span>
                <span className="text-[10px] font-bold text-slate-400">Ingestão Primária</span>
              </div>
              <div className="p-3 bg-slate-950 font-mono text-[10px] text-emerald-400 leading-relaxed max-h-[160px] overflow-y-auto">
{`CREATE TABLE signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source VARCHAR(50) NOT NULL,       -- Google, Facebook, Marketplace, etc
  user_identifier VARCHAR(100),       -- Nome de perfil ou id hash
  raw_text TEXT NOT NULL,             -- Texto bruto do comentário ou busca
  intent_score INT NOT NULL,          -- Score de urgência (0 a 40)
  intent_level VARCHAR(20) NOT NULL,  -- QUENTE, MORNO, SINAL ATIVO, FRIO
  location VARCHAR(100),
  created_at TIMESTAMP DEFAULT NOW()
);`}
              </div>
            </div>

            {/* Tabela Leads */}
            <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
              <div className="bg-[#FAF9F6] border-b border-slate-200 p-3 flex justify-between items-center font-mono">
                <span className="font-extrabold text-slate-800">tabela: leads</span>
                <span className="text-[10px] font-bold text-slate-400">CRM & Contatos Estruturados</span>
              </div>
              <div className="p-3 bg-slate-950 font-mono text-[10px] text-emerald-400 leading-relaxed max-h-[160px] overflow-y-auto">
{`CREATE TABLE leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(150) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(150),
  signal_group_id UUID,               -- Vínculo com sinal original
  score INT,
  status VARCHAR(50),                 -- Novo, Contatado, Ganho, Perdido
  created_at TIMESTAMP DEFAULT NOW()
);`}
              </div>
            </div>

            {/* Tabela Identity Map */}
            <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
              <div className="bg-[#FAF9F6] border-b border-slate-200 p-3 flex justify-between items-center font-mono">
                <span className="font-extrabold text-slate-800">tabela: identity_map</span>
                <span className="text-[10px] font-bold text-slate-400">Cruzador de Perfis</span>
              </div>
              <div className="p-3 bg-slate-950 font-mono text-[10px] text-emerald-400 leading-relaxed max-h-[160px] overflow-y-auto">
{`CREATE TABLE identity_map (
  user_identifier VARCHAR(100) PRIMARY KEY,
  linked_sources JSONB NOT NULL,       -- Listagem de redes associadas
  confidence_score INT NOT NULL,       -- Grau de proximidade comportamental
  last_seen TIMESTAMP DEFAULT NOW()
);`}
              </div>
            </div>

            {/* Tabela Property Signals */}
            <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
              <div className="bg-[#FAF9F6] border-b border-slate-200 p-3 flex justify-between items-center font-mono">
                <span className="font-extrabold text-slate-800">tabela: property_signals (Seller Module)</span>
                <span className="text-[10px] font-bold text-slate-400">Anúncios FSBO</span>
              </div>
              <div className="p-3 bg-slate-950 font-mono text-[10px] text-emerald-400 leading-relaxed max-h-[160px] overflow-y-auto">
{`CREATE TABLE property_signals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source VARCHAR(50) NOT NULL,
  owner_identifier VARCHAR(100) NOT NULL,
  property_text TEXT NOT NULL,
  location VARCHAR(100),
  price NUMERIC(12,2),
  ips_score INT DEFAULT 0,            -- Índice de Pressão de Venda (0-100)
  created_at TIMESTAMP DEFAULT NOW()
);`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. MÉTRICAS E HEATMAP */}
      {activeSubTab === "metrics" && (
        <div className="space-y-6 animate-fadeIn">
          {/* Grid de Métricas Principais */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Sinais Ingeridos (Este Mês)</span>
              <span className="text-2xl font-extrabold text-slate-800 font-mono">2.458</span>
              <div className="flex items-center gap-1 text-[10px] text-emerald-600 font-bold">
                <span>▲ 100% dos cliques capturados</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Classificados Inteligentes</span>
              <span className="text-2xl font-extrabold text-indigo-600 font-mono">{signalsConvertedToIntent}</span>
              <div className="flex items-center gap-1 text-[10px] text-indigo-600 font-bold">
                <span>89% de eficácia NLP</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Leads de CRM Gerados</span>
              <span className="text-2xl font-extrabold text-emerald-600 font-mono">{leads.length}</span>
              <div className="flex items-center gap-1 text-[10px] text-slate-500 font-medium">
                <span>Aumento de 530% vs mês anterior</span>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest font-mono block">Taxa de Conversão (Sinal → Lead)</span>
              <span className="text-2xl font-extrabold text-amber-700 font-mono">{conversionRate}%</span>
              <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                <span>Engrenagem sem fricção de contato</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Heatmap de Regiões */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                Heatmap de Intenção Ativa por Região (Teresópolis)
              </span>

              <div className="space-y-3.5 text-xs">
                {[
                  { neighborhood: "Agriões", demand: "Alta Procura por Aptos 3 Qts", score: 94, barWidth: "w-full", color: "bg-red-500" },
                  { neighborhood: "Várzea", demand: "Média Procura por Comercial / Aluguel", score: 72, barWidth: "w-[72%]", color: "bg-orange-500" },
                  { neighborhood: "Alto", demand: "Busca de Casas de Temporada & Vista", score: 68, barWidth: "w-[68%]", color: "bg-amber-500" },
                  { neighborhood: "Vale do Paraíso", demand: "Procura Familiar de Casas de Condomínio", score: 45, barWidth: "w-[45%]", color: "bg-indigo-500" },
                  { neighborhood: "Granja Guarani", demand: "Buscas por Lotes de Terra FSBO", score: 28, barWidth: "w-[28%]", color: "bg-slate-400" }
                ].map((item) => (
                  <div key={item.neighborhood} className="space-y-1.5">
                    <div className="flex justify-between items-baseline font-semibold">
                      <span className="text-slate-800">{item.neighborhood} <span className="text-[10px] font-normal text-slate-400">({item.demand})</span></span>
                      <span className="font-mono text-slate-600">{item.score} pts</span>
                    </div>
                    <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${item.color} ${item.barWidth}`} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ranking de Palavras Chave NLP */}
            <div className="lg:col-span-6 bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-mono block">
                Nuvem de Palavras-Chave de Urgência Imobiliária (NLP Extract)
              </span>

              <div className="flex flex-wrap gap-2 text-xs font-semibold pt-1">
                {[
                  { text: "urgente", score: "420 ocorrências", color: "bg-red-50 text-red-800 border-red-200 text-sm" },
                  { text: "direto com proprietário", score: "312 ocorrências", color: "bg-amber-50 text-amber-800 border-amber-200 text-sm" },
                  { text: "aceita financiamento", score: "298 ocorrências", color: "bg-emerald-50 text-emerald-800 border-emerald-200 text-xs" },
                  { text: "caixa", score: "201 ocorrências", color: "bg-indigo-50 text-indigo-800 border-indigo-200 text-xs" },
                  { text: "baixo valor", score: "189 ocorrências", color: "bg-purple-50 text-purple-800 border-purple-200 text-[11px]" },
                  { text: "motivo de mudança", score: "144 ocorrências", color: "bg-pink-50 text-pink-800 border-pink-200 text-[11px]" },
                  { text: "dispenso imobiliária", score: "112 ocorrências", color: "bg-slate-50 text-slate-800 border-slate-200 text-[10px]" },
                  { text: "permuta menor valor", score: "94 ocorrências", color: "bg-blue-50 text-blue-800 border-blue-200 text-[10px]" }
                ].map((word) => (
                  <span 
                    key={word.text}
                    title={word.score}
                    className={`px-2.5 py-1.5 rounded-full border cursor-help font-mono tracking-tight font-bold ${word.color}`}
                  >
                    {word.text} <span className="text-[8px] opacity-60 font-sans font-normal">({word.score.split(" ")[0]})</span>
                  </span>
                ))}
              </div>

              <div className="bg-indigo-50/40 border border-indigo-100 p-3 rounded text-[10px] text-indigo-900 leading-relaxed flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-indigo-600 shrink-0" />
                <span>
                  <strong>Insight do Dia:</strong> O termo "direto com proprietário" cresceu 28% nos últimos 7 dias em Teresópolis, sinalizando saturação de anúncios em portais tradicionais e maior abertura de proprietários para parcerias ativas de venda rápida.
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
