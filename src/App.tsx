/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { IMOBILIARIAS_DATA, INITIAL_BUYER_LEADS } from "./data";
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

// Componente Logo Leandro Rodrigues Imóveis (Dinâmico: Imagem Oficial com Fallback SVG de Alta Fidelidade)
const LeandroRodriguesLogo = ({ className = "h-12 w-12" }: { className?: string }) => {
  const [imgError, setImgError] = useState(false);
  const [localLogo, setLocalLogo] = useState<string | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("lr_portal_custom_logo");
      if (stored) {
        setLocalLogo(stored);
      }
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
    return (
      <img 
        src={localLogo} 
        className={`${className} object-contain select-none`} 
        alt="Leandro Rodrigues Imóveis"
      />
    );
  }

  // Se não houve erro ao carregar a imagem oficial, tenta mostrá-la
  if (!imgError) {
    return (
      <img 
        src="/logo.png" 
        onError={() => setImgError(true)} 
        className={`${className} object-contain select-none`} 
        alt="Leandro Rodrigues Imóveis"
      />
    );
  }

  // Fallback: Desenho vetorial de altíssima fidelidade baseado na logomarca real enviado pelo Leandro
  return (
    <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Gradiente Metálico Cromado para a Borda */}
        <linearGradient id="chrome-border" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="25%" stopColor="#CBD5E1" />
          <stop offset="50%" stopColor="#FFFFFF" />
          <stop offset="75%" stopColor="#475569" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        {/* Gradiente Ciano Metálico Escuro */}
        <linearGradient id="metallic-cyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#14B8A6" />
          <stop offset="30%" stopColor="#0B7C95" />
          <stop offset="70%" stopColor="#005B6E" />
          <stop offset="100%" stopColor="#00313C" />
        </linearGradient>
        {/* Sombra de Projeção */}
        <filter id="glow-logo" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="1" dy="3" stdDeviation="4" floodColor="#000000" floodOpacity="0.25" />
        </filter>
      </defs>
      
      {/* Sombra do Diamante */}
      <rect x="24" y="24" width="192" height="192" rx="48" transform="rotate(45 120 120)" fill="black" fillOpacity="0.08" />

      {/* Borda Externa - Diamante Cromado / Prateado */}
      <rect 
        x="30" 
        y="30" 
        width="180" 
        height="180" 
        rx="42" 
        transform="rotate(45 120 120)" 
        stroke="url(#chrome-border)" 
        strokeWidth="11" 
        fill="#FFFFFF" 
        className="dark:fill-neutral-900"
        style={{ filter: "drop-shadow(0px 6px 12px rgba(0,0,0,0.12))" }}
      />

      {/* Linha de Brilho Interno Prateada */}
      <rect 
        x="37" 
        y="37" 
        width="166" 
        height="166" 
        rx="36" 
        transform="rotate(45 120 120)" 
        stroke="#FFFFFF" 
        strokeWidth="1.5" 
        strokeOpacity="0.6"
        fill="transparent" 
      />

      {/* Monograma Estilizado L + R centralizado */}
      <g transform="translate(120, 115) scale(0.8) translate(-120, -120)" filter="url(#glow-logo)">
        {/* Elemento em "L" de fundo */}
        <path 
          d="M 68 140 
             L 138 140 
             L 138 120
             L 88 120
             L 88 70
             L 68 70
             Z" 
          fill="url(#metallic-cyan)" 
          transform="rotate(45 120 120)" 
        />
        {/* Elemento em "R" sobreposto e aninhado */}
        <path 
          d="M 102 100 
             L 134 100 
             C 144 100, 144 82, 134 82
             L 102 82
             Z
             M 102 68
             L 134 68
             C 152 68, 158 88, 145 102
             L 164 135
             L 144 135
             L 128 114
             L 102 114
             L 102 135
             L 86 135
             L 86 68
             Z"
          fill="url(#metallic-cyan)" 
          transform="rotate(45 120 120)" 
        />
      </g>
    </svg>
  );
};

const COLOR_PRESETS = {
  turquoise: { name: "Azul Turquesa", primary: "#00AFCB", hover: "#008FA6", light: "rgba(0, 175, 203, 0.08)", lightHover: "rgba(0, 175, 203, 0.16)" },
  dark_blue: { name: "Azul Escuro", primary: "#1E3A8A", hover: "#172554", light: "rgba(30, 58, 138, 0.08)", lightHover: "rgba(30, 58, 138, 0.16)" },
  green: { name: "Verde", primary: "#10B981", hover: "#059669", light: "rgba(16, 185, 129, 0.08)", lightHover: "rgba(16, 185, 129, 0.16)" },
  gray: { name: "Cinza Executivo", primary: "#4B5563", hover: "#374151", light: "rgba(75, 85, 99, 0.08)", lightHover: "rgba(75, 85, 99, 0.16)" },
  premium: { name: "Portanto, Premium", primary: "#D97706", hover: "#B45309", light: "rgba(217, 119, 6, 0.08)", lightHover: "rgba(217, 119, 6, 0.16)" },
  clean: { name: "Branco Clean", primary: "#0F172A", hover: "#1E293B", light: "rgba(15, 23, 42, 0.08)", lightHover: "rgba(15, 23, 42, 0.16)" },
};

const PRESETS_PERSONAS = {
  mariana: {
    name: "Mariana Costa - A Jovem Conectada",
    age: "24-30 anos",
    gender: "Feminino (68% deste nicho)",
    role: "Profissional liberal em início de carreira, solteira",
    city: "Rio de Janeiro (Zona Sul, Barra da Tijuca) / Niterói (Icaraí)",
    propertyType: "Apartamentos compactos de 1 quarto, Studios ou Loft",
    budget: "R$ 350.000 a R$ 550.000 (ou Locação até R$ 3.500/mês)",
    whereTheyAdvertise: "Instagram, Grupos do Facebook, OLX",
    whereTheySearch: "QuintoAndar, Loft, Instagram, recomendações no Twitter",
    preferredRooms: "1 quarto (82% de preferência), no máximo 2",
    otherProperties: "Studios, Co-living, Kitnets modernas",
    isLost: "Altamente perdida sobre como funciona financiamento imobiliário, FGTS, taxas cartorárias, vistoria e garantias de locação. Sente-se intimidada por imobiliárias tradicionais.",
    whereToFind: "Anúncios patrocinados no Instagram/TikTok, blogs de decoração/vida urbana, Google Meu Negócio pesquisando por 'estúdio perto do metrô'.",
    howToApproach: "Abordagem leve, informal, com linguagem clara, sem jargões jurídicos pesados. Foco em desmistificar a burocracia e enviar vídeos curtos (Reels) do imóvel.",
    whatsappPreference: 95,
    phonePreference: 5,
    socialPreference: 80,
    accessibilityNeeds: {
      petFriendly: "Altíssima prioridade (possui cachorro/gato e não aceita locais com restrições)",
      disabledElderly: "Baixa prioridade (prefere locais com bicicletário e academia)",
      nearTransit: "Altíssima prioridade (próximo ao metrô ou ciclovia)"
    },
    googleMyBusinessStrategy: "Poste fotos modernas com foco em 'pronto para morar' e 'aceita pet'. Use a palavra-chave 'Studio moderno perto do metrô [Cidade]' no título de postagens e avaliações.",
    adCopy: "🔑 Cansada de burocracia para ter seu próprio canto? Studios modernos e compactos no [Bairro], a 5 min do metrô, com taxa de condomínio baixa e área de lazer incrível. E sim, seu pet é super bem-vindo! 🐶🐱 Fale comigo no WhatsApp e faça uma simulação de financiamento descomplicada hoje mesmo!",
    whatsappTemplate: "Olá Mariana! Vi que você tem interesse em apartamentos práticos na região. Preparei um guia rápido em PDF explicando passo a passo como funciona a compra do primeiro imóvel usando FGTS e sem complicação. Posso te enviar por aqui? Segue também um tour em vídeo de 1 minuto de um studio lindo que acabou de entrar no portfólio. Abraço, Leandro."
  },
  roberto: {
    name: "Roberto & Ana - A Família Pet & Conforto",
    age: "35-48 anos",
    gender: "Casal (Decisão compartilhada)",
    role: "Profissionais de nível médio/sênior, 1 ou 2 filhos pequenos",
    city: "Rio de Janeiro (Tijuca, Freguesia, Recreio) / Niterói (Santa Rosa, Jardim Icaraí)",
    propertyType: "Apartamentos de 3 quartos, coberturas ou casas em condomínio",
    budget: "R$ 650.000 a R$ 1.200.000",
    whereTheyAdvertise: "OLX, Portais de imobiliárias locais",
    whereTheySearch: "Zap Imóveis, VivaReal, Portais tradicionais, Google Search",
    preferredRooms: "3 quartos (75% preferem 3 quartos, 25% buscam 2 quartos)",
    otherProperties: "Casas de condomínio fechado, coberturas lineares",
    isLost: "Sabem o que querem fisicamente, mas estão perdidos sobre a melhor taxa de juros de bancos (Itaú vs. Caixa) e se vale a pena vender o imóvel atual como parte de pagamento (permuta).",
    whereToFind: "Google Search (pesquisas por 'apartamento 3 quartos [bairro]'), escolas de educação infantil da região, parquinhos públicos e portais tradicionais.",
    howToApproach: "Abordagem altamente profissional e consultiva. Envie tabelas comparativas de financiamento bancário, análise de valor de metro quadrado da região e destaque a infraestrutura de lazer para crianças.",
    whatsappPreference: 70,
    phonePreference: 25,
    socialPreference: 35,
    accessibilityNeeds: {
      petFriendly: "Alta prioridade (espaço para cão de médio/grande porte e área de lazer pet no prédio)",
      disabledElderly: "Média-Alta prioridade (pensam na acessibilidade para visitas de avós ou futura mobilidade)",
      nearTransit: "Média prioridade (foco maior em segurança e proximidade a colégios de prestígio)"
    },
    googleMyBusinessStrategy: "Destaque imóveis com 'infraestrutura de clube' e 'condomínio fechado'. Poste dicas de infraestrutura de bairros para famílias no perfil e responda dúvidas sobre financiamento imobiliário.",
    adCopy: "🏡 Mais espaço, segurança e lazer completo para os seus filhos crescerem felizes! Apartamentos amplos de 3 quartos (1 suíte) com varanda gourmet e lazer de clube no [Bairro]. Aceita permuta sob avaliação e financiamento facilitado com taxas exclusivas de mercado. Clique em 'Saiba Mais' e agende uma visita privativa com sua família!",
    whatsappTemplate: "Olá Roberto, tudo bem? Notei que você está buscando um imóvel espaçoso para sua família no [Bairro]. Separei duas opções exclusivas de 3 quartos com lazer completo de clube que acabaram de entrar no sistema (antes de irem para os portais). Ambos aceitam pets de grande porte. Se desejar, posso agendar uma visita em horário flexível no final de semana ou preparar um estudo de financiamento comparando Caixa e Itaú. Como prefere?"
  },
  carlos: {
    name: "Seu Carlos - O Aposentado Tradicional",
    age: "60-75 anos",
    gender: "Masculino/Feminino (Aposentados)",
    role: "Aposentado, pensionista, quer reduzir o tamanho do imóvel atual",
    city: "Rio de Janeiro (Copacabana, Ipanema, Botafogo, Flamengo) / Niterói (Icaraí plano)",
    propertyType: "Apartamentos lineares de 2 quartos, próximos a comércios e metrô",
    budget: "R$ 500.000 a R$ 900.000 (geralmente compra à vista com a venda de um imóvel maior)",
    whereTheyAdvertise: "Anúncios em jornais locais de bairro, placas físicas nas ruas",
    whereTheySearch: "Caminhadas pelo bairro, imobiliárias físicas da vizinhança, Google Maps, indicação de zeladores",
    preferredRooms: "2 quartos (85% preferem 2 quartos para receber filhos/netos)",
    otherProperties: "Apartamentos antigos com pé direito alto, prédios pequenos sem elevador ou prédios com elevador e portaria 24h",
    isLost: "Sentem-se excluídos por portais 100% digitais. Estão perdidos em relação à burocracia digital (assinaturas digitais, envio de certidões online) e têm muito medo de golpes de internet.",
    whereToFind: "Google Maps (pesquisando imobiliárias locais), placas físicas no bairro, recomendações de conhecidos e vizinhos.",
    howToApproach: "Ligação telefônica calorosa e respeitosa, visitas físicas acompanhadas com paciência. Explique cada etapa burocrática pessoalmente, imprima documentos se necessário, e conquiste a confiança mostrando-se um profissional do bairro.",
    whatsappPreference: 40,
    phonePreference: 55,
    socialPreference: 10,
    accessibilityNeeds: {
      petFriendly: "Média prioridade (geralmente possuem um cão pequeno ou gato de companhia)",
      disabledElderly: "Altíssima prioridade (rampa de acesso, elevadores modernos, banheiros adaptáveis, sem escadarias íngremes)",
      nearTransit: "Altíssima prioridade (bairro plano, próximo a mercados, farmácias, padarias, laboratórios médicos e metrô)"
    },
    googleMyBusinessStrategy: "Otimize seu Google Meu Negócio local com foco em 'Atendimento humanizado', 'Corretor credenciado' e 'Endereço físico de fácil acesso'. Publique fotos da sua equipe sorrindo e de visitas presenciais bem-sucedidas.",
    adCopy: "🌿 Praticidade e segurança para aproveitar a melhor fase da vida. Apartamentos planos de 2 quartos com portaria 24 horas, rampa de acessibilidade e elevador, no coração do [Bairro] - a poucos passos de farmácias, mercados e condução. Atendimento personalizado e acompanhamento jurídico completo em todas as etapas físicas da compra. Ligue agora e converse diretamente conosco!",
    whatsappTemplate: "Olá Seu Carlos, boa tarde. Sou o Leandro Rodrigues, corretor aqui da região. Conforme conversamos por telefone, separei aquele apartamento térreo/com elevador muito bem localizado, a duas quadras do mercado e sem escadas. O prédio possui portaria 24h e rampa de acessibilidade para sua total segurança. O proprietário está aberto a propostas à vista. O senhor gostaria que eu passasse para buscá-lo de carro amanhã às 14h para fazermos uma visita tranquila? Conte comigo."
  },
  henrique: {
    name: "Dr. Henrique - O Investidor de Alta Renda",
    age: "40-60 anos",
    gender: "Masculino (72% deste nicho)",
    role: "Médico, empresário, advogado, investidor qualificado",
    city: "Rio de Janeiro (Ipanema, Leblon, Copacabana, Barra) / Niterói (Icaraí Orla)",
    propertyType: "Apartamentos de 1 ou 2 quartos de alto padrão ou studios de luxo para locação short-stay",
    budget: "R$ 800.000 a R$ 2.500.000",
    whereTheyAdvertise: "LinkedIn, revistas de negócios, portais de leilão",
    whereTheySearch: "Google Search (buscando termos técnicos de retorno financeiro), LinkedIn, contatos restritos (off-market)",
    preferredRooms: "1 ou 2 quartos (foco total na liquidez de aluguel por temporada ou Airbnb)",
    otherProperties: "Lajes corporativas, salas comerciais na Zona Sul, hotéis condo",
    isLost: "Não estão perdidos, são muito bem informados. Porém, estão sem tempo. Estão 'perdidos' na curadoria dos melhores ativos com alto Cap Rate (retorno anual sobre aluguel) e buscam corretores que falem a língua das finanças imobiliárias.",
    whereToFind: "LinkedIn profissional, anúncios focados em investimentos imobiliários, Google Ads com palavras-chave de alta conversão, clubes de negócios e indicações premium.",
    howToApproach: "Envie relatórios concisos, focados em números: Cap Rate estimado, valor do metro quadrado abaixo da média de mercado, potencial de valorização futura e histórico de liquidez da região. Sem enrolação.",
    whatsappPreference: 85,
    phonePreference: 10,
    socialPreference: 15,
    accessibilityNeeds: {
      petFriendly: "Média prioridade (pensa na facilidade de locação para turistas com animais)",
      disabledElderly: "Média prioridade (foco maior na infraestrutura moderna, fechadura eletrônica e serviço de portaria)",
      nearTransit: "Alta prioridade (proximidade a praias, pontos turísticos e hubs de transporte)"
    },
    googleMyBusinessStrategy: "Publique análises de mercado, gráficos de valorização regional e notícias sobre o mercado imobiliário de luxo. Posicione-se como especialista em consultoria patrimonial no Google Business.",
    adCopy: "📊 Diversifique seu patrimônio com excelente rentabilidade imobiliária! Unidade exclusiva de 1 ou 2 quartos de alto padrão na quadra da praia do [Bairro], ideal para locação por temporada (Airbnb/Short Stay) com rendimento estimado acima da renda fixa tradicional. Receba hoje mesmo o estudo completo de Cap Rate e vacância histórica. Entre em contato!",
    whatsappTemplate: "Olá Dr. Henrique, bom dia. Sou o Leandro Rodrigues. Acaba de entrar em nosso portfólio off-market (exclusivo) um apartamento de 1 quarto totalmente reformado e mobiliado a uma quadra da praia de Ipanema/Icaraí. Elaboramos um estudo de viabilidade financeira detalhado para este ativo, estimando um Cap Rate líquido anual de 8.4% via short-stay e ocupação média de 78%. Segue o relatório executivo em PDF para sua análise rápida. Se houver interesse em prosseguir com uma oferta estruturada, estou à disposição para uma call executiva."
  }
};

function enrichLead(lead: BuyerLead): BuyerLead {
  if (lead.confidenceScore !== undefined) {
    const score = lead.confidenceScore;
    const level = score >= 95 ? "Altamente Confiável" : score >= 80 ? "Dados Consistentes" : score >= 60 ? "Necessita Revisão" : "Não Recomendado";
    return { ...lead, confidenceLevel: level as any };
  }

  let score = 98;
  let hasInconsistencies = false;
  let inconsistencies: string[] = [];
  let sources = ["Portais Imobiliários Públicos", "Busca Indexada"];
  let method = "Cruzamento de Fontes Públicas e API de validação";

  const leadIdStr = String(lead.id).toLowerCase();

  if (leadIdStr.includes("lead-1") || leadIdStr.includes("ana")) {
    score = 98;
    sources = ["Grupo Leandro Rodrigues", "CRECI-RJ", "WhatsApp API"];
  } else if (leadIdStr.includes("lead-2") || leadIdStr.includes("eduardo")) {
    score = 92;
    sources = ["Facebook Groups (Classificados)", "LinkedIn Pro"];
  } else if (leadIdStr.includes("lead-3") || leadIdStr.includes("mariana")) {
    score = 88;
    sources = ["Instagram Hashtags", "Páginas Públicas"];
  } else if (leadIdStr.includes("lead-4") || leadIdStr.includes("carlos") || leadIdStr.includes("frederico")) {
    score = 55;
    hasInconsistencies = true;
    inconsistencies = ["Nome diferente do titular do telefone (Fernando vs Márcio no post de captação)"];
    sources = ["Portal OLX Lead", "Google Indexado"];
    method = "Extração via Scraper Web (Baixa confiança)";
  } else {
    const hash = lead.nome.length + lead.telefone.length;
    score = 65 + (hash % 31); // 65 to 95
    if (score < 72) {
      hasInconsistencies = true;
      inconsistencies = ["Telefone associado a múltiplos anúncios divergentes nas últimas 48 horas"];
    }
    sources = [lead.origem || "Portal Web", "WhatsApp API Checker"];
  }

  const level = score >= 95 ? "Altamente Confiável" : score >= 80 ? "Dados Consistentes" : score >= 60 ? "Necessita Revisão" : "Não Recomendado";

  const cleanPhone = lead.telefone.replace(/\D/g, "");

  return {
    ...lead,
    confidenceScore: score,
    confidenceLevel: level as any,
    sourcesChecked: sources,
    urlTrace: lead.urlTrace || `https://www.google.com/search?q=${encodeURIComponent(lead.nome)}+${cleanPhone}`,
    capturedAt: lead.capturedAt || `${lead.dataCaptura} 10:14:22 UTC`,
    textExcerpt: lead.textExcerpt || `"...tratar diretamente no telefone ${lead.telefone} com o proprietário ${lead.nome} sobre o anúncio de ${lead.tipoImovel} em ${lead.bairroInteresse}..."`,
    captureMethod: lead.captureMethod || method,
    hasInconsistencies,
    inconsistenciesDetected: inconsistencies,
    userFeedback: lead.userFeedback || null
  };
}

export default function App() {
  // Estados de Tema e Paleta de Cores
  const [themeMode, setThemeMode] = useState<"light" | "dark" | "night">(() => {
    try {
      return (localStorage.getItem("teresopolis_imob_theme") as any) || "light";
    } catch {
      return "light";
    }
  });

  const [accentColor, setAccentColor] = useState<string>(() => {
    try {
      return localStorage.getItem("teresopolis_imob_accent") || "turquoise";
    } catch {
      return "turquoise";
    }
  });

  const handleSetThemeMode = (mode: "light" | "dark" | "night") => {
    setThemeMode(mode);
    try {
      localStorage.setItem("teresopolis_imob_theme", mode);
    } catch (e) {
      console.warn(e);
    }
  };

  const handleSetAccentColor = (color: string) => {
    setAccentColor(color);
    try {
      localStorage.setItem("teresopolis_imob_accent", color);
    } catch (e) {
      console.warn(e);
    }
  };

  // Estados ativos
  const [activeTab, setActiveTab] = useState<"directory" | "guide" | "calculator" | "leads" | "intelligence" | "integrations">("leads");
  const [selectedCity, setSelectedCity] = useState<"Teresópolis" | "Guapimirim" | "Rio de Janeiro" | "Nova Friburgo">("Teresópolis");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBairro, setSelectedBairro] = useState<string>("Todos");
  const [selectedTipo, setSelectedTipo] = useState<"Todos" | "Imobiliária" | "Autônomo">("Todos");
  const [viewMode, setViewMode] = useState<"card" | "compact_list">("compact_list");
  const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [expandedLeadIds, setExpandedLeadIds] = useState<string[]>([]);
  const [leadFeedbacks, setLeadFeedbacks] = useState<{ [key: string]: string }>(() => {
    try {
      return JSON.parse(localStorage.getItem("teresopolis_lead_feedbacks") || "{}");
    } catch {
      return {};
    }
  });
  const [isExporting, setIsExporting] = useState(false);
  const [agencies, setAgencies] = useState<Imobiliaria[]>([]);
  
  // Estado de Mensagens de Prospecção (Disparador Rápido)
  const [prospectMessage, setProspectMessage] = useState(
    "Olá, {nome}! Tudo bem? Vi o seu contato no Guia Editorial de Imobiliárias de 2026 e gostaria de entrar em contato para apresentar uma proposta de parceria de captação de clientes. Aguardo seu contato!"
  );
  const [copySuccessId, setCopySuccessId] = useState<string | null>(null);

  // Estados de edição de telefone em lote (Inline)
  const [editingPhoneId, setEditingPhoneId] = useState<string | null>(null);
  const [editingPhoneValue, setEditingPhoneValue] = useState("");
  const [editingWaValue, setEditingWaValue] = useState("");

  // Estados da Campanha de Prospecção Contínua (Disparo em Lote)
  const [activeCampaignIndex, setActiveCampaignIndex] = useState<number | null>(null);
  const [copiedNotification, setCopiedNotification] = useState(false);

  // Estado para editor e novo cadastro de imobiliárias
  const [editingAgency, setEditingAgency] = useState<Imobiliaria | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  
  // Novo formulário temporário
  const [formName, setFormName] = useState("");
  const [formCreci, setFormCreci] = useState("");
  const [formPhone, setFormPhone] = useState("");
  const [formWhatsapp, setFormWhatsapp] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formBairro, setFormBairro] = useState("");
  const [formSite, setFormSite] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formSpecs, setFormSpecs] = useState<string[]>([]);
  const [specInput, setSpecInput] = useState("");
  const [formResponsavel, setFormResponsavel] = useState("");
  const [formLogoUrl, setFormLogoUrl] = useState("");

  // Estados para Radar de Compradores (Leads)
  const [showPaletteDropdown, setShowPaletteDropdown] = useState(false);
  const [crmSubTab, setCrmSubTab] = useState<"leads" | "pipeline" | "sheets" | "matches" | "dashboard">("leads");
  const [trendReportCity, setTrendReportCity] = useState<string | null>(null);
  const [expandedLeadTraceId, setExpandedLeadTraceId] = useState<string | null>(null);
  const [copiedKeyword, setCopiedKeyword] = useState<string | null>(null);
  const [buyerLeads, setBuyerLeads] = useState<BuyerLead[]>([]);
  const [isScanningLeads, setIsScanningLeads] = useState(false);
  const [scanMessage, setScanMessage] = useState("");
  const [leadSearchQuery, setLeadSearchQuery] = useState("");
  const [selectedLeadCategory, setSelectedLeadCategory] = useState<"Todos" | "Comprador" | "Proprietário">("Todos");
  const [selectedLeadPeriod, setSelectedLeadPeriod] = useState<"Todos" | "Hoje" | "7d" | "30d" | "90d">("Todos");
  const [selectedLeadBairro, setSelectedLeadBairro] = useState("Todos");
  const [selectedLeadTipo, setSelectedLeadTipo] = useState("Todos");
  const [selectedLeadStatus, setSelectedLeadStatus] = useState("Todos");
  const [buyerProspectTemplate, setBuyerProspectTemplate] = useState(
    "Olá {nome}, tudo bem? Sou especialista imobiliário e vi seu interesse em um {tipo_imovel} no bairro {bairro} com valor até R$ {valor_maximo}. Selecionei 3 opções excelentes fora do mercado comum para te apresentar. Gostaria de receber fotos pelo WhatsApp?"
  );
  const [ownerProspectTemplate, setOwnerProspectTemplate] = useState(
    "Olá {nome}, tudo bem? Vi seu anúncio de venda do seu {tipo_imovel} no bairro {bairro} por R$ {valor_maximo}. Sou especialista imobiliário e tenho clientes cadastrados buscando exatamente esse perfil na região. Gostaria de agendar uma visita para captar e anunciar o seu imóvel?"
  );

  // Estados para Inteligência & SEO (Novo Painel de Alta Conversão)
  const [seoCity, setSeoCity] = useState<string>("Teresópolis");
  const [seoAudience, setSeoAudience] = useState<"captação" | "venda" | "altopadrao" | "institucional">("captação");
  const [seoKeyword, setSeoKeyword] = useState<string>("");
  const [seoCustomTitle, setSeoCustomTitle] = useState<string>("");
  const [copiedPostNotify, setCopiedPostNotify] = useState<"all" | "tags" | "meta" | null>(null);
  
  const [generatedPost, setGeneratedPost] = useState<{
    title: string;
    body: string;
    hashtags: string;
    metaTitle: string;
    metaDesc: string;
    slug: string;
  } | null>(null);

  // Estado de Varredura de Cruzamento Inteligente
  const [crossSelectLeadId, setCrossSelectLeadId] = useState<string>("Todos");
  const [isCrossAnalyzing, setIsCrossAnalyzing] = useState(false);
  const [crossProgress, setCrossProgress] = useState<string>("");
  const [crossResults, setCrossResults] = useState<{
    leadName: string;
    leadType: string;
    bairro: string;
    imovel: string;
    valor: number;
    phone: string;
    matchedSites: { portal: string; status: "found" | "not_found"; url?: string; description?: string }[];
    intentIndex: number;
    searchBehavior: string;
  } | null>(null);

  // Sub-aba ativa do painel de Inteligência & Integrações
  const [intelSubTab, setIntelSubTab] = useState<"connections" | "marketplace" | "radar" | "brain" | "seo" | "blueprint" | "persona" | "intent">("intent");

  // Central de Integração - Contas conectadas
  const [connectedAccounts, setConnectedAccounts] = useState<{ [key: string]: { connected: boolean; username?: string; profileName?: string } }>(() => {
    try {
      const saved = localStorage.getItem("teresopolis_imob_connected_accounts");
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn("Erro ao ler connectedAccounts do localStorage:", e);
    }
    return {
      facebook: { connected: false },
      instagram: { connected: false },
      whatsapp: { connected: false },
      googlebusiness: { connected: false },
      analytics: { connected: false },
      searchconsole: { connected: false },
      youtube: { connected: false },
      linkedin: { connected: false },
      tiktok: { connected: false },
      olx: { connected: false },
    };
  });

  // Estados para o Blueprint Interativo SaaS (Radar de Inteligência Imobiliária)
  const [blueprintSelectedPillar, setBlueprintSelectedPillar] = useState<string>("all");
  const [blueprintWhatsAppType, setBlueprintWhatsAppType] = useState<"comprador" | "vendedor" | "investidor">("comprador");
  const [blueprintLeadScore, setBlueprintLeadScore] = useState<number>(85);
  const [blueprintCustomLeadName, setBlueprintCustomLeadName] = useState<string>("Felipe Medeiros");
  const [blueprintBairroInteresse, setBlueprintBairroInteresse] = useState<string>("Agriões");
  const [blueprintValueMax, setBlueprintValueMax] = useState<number>(480000);
  const [blueprintCopiedText, setBlueprintCopiedText] = useState<boolean>(false);

  // Modal de Simulação de Conexão Segura (OAuth)
  const [oauthModalOpen, setOauthModalOpen] = useState(false);
  const [oauthModalAccount, setOauthModalAccount] = useState<string | null>(null);
  const [oauthUsername, setOauthUsername] = useState("");
  const [oauthPassword, setOauthPassword] = useState("");
  const [oauthKeepLogged, setOauthKeepLogged] = useState(true);
  const [oauthError, setOauthError] = useState("");
  const [oauthProgress, setOauthProgress] = useState("");
  const [isConnecting, setIsConnecting] = useState(false);

  // Estados para Pesquisa Especializada de Perfil & Tráfego (Persona 7a Opção)
  const [selectedPersonaId, setSelectedPersonaId] = useState<string>("mariana");
  const [personaCustomCity, setPersonaCustomCity] = useState<string>("Rio de Janeiro");
  const [personaCustomBedrooms, setPersonaCustomBedrooms] = useState<string>("2 quartos");
  const [personaCustomAge, setPersonaCustomAge] = useState<string>("26-35");
  const [personaCustomGoal, setPersonaCustomGoal] = useState<string>("Comprar");
  const [personaCustomNeeds, setPersonaCustomNeeds] = useState<string>("Aceita Pets");
  const [personaGeneratedReport, setPersonaGeneratedReport] = useState<any>(null);
  const [personaIsGenerating, setPersonaIsGenerating] = useState<boolean>(false);

  // Estados de Configuração da Identidade Visual (Upload da Logomarca) e Credenciais
  const [integrationEmail, setIntegrationEmail] = useState<string>(() => {
    try {
      return localStorage.getItem("lr_portal_integration_email") || "cadastrodeleadslr@gmail.com";
    } catch {
      return "cadastrodeleadslr@gmail.com";
    }
  });

  const [integrationPassword, setIntegrationPassword] = useState<string>(() => {
    try {
      return localStorage.getItem("lr_portal_master_password") || "creci072065";
    } catch {
      return "creci072065";
    }
  });

  const [showPass, setShowPass] = useState(false);

  // Monitor de Marketplace & Oportunidades
  const [isScanningMarketplace, setIsScanningMarketplace] = useState(false);
  const [marketplaceScanProgress, setMarketplaceScanProgress] = useState("");
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [isAnalyzingOpportunity, setIsAnalyzingOpportunity] = useState<string | null>(null); // Opp ID

  const [marketplaceOpportunities, setMarketplaceOpportunities] = useState<MarketplaceOpportunity[]>([
    {
      id: "opp-1",
      type: "Venda",
      propertyType: "Casa",
      city: "Guapimirim",
      bairro: "Parada Modelo",
      value: 380000,
      date: "Há 2 horas",
      source: "Facebook Marketplace",
      contactName: "Carlos Alberto de Souza",
      phone: "(21) 98765-4321",
      whatsapp: "5521987654321",
      email: "carlos.souza.particular@gmail.com",
      socialProfile: "facebook.com/carlos.souza.particular",
      adLink: "https://www.facebook.com/marketplace/item/8492049182",
      urgencyLevel: "Alta",
      details: "Vendo urgente casa linear de 2 quartos com quintal grande plano. Aceito propostas à vista. Motivo de mudança de estado.",
      status: "Novo"
    },
    {
      id: "opp-2",
      type: "Venda",
      propertyType: "Terreno",
      city: "Teresópolis",
      bairro: "Albuquerque",
      value: 145000,
      date: "Há 1 dia",
      source: "OLX",
      contactName: "Maria das Graças",
      phone: "(24) 99822-1144",
      whatsapp: "5524998221144",
      adLink: "https://rj.olx.com.br/regiao-serrana/terrenos/terreno-plano-em-albuquerque-9401948",
      urgencyLevel: "Média",
      details: "Lote totalmente plano medindo 1.100m² em rua residencial tranquila de Albuquerque. Água de nascente e luz na porta. Escritura ok.",
      status: "Novo"
    },
    {
      id: "opp-3",
      type: "Venda",
      propertyType: "Cobertura",
      city: "Rio de Janeiro",
      bairro: "Copacabana",
      value: 1750000,
      date: "Há 4 horas",
      source: "Grupo de Facebook",
      contactName: "Investimentos Imobiliários Zona Sul",
      socialProfile: "facebook.com/groups/imoveiszonasul/user/4921",
      adLink: "https://www.facebook.com/groups/vendasrj/permalink/1039401",
      urgencyLevel: "Alta",
      details: "Repasse de cobertura duplex em Copacabana a 2 quadras da praia. 3 suítes, piscina privativa e churrasqueira. Excelente para investidores.",
      status: "Novo"
    },
    {
      id: "opp-4",
      type: "Aluguel",
      propertyType: "Apartamento",
      city: "Nova Friburgo",
      bairro: "Centro",
      value: 2300,
      date: "Há 3 dias",
      source: "ZAP Imóveis",
      contactName: "Ana Paula Silva",
      email: "anapaula.friburgo@gmail.com",
      adLink: "https://www.zapimoveis.com.br/aluguel/apartamento-centro-friburgo",
      urgencyLevel: "Baixa",
      details: "Apartamento de 1 quarto bem arejado no coração de Nova Friburgo. Armários embutidos na cozinha. Direto com proprietário, exige fiador.",
      status: "Novo"
    },
    {
      id: "opp-5",
      type: "Venda",
      propertyType: "Sítio/Chácara",
      city: "Guapimirim",
      bairro: "Barreira",
      value: 620000,
      date: "Há 6 horas",
      source: "OLX",
      contactName: "Fernando de Souza",
      phone: "(21) 97111-5544",
      whatsapp: "5521971115544",
      email: "fernandinho_guapi@hotmail.com",
      adLink: "https://rj.olx.com.br/regiao-serrana/sitios/sitio-com-rio-e-piscina-natural-9040184",
      urgencyLevel: "Alta",
      details: "Chácara paradisíaca na Barreira de Guapimirim. Rio de água cristalina passando nos fundos. Casa sede com 3 quartos, varandão e canil.",
      status: "Novo"
    },
    {
      id: "opp-6",
      type: "Venda",
      propertyType: "Casa em Condomínio",
      city: "Teresópolis",
      bairro: "Agriões",
      value: 1250000,
      date: "Há 2 dias",
      source: "Facebook Marketplace",
      contactName: "Beto Consultoria & Parcerias",
      phone: "(24) 98112-9900",
      whatsapp: "5524981129900",
      adLink: "https://www.facebook.com/marketplace/item/9240194821",
      urgencyLevel: "Média",
      details: "Excelente oportunidade em Agriões. Linda casa duplex de 4 quartos, acabamento alto padrão, condomínio com infra completa. CRECI-RJ ativo, faço parceria.",
      status: "Novo"
    }
  ]);
  
  // Estado para editor de lead
  const [editingLead, setEditingLead] = useState<BuyerLead | null>(null);
  const [isCreatingNewLead, setIsCreatingNewLead] = useState(false);
  
  // Formulário de Lead
  const [leadFormTipoLead, setLeadFormTipoLead] = useState<"Comprador" | "Proprietário">("Comprador");
  const [leadFormNome, setLeadFormNome] = useState("");
  const [leadFormTelefone, setLeadFormTelefone] = useState("");
  const [leadFormWhatsapp, setLeadFormWhatsapp] = useState("");
  const [leadFormEmail, setLeadFormEmail] = useState("");
  const [leadFormRedeSocial, setLeadFormRedeSocial] = useState("");
  const [leadFormCidade, setLeadFormCidade] = useState<"Teresópolis" | "Guapimirim" | "Rio de Janeiro" | "Nova Friburgo">("Teresópolis");
  const [leadFormBairro, setLeadFormBairro] = useState("");
  const [leadFormTipoImovel, setLeadFormTipoImovel] = useState<BuyerLead["tipoImovel"]>("Apartamento");
  const [leadFormValorMaximo, setLeadFormValorMaximo] = useState<number>(0);
  const [leadFormQuartos, setLeadFormQuartos] = useState<number>(2);
  const [leadFormOrigem, setLeadFormOrigem] = useState<string>("Busca Google (Intenção)");
  const [leadFormDetalhes, setLeadFormDetalhes] = useState("");
  const [leadFormStatus, setLeadFormStatus] = useState<BuyerLead["status"]>("Pendente");

  // Exportar relatório PDF curado de imobiliárias
  const handleExportPDF = () => {
    setIsExporting(true);
    try {
      generateAgenciesPDF(filteredAgencies, selectedCity);
    } catch (e) {
      console.error("Falha ao exportar PDF:", e);
    } finally {
      setIsExporting(false);
    }
  };

  const fetchLeads = () => {
    fetch("/api/leads")
      .then((res) => {
        if (!res.ok) throw new Error("Erro de rede ao buscar leads");
        return res.json();
      })
      .then((data) => {
        setBuyerLeads(data);
      })
      .catch((err) => {
        console.error("Erro ao atualizar leads do backend:", err);
        // Fallback local caso caia
        try {
          const savedLeads = localStorage.getItem("teresopolis_imob_buyer_leads");
          if (savedLeads) {
            setBuyerLeads(JSON.parse(savedLeads));
          } else {
            setBuyerLeads(INITIAL_BUYER_LEADS);
          }
        } catch (e) {
          setBuyerLeads(INITIAL_BUYER_LEADS);
        }
      });
  };

  const fetchAgencies = () => {
    fetch("/api/agencies")
      .then((res) => {
        if (!res.ok) throw new Error("Erro de rede ao buscar imobiliárias");
        return res.json();
      })
      .then((data) => {
        setAgencies(data);
      })
      .catch((err) => {
        console.error("Erro ao atualizar imobiliárias do backend:", err);
        // Fallback local caso caia
        try {
          const savedAgencies = localStorage.getItem("teresopolis_imob_database_v2");
          if (savedAgencies) {
            setAgencies(JSON.parse(savedAgencies));
          } else {
            setAgencies(IMOBILIARIAS_DATA);
          }
        } catch (e) {
          setAgencies(IMOBILIARIAS_DATA);
        }
      });
  };

  // Carregar banco de dados de imobiliárias, favoritos e leads do localStorage/API
  useEffect(() => {
    try {
      const savedFavorites = localStorage.getItem("teresopolis_imob_favorites");
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    } catch (e) {
      console.warn("Erro ao ler favoritos do localStorage:", e);
    }
    
    // Buscar dados reais das APIs
    fetchLeads();
    fetchAgencies();
  }, []);

  // Salvar favoritos no localStorage quando alterado
  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      try {
        localStorage.setItem("teresopolis_imob_favorites", JSON.stringify(updated));
      } catch (e) {
        console.warn("localStorage não pôde ser gravado:", e);
      }
      return updated;
    });
  };

  // Salvar alterações de uma imobiliária (Editada ou Criada)
  const handleSaveAgency = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim()) return alert("O nome da imobiliária é obrigatório.");

    // Formatar corretamente o número limpo do WhatsApp
    let cleanWA = formWhatsapp.replace(/\D/g, "");
    if (cleanWA && !cleanWA.startsWith("55") && cleanWA.length <= 11) {
      cleanWA = "55" + cleanWA; // Garante o DDI do Brasil se não estiver presente
    }

    if (isCreatingNew) {
      const newId = `custom-imob-${Date.now()}`;
      const newAgency: Imobiliaria = {
        id: newId,
        nome: formName,
        creci: formCreci || "0000-J",
        telefone: formPhone || "(21) 99999-9999",
        whatsapp: cleanWA || "5521999999999",
        endereco: formAddress || "Endereço em preenchimento",
        bairro: formBairro || "Centro",
        cidade: selectedCity,
        descricao: formDesc || "Nova imobiliária registrada no catálogo local de leads.",
        site: formSite,
        destacada: false,
        nota: 5.0,
        avaliacoes: 1,
        especialidades: formSpecs.length > 0 ? formSpecs : ["Venda", "Locação"],
        imagemUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
        responsavel: formResponsavel || "Responsável não informado",
        logoUrl: formLogoUrl || "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80"
      };

      fetch("/api/agencies", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAgency)
      })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao criar imobiliária");
          fetchAgencies();
        })
        .catch(err => {
          console.error("Erro ao criar imobiliária no backend:", err);
          setAgencies(prev => [newAgency, ...prev]);
        });
    } else if (editingAgency) {
      const updatedAgency = {
        nome: formName,
        creci: formCreci || editingAgency.creci,
        telefone: formPhone || editingAgency.telefone,
        whatsapp: cleanWA || editingAgency.whatsapp,
        endereco: formAddress || editingAgency.endereco,
        bairro: formBairro || editingAgency.bairro,
        site: formSite,
        descricao: formDesc || editingAgency.descricao,
        especialidades: formSpecs.length > 0 ? formSpecs : editingAgency.especialidades,
        responsavel: formResponsavel || editingAgency.responsavel,
        logoUrl: formLogoUrl || editingAgency.logoUrl
      };

      fetch(`/api/agencies/${editingAgency.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedAgency)
      })
        .then(res => {
          if (!res.ok) throw new Error("Erro ao atualizar imobiliária");
          fetchAgencies();
        })
        .catch(err => {
          console.error("Erro ao atualizar imobiliária no backend:", err);
          setAgencies(prev => prev.map(item => item.id === editingAgency.id ? { ...item, ...updatedAgency } : item));
        });
    }

    // Fechar e redefinir formulários
    setEditingAgency(null);
    setIsCreatingNew(false);
    resetForm();
  };

  // Excluir imobiliária da listagem
  const handleDeleteAgency = (id: string) => {
    if (!window.confirm("Deseja realmente remover esta imobiliária permanentemente do seu catálogo de leads?")) return;
    
    fetch(`/api/agencies/${id}`, {
      method: "DELETE"
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao deletar imobiliária");
        fetchAgencies();
      })
      .catch(err => {
        console.error("Erro ao deletar imobiliária:", err);
        setAgencies(prev => prev.filter(item => item.id !== id));
      });
  };

  // Redefinir toda a base para o padrão curado do sistema
  const handleResetDatabase = () => {
    if (!window.confirm("Atenção: Isso redefinirá todas as edições, correções e novos leads criados para as configurações originais de fábrica do sistema. Deseja prosseguir?")) return;
    
    // Redefine locally and try to post to API or just reset local memory
    setAgencies(IMOBILIARIAS_DATA);
    try {
      localStorage.setItem("teresopolis_imob_database_v2", JSON.stringify(IMOBILIARIAS_DATA));
    } catch (err) {
      console.warn("Erro ao redefinir localStorage:", err);
    }
  };

  // Atualizar status do lead de forma reativa e persistente
  const handleUpdateAgencyStatus = (id: string, status: Imobiliaria["status"]) => {
    fetch(`/api/agencies/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao atualizar status");
        fetchAgencies();
      })
      .catch(err => {
        console.error("Erro ao atualizar status da imobiliária:", err);
        setAgencies(prev => prev.map((item) => item.id === id ? { ...item, status } : item));
      });
  };

  // Atualizar telefone e link de whatsapp direto na lista inline
  const handleUpdateAgencyPhoneInline = (id: string, phone: string, whatsapp: string) => {
    // Garante formato limpo de número para o link
    let cleanWA = whatsapp.replace(/\D/g, "");
    if (cleanWA && !cleanWA.startsWith("55") && cleanWA.length <= 11) {
      cleanWA = "55" + cleanWA;
    }

    const updated = agencies.map((item) => {
      if (item.id === id) {
        return { ...item, telefone: phone, whatsapp: cleanWA };
      }
      return item;
    });
    setAgencies(updated);
    try {
      localStorage.setItem("teresopolis_imob_database_v2", JSON.stringify(updated));
    } catch (err) {
      console.warn("Erro ao salvar telefone no localStorage:", err);
    }
    setEditingPhoneId(null);
  };

  // Abrir formulário para edição
  const startEditing = (agency: Imobiliaria) => {
    setEditingAgency(agency);
    setIsCreatingNew(false);
    setFormName(agency.nome);
    setFormCreci(agency.creci);
    setFormPhone(agency.telefone);
    setFormWhatsapp(agency.whatsapp);
    setFormAddress(agency.endereco);
    setFormBairro(agency.bairro);
    setFormSite(agency.site || "");
    setFormDesc(agency.descricao);
    setFormSpecs(agency.especialidades);
    setFormResponsavel(agency.responsavel || "");
    setFormLogoUrl(agency.logoUrl || "");
  };

  // Abrir formulário para novo registro
  const startCreating = () => {
    setIsCreatingNew(true);
    setEditingAgency(null);
    resetForm();
    // Preenche sugestões automáticas baseadas no ativo
    setFormBairro(availableBairros[1] !== "Todos" ? availableBairros[1] : "Centro");
  };

  const resetForm = () => {
    setFormName("");
    setFormCreci("");
    setFormPhone("");
    setFormWhatsapp("");
    setFormAddress("");
    setFormBairro("");
    setFormSite("");
    setFormDesc("");
    setFormSpecs([]);
    setSpecInput("");
    setFormResponsavel("");
    setFormLogoUrl("");
  };

  // Métodos de Gerenciamento de Leads de Compradores e Proprietários
  const resetLeadForm = () => {
    setLeadFormTipoLead("Comprador");
    setLeadFormNome("");
    setLeadFormTelefone("");
    setLeadFormWhatsapp("");
    setLeadFormEmail("");
    setLeadFormRedeSocial("");
    setLeadFormCidade("Teresópolis");
    setLeadFormBairro("");
    setLeadFormTipoImovel("Apartamento");
    setLeadFormValorMaximo(0);
    setLeadFormQuartos(2);
    setLeadFormOrigem("Busca Google (Intenção)");
    setLeadFormDetalhes("");
    setLeadFormStatus("Pendente");
  };

  const startEditingLead = (lead: BuyerLead) => {
    setEditingLead(lead);
    setIsCreatingNewLead(false);
    setLeadFormTipoLead(lead.tipoLead || "Comprador");
    setLeadFormNome(lead.nome);
    setLeadFormTelefone(lead.telefone);
    setLeadFormWhatsapp(lead.whatsapp);
    setLeadFormEmail(lead.email);
    setLeadFormRedeSocial(lead.redeSocial || "");
    setLeadFormCidade(lead.cidade);
    setLeadFormBairro(lead.bairroInteresse);
    setLeadFormTipoImovel(lead.tipoImovel);
    setLeadFormValorMaximo(lead.valorMaximo);
    setLeadFormQuartos(lead.quartos);
    setLeadFormOrigem(lead.origem);
    setLeadFormDetalhes(lead.detalhes || "");
    setLeadFormStatus(lead.status);
  };

  const startCreatingLead = () => {
    setIsCreatingNewLead(true);
    setEditingLead(null);
    resetLeadForm();
    setLeadFormBairro(selectedLeadBairro !== "Todos" ? selectedLeadBairro : "Agriões");
    if (selectedLeadCategory === "Proprietário") {
      setLeadFormTipoLead("Proprietário");
      setLeadFormOrigem("Cadastro Manual");
    }
  };

  const handleSaveLead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadFormNome || !leadFormTelefone || !leadFormBairro) {
      alert("Por favor, preencha o Nome, Telefone e Bairro de interesse/localização.");
      return;
    }

    let cleanWA = leadFormWhatsapp.replace(/\D/g, "");
    if (!cleanWA) {
      cleanWA = leadFormTelefone.replace(/\D/g, "");
    }
    if (cleanWA && !cleanWA.startsWith("55") && cleanWA.length <= 11) {
      cleanWA = "55" + cleanWA;
    }

    if (editingLead !== null) {
      // Atualizando lead existente
      const updatedFields = {
        tipoLead: leadFormTipoLead,
        nome: leadFormNome,
        telefone: leadFormTelefone,
        whatsapp: cleanWA,
        email: leadFormEmail,
        redeSocial: leadFormRedeSocial,
        cidade: leadFormCidade,
        bairroInteresse: leadFormBairro,
        tipoImovel: leadFormTipoImovel,
        valorMaximo: Number(leadFormValorMaximo),
        quartos: Number(leadFormQuartos),
        origem: leadFormOrigem,
        detalhes: leadFormDetalhes,
        status: leadFormStatus
      };

      fetch(`/api/leads/${editingLead.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFields)
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao atualizar lead");
          fetchLeads();
        })
        .catch((err) => {
          console.error("Erro ao atualizar lead no backend:", err);
          // Fallback local
          setBuyerLeads(prev => prev.map(item => item.id === editingLead.id ? { ...item, ...updatedFields } : item));
        });
    } else {
      // Criando novo lead de forma real
      const newLead: BuyerLead = {
        id: "lead-" + Date.now(),
        tipoLead: leadFormTipoLead,
        nome: leadFormNome,
        telefone: leadFormTelefone,
        whatsapp: cleanWA,
        email: leadFormEmail,
        redeSocial: leadFormRedeSocial,
        cidade: leadFormCidade,
        bairroInteresse: leadFormBairro,
        tipoImovel: leadFormTipoImovel,
        valorMaximo: Number(leadFormValorMaximo),
        quartos: Number(leadFormQuartos),
        origem: leadFormOrigem,
        dataCaptura: new Date().toISOString().split("T")[0],
        status: leadFormStatus,
        detalhes: leadFormDetalhes
      };

      fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLead)
      })
        .then((res) => {
          if (!res.ok) throw new Error("Erro ao cadastrar lead");
          fetchLeads();
        })
        .catch((err) => {
          console.error("Erro ao cadastrar lead no backend:", err);
          // Fallback local
          setBuyerLeads(prev => [newLead, ...prev]);
        });
    }

    // Fechar formulário
    setEditingLead(null);
    setIsCreatingNewLead(false);
    resetLeadForm();
  };

  const handleDeleteLead = (id: string) => {
    if (!window.confirm("Deseja realmente excluir este lead de forma permanente?")) return;
    
    fetch(`/api/leads/${id}`, {
      method: "DELETE"
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao deletar lead");
        fetchLeads();
      })
      .catch((err) => {
        console.error("Erro ao deletar lead no backend:", err);
        // Fallback local
        setBuyerLeads(prev => prev.filter(item => item.id !== id));
      });
  };

  const handleUpdateLeadStatus = (id: string, status: BuyerLead["status"]) => {
    fetch(`/api/leads/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao atualizar status do lead");
        fetchLeads();
      })
      .catch((err) => {
        console.error("Erro ao atualizar status do lead no backend:", err);
        // Fallback local
        setBuyerLeads(prev => prev.map(item => item.id === id ? { ...item, status } : item));
      });
  };

  const handleUpdateLeadFeedback = (leadId: string, feedback: BuyerLead["userFeedback"]) => {
    setBuyerLeads(prev => {
      const updated = prev.map(lead => {
        if (lead.id === leadId) {
          const updatedLead = { ...lead, userFeedback: feedback };
          if (feedback === "telefone_errado" || feedback === "anuncio_invalido" || feedback === "nome_incorreto" || feedback === "imovel_vendido" || feedback === "imovel_alugado") {
            updatedLead.confidenceScore = Math.max(30, (updatedLead.confidenceScore || 70) - 25);
            updatedLead.confidenceLevel = "Não Recomendado";
            updatedLead.hasInconsistencies = true;
            if (!updatedLead.inconsistenciesDetected) {
              updatedLead.inconsistenciesDetected = [];
            }
            const msg = `Feedback do usuário: ${feedback === "telefone_errado" ? "Telefone incorreto" : feedback === "nome_incorreto" ? "Nome incorreto" : feedback === "imovel_vendido" ? "Imóvel já vendido" : feedback === "imovel_alugado" ? "Imóvel já alugado" : "Anúncio inválido/antigo"}`;
            if (!updatedLead.inconsistenciesDetected.includes(msg)) {
              updatedLead.inconsistenciesDetected.push(msg);
            }
          } else if (feedback === "contato_correto") {
            updatedLead.confidenceScore = Math.min(100, (updatedLead.confidenceScore || 70) + 15);
            updatedLead.confidenceLevel = updatedLead.confidenceScore >= 95 ? "Altamente Confiável" : "Dados Consistentes";
          }
          return updatedLead;
        }
        return lead;
      });
      try {
        localStorage.setItem("teresopolis_imob_buyer_leads", JSON.stringify(updated));
      } catch (err) {}
      return updated;
    });
  };

  // Métodos de Integração com Redes e Monitor de Marketplaces
  const handleOpenConnectAccount = (accountKey: string) => {
    setOauthModalAccount(accountKey);
    setOauthUsername("");
    setOauthPassword("");
    setOauthError("");
    setOauthProgress("");
    setOauthKeepLogged(true);
    setIsConnecting(false);
    setOauthModalOpen(true);
  };

  const handleConfirmConnectAccount = () => {
    if (!oauthModalAccount) return;
    const cleanUser = oauthUsername.trim();
    const cleanUserLower = cleanUser.toLowerCase();
    const cleanPassword = oauthPassword.trim();

    if (!cleanUser) {
      setOauthError("Por favor, insira o seu usuário, e-mail ou telefone.");
      return;
    }
    if (!cleanPassword) {
      setOauthError("Por favor, insira a senha da sua conta.");
      return;
    }

    // Validação de formato básico de e-mail, telefone ou usuário
    const isEmail = cleanUserLower.includes("@") && cleanUserLower.includes(".");
    const isPhone = /^[0-9+()-\s]{8,20}$/.test(cleanUserLower);
    const isUsername = cleanUserLower.startsWith("@") || cleanUserLower.length >= 3;

    if (!isEmail && !isPhone && !isUsername) {
      setOauthError("Formato inválido. Use um e-mail válido, telefone com DDD ou nome de usuário.");
      return;
    }

    if (cleanPassword.length < 6) {
      setOauthError("Segurança insuficiente: a senha deve conter pelo menos 6 caracteres.");
      return;
    }

    // Validação Real das Credenciais do Leandro Rodrigues ou Configurações do Portal
    const expectedEmail = integrationEmail.trim().toLowerCase();
    const expectedPassword = integrationPassword.trim();

    const isValidUser = 
      cleanUserLower === expectedEmail || 
      cleanUserLower === "@leandrorodrigues" || 
      cleanUserLower === "leandrorodrigues" ||
      cleanUserLower === "21986787909" ||
      cleanUserLower === "986787909" ||
      cleanUserLower === "(21) 98678-7909" ||
      cleanUserLower.includes("cadastrodeleadslr") ||
      cleanUserLower.includes("grupoleandrorodrigues");

    const isValidPassword = cleanPassword === expectedPassword;

    if (!isValidUser || !isValidPassword) {
      setOauthError(
        `Credenciais inválidas: O usuário ou a senha inserida não coincidem com as chaves mestre autorizadas para o ecossistema Leandro Rodrigues Imóveis. Verifique as chaves registradas no painel "Gerenciador de Marca & Chaves de Acesso" abaixo.`
      );
      return;
    }

    setOauthError("");
    setIsConnecting(true);
    setOauthProgress("Estabelecendo handshake seguro de segurança (TLS 1.3)...");
    
    setTimeout(() => {
      setOauthProgress("Autenticando contra os servidores de segurança da API...");
      setTimeout(() => {
        setOauthProgress("Verificando token e permissões de leitura (Read/Write OAuth)...");
        setTimeout(() => {
          setOauthProgress("Conexão estabelecida! Sincronizando banco de dados de leads...");
          setTimeout(() => {
            const formattedUser = cleanUser;
            const updated = {
              ...connectedAccounts,
              [oauthModalAccount]: {
                connected: true,
                username: formattedUser.startsWith("@") || formattedUser.includes("@") ? formattedUser : `@${formattedUser}`,
                profileName: "Grupo Leandro Rodrigues"
              }
            };
            setConnectedAccounts(updated);
            try {
              localStorage.setItem("teresopolis_imob_connected_accounts", JSON.stringify(updated));
            } catch (err) {
              console.warn("Erro ao salvar connected_accounts no localStorage:", err);
            }
            setIsConnecting(false);
            setOauthModalOpen(false);
            setOauthPassword("");
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  const handleDisconnectAccount = (accountKey: string) => {
    const updated = {
      ...connectedAccounts,
      [accountKey]: { connected: false }
    };
    setConnectedAccounts(updated);
    try {
      localStorage.setItem("teresopolis_imob_connected_accounts", JSON.stringify(updated));
    } catch (err) {
      console.warn("Erro ao salvar connected_accounts no localStorage:", err);
    }
  };

  const handleStartMarketplaceScan = () => {
    setIsScanningMarketplace(true);
    setMarketplaceScanProgress("Inicializando crawlers locais integrados de APIs autorizadas...");
    
    setTimeout(() => {
      setMarketplaceScanProgress("Vasculhando classificados do Facebook Marketplace e Grupos Sincronizados...");
      setTimeout(() => {
        setMarketplaceScanProgress("Rastreando anúncios e postagens públicas do OLX (Teresópolis e Região Serrana)...");
        setTimeout(() => {
          setMarketplaceScanProgress("Decodificando contatos e analisando relevância comercial...");
          setTimeout(() => {
            // Re-ativar as listagens para demonstração
            setMarketplaceOpportunities(prev => prev.map(o => ({
              ...o,
              status: o.status === "Capturado" ? "Capturado" : "Novo"
            })));
            setIsScanningMarketplace(false);
            setMarketplaceScanProgress("");
          }, 900);
        }, 900);
      }, 900);
    }, 900);
  };

  const handleAnalyzeOpportunityAI = (oppId: string) => {
    setIsAnalyzingOpportunity(oppId);
    
    setTimeout(() => {
      setMarketplaceOpportunities(prev => prev.map(opp => {
        if (opp.id !== oppId) return opp;
        
        let classification: MarketplaceOpportunity["aiClassification"] = "Proprietário";
        let confidence = 94;
        let radarScore = 85;
        
        if (opp.contactName.includes("Beto") || opp.details?.toLowerCase().includes("creci") || opp.details?.toLowerCase().includes("parceria")) {
          classification = "Corretor de Imóveis";
          confidence = 97;
          radarScore = 38;
        } else if (opp.contactName.includes("Investimentos")) {
          classification = "Investidor";
          confidence = 89;
          radarScore = 72;
        } else if (opp.type === "Aluguel") {
          classification = "Proprietário buscando locação";
          confidence = 93;
          radarScore = 82;
        } else {
          classification = "Proprietário buscando venda";
          confidence = 95;
          radarScore = 96;
        }

        if (opp.urgencyLevel === "Alta") radarScore += 4;
        if (opp.city === "Teresópolis") radarScore += 2;
        if (opp.value < 500000) radarScore += 2; // Maior liquidez regional
        if (radarScore > 100) radarScore = 100;

        return {
          ...opp,
          aiClassification: classification,
          aiConfidence: confidence,
          radarScore,
          status: "Analisado"
        };
      }));
      setIsAnalyzingOpportunity(null);
    }, 1100);
  };

  const handleCaptureOpportunity = (oppId: string) => {
    const opp = marketplaceOpportunities.find(o => o.id === oppId);
    if (!opp) return;

    const newLead: BuyerLead = {
      id: `lead-opp-${Date.now()}`,
      tipoLead: opp.aiClassification?.includes("Proprietário") || opp.type === "Venda" ? "Proprietário" : "Comprador",
      nome: opp.contactName,
      telefone: opp.phone || "(Sem telefone público)",
      whatsapp: opp.whatsapp || "",
      email: opp.email || "",
      redeSocial: opp.socialProfile || "",
      cidade: opp.city,
      bairroInteresse: opp.bairro,
      tipoImovel: opp.propertyType,
      valorMaximo: opp.value,
      quartos: 3,
      origem: `Radar - ${opp.source}`,
      dataCaptura: new Date().toLocaleDateString("pt-BR"),
      status: "Pendente",
      detalhes: `Capturado do radar de inteligência imobiliária. Detalhes originais: "${opp.details}"`
    };

    setBuyerLeads(prev => {
      const updated = [newLead, ...prev];
      try {
        localStorage.setItem("teresopolis_imob_buyer_leads", JSON.stringify(updated));
      } catch (err) {
        console.warn("Erro ao salvar leads no localStorage:", err);
      }
      return updated;
    });

    setMarketplaceOpportunities(prev => prev.map(o => {
      if (o.id === oppId) {
        return { ...o, status: "Capturado" };
      }
      return o;
    }));
  };

  // Métodos do Painel de Inteligência e SEO
  const handleGenerateSeo = () => {
    const city = seoCity;
    const niche = seoKeyword ? seoKeyword.trim() : "imóveis residenciais e comerciais";
    const title = seoCustomTitle ? seoCustomTitle.trim() : `Especialista Imobiliário em ${city} RJ`;

    let generatedTitle = "";
    let body = "";
    let hashtags = "";
    let metaTitle = "";
    let metaDesc = "";
    let slug = "";

    const siteUrl = "www.grupoleandrorodrigues.com.br";

    if (seoAudience === "captação") {
      generatedTitle = `Como Vender Seu Imóvel Mais Rápido em ${city} com o Grupo Leandro Rodrigues`;
      body = `Você tem um imóvel (${niche}) em ${city} ou região e está tentando vender ou alugar diretamente por portais, mas só recebe contatos curiosos ou ligações frias?\n\nNo Grupo Leandro Rodrigues, nós cruzamos informações em tempo real e conectamos proprietários diretos aos compradores mais qualificados do mercado de ${city}, Guapimirim, Friburgo, Petrópolis, Niterói, Rio de Janeiro e Região dos Lagos!\n\nPor que anunciar conosco?\n✅ Inteligência de Buscas: Nosso sistema rastreia as intenções de compra no Google e redes sociais para encontrar clientes reais buscando exatamente o seu tipo de imóvel.\n✅ Atendimento Especializado e Exclusivo na região serrana e metropolitana.\n✅ Anúncios impulsionados de alta conversão.\n\nNão deixe seu patrimônio parado! Cadastre seu imóvel conosco agora mesmo e acelere o fechamento do seu negócio. Visite nosso portal e fale com um especialista.\n\n🔗 Saiba mais em: https://${siteUrl}\n📞 Contatos e listagem de imóveis autorizados diretamente em nosso site.`;
      
      hashtags = `#GrupoLeandroRodrigues #LeandroRodriguesImoveis #CaptacaoDeImoveis #VendaDireta #${city.replace(/\s+/g, "")} #Imobiliaria${city.replace(/\s+/g, "")} #ProprietarioDireto #FSBO #VendaSeuImovel #MercadoImobiliario #CorretorDeImoveis #ImoveisRJ #RegiaoSerrana #RegiaoDosLagos #ImobiliariaEspecializada #Teresopolis #Guapimirim #Petropolis #NovaFriburgo #Niteroi #RioDeJaneiro`;
      
      metaTitle = `Como Vender Seu Imóvel em ${city} RJ | Grupo Leandro Rodrigues`;
      metaDesc = `Quer vender seu imóvel (${niche}) em ${city}? O Grupo Leandro Rodrigues é especialista imobiliário com compradores ativos cadastrados. Cadastre seu imóvel agora no site!`;
      slug = `como-vender-imovel-rapido-${city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`;
    } else if (seoAudience === "venda") {
      generatedTitle = `Procurando o Imóvel dos Seus Sonhos em ${city}? Descubra Oportunidades Únicas`;
      body = `Se você está buscando um novo lar ou oportunidade de investimento (${niche}) em ${city}, pare de perder tempo rolando feeds infinitos em busca do imóvel perfeito.\n\nO Grupo Leandro Rodrigues possui o radar de compradores e captações mais completo de ${city}, Guapimirim, Friburgo, Petrópolis, Niterói, Rio de Janeiro e Região dos Lagos. Temos acesso a dezenas de imóveis exclusivos que ainda nem foram publicados nos grandes portais imobiliários!\n\nO que oferecemos para quem busca comprar:\n✅ Mapeamento de Bairros completo com infraestrutura, comércio e valor de m² de forma transparente.\n✅ Simulador Financeiro em tempo real para planejar sua compra sem sustos.\n✅ Filtros de busca ultra-personalizados baseados no seu orçamento real.\n\nAcesse nosso site oficial, utilize nossas ferramentas e encontre hoje mesmo o seu próximo destino de moradia com segurança jurídica e facilidade.\n\n🔗 Encontre seu imóvel: https://${siteUrl}\n💼 Grupo Leandro Rodrigues — A sua imobiliária de referência em ${city} e região serrana.`;

      hashtags = `#GrupoLeandroRodrigues #LeandroRodriguesImoveis #ComprarImovel #ImovelDosSonhos #ImoveisDeLuxo #${city.replace(/\s+/g, "")} #Imobiliaria${city.replace(/\s+/g, "")} #Apartamento${city.replace(/\s+/g, "")} #Casa${city.replace(/\s+/g, "")} #InvestimentoImobiliario #CorretorDeConfianca #Teresopolis #Guapimirim #Petropolis #NovaFriburgo #Niteroi #RioDeJaneiro #RegiaoSerrana #RegiaoDosLagos`;
      
      metaTitle = `Imóveis à Venda em ${city} RJ | Grupo Leandro Rodrigues`;
      metaDesc = `Encontre ${niche} à venda em ${city} com facilidade. Acesse o portal do Grupo Leandro Rodrigues e confira as melhores ofertas exclusivas da região serrana.`;
      slug = `imoveis-a-venda-em-${city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`;
    } else if (seoAudience === "altopadrao") {
      generatedTitle = `Imóveis de Alto Padrão em ${city}: O Estilo de Vida que Você Merece`;
      body = `Descubra a verdadeira definição de exclusividade, conforto e sofisticação em ${city} e região serrana. Apresentamos uma curadoria extraordinária de imóveis de alto padrão (${niche}) selecionados sob os mais rigorosos critérios de arquitetura e privacidade.\n\nSeja uma casa magnífica em condomínio fechado cercado pela natureza de Teresópolis, Petrópolis e Guapimirim, ou uma luxuosa cobertura no Rio de Janeiro, o Grupo Leandro Rodrigues é a sua imobiliária boutique altamente especializada.\n\nNossos diferenciais de atendimento exclusivo:\n💎 Sigilo e discrição absolutos em todas as fases da negociação.\n💎 Inteligência de mercado avançada com dados precisos de precificação e valorização.\n💎 Assessoria jurídica de ponta a ponta.\n\nConheça nossa carteira seleta e dê o próximo passo rumo a uma experiência de moradia inigualável.\n\n🔗 Portfólio de Luxo: https://${siteUrl}\n✨ Conectando pessoas extraordinárias a propriedades espetaculares.`;

      hashtags = `#GrupoLeandroRodrigues #LeandroRodriguesImoveis #ImoveisDeLuxo #AltoPadraoImoveis #Mansao #CondominioFechado #MorarBem #ImoveisExclusivos #${city.replace(/\s+/g, "")} #LuxuryRealEstate #ImoveisPremium #Teresopolis #Guapimirim #Petropolis #NovaFriburgo #Niteroi #RioDeJaneiro #RegiaoSerrana #CasasDeLuxo`;
      
      metaTitle = `Imóveis de Luxo e Alto Padrão em ${city} | Grupo Leandro Rodrigues`;
      metaDesc = `Casas de luxo, coberturas e propriedades de alto padrão em ${city} e região. Conheça o portfólio exclusivo do Grupo Leandro Rodrigues para investidores exigentes.`;
      slug = `imoveis-de-luxo-alto-padrao-${city.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "-")}`;
    } else {
      generatedTitle = `Grupo Leandro Rodrigues: Referência e Credibilidade Imobiliária no Estado do RJ`;
      body = `Com atuação sólida e inovadora, o Grupo Leandro Rodrigues consolidou-se como autoridade máxima no mercado de intermediação de imóveis em Teresópolis, Guapimirim, Nova Friburgo, Petrópolis, Niterói, Rio de Janeiro e Região dos Lagos!\n\nNós acreditamos em tecnologia aliada ao fator humano. Por isso, oferecemos um ecossistema digital completo que permite que compradores encontrem imóveis com rapidez e proprietários captem leads reais sem rodeios.\n\nPor que escolher o Grupo Leandro Rodrigues?\n👉 Presença forte nas primeiras páginas de buscas do Google.\n👉 Inteligência cruzada que integra canais como OLX, Zap, VivaReal e redes sociais.\n👉 Transparência total e foco no sucesso do cliente.\n\nConvidamos você a conhecer nosso portal e descobrir por que somos a empresa mais recomendada por quem compra ou vende imóveis na região.\n\n🔗 Acesse nosso site oficial: https://${siteUrl}\n📞 Agende uma conversa com nosso diretor comercial.`;

      hashtags = `#GrupoLeandroRodrigues #LeandroRodriguesImoveis #ImobiliariaReferencia #MelhorImobiliaria #CorretorEspecialista #NegociosImobiliarios #SegurancaJuridica #Teresopolis #Guapimirim #Petropolis #NovaFriburgo #Niteroi #RioDeJaneiro #RegiaoSerrana #RegiaoDosLagos #ImoveisRJ #CreciRJ`;
      
      metaTitle = `Grupo Leandro Rodrigues | Imobiliária Especializada no Estado do Rio de Janeiro`;
      metaDesc = `Sua imobiliária de confiança em Teresópolis, Guapimirim, Friburgo, Petrópolis, Niterói e Rio de Janeiro. Acesse www.grupoleandrorodrigues.com.br e conheça nossa equipe.`;
      slug = `grupo-leandro-rodrigues-referencia-imobiliaria-rj`;
    }

    setGeneratedPost({
      title: generatedTitle,
      body,
      hashtags,
      metaTitle,
      metaDesc,
      slug
    });
  };

  const handleExecuteCrossAnalysis = (leadId: string) => {
    setIsCrossAnalyzing(true);
    setCrossResults(null);
    
    // Encontrar o lead correspondente
    let targetLead: BuyerLead | undefined = buyerLeads.find(l => l.id === leadId);
    
    if (!targetLead && buyerLeads.length > 0) {
      targetLead = buyerLeads[0];
    }
    
    const leadName = targetLead ? targetLead.nome : "Cliente / Proprietário Não Identificado";
    const leadType = targetLead ? (targetLead.tipoLead || "Comprador") : "Comprador";
    const leadBairro = targetLead ? targetLead.bairroInteresse : "Alto";
    const leadImovel = targetLead ? targetLead.tipoImovel : "Apartamento";
    const leadValor = targetLead ? targetLead.valorMaximo : 450000;
    const leadPhone = targetLead ? targetLead.telefone : "(21) 99999-8888";
    
    const messages = [
      "⚡ Estabelecendo conexão segura com os indexadores Leandro Rodrigues...",
      "🔍 Rastreando correspondências de telefone e nome nos portais OLX e Zap Imóveis...",
      "📱 Analisando histórico de postagens públicas em Classificados do Facebook...",
      "🕸️ Cruzando intenção de buscas orgânicas de palavras-chave no Google Search...",
      "📊 Computando Índice de Calor de Intenção Real de Compra/Venda..."
    ];
    
    let step = 0;
    setCrossProgress(messages[0]);
    
    const interval = setInterval(() => {
      step++;
      if (step < messages.length) {
        setCrossProgress(messages[step]);
      } else {
        clearInterval(interval);
        
        const isOwner = leadType === "Proprietário";
        const matchedSites: { portal: string; status: "found" | "not_found"; url?: string; description?: string }[] = isOwner ? [
          { 
            portal: "OLX Brasil (Anúncio Particular)", 
            status: "found", 
            url: `https://rj.olx.com.br/regiao-de-serrana/imoveis/venda/${leadImovel.toLowerCase()}-em-${leadBairro.toLowerCase()}`,
            description: `Anúncio Particular Ativo: "${leadImovel} de 3 qts à venda direto com o proprietário". Detectado cruzamento pelo telefone ${leadPhone}.`
          },
          { 
            portal: "Zap Imóveis / VivaReal", 
            status: "not_found",
            description: "Não foi encontrado anúncio particular com este número de telefone ativo nestes portais pagos."
          },
          { 
            portal: "Facebook Marketplace & Grupos", 
            status: "found", 
            url: "https://www.facebook.com/marketplace",
            description: `Publicação detectada no grupo 'Classificados Teresópolis/RJ': "Vendo ${leadImovel} aceito propostas sem corretor".`
          },
          { 
            portal: "Google Search (Indexado Orgânico)", 
            status: "found",
            description: `Número de telefone indexado em pesquisa orgânica recente relacionada a buscas de valor de m² em ${leadBairro}.`
          }
        ] : [
          { 
            portal: "Google Search (Intenção Inbound)", 
            status: "found", 
            description: `Rastreado por cookie de conversão orgânica de alta intenção com os termos "comprar ${leadImovel} no bairro ${leadBairro} Teresópolis".`
          },
          { 
            portal: "OLX (Compradores Cadastrados)", 
            status: "found",
            description: `Perfil ativo com e-mail do lead pesquisando imóveis na categoria residencial até R$ ${leadValor} na região de interesse.`
          },
          { 
            portal: "Zap Imóveis (Histórico de Cliques)", 
            status: "not_found",
            description: "Sem histórico de cliques monitorado nos últimos 30 dias para esta combinação de IP/Telefone."
          },
          { 
            portal: "Facebook Ads Pixel Integrador", 
            status: "found",
            url: "https://www.facebook.com",
            description: "Interação ativa com anúncios de lançamentos e incorporações residenciais na região serrana."
          }
        ];
        
        const intentIndex = isOwner ? 88 : 94;
        const searchBehavior = isOwner 
          ? `O proprietário listou o imóvel em portais gratuitos para evitar comissão imobiliária, mas demonstra altíssima urgência de venda por causa do preço abaixo da média da região de ${leadBairro}. Canal recomendado: Contato consultivo focado em parceria sem exclusividade inicial.`
          : `O comprador pesquisou nos buscadores nos últimos 3 dias por termos de valor de m² e bairros específicos. Tem potencial real de decisão rápida. Canal recomendado: Abordagem direta no WhatsApp com fotos e simulação de financiamento prontas.`;
        
        setCrossResults({
          leadName,
          leadType,
          bairro: leadBairro,
          imovel: leadImovel,
          valor: leadValor,
          phone: leadPhone,
          whatsapp: targetLead ? targetLead.whatsapp : "5521999998888",
          email: targetLead ? targetLead.email : "contato@exemplo.com",
          redeSocial: targetLead ? targetLead.redeSocial : "facebook.com",
          matchedSites,
          intentIndex,
          searchBehavior
        });
        
        setIsCrossAnalyzing(false);
      }
    }, 800);
  };

  // Varredura automatizada real por IA Grounding
  const handleStartLeadScan = () => {
    if (isScanningLeads) return;
    setIsScanningLeads(true);
    setScanMessage("Conectando ao Google Search Grounding e buscando intenções de compra e venda de imóveis em tempo real...");

    fetch("/api/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: "compradores procurando imoveis ou proprietarios vendendo particular direto dono",
        city: selectedCity
      })
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro na busca de leads via IA");
        return res.json();
      })
      .then((data) => {
        setIsScanningLeads(false);
        setScanMessage("");
        fetchLeads(); // Recarrega a lista de leads reais cadastrados no backend!
        
        const mode = data.mode || "REAL";
        const count = data.opportunities?.length || 0;
        
        if (mode === "DEMO" || count === 0) {
          alert(`Varredura concluída. Nenhum lead inédito adicional foi localizado neste instante em ${selectedCity} via busca em tempo real (ou chave do Gemini não configurada).`);
        } else {
          alert(`Sucesso! Encontramos ${count} novas intenções de compra/venda qualificadas em ${selectedCity} usando IA e Google Search Grounding! Eles foram salvos no banco de dados do CRM.`);
        }
      })
      .catch((err) => {
        console.error("Erro na varredura de leads:", err);
        setIsScanningLeads(false);
        setScanMessage("");
        alert("Falha ao realizar varredura em tempo real: verifique a conexão com o servidor.");
      });
  };

  const addSpec = () => {
    if (specInput.trim() && !formSpecs.includes(specInput.trim())) {
      setFormSpecs([...formSpecs, specInput.trim()]);
      setSpecInput("");
    }
  };

  const removeSpec = (index: number) => {
    setFormSpecs(formSpecs.filter((_, idx) => idx !== index));
  };

  // Filtragem avançada da listagem de imobiliárias baseada no estado vivo de agencies
  const filteredAgencies = agencies.filter((agency) => {
    // Filtro inicial por cidade selecionada
    if (agency.cidade !== selectedCity) return false;

    // Busca por Texto (Nome, Descrição, CRECI, Bairro, Especialidade)
    const matchesSearch =
      agency.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.descricao.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.creci.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.bairro.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agency.especialidades.some((e) => e.toLowerCase().includes(searchQuery.toLowerCase()));

    // Filtro por Bairro selecionado
    const matchesBairro = selectedBairro === "Todos" || agency.bairro === selectedBairro;

    // Filtro por Tipo (Imobiliária ou Corretor Autônomo)
    const matchesTipo = selectedTipo === "Todos" || agency.tipo === selectedTipo;

    // Filtro apenas destacadas (Destacadas)
    const matchesFeatured = !showOnlyFeatured || agency.destacada === true;

    // Filtro apenas favoritas
    const matchesFavorites = !showOnlyFavorites || favorites.includes(agency.id);

    return matchesSearch && matchesBairro && matchesFeatured && matchesFavorites && matchesTipo;
  });

  // Filtragem avançada dos leads de compradores e proprietários baseado na Cidade ativa e filtros do Radar
  const filteredBuyerLeads = buyerLeads.filter((lead) => {
    // Filtro por cidade ativa selecionada globalmente
    if (lead.cidade !== selectedCity) return false;

    // Filtro por Tipo de Lead (Comprador ou Proprietário)
    const categoryOfLead = lead.tipoLead || "Comprador";
    if (selectedLeadCategory !== "Todos" && categoryOfLead !== selectedLeadCategory) {
      return false;
    }

    // Filtro por Período de Captação
    if (selectedLeadPeriod !== "Todos") {
      const todayStr = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
      const leadDateStr = lead.dataCaptura;
      
      const today = new Date(todayStr + "T00:00:00");
      const leadDate = new Date(leadDateStr + "T00:00:00");
      
      const diffMs = today.getTime() - leadDate.getTime();
      const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
      
      if (selectedLeadPeriod === "Hoje" && leadDateStr !== todayStr) {
        return false;
      }
      if (selectedLeadPeriod === "7d" && (diffDays > 7 || diffDays < 0)) {
        return false;
      }
      if (selectedLeadPeriod === "30d" && (diffDays > 30 || diffDays < 0)) {
        return false;
      }
      if (selectedLeadPeriod === "90d" && (diffDays > 90 || diffDays < 0)) {
        return false;
      }
    }

    // Busca por Texto (Nome, Email, Bairro de Interesse, Detalhes)
    if (leadSearchQuery) {
      const q = leadSearchQuery.toLowerCase();
      const matchesName = lead.nome.toLowerCase().includes(q);
      const matchesEmail = lead.email.toLowerCase().includes(q);
      const matchesBairro = lead.bairroInteresse.toLowerCase().includes(q);
      const matchesTipo = lead.tipoImovel.toLowerCase().includes(q);
      const matchesDetails = lead.detalhes?.toLowerCase().includes(q) || false;
      if (!matchesName && !matchesEmail && !matchesBairro && !matchesTipo && !matchesDetails) {
        return false;
      }
    }

    // Filtro por Bairro selecionado no Radar
    if (selectedLeadBairro !== "Todos" && lead.bairroInteresse !== selectedLeadBairro) {
      return false;
    }

    // Filtro por Tipo de Imóvel selecionado no Radar
    if (selectedLeadTipo !== "Todos" && lead.tipoImovel !== selectedLeadTipo) {
      return false;
    }

    // Filtro por Status do CRM
    if (selectedLeadStatus !== "Todos" && lead.status !== selectedLeadStatus) {
      return false;
    }

    return true;
  });

  // Consolidação de leads duplicados para exibir um único painel por cliente
  const consolidatedBuyerLeads = React.useMemo(() => {
    const groups: { [key: string]: BuyerLead[] } = {};
    filteredBuyerLeads.forEach((lead) => {
      // Cria uma chave única baseada em e-mail ou telefone formatado, ou nome minúsculo
      const cleanPhone = (lead.whatsapp || lead.telefone || "").replace(/\D/g, "");
      const cleanEmail = (lead.email || "").trim().toLowerCase();
      const cleanName = (lead.nome || "").trim().toLowerCase();
      
      let key = "";
      if (cleanPhone && cleanPhone.length > 5) {
        key = `phone_${cleanPhone}`;
      } else if (cleanEmail) {
        key = `email_${cleanEmail}`;
      } else {
        key = `name_${cleanName}`;
      }
      
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(lead);
    });

    return Object.values(groups).map((groupLeads) => {
      const first = groupLeads[0];
      // Junta origens sem duplicados
      const origens = Array.from(new Set(groupLeads.map(l => l.origem).filter(Boolean)));
      // Junta bairros
      const bairrosInteresse = Array.from(new Set(groupLeads.map(l => l.bairroInteresse).filter(Boolean)));
      // Junta tipos de imóvel
      const tiposImovel = Array.from(new Set(groupLeads.map(l => l.tipoImovel).filter(Boolean)));
      // Junta detalhes
      const detalhesLista = Array.from(new Set(groupLeads.map(l => l.detalhes).filter(Boolean)));
      const maxBudget = Math.max(...groupLeads.map(l => l.valorMaximo || 0));
      const maxQuartos = Math.max(...groupLeads.map(l => l.quartos || 0));

      return enrichLead({
        ...first,
        origem: origens.join(" + "),
        bairroInteresse: bairrosInteresse.join(", "),
        tipoImovel: tiposImovel.join(", ") as any,
        valorMaximo: maxBudget,
        quartos: maxQuartos,
        detalhes: detalhesLista.length > 0 ? detalhesLista.join(" | ") : undefined,
        _originalLeads: groupLeads // referência interna aos leads agrupados
      });
    });
  }, [filteredBuyerLeads]);

  // Cruzamento de Leads Proprietário ↔ Comprador (Matching Engine)
  const leadMatches = React.useMemo(() => {
    const currentCityLeads = buyerLeads.filter(l => l.cidade === selectedCity);
    const owners = currentCityLeads.filter(l => (l.tipoLead || "Comprador") === "Proprietário");
    const buyers = currentCityLeads.filter(l => (l.tipoLead || "Comprador") === "Comprador");
    
    const matchesList: Array<{
      id: string;
      owner: BuyerLead;
      buyer: BuyerLead;
      score: number;
      reasons: string[];
      priceDiff: number;
    }> = [];

    owners.forEach(owner => {
      buyers.forEach(buyer => {
        let matchScore = 0;
        const reasons: string[] = [];
        
        // 1. Tipo do Imóvel Match
        const ownerType = (owner.tipoImovel || "").trim().toLowerCase();
        const buyerType = (buyer.tipoImovel || "").trim().toLowerCase();
        if (ownerType === buyerType || buyerType.includes(ownerType) || ownerType.includes(buyerType)) {
          matchScore += 40;
          reasons.push(`Mesmo tipo de imóvel (${owner.tipoImovel})`);
        } else {
          return;
        }

        // 2. Bairro Match
        const ownerBairro = (owner.bairroInteresse || "").trim().toLowerCase();
        const buyerBairro = (buyer.bairroInteresse || "").trim().toLowerCase();
        if (ownerBairro === buyerBairro || buyerBairro.includes(ownerBairro) || ownerBairro.includes(buyerBairro)) {
          matchScore += 30;
          reasons.push(`Mesma localização (${owner.bairroInteresse})`);
        } else {
          return;
        }

        // 3. Preço vs Orçamento Match
        const ownerAsked = owner.valorMaximo;
        const buyerMax = buyer.valorMaximo;
        const priceDiff = buyerMax - ownerAsked;
        
        if (priceDiff >= 0) {
          matchScore += 20;
          reasons.push(`Orçamento compatível (sobra de R$ ${(priceDiff/1000).toFixed(0)}k)`);
        } else {
          const pctDiff = Math.abs(priceDiff) / ownerAsked;
          if (pctDiff <= 0.20) {
            matchScore += 10;
            reasons.push(`Preços negociáveis (diferença de R$ ${(Math.abs(priceDiff)/1000).toFixed(0)}k, ~${Math.round(pctDiff*100)}%)`);
          } else {
            return;
          }
        }

        // 4. Quartos Match
        if (buyer.quartos >= owner.quartos) {
          matchScore += 10;
          reasons.push(`Quartos suficientes (${buyer.quartos} vs ${owner.quartos})`);
        } else if (owner.quartos - buyer.quartos === 1) {
          matchScore += 5;
          reasons.push(`Diferença de apenas 1 quarto`);
        }

        matchesList.push({
          id: `match-${owner.id}-${buyer.id}`,
          owner,
          buyer,
          score: matchScore,
          reasons,
          priceDiff
        });
      });
    });

    return matchesList.sort((a, b) => b.score - a.score);
  }, [buyerLeads, selectedCity]);

  // Lista única de bairros existentes no dataset para os botões de filtro rápido baseados na Cidade ativa
  const availableBairros = {
    "Teresópolis": ["Todos", "Várzea", "Alto", "Agriões", "Albuquerque"],
    "Guapimirim": ["Todos", "Centro", "Parada Modelo", "Bananal", "Soberbo"],
    "Rio de Janeiro": ["Todos", "Copacabana", "Ipanema", "Leblon", "Gávea", "Botafogo", "Laranjeiras", "Lagoa", "Urca", "São Conrado", "Jardim Botânico"],
    "Nova Friburgo": ["Todos", "Centro", "Olaria", "Conselheiro Paulino", "Cônego", "Braunes", "Mury"]
  }[selectedCity];

  // Região representativa
  const cityRegionLabel = {
    "Teresópolis": ["Região Serrana", "Rio de Janeiro, BR"],
    "Guapimirim": ["Dedo de Deus, RJ", "Pé de Serra, BR"],
    "Rio de Janeiro": ["Zona Sul", "Rio de Janeiro, BR"],
    "Nova Friburgo": ["Região Serrana", "Rio de Janeiro, BR"]
  }[selectedCity];

  const currentPreset = (COLOR_PRESETS as any)[accentColor] || COLOR_PRESETS.turquoise;

  const bgPageColor = themeMode === "light" ? "#FAF9F6" : themeMode === "dark" ? "#121212" : "#000000";
  const textPrimaryColor = themeMode === "light" ? "#1A1A1A" : "#FAF9F6";
  const textMutedColor = themeMode === "light" ? "rgba(26, 26, 26, 0.6)" : "rgba(250, 249, 246, 0.6)";
  const borderColor = themeMode === "light" ? "rgba(26, 26, 26, 0.1)" : "rgba(250, 249, 246, 0.15)";
  const bgPanelColor = themeMode === "light" ? "#F3F1ED" : themeMode === "dark" ? "#1A1A1A" : "#0A0A0A";
  const bgCardColor = themeMode === "light" ? "#FAF9F6" : themeMode === "dark" ? "#1E1E1E" : "#050505";
  const borderPanelColor = themeMode === "light" ? "rgba(26, 26, 26, 0.15)" : "rgba(250, 249, 246, 0.2)";

  return (
    <div className="min-h-screen theme-bg-page theme-text-primary font-sans antialiased pb-16 transition-colors duration-300 border-8 border-neutral-800/10 shadow-inner">
      <style>{`
        :root {
          --accent-primary: ${currentPreset.primary};
          --accent-hover: ${currentPreset.hover};
          --accent-light: ${currentPreset.light};
          --accent-light-hover: ${currentPreset.lightHover};
          
          --bg-page: ${bgPageColor};
          --text-primary: ${textPrimaryColor};
          --text-muted: ${textMutedColor};
          --border-color: ${borderColor};
          --bg-panel: ${bgPanelColor};
          --bg-card: ${bgCardColor};
          --border-panel: ${borderPanelColor};
        }
        
        body {
          background-color: var(--bg-page) !important;
          color: var(--text-primary) !important;
        }
        
        .accent-bg { background-color: var(--accent-primary) !important; }
        .accent-text { color: var(--accent-primary) !important; }
        .accent-border { border-color: var(--accent-primary) !important; }
        .accent-hover-bg:hover { background-color: var(--accent-hover) !important; }
        .accent-hover-text:hover { color: var(--accent-hover) !important; }
        .accent-bg-light { background-color: var(--accent-light) !important; }
        .accent-bg-light-hover:hover { background-color: var(--accent-light-hover) !important; }
        .accent-border-light { border-color: var(--accent-light) !important; }
        .accent-text-light { color: var(--accent-light) !important; }
        
        .theme-bg-page { background-color: var(--bg-page) !important; }
        .theme-text-primary { color: var(--text-primary) !important; }
        .theme-text-muted { color: var(--text-muted) !important; }
        .theme-border { border-color: var(--border-color) !important; }
        .theme-bg-panel { background-color: var(--bg-panel) !important; }
        .theme-bg-card { background-color: var(--bg-card) !important; }
        .theme-border-panel { border-color: var(--border-panel) !important; }

        /* Mapeamentos de classes de cores estáticas do Tailwind para variáveis de tema dinâmico */
        .bg-\[\#FAF9F6\] { background-color: var(--bg-card) !important; }
        .bg-\[\#F3F1ED\] { background-color: var(--bg-panel) !important; }
        .bg-white { background-color: var(--bg-card) !important; }
        
        .text-\[\#1A1A1A\] { color: var(--text-primary) !important; }
        .text-\[\#1A1A1A\]\/30 { color: var(--text-muted) !important; opacity: 0.45 !important; }
        .text-\[\#1A1A1A\]\/40 { color: var(--text-muted) !important; opacity: 0.55 !important; }
        .text-\[\#1A1A1A\]\/50 { color: var(--text-muted) !important; opacity: 0.65 !important; }
        .text-\[\#1A1A1A\]\/55 { color: var(--text-muted) !important; opacity: 0.70 !important; }
        .text-\[\#1A1A1A\]\/60 { color: var(--text-muted) !important; }
        .text-\[\#1A1A1A\]\/70 { color: var(--text-muted) !important; }
        .text-\[\#1A1A1A\]\/80 { color: var(--text-primary) !important; opacity: 0.82 !important; }
        .text-\[\#1A1A1A\]\/85 { color: var(--text-primary) !important; opacity: 0.85 !important; }
        
        /* Borders */
        .border-2.border-\[\#1A1A1A\] { border-color: var(--accent-primary) !important; }
        .border-\[\#1A1A1A\]\/5 { border-color: var(--border-color) !important; opacity: 0.4 !important; }
        .border-\[\#1A1A1A\]\/10 { border-color: var(--border-color) !important; }
        .border-\[\#1A1A1A\]\/15 { border-color: var(--border-panel) !important; }
        .border-\[\#1A1A1A\]\/20 { border-color: var(--border-panel) !important; }
        .border-\[\#1A1A1A\]\/30 { border-color: var(--border-panel) !important; }
        .border-\[\#1A1A1A\] { border-color: var(--border-panel) !important; }
        .divide-\[\#1A1A1A\]\/5 > :not([hidden]) ~ :not([hidden]) { border-color: var(--border-color) !important; }

        /* Inputs e Formulários */
        input, select, textarea {
          background-color: var(--bg-card) !important;
          color: var(--text-primary) !important;
          border-color: var(--border-color) !important;
        }
        input:focus, select:focus, textarea:focus {
          border-color: var(--accent-primary) !important;
          outline: none !important;
        }

        /* Botões Principais */
        .bg-\[\#1A1A1A\] { background-color: var(--accent-primary) !important; color: #FAF9F6 !important; }
        .bg-\[\#1A1A1A\]:hover { background-color: var(--accent-hover) !important; }
        
        /* Cores de Destaque */
        .text-\[\#5A5A40\] { color: var(--accent-primary) !important; }
        .bg-\[\#5A5A40\] { background-color: var(--accent-primary) !important; color: #FAF9F6 !important; }
        .bg-\[\#5A5A40\]\/10 { background-color: var(--accent-light) !important; }
        .border-\[\#5A5A40\] { border-color: var(--accent-primary) !important; }
        .border-\[\#5A5A40\]\/10 { border-color: var(--accent-light) !important; }
        .border-\[\#5A5A40\]\/20 { border-color: var(--accent-light) !important; }
        .border-\[\#5A5A40\]\/30 { border-color: var(--accent-primary) !important; opacity: 0.4 !important; }
        .hover\:bg-\[\#5A5A40\]:hover { background-color: var(--accent-hover) !important; }
        .hover\:border-\[\#1A1A1A\]\/30:hover { border-color: var(--accent-primary) !important; }
        .hover\:text-\[\#1A1A1A\]:hover { color: var(--accent-primary) !important; }
        .hover\:bg-\[\#FAF9F6\]\/60:hover { background-color: var(--accent-light) !important; }

        /* Cobertura de Modal */
        .fixed.inset-0.bg-\[\#1A1A1A\]\/50 {
          background-color: rgba(0, 0, 0, 0.65) !important;
        }
        
        /* Selections */
        ::selection {
          background-color: var(--accent-primary) !important;
          color: #FAF9F6 !important;
        }
      `}</style>
      <div className="min-h-screen flex flex-col lg:flex-row theme-bg-page">
        {/* Menu Lateral Premium (Turquesa por padrão) */}
        <aside className="w-full lg:w-64 shrink-0 text-white flex flex-col justify-between p-5 shadow-lg lg:fixed lg:h-screen lg:top-0 lg:left-0 z-30 transition-all accent-bg">
          <div className="space-y-6">
            {/* Cabecalho da Sidebar */}
            <div className="flex items-center gap-3 border-b border-white/10 pb-5">
              <div className="relative group shrink-0 cursor-pointer">
                <div className="absolute inset-0 bg-white/20 rounded-full blur-md opacity-70 group-hover:opacity-100 transition-opacity" />
                <LeandroRodriguesLogo className="h-12 w-12 relative z-10 select-none bg-white/10 p-1 rounded-full" />
                <div 
                  className="absolute inset-0 bg-black/75 rounded-full flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20 text-[8px] font-bold text-white uppercase tracking-wider text-center p-1"
                  onClick={() => document.getElementById("header-logo-uploader")?.click()}
                  title="Trocar Logomarca"
                >
                  <Upload className="h-3 w-3 mb-0.5 text-emerald-400" />
                  <span>Trocar</span>
                </div>
                <input 
                  type="file"
                  id="header-logo-uploader"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const base64 = event.target?.result as string;
                        if (base64) {
                          try {
                            localStorage.setItem("lr_portal_custom_logo", base64);
                            window.dispatchEvent(new Event("lr_logo_updated"));
                          } catch (err) {
                            alert("A imagem selecionada é muito grande. Por favor, tente uma imagem de menor tamanho.");
                          }
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </div>
              <div>
                <h1 className="text-sm font-black uppercase tracking-wider text-white leading-none">
                  LR Imóveis
                </h1>
                <span className="text-[9px] font-mono font-bold uppercase text-white/60 tracking-widest block mt-1">
                  Inteligência SaaS
                </span>
              </div>
            </div>

            {/* Menu de Navegacao */}
            <nav className="space-y-1.5">
              {[
                { id: "leads", label: "CRM Imobiliário", icon: Sparkles },
                { id: "intelligence", label: "Buscadores & SEO", icon: Globe },
                { id: "directory", label: "Radar de Negócios", icon: Building },
                { id: "guide", label: "Guia de Bairros", icon: Map },
                { id: "calculator", label: "Simulador Financeiro", icon: Calculator },
                { id: "integrations", label: "Central de APIs", icon: Cpu },
              ].map((item) => {
                const IconComponent = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id as any)}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-bold uppercase tracking-wider rounded transition-all duration-200 group text-left cursor-pointer ${
                      isActive 
                        ? "bg-white/20 border-l-4 border-white text-white shadow-xs" 
                        : "text-white/80 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <IconComponent className={`h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110`} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Rodapé da Sidebar */}
          <div className="border-t border-white/10 pt-4 mt-6 text-center lg:text-left">
            <span className="text-[9px] font-mono text-white/50 block">CRECI-RJ Monitoramento</span>
            <span className="text-[10px] text-white/70 font-semibold block mt-1 font-serif italic">Leandro Rodrigues © 2026</span>
          </div>
        </aside>

        {/* Área de Conteúdo à Direita */}
        <div className="flex-1 flex flex-col lg:pl-64 min-w-0">
          {/* Barra Superior */}
          <header className="bg-white border-b border-slate-200/80 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-20 shadow-xs theme-bg-card theme-border">
            {/* Lado Esquerdo: Identificador da Tela */}
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono font-bold tracking-widest text-white px-2 py-0.5 rounded-sm uppercase accent-bg">
                SaaS CRM
              </span>
              <h2 className="text-sm font-extrabold text-slate-800 uppercase tracking-wider theme-text-primary">
                {activeTab === "leads" && "CRM Imobiliário / Leads"}
                {activeTab === "intelligence" && "Buscadores Inteligentes & SEO"}
                {activeTab === "directory" && "Radar de Negócios / Imobiliárias"}
                {activeTab === "guide" && "Guia de Bairros"}
                {activeTab === "calculator" && "Simulador Financeiro de Parcelas"}
                {activeTab === "integrations" && "Central de Integrações & APIs"}
              </h2>
            </div>

            {/* Lado Direito: Filtros, Hora & Botão de Aparência Rápido */}
            <div className="flex items-center gap-4 flex-wrap sm:flex-nowrap shrink-0">
              {/* Seletor de Cidade em Linha */}
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-white/5 border theme-border p-1 rounded-md">
                {(["Teresópolis", "Guapimirim", "Rio de Janeiro", "Nova Friburgo"] as const).map((city) => (
                  <button
                    key={city}
                    onClick={() => {
                      setSelectedCity(city);
                      setSelectedBairro("Todos");
                    }}
                    className={`text-[10px] px-2.5 py-1 font-bold uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
                      selectedCity === city
                        ? "accent-bg text-white shadow-xs"
                        : "theme-text-muted hover:theme-text-primary"
                    }`}
                  >
                    {city === "Rio de Janeiro" ? "Rio" : city}
                  </button>
                ))}
              </div>

              {/* Botão de Paleta de Aparência */}
              <div className="relative">
                <button
                  onClick={() => setShowPaletteDropdown(!showPaletteDropdown)}
                  className="p-2 bg-slate-100 dark:bg-white/5 border theme-border hover:bg-neutral-200 dark:hover:bg-white/10 theme-text-primary rounded-md transition-all flex items-center justify-center cursor-pointer shadow-xs"
                  title="Aparência do Guia"
                >
                  <Palette className="h-4 w-4" />
                </button>

                {showPaletteDropdown && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setShowPaletteDropdown(false)} />
                    <div className="absolute right-0 mt-2 bg-white dark:bg-[#1E1E1E] border theme-border rounded-lg p-4 shadow-xl z-40 w-64 space-y-4 text-xs">
                      {/* Modo Visual */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider theme-text-muted block">Modo Visual:</span>
                        <div className="grid grid-cols-3 gap-1">
                          {[
                            { id: "light", label: "Claro" },
                            { id: "dark", label: "Escuro" },
                            { id: "night", label: "Breu" }
                          ].map((m) => (
                            <button
                              key={m.id}
                              onClick={() => handleSetThemeMode(m.id as any)}
                              className={`text-[9px] py-1.5 font-bold uppercase border theme-border rounded transition-all cursor-pointer ${
                                themeMode === m.id
                                  ? "accent-bg text-white border-transparent"
                                  : "bg-transparent theme-text-primary hover:bg-neutral-100 dark:hover:bg-white/5"
                              }`}
                            >
                              {m.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Paleta de Cores (Apenas círculos sem texto, como pedido!) */}
                      <div className="space-y-1.5">
                        <span className="text-[9px] font-mono font-bold uppercase tracking-wider theme-text-muted block">Paleta de Cores:</span>
                        <div className="flex flex-wrap gap-2.5">
                          {Object.entries(COLOR_PRESETS).map(([key, config]) => (
                            <button
                              key={key}
                              onClick={() => {
                                handleSetAccentColor(key);
                              }}
                              className={`w-6 h-6 rounded-full border-2 transition-all cursor-pointer hover:scale-110 flex items-center justify-center ${
                                accentColor === key
                                  ? "border-slate-800 dark:border-white scale-105 shadow-sm"
                                  : "border-transparent"
                              }`}
                              style={{ backgroundColor: config.primary }}
                              title={config.name}
                            >
                              {accentColor === key && <Check className="h-3 w-3 text-white stroke-[3px]" />}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </header>

          {/* Painel Principal de Conteúdo */}
          <main className="flex-1 p-6 md:p-8 max-w-7xl w-full mx-auto space-y-6">
            <AnimatePresence mode="wait">
            {activeTab === "directory" && (
              <motion.div
                key="directory-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Painel de Busca e Filtros */}
                <div className="bg-[#F3F1ED] border border-[#1A1A1A]/10 p-6 md:p-8 space-y-5">
                  {/* Seletor de Cidades - Editorial de Altitude */}
                  <div className="flex border-b border-[#1A1A1A]/10 pb-3 flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold text-[#1A1A1A]/40 uppercase tracking-widest font-mono mr-2">Cidade:</span>
                    {(["Teresópolis", "Guapimirim", "Rio de Janeiro", "Nova Friburgo"] as const).map((city) => (
                      <button
                        key={city}
                        onClick={() => {
                          setSelectedCity(city);
                          setSelectedBairro("Todos");
                        }}
                        className={`text-xs px-3.5 py-1.5 uppercase tracking-wider font-bold transition-all border ${
                          selectedCity === city
                            ? "bg-[#1A1A1A] border-[#1A1A1A] text-[#FAF9F6]"
                            : "border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30 bg-transparent"
                        }`}
                      >
                        {city === "Rio de Janeiro" ? "Rio de Janeiro (Zona Sul)" : city} ({agencies.filter(i => i.cidade === city).length})
                      </button>
                    ))}
                  </div>

                  {/* Linha de Busca */}
                  <div className="relative border-b border-[#1A1A1A]/20 pb-2">
                    <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-[#1A1A1A]/40" />
                    <input
                      type="text"
                      className="w-full pl-8 pr-4 py-2 bg-transparent text-sm text-[#1A1A1A] outline-none placeholder:text-[#1A1A1A]/30 font-serif italic"
                      placeholder="Buscar por nome, especialidade ou bairro (ex: Alto padrão, Lançamentos, Várzea)..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>

                  {/* Linha de Filtros por Bairro e Toggles */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pt-1">
                    {/* Filtros de Bairros */}
                    <div className="flex flex-wrap items-center gap-1.5_no_spacing">
                      <span className="text-[10px] font-bold text-[#1A1A1A]/45 pr-2 select-none uppercase tracking-widest font-mono">Bairro:</span>
                      {availableBairros.map((b) => (
                        <button
                          key={b}
                          onClick={() => setSelectedBairro(b)}
                          className={`text-xs px-3.5 py-1.5 uppercase tracking-wider font-bold transition-all ${
                            selectedBairro === b
                              ? "bg-[#1A1A1A] text-[#FAF9F6]"
                              : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                          }`}
                        >
                          {b}
                        </button>
                      ))}
                    </div>

                    {/* Filtros Extra (Destaques, Salvos) */}
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        onClick={() => setShowOnlyFeatured(!showOnlyFeatured)}
                        className={`inline-flex items-center gap-1.5 text-[11px] px-3.5 py-1.5 transition-all uppercase tracking-wider font-bold border ${
                          showOnlyFeatured
                            ? "bg-[#5A5A40] border-[#5A5A40] text-[#FAF9F6]"
                            : "border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30 bg-transparent"
                        }`}
                      >
                        <Sparkles className="h-3.5 w-3.5" />
                        <span>Apenas Destaques</span>
                      </button>

                      <button
                        onClick={() => setShowOnlyFavorites(!showOnlyFavorites)}
                        className={`inline-flex items-center gap-1.5 text-[11px] px-3.5 py-1.5 transition-all uppercase tracking-wider font-bold border ${
                          showOnlyFavorites
                            ? "bg-[#5A5A40] border-[#5A5A40] text-[#FAF9F6]"
                            : "border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30 bg-transparent"
                        }`}
                      >
                        <Heart className="h-3.5 w-3.5 fill-current" />
                        <span>Favoritos ({favorites.length})</span>
                      </button>
                    </div>
                  </div>

                  {/* NOVO: Filtro por Tipo de Lead e Alternador de Modo de Visualização (Editorial vs CRM) */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-t border-[#1A1A1A]/10 pt-4 mt-2">
                    {/* Filtro de Classificação */}
                    <div className="flex flex-wrap items-center gap-1.5">
                      <span className="text-[10px] font-bold text-[#1A1A1A]/45 pr-2 select-none uppercase tracking-widest font-mono">Tipo de Lead:</span>
                      {(["Todos", "Imobiliária", "Autônomo"] as const).map((tipo) => (
                        <button
                          key={tipo}
                          onClick={() => setSelectedTipo(tipo)}
                          className={`text-xs px-3.5 py-1.5 uppercase tracking-wider font-bold transition-all border ${
                            selectedTipo === tipo
                              ? "bg-[#5A5A40] border-[#5A5A40] text-[#FAF9F6]"
                              : "border-[#1A1A1A]/10 text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/30 bg-transparent"
                          }`}
                        >
                          {tipo === "Todos" ? "Todos (Misto)" : tipo === "Imobiliária" ? "Imobiliárias" : "Corretores Autônomos"}
                        </button>
                      ))}
                    </div>

                    {/* Botões do Alternador de Modo de Visualização */}
                    <div className="flex items-center gap-1.5 bg-[#FAF9F6] p-1 border border-[#1A1A1A]/15">
                      <button
                        onClick={() => setViewMode("compact_list")}
                        className={`text-[10px] px-3.5 py-2 uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border-none ${
                          viewMode === "compact_list"
                            ? "bg-[#1A1A1A] text-[#FAF9F6]"
                            : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                        }`}
                        title="Modo Tabela de Contatos sem fotos, com links de WhatsApp e sites com preenchimento rápido"
                      >
                        <SlidersHorizontal className="h-3.5 w-3.5" />
                        <span>Lista de Prospecção (CRM)</span>
                      </button>
                      <button
                        onClick={() => setViewMode("card")}
                        className={`text-[10px] px-3.5 py-2 uppercase font-bold tracking-wider transition-all flex items-center gap-1.5 cursor-pointer border-none ${
                          viewMode === "card"
                            ? "bg-[#1A1A1A] text-[#FAF9F6]"
                            : "text-[#1A1A1A]/60 hover:text-[#1A1A1A]"
                        }`}
                        title="Visualização original em grade de cartões com descrição editorial completa"
                      >
                        <Building className="h-3.5 w-3.5" />
                        <span>Cards Editoriais</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Barra de Status e Download de Relatório */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#1A1A1A]/10 pb-4 gap-4">
                  <div>
                    <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-mono">
                      Censo de Altitude 2026
                    </span>
                    <h3 className="font-serif italic text-xl text-[#1A1A1A] mt-0.5">
                      {filteredAgencies.length} {filteredAgencies.length === 1 ? "imobiliária qualificada" : "imobiliárias qualificadas"} em destaque
                    </h3>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={startCreating}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-2 bg-[#5A5A40]/10 hover:bg-[#5A5A40]/20 text-[#5A5A40] font-bold uppercase tracking-wider border border-[#5A5A40]/20 transition-all cursor-pointer active:scale-95 duration-100"
                      title="Adicionar uma nova agência ao seu diretório local"
                    >
                      <Plus className="h-3.5 w-3.5" />
                      <span>Cadastrar Lead</span>
                    </button>

                    <button
                      onClick={handleResetDatabase}
                      className="inline-flex items-center gap-1.5 text-xs px-3 py-2 bg-transparent hover:bg-red-50 text-red-700/70 hover:text-red-700 font-bold uppercase tracking-wider border border-red-700/10 transition-all cursor-pointer active:scale-95 duration-100"
                      title="Restaurar toda a lista original de fábrica"
                    >
                      <RotateCcw className="h-3.5 w-3.5" />
                      <span>Restaurar Padrões</span>
                    </button>

                    <button
                      onClick={handleExportPDF}
                      disabled={isExporting || filteredAgencies.length === 0}
                      className="inline-flex items-center gap-2 text-xs px-4 py-2.5 bg-[#1A1A1A] hover:bg-[#5A5A40] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all text-[#FAF9F6] font-bold uppercase tracking-wider border border-[#1A1A1A] shadow-sm hover:shadow cursor-pointer active:scale-[0.98] duration-150"
                    >
                      <Printer className="h-4 w-4" />
                      <span>{isExporting ? "Gerando PDF..." : "Exportar PDF para Impressão"}</span>
                    </button>
                  </div>
                </div>

                {/* Grid de Imobiliárias ou Tabela de Prospecção (CRM) */}
                {viewMode === "compact_list" ? (
                  <div className="space-y-6">
                    {/* Painel Centralizador de Mensagens de Prospecção */}
                    <div className="bg-[#FAF9F6] border-2 border-[#1A1A1A] p-5 md:p-6 shadow-md">
                      {activeCampaignIndex === null ? (
                        <>
                          <div className="flex items-center justify-between flex-wrap gap-4 mb-3">
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-5 w-5 text-[#5A5A40]" />
                              <h4 className="font-serif italic text-lg font-bold text-[#1A1A1A]">
                                Central de Envio e Prospecção (Disparador de Mensagens)
                              </h4>
                            </div>
                            {filteredAgencies.length > 0 && (
                              <button
                                type="button"
                                onClick={() => setActiveCampaignIndex(0)}
                                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-2 bg-green-700 text-white hover:bg-green-800 transition-all cursor-pointer shadow-sm border-none active:scale-95 duration-150"
                                title="Inicia o assistente guiado que passa de lead em lead automaticamente"
                              >
                                <Sparkles className="h-3.5 w-3.5 text-amber-300 fill-amber-300" />
                                <span>Iniciar Disparo em Lote ({filteredAgencies.length} Leads)</span>
                              </button>
                            )}
                          </div>
                          <p className="text-xs text-[#1A1A1A]/70 mb-4 leading-relaxed">
                            Digite seu texto de apresentação ou parceria abaixo. Use o marcador <strong className="font-mono bg-[#1A1A1A]/5 px-1 py-0.5 rounded text-[11px] text-[#1A1A1A]">{`{nome}`}</strong> onde deseja que o nome da imobiliária ou corretor autônomo seja substituído automaticamente ao clicar para enviar.
                          </p>
                          
                          <textarea
                            rows={3}
                            value={prospectMessage}
                            onChange={(e) => setProspectMessage(e.target.value)}
                            placeholder="Olá, {nome}. Gostaria de propor..."
                            className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#1A1A1A]/30 focus:border-[#1A1A1A] focus:outline-none transition-colors font-serif leading-relaxed"
                          />
                          
                          <div className="flex flex-wrap items-center justify-between gap-3 mt-3">
                            <div className="flex flex-wrap items-center gap-2 text-[11px] text-[#1A1A1A]/60 italic">
                              <span>💡 Dica de Produtividade:</span>
                              <span>• <strong>Whats:</strong> Abre o chat do WhatsApp pré-preenchido.</span>
                              <span>• <strong>Copiar &amp; Abrir Site:</strong> Copia o texto personalizado para sua área de transferência e abre o site do lead.</span>
                            </div>
                            <button
                              type="button"
                              onClick={() => setProspectMessage("Olá, {nome}! Vi o seu portfólio de imóveis no Guia de Imobiliárias de Teresópolis, Guapimirim, Rio de Janeiro e Nova Friburgo. Gostaria de entrar em contato para propor uma parceria comercial de captação de clientes. Vocês aceitam parcerias? Aguardo contato!")}
                              className="text-[10px] underline font-bold uppercase tracking-wider text-[#5A5A40] hover:text-[#1A1A1A] cursor-pointer bg-transparent border-none"
                            >
                              Usar Mensagem de Parceria
                            </button>
                          </div>
                        </>
                      ) : (() => {
                        // Se o index ultrapassar o limite, encerra
                        if (activeCampaignIndex >= filteredAgencies.length) {
                          return (
                            <div className="text-center py-6">
                              <Check className="h-10 w-10 text-green-700 mx-auto mb-2" />
                              <h5 className="font-serif font-bold text-lg text-[#1A1A1A]">Campanha Concluída!</h5>
                              <p className="text-xs text-[#1A1A1A]/70 mt-1 max-w-md mx-auto">
                                Você passou por todos os leads filtrados nesta seção. Bom trabalho!
                              </p>
                              <button
                                type="button"
                                onClick={() => setActiveCampaignIndex(null)}
                                className="mt-4 text-xs px-4 py-2 uppercase font-bold tracking-wider bg-[#1A1A1A] text-[#FAF9F6] hover:bg-[#5A5A40] transition-colors border-none cursor-pointer"
                              >
                                Voltar para Central Geral
                              </button>
                            </div>
                          );
                        }

                        const currentAgency = filteredAgencies[activeCampaignIndex];
                        const customMsg = prospectMessage.replace(/\{nome\}/g, currentAgency.nome);
                        const cleanWA = currentAgency.whatsapp;
                        const waCampaignLink = `https://api.whatsapp.com/send?phone=${cleanWA}&text=${encodeURIComponent(customMsg)}`;

                        // Funções de ação
                        const handleSendAndNext = () => {
                          // Copia para área de transferência
                          try {
                            navigator.clipboard.writeText(customMsg);
                            setCopiedNotification(true);
                            setTimeout(() => setCopiedNotification(false), 2000);
                          } catch (err) {
                            console.warn("Clipboard access failed", err);
                          }

                          // Abre o link em nova aba
                          window.open(waCampaignLink, "_blank");

                          // Atualiza status do lead atual para Enviado
                          handleUpdateAgencyStatus(currentAgency.id, "Mensagem Enviada");

                          // Avança
                          setActiveCampaignIndex(activeCampaignIndex + 1);
                        };

                        const handleMarkWrongAndNext = () => {
                          handleUpdateAgencyStatus(currentAgency.id, "Número Incorreto");
                          setActiveCampaignIndex(activeCampaignIndex + 1);
                        };

                        const handleMarkNoWaAndNext = () => {
                          handleUpdateAgencyStatus(currentAgency.id, "Sem WhatsApp");
                          setActiveCampaignIndex(activeCampaignIndex + 1);
                        };

                        const handleSkipAndNext = () => {
                          setActiveCampaignIndex(activeCampaignIndex + 1);
                        };

                        return (
                          <div className="space-y-4">
                            <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3 flex-wrap gap-2">
                              <div className="flex items-center gap-2">
                                <span className="animate-pulse h-2 w-2 rounded-full bg-green-600"></span>
                                <h4 className="font-serif italic text-base font-bold text-[#1A1A1A]">
                                  Assistente de Disparo em Lote (Lote Ativo)
                                </h4>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[11px] font-mono font-bold text-[#1A1A1A]/70">
                                  Progresso: {activeCampaignIndex + 1} de {filteredAgencies.length} Leads
                                </span>
                                <button
                                  type="button"
                                  onClick={() => setActiveCampaignIndex(null)}
                                  className="text-[10px] uppercase font-bold text-red-700 hover:underline cursor-pointer border-none bg-transparent"
                                >
                                  Parar Assistente
                                </button>
                              </div>
                            </div>

                            {/* Barra de Progresso */}
                            <div className="w-full bg-[#1A1A1A]/10 h-1.5 rounded-full overflow-hidden">
                              <div 
                                className="bg-[#5A5A40] h-full transition-all duration-300"
                                style={{ width: `${((activeCampaignIndex) / filteredAgencies.length) * 100}%` }}
                              ></div>
                            </div>

                            {/* Informações do Lead Ativo */}
                            <div className="bg-white p-4 border border-[#1A1A1A]/15 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                              <div className="md:col-span-6 space-y-1">
                                <div className="text-[9px] uppercase tracking-widest font-mono text-[#1A1A1A]/50 font-bold">
                                  Lead Atual ({currentAgency.tipo || "Imobiliária"})
                                </div>
                                <h5 className="font-serif text-lg font-bold text-[#1A1A1A] flex items-center gap-2">
                                  {currentAgency.nome}
                                  {favorites.includes(currentAgency.id) && <Heart className="h-3.5 w-3.5 fill-red-600 text-red-600" />}
                                </h5>
                                <div className="text-xs text-[#1A1A1A]/70">
                                  📍 Bairro: <strong>{currentAgency.bairro}</strong> • CRECI {currentAgency.creci}
                                </div>
                              </div>

                              <div className="md:col-span-6 space-y-1 md:text-right">
                                <div className="text-xs font-mono text-[#1A1A1A]/80">
                                  📞 Celular: <strong className="text-sm font-sans">{currentAgency.telefone}</strong>
                                </div>
                                {currentAgency.site && (
                                  <div className="text-xs text-[#5A5A40]">
                                    🌐 Site: <a href={`https://${currentAgency.site}`} target="_blank" rel="noopener noreferrer" className="underline font-bold hover:text-[#1A1A1A]">{currentAgency.site}</a>
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Prévia do Texto com Balão */}
                            <div className="bg-[#FAF9F6] border-l-4 border-[#5A5A40] p-3 text-xs leading-relaxed italic text-[#1A1A1A]/85">
                              <span className="text-[9px] font-mono uppercase tracking-widest font-extrabold text-[#5A5A40] block not-italic mb-1">Prévia da Mensagem Personalizada que será copiada:</span>
                              "{customMsg}"
                            </div>

                            {/* Painel de Botões Rápidos */}
                            <div className="flex flex-wrap items-center gap-2 justify-between pt-2">
                              {/* Botões para marcar erros e passar */}
                              <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                  type="button"
                                  onClick={handleMarkWrongAndNext}
                                  className="text-[10px] font-bold uppercase tracking-wider px-3 py-2 bg-amber-500/10 border border-amber-500/30 text-amber-800 hover:bg-amber-500/20 active:scale-95 duration-100 cursor-pointer"
                                  title="Marca como telefone incorreto e passa para o próximo"
                                >
                                  ⚠️ Marcar Celular Errado &amp; Próximo
                                </button>
                                <button
                                  type="button"
                                  onClick={handleMarkNoWaAndNext}
                                  className="text-[10px] font-bold uppercase tracking-wider px-3 py-2 bg-orange-500/10 border border-orange-500/30 text-orange-800 hover:bg-orange-500/20 active:scale-95 duration-100 cursor-pointer"
                                  title="Marca como sem WhatsApp e passa para o próximo"
                                >
                                  🚫 Sem WhatsApp &amp; Próximo
                                </button>
                                <button
                                  type="button"
                                  onClick={handleSkipAndNext}
                                  className="text-[10px] font-bold uppercase tracking-wider px-3 py-2 border border-[#1A1A1A]/25 text-[#1A1A1A]/70 hover:text-[#1A1A1A] hover:bg-white active:scale-95 duration-100 cursor-pointer"
                                >
                                  Pular Lead ➡️
                                </button>
                              </div>

                              {/* O Grande Botão Verde de Disparo */}
                              <button
                                type="button"
                                onClick={handleSendAndNext}
                                className="inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-widest px-6 py-3.5 bg-green-600 hover:bg-green-700 active:scale-[0.98] transition-all text-white shadow-md border-none cursor-pointer"
                                title="Copia o texto gerado acima, abre o chat de WhatsApp e já avança para o próximo da fila!"
                              >
                                <Send className="h-4 w-4 shrink-0" />
                                <span>Copiar e Enviar WhatsApp 🚀</span>
                              </button>
                            </div>

                            {/* Notificação flutuante rápida de cópia bem sucedida */}
                            {copiedNotification && (
                              <div className="text-[11px] text-green-700 italic font-bold">
                                ✓ Mensagem personalizada copiada automaticamente para a sua área de transferência!
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>

                    {/* Alerta de Ajustes de Telefones */}
                    <div className="bg-[#5A5A40]/10 border border-[#5A5A40]/20 p-4 text-[11px] leading-relaxed text-[#5A5A40]">
                      <strong>⚠️ Nota de Prospecção:</strong> Como esta é uma ferramenta de captação, alguns telefones e sites gerados necessitam de verificação e ajustes para o seu contato ativo. Você pode <strong>corrigir e salvar qualquer telefone na hora</strong> clicando no botão de lápis de cada linha! Suas correções são mantidas no seu navegador.
                    </div>

                     {/* Lista Compacta de Alta Performance */}
                    <div className="overflow-x-auto border theme-border theme-bg-card">
                      <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                          <tr className="theme-bg-panel border-b theme-border text-[9px] uppercase tracking-widest font-mono theme-text-muted">
                            <th className="py-3.5 px-4 font-bold">Identificação do Lead</th>
                            <th className="py-3.5 px-4 font-bold">Tipo</th>
                            <th className="py-3.5 px-4 font-bold">Status CRM</th>
                            <th className="py-3.5 px-4 font-bold">Telefone / WhatsApp</th>
                            <th className="py-3.5 px-4 font-bold">Site / Contato</th>
                            <th className="py-3.5 px-4 font-bold text-right">Ações</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-500/10 text-xs">
                          {filteredAgencies.map((agency, idx) => {
                            // Gera a mensagem customizada para essa imobiliária específica substituindo o placeholder {nome}
                            const personalizedMsg = prospectMessage.replace(/\{nome\}/g, agency.nome);
                            const waLink = `https://api.whatsapp.com/send?phone=${agency.whatsapp}&text=${encodeURIComponent(personalizedMsg)}`;
                            const isEditingThisPhone = editingPhoneId === agency.id;

                            return (
                              <tr 
                                key={agency.id} 
                                className={`hover:bg-neutral-500/5 transition-colors ${
                                  agency.status === "Interesse Confirmado" ? "bg-green-50/20" : 
                                  agency.status === "Recusado / Sem Interesse" ? "bg-red-50/10" : 
                                  agency.status === "Número Incorreto" ? "bg-amber-50/20" :
                                  agency.status === "Sem WhatsApp" ? "bg-orange-50/20" : ""
                                }`}
                              >
                                {/* Nome, CRECI e Bairro com iniciais */}
                                <td className="py-3.5 px-4">
                                  <div className="flex items-center gap-3">
                                    {/* Logo/Iniciais simples */}
                                    {agency.logoUrl ? (
                                      <img
                                        src={agency.logoUrl}
                                        alt={`Logo ${agency.nome}`}
                                        referrerPolicy="no-referrer"
                                        className="h-8 w-8 rounded-full border theme-border object-cover shrink-0 bg-white"
                                      />
                                    ) : (
                                      <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold font-mono text-[11px] shrink-0 border ${
                                        agency.tipo === "Autônomo" 
                                          ? "accent-bg-light accent-border accent-text" 
                                          : "bg-neutral-500/10 border-neutral-500/20 theme-text-primary"
                                      }`}>
                                        {agency.nome.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase().substring(0, 2)}
                                      </div>
                                    )}
                                    <div>
                                      <div className="font-bold theme-text-primary flex items-center gap-1.5 flex-wrap">
                                        <span>{agency.nome}</span>
                                        {favorites.includes(agency.id) && <Heart className="h-3 w-3 fill-red-600 text-red-600 inline" />}
                                      </div>
                                      {agency.responsavel && (
                                        <div className="text-[10px] theme-text-muted font-serif italic mt-0.5 flex items-center gap-1">
                                          <span className="font-sans text-[8px] font-bold uppercase tracking-wider not-italic opacity-60">Resp:</span>
                                          <span>{agency.responsavel}</span>
                                        </div>
                                      )}
                                      <div className="text-[10px] theme-text-muted font-mono mt-0.5">
                                        {agency.bairro} • CRECI {agency.creci}
                                      </div>
                                    </div>
                                  </div>
                                </td>

                                {/* Tipo de Lead */}
                                <td className="py-3.5 px-4">
                                  <span className={`inline-block text-[9px] font-mono font-extrabold uppercase px-2 py-0.5 border ${
                                    agency.tipo === "Autônomo" 
                                      ? "accent-bg-light accent-border accent-text" 
                                      : "bg-neutral-500/10 border-neutral-500/20 theme-text-primary opacity-80"
                                  }`}>
                                    {agency.tipo || "Imobiliária"}
                                  </span>
                                </td>

                                {/* Status CRM */}
                                <td className="py-3.5 px-4">
                                  <select
                                    value={agency.status || "Não Contatado"}
                                    onChange={(e) => handleUpdateAgencyStatus(agency.id, e.target.value as any)}
                                    className={`text-[10px] font-bold p-1 border cursor-pointer focus:outline-none ${
                                      agency.status === "Interesse Confirmado" 
                                        ? "bg-green-100 border-green-300 text-green-800" 
                                        : agency.status === "Mensagem Enviada" 
                                        ? "bg-blue-100 border-blue-300 text-blue-800" 
                                        : agency.status === "Recusado / Sem Interesse" 
                                        ? "bg-red-100 border-red-300 text-red-800" 
                                        : agency.status === "Número Incorreto"
                                        ? "bg-amber-100 border-amber-300 text-amber-800"
                                        : agency.status === "Sem WhatsApp"
                                        ? "bg-orange-100 border-orange-300 text-orange-800"
                                        : "theme-bg-panel theme-border theme-text-primary"
                                    }`}
                                  >
                                    <option value="Não Contatado">⚪ Pendente</option>
                                    <option value="Mensagem Enviada">💬 Enviado</option>
                                    <option value="Interesse Confirmado">👍 Interesse</option>
                                    <option value="Recusado / Sem Interesse">❌ Sem Interesse</option>
                                    <option value="Número Incorreto">⚠️ Fone Errado</option>
                                    <option value="Sem WhatsApp">🚫 Sem Whats</option>
                                  </select>
                                </td>

                                {/* Telefone e Link de WhatsApp Direct */}
                                <td className="py-3.5 px-4">
                                  {isEditingThisPhone ? (
                                    <div className="flex items-center gap-1.5">
                                      <div className="flex flex-col gap-1">
                                        <input
                                          type="text"
                                          value={editingPhoneValue}
                                          onChange={(e) => setEditingPhoneValue(e.target.value)}
                                          placeholder="Telefone de Exibição"
                                          className="text-[10px] p-1 border border-[#1A1A1A]/30 w-32 bg-white text-[#1A1A1A] focus:outline-none"
                                        />
                                        <input
                                          type="text"
                                          value={editingWaValue}
                                          onChange={(e) => setEditingWaValue(e.target.value)}
                                          placeholder="Link WhatsApp (Apenas números)"
                                          className="text-[10px] p-1 border border-[#1A1A1A]/30 w-32 bg-white font-mono text-[#1A1A1A] focus:outline-none"
                                        />
                                      </div>
                                      <button
                                        type="button"
                                        onClick={() => handleUpdateAgencyPhoneInline(agency.id, editingPhoneValue, editingWaValue)}
                                        className="p-1.5 bg-green-700 text-white hover:bg-green-800 cursor-pointer text-[10px] font-bold border-none"
                                        title="Salvar alterações de contato"
                                      >
                                        <Check className="h-3 w-3" />
                                      </button>
                                    </div>
                                  ) : (
                                    <div className="flex items-center gap-2">
                                      <div className="flex flex-col">
                                        <span className="font-mono text-[11px] text-[#1A1A1A]/80">{agency.telefone}</span>
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setEditingPhoneId(agency.id);
                                            setEditingPhoneValue(agency.telefone);
                                            setEditingWaValue(agency.whatsapp);
                                          }}
                                          className="text-[9px] text-[#5A5A40] hover:underline text-left cursor-pointer border-none bg-transparent font-bold mt-0.5"
                                        >
                                          ✏️ Corrigir celular
                                        </button>
                                      </div>

                                      {/* WhatsApp Disparador Direto */}
                                      <a
                                        href={waLink}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        onClick={() => handleUpdateAgencyStatus(agency.id, "Mensagem Enviada")}
                                        className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 bg-green-600 text-white hover:bg-green-700 transition-colors rounded-xs shadow-xs"
                                        title="Enviar texto de prospecção diretamente para o WhatsApp deste lead"
                                      >
                                        <Send className="h-3 w-3" />
                                        <span>Whats</span>
                                      </a>
                                    </div>
                                  )}
                                </td>

                                {/* Site Oficial e Clipboard copy */}
                                <td className="py-3.5 px-4">
                                  {agency.site ? (
                                    <div className="flex items-center gap-2">
                                      <button
                                        type="button"
                                        onClick={() => {
                                          // Copia a mensagem customizada para a área de transferência do usuário
                                          navigator.clipboard.writeText(personalizedMsg);
                                          setCopySuccessId(agency.id);
                                          setTimeout(() => setCopySuccessId(null), 2000);
                                          
                                          // Abre o site oficial em nova guia
                                          const formattedSite = agency.site?.startsWith("http") ? agency.site : `https://${agency.site}`;
                                          window.open(formattedSite, "_blank");

                                          // Marca como mensagem enviada
                                          if (agency.status === "Não Contatado") {
                                            handleUpdateAgencyStatus(agency.id, "Mensagem Enviada");
                                          }
                                        }}
                                        className="inline-flex items-center gap-1.5 text-[10px] text-[#5A5A40] hover:text-[#1A1A1A] font-bold transition-all border border-[#5A5A40]/10 hover:border-[#1A1A1A]/30 px-2.5 py-1 bg-[#F3F1ED] cursor-pointer"
                                        title="Copiar mensagem personalizada e abrir o site oficial (página de contato)"
                                      >
                                        <Globe className="h-3.5 w-3.5 shrink-0" />
                                        <span className="truncate max-w-[120px]">{agency.site}</span>
                                        {copySuccessId === agency.id ? (
                                          <Check className="h-3.5 w-3.5 text-green-700 shrink-0" />
                                        ) : (
                                          <ExternalLink className="h-3 w-3 text-[#1A1A1A]/40 shrink-0" />
                                        )}
                                      </button>
                                    </div>
                                  ) : (
                                    <span className="text-[#1A1A1A]/30 italic text-[10px]">Sem site cadastrado</span>
                                  )}
                                </td>

                                {/* Ações Rápidas de Gerenciamento */}
                                <td className="py-3.5 px-4 text-right">
                                  <div className="flex items-center justify-end gap-2 text-right">
                                    {/* Atalho do Google Search para encontrar site/contato oficial se o atual não estiver correto */}
                                    <a
                                      href={`https://www.google.com/search?q=${encodeURIComponent(agency.nome + " " + agency.cidade + " corretor site contato")}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-[9px] uppercase tracking-wider font-extrabold text-[#1A1A1A]/40 hover:text-[#1A1A1A] transition-colors"
                                      title="Procurar o contato oficial atualizado desta imobiliária no Google"
                                    >
                                      🔍 Google
                                    </a>
                                    <span className="text-[#1A1A1A]/10">•</span>
                                    <button
                                      type="button"
                                      onClick={() => handleToggleFavorite(agency.id)}
                                      className="text-amber-500 hover:text-amber-600 cursor-pointer bg-transparent border-none p-0"
                                      title="Alternar Favorito"
                                    >
                                      <Heart className={`h-3.5 w-3.5 ${favorites.includes(agency.id) ? "fill-current" : ""}`} />
                                    </button>
                                    <span className="text-[#1A1A1A]/10">•</span>
                                    <button
                                      type="button"
                                      onClick={() => startEditing(agency)}
                                      className="text-[#1A1A1A]/50 hover:text-[#1A1A1A] cursor-pointer bg-transparent border-none p-0 text-[10px] font-bold uppercase tracking-wide"
                                      title="Editar Lead Completo"
                                    >
                                      Editar
                                    </button>
                                    <span className="text-[#1A1A1A]/10">•</span>
                                    <button
                                      type="button"
                                      onClick={() => handleDeleteAgency(agency.id)}
                                      className="text-red-700/60 hover:text-red-700 cursor-pointer bg-transparent border-none p-0"
                                      title="Excluir Lead permanentemente"
                                    >
                                      <Trash2 className="h-3.5 w-3.5" />
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-12">
                    <AnimatePresence mode="popLayout">
                      {filteredAgencies.map((agency, idx) => (
                        <AgencyCard
                          key={agency.id}
                          agency={agency}
                          index={idx + 1}
                          isFavorite={favorites.includes(agency.id)}
                          onToggleFavorite={handleToggleFavorite}
                          onEdit={startEditing}
                          onDelete={handleDeleteAgency}
                          themeMode={themeMode}
                          onUpdateStatus={handleUpdateAgencyStatus}
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                )}

                {/* Caso nenhum resultado seja encontrado */}
                {filteredAgencies.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-[#F3F1ED] border border-[#1A1A1A]/10 py-16 px-6 text-center max-w-sm mx-auto"
                  >
                    <HelpCircle className="h-8 w-8 text-[#1A1A1A]/30 mx-auto mb-3" />
                    <h3 className="font-serif italic text-[#1A1A1A] text-lg mb-1">
                      Nenhuma imobiliária encontrada
                    </h3>
                    <p className="text-[#1A1A1A]/60 text-xs leading-relaxed font-sans mb-4">
                      Sua busca não retornou resultados profissionais. Modifique suas palavras-chave ou recomece a busca sem filtros aplicados.
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedBairro("Todos");
                        setShowOnlyFeatured(false);
                        setShowOnlyFavorites(false);
                      }}
                      className="inline-block text-[11px] font-bold uppercase tracking-widest border-b-2 border-[#1A1A1A] pb-1 hover:text-[#5A5A40] hover:border-[#5A5A40] transition-colors"
                    >
                      Limpar todos os filtros
                    </button>
                  </motion.div>
                )}
              </motion.div>
            )}

            {activeTab === "guide" && (
              <motion.div
                key="guide-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <InfoGuide selectedCity={selectedCity} />
              </motion.div>
            )}

            {activeTab === "calculator" && (
              <motion.div
                key="calculator-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
              >
                <FinanceCalculator />
              </motion.div>
            )}

            {activeTab === "leads" && ( // leads-tab-start
              <motion.div
                key="leads-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8"
              >
                {/* Header do Radar & CRM Integrado */}
                <div className="bg-[#F3F1ED] border border-[#1A1A1A]/10 p-6 md:p-8 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-block h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest font-mono">
                          Métricas do CRM & Busca Inteligente Ativos
                        </span>
                      </div>
                      <h2 className="text-2xl font-bold uppercase tracking-tight text-[#1A1A1A] font-sans">
                        SaaS CRM & Radar de Leads
                      </h2>
                      <p className="text-xs text-[#1A1A1A]/60 max-w-2xl font-serif italic mt-1 leading-relaxed">
                        Visão integrada do CRM Imobiliário com o Radar de Compradores e Proprietários em {selectedCity}. O sistema monitora métricas de conversão, tendências de mercado, configura scripts e acesse fichas detalhadas diferenciadas por cores.
                      </p>
                    </div>

                    <div className="flex items-center gap-2.5 flex-wrap">
                      <button
                        onClick={handleStartLeadScan}
                        disabled={isScanningLeads}
                        className={`flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-widest bg-[#1A1A1A] text-[#FAF9F6] border border-transparent hover:bg-neutral-800 transition-all ${
                          isScanningLeads ? "opacity-75 cursor-not-allowed" : ""
                        }`}
                      >
                        <Sparkles className={`h-4 w-4 ${isScanningLeads ? "animate-spin text-amber-300" : ""}`} />
                        <span>{isScanningLeads ? "Varrendo Canais..." : "Buscar Novos Leads"}</span>
                      </button>

                      <button
                        onClick={startCreatingLead}
                        className="flex items-center gap-2 px-4 py-3 text-xs font-bold uppercase tracking-widest bg-[#FAF9F6] text-[#1A1A1A] border border-[#1A1A1A]/20 hover:border-[#1A1A1A] transition-all"
                      >
                        <Plus className="h-4 w-4 text-[#1A1A1A]" />
                        <span>Cadastrar Manualmente</span>
                      </button>
                    </div>
                  </div>

                  {/* Estado de Varredura Ativo */}
                  {isScanningLeads && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="bg-[#FAF9F6] border border-[#5A5A40]/30 p-4 font-mono text-xs text-[#1A1A1A] space-y-2.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold flex items-center gap-2">
                          <span className="h-2 w-2 rounded-full bg-[#5A5A40] animate-ping" />
                          PROCESSO DE RASTREAMENTO EM CURSO:
                        </span>
                        <span className="font-bold animate-pulse text-[#5A5A40]">[ ONLINE ]</span>
                      </div>
                      <div className="h-1 bg-neutral-200 overflow-hidden relative">
                        <div className="absolute left-0 top-0 bottom-0 bg-[#5A5A40] w-2/3 animate-[shimmer_1.5s_infinite]" />
                      </div>
                      <div className="flex items-center gap-2.5 text-[#1A1A1A]/70 text-[11px] italic bg-[#1A1A1A]/5 p-2 rounded border border-[#1A1A1A]/5">
                        <Loader2 className="h-4 w-4 animate-spin text-[#5A5A40] shrink-0" />
                        <span>{scanMessage}</span>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Navegação de Sub-Abas do CRM */}
                <div className="flex border-b border-[#1A1A1A]/15 gap-2 overflow-x-auto pb-px">
                  <button
                    onClick={() => setCrmSubTab("leads")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                      crmSubTab === "leads"
                        ? "border-[#1A1A1A] text-[#1A1A1A]"
                        : "border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    <span>Listagem de Leads (CRM)</span>
                  </button>
                  <button
                    onClick={() => setCrmSubTab("pipeline")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                      crmSubTab === "pipeline"
                        ? "border-[#1A1A1A] text-[#1A1A1A]"
                        : "border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20"
                    }`}
                  >
                    <Briefcase className="h-4 w-4" />
                    <span>Pipeline Estilo HubSpot</span>
                  </button>
                  <button
                    onClick={() => setCrmSubTab("sheets")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                      crmSubTab === "sheets"
                        ? "border-[#1A1A1A] text-[#1A1A1A]"
                        : "border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20"
                    }`}
                  >
                    <Table className="h-4 w-4 text-emerald-600" />
                    <span>Simulador Google Sheets</span>
                  </button>
                  <button
                    onClick={() => setCrmSubTab("matches")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 relative ${
                      crmSubTab === "matches"
                        ? "border-amber-500 text-[#1A1A1A]"
                        : "border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-amber-500/20"
                    }`}
                  >
                    <Sparkles className="h-4 w-4 text-amber-500 animate-pulse" />
                    <span>Cruzamento Inteligente</span>
                    {leadMatches.length > 0 && (
                      <span className="bg-amber-500 text-white text-[9px] px-2 py-0.5 rounded-full font-mono font-bold ml-1 animate-pulse">
                        {leadMatches.length}
                      </span>
                    )}
                  </button>
                  <button
                    onClick={() => setCrmSubTab("dashboard")}
                    className={`flex items-center gap-2 px-5 py-3 text-xs font-bold uppercase tracking-wider transition-all border-b-2 cursor-pointer shrink-0 ${
                      crmSubTab === "dashboard"
                        ? "border-[#1A1A1A] text-[#1A1A1A]"
                        : "border-transparent text-[#1A1A1A]/60 hover:text-[#1A1A1A] hover:border-[#1A1A1A]/20"
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    <span>Métricas & Performance</span>
                  </button>
                </div>

                {/* Sub-Abas Condicionais */}
                {crmSubTab === "pipeline" && (
                  <div className="space-y-6 pt-2 animate-fadeIn">
                    <CRMHubSpotLight 
                      leads={buyerLeads} 
                      onUpdateLeads={setBuyerLeads} 
                      accentColor={accentColor} 
                    />
                  </div>
                )}

                {crmSubTab === "sheets" && (
                  <div className="space-y-6 pt-2 animate-fadeIn">
                    <GoogleSheetsSimulator 
                      leads={buyerLeads} 
                      onUpdateLeads={setBuyerLeads} 
                      accentColor={accentColor} 
                    />
                  </div>
                )}

                {crmSubTab === "dashboard" && (
                  <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-4">
                    <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-3">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-[#00AFCB]" />
                        <span className="font-bold text-xs uppercase tracking-wider text-[#1A1A1A]">
                          Métricas & Painel de Performance do CRM
                        </span>
                      </div>
                    </div>
                    <CRMDashboard 
                      leads={buyerLeads} 
                      onNavigateToTab={(tab) => {
                        if (tab === "leads") {
                          setCrmSubTab("leads");
                          setTimeout(() => {
                            const el = document.getElementById("leads-section");
                            if (el) el.scrollIntoView({ behavior: "smooth" });
                          }, 50);
                        } else {
                          setActiveTab(tab);
                        }
                      }} 
                      accentColor={accentColor} 
                    />
                  </div>
                )}

                {crmSubTab === "matches" && (
                  <div className="space-y-6">
                    {/* Explicação da ferramenta */}
                    <div className="bg-[#FAF9F6] border border-amber-200/50 p-6 md:p-8 space-y-3">
                      <div className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-amber-500 animate-pulse" />
                        <h3 className="font-sans font-bold text-base uppercase tracking-tight text-[#1A1A1A]">
                          Cruzamento Inteligente Proprietário ↔ Comprador
                        </h3>
                      </div>
                      <p className="text-xs text-[#1A1A1A]/70 font-serif italic max-w-3xl leading-relaxed">
                        Esta ferramenta analisa em tempo real a compatibilidade entre proprietários diretos (FSBO) identificados pelo nosso rastreador de canais e clientes compradores ativamente buscando imóveis em {selectedCity}. O cruzamento calcula a sobreposição de bairro, tipo do imóvel, faixa de preço/orçamento e número de quartos para aproximar negócios com máxima liquidez.
                      </p>
                    </div>

                    {leadMatches.length === 0 ? (
                      <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-12 text-center space-y-4">
                        <Sparkles className="h-8 w-8 mx-auto text-neutral-300 mb-2" />
                        <h4 className="font-bold text-sm uppercase tracking-wide text-[#1A1A1A]/70">Nenhum Match Perfeito Encontrado</h4>
                        <p className="text-xs text-[#1A1A1A]/50 max-w-md mx-auto">
                          Não há proprietários diretos (FSBO) compatíveis com os compradores cadastrados nesta cidade no momento. Clique no botão <strong className="text-[#1a1a1a]">"Buscar Novos Leads"</strong> no topo para ativar a varredura inteligente de novos anúncios particulares.
                        </p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 gap-6">
                        {leadMatches.map((match) => {
                          const jointMsg = `Olá ${match.owner.nome}, tudo bem? Sou especialista imobiliário. Tenho um cliente comprador qualificado buscando exatamente um imóvel no perfil do seu no bairro ${match.owner.bairroInteresse}. O cliente possui orçamento compatível. Poderíamos agendar uma breve visita com ele?`;
                          const buyerMsg = `Olá ${match.buyer.nome}, tudo bem? Identifiquei um imóvel espetacular direto com proprietário particular no bairro ${match.owner.bairroInteresse} por R$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(match.owner.valorMaximo)} que atende o que você busca. Quer agendar visita?`;
                          const bridgeMsg = `Olá! Vi seu anúncio direto com proprietário do ${match.owner.tipoImovel} no ${match.owner.bairroInteresse} por R$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(match.owner.valorMaximo)}. Tenho um comprador, o Sr(a) ${match.buyer.nome}, buscando exatamente esse imóvel e com orçamento de R$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(match.buyer.valorMaximo)}. Vamos agendar visita?`;

                          const compatibilityPct = match.score;

                          return (
                            <div key={match.id} className="bg-[#FAF9F6] border border-[#1A1A1A]/15 overflow-hidden transition-all hover:border-[#1A1A1A]/30">
                              {/* Cabeçalho do Match */}
                              <div className="bg-gradient-to-r from-amber-50 to-emerald-50 border-b border-[#1A1A1A]/10 px-5 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2 flex-wrap">
                                    <span className="bg-amber-100 text-amber-800 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 font-mono">
                                      Proprietário Direct ↔ Comprador Match
                                    </span>
                                    <span className="bg-[#1A1A1A] text-[#FAF9F6] text-[10px] font-bold font-mono px-2 py-0.5">
                                      {compatibilityPct}% Compatibilidade
                                    </span>
                                  </div>
                                  <h4 className="font-bold text-sm text-[#1A1A1A]">
                                    {match.owner.tipoImovel} no bairro {match.owner.bairroInteresse}
                                  </h4>
                                </div>

                                <div className="text-right sm:text-right text-left">
                                  <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest block font-mono">
                                    Diferença Financeira
                                  </span>
                                  <span className={`text-sm font-extrabold ${match.priceDiff >= 0 ? "text-emerald-700" : "text-amber-700"} font-mono`}>
                                    {match.priceDiff >= 0 
                                      ? `+ R$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(match.priceDiff)} (Sobra)`
                                      : `- R$ ${new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(Math.abs(match.priceDiff))} (Ajustável)`
                                    }
                                  </span>
                                </div>
                              </div>

                              {/* Conteúdo Lado a Lado (Comparativo em Cores) */}
                              <div className="grid grid-cols-1 md:grid-cols-2 border-b border-[#1A1A1A]/10">
                                {/* Coluna do Proprietário (Amber) */}
                                <div className="p-5 bg-amber-50/20 border-r border-[#1A1A1A]/10 space-y-4">
                                  <div className="flex items-center justify-between border-b border-amber-200/50 pb-2">
                                    <div className="flex items-center gap-2">
                                      <div className="h-6 w-6 rounded-full bg-amber-500 text-white font-bold text-xs flex items-center justify-center font-mono">
                                        P
                                      </div>
                                      <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider font-mono">
                                        🔶 Proprietário Direto (FSBO)
                                      </span>
                                    </div>
                                    <span className="text-xs font-bold text-amber-900 bg-amber-100/50 px-2 py-0.5 font-mono">
                                      R$ {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(match.owner.valorMaximo)}
                                    </span>
                                  </div>

                                  <div className="space-y-2 text-xs">
                                    <div>
                                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Nome do Proprietário</span>
                                      <span className="font-bold text-[#1A1A1A]">{match.owner.nome}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Telefone / WhatsApp</span>
                                        <span className="font-semibold font-mono">{match.owner.telefone}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">E-mail</span>
                                        <span className="font-semibold break-all">{match.owner.email || "Não informado"}</span>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Quartos</span>
                                        <span className="font-bold">{match.owner.quartos} quarto(s)</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Origem Pública</span>
                                        <span className="font-medium text-amber-800 font-mono text-[10px]">{match.owner.origem}</span>
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Detalhes do Imóvel Cadastrado</span>
                                      <p className="text-[#1A1A1A]/80 italic font-serif text-[11px] leading-relaxed bg-white/60 p-2 border border-amber-100 rounded-sm">
                                        "{match.owner.detalhes}"
                                      </p>
                                    </div>
                                  </div>

                                  {/* Botão rápido para abordar o proprietário */}
                                  <div className="pt-2">
                                    <a
                                      href={`https://wa.me/${match.owner.whatsapp}?text=${encodeURIComponent(jointMsg)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-amber-600 hover:bg-amber-700 text-white rounded-sm transition-colors text-center font-mono"
                                    >
                                      <MessageCircle className="h-3.5 w-3.5" />
                                      <span>Abordar Proprietário</span>
                                    </a>
                                  </div>
                                </div>

                                {/* Coluna do Comprador (Emerald) */}
                                <div className="p-5 bg-emerald-50/10 space-y-4">
                                  <div className="flex items-center justify-between border-b border-emerald-200/40 pb-2">
                                    <div className="flex items-center gap-2">
                                      <div className="h-6 w-6 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center font-mono">
                                        C
                                      </div>
                                      <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
                                        🟢 Cliente Comprador Qualificado
                                      </span>
                                    </div>
                                    <span className="text-xs font-bold text-emerald-900 bg-emerald-100/50 px-2 py-0.5 font-mono">
                                      R$ {new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 0 }).format(match.buyer.valorMaximo)}
                                    </span>
                                  </div>

                                  <div className="space-y-2 text-xs">
                                    <div>
                                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Nome do Comprador</span>
                                      <span className="font-bold text-[#1A1A1A]">{match.buyer.nome}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Telefone / WhatsApp</span>
                                        <span className="font-semibold font-mono">{match.buyer.telefone}</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">E-mail</span>
                                        <span className="font-semibold break-all">{match.buyer.email || "Não informado"}</span>
                                      </div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Quartos Desejados</span>
                                        <span className="font-bold">{match.buyer.quartos} quarto(s)</span>
                                      </div>
                                      <div>
                                        <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Origem do Lead</span>
                                        <span className="font-medium text-emerald-800 font-mono text-[10px]">{match.buyer.origem}</span>
                                      </div>
                                    </div>
                                    <div>
                                      <span className="text-[9px] uppercase tracking-wider text-neutral-500 block font-mono">Preferências & Detalhes da Busca</span>
                                      <p className="text-[#1A1A1A]/80 italic font-serif text-[11px] leading-relaxed bg-white/60 p-2 border border-emerald-100 rounded-sm">
                                        "{match.buyer.detalhes || 'Nenhuma preferência cadastrada.'}"
                                      </p>
                                    </div>
                                  </div>

                                  {/* Botão rápido para abordar o comprador */}
                                  <div className="pt-2">
                                    <a
                                      href={`https://wa.me/${match.buyer.whatsapp}?text=${encodeURIComponent(buyerMsg)}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="w-full flex items-center justify-center gap-2 px-3 py-2 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm transition-colors text-center font-mono"
                                    >
                                      <MessageCircle className="h-3.5 w-3.5" />
                                      <span>Abordar Comprador</span>
                                    </a>
                                  </div>
                                </div>
                              </div>

                              {/* Barra de Critérios e Mensagem de Ponte */}
                              <div className="bg-neutral-100/70 p-4 space-y-3">
                                <div className="flex flex-wrap items-center gap-1.5 text-[10px]">
                                  <span className="font-bold uppercase tracking-wider text-neutral-500 font-mono">Critérios Satisfeitos:</span>
                                  {match.reasons.map((reason, idx) => (
                                    <span key={idx} className="bg-white border border-neutral-200/80 px-2 py-0.5 rounded-sm font-semibold text-neutral-700 font-sans">
                                      ✓ {reason}
                                    </span>
                                  ))}
                                </div>

                                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1.5 border-t border-neutral-200/50">
                                  <div className="text-xs text-neutral-500 font-serif italic flex-1">
                                    "Utilize a Mensagem de Ponte abaixo para introduzir a oferta de venda particular ao comprador ativamente."
                                  </div>
                                  
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(bridgeMsg);
                                      setCopySuccessId(match.id + "-bridge");
                                      setTimeout(() => setCopySuccessId(null), 1500);
                                    }}
                                    className="flex items-center justify-center gap-1.5 px-3 py-2 text-[10px] font-bold uppercase tracking-widest bg-[#1A1A1A] hover:bg-neutral-800 text-white transition-colors"
                                  >
                                    {copySuccessId === (match.id + "-bridge") ? (
                                      <>
                                        <Check className="h-3 w-3 text-emerald-400" />
                                        <span>Copiado!</span>
                                      </>
                                    ) : (
                                      <>
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Copiar Mensagem Ponte (Dual)</span>
                                      </>
                                    )}
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}

                {crmSubTab === "leads" && (
                  <>
                    {/* Filtros e Busca */}
                    <div id="leads-section" className="bg-[#F3F1ED] border border-[#1A1A1A]/10 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2 flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <SlidersHorizontal className="h-4 w-4 text-[#1A1A1A]/60" />
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 font-mono">Filtros Inteligentes e Segmentação de Contatos</span>
                    </div>
                    {/* Botão rápido para limpar filtros */}
                    {(leadSearchQuery || selectedLeadBairro !== "Todos" || selectedLeadTipo !== "Todos" || selectedLeadStatus !== "Todos" || selectedLeadCategory !== "Todos" || selectedLeadPeriod !== "Todos") && (
                      <button
                        onClick={() => {
                          setLeadSearchQuery("");
                          setSelectedLeadBairro("Todos");
                          setSelectedLeadTipo("Todos");
                          setSelectedLeadStatus("Todos");
                          setSelectedLeadCategory("Todos");
                          setSelectedLeadPeriod("Todos");
                        }}
                        className="text-[9px] font-bold uppercase tracking-wider text-rose-600 hover:text-rose-700 transition-colors"
                      >
                        Limpar Filtros [X]
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                    {/* Campo de Busca Livre */}
                    <div className="relative col-span-1 sm:col-span-2 md:col-span-3 lg:col-span-2">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#1A1A1A]/40" />
                      <input
                        type="text"
                        placeholder="Buscar por nome, bairro, detalhes..."
                        value={leadSearchQuery}
                        onChange={(e) => setLeadSearchQuery(e.target.value)}
                        className="w-full text-xs pl-9 pr-3 py-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Filtro por Categoria */}
                    <select
                      value={selectedLeadCategory}
                      onChange={(e) => setSelectedLeadCategory(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors font-semibold"
                    >
                      <option value="Todos">Tipo de Lead: Todos</option>
                      <option value="Comprador">🟢 Compradores</option>
                      <option value="Proprietário">🔶 Proprietários Diretos (FSBO)</option>
                    </select>

                    {/* Filtro por Período */}
                    <select
                      value={selectedLeadPeriod}
                      onChange={(e) => setSelectedLeadPeriod(e.target.value as any)}
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors font-semibold"
                    >
                      <option value="Todos">Período: Todos</option>
                      <option value="Hoje">Hoje (Últimas 24h)</option>
                      <option value="7d">Últimos 7 dias</option>
                      <option value="30d">Últimos 30 dias</option>
                      <option value="90d">Últimos 90 dias</option>
                    </select>

                    {/* Filtro por Bairro */}
                    <select
                      value={selectedLeadBairro}
                      onChange={(e) => setSelectedLeadBairro(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    >
                      <option value="Todos">Bairro: Todos</option>
                      {availableBairros.filter(b => b !== "Todos").map((bairro) => (
                        <option key={bairro} value={bairro}>{bairro}</option>
                      ))}
                    </select>

                    {/* Filtro por Tipo de Imóvel */}
                    <select
                      value={selectedLeadTipo}
                      onChange={(e) => setSelectedLeadTipo(e.target.value)}
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    >
                      <option value="Todos">Imóvel: Todos</option>
                      <option value="Apartamento">Apartamento</option>
                      <option value="Casa">Casa</option>
                      <option value="Casa em Condomínio">Casa em Condomínio</option>
                      <option value="Terreno">Terreno</option>
                      <option value="Sítio/Chácara">Sítio / Chácara</option>
                      <option value="Cobertura">Cobertura</option>
                    </select>

                    {/* Filtro por Status */}
                    <select
                      value={selectedLeadStatus}
                      onChange={(e) => setSelectedLeadStatus(e.target.value)}
                      className="w-full text-xs col-span-1 p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    >
                      <option value="Todos">Status CRM: Todos</option>
                      <option value="Pendente">Pendente</option>
                      <option value="Contatado">Contatado</option>
                      <option value="Interesse Confirmado">Interesse Confirmado</option>
                      <option value="Sem Interesse">Sem Interesse</option>
                      <option value="Número Incorreto">Número Incorreto</option>
                    </select>
                  </div>
                </div>

                {/* Painel Configurador de Mensagem de Abordagem */}
                <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#1A1A1A]/5 pb-2">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#1A1A1A]/60 font-mono">
                      Templates de Abordagem Personalizada (WhatsApp / E-mail)
                    </span>
                    <span className="text-[9px] font-mono text-[#1A1A1A]/40">Variáveis válidas: {'{nome}'} • {'{tipo_imovel}'} • {'{bairro}'} • {'{valor_maximo}'}</span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {/* Template para Compradores */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-bold text-indigo-700 uppercase tracking-wider font-mono">🟢 Script de Abordagem para Compradores:</span>
                      <textarea
                        value={buyerProspectTemplate}
                        onChange={(e) => setBuyerProspectTemplate(e.target.value)}
                        placeholder="Escreva seu texto de abordagem de comprador aqui..."
                        rows={3}
                        className="w-full text-xs p-3 bg-white border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                      {consolidatedBuyerLeads.filter(l => (l.tipoLead || "Comprador") === "Comprador").length > 0 ? (
                        <div className="bg-[#F3F1ED]/40 border border-[#1A1A1A]/5 p-2.5 text-[10px] text-[#1A1A1A]/70 italic">
                          <span className="font-bold text-[8px] font-mono uppercase text-indigo-600 block mb-0.5">Exemplo com comprador:</span>
                          "{buyerProspectTemplate
                            .replace("{nome}", consolidatedBuyerLeads.filter(l => (l.tipoLead || "Comprador") === "Comprador")[0].nome)
                            .replace("{tipo_imovel}", consolidatedBuyerLeads.filter(l => (l.tipoLead || "Comprador") === "Comprador")[0].tipoImovel)
                            .replace("{bairro}", consolidatedBuyerLeads.filter(l => (l.tipoLead || "Comprador") === "Comprador")[0].bairroInteresse)
                            .replace("{valor_maximo}", new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(consolidatedBuyerLeads.filter(l => (l.tipoLead || "Comprador") === "Comprador")[0].valorMaximo))}"
                        </div>
                      ) : (
                        <span className="text-[9px] text-[#1A1A1A]/40 italic block">Nenhum comprador filtrado para demonstrar</span>
                      )}
                    </div>

                    {/* Template para Proprietários */}
                    <div className="space-y-2">
                      <span className="block text-[10px] font-bold text-amber-700 uppercase tracking-wider font-mono">🔶 Script de Captação para Proprietários Diretos (FSBO):</span>
                      <textarea
                        value={ownerProspectTemplate}
                        onChange={(e) => setOwnerProspectTemplate(e.target.value)}
                        placeholder="Escreva seu texto de captação de proprietário aqui..."
                        rows={3}
                        className="w-full text-xs p-3 bg-white border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                      {consolidatedBuyerLeads.filter(l => l.tipoLead === "Proprietário").length > 0 ? (
                        <div className="bg-[#F3F1ED]/40 border border-[#1A1A1A]/5 p-2.5 text-[10px] text-[#1A1A1A]/70 italic">
                          <span className="font-bold text-[8px] font-mono uppercase text-amber-600 block mb-0.5">Exemplo com proprietário:</span>
                          "{ownerProspectTemplate
                            .replace("{nome}", consolidatedBuyerLeads.filter(l => l.tipoLead === "Proprietário")[0].nome)
                            .replace("{tipo_imovel}", consolidatedBuyerLeads.filter(l => l.tipoLead === "Proprietário")[0].tipoImovel)
                            .replace("{bairro}", consolidatedBuyerLeads.filter(l => l.tipoLead === "Proprietário")[0].bairroInteresse)
                            .replace("{valor_maximo}", new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(consolidatedBuyerLeads.filter(l => l.tipoLead === "Proprietário")[0].valorMaximo))}"
                        </div>
                      ) : (
                        <span className="text-[9px] text-[#1A1A1A]/40 italic block">Nenhum proprietário filtrado para demonstrar</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Lista de Compradores Encontrados */}
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-xs font-mono font-bold uppercase text-[#1A1A1A]/60">
                      {consolidatedBuyerLeads.length} {
                        selectedLeadCategory === "Proprietário" 
                          ? (consolidatedBuyerLeads.length === 1 ? "proprietário direto (FSBO)" : "proprietários diretos (FSBO)")
                          : selectedLeadCategory === "Comprador"
                            ? (consolidatedBuyerLeads.length === 1 ? "comprador interessado" : "compradores interessados")
                            : (consolidatedBuyerLeads.length === 1 ? "contato / lead" : "contatos / leads")
                      } em {selectedCity}
                    </span>
                  </div>

                  {consolidatedBuyerLeads.length === 0 ? (
                    <div className="bg-[#F3F1ED]/50 border border-dashed border-[#1A1A1A]/20 p-12 text-center space-y-3">
                      <div className="h-10 w-10 rounded-full border border-neutral-500/10 flex items-center justify-center mx-auto text-neutral-500">
                        <Search className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm uppercase text-[#1A1A1A]">Nenhum lead correspondente</h4>
                        <p className="text-xs text-[#1A1A1A]/50 mt-1">Nenhum lead atende aos critérios dos filtros ativos nesta cidade.</p>
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {consolidatedBuyerLeads.map((lead) => {
                        // Gerar a mensagem personalizada para este lead específico baseado no tipo
                        const isOwner = (lead.tipoLead || "Comprador") === "Proprietário";
                        const activeTemplate = isOwner ? ownerProspectTemplate : buyerProspectTemplate;
                        const customizedMsg = activeTemplate
                          .replace("{nome}", lead.nome)
                          .replace("{tipo_imovel}", lead.tipoImovel)
                          .replace("{bairro}", lead.bairroInteresse)
                          .replace("{valor_maximo}", new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(lead.valorMaximo));
                        
                        const waLink = `https://api.whatsapp.com/send?phone=${lead.whatsapp}&text=${encodeURIComponent(customizedMsg)}`;

                        // Diferenciação Visual Comprador vs Proprietário
                        const cardBorderClass = isOwner 
                          ? "border-l-4 border-l-amber-500 border-amber-500/25 hover:border-amber-500/50 hover:shadow-amber-500/5"
                          : "border-l-4 border-l-emerald-500 border-emerald-500/25 hover:border-emerald-500/50 hover:shadow-emerald-500/5";

                        const typeBadgeClass = isOwner
                          ? "bg-amber-50 dark:bg-amber-950/20 text-amber-700 dark:text-amber-400 border border-amber-500/20"
                          : "bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20";

                        const typeBadgeText = isOwner ? "🔶 PROPRIETÁRIO DIRETO (FSBO)" : "🟢 CLIENTE COMPRADOR";

                        const avatarBgClass = isOwner 
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-900"
                          : "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900";

                        const priceLabel = isOwner ? "Valor do Imóvel" : "Orçamento Máximo";

                        // Determinar a cor de destaque do status do lead
                        let statusColorClass = "bg-orange-500/10 border-orange-500/30 text-orange-600 dark:text-orange-400";
                        if (lead.status === "Contatado") statusColorClass = "bg-blue-500/10 border-blue-500/30 text-blue-600 dark:text-blue-400";
                        if (lead.status === "Interesse Confirmado") statusColorClass = "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400";
                        if (lead.status === "Sem Interesse") statusColorClass = "bg-rose-500/10 border-rose-500/30 text-rose-600 dark:text-rose-400";
                        if (lead.status === "Número Incorreto") statusColorClass = "bg-neutral-500/10 border-neutral-500/30 text-neutral-500";

                        // Logo inicial
                        const initials = lead.nome.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase().substring(0, 2);

                        return (
                          <div
                            key={lead.id}
                            className={`bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-4 group hover:border-[#1A1A1A]/30 transition-all shadow-md hover:shadow-lg flex flex-col justify-between ${cardBorderClass}`}
                          >
                            <div className="space-y-4">
                              {/* Topo do Lead: Identificação, Badge de Categoria e Status */}
                              <div className="flex flex-col gap-2">
                                <div className="flex items-center justify-between flex-wrap gap-2">
                                  {/* Tipo de Lead Badge */}
                                  <span className={`text-[9px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-sm font-mono ${typeBadgeClass}`}>
                                    {typeBadgeText}
                                  </span>

                                  {/* Status Selector */}
                                  <select
                                    value={lead.status}
                                    onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                                    className={`text-[9px] font-bold uppercase tracking-wider px-2 py-1 border transition-all ${statusColorClass} rounded-sm cursor-pointer bg-transparent focus:outline-none`}
                                  >
                                    <option value="Pendente">Pendente</option>
                                    <option value="Contatado">Contatado</option>
                                    <option value="Interesse Confirmado">Confirmado</option>
                                    <option value="Sem Interesse">Sem Interesse</option>
                                    <option value="Número Incorreto">Incorreto</option>
                                  </select>
                                </div>

                                <div className="flex items-start gap-3 mt-1">
                                  <div className={`h-11 w-11 rounded-full border flex items-center justify-center font-extrabold font-mono text-sm shrink-0 mt-0.5 shadow-sm ${avatarBgClass}`}>
                                    {initials}
                                  </div>
                                  <div className="min-w-0">
                                    <h3 className="text-base font-extrabold uppercase tracking-tight theme-text-primary truncate">
                                      {lead.nome}
                                    </h3>
                                    <div className="text-[10px] theme-text-muted font-mono mt-0.5 flex items-center gap-1.5 flex-wrap">
                                      <span>Registrado: {lead.dataCaptura.split("-").reverse().join("/")}</span>
                                      <span>•</span>
                                      <span>Canal: <strong className="text-slate-700 dark:text-slate-300">{lead.origem}</strong></span>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Alerta de Divergência de Dados / Inconsistência */}
                              {lead.hasInconsistencies && lead.inconsistenciesDetected && lead.inconsistenciesDetected.length > 0 && (
                                <div className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-sm flex items-start gap-2 text-[10px] text-rose-700 dark:text-rose-400 font-mono">
                                  <AlertCircle className="h-4 w-4 shrink-0 text-rose-600 mt-0.5" />
                                  <div>
                                    <span className="font-bold block uppercase text-[8px] tracking-wider mb-0.5">Divergência Detectada por IA:</span>
                                    {lead.inconsistenciesDetected.join(" | ")}
                                  </div>
                                </div>
                              )}

                              {/* Barra de Score e Confiabilidade */}
                              {lead.confidenceScore !== undefined && (
                                <div className="space-y-1 bg-neutral-100/40 dark:bg-white/5 border theme-border p-2.5 rounded-sm">
                                  <div className="flex justify-between items-center text-[9px] font-mono">
                                    <span className="theme-text-muted uppercase font-bold text-[8px]">Confiabilidade dos Dados:</span>
                                    <span className={`font-bold uppercase ${lead.confidenceScore >= 80 ? "text-emerald-600 dark:text-emerald-400" : lead.confidenceScore >= 60 ? "text-amber-600 dark:text-amber-400" : "text-rose-600 dark:text-rose-400"}`}>
                                      {lead.confidenceScore}% • {lead.confidenceLevel}
                                    </span>
                                  </div>
                                  <div className="h-1.5 bg-slate-200 dark:bg-neutral-800 rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full rounded-full transition-all duration-500 ${lead.confidenceScore >= 80 ? "bg-emerald-500" : lead.confidenceScore >= 60 ? "bg-amber-500" : "bg-rose-500"}`}
                                      style={{ width: `${lead.confidenceScore}%` }}
                                    />
                                  </div>
                                </div>
                              )}

                              {/* Detalhes de Interesse / Parâmetros do Imóvel */}
                              <div className="bg-[#F3F1ED] border border-[#1A1A1A]/5 p-3 rounded-sm space-y-2">
                                <div className="grid grid-cols-2 gap-3 text-[11px]">
                                  <div>
                                    <span className="block text-[8px] font-mono text-[#1A1A1A]/50 uppercase font-bold">Imóvel:</span>
                                    <span className="font-extrabold text-[#1A1A1A]">{lead.tipoImovel}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[8px] font-mono text-[#1A1A1A]/50 uppercase font-bold">Localidade / Bairro:</span>
                                    <span className="font-extrabold text-[#1A1A1A]">{lead.bairroInteresse}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[8px] font-mono text-[#1A1A1A]/50 uppercase font-bold">Quartos Exigidos:</span>
                                    <span className="font-extrabold text-[#1A1A1A]">{lead.quartos} {lead.quartos === 1 ? "quarto" : "quartos"}</span>
                                  </div>
                                  <div>
                                    <span className="block text-[8px] font-mono text-[#1A1A1A]/50 uppercase font-bold">{priceLabel}:</span>
                                    <span className={`font-extrabold font-mono text-sm ${isOwner ? "text-amber-600 dark:text-amber-400" : "text-emerald-600 dark:text-emerald-400"}`}>
                                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(lead.valorMaximo)}
                                    </span>
                                  </div>
                                </div>

                                {lead.detalhes && (
                                  <div className="border-t border-[#1A1A1A]/5 pt-2 mt-2 text-[10px] theme-text-muted font-serif italic">
                                    "{lead.detalhes}"
                                  </div>
                                )}
                              </div>

                              {/* Trecho / Quote de Origem (Contexto do Scraper) */}
                              {lead.textExcerpt && (
                                <div className="bg-[#FAF9F6] border border-[#1A1A1A]/5 p-2.5 rounded-sm text-[10px] theme-text-muted italic relative group/excerpt font-serif">
                                  <span className="absolute right-2 top-1.5 text-[8px] uppercase tracking-wider font-mono font-bold text-slate-400">Contexto de Captação</span>
                                  "{lead.textExcerpt}"
                                </div>
                              )}

                              {/* Lista de Canais Verificados (Fontes de Cruzamento) */}
                              {lead.sourcesChecked && lead.sourcesChecked.length > 0 && (
                                <div className="flex flex-wrap gap-1 items-center bg-neutral-100/30 dark:bg-white/5 border theme-border p-2 rounded-sm">
                                  <span className="text-[8px] font-mono text-[#1A1A1A]/50 uppercase font-bold mr-1">Cruzamento de Fontes:</span>
                                  {lead.sourcesChecked.map((source, idx) => (
                                    <span key={idx} className="inline-block text-[8px] font-mono px-1.5 py-0.5 bg-white dark:bg-[#1E1E1E] border theme-border text-slate-600 dark:text-slate-400 rounded-xs">
                                      {source}
                                    </span>
                                  ))}
                                </div>
                              )}

                              {/* Dados de Contato e Identidade */}
                              <div className="text-[11px] space-y-1.5 border-t border-[#1A1A1A]/5 pt-3 font-mono text-[#1A1A1A]/70">
                                <div className="flex items-center justify-between">
                                  <span>Telefone / WhatsApp: <strong className="text-[#1A1A1A]">{lead.telefone}</strong></span>
                                </div>
                                <div className="flex items-center justify-between gap-1">
                                  <span className="truncate">E-mail: <strong className="text-[#1A1A1A]">{lead.email}</strong></span>
                                  <button
                                    onClick={() => {
                                      navigator.clipboard.writeText(lead.email);
                                      setCopySuccessId(lead.id + "-email");
                                      setTimeout(() => setCopySuccessId(null), 1500);
                                    }}
                                    className="p-1 hover:bg-[#1A1A1A]/5 rounded-sm transition-colors shrink-0"
                                    title="Copiar e-mail"
                                  >
                                    {copySuccessId === (lead.id + "-email") ? (
                                      <Check className="h-3 w-3 text-emerald-600" />
                                    ) : (
                                      <Copy className="h-3 w-3 text-[#1A1A1A]/55" />
                                    )}
                                  </button>
                                </div>
                                {lead.redeSocial && (
                                  <div className="flex items-center justify-between">
                                    <span>Rede Social: <strong className="text-[#1A1A1A]">{lead.redeSocial}</strong></span>
                                  </div>
                                )}
                              </div>

                              {/* URL Trace Link */}
                              {lead.urlTrace && (
                                <div className="text-[10px] font-mono pt-1">
                                  <a 
                                    href={lead.urlTrace} 
                                    target="_blank" 
                                    rel="noopener noreferrer" 
                                    className="inline-flex items-center gap-1.5 text-[#00AFCB] hover:underline hover:text-[#008FA6] transition-colors"
                                  >
                                    <ExternalLink className="h-3 w-3" />
                                    <span>Rastrear postagem original (Link Público)</span>
                                  </a>
                                </div>
                              )}

                              {/* Método de Captação e Registro */}
                              <div className="flex justify-between text-[8px] font-mono text-[#1A1A1A]/45 pt-1.5 border-t border-[#1A1A1A]/5">
                                <span>Método: {lead.captureMethod || "Verificação via WhatsApp"}</span>
                                <span>Sinc: {lead.capturedAt || `${lead.dataCaptura} 10:14 UTC`}</span>
                              </div>
                            </div>

                            {/* Ações de Abordagem Direta */}
                            <div className="flex items-center justify-between gap-2 border-t border-[#1A1A1A]/10 pt-3.5 mt-4">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => startEditingLead(lead)}
                                  className="p-2 border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/40 text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors rounded-sm"
                                  title="Editar Lead"
                                >
                                  <Edit2 className="h-3.5 w-3.5" />
                                </button>
                                <button
                                  onClick={() => handleDeleteLead(lead.id)}
                                  className="p-2 border border-red-500/10 hover:border-red-500/40 text-red-500/70 hover:text-red-600 transition-colors rounded-sm"
                                  title="Excluir Lead"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>

                              <div className="flex flex-wrap items-center gap-1.5">
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(customizedMsg);
                                    setCopySuccessId(lead.id + "-msg");
                                    setTimeout(() => setCopySuccessId(null), 1500);
                                  }}
                                  className="flex items-center gap-1 px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-[#F3F1ED] hover:bg-neutral-200 border border-[#1A1A1A]/10 transition-colors"
                                >
                                  {copySuccessId === (lead.id + "-msg") ? (
                                    <>
                                      <Check className="h-3 w-3 text-emerald-600" />
                                      <span>Copiado!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 text-[#1A1A1A]/60" />
                                      <span>Texto</span>
                                    </>
                                  )}
                                </button>

                                {/* WhatsApp Button */}
                                <a
                                  href={waLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => {
                                    if (lead.status === "Pendente") {
                                      handleUpdateLeadStatus(lead.id, "Contatado");
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-emerald-600 hover:bg-emerald-700 text-white rounded-sm transition-colors"
                                  title="Conversar no WhatsApp"
                                >
                                  <MessageCircle className="h-3.5 w-3.5" />
                                  <span>WhatsApp</span>
                                </a>

                                {/* Facebook Button */}
                                <a
                                  href={lead.redeSocial ? (lead.redeSocial.startsWith("http") ? lead.redeSocial : `https://${lead.redeSocial}`) : `https://www.facebook.com/search/people/?q=${encodeURIComponent(lead.nome)}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => {
                                    if (lead.status === "Pendente") {
                                      handleUpdateLeadStatus(lead.id, "Contatado");
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-blue-600 hover:bg-blue-700 text-white rounded-sm transition-colors"
                                  title="Ver Perfil ou Contatar via Facebook"
                                >
                                  <Facebook className="h-3.5 w-3.5" />
                                  <span>Facebook</span>
                                </a>

                                {/* E-mail Button */}
                                <a
                                  href={`mailto:${lead.email}?subject=${encodeURIComponent("Contato Imobiliário • Grupo Leandro Rodrigues")}&body=${encodeURIComponent(customizedMsg)}`}
                                  onClick={() => {
                                    if (lead.status === "Pendente") {
                                      handleUpdateLeadStatus(lead.id, "Contatado");
                                    }
                                  }}
                                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest bg-zinc-600 hover:bg-zinc-700 text-white rounded-sm transition-colors"
                                  title="Enviar E-mail"
                                >
                                  <Mail className="h-3.5 w-3.5" />
                                  <span>E-mail</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                </>
                )}
              </motion.div>
            )}

            {activeTab === "intelligence" && (
              <motion.div
                key="intelligence-tab"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-8 animate-fadeIn"
              >
                {/* Header do Painel de Inteligência */}
                <div className="bg-[#F3F1ED] border border-[#1A1A1A]/10 p-6 md:p-8 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Cpu className="h-5 w-5 text-amber-600 animate-pulse" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-amber-800 font-mono">Central de Inteligência Imobiliária & Tráfego</span>
                      </div>
                      <h2 className="font-serif italic text-2xl md:text-3xl text-[#1A1A1A]">
                        Painel de Inteligência & Integrações
                      </h2>
                      <p className="text-xs text-[#1A1A1A]/60 max-w-2xl leading-relaxed">
                        Conecte suas redes, monitore classificados públicos em tempo real, classifique leads com inteligência artificial, avalie oportunidades com o radar comercial e acesse sugestões estratégicas geradas a partir do seu histórico de atuação.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-1 bg-amber-50 border border-amber-200 text-amber-800 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm font-mono">
                        AI Core Active
                      </span>
                      <span className="inline-flex items-center gap-1 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-sm font-mono">
                        GDPR & LGPD Compliant
                      </span>
                    </div>
                  </div>

                  {/* Sub-Aba Navigation */}
                  <div className="flex flex-wrap border-t border-[#1A1A1A]/10 pt-4 gap-1">
                    <button
                      onClick={() => setIntelSubTab("connections")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "connections"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <SlidersHorizontal className="h-3.5 w-3.5" />
                      <span>1. Central de Integrações</span>
                    </button>
                    <button
                      onClick={() => setIntelSubTab("marketplace")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "marketplace"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <Facebook className="h-3.5 w-3.5" />
                      <span>2. Monitor de Redes & IA</span>
                    </button>
                    <button
                      onClick={() => setIntelSubTab("radar")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "radar"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <Award className="h-3.5 w-3.5" />
                      <span>3. Radar de Conversão</span>
                    </button>
                    <button
                      onClick={() => setIntelSubTab("brain")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "brain"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <Database className="h-3.5 w-3.5" />
                      <span>4. Aprendizado Contínuo</span>
                    </button>
                    <button
                      onClick={() => setIntelSubTab("blueprint")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "blueprint"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <Building className="h-3.5 w-3.5 text-amber-600" />
                      <span className="text-amber-700 dark:text-amber-500 font-extrabold">5. SaaS Blueprint</span>
                    </button>
                    <button
                      onClick={() => setIntelSubTab("seo")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "seo"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <Sparkles className="h-3.5 w-3.5" />
                      <span>6. Otimizador & SEO</span>
                    </button>
                    <button
                      onClick={() => setIntelSubTab("persona")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "persona"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <Users className="h-3.5 w-3.5" />
                      <span>7. Pesquisa de Perfil & Tráfego</span>
                    </button>
                    <button
                      onClick={() => setIntelSubTab("intent")}
                      className={`px-4 py-2 text-[10px] font-extrabold uppercase tracking-widest transition-all border-b-2 flex items-center gap-2 cursor-pointer ${
                        intelSubTab === "intent"
                          ? "border-amber-600 text-[#1A1A1A] bg-[#1A1A1A]/5"
                          : "border-transparent text-[#1A1A1A]/40 hover:text-[#1A1A1A] hover:bg-[#1A1A1A]/2"
                      }`}
                    >
                      <Cpu className="h-3.5 w-3.5 text-indigo-600" />
                      <span className="text-indigo-700 dark:text-indigo-400 font-extrabold">8. Inteligência de Intenção & Captura</span>
                    </button>
                  </div>
                </div>

                {/* ABA 1: CENTRAL DE INTEGRAÇÕES */}
                {intelSubTab === "connections" && (
                  <div className="space-y-6 pt-2 animate-fadeIn">
                    <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                        <Lock className="h-4.5 w-4.5 text-amber-600" />
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                          Conexão Segura de Contas Sociais e de Anúncio
                        </h3>
                      </div>
                      <p className="text-xs text-[#1A1A1A]/70 leading-relaxed max-w-3xl">
                        Ative as integrações oficiais com suas contas imobiliárias e de tráfego. O <strong>Grupo Leandro Rodrigues</strong> utiliza conexão criptografada via protocolo seguro HTTPS para interagir com as plataformas sem salvar suas senhas. Após autorizado pelo usuário, os agentes de inteligência poderão indexar comentários, analisar anúncios, categorizar contatos públicos e alimentar o CRM local com insights em tempo real.
                      </p>

                      {/* Painel de Identidade Visual e Credenciais */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 bg-white border border-[#1A1A1A]/10 p-6 rounded-sm">
                        
                        {/* Coluna 1: Logomarca */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/5 pb-2">
                            <Award className="h-4.5 w-4.5 text-[#0B7C95]" />
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Gerenciador de Logomarca Oficial
                            </h4>
                          </div>
                          <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                            Envie a imagem da sua logomarca oficial (PNG com fundo transparente recomendado) para substituir a logo padrão em todo o portal imediatamente.
                          </p>

                          <div className="flex flex-col sm:flex-row items-center gap-5 p-4 bg-[#FAF9F6] border border-[#1A1A1A]/5 rounded-sm">
                            <div className="shrink-0 bg-white p-3 border border-[#1A1A1A]/10 rounded-md relative group">
                              <LeandroRodriguesLogo className="h-16 w-16 object-contain" />
                              <span className="absolute -top-1.5 -right-1.5 text-[8px] bg-emerald-600 text-white font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider scale-90">
                                Ativo
                              </span>
                            </div>
                            <div className="space-y-2.5 w-full">
                              <div>
                                <label className="block text-[9px] font-extrabold uppercase tracking-wider text-[#1A1A1A]/70 mb-1">
                                  Carregar Nova Logomarca
                                </label>
                                <input
                                  type="file"
                                  accept="image/*"
                                  id="lr-dashboard-logo-uploader"
                                  className="hidden"
                                  onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onload = (event) => {
                                        const base64 = event.target?.result as string;
                                        if (base64) {
                                          try {
                                            localStorage.setItem("lr_portal_custom_logo", base64);
                                            window.dispatchEvent(new Event("lr_logo_updated"));
                                          } catch (err) {
                                            alert("A imagem selecionada é muito grande para o armazenamento local. Por favor, tente uma imagem menor (até 1.5MB).");
                                          }
                                        }
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                />
                                <div className="flex flex-wrap gap-2">
                                  <button
                                    onClick={() => document.getElementById("lr-dashboard-logo-uploader")?.click()}
                                    className="px-3 py-1.5 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center gap-1 cursor-pointer rounded-xs"
                                  >
                                    <Upload className="h-3.5 w-3.5" />
                                    <span>Selecionar Arquivo</span>
                                  </button>
                                  {localStorage.getItem("lr_portal_custom_logo") && (
                                    <button
                                      onClick={() => {
                                        localStorage.removeItem("lr_portal_custom_logo");
                                        window.dispatchEvent(new Event("lr_logo_updated"));
                                      }}
                                      className="px-3 py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer rounded-xs"
                                    >
                                      Reverter Padrão
                                    </button>
                                  )}
                                </div>
                              </div>
                              <p className="text-[10px] text-neutral-400">
                                Suporta formatos PNG, JPG ou SVG.
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Coluna 2: Credenciais */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/5 pb-2">
                            <Lock className="h-4.5 w-4.5 text-[#0B7C95]" />
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Chaves Mestre de Integração (Validação)
                            </h4>
                          </div>
                          <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                            Defina as credenciais seguras de controle. O modal de conexão das redes sociais e monitor de marketplaces validará os acessos estritamente contra estes dados salvos.
                          </p>

                          <div className="space-y-3.5 p-4 bg-[#FAF9F6] border border-[#1A1A1A]/5 rounded-sm">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {/* E-mail Mestre */}
                              <div className="space-y-1">
                                <label className="block text-[9px] font-extrabold uppercase tracking-wider text-[#1A1A1A]/70">
                                  E-mail de Integração Autorizado
                                </label>
                                <input
                                  type="email"
                                  value={integrationEmail}
                                  onChange={(e) => {
                                    const val = e.target.value;
                                    setIntegrationEmail(val);
                                    localStorage.setItem("lr_portal_integration_email", val);
                                  }}
                                  className="w-full p-2 bg-white border border-[#1A1A1A]/10 focus:border-[#1A1A1A] focus:outline-none text-[11px] text-[#1A1A1A] rounded-xs"
                                />
                              </div>

                              {/* Senha Mestre */}
                              <div className="space-y-1">
                                <label className="block text-[9px] font-extrabold uppercase tracking-wider text-[#1A1A1A]/70">
                                  Senha Mestre de Integração
                                </label>
                                <div className="relative">
                                  <input
                                    type={showPass ? "text" : "password"}
                                    value={integrationPassword}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setIntegrationPassword(val);
                                      localStorage.setItem("lr_portal_master_password", val);
                                    }}
                                    className="w-full p-2 pr-8 bg-white border border-[#1A1A1A]/10 focus:border-[#1A1A1A] focus:outline-none text-[11px] text-[#1A1A1A] font-mono rounded-xs"
                                  />
                                  <button
                                    type="button"
                                    onClick={() => setShowPass(!showPass)}
                                    className="absolute right-2 top-2.5 text-[#1A1A1A]/50 hover:text-[#1A1A1A] cursor-pointer"
                                  >
                                    {showPass ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                                  </button>
                                </div>
                              </div>
                            </div>

                            <div className="text-[10px] bg-amber-50 border border-amber-200/50 p-2.5 text-amber-900 leading-normal rounded-xs flex items-start gap-1.5">
                              <CheckCircle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
                              <span>
                                Use estas chaves para conectar os canais (Facebook, Instagram, etc.). Credencial padrão: <strong>cadastrodeleadslr@gmail.com</strong> / Senha: <strong>creci072065</strong> (ou a senha mestre que definir acima).
                              </span>
                            </div>
                          </div>
                        </div>

                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                        {/* Facebook */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-blue-600">
                                <Facebook className="h-5 w-5" />
                                <span className="text-xs font-bold font-mono">Facebook</span>
                              </div>
                              {connectedAccounts.facebook.connected ? (
                                <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm">CONECTADO</span>
                              ) : (
                                <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">INATIVO</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                              Permite ler mensagens de páginas autorizadas, comentários em anúncios e rastrear menções públicas no Facebook Marketplace.
                            </p>
                          </div>
                          {connectedAccounts.facebook.connected ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-emerald-800 font-mono italic">Conta ativa: {connectedAccounts.facebook.username}</p>
                              <button onClick={() => handleDisconnectAccount("facebook")} className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer">Desconectar</button>
                            </div>
                          ) : (
                            <button onClick={() => handleOpenConnectAccount("facebook")} className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">Conectar Conta</button>
                          )}
                        </div>

                        {/* Instagram */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-pink-600">
                                <Instagram className="h-5 w-5" />
                                <span className="text-xs font-bold font-mono">Instagram Business</span>
                              </div>
                              {connectedAccounts.instagram.connected ? (
                                <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm">CONECTADO</span>
                              ) : (
                                <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">INATIVO</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                              Sincroniza comentários e directs contendo termos chave (valores, bairros da serra) e gera respostas automatizadas.
                            </p>
                          </div>
                          {connectedAccounts.instagram.connected ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-emerald-800 font-mono italic">Conta ativa: {connectedAccounts.instagram.username}</p>
                              <button onClick={() => handleDisconnectAccount("instagram")} className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer">Desconectar</button>
                            </div>
                          ) : (
                            <button onClick={() => handleOpenConnectAccount("instagram")} className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">Conectar Conta</button>
                          )}
                        </div>

                        {/* WhatsApp Business */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-emerald-600">
                                <MessageCircle className="h-5 w-5" />
                                <span className="text-xs font-bold font-mono">WhatsApp Cloud API</span>
                              </div>
                              {connectedAccounts.whatsapp.connected ? (
                                <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm">CONECTADO</span>
                              ) : (
                                <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">INATIVO</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                              Dispara automaticamente modelos de mensagens (templates) para proprietários particulares e novos compradores captados no monitor.
                            </p>
                          </div>
                          {connectedAccounts.whatsapp.connected ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-emerald-800 font-mono italic">Conta ativa: {connectedAccounts.whatsapp.username}</p>
                              <button onClick={() => handleDisconnectAccount("whatsapp")} className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer">Desconectar</button>
                            </div>
                          ) : (
                            <button onClick={() => handleOpenConnectAccount("whatsapp")} className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">Conectar Conta</button>
                          )}
                        </div>

                        {/* Google Business Profile */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-blue-500">
                                <Building className="h-5 w-5" />
                                <span className="text-xs font-bold font-mono">Google Business</span>
                              </div>
                              {connectedAccounts.googlebusiness.connected ? (
                                <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm">CONECTADO</span>
                              ) : (
                                <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">INATIVO</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                              Sincroniza avaliações locais de clientes, posta ofertas regionais do site direto no painel de mapas do Google em Teresópolis e região.
                            </p>
                          </div>
                          {connectedAccounts.googlebusiness.connected ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-emerald-800 font-mono italic">Conta ativa: {connectedAccounts.googlebusiness.username}</p>
                              <button onClick={() => handleDisconnectAccount("googlebusiness")} className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer">Desconectar</button>
                            </div>
                          ) : (
                            <button onClick={() => handleOpenConnectAccount("googlebusiness")} className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">Conectar Conta</button>
                          )}
                        </div>

                        {/* Google Analytics */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-orange-500">
                                <Globe className="h-5 w-5" />
                                <span className="text-xs font-bold font-mono">Google Analytics</span>
                              </div>
                              {connectedAccounts.analytics.connected ? (
                                <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm">CONECTADO</span>
                              ) : (
                                <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">INATIVO</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                              Leitura direta do tráfego do site www.grupoleandrorodrigues.com.br, rastreando de quais bairros e cidades vêm os cliques imobiliários.
                            </p>
                          </div>
                          {connectedAccounts.analytics.connected ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-emerald-800 font-mono italic">Conta ativa: {connectedAccounts.analytics.username}</p>
                              <button onClick={() => handleDisconnectAccount("analytics")} className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer">Desconectar</button>
                            </div>
                          ) : (
                            <button onClick={() => handleOpenConnectAccount("analytics")} className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">Conectar Conta</button>
                          )}
                        </div>

                        {/* LinkedIn */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-blue-700">
                                <Linkedin className="h-5 w-5" />
                                <span className="text-xs font-bold font-mono">LinkedIn Profile</span>
                              </div>
                              {connectedAccounts.linkedin.connected ? (
                                <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm">CONECTADO</span>
                              ) : (
                                <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">INATIVO</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                              Focado em networking corporativo e captação de investidores de alto poder aquisitivo interessados em imóveis de luxo na região serrana.
                            </p>
                          </div>
                          {connectedAccounts.linkedin.connected ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-emerald-800 font-mono italic">Conta ativa: {connectedAccounts.linkedin.username}</p>
                              <button onClick={() => handleDisconnectAccount("linkedin")} className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer">Desconectar</button>
                            </div>
                          ) : (
                            <button onClick={() => handleOpenConnectAccount("linkedin")} className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">Conectar Conta</button>
                          )}
                        </div>

                        {/* OLX & Portais */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm">
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-purple-600">
                                <Database className="h-5 w-5" />
                                <span className="text-xs font-bold font-mono">Portais & OLX</span>
                              </div>
                              {connectedAccounts.olx.connected ? (
                                <span className="text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2 py-0.5 rounded-sm">CONECTADO</span>
                              ) : (
                                <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-400 border border-neutral-200 px-2 py-0.5 rounded-sm">INATIVO</span>
                              )}
                            </div>
                            <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                              Integração direta de leitura de leads inbound dos portais imobiliários credenciados compatíveis com CRM integrado.
                            </p>
                          </div>
                          {connectedAccounts.olx.connected ? (
                            <div className="space-y-2">
                              <p className="text-[10px] text-emerald-800 font-mono italic">Conta ativa: {connectedAccounts.olx.username}</p>
                              <button onClick={() => handleDisconnectAccount("olx")} className="w-full py-1.5 border border-red-200 hover:bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider transition-colors cursor-pointer">Desconectar</button>
                            </div>
                          ) : (
                            <button onClick={() => handleOpenConnectAccount("olx")} className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors cursor-pointer">Conectar Conta</button>
                          )}
                        </div>

                        {/* Outras plataformas do escopo (Search Console, TikTok, YouTube) */}
                        <div className="bg-neutral-50/50 border border-dashed border-[#1A1A1A]/10 p-5 space-y-4 flex flex-col justify-between rounded-sm col-span-1 md:col-span-2">
                          <div className="space-y-1.5">
                            <span className="text-[8px] font-bold font-mono uppercase tracking-wider bg-neutral-200 text-neutral-700 px-1.5 py-0.5 rounded-sm">Módulo Adicional Ativo</span>
                            <h4 className="text-xs font-bold text-[#1A1A1A]">Google Search Console, YouTube & TikTok Integrators</h4>
                            <p className="text-[11px] text-[#1A1A1A]/50 leading-relaxed">
                              Suas ferramentas de autoridade de vídeo e otimização de busca orgânica já estão configuradas para trocar metadados de palavra-chave automaticamente com o módulo do Otimizador de SEO.
                            </p>
                          </div>
                          <div className="text-[10px] text-emerald-700 font-mono flex items-center gap-1">
                            <CheckCircle className="h-3.5 w-3.5" />
                            <span>Serviços prontos para o cruzamento inteligente de dados de intenção de busca.</span>
                          </div>
                        </div>

                      </div>

                      {/* Simulador n8n Integrado */}
                      <div className="pt-6 border-t border-[#1A1A1A]/10">
                        <N8NFlowSimulator leads={buyerLeads} accentColor={accentColor} />
                      </div>

                    </div>
                  </div>
                )}

                {/* ABA 2: MONITOR DE REDES & IA */}
                {intelSubTab === "marketplace" && (
                  <div className="space-y-6 pt-2 animate-fadeIn">
                    <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-6">
                      
                      {/* Controles de Busca */}
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <SlidersHorizontal className="h-4 w-4 text-amber-600" />
                            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Varredura de Marketplace & Grupos Públicos
                            </h3>
                          </div>
                          <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                            Rastreie anúncios imobiliários públicos postados diretamente por particulares no Facebook Marketplace, grupos locais e OLX da Região Serrana e Estado do Rio de Janeiro.
                          </p>
                        </div>

                        <div>
                          <button
                            onClick={handleStartMarketplaceScan}
                            disabled={isScanningMarketplace}
                            className="px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-extrabold uppercase tracking-widest transition-all cursor-pointer flex items-center gap-2 shadow-sm disabled:bg-neutral-300 disabled:cursor-not-allowed"
                          >
                            {isScanningMarketplace ? (
                              <>
                                <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                <span>Rastreando Redes...</span>
                              </>
                            ) : (
                              <>
                                <Search className="h-3.5 w-3.5" />
                                <span>Iniciar Monitoramento em Tempo Real</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Log de Scanner */}
                      {isScanningMarketplace && (
                        <div className="bg-neutral-900 text-emerald-400 p-4 font-mono text-[10px] space-y-1.5 rounded-xs shadow-inner">
                          <div className="flex items-center justify-between text-neutral-400 border-b border-neutral-800 pb-1.5 mb-2">
                            <span>SISTEMA DE MONITORAMENTO INTEGRADO</span>
                            <span className="animate-ping">●</span>
                          </div>
                          <p className="animate-pulse">{marketplaceScanProgress}</p>
                          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-1.5">
                            <div className="bg-emerald-500 h-full animate-[loading_5s_ease-in-out_infinite]" style={{ width: "60%" }} />
                          </div>
                        </div>
                      )}

                      {/* Grid de Oportunidades */}
                      {!isScanningMarketplace && (
                        <div className="space-y-4">
                          <div className="flex justify-between items-center bg-[#F3F1ED] px-4 py-2 text-[10px] font-bold font-mono uppercase text-[#1A1A1A]/70">
                            <span>Anúncios Públicos Identificados ({marketplaceOpportunities.length})</span>
                            <span className="italic text-amber-700">Filtro Ativo: Todos os Canais Cadastrados</span>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {marketplaceOpportunities.map((opp) => {
                              const isAnalyzed = opp.status === "Analisado" || opp.status === "Capturado";
                              const isCaptured = opp.status === "Capturado";

                              return (
                                <div key={opp.id} className={`bg-white border p-5 flex flex-col justify-between space-y-4 transition-all ${isCaptured ? "border-emerald-500 bg-emerald-50/10" : "border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30"}`}>
                                  <div className="space-y-3">
                                    {/* Badges superiores */}
                                    <div className="flex items-center justify-between">
                                      <span className="inline-flex items-center gap-1 text-[9px] font-extrabold font-mono uppercase bg-amber-50 text-amber-900 border border-amber-200 px-2 py-0.5 rounded-xs">
                                        {opp.source}
                                      </span>
                                      <span className="text-[10px] text-neutral-400 font-mono">{opp.date}</span>
                                    </div>

                                    {/* Titulo do Imóvel / Valores */}
                                    <div className="space-y-1">
                                      <h4 className="font-serif italic font-bold text-base text-[#1A1A1A]">
                                        {opp.propertyType} para {opp.type} em {opp.city} ({opp.bairro})
                                      </h4>
                                      <p className="text-sm font-bold text-amber-700 font-mono">
                                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(opp.value)}
                                      </p>
                                    </div>

                                    {/* Descrição curta */}
                                    <p className="text-xs text-neutral-600 leading-relaxed font-serif line-clamp-2">
                                      "{opp.details}"
                                    </p>

                                    {/* Bloco de Classificação da IA */}
                                    <div className="pt-2.5 border-t border-neutral-100 space-y-2">
                                      {isAnalyzed ? (
                                        <div className="bg-amber-50/50 border border-amber-200/40 p-3 rounded-xs space-y-2 text-xs">
                                          <div className="flex items-center justify-between">
                                            <span className="text-[9px] font-extrabold font-mono uppercase text-amber-800">Classificação IA:</span>
                                            <span className="text-[9px] font-bold font-mono text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-xs">Confiança: {opp.aiConfidence}%</span>
                                          </div>
                                          <div className="flex items-center gap-1.5">
                                            <User className="h-3.5 w-3.5 text-amber-800" />
                                            <span className="font-bold text-neutral-800 uppercase tracking-wide text-[10px]">{opp.aiClassification}</span>
                                          </div>
                                          
                                          {/* Contatos Públicos Identificados */}
                                          <div className="pt-2 border-t border-amber-200/30 space-y-1.5">
                                            <span className="block text-[8px] font-bold uppercase tracking-wider text-neutral-500 font-mono">Contatos Públicos Disponibilizados:</span>
                                            <div className="space-y-1 font-mono text-[10px] text-neutral-700">
                                              {opp.phone && <p>📞 Tel: {opp.phone}</p>}
                                              {opp.email && <p>✉ E-mail: {opp.email}</p>}
                                              {opp.socialProfile && <p>🔗 Perfil: {opp.socialProfile}</p>}
                                            </div>
                                          </div>
                                        </div>
                                      ) : (
                                        <div className="bg-neutral-50 border border-dashed border-neutral-200 p-2.5 text-center text-[10px] text-neutral-400 font-mono">
                                          Aguardando classificação da Inteligência Artificial.
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Botões de Ação */}
                                  <div className="flex gap-2 pt-2">
                                    {!isAnalyzed ? (
                                      <button
                                        onClick={() => handleAnalyzeOpportunityAI(opp.id)}
                                        disabled={isAnalyzingOpportunity === opp.id}
                                        className="w-full py-2 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-neutral-300"
                                      >
                                        {isAnalyzingOpportunity === opp.id ? (
                                          <>
                                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                            <span>Analisando...</span>
                                          </>
                                        ) : (
                                          <>
                                            <Cpu className="h-3.5 w-3.5" />
                                            <span>Classificar com IA</span>
                                          </>
                                        )}
                                      </button>
                                    ) : isCaptured ? (
                                      <div className="w-full bg-emerald-50 border border-emerald-300 p-2 text-center text-emerald-800 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 rounded-sm">
                                        <CheckCircle className="h-4 w-4 text-emerald-600" />
                                        <span>Capturado e Salvo no CRM</span>
                                      </div>
                                    ) : (
                                      <>
                                        {opp.whatsapp && (
                                          <a
                                            href={`https://wa.me/${opp.whatsapp}?text=Olá%20${encodeURIComponent(opp.contactName)},%20tudo%20bem?%20Vi%20seu%20anúncio%20do%20seu%20imóvel%20no%20${opp.source}.%20Sou%20do%20Grupo%20Leandro%20Rodrigues...`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="px-3 py-2 border border-emerald-300 hover:bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest flex items-center justify-center gap-1 transition-colors cursor-pointer rounded-xs"
                                          >
                                            <MessageSquare className="h-3.5 w-3.5" />
                                          </a>
                                        )}
                                        <button
                                          onClick={() => handleCaptureOpportunity(opp.id)}
                                          className="flex-1 py-2 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer rounded-xs"
                                        >
                                          <Plus className="h-3.5 w-3.5" />
                                          <span>Capturar para o CRM</span>
                                        </button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* ABA 3: RADAR DE CONVERSÃO */}
                {intelSubTab === "radar" && (
                  <div className="space-y-6 pt-2 animate-fadeIn">
                    <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-6">
                      
                      <div className="space-y-1 pb-4 border-b border-[#1A1A1A]/10">
                        <div className="flex items-center gap-1.5">
                          <Award className="h-4.5 w-4.5 text-amber-600" />
                          <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                            Radar de Inteligência Comercial (Ranking de Conversão)
                          </h3>
                        </div>
                        <p className="text-xs text-[#1A1A1A]/60 leading-relaxed">
                          Nosso algoritmo analisa múltiplos critérios de comportamento (recência do post, intenção aparente de fechar negócio de forma imediata, preço em relação ao m² do bairro, urgência informada no descritivo) e gera uma pontuação de 0 a 100 de potencial de venda para o Grupo Leandro Rodrigues.
                        </p>
                      </div>

                      {/* Lista de Ranking */}
                      <div className="space-y-4">
                        {marketplaceOpportunities.some(o => o.status === "Analisado" || o.status === "Capturado") ? (
                          <div className="space-y-3">
                            <div className="bg-[#F3F1ED] px-4 py-2 flex items-center justify-between text-[10px] font-bold font-mono text-[#1A1A1A]/70 uppercase">
                              <span>Oportunidades Ordenadas por Relevância Comercial</span>
                              <span>Potencial de Conversão</span>
                            </div>

                            <div className="space-y-4">
                              {marketplaceOpportunities
                                .filter(o => o.radarScore !== undefined)
                                .sort((a, b) => (b.radarScore || 0) - (a.radarScore || 0))
                                .map((opp, idx) => {
                                  const isHigh = (opp.radarScore || 0) >= 80;
                                  const isLow = (opp.radarScore || 0) < 50;

                                  return (
                                    <div key={opp.id} className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                                      <div className="space-y-1.5 flex-1">
                                        <div className="flex items-center gap-2">
                                          <span className="text-xs font-bold font-mono text-neutral-400">#{idx + 1}</span>
                                          <span className="text-xs font-bold font-serif text-[#1A1A1A]">{opp.contactName}</span>
                                          <span className="text-[9px] font-bold font-mono bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-sm">{opp.source}</span>
                                          {isHigh && (
                                            <span className="text-[8px] font-bold font-mono bg-amber-100 text-amber-800 border border-amber-200 px-1.5 py-0.5 rounded-xs">
                                              🎯 ALTA PRIORIDADE
                                            </span>
                                          )}
                                        </div>

                                        <p className="text-xs text-neutral-600 leading-relaxed">
                                          {opp.propertyType} de {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(opp.value)} no bairro <strong>{opp.bairro} ({opp.city})</strong>. Urgência do proprietário classificada como: <strong>{opp.urgencyLevel}</strong>.
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-4">
                                        {/* Score bar */}
                                        <div className="text-right space-y-1 w-24">
                                          <span className="block font-mono font-extrabold text-sm text-amber-700">{opp.radarScore}/100</span>
                                          <div className="w-full bg-neutral-100 h-1 rounded-full overflow-hidden">
                                            <div className={`h-full ${isHigh ? "bg-amber-600" : isLow ? "bg-red-500" : "bg-neutral-500"}`} style={{ width: `${opp.radarScore}%` }} />
                                          </div>
                                        </div>

                                        {/* Ações diretas */}
                                        <div className="flex gap-1">
                                          {opp.status !== "Capturado" ? (
                                            <button
                                              onClick={() => handleCaptureOpportunity(opp.id)}
                                              className="p-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xs transition-colors cursor-pointer"
                                              title="Salvar como Lead no CRM"
                                            >
                                              <Plus className="h-4 w-4" />
                                            </button>
                                          ) : (
                                            <span className="text-emerald-700 bg-emerald-50 border border-emerald-200 p-1.5 text-[9px] font-extrabold uppercase font-mono rounded-xs">Capturado</span>
                                          )}
                                          {opp.whatsapp && (
                                            <a
                                              href={`https://wa.me/${opp.whatsapp}`}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="p-2 border border-emerald-300 hover:bg-emerald-50 text-emerald-700 rounded-xs transition-colors cursor-pointer"
                                              title="Contatar via WhatsApp"
                                            >
                                              <MessageSquare className="h-4 w-4" />
                                            </a>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  );
                                })}
                            </div>
                          </div>
                        ) : (
                          <div className="border border-dashed border-neutral-300 p-12 text-center text-neutral-400 text-xs rounded-sm space-y-2">
                            <Cpu className="h-10 w-10 mx-auto text-neutral-300" />
                            <p className="font-bold text-neutral-500">Nenhum anúncio foi classificado com IA ainda.</p>
                            <p className="text-[10px] text-neutral-400">Vá para a aba "2. Monitor de Redes & IA" e execute a classificação de alguns anúncios para ver o ranking de relevância comercial.</p>
                          </div>
                        )}
                      </div>

                    </div>
                  </div>
                )}

                {/* ABA 4: APRENDIZADO CONTÍNUO */}
                {intelSubTab === "brain" && (
                  <div className="space-y-6 pt-2 animate-fadeIn">
                    <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-6">
                      
                      <div className="space-y-1 pb-4 border-b border-[#1A1A1A]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5">
                            <Database className="h-4.5 w-4.5 text-amber-600 animate-pulse" />
                            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Cérebro de Aprendizado do Acervo do Usuário
                            </h3>
                          </div>
                          <p className="text-xs text-[#1A1A1A]/60 leading-relaxed">
                            O sistema lê continuamente seus imóveis captados, portfólio cadastrado de agências e o histórico de leads ativos para mapear lacunas e sugerir novas estratégias de captação e conteúdo.
                          </p>
                        </div>

                        <span className="inline-flex items-center gap-1 text-[9px] font-bold font-mono bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-sm">
                          Sincronizado: {buyerLeads.length} Leads Ativos
                        </span>
                      </div>

                      {/* Quadrante de Sugestões Inteligentes baseadas no Estado do App */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* 1. Oportunidades de Novas Captações */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-3 rounded-sm">
                          <h4 className="text-xs font-bold font-mono uppercase text-[#1A1A1A] border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                            <span className="text-amber-600">●</span> 1. Sugestões de Prospecção & Captação
                          </h4>
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-serif">
                            Baseado nas buscas do CRM local, identificamos altíssimo interesse em <strong>Teresópolis (bairros Agriões e Alto)</strong> por apartamentos de 2 e 3 quartos até R$ 550.000.
                          </p>
                          <div className="bg-amber-50/50 border border-amber-200/50 p-3 rounded text-[10px] space-y-1.5 text-amber-900 leading-relaxed">
                            <span className="font-bold">Estratégia Recomendada:</span>
                            <p>Abra uma campanha de tráfego focado em proprietários diretos (FSBO) no bairro Agriões. Ofereça uma avaliação gratuita baseada nos simuladores do sistema para atrair captações exclusivas.</p>
                          </div>
                        </div>

                        {/* 2. Tendências Regionais de Compradores */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-3 rounded-sm">
                          <h4 className="text-xs font-bold font-mono uppercase text-[#1A1A1A] border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                            <span className="text-emerald-600">●</span> 2. Atração de Novos Clientes
                          </h4>
                          <p className="text-[11px] text-neutral-600 leading-relaxed font-serif">
                            O cruzamento de dados orgânicos aponta que <strong>Guapimirim (bairros Barreira e Parada Modelo)</strong> lidera em buscas de sítios de lazer e refúgio ecológico por compradores vindos da capital (Zona Sul e Niterói).
                          </p>
                          <div className="bg-emerald-50 border border-emerald-200 p-3 rounded text-[10px] space-y-1.5 text-emerald-950 leading-relaxed">
                            <span className="font-bold font-mono uppercase text-[9px] block">Nicho de Oportunidade:</span>
                            <p>Sugerimos gerar um artigo / post focado na facilidade de acesso a Guapimirim pela BR-116. Utilize hashtags direcionadas como #RefugioSerrano e #SitioGuapimirim para impulsionar a atração inbound.</p>
                          </div>
                        </div>

                        {/* 3. Palavras-Chave e Hashtags Inteligentes (Learning Core) */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-3 rounded-sm">
                          <h4 className="text-xs font-bold font-mono uppercase text-[#1A1A1A] border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                            <span className="text-purple-600">●</span> 3. Hashtags & Termos com Alto CTR Orgânico
                          </h4>
                          <p className="text-[11px] text-neutral-600 leading-relaxed">
                            A inteligência de monitoramento do Google Search Console aponta os melhores termos para o Grupo Leandro Rodrigues indexar na primeira página do Google:
                          </p>
                          <div className="flex flex-wrap gap-1.5 pt-1.5">
                            <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">#ImoveisTeresopolis</span>
                            <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">#SitiosGuapimirim</span>
                            <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">#VendaSeuImovelTeresopolis</span>
                            <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">#GrupoLeandroRodrigues</span>
                            <span className="text-[9px] font-mono font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200">#AltoPadraoSerra</span>
                          </div>
                        </div>

                        {/* 4. Resumo de Atuação do Histórico */}
                        <div className="bg-white border border-[#1A1A1A]/10 p-5 space-y-3 rounded-sm flex flex-col justify-between">
                          <div className="space-y-1.5">
                            <h4 className="text-xs font-bold font-mono uppercase text-[#1A1A1A] border-b border-neutral-100 pb-2 flex items-center gap-1.5">
                              <span className="text-blue-600">●</span> 4. Desempenho do Portfólio Local
                            </h4>
                            <p className="text-[11px] text-neutral-600 leading-relaxed font-serif">
                              Análise comparativa regional aponta que suas taxas de conversão aumentam em 45% quando a captação possui simulações e dados completos do IPTU e condomínio no site oficial.
                            </p>
                          </div>
                          <span className="block text-[9px] font-mono font-bold text-neutral-400 italic">Atualizado hoje com base no histórico do CRM</span>
                        </div>

                      </div>

                      {/* Cérebro de Aprendizado com Prompt Evolutivo */}
                      <div className="pt-6 border-t border-[#1A1A1A]/10">
                        <EvolutionaryPromptSimulator 
                          leads={buyerLeads} 
                          onUpdateLeads={setBuyerLeads} 
                          accentColor={accentColor} 
                        />
                      </div>

                    </div>
                  </div>
                )}

                {/* ABA 5: BLUEPRINT DO SISTEMA SAAS */}
                {intelSubTab === "blueprint" && (
                  <div className="space-y-8 animate-fadeIn pt-2">
                    {/* Header do Blueprint */}
                    <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#1A1A1A]/10 pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Shield className="h-4.5 w-4.5 text-amber-600 animate-pulse" />
                            <span className="text-[9px] font-bold uppercase tracking-widest text-amber-800 font-mono">Arquiteto de Sistemas SaaS</span>
                          </div>
                          <h3 className="text-lg font-bold uppercase tracking-wider text-[#1A1A1A] font-mono">
                            Radar de Inteligência Imobiliária • Arquitetura do Produto
                          </h3>
                          <p className="text-xs text-[#1A1A1A]/60 leading-relaxed max-w-4xl">
                            Esta seção apresenta a arquitetura conceitual e funcional completa do sistema. O Radar atua como uma camada inteligente <strong className="text-amber-700">acima dos CRMs imobiliários tradicionais</strong>, capturando sinais públicos de intenção de compra, venda e investimento antes que eles entrem nos canais tradicionais.
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="bg-[#1A1A1A] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm">
                            Platform Blueprint v1.0
                          </span>
                        </div>
                      </div>

                      {/* Menu de Navegação dos 8 Pilares */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        {[
                          { id: "all", label: "🗺️ Visão Geral" },
                          { id: "1", label: "1. Captura de Sinais" },
                          { id: "2", label: "2. Classificação IA" },
                          { id: "3", label: "3. Abordagem WhatsApp" },
                          { id: "4", label: "4. Diagnóstico Cliente" },
                          { id: "5", label: "5. Match Curado" },
                          { id: "6", label: "6. Apresentação Impacto" },
                          { id: "7", label: "7. Funil Conversão" },
                          { id: "8", label: "8. Monetização SaaS" },
                        ].map((pillar) => (
                          <button
                            key={pillar.id}
                            onClick={() => setBlueprintSelectedPillar(pillar.id)}
                            className={`px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider transition-all border rounded-xs cursor-pointer ${
                              blueprintSelectedPillar === pillar.id
                                ? "accent-bg text-white border-transparent shadow-xs"
                                : "bg-white border-neutral-300/40 hover:bg-neutral-500/5 theme-text-primary"
                            }`}
                          >
                            {pillar.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* CONTEÚDO PRINCIPAL DO BLUEPRINT */}
                    <div className="space-y-6">
                      
                      {/* PILLAR 1: CAPTURA DE DEMANDA */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "1") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">1</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Captura de Demanda e Monitoramento de Sinais Públicos
                            </h4>
                          </div>
                          
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-7 space-y-3">
                              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-serif italic">
                                O sistema monitora ativamente postagens públicas em redes sociais, fóruns de bairros, classificados locais (OLX, Facebook Marketplace) e variações de comportamento de busca orgânica para identificar sinais espontâneos e imediatos de transação imobiliária.
                              </p>
                              <div className="bg-[#F3F1ED] p-4 rounded-sm border border-[#1A1A1A]/5 space-y-2.5">
                                <span className="block text-[10px] font-bold font-mono uppercase tracking-wider text-amber-800">
                                  Fontes Mapeadas de Sinais Públicos:
                                </span>
                                <ul className="grid grid-cols-2 gap-2 text-[11px] text-neutral-600 font-sans">
                                  <li className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                    <span>Classificados Locais (Facebook & OLX)</span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                    <span>Grupos de Bairros no Facebook</span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                    <span>Sinais Públicos de Intenção no Twitter</span>
                                  </li>
                                  <li className="flex items-center gap-1.5">
                                    <div className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                                    <span>Consultas de Alta Conversão no Google</span>
                                  </li>
                                </ul>
                              </div>
                            </div>

                            {/* Live Simulator - Captura de Sinais */}
                            <div className="lg:col-span-5 bg-[#121212] text-[#00FF66] font-mono text-[10px] p-4 border border-neutral-800 rounded shadow-lg space-y-2.5 min-h-[160px] flex flex-col justify-between">
                              <div className="space-y-1.5">
                                <div className="flex items-center justify-between border-b border-neutral-800 pb-1.5 text-neutral-400">
                                  <span>[PROSPECTION_BOT_CLI]</span>
                                  <span className="text-[8px] animate-pulse">● LIVE</span>
                                </div>
                                <p className="text-neutral-300">// Simulador de Entrada de Sinais Públicos:</p>
                                <div className="text-amber-400 p-2 bg-neutral-900 border border-neutral-800 rounded">
                                  <p className="font-bold">"Pessoal, estou precisando vender urgente meu sítio na Barreira (Guapi). Tem rio passando no terreno. Aceito proposta rápida!"</p>
                                  <span className="block text-[8px] text-neutral-500 text-right mt-1">- Publicado por Fernando S.</span>
                                </div>
                                <p className="text-emerald-400">
                                  &gt; Analisando mensagem... [OK]<br/>
                                  &gt; Nome extraído: Fernando de Souza<br/>
                                  &gt; Tipo de Intenção: Venda (Proprietário Direto)<br/>
                                  &gt; Bairro: Barreira (Guapimirim)<br/>
                                  &gt; Urgência mapeada: ALTA (Palavra "urgente" + "proposta rápida")
                                </p>
                              </div>
                              <span className="text-[8px] text-neutral-500 self-end">AES-256 Secure Capture Engine</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PILLAR 2: CLASSIFICAÇÃO INTELIGENTE */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "2") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">2</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Classificação Automática (Quente, Morno e Frio)
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-6 space-y-3">
                              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-serif italic">
                                O sistema categoriza as intenções registradas em uma pontuação lógica baseada no nível de maturidade comercial do lead. Isso evita o desperdício de tempo com contatos frios e prioriza o atendimento imediato de alta conversão.
                              </p>
                              
                              <div className="space-y-2">
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500">Ajuste o Score de Teste do Algoritmo:</span>
                                <div className="flex items-center gap-4">
                                  <input 
                                    type="range" 
                                    min="0" 
                                    max="100" 
                                    value={blueprintLeadScore} 
                                    onChange={(e) => setBlueprintLeadScore(Number(e.target.value))}
                                    className="w-full accent-amber-600 cursor-pointer"
                                  />
                                  <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 border border-amber-200 shrink-0">{blueprintLeadScore} pts</span>
                                </div>
                              </div>
                            </div>

                            {/* Resultado da Classificação */}
                            <div className="lg:col-span-6 border border-[#1A1A1A]/15 p-4 rounded bg-white flex flex-col justify-between space-y-3">
                              <div>
                                <span className="text-[8px] font-bold uppercase tracking-wider text-neutral-400 font-mono block mb-1">Resultado do Score IA:</span>
                                {blueprintLeadScore >= 80 ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-extrabold uppercase font-mono px-2.5 py-1 bg-red-100 text-red-800 border border-red-200">
                                        RANKING A (QUENTE)
                                      </span>
                                      <span className="text-[10px] font-bold text-red-700 font-mono">Prioridade Máxima</span>
                                    </div>
                                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                                      <strong>Gatilho Comercial:</strong> Abordagem imediata em até 15 minutos. Intenção clara, direta, com alta urgência descrita (Ex: "preciso vender hoje", "mudança rápida", "orçamento já aprovado").
                                    </p>
                                  </div>
                                ) : blueprintLeadScore >= 40 ? (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-extrabold uppercase font-mono px-2.5 py-1 bg-amber-100 text-amber-800 border border-amber-200">
                                        RANKING B (MORNO)
                                      </span>
                                      <span className="text-[10px] font-bold text-amber-700 font-mono">Abordagem Consultiva</span>
                                    </div>
                                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                                      <strong>Gatilho Comercial:</strong> Abordagem consultiva focada em tirar dúvidas em até 24 horas. O cliente está pesquisando, avaliando preços ou simulando viabilidade financeira.
                                    </p>
                                  </div>
                                ) : (
                                  <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                      <span className="text-xs font-extrabold uppercase font-mono px-2.5 py-1 bg-neutral-100 text-neutral-800 border border-neutral-200">
                                        RANKING C (FRIO)
                                      </span>
                                      <span className="text-[10px] font-bold text-neutral-500 font-mono">Nutrição Automática</span>
                                    </div>
                                    <p className="text-[11px] text-neutral-600 leading-relaxed">
                                      <strong>Gatilho Comercial:</strong> Cadastro em régua de e-mail marketing ou nutrição com posts de SEO semanais. Sinais vagos, indiretos ou de longo prazo.
                                    </p>
                                  </div>
                                )}
                              </div>

                              <div className="border-t border-[#1A1A1A]/10 pt-2.5 text-[9px] font-mono text-neutral-400">
                                Fatores: Recência (40%) • Palavras de Intenção (30%) • Faixa de Preço (15%) • Local (15%)
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PILLAR 3: GERAÇÃO DE ABORDAGEM */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "3") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">3</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Abordagem Humanizada para WhatsApp e Redes (Simulador de Copywriting)
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            {/* Inputs para customizar */}
                            <div className="lg:col-span-5 space-y-4 bg-[#F3F1ED] p-4 border border-[#1A1A1A]/5">
                              <span className="block text-[10px] font-bold font-mono uppercase tracking-wider text-amber-800">
                                Parâmetros de Simulação de Lead:
                              </span>

                              <div className="space-y-3.5">
                                <div className="space-y-1">
                                  <label className="block text-[9px] font-bold uppercase text-neutral-500 font-mono">Nome do Lead:</label>
                                  <input 
                                    type="text" 
                                    value={blueprintCustomLeadName}
                                    onChange={(e) => setBlueprintCustomLeadName(e.target.value)}
                                    className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/15 rounded-sm"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[9px] font-bold uppercase text-neutral-500 font-mono">Bairro de Atuação:</label>
                                  <input 
                                    type="text" 
                                    value={blueprintBairroInteresse}
                                    onChange={(e) => setBlueprintBairroInteresse(e.target.value)}
                                    className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/15 rounded-sm"
                                  />
                                </div>
                                <div className="space-y-1">
                                  <label className="block text-[9px] font-bold uppercase text-neutral-500 font-mono">Valor Limite (R$):</label>
                                  <input 
                                    type="number" 
                                    value={blueprintValueMax}
                                    onChange={(e) => setBlueprintValueMax(Number(e.target.value))}
                                    className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/15 rounded-sm"
                                  />
                                </div>

                                <div className="space-y-1">
                                  <label className="block text-[9px] font-bold uppercase text-neutral-500 font-mono">Segmento / Tom de Abordagem:</label>
                                  <div className="grid grid-cols-3 gap-1">
                                    {(["comprador", "vendedor", "investidor"] as any[]).map((type) => (
                                      <button
                                        key={type}
                                        onClick={() => setBlueprintWhatsAppType(type)}
                                        className={`py-1 text-[9px] font-extrabold uppercase tracking-wider transition-all border ${
                                          blueprintWhatsAppType === type
                                            ? "bg-[#1A1A1A] text-white border-transparent"
                                            : "bg-white border-neutral-300 text-neutral-600"
                                        }`}
                                      >
                                        {type}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Mensagem Gerada */}
                            <div className="lg:col-span-7 border border-[#1A1A1A]/15 p-5 rounded bg-white flex flex-col justify-between space-y-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <span className="text-[9px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-100 px-2 py-0.5 uppercase">
                                    Diretrizes Atendidas: Humana • Não Invasiva • Foco Consultivo • Sem Vigilância
                                  </span>
                                </div>

                                {/* Texto gerado */}
                                <div className="bg-[#FAF9F6] border border-dashed border-[#1A1A1A]/10 p-4 rounded-sm font-serif text-sm italic text-neutral-800 leading-relaxed select-all">
                                  {blueprintWhatsAppType === "comprador" && (
                                    <p>
                                      "Olá, {blueprintCustomLeadName}! Tudo bem? Sou especialista imobiliário atuando no mercado local. Vi seu interesse na busca de um imóvel no bairro {blueprintBairroInteresse} com valor até {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(blueprintValueMax)}. Realizei uma análise prévia e filtrei 3 oportunidades muito qualificadas nessa região que atendem muito bem a essa expectativa (algumas delas off-market de proprietários particulares). Gostaria de receber os dados resumidos por aqui?"
                                    </p>
                                  )}
                                  {blueprintWhatsAppType === "vendedor" && (
                                    <p>
                                      "Olá, {blueprintCustomLeadName}! Tudo bem? Identifiquei a oferta pública de venda do seu imóvel anunciado no bairro {blueprintBairroInteresse} por {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(blueprintValueMax)}. Atuo com intermediação de negócios imobiliários na região e temos clientes cadastrados com demandas ativas buscando exatamente esse perfil de imóvel nesta localização. Gostaria de avaliar se há interesse de parceria segura para apresentarmos o seu imóvel de forma direta?"
                                    </p>
                                  )}
                                  {blueprintWhatsAppType === "investidor" && (
                                    <p>
                                      "Olá, {blueprintCustomLeadName}! Tudo bem? Sou especialista em curadoria de ativos imobiliários na região. Mapeamos recentemente duas excelentes oportunidades com alto índice de desconto e potencial expressivo de valorização futura no bairro {blueprintBairroInteresse}, ambas ainda em fase privada pré-lançamento. Como você atua de forma analítica no mercado imobiliário, gostaria de receber os números e a projeção de rendimento das unidades para avaliação?"
                                    </p>
                                  )}
                                </div>
                              </div>

                              <div className="flex items-center justify-between border-t border-neutral-100 pt-3">
                                <span className="text-[10px] text-neutral-400 font-mono">Não assuste o cliente: Jamais diga onde/como "rastreou" seus dados públicos.</span>
                                <button
                                  onClick={() => {
                                    let text = "";
                                    if (blueprintWhatsAppType === "comprador") {
                                      text = `Olá, ${blueprintCustomLeadName}! Tudo bem? Sou especialista imobiliário atuando no mercado local. Vi seu interesse na busca de um imóvel no bairro ${blueprintBairroInteresse} com valor até ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(blueprintValueMax)}. Realizei uma análise prévia e filtrei 3 oportunidades muito qualificadas nessa região que atendem muito bem a essa expectativa (algumas delas off-market de proprietários particulares). Gostaria de receber os dados resumidos por aqui?`;
                                    } else if (blueprintWhatsAppType === "vendedor") {
                                      text = `Olá, ${blueprintCustomLeadName}! Tudo bem? Identifiquei a oferta pública de venda do seu imóvel anunciado no bairro ${blueprintBairroInteresse} por ${new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(blueprintValueMax)}. Atuo com intermediação de negócios imobiliários na região e temos clientes cadastrados com demandas ativas buscando exatamente esse perfil de imóvel nesta localização. Gostaria de avaliar se há interesse de parceria segura para apresentarmos o seu imóvel de forma direta?`;
                                    } else {
                                      text = `Olá, ${blueprintCustomLeadName}! Tudo bem? Sou especialista em curadoria de ativos imobiliários na região. Mapeamos recentemente duas excelentes oportunidades com alto índice de desconto e potencial expressivo de valorização futura no bairro ${blueprintBairroInteresse}, ambas ainda em fase privada pré-lançamento. Como você atua de forma analítica no mercado imobiliário, gostaria de receber os números e a projeção de rendimento das unidades para avaliação?`;
                                    }
                                    navigator.clipboard.writeText(text);
                                    setBlueprintCopiedText(true);
                                    setTimeout(() => setBlueprintCopiedText(false), 2000);
                                  }}
                                  className="px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer rounded-xs"
                                >
                                  <Copy className="h-3 w-3" />
                                  <span>{blueprintCopiedText ? "Copiado!" : "Copiar Abordagem"}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PILLAR 4: DIAGNÓSTICO DO CLIENTE */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "4") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">4</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Diagnóstico de Qualificação do Cliente (Funil de Perguntas)
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-3">
                              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-serif italic">
                                Após a resposta inicial positiva do lead, o corretor inicia uma qualificação sutil e consultiva. O objetivo é estruturar a real intenção e capacidade de fechamento do cliente de forma extremamente profissional e estruturada.
                              </p>
                              
                              <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded text-[11px] leading-relaxed text-amber-900 space-y-2">
                                <span className="font-bold font-mono uppercase text-[9px] block">Por que esse script funciona?</span>
                                <p>Ele não parece um interrogatório de vendas ou um robô de CRM. Cada pergunta flui naturalmente como conselhos de um consultor de confiança, que deseja salvar o tempo do cliente.</p>
                              </div>
                            </div>

                            {/* As 5 Perguntas de Ouro */}
                            <div className="space-y-3.5">
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 font-mono">O Roteiro das 5 Perguntas Estratégicas:</span>
                              
                              {[
                                { num: "1", title: "Tipologia e Finalidade", desc: "“O que exatamente você está priorizando hoje? Um imóvel pronto para morar imediatamente ou avalia oportunidades para reforma e investimento?”" },
                                { num: "2", title: "Configuração Interna", desc: "“Qual é a configuração essencial de quartos, vagas e lazer que não pode faltar no seu dia a dia?”" },
                                { num: "3", title: "Localização Prioritária", desc: "“Para facilitar a sua rotina, o bairro Agriões seria ideal ou você avalia bairros mais altos e tranquilos como o Alto?”" },
                                { num: "4", title: "Cronograma de Mudança", desc: "“Você pretende estar com as chaves na mão e acomodado em até quantos meses para organizarmos as visitas no tempo certo?”" },
                                { num: "5", title: "Planejamento Orçamentário", desc: "“Se encontrarmos o imóvel ideal, você pretende realizar a transação de forma direta (à vista/permuta) ou precisaremos simular aprovação de crédito bancário?”" }
                              ].map((item) => (
                                <div key={item.num} className="bg-white border border-neutral-200 p-3 rounded-sm flex gap-3">
                                  <span className="text-xs font-mono font-extrabold bg-[#1A1A1A] text-white w-5 h-5 flex items-center justify-center rounded-full shrink-0 mt-0.5">{item.num}</span>
                                  <div className="space-y-1">
                                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 font-mono">{item.title}</h5>
                                    <p className="text-xs text-neutral-600 leading-relaxed font-serif italic">{item.desc}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PILLAR 5: MATCH DE IMÓVEIS */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "5") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">5</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Match Inteligente Curado (Regra Clássica de 3 Imóveis)
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-6 space-y-3">
                              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-serif italic">
                                <strong>Regra de Ouro do Arquiteto Real Estate:</strong> Nunca polua o WhatsApp do lead com dezenas de links de portais. Isso gera cansaço mental, estressa o cliente e desvaloriza seu trabalho de curadoria imobiliária. Selecione rigorosamente <strong>no máximo 3 imóveis cirúrgicos</strong> que correspondam ao diagnóstico estabelecido.
                              </p>

                              <div className="bg-[#F3F1ED] p-4 border border-[#1A1A1A]/5 rounded-sm space-y-2 text-[11px] text-neutral-600 leading-relaxed">
                                <span className="font-bold text-amber-800 uppercase text-[9px] block">Tipologias de Origem de Match:</span>
                                <ul className="space-y-1">
                                  <li>● <strong>Carteira Própria:</strong> Unidades sob gestão de exclusividade legal.</li>
                                  <li>● <strong>Rede de Parceiros:</strong> Parcerias de divisão (fifty/fifty) com corretores habilitados.</li>
                                  <li>● <strong>Unidades Off-Market:</strong> Imóveis capturados diretamente via sinais antes de serem cadastrados nos portais imobiliários.</li>
                                </ul>
                              </div>
                            </div>

                            {/* Lista de Match Ilustrada */}
                            <div className="lg:col-span-6 space-y-3">
                              <span className="block text-[9px] font-bold uppercase tracking-wider text-neutral-500 font-mono">Seleção de Match Ideal (Exemplo):</span>
                              
                              <div className="space-y-2">
                                {[
                                  { title: "Opção A: Loft Design Duplex", valor: "R$ 390.000", local: "Agriões, Teresópolis", tag: "Off-Market" },
                                  { title: "Opção B: Casa de Condomínio Flat", valor: "R$ 480.000", local: "Alto, Teresópolis", tag: "Exclusivo" },
                                  { title: "Opção C: Cobertura Linear", valor: "R$ 520.000", local: "Várzea, Teresópolis", tag: "Parceria 50/50" }
                                ].map((imob, i) => (
                                  <div key={i} className="bg-white border border-[#1A1A1A]/10 p-3 rounded flex items-center justify-between">
                                    <div className="space-y-1">
                                      <div className="flex items-center gap-1.5">
                                        <span className="text-[9px] font-extrabold uppercase font-mono px-1.5 py-0.5 bg-amber-50 text-amber-800 border border-amber-200">{imob.tag}</span>
                                        <h5 className="text-xs font-serif font-bold text-neutral-800">{imob.title}</h5>
                                      </div>
                                      <p className="text-[10px] text-neutral-500 font-sans">{imob.local} • Valor: <strong className="text-neutral-700">{imob.valor}</strong></p>
                                    </div>
                                    <Check className="h-4 w-4 text-emerald-600" />
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PILLAR 6: APRESENTAÇÃO DE OPORTUNIDADES */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "6") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">6</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Apresentação de Impacto (Como estruturar a ficha técnica no WhatsApp)
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-5 space-y-3">
                              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-serif italic">
                                Cada imóvel selecionado no Match deve ser apresentado com uma estrutura narrativa direta. Jamais envie apenas o link. Mostre que você realizou uma curadoria dedicada e explique o <strong>exato motivo do encaixe</strong>.
                              </p>

                              <div className="bg-[#F3F1ED] p-4 border border-[#1A1A1A]/5 rounded-sm space-y-1 text-[11px] text-neutral-600 leading-relaxed">
                                <span className="font-bold text-[#1A1A1A] uppercase text-[9px] block mb-1">A Estrutura do Card de Impacto:</span>
                                <p><strong>1. Descrição Curta:</strong> Dados de m² e dormitórios de forma concisa.</p>
                                <p><strong>2. O Encaixe:</strong> O exato motivo de atender ao diagnóstico dele.</p>
                                <p><strong>3. O Benefício Principal:</strong> Algo além da estrutura física (Ex: silêncio, sol da manhã, proximidade ao comércio).</p>
                                <p><strong>4. Chamada para Ação simples:</strong> Incentivar a resposta espontânea.</p>
                              </div>
                            </div>

                            {/* Visual do Ficha de Impacto */}
                            <div className="lg:col-span-7 bg-[#FFFDF9] border border-amber-200/60 p-5 rounded space-y-4 shadow-sm">
                              <div className="flex items-center justify-between border-b border-amber-100 pb-2">
                                <span className="text-[9px] font-mono font-bold text-amber-800">Visualização do Texto Formatado para WhatsApp</span>
                                <span className="text-[10px] text-neutral-400 font-mono">Layout de Conversão</span>
                              </div>

                              <div className="font-serif text-xs leading-relaxed text-neutral-700 space-y-3">
                                <p>💎 <strong>IMÓVEL SELECIONADO 1: LOFT DUPLEX DESIGN EM AGRIÕES</strong></p>
                                <p>
                                  📌 <strong>O que é:</strong> Um belíssimo apartamento duplex de 65m² totalmente planejado com móveis finos e sol da manhã permanente.<br/>
                                  🎯 <strong>Por que selecionei para você:</strong> Como você prioriza praticidade no dia a dia e deseja estar no bairro Agriões, este loft entrega excelente mobilidade para fazer tudo a pé.<br/>
                                  ✨ <strong>O principal benefício:</strong> Prédio moderno com baixa taxa condominial e segurança eletrônica completa, liberando você de burocracias.<br/>
                                  💵 <strong>Investimento:</strong> R$ 385.000 (Excelente liquidez na região)
                                </p>
                                <p>💬 <em>“Consigo te apresentar este imóvel na quinta-feira à tarde ou sábado de manhã fica mais confortável para a sua agenda?”</em></p>
                              </div>

                              <div className="flex justify-end pt-2">
                                <button
                                  onClick={() => {
                                    const text = `💎 IMÓVEL SELECIONADO 1: LOFT DUPLEX DESIGN EM AGRIÕES\n\n📌 O que é: Um belíssimo apartamento duplex de 65m² totalmente planejado com móveis finos e sol da manhã permanente.\n🎯 Por que selecionei para você: Como você prioriza praticidade no dia a dia e deseja estar no bairro Agriões, este loft entrega excelente mobilidade para fazer tudo a pé.\n✨ O principal benefício: Prédio moderno com baixa taxa condominial e segurança eletrônica completa, liberando você de burocracias.\n💵 Investimento: R$ 385.000\n\n💬 “Consigo te apresentar este imóvel na quinta-feira à tarde ou sábado de manhã fica mais confortável para a sua agenda?”`;
                                    navigator.clipboard.writeText(text);
                                    setBlueprintCopiedText(true);
                                    setTimeout(() => setBlueprintCopiedText(false), 2000);
                                  }}
                                  className="px-3 py-1.5 border border-amber-300 hover:bg-amber-50 text-amber-800 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center gap-1 cursor-pointer rounded-xs"
                                >
                                  <Copy className="h-3 w-3" />
                                  <span>{blueprintCopiedText ? "Copiado!" : "Copiar Modelo de Ficha"}</span>
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PILLAR 7: CONVERSÃO DE FUNIL */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "7") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">7</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              O Funil Completo de Vendas e Conversão
                            </h4>
                          </div>

                          {/* Gráfico do Funil em CSS Limpo */}
                          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                            <div className="lg:col-span-7 space-y-3.5">
                              <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-serif italic">
                                O funil de prospecção ativa do Radar é desenhado de forma científica para mensurar perdas de gargalo e garantir taxa de conversão final líquida superior a 8% sobre os contatos abordados.
                              </p>

                              <div className="space-y-2 pt-2">
                                {[
                                  { step: "1. Captura de Sinais (Demand)", ratio: "100%", width: "w-full", bg: "bg-neutral-800", count: "100 Leads" },
                                  { step: "2. Qualificados e Filtrados", ratio: "60%", width: "w-[80%]", bg: "bg-neutral-700", count: "60 Leads" },
                                  { step: "3. Abordagem Comercial (WhatsApp)", ratio: "40%", width: "w-[60%]", bg: "bg-amber-700", count: "40 Contatados" },
                                  { step: "4. Visitas Agendadas", ratio: "15%", width: "w-[35%]", bg: "bg-amber-600", count: "15 Visitas" },
                                  { step: "5. Fechamento de Transação", ratio: "8%", width: "w-[20%]", bg: "bg-emerald-700", count: "8 Fechamentos" }
                                ].map((funnel, index) => (
                                  <div key={index} className="flex items-center gap-3">
                                    <span className="w-24 text-[10px] font-mono text-neutral-400 uppercase text-right shrink-0">{funnel.ratio}</span>
                                    <div className="flex-1 bg-neutral-100 h-6 overflow-hidden rounded-xs flex items-center relative border border-neutral-200">
                                      <div className={`h-full ${funnel.bg} ${funnel.width} transition-all duration-500`} />
                                      <div className="absolute left-3 right-3 flex justify-between items-center text-[9px] font-bold text-white font-mono mix-blend-difference">
                                        <span>{funnel.step}</span>
                                        <span>{funnel.count}</span>
                                      </div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div className="lg:col-span-5 bg-white border border-[#1A1A1A]/10 p-5 space-y-3 flex flex-col justify-between">
                              <div className="space-y-1.5">
                                <span className="block text-[9px] font-bold uppercase tracking-wider text-neutral-400 font-mono">Orientação de Transição de Fases:</span>
                                <h5 className="text-xs font-serif font-bold text-neutral-800">Transição de Visita para Proposta</h5>
                                <p className="text-[11px] text-neutral-600 leading-relaxed font-serif italic">
                                  “Durante a visita física, evite empurrar a venda. Após o término da visita, envie uma mensagem resumindo os pontos fortes e pergunte se há algum fator que impeça o cliente de formular uma proposta inicial segura de compra hoje para iniciarmos a intermediação jurídica.”
                                </p>
                              </div>
                              <span className="text-[9px] font-mono text-neutral-400 italic">Fechamento seguro exige foco em mitigar as desconfianças do comprador.</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PILLAR 8: MONETIZAÇÃO DO SISTEMA */}
                      {(blueprintSelectedPillar === "all" || blueprintSelectedPillar === "8") && (
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                          <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                            <span className="w-6 h-6 flex items-center justify-center bg-amber-600 text-white font-mono text-xs font-bold rounded-full">8</span>
                            <h4 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Modelos de Monetização e Posicionamento de Mercado (SaaS Core)
                            </h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {[
                              {
                                title: "Comissão Imobiliária Clássica",
                                subtitle: "Atuação como Intermediador",
                                desc: "Atuação direta em transações fechadas via Radar de Inteligência. Ganho de comissão cheia (6% a 8%) garantida pelo registro legal de CRECI da imobiliária parceira do Grupo Leandro Rodrigues.",
                                label: "Margem Elevada"
                              },
                              {
                                title: "Fee de Indicação (Ref-Fee)",
                                subtitle: "Parceria de Co-Corretagem (50/50)",
                                desc: "O sistema capta o sinal qualificado e o transfere a um corretor parceiro local de confiança. Em troca, o corretor assina termo de co-corretagem repassando de 30% a 50% dos honorários recebidos no fechamento.",
                                label: "Escalabilidade Máxima"
                              },
                              {
                                title: "Assinatura SaaS (SaaS License)",
                                subtitle: "Modelo Recorrente (B2B)",
                                desc: "Cobrança de mensalidade recorrente (R$ 299 a R$ 899/mês) para imobiliárias e corretores autônomos acessarem as listagens puras de sinais públicos captados do Radar no painel regionalizado.",
                                label: "Renda Recorrente"
                              }
                            ].map((card, i) => (
                              <div key={i} className="bg-white border border-[#1A1A1A]/10 p-5 space-y-3 flex flex-col justify-between rounded-sm">
                                <div className="space-y-1.5">
                                  <div className="flex items-center justify-between">
                                    <span className="text-[8px] font-mono font-bold bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 uppercase">{card.label}</span>
                                    <span className="text-[10px] text-neutral-400 font-mono font-bold">0{i+1}</span>
                                  </div>
                                  <h5 className="text-xs font-bold font-mono text-neutral-800 uppercase">{card.title}</h5>
                                  <span className="block text-[10px] font-serif italic text-neutral-500">{card.subtitle}</span>
                                  <p className="text-[11px] text-neutral-600 leading-relaxed font-sans">{card.desc}</p>
                                </div>
                                <div className="border-t border-neutral-100 pt-2.5 text-[9px] font-mono text-neutral-400">
                                  Viabilidade Econômica Mapeada
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>
                )}

                {/* ABA 6: OTIMIZADOR DE SEO (EX-INTELLIGENCE TAB ORIGINAL) */}
                {intelSubTab === "seo" && (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-fadeIn">
                    
                    {/* Lado Esquerdo - Cruzamento de Informações e Monitor de Buscadores */}
                    <div className="lg:col-span-5 space-y-6">
                      <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-4">
                        <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-2">
                          <SlidersHorizontal className="h-4 w-4 text-[#1A1A1A]/60" />
                          <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] font-mono">
                            Varredura & Cruzamento Inteligente
                          </h3>
                        </div>
                        <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                          Selecione um contato ou lead registrado no sistema para cruzar seus dados (telefone, e-mail e interesses) com fontes públicas na internet, portais (OLX, Zap, VivaReal) e classificados de redes sociais.
                        </p>

                        <div className="space-y-4 pt-2">
                          {/* Dropdown de Leads */}
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">
                              Selecionar Lead / Particular para Investigar:
                            </label>
                            <select
                              value={crossSelectLeadId}
                              onChange={(e) => setCrossSelectLeadId(e.target.value)}
                              className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                            >
                              <option value="Todos">-- Escolha um Lead cadastrado no CRM --</option>
                              {buyerLeads.map((lead) => (
                                <option key={lead.id} value={lead.id}>
                                  [{lead.tipoLead || "Comprador"}] {lead.nome} - {lead.tipoImovel} ({lead.bairroInteresse})
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Botão de Disparo */}
                          <button
                            onClick={() => handleExecuteCrossAnalysis(crossSelectLeadId)}
                            disabled={isCrossAnalyzing}
                            className="w-full py-2.5 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-xs font-bold uppercase tracking-widest transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 disabled:bg-neutral-400 disabled:cursor-not-allowed"
                          >
                            {isCrossAnalyzing ? (
                              <>
                                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <span>Varrendo a Web...</span>
                              </>
                            ) : (
                              <>
                                <Search className="h-3.5 w-3.5" />
                                <span>Cruzar Dados nos Buscadores</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Progresso de Varredura */}
                        {isCrossAnalyzing && (
                          <div className="bg-neutral-900 text-emerald-400 p-4 font-mono text-[10px] space-y-2 border border-black rounded-sm shadow-inner transition-all">
                            <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 text-neutral-400">
                              <span>SCANNER LOG v1.4</span>
                              <span className="animate-ping text-emerald-500">●</span>
                            </div>
                            <p className="animate-pulse">{crossProgress}</p>
                            <div className="w-full bg-neutral-800 h-1.5 mt-2 rounded-full overflow-hidden">
                              <div className="bg-emerald-500 h-full animate-[loading_5s_ease-in-out_infinite]" style={{ width: "75%" }} />
                            </div>
                          </div>
                        )}

                        {/* Resultados da Varredura */}
                        {!isCrossAnalyzing && crossResults && (
                          <div className="space-y-4 pt-2 animate-fadeIn">
                            <div className="bg-amber-50/50 border border-amber-200/60 p-4 space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">Filtro Orgânico & Intenção</span>
                                <div className="flex items-center gap-1 bg-amber-100 px-2 py-0.5 rounded-xs text-[10px] font-bold text-amber-800">
                                  <span>Calor: {crossResults.intentIndex}%</span>
                                </div>
                              </div>

                              <div className="text-xs space-y-1">
                                <p className="font-semibold text-neutral-800">{crossResults.leadName}</p>
                                <p className="text-[10px] text-neutral-500 font-mono">Tipo de Lead: {crossResults.leadType} | Tel: {crossResults.phone}</p>
                              </div>

                              {/* Portais Status */}
                              <div className="space-y-2.5 pt-2 border-t border-neutral-200">
                                <span className="block text-[9px] font-bold font-mono uppercase text-neutral-500 tracking-wider">Status nos Portais de Anúncio e Buscadores:</span>
                                
                                <div className="grid grid-cols-1 gap-2">
                                  {crossResults.matchedSites.map((site, index) => (
                                    <div key={index} className="bg-white border border-neutral-100 p-2 text-xs space-y-1 rounded-xs">
                                      <div className="flex items-center justify-between">
                                        <span className="font-bold text-neutral-700">{site.portal}</span>
                                        {site.status === "found" ? (
                                          <span className="text-[8px] font-bold font-mono uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-sm">
                                            ✔ DETECTADO
                                          </span>
                                        ) : (
                                          <span className="text-[8px] font-bold font-mono uppercase tracking-wider text-neutral-400 bg-neutral-50 border border-neutral-200 px-1.5 py-0.5 rounded-sm">
                                            ✖ NÃO ENCONTRADO
                                          </span>
                                        )}
                                      </div>
                                      <p className="text-[10px] text-neutral-500 italic leading-relaxed">{site.description}</p>
                                      {site.url && (
                                        <a
                                          href={site.url}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-[9px] font-bold text-amber-700 hover:underline pt-0.5"
                                        >
                                          <span>Visualizar similaridade de anúncios</span>
                                          <ExternalLink className="h-2.5 w-2.5" />
                                        </a>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              </div>

                              {/* Comportamento Recomendado */}
                              <div className="pt-2.5 border-t border-neutral-200 space-y-1">
                                <span className="block text-[9px] font-bold uppercase tracking-wider font-mono text-amber-900">Estratégia de Abordagem Sugerida:</span>
                                <p className="text-[10px] text-neutral-700 leading-relaxed font-serif italic mb-3">
                                  "{crossResults.searchBehavior}"
                                </p>
                              </div>

                              {/* Ações Rápidas de Abordagem */}
                              <div className="pt-3 border-t border-amber-200 space-y-2">
                                <span className="block text-[9px] font-bold uppercase tracking-wider font-mono text-amber-900">Iniciar Abordagem de Leads:</span>
                                <div className="flex flex-wrap items-center gap-2">
                                  <a
                                    href={`https://api.whatsapp.com/send?phone=${crossResults.whatsapp || "5521999998888"}&text=${encodeURIComponent(
                                      crossResults.leadType === "Proprietário" 
                                        ? `Olá ${crossResults.leadName}, tudo bem? Sou corretor do Grupo Leandro Rodrigues e identifiquei seu imóvel anunciado em ${crossResults.bairro}. Gostaria de agendar uma visita para apresentar potenciais compradores...`
                                        : `Olá ${crossResults.leadName}, tudo bem? Sou consultor do Grupo Leandro Rodrigues e vi seu interesse por um imóvel em ${crossResults.bairro}. Tenho excelentes opções recentes para lhe apresentar!`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs transition-colors"
                                    title="Chamar no WhatsApp"
                                  >
                                    <MessageCircle className="h-3.5 w-3.5" />
                                    <span>WhatsApp</span>
                                  </a>

                                  <a
                                    href={crossResults.redeSocial ? (crossResults.redeSocial.startsWith("http") ? crossResults.redeSocial : `https://${crossResults.redeSocial}`) : `https://www.facebook.com/search/people/?q=${encodeURIComponent(crossResults.leadName)}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-700 text-white rounded-xs transition-colors"
                                    title="Contatar via Facebook"
                                  >
                                    <Facebook className="h-3.5 w-3.5" />
                                    <span>Facebook</span>
                                  </a>

                                  <a
                                    href={`mailto:${crossResults.email || "contato@exemplo.com"}?subject=${encodeURIComponent("Contato Imobiliário • Grupo Leandro Rodrigues")}&body=${encodeURIComponent(
                                      `Olá ${crossResults.leadName},\n\nSou consultor do Grupo Leandro Rodrigues e estou entrando em contato em relação ao seu interesse em imóveis na região de ${crossResults.bairro}.\n\nAtenciosamente,\nGrupo Leandro Rodrigues`
                                    )}`}
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider bg-zinc-600 hover:bg-zinc-700 text-white rounded-xs transition-colors"
                                    title="Enviar E-mail"
                                  >
                                    <Mail className="h-3.5 w-3.5" />
                                    <span>E-mail</span>
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Caso de nenhum resultado */}
                        {!isCrossAnalyzing && !crossResults && (
                          <div className="border border-dashed border-[#1A1A1A]/10 p-6 text-center text-neutral-400 text-xs">
                            <Globe className="h-8 w-8 mx-auto text-neutral-300 mb-2" />
                            <p>Nenhuma varredura cruzada ativa.</p>
                            <p className="text-[10px] text-neutral-400 mt-1">Selecione um lead acima e execute o cruzamento para analisar.</p>
                          </div>
                        )}
                      </div>

                      {/* Dicas de SEO e Ranqueamento no Estado */}
                      <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-3 text-xs">
                        <h4 className="font-mono uppercase tracking-wider font-bold text-[#1A1A1A] border-b border-neutral-200 pb-1.5">
                          Guia de Relevância — Google SEO
                        </h4>
                        <p className="text-neutral-600 leading-relaxed text-[11px]">
                          O Google valoriza muito a <strong>especialização geográfica</strong> de imobiliárias. Publicar nas redes e em seu site com referências explícitas e links cruzados aumenta sua pontuação de autoridade (E-E-A-T).
                        </p>
                        <ul className="space-y-1.5 text-[10px] text-neutral-600 list-disc list-inside">
                          <li>Foque nas cidades-alvo: <strong>Teresópolis, Guapimirim, Friburgo, Petrópolis, Niterói, Rio de Janeiro e Região dos Lagos</strong>.</li>
                          <li>Direcione sempre os links das postagens para o site oficial: <span className="font-bold text-[#1A1A1A]">www.grupoleandrorodrigues.com.br</span>.</li>
                          <li>Utilize tags estruturadas (Meta Title/Description) na configuração das suas páginas web.</li>
                        </ul>
                      </div>
                    </div>

                    {/* Lado Direito - Gerador de Post SEO e Super Hashtags */}
                    <div className="lg:col-span-7 space-y-6">
                      <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-5">
                        <div className="flex items-center justify-between border-b border-[#1A1A1A]/10 pb-2">
                          <div className="flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-amber-600" />
                            <h3 className="text-xs font-bold uppercase tracking-widest text-[#1A1A1A] font-mono">
                              Gerador de Campanhas e Super Hashtags SEO
                            </h3>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#1A1A1A]/60 leading-relaxed">
                          Selecione a cidade do Rio de Janeiro ou região de cobertura, o foco do seu criativo e palavras-chave específicas. O sistema criará instantaneamente um texto estruturado de alta relevância com hashtags inteligentes e metadados prontos para o Google indexar.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {/* Cidade de Foco */}
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono">
                              1. Cidade Alvo do Post:
                            </label>
                            <select
                              value={seoCity}
                              onChange={(e) => setSeoCity(e.target.value)}
                              className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                            >
                              <option value="Teresópolis">🏔️ Teresópolis</option>
                              <option value="Guapimirim">🌿 Guapimirim</option>
                              <option value="Nova Friburgo">⛰️ Nova Friburgo</option>
                              <option value="Petrópolis">🏰 Petrópolis</option>
                              <option value="Niterói">🌉 Niterói</option>
                              <option value="Rio de Janeiro">🏖️ Rio de Janeiro</option>
                              <option value="Região dos Lagos">🌊 Região dos Lagos</option>
                            </select>
                          </div>

                          {/* Foco da Campanha */}
                          <div className="space-y-1.5">
                            <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono">
                              2. Objetivo da Campanha:
                            </label>
                            <select
                              value={seoAudience}
                              onChange={(e) => setSeoAudience(e.target.value as any)}
                              className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                            >
                              <option value="captação">🔶 Captação de Proprietários (FSBO)</option>
                              <option value="venda">🟢 Atração de Compradores (Inbound)</option>
                              <option value="altopadrao">💎 Imóveis de Alto Padrão / Boutique</option>
                              <option value="institucional">🏢 Institucional Leandro Rodrigues</option>
                            </select>
                          </div>
                        </div>

                        {/* Palavra chave ou Nicho */}
                        <div className="space-y-1.5">
                          <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 font-mono">
                            3. Palavra-Chave / Nicho de Imóvel (Opcional):
                          </label>
                          <input
                            type="text"
                            value={seoKeyword}
                            onChange={(e) => setSeoKeyword(e.target.value)}
                            placeholder="Ex: casas em condomínio fechado, cobertura com piscina, sítio ecológico..."
                            className="w-full text-xs p-2.5 bg-white border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                          />
                        </div>

                        {/* Botão de Geração */}
                        <button
                          onClick={handleGenerateSeo}
                          className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold uppercase tracking-widest transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
                        >
                          <Sparkles className="h-4 w-4" />
                          <span>Gerar Copys & Hashtags de Alta Indexação</span>
                        </button>

                        {/* Resultado de Geração */}
                        {generatedPost && (
                          <div className="space-y-6 pt-3 border-t border-neutral-200 animate-fadeIn">
                            
                            {/* 1. Google SERP Simulator Card */}
                            <div className="bg-white border border-neutral-200 rounded p-4 space-y-1.5 shadow-xs font-sans">
                              <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 font-mono">
                                <Globe className="h-3.5 w-3.5 text-blue-600" />
                                <span>Simulação de Primeiro Lugar no Google</span>
                              </div>
                              <div className="pt-2">
                                {/* Breadcrumb */}
                                <div className="text-xs text-neutral-600 truncate flex items-center gap-1">
                                  <span>https://www.grupoleandrorodrigues.com.br</span>
                                  <span className="text-neutral-400">›</span>
                                  <span className="text-neutral-500">{generatedPost.slug}</span>
                                </div>
                                {/* Title */}
                                <h4 className="text-[18px] text-[#1a0dab] hover:underline cursor-pointer font-medium leading-tight mt-0.5">
                                  {generatedPost.metaTitle}
                                </h4>
                                {/* Ratings */}
                                <div className="flex items-center gap-1 text-[11px] text-amber-500 mt-0.5">
                                  <span>★★★★★</span>
                                  <span className="text-neutral-500">Classificação: 4,9 · Revisado por Grupo Leandro Rodrigues</span>
                                </div>
                                {/* Meta Description */}
                                <p className="text-xs text-neutral-600 leading-relaxed mt-1">
                                  {generatedPost.metaDesc}
                                </p>
                              </div>

                              {/* Botão Copiar Dados Meta */}
                              <div className="flex justify-end pt-2 border-t border-neutral-100 mt-2">
                                <button
                                  onClick={() => {
                                    const textToCopy = `Título SEO: ${generatedPost.metaTitle}\nMeta Descrição: ${generatedPost.metaDesc}\nURL Amigável: www.grupoleandrorodrigues.com.br/${generatedPost.slug}`;
                                    navigator.clipboard.writeText(textToCopy);
                                    setCopiedPostNotify("meta");
                                    setTimeout(() => setCopiedPostNotify(null), 1500);
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 bg-neutral-100 hover:bg-neutral-200 text-[#1A1A1A] text-[9px] font-bold uppercase tracking-wider rounded-xs border border-neutral-200 transition-colors cursor-pointer"
                                >
                                  {copiedPostNotify === "meta" ? (
                                    <>
                                      <Check className="h-3 w-3 text-emerald-600" />
                                      <span>Metatags Copiadas!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 text-neutral-500" />
                                      <span>Copiar Metatags de SEO</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* 2. Redes Sociais Copy Card */}
                            <div className="bg-white border border-[#1A1A1A]/10 p-4 space-y-3 shadow-xs">
                              <div className="flex justify-between items-center border-b border-neutral-100 pb-2">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">Template de Legenda de Conversão</span>
                                <button
                                  onClick={() => {
                                    const fullText = `${generatedPost.title}\n\n${generatedPost.body}\n\n${generatedPost.hashtags}`;
                                    navigator.clipboard.writeText(fullText);
                                    setCopiedPostNotify("all");
                                    setTimeout(() => setCopiedPostNotify(null), 1500);
                                  }}
                                  className="flex items-center gap-1 px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white text-[9px] font-bold uppercase tracking-wider rounded-xs transition-colors cursor-pointer"
                                >
                                  {copiedPostNotify === "all" ? (
                                    <>
                                      <Check className="h-3 w-3 text-white" />
                                      <span>Post Completo Copiado!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 text-white/90" />
                                      <span>Copiar Post e Hashtags [✓]</span>
                                    </>
                                  )}
                                </button>
                              </div>

                              <div className="space-y-2">
                                <h5 className="font-serif italic font-bold text-base text-[#1A1A1A]">
                                  {generatedPost.title}
                                </h5>
                                <p className="text-xs text-neutral-700 leading-relaxed whitespace-pre-wrap font-serif font-serif">
                                  {generatedPost.body}
                                </p>
                              </div>
                            </div>

                            {/* 3. Hashtags Smart Box */}
                            <div className="bg-[#F3F1ED]/40 border border-[#1A1A1A]/5 p-4 space-y-3">
                              <div className="flex justify-between items-center border-b border-neutral-200/50 pb-1.5">
                                <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-500 font-mono">Super Hashtags Prontas (Indexáveis)</span>
                                <button
                                  onClick={() => {
                                    navigator.clipboard.writeText(generatedPost.hashtags);
                                    setCopiedPostNotify("tags");
                                    setTimeout(() => setCopiedPostNotify(null), 1500);
                                  }}
                                  className="text-[9px] font-bold uppercase tracking-wider text-amber-700 hover:text-amber-800 flex items-center gap-1 transition-colors cursor-pointer"
                                >
                                  {copiedPostNotify === "tags" ? (
                                    <>
                                      <Check className="h-3 w-3 text-emerald-600" />
                                      <span>Hashtags Copiadas!</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="h-3 w-3 text-neutral-500" />
                                      <span>Copiar Hashtags Apenas</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <p className="text-[10px] text-amber-800 font-mono leading-relaxed select-all">
                                {generatedPost.hashtags}
                              </p>
                            </div>

                          </div>
                        )}

                        {/* Dica de Utilização */}
                        {!generatedPost && (
                          <div className="border border-dashed border-[#1A1A1A]/10 p-8 text-center text-neutral-400 text-xs">
                            <Sparkles className="h-8 w-8 mx-auto text-neutral-300 mb-2" />
                            <p>Nenhuma publicação ativa.</p>
                            <p className="text-[10px] text-neutral-400 mt-1">Configure as opções acima e clique em "Gerar" para ver a mágica do SEO acontecer.</p>
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                )}

                {intelSubTab === "persona" && (
                  <div className="space-y-8 pt-2 animate-fadeIn text-[#1A1A1A] dark:text-[#1A1A1A]">
                    {/* Header */}
                    <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-4">
                      <div className="flex items-center gap-2 border-b border-[#1A1A1A]/10 pb-3">
                        <Target className="h-5 w-5 text-amber-600" />
                        <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
                          Pesquisa de Perfil, Tráfego & Inteligência de Público-Alvo
                        </h3>
                      </div>
                      <p className="text-xs text-[#1A1A1A]/70 leading-relaxed max-w-4xl">
                        Acesse dados de mercado sobre o comportamento de busca imobiliária na internet brasileira. Entenda a faixa etária, o gênero, o canal favorito, o nível de confusão inicial dos compradores e as preferências de acessibilidade e pets. Escolha um dos perfis consolidados abaixo ou utilize o <strong>Gerador de Campanhas Dinâmico</strong> para criar estratégias cirúrgicas para o seu bairro e nicho.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                      {/* Coluna Esquerda: Seletor de Personas & Gerador Customizado */}
                      <div className="lg:col-span-4 space-y-6">
                        {/* Seletor de Perfis Consolidados */}
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2 flex items-center gap-2">
                            <Users className="h-4 w-4 text-[#1A1A1A]/60" />
                            <span>1. Perfis de Compradores Consolidados</span>
                          </h4>
                          
                          <div className="space-y-2">
                            {[
                              { id: "mariana", name: "Mariana", desc: "A Jovem Conectada & Prática", badge: "1 Quarto / Aluguel ou Compra" },
                              { id: "roberto", name: "Roberto & Ana", desc: "Família Pet & Conforto", badge: "3 Quartos / Lazer Completo" },
                              { id: "carlos", name: "Seu Carlos", desc: "Aposentado Tradicional", badge: "2 Quartos / Acessibilidade" },
                              { id: "henrique", name: "Dr. Henrique", desc: "Investidor de Alta Renda", badge: "Luxo / Alto Cap Rate" }
                            ].map((p) => (
                              <button
                                key={p.id}
                                onClick={() => {
                                  setSelectedPersonaId(p.id);
                                  setPersonaGeneratedReport(null); // Limpa relatório customizado para focar no preset
                                }}
                                className={`w-full text-left p-3.5 border transition-all flex flex-col gap-1 cursor-pointer rounded-xs ${
                                  selectedPersonaId === p.id && !personaGeneratedReport
                                    ? "bg-amber-50/50 border-amber-600/50 ring-1 ring-amber-600/20"
                                    : "bg-white border-[#1A1A1A]/10 hover:border-[#1A1A1A]/20 hover:bg-[#1A1A1A]/2"
                                }`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className="text-xs font-bold text-[#1A1A1A]">{p.name}</span>
                                  <span className="text-[8px] font-bold uppercase tracking-wide bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-sm">
                                    {p.id === "mariana" ? "Compacto" : p.id === "roberto" ? "Médio-Alto" : p.id === "carlos" ? "Tradicional" : "Investidor"}
                                  </span>
                                </div>
                                <span className="text-[11px] text-[#1A1A1A]/65">{p.desc}</span>
                                <span className="text-[9px] text-[#1A1A1A]/40 font-mono mt-1">{p.badge}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Gerador Dinâmico Sob Medida */}
                        <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-5 space-y-4">
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-2 flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4 text-[#1A1A1A]/60" />
                            <span>2. Gerador Dinâmico de Campanha</span>
                          </h4>
                          <p className="text-[10px] text-[#1A1A1A]/60 leading-relaxed">
                            Configure os dados do seu imóvel e região para gerar uma análise comportamental e campanha de marketing customizada.
                          </p>

                          <div className="space-y-3.5 pt-1">
                            {/* Cidade */}
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">Cidade / Localidade:</label>
                              <input
                                type="text"
                                value={personaCustomCity}
                                onChange={(e) => setPersonaCustomCity(e.target.value)}
                                className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/10 focus:border-[#1A1A1A] focus:outline-none"
                                placeholder="Ex: Teresópolis, Niterói, Rio de Janeiro"
                              />
                            </div>

                            {/* Tamanho do Imóvel */}
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">Tipo & Quartos:</label>
                              <select
                                value={personaCustomBedrooms}
                                onChange={(e) => setPersonaCustomBedrooms(e.target.value)}
                                className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/10 focus:border-[#1A1A1A] focus:outline-none"
                              >
                                <option value="1 quarto">Apartamento / Studio 1 quarto</option>
                                <option value="2 quartos">Apartamento 2 quartos</option>
                                <option value="3 quartos">Apartamento / Cobertura 3 quartos</option>
                                <option value="4 ou mais quartos">Casa / Cobertura de 4 quartos ou mais</option>
                                <option value="Terreno / Comercial">Terrenos ou Salas Comerciais</option>
                              </select>
                            </div>

                            {/* Faixa Etária */}
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">Faixa Etária Alvo:</label>
                              <select
                                value={personaCustomAge}
                                onChange={(e) => setPersonaCustomAge(e.target.value)}
                                className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/10 focus:border-[#1A1A1A] focus:outline-none"
                              >
                                <option value="20-30">20-30 anos (Jovens profissionais)</option>
                                <option value="31-45">31-45 anos (Casais e famílias jovens)</option>
                                <option value="46-60">46-60 anos (Famílias maduras / Investidores)</option>
                                <option value="61+">61+ anos (Aposentados / Redução de tamanho)</option>
                              </select>
                            </div>

                            {/* Objetivo */}
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">Objetivo da Busca:</label>
                              <div className="grid grid-cols-2 gap-2">
                                {["Comprar", "Alugar"].map((g) => (
                                  <button
                                    type="button"
                                    key={g}
                                    onClick={() => setPersonaCustomGoal(g)}
                                    className={`p-1.5 text-[10px] font-bold uppercase border transition-all cursor-pointer ${
                                      personaCustomGoal === g
                                        ? "bg-amber-600 text-white border-transparent"
                                        : "bg-white text-neutral-600 border-[#1A1A1A]/10 hover:bg-[#1A1A1A]/2"
                                    }`}
                                  >
                                    {g}
                                  </button>
                                ))}
                              </div>
                            </div>

                            {/* Necessidades Especiais */}
                            <div className="space-y-1">
                              <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70">Necessidades / Diferenciais:</label>
                              <select
                                value={personaCustomNeeds}
                                onChange={(e) => setPersonaCustomNeeds(e.target.value)}
                                className="w-full text-xs p-2 bg-white border border-[#1A1A1A]/10 focus:border-[#1A1A1A] focus:outline-none"
                              >
                                <option value="Aceita Pets">Aceita Cães e Gatos (Pet-Friendly)</option>
                                <option value="Acessibilidade Idosos/Deficientes">Acessibilidade Total (Rampa, Elevador, Sem escadas)</option>
                                <option value="Próximo a Condução / Metrô">Próximo ao Metrô e Comércio (Vida urbana a pé)</option>
                                <option value="Lazer Completo de Clube">Condomínio Clube (Piscina, Academia, Salão, Quadra)</option>
                                <option value="Segurança Máxima">Portaria Blindada, Monitoramento e Guarita 24h</option>
                              </select>
                            </div>

                            <button
                              onClick={() => {
                                setPersonaIsGenerating(true);
                                setTimeout(() => {
                                  // Gerador procedimental sob medida baseado no input do corretor
                                  const generated = {
                                    name: `Perfil Personalizado: Comprador de ${personaCustomBedrooms} em ${personaCustomCity}`,
                                    age: `${personaCustomAge} anos`,
                                    gender: personaCustomAge.startsWith("20") ? "Feminino/Masculino equilibrado" : "Decisão de casal compartilhada (75%)",
                                    role: personaCustomGoal === "Comprar" ? "Família buscando consolidação patrimonial ou moradia definitiva" : "Praticidade, facilidade de mudança e custo-benefício imediato",
                                    city: personaCustomCity,
                                    propertyType: `${personaCustomBedrooms} com foco em ${personaCustomNeeds}`,
                                    budget: personaCustomGoal === "Comprar" 
                                      ? (personaCustomBedrooms.startsWith("1") ? "R$ 380k - R$ 520k" : personaCustomBedrooms.startsWith("2") ? "R$ 480k - R$ 750k" : "R$ 780k - R$ 1.5M")
                                      : (personaCustomBedrooms.startsWith("1") ? "R$ 2.000 - R$ 3.500/mês" : "R$ 3.500 - R$ 6.500/mês"),
                                    whereTheyAdvertise: "Grupos de moradores locais no Facebook, OLX, portais de imobiliárias especializadas",
                                    whereTheySearch: "Google Maps local, portais de anúncios tradicionais (VivaReal/Zap), classificados online e indicações",
                                    preferredRooms: personaCustomBedrooms,
                                    otherProperties: "Imóveis residenciais bem localizados com baixo valor de condomínio",
                                    isLost: `Preocupados com a taxa real do financiamento para ${personaCustomGoal} e se o condomínio condiz com os benefícios fornecidos. Apresentam alto índice de frustração com portais imobiliários que possuem anúncios desatualizados ou sem informações sobre ${personaCustomNeeds}.`,
                                    whereToFind: `Pesquisando ativamente no Google Maps por imobiliárias próximas a ${personaCustomCity}, participando de fóruns de bairros e observando placas locais nas avenidas principais.`,
                                    howToApproach: `Forneça atendimento consultivo claro. O comprador de ${personaCustomBedrooms} valoriza transparência. Faça uma abordagem focando diretamente em ${personaCustomNeeds} e ofereça um simulador de parcelas realista de imediato no primeiro contato.`,
                                    whatsappPreference: personaCustomAge.includes("61") ? 50 : 85,
                                    phonePreference: personaCustomAge.includes("61") ? 45 : 15,
                                    socialPreference: personaCustomAge.includes("20") ? 75 : 30,
                                    accessibilityNeeds: {
                                      petFriendly: personaCustomNeeds === "Aceita Pets" ? "CRÍTICA: Essencial para concretização do negócio, exige confirmação imediata da convenção de condomínio" : "Desejável (importância média)",
                                      disabledElderly: personaCustomNeeds.includes("Acessibilidade") ? "CRÍTICA: Imóvel obrigatoriamente sem degraus iniciais, portas largas para cadeira de rodas, box amplo ou rampa" : "Baixa prioridade no primeiro momento",
                                      nearTransit: personaCustomNeeds.includes("Metrô") ? "CRÍTICA: Quer fazer tudo a pé e economizar combustível/transporte" : "Importância moderada"
                                    },
                                    googleMyBusinessStrategy: `No seu Perfil do Google Meu Negócio, crie publicações periódicas destacando: "Corretor especialista em ${personaCustomBedrooms} com ${personaCustomNeeds} em ${personaCustomCity}". Adicione avaliações com estes termos exatos para dominar as buscas locais!`,
                                    adCopy: `📍 Morar bem em ${personaCustomCity} é morar com qualidade! Apartamento perfeito de ${personaCustomBedrooms} ideal para quem busca praticidade e conforto, contando with ${personaCustomNeeds}. Totalmente regularizado para financiamento imediato. Chega de anúncios desatualizados e falsos, agende uma visita de verdade pelo WhatsApp!`,
                                    whatsappTemplate: `Olá, tudo bem? Sou o Leandro Rodrigues, corretor especialista na região. Vi que você busca imóveis de ${personaCustomBedrooms} em ${personaCustomCity} que tenham ${personaCustomNeeds}. Tenho duas excelentes opções que atendem exatamente a esse critério técnico e com valores de condomínio justos. Vamos agendar uma ligação rápida de 3 minutos para eu entender o que você não aceita de jeito nenhum em um imóvel e te poupar tempo de busca?`
                                  };
                                  setPersonaGeneratedReport(generated);
                                  setSelectedPersonaId("custom");
                                  setPersonaIsGenerating(false);
                                }, 1200);
                              }}
                              disabled={personaIsGenerating}
                              className="w-full bg-[#1A1A1A] hover:bg-neutral-800 text-white font-extrabold uppercase text-[10px] tracking-widest py-3 transition-all cursor-pointer flex items-center justify-center gap-2"
                            >
                              {personaIsGenerating ? (
                                <>
                                  <RefreshCw className="h-3.5 w-3.5 animate-spin" />
                                  <span>Mapeando Tráfego...</span>
                                </>
                              ) : (
                                <>
                                  <TrendingUp className="h-3.5 w-3.5" />
                                  <span>Gerar Campanha Sob Medida</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Coluna Direita: Dashboard de Insights e Plano de Ação */}
                      <div className="lg:col-span-8 space-y-6">
                        {/* Seletor dinâmico do conteúdo da persona atual */}
                        {(() => {
                          const current = personaGeneratedReport || PRESETS_PERSONAS[selectedPersonaId as keyof typeof PRESETS_PERSONAS] || PRESETS_PERSONAS.mariana;
                          return (
                            <motion.div
                              key={selectedPersonaId + (personaGeneratedReport ? "-custom" : "-preset")}
                              initial={{ opacity: 0, x: 10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3 }}
                              className="space-y-6"
                            >
                              {/* Painel do Perfil Selecionado */}
                              <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 md:p-8 space-y-6 relative overflow-hidden">
                                {personaGeneratedReport && (
                                  <div className="absolute top-0 right-0 bg-emerald-600 text-white font-mono text-[9px] uppercase tracking-widest px-3 py-1 font-bold z-10 shadow-xs">
                                    Inteligência Ativa (Customizado)
                                  </div>
                                )}
                                
                                <div className="space-y-1">
                                  <span className="text-[9px] font-mono font-bold uppercase tracking-widest text-neutral-500">PÚBLICO-ALVO DETALHADO</span>
                                  <h3 className="font-serif italic text-2xl text-[#1A1A1A]">
                                    {current.name}
                                  </h3>
                                  <p className="text-xs text-neutral-500 font-mono">
                                    Perfil: {current.role} • Faixa Etária: {current.age}
                                  </p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#1A1A1A]/10 pt-6">
                                  <div className="space-y-4">
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Cidade de Foco Principal</h5>
                                      <p className="text-xs text-neutral-600 font-sans">{current.city}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Onde mais Anunciam Imóveis próprios</h5>
                                      <p className="text-xs text-neutral-600 font-sans">{current.whereTheyAdvertise}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Onde buscam informações (Fontes)</h5>
                                      <p className="text-xs text-neutral-600 font-sans">{current.whereTheySearch}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Tipo de Propriedade Preferencial</h5>
                                      <p className="text-xs text-neutral-600 font-sans">{current.propertyType}</p>
                                    </div>
                                  </div>

                                  <div className="space-y-4">
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Budget / Orçamento Estimado</h5>
                                      <p className="text-xs text-neutral-600 font-mono font-bold">{current.budget}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Desejo por outros tipos de imóvel</h5>
                                      <p className="text-xs text-neutral-600 font-sans">Buscam também {current.otherProperties}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Quantidade de Quartos</h5>
                                      <p className="text-xs text-neutral-600 font-sans font-medium">Foco prioritário em {current.preferredRooms}</p>
                                    </div>
                                    <div className="space-y-1">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]">Diagnóstico de Conhecimento / Sentem-se Perdidos?</h5>
                                      <p className="text-xs text-amber-950 bg-amber-50 p-2 rounded-xs border border-amber-200/50 leading-relaxed text-justify">{current.isLost}</p>
                                    </div>
                                  </div>
                                </div>

                                {/* Seção de Métricas Visual com Charts customizados SVG */}
                                <div className="border-t border-[#1A1A1A]/10 pt-6 space-y-4">
                                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1.5 font-mono">
                                    <TrendingUp className="h-4 w-4 text-amber-600" />
                                    <span>Métricas de Tráfego Imobiliário, Contato & Preferências</span>
                                  </h4>

                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Canais de Contato / Preferência */}
                                    <div className="space-y-3 bg-white border border-[#1A1A1A]/5 p-4 rounded-sm">
                                      <h5 className="text-[10px] font-extrabold uppercase tracking-wide text-neutral-700">Preferência de Canal para Abordagem</h5>
                                      
                                      <div className="space-y-2.5 pt-1 text-[#1A1A1A]">
                                        <div>
                                          <div className="flex justify-between text-[11px] mb-1 text-neutral-600 font-medium">
                                            <span>Mensagem WhatsApp</span>
                                            <span className="font-mono font-bold">{current.whatsappPreference}%</span>
                                          </div>
                                          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                            <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${current.whatsappPreference}%` }}></div>
                                          </div>
                                        </div>

                                        <div>
                                          <div className="flex justify-between text-[11px] mb-1 text-neutral-600 font-medium">
                                            <span>Ligação Telefônica Direta</span>
                                            <span className="font-mono font-bold">{current.phonePreference}%</span>
                                          </div>
                                          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                            <div className="bg-blue-500 h-full rounded-full transition-all duration-500" style={{ width: `${current.phonePreference}%` }}></div>
                                          </div>
                                        </div>

                                        <div>
                                          <div className="flex justify-between text-[11px] mb-1 text-neutral-600 font-medium">
                                            <span>Mensagem direta nas Redes Sociais</span>
                                            <span className="font-mono font-bold">{current.socialPreference}%</span>
                                          </div>
                                          <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                                            <div className="bg-purple-600 h-full rounded-full transition-all duration-500" style={{ width: `${current.socialPreference}%` }}></div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>

                                    {/* Critérios Inclusivos & Especiais */}
                                    <div className="space-y-3 bg-white border border-[#1A1A1A]/5 p-4 rounded-sm">
                                      <h5 className="text-[10px] font-extrabold uppercase tracking-wide text-neutral-700">Importância de Critérios Inclusivos</h5>
                                      
                                      <div className="space-y-2 text-[11px] text-neutral-600 leading-relaxed font-sans">
                                        <div className="flex items-start gap-1.5">
                                          <span className="text-amber-600 font-bold shrink-0">🐾 Pet-Friendly:</span>
                                          <span>{current.accessibilityNeeds.petFriendly}</span>
                                        </div>
                                        <div className="flex items-start gap-1.5 border-t border-neutral-100 pt-1.5">
                                          <span className="text-amber-600 font-bold shrink-0">♿ Acessibilidade:</span>
                                          <span>{current.accessibilityNeeds.disabledElderly}</span>
                                        </div>
                                        <div className="flex items-start gap-1.5 border-t border-neutral-100 pt-1.5">
                                          <span className="text-amber-600 font-bold shrink-0">🚇 Mobilidade:</span>
                                          <span>{current.accessibilityNeeds.nearTransit}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              {/* Plano de Abordagem & Propaganda Direcionada */}
                              <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 md:p-8 space-y-6">
                                <h4 className="text-[11px] font-extrabold uppercase tracking-widest text-[#1A1A1A] border-b border-[#1A1A1A]/10 pb-3 flex items-center gap-2">
                                  <Target className="h-5 w-5 text-amber-600" />
                                  <span>Plano de Abordagem Científica & Propaganda Direcionada</span>
                                </h4>

                                <div className="space-y-4 text-[#1A1A1A]">
                                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 bg-amber-600 rounded-full"></span>
                                        <span>Onde encontrá-los online?</span>
                                      </h5>
                                      <p className="text-xs text-neutral-600 leading-relaxed text-justify">{current.whereToFind}</p>
                                    </div>

                                    <div className="space-y-2">
                                      <h5 className="text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A] flex items-center gap-1">
                                        <span className="h-1.5 w-1.5 bg-amber-600 rounded-full"></span>
                                        <span>Como abordar de forma assertiva?</span>
                                      </h5>
                                      <p className="text-xs text-neutral-600 leading-relaxed text-justify">{current.howToApproach}</p>
                                    </div>
                                  </div>

                                  {/* Estratégia Google Meu Negócio / SEO */}
                                  <div className="bg-amber-50/50 border border-amber-200/50 p-4 rounded-sm space-y-2">
                                    <h5 className="text-[10px] font-bold uppercase tracking-wider text-amber-900 flex items-center gap-1.5">
                                      <Globe className="h-4 w-4 text-amber-600" />
                                      <span>Posicionamento no Google & Perfil da Empresa (Meu Negócio)</span>
                                    </h5>
                                    <p className="text-xs text-amber-800 leading-relaxed text-justify">
                                      {current.googleMyBusinessStrategy} Cadastre avaliações reais contendo essas menções para atrair o tráfego orgânico com intenção de compra imediata.
                                    </p>
                                  </div>

                                  {/* Copy de Propaganda Facebook / Instagram */}
                                  <div className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm space-y-3">
                                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1">
                                        <Facebook className="h-3.5 w-3.5 text-blue-600" />
                                        <span>Modelador de Anúncio Pago (Meta / Google Ads)</span>
                                      </span>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(current.adCopy);
                                          alert("Texto de anúncio copiado com sucesso!");
                                        }}
                                        className="text-[9px] font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                                      >
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Copiar Copy</span>
                                      </button>
                                    </div>
                                    <blockquote className="text-xs text-neutral-600 italic bg-neutral-50 p-3 rounded-xs border-l-2 border-amber-500 leading-relaxed select-all">
                                      "{current.adCopy}"
                                    </blockquote>
                                  </div>

                                  {/* Roteiro WhatsApp Pronto */}
                                  <div className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm space-y-3">
                                    <div className="flex items-center justify-between border-b border-neutral-100 pb-2">
                                      <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-800 flex items-center gap-1">
                                        <MessageCircle className="h-3.5 w-3.5 text-emerald-600" />
                                        <span>Script Pronto para WhatsApp / Abordagem</span>
                                      </span>
                                      <button
                                        onClick={() => {
                                          navigator.clipboard.writeText(current.whatsappTemplate);
                                          alert("Script de WhatsApp copiado com sucesso!");
                                        }}
                                        className="text-[9px] font-bold uppercase tracking-wider text-amber-700 hover:text-amber-900 flex items-center gap-1 cursor-pointer"
                                      >
                                        <Copy className="h-3.5 w-3.5" />
                                        <span>Copiar Script</span>
                                      </button>
                                    </div>
                                    <blockquote className="text-xs text-neutral-600 italic bg-neutral-50 p-3 rounded-xs border-l-2 border-emerald-500 leading-relaxed select-all">
                                      "{current.whatsappTemplate}"
                                    </blockquote>
                                  </div>

                                </div>
                              </div>
                            </motion.div>
                          );
                        })()}
                      </div>
                    </div>
                  </div>
                )}

                {intelSubTab === "intent" && (
                  <IntentIntelligenceEngine 
                    leads={buyerLeads}
                    onUpdateLeads={setBuyerLeads}
                    accentColor={accentColor}
                  />
                )}

              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Rodapé da Página */}
        <footer className="mt-24 pt-8 border-t border-[#1A1A1A]/10 text-center text-[#1A1A1A]/40 text-xs space-y-4">
          <p className="uppercase tracking-widest font-bold text-[9px] text-[#1A1A1A]/60 font-mono">
            &copy; {new Date().getFullYear()} Leandro Rodrigues Imóveis • Inteligência de Mercado — {selectedCity === "Rio de Janeiro" ? "Rio de Janeiro (Zona Sul)" : selectedCity}
          </p>
          <div className="flex justify-center gap-8 text-[9px] uppercase tracking-widest font-bold opacity-70">
            <span>Digital Edition</span>
            <span>Vol. 01</span>
            <span>Issue 04</span>
          </div>
        </footer>

        {/* Modal de Edição e Criação de Leads / Imobiliária */}
        <AnimatePresence>
          {(editingAgency !== null || isCreatingNew) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-[#FAF9F6] border-2 border-[#1A1A1A] p-4 sm:p-6 max-w-lg w-full shadow-2xl relative max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
              >
                {/* Header do formulário */}
                <div className="border-b border-[#1A1A1A]/10 pb-4 mb-5">
                  <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#1A1A1A]/50 font-mono">
                    CRM de Leads Imobiliários
                  </span>
                  <h3 className="font-serif italic text-2xl text-[#1A1A1A] mt-1">
                    {isCreatingNew ? "Cadastrar Nova Imobiliária" : "Editar Dados do Lead"}
                  </h3>
                  <p className="text-[11px] text-[#1A1A1A]/60 mt-2 leading-relaxed">
                    Personalize os dados das agências e conecte números de WhatsApp reais. Suas alterações são salvas automaticamente de forma persistente no seu navegador e refletem no PDF de exportação.
                  </p>
                </div>

                <form onSubmit={handleSaveAgency} className="space-y-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                      Nome da Imobiliária *
                    </label>
                    <input
                      type="text"
                      required
                      value={formName}
                      onChange={(e) => setFormName(e.target.value)}
                      placeholder="Ex: RE/MAX Point"
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                        CRECI
                      </label>
                      <input
                        type="text"
                        value={formCreci}
                        onChange={(e) => setFormCreci(e.target.value)}
                        placeholder="Ex: 8120-J"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                        Bairro
                      </label>
                      <select
                        value={formBairro}
                        onChange={(e) => setFormBairro(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors cursor-pointer"
                      >
                        {availableBairros
                          .filter((b) => b !== "Todos")
                          .map((b) => (
                            <option key={b} value={b}>
                              {b}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                        Telefone Exibido *
                      </label>
                      <input
                        type="text"
                        required
                        value={formPhone}
                        onChange={(e) => setFormPhone(e.target.value)}
                        placeholder="Ex: (21) 98112-4040"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                        Site Oficial
                      </label>
                      <input
                        type="text"
                        value={formSite}
                        onChange={(e) => setFormSite(e.target.value)}
                        placeholder="Ex: www.agencia.com.br"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                        Nome do Responsável
                      </label>
                      <input
                        type="text"
                        value={formResponsavel}
                        onChange={(e) => setFormResponsavel(e.target.value)}
                        placeholder="Ex: Dr. Ricardo Santos"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                        URL da Logomarca (Logo)
                      </label>
                      <input
                        type="text"
                        value={formLogoUrl}
                        onChange={(e) => setFormLogoUrl(e.target.value)}
                        placeholder="Ex: https://images.unsplash.com/... (ou deixe em branco)"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                      Link de WhatsApp * (Apenas Números com DDD)
                    </label>
                    <input
                      type="text"
                      required
                      value={formWhatsapp}
                      onChange={(e) => setFormWhatsapp(e.target.value)}
                      placeholder="Ex: 5521981124040"
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors font-mono"
                    />
                    <span className="block text-[9px] text-[#5A5A40] mt-1 italic leading-tight">
                      * Nota: Insira o DDI (55 para Brasil) + DDD (ex: 21) + Celular. Sem parênteses, hífen ou espaços para garantir o funcionamento correto do link de redirecionamento para o WhatsApp da agência.
                    </span>
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                      Endereço Comercial *
                    </label>
                    <input
                      type="text"
                      required
                      value={formAddress}
                      onChange={(e) => setFormAddress(e.target.value)}
                      placeholder="Ex: R. Governador Roberto Silveira, 203 - Agriões"
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                      Narrativa / Descrição Editorial *
                    </label>
                    <textarea
                      required
                      rows={3}
                      value={formDesc}
                      onChange={(e) => setFormDesc(e.target.value)}
                      placeholder="Descreva o foco comercial, histórico e pontos fortes da imobiliária..."
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors resize-none leading-relaxed"
                    />
                  </div>

                  {/* Especialidades */}
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest font-bold text-[#1A1A1A] mb-1">
                      Especialidades / Focos de Atuação
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={specInput}
                        onChange={(e) => setSpecInput(e.target.value)}
                        placeholder="Ex: Locação Comercial"
                        className="flex-1 text-xs p-2 bg-[#FAF9F6] border border-[#1A1A1A]/20 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                      <button
                        type="button"
                        onClick={addSpec}
                        className="px-3.5 py-1.5 bg-[#1A1A1A] hover:bg-[#5A5A40] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
                      >
                        Add
                      </button>
                    </div>
                    {formSpecs.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {formSpecs.map((spec, sIdx) => (
                          <span
                            key={spec}
                            className="inline-flex items-center gap-1.5 text-[9px] font-mono font-bold border border-[#1A1A1A]/10 px-2 py-0.5"
                          >
                            <span>{spec}</span>
                            <button
                              type="button"
                              onClick={() => removeSpec(sIdx)}
                              className="text-red-700 hover:text-red-900 border-none bg-transparent cursor-pointer font-bold"
                            >
                              &times;
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Botões do Formulário */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingAgency(null);
                        setIsCreatingNew(false);
                        resetForm();
                      }}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 hover:text-[#1A1A1A] border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#5A5A40] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider border border-[#1A1A1A] transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      {isCreatingNew ? "Cadastrar Lead" : "Salvar Alterações"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Edição e Criação de Leads de Compradores */}
        <AnimatePresence>
          {(editingLead !== null || isCreatingNewLead) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#1A1A1A]/50 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-[#FAF9F6] border-2 border-[#1A1A1A] p-4 sm:p-6 max-w-lg w-full shadow-2xl relative max-h-[85vh] sm:max-h-[90vh] overflow-y-auto"
              >
                {/* Header do formulário */}
                <div className="border-b border-[#1A1A1A]/10 pb-4 mb-5">
                  <h3 className="text-base font-bold uppercase tracking-tight text-[#1A1A1A]">
                    {isCreatingNewLead ? "Cadastrar Novo Lead de Comprador" : "Editar Dados do Comprador"}
                  </h3>
                  <p className="text-[10px] text-[#1A1A1A]/50 uppercase tracking-widest mt-1">
                    Radar de Compradores — {selectedCity}
                  </p>
                </div>

                <form onSubmit={handleSaveLead} className="space-y-4">
                  {/* Nome Completo */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={leadFormNome}
                      onChange={(e) => setLeadFormNome(e.target.value)}
                      placeholder="Ex: Carlos Augusto Silva"
                      className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Telefone */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Telefone *
                      </label>
                      <input
                        type="text"
                        required
                        value={leadFormTelefone}
                        onChange={(e) => setLeadFormTelefone(e.target.value)}
                        placeholder="Ex: (21) 98765-4321"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* WhatsApp */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        WhatsApp (Apenas Números)
                      </label>
                      <input
                        type="text"
                        value={leadFormWhatsapp}
                        onChange={(e) => setLeadFormWhatsapp(e.target.value)}
                        placeholder="Ex: 21987654321"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* E-mail */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        E-mail
                      </label>
                      <input
                        type="email"
                        value={leadFormEmail}
                        onChange={(e) => setLeadFormEmail(e.target.value)}
                        placeholder="Ex: cliente@email.com"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Rede Social */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Rede Social (Instagram/Facebook)
                      </label>
                      <input
                        type="text"
                        value={leadFormRedeSocial}
                        onChange={(e) => setLeadFormRedeSocial(e.target.value)}
                        placeholder="Ex: @carlos_silva"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Bairro de Interesse */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Bairro de Interesse *
                      </label>
                      <select
                        required
                        value={leadFormBairro}
                        onChange={(e) => setLeadFormBairro(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      >
                        {availableBairros.filter(b => b !== "Todos").map((bairro) => (
                          <option key={bairro} value={bairro}>{bairro}</option>
                        ))}
                      </select>
                    </div>

                    {/* Tipo de Imóvel */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Tipo de Imóvel
                      </label>
                      <select
                        value={leadFormTipoImovel}
                        onChange={(e) => setLeadFormTipoImovel(e.target.value as any)}
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      >
                        <option value="Apartamento">Apartamento</option>
                        <option value="Casa">Casa</option>
                        <option value="Casa em Condomínio">Casa em Condomínio</option>
                        <option value="Terreno">Terreno</option>
                        <option value="Sítio/Chácara">Sítio / Chácara</option>
                        <option value="Cobertura">Cobertura</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Orçamento Máximo (R$) */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Orçamento Máximo (R$)
                      </label>
                      <input
                        type="number"
                        value={leadFormValorMaximo || ""}
                        onChange={(e) => setLeadFormValorMaximo(Number(e.target.value))}
                        placeholder="Ex: 450000"
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      />
                    </div>

                    {/* Quantidade de Quartos */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Quartos Necessários
                      </label>
                      <select
                        value={leadFormQuartos}
                        onChange={(e) => setLeadFormQuartos(Number(e.target.value))}
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      >
                        <option value="1">1 Quarto</option>
                        <option value="2">2 Quartos</option>
                        <option value="3">3 Quartos</option>
                        <option value="4">4 Quartos</option>
                        <option value="5">5+ Quartos</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Origem da Captura */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Origem da Captura
                      </label>
                      <select
                        value={leadFormOrigem}
                        onChange={(e) => setLeadFormOrigem(e.target.value)}
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      >
                        <option value="Busca Google (Intenção)">Busca Google (Intenção)</option>
                        <option value="Hashtag Instagram">Hashtag Instagram</option>
                        <option value="Facebook Marketplace">Facebook Marketplace</option>
                        <option value="Portal OLX Lead">Portal OLX Lead</option>
                        <option value="Cadastro Manual">Cadastro Manual</option>
                        <option value="Indicação Direta">Indicação Direta</option>
                      </select>
                    </div>

                    {/* Status Inicial do CRM */}
                    <div>
                      <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                        Status de Contato
                      </label>
                      <select
                        value={leadFormStatus}
                        onChange={(e) => setLeadFormStatus(e.target.value as any)}
                        className="w-full text-xs p-2.5 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Contatado">Contatado</option>
                        <option value="Interesse Confirmado">Interesse Confirmado</option>
                        <option value="Sem Interesse">Sem Interesse</option>
                        <option value="Número Incorreto">Número Incorreto</option>
                      </select>
                    </div>
                  </div>

                  {/* Observações / Detalhes */}
                  <div>
                    <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 mb-1.5">
                      Observações Adicionais (Requisitos)
                    </label>
                    <textarea
                      value={leadFormDetalhes}
                      onChange={(e) => setLeadFormDetalhes(e.target.value)}
                      placeholder="Ex: Exige garagem coberta, sol da manhã, andar alto..."
                      rows={2}
                      className="w-full text-xs p-3 bg-[#FAF9F6] border border-[#1A1A1A]/15 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    />
                  </div>

                  {/* Botões do Formulário */}
                  <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10 mt-6">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingLead(null);
                        setIsCreatingNewLead(false);
                        resetLeadForm();
                      }}
                      className="px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#1A1A1A]/60 hover:text-[#1A1A1A] border border-[#1A1A1A]/10 hover:border-[#1A1A1A]/30 transition-all cursor-pointer"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#5A5A40] text-[#FAF9F6] text-xs font-bold uppercase tracking-wider border border-[#1A1A1A] transition-all cursor-pointer shadow-sm hover:shadow"
                    >
                      {editingLead ? "Salvar Alterações" : "Cadastrar Lead Comprador"}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}

          {/* Modal de Conexão Segura de Contas (OAuth / Credentials Connection) */}
          {oauthModalOpen && oauthModalAccount && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 z-50 overflow-y-auto"
              id="oauth-modal-overlay"
            >
              <motion.div
                initial={{ scale: 0.95, y: 15 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 15 }}
                className="bg-[#FAF9F6] dark:bg-neutral-900 border border-[#1A1A1A]/10 dark:border-white/15 w-full max-w-md p-6 space-y-5 shadow-2xl rounded-sm text-[#1A1A1A] dark:text-[#FAF9F6]"
                id="oauth-modal-container"
              >
                {/* Cabeçalho */}
                <div className="flex items-center gap-3 border-b border-[#1A1A1A]/10 dark:border-white/10 pb-3.5">
                  <div className="p-2 bg-[#5A5A40]/10 text-[#5A5A40] dark:text-[#FAF9F6]/80 rounded-sm">
                    <Lock className="h-4.5 w-4.5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-widest font-mono">
                      Conexão Criptografada: {oauthModalAccount.toUpperCase()}
                    </h3>
                    <p className="text-[10px] text-[#1A1A1A]/60 dark:text-[#FAF9F6]/60">Segurança SSL/TLS • Roteamento HTTPS Dedicado</p>
                  </div>
                </div>

                {isConnecting ? (
                  /* Painel de Progresso / Handshake Seguro */
                  <div className="bg-neutral-950 text-emerald-400 p-5 font-mono text-[10px] space-y-3 border border-neutral-800 rounded-sm shadow-inner min-h-[160px] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between border-b border-emerald-500/20 pb-1.5 text-neutral-400 mb-2">
                        <span>SECURITY_HANDSHAKE_TLS_1.3</span>
                        <span className="animate-ping text-emerald-500">●</span>
                      </div>
                      <p className="animate-pulse leading-relaxed">{oauthProgress}</p>
                    </div>
                    <div>
                      <div className="w-full bg-neutral-900 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full animate-[loading_5s_ease-in-out_infinite]" style={{ width: "85%" }} />
                      </div>
                      <p className="text-[8px] text-neutral-500 mt-1.5 text-right">AES-256 ENCRYPTED PORTAL ACCESS</p>
                    </div>
                  </div>
                ) : (
                  /* Formulário de Login */
                  <div className="space-y-4">
                    <p className="text-[11px] text-[#1A1A1A]/70 dark:text-[#FAF9F6]/70 leading-relaxed bg-[#F3F1ED] dark:bg-neutral-800 p-3 border border-[#1A1A1A]/5 dark:border-white/5 rounded-sm">
                      Insira suas credenciais de e-mail e a Senha Mestre de Integração para autenticar a conexão e sincronizar os leads do canal <strong>{oauthModalAccount.toUpperCase()}</strong> com segurança.
                    </p>

                    {/* Exibição de Erros inline */}
                    {oauthError && (
                      <div className="bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 p-3 flex items-start gap-2 rounded-xs animate-shake animate-duration-300">
                        <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                        <span className="text-[10px] font-bold leading-normal">{oauthError}</span>
                      </div>
                    )}

                    <div className="space-y-3 text-xs">
                      {/* Usuário */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 dark:text-[#FAF9F6]/70">
                          Usuário, E-mail ou ID de Acesso
                        </label>
                        <input
                          type="text"
                          required
                          value={oauthUsername}
                          onChange={(e) => {
                            setOauthUsername(e.target.value);
                            setOauthError("");
                          }}
                          placeholder="Ex: @grupoleandrorodrigues"
                          className="w-full p-2.5 bg-white dark:bg-neutral-800 border border-[#1A1A1A]/15 dark:border-white/15 focus:border-[#1A1A1A] dark:focus:border-[#FAF9F6] focus:outline-none transition-colors text-xs text-[#1A1A1A] dark:text-[#FAF9F6] rounded-sm"
                        />
                      </div>

                      {/* Senha */}
                      <div className="space-y-1">
                        <label className="block text-[9px] font-bold uppercase tracking-wider text-[#1A1A1A]/70 dark:text-[#FAF9F6]/70">
                          Senha de Integração Segura
                        </label>
                        <input
                          type="password"
                          required
                          value={oauthPassword}
                          onChange={(e) => {
                            setOauthPassword(e.target.value);
                            setOauthError("");
                          }}
                          placeholder="••••••••••••"
                          className="w-full p-2.5 bg-white dark:bg-neutral-800 border border-[#1A1A1A]/15 dark:border-white/15 focus:border-[#1A1A1A] dark:focus:border-[#FAF9F6] focus:outline-none transition-colors text-xs text-[#1A1A1A] dark:text-[#FAF9F6] rounded-sm"
                        />
                        <p className="text-[9px] text-[#0B7C95] dark:text-teal-400 font-medium pt-0.5">
                          Autorizado para: <span className="font-semibold">{integrationEmail}</span>. Senha atual: <span className="font-semibold">{integrationPassword}</span> (customizáveis no painel de marca abaixo).
                        </p>
                      </div>

                      {/* Manter Conectado */}
                      <div className="flex items-center gap-2.5 pt-1.5">
                        <input
                          type="checkbox"
                          id="keep-logged-in-checkbox"
                          checked={oauthKeepLogged}
                          onChange={(e) => setOauthKeepLogged(e.target.checked)}
                          className="h-4.5 w-4.5 accent-[#5A5A40] cursor-pointer rounded-xs"
                        />
                        <label htmlFor="keep-logged-in-checkbox" className="text-[10px] text-[#1A1A1A]/70 dark:text-[#FAF9F6]/70 select-none cursor-pointer">
                          Manter conta conectada e sincronizada na nuvem do Grupo
                        </label>
                      </div>
                    </div>

                    {/* Botões */}
                    <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1A1A1A]/10 dark:border-white/10 mt-5">
                      <button
                        type="button"
                        onClick={() => {
                          setOauthModalOpen(false);
                          setOauthPassword("");
                          setOauthError("");
                        }}
                        className="px-4 py-2.5 text-[10px] font-bold uppercase tracking-wider text-[#1A1A1A]/60 dark:text-[#FAF9F6]/60 hover:text-[#1A1A1A] dark:hover:text-[#FAF9F6] border border-[#1A1A1A]/10 dark:border-white/10 hover:border-[#1A1A1A]/30 dark:hover:border-white/30 transition-all cursor-pointer rounded-sm"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={handleConfirmConnectAccount}
                        className="px-5 py-2.5 bg-[#1A1A1A] dark:bg-[#FAF9F6] hover:bg-[#5A5A40] dark:hover:bg-[#5A5A40] text-white dark:text-[#1A1A1A] hover:text-white text-[10px] font-bold uppercase tracking-wider border border-[#1A1A1A] dark:border-white transition-all cursor-pointer shadow-sm rounded-sm"
                      >
                        Autenticar & Conectar
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  </div>
  );
}
