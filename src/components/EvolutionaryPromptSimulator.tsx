import React, { useState, useMemo } from "react";
import { 
  Cpu, Flame, MessageSquare, Mail, Instagram as InstaIcon, ArrowRight,
  Sparkles, RefreshCw, Code, Download, Copy, Brain, Star, HelpCircle
} from "lucide-react";
import { BuyerLead } from "../types";

interface EvolutionaryPromptSimulatorProps {
  leads: BuyerLead[];
  onUpdateLeads: (updatedLeads: BuyerLead[]) => void;
  accentColor: string;
}

export function EvolutionaryPromptSimulator({ leads, onUpdateLeads, accentColor }: EvolutionaryPromptSimulatorProps) {
  const [selectedLeadId, setSelectedLeadId] = useState<string>(leads[0]?.id || "");
  const [responseText, setResponseText] = useState("quero saber mais sobre as condições e ver fotos adicionais");
  const [isLoading, setIsLoading] = useState(false);
  const [copyStatus, setCopyStatus] = useState<string | null>(null);

  // Selected lead details
  const lead = useMemo(() => {
    return leads.find(l => l.id === selectedLeadId) || leads[0];
  }, [leads, selectedLeadId]);

  // Output State
  const [aiAnalysisResult, setAiAnalysisResult] = useState<any>(null);

  // Raw evolutionary learning prompt definition (Master Prompt)
  const masterPromptText = `
SYSTEM INSTRUCTIONS FOR EVOLUTIONARY REAL ESTATE AGENT:
You are an advanced Real Estate IA Learning Core that operates in an adaptive, evolutionary feedback loop.

CORE DIRECTIVE:
Analyze the past interactions and current response text of a lead, then update their scoring (0-40), determine their interest pattern, and generate tailored multichannel copy (WhatsApp, Instagram, E-mail) based on their specific archetype.

ARCHETYPES & STRATEGY RECALIBRATION:
1. CURIOSO (Interested but low intent):
   - Message Style: High Information, low sales pressure. Focus on giving value.
2. INTERESSADO (High buying intent, action-oriented):
   - Message Style: Detail-oriented, call to immediate action, visit invitation.
3. FRIO (Slow, delayed responses, passive):
   - Message Style: Gentle reactivation, simple question, no pressure.
4. NEGATIVO (Uninterested, rejects initial offer):
   - Message Style: Relationship maintenance, polite exit, future follow-up permission.

INPUT SCHEMA:
- Lead: { Nome, TipoImovel, Bairro, ValorLimite }
- Response History: "[Current response text]"

OUTPUT SCHEMA REQUIRED:
- SCORE (0-40): Integer based on intent indicators.
- CLASSIFICATION: QUENTE (>=27) / MORNO (15-26) / FRIO (<15)
- BEHAVIOR ARCHETYPE: Curioso / Interessado / Frio / Negativo
- ANALYSIS: Pattern explanation, probability of closure.
- CHANNELS: Customized WhatsApp, Instagram DM, and E-mail copy.
- NEXT ACTION: Direct actionable advice for the broker.
`;

  // Simulator Core: Generates highly realistic and contextually precise adaptive analysis
  const handleSimulateBrain = () => {
    if (!lead) return;
    setIsLoading(true);

    setTimeout(() => {
      const text = responseText.toLowerCase();
      let archetype = "Curioso";
      let score = 22;
      let classification = "MORNO";
      let probability = "45%";
      let strategy = "Dar mais informações sem pressionar";

      // Intent detection heuristics
      if (text.includes("quero") || text.includes("interesse") || text.includes("visita") || text.includes("gostei") || text.includes("sim") || text.includes("comprar") || text.includes("fotos")) {
        archetype = "Interessado";
        score = 36;
        classification = "QUENTE";
        probability = "85%";
        strategy = "Marcar visita técnica imediata ao imóvel ou enviar fotos urgentes via WhatsApp.";
      } else if (text.includes("não") || text.includes("remover") || text.includes("desisti") || text.includes("caro") || text.includes("outro")) {
        archetype = "Negativo";
        score = 8;
        classification = "FRIO";
        probability = "5%";
        strategy = "Manter relacionamento cordial, arquivar lead no CRM e pedir autorização para enviar futuras opções.";
      } else if (text.includes("depois") || text.includes("mais tarde") || text.includes("ocupado") || text.includes("semana que vem")) {
        archetype = "Frio";
        score = 16;
        classification = "MORNO";
        probability = "25%";
        strategy = "Agendar lembrete no CRM para reativar em 48h com abordagem leve de valor.";
      }

      const neighborhood = lead.bairroInteresse || "bairro do portfólio";
      const type = lead.tipoImovel || "Imóvel";
      const priceStr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(lead.valorMaximo || 450000);

      // WhatsApp adaptive copy drafting
      let waCopy = "";
      let igCopy = "";
      let mailCopy = "";

      if (archetype === "Interessado") {
        waCopy = `Excelente, ${lead.nome}! Que bom que gostou. Separei as 5 fotos internas em alta definição e o vídeo completo do ${type} em ${neighborhood}.\n\nPara facilitar, podemos agendar a visita amanhã à tarde (quarta) às 14h ou na quinta às 10h? O que fica melhor para sua agenda?`;
        igCopy = `Oi ${lead.nome}! Que bom que curtiu a postagem do ${type} em ${neighborhood}. Tenho os detalhes adicionais prontos para te mandar. Qual seu melhor e-mail ou whats?`;
        mailCopy = `Prezado(a) ${lead.nome},\n\nFiquei muito contente em saber do seu interesse qualificado pelo ${type} no bairro ${neighborhood}.\n\nAnexei a esta mensagem os documentos de IPTU, taxas de condomínio e a planta humanizada completa do local, listado sob valor de ${priceStr}.\n\nGostaria de aproveitar para convidá-lo para uma visita sem compromisso esta semana. Tenho disponibilidade na quarta-feira das 13h às 17h.\n\nAtenciosamente,\nLeandro Rodrigues`;
      } else if (archetype === "Negativo") {
        waCopy = `Entendo perfeitamente, ${lead.nome}. Sem problemas! Agradeço de verdade pelo retorno. Se futuramente mudar de ideia ou buscar outra região serrana, saiba que estou sempre à disposição. Um ótimo dia!`;
        igCopy = `Tudo bem, ${lead.nome}! Obrigado por responder. Siga acompanhando nossa página para ver novidades do mercado. Um forte abraço!`;
        mailCopy = `Prezado(a) ${lead.nome},\n\nAgradeço sua resposta honesta referente ao ${type} em ${neighborhood}.\n\nEstarei atualizando sua ficha cadastral no nosso sistema para cessar os contatos. Caso no futuro precise de assessoria imobiliária na serra, por favor, sinta-se à vontade para me acionar.\n\nAtenciosamente,\nLeandro Rodrigues`;
      } else if (archetype === "Frio") {
        waCopy = `Olá, ${lead.nome}, tudo bem? Sem problemas! Sei que a rotina está corrida. Vou deixar agendado para te mandar uma mensagem rápida na próxima semana. Um abraço!`;
        igCopy = `Oi ${lead.nome}, tranquilo! Nos falamos mais para a frente quando sua rotina acalmar. Sucesso!`;
        mailCopy = `Prezado(a) ${lead.nome},\n\nCompreendo que este não seja o momento ideal para avançarmos com a análise do ${type} em ${neighborhood}.\n\nEntrarei em contato em alguns dias para saber se sua rotina está mais livre.\n\nAtenciosamente,\nLeandro Rodrigues`;
      } else {
        // Curioso
        waCopy = `Olá, ${lead.nome}! Legal que queira conhecer mais. O ${type} fica localizado na melhor rua de ${neighborhood}, possui ótima incidência de sol da manhã e lazer excelente. Quer receber a ficha descritiva completa por aqui?`;
        igCopy = `Oi ${lead.nome}! Legal sua curiosidade. O ${type} tem uma vista deslumbrante e acabamento impecável. Me passa seu whats e te mando a descrição completa!`;
        mailCopy = `Prezado(a) ${lead.nome},\n\nSegue a ficha técnica descritiva que você solicitou do ${type} localizado no bairro ${neighborhood}, anunciado sob o valor de ${priceStr}.\n\nEsta opção se destaca pela excelente conservação e valor de metro quadrado abaixo da média local.\n\nQualquer dúvida adicional, sigo à disposição.\n\nAtenciosamente,\nLeandro Rodrigues`;
      }

      setAiAnalysisResult({
        score,
        classification,
        archetype,
        probability,
        strategy,
        waCopy,
        igCopy,
        mailCopy,
        analysisExplanation: `O lead demonstrou comportamento compatível com o arquétipo [${archetype.toUpperCase()}] devido à presença de termos chaves no histórico de diálogo. O algoritmo atualizou o score para ${score}/40, elevando a relevância comercial e sugerindo um follow-up focado em '${strategy}'.`
      });

      // Update lead details in CRM database live!
      const updated = leads.map(l => {
        if (l.id === lead.id) {
          return {
            ...l,
            confidenceScore: Math.round(score / 0.4), // scale back
            textExcerpt: responseText // save answer text
          };
        }
        return l;
      });
      onUpdateLeads(updated);

      setIsLoading(false);
    }, 1200);
  };

  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(key);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="bg-[#FAF9F6] border border-[#1A1A1A]/10 p-6 space-y-6 font-sans">
      
      {/* Top Banner */}
      <div className="border-b border-[#1A1A1A]/10 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 text-amber-600">
            <Brain className="h-5 w-5 animate-pulse" />
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#1A1A1A] font-mono">
              Prompt Evolutivo & Cérebro IA (Adaptável)
            </h3>
          </div>
          <p className="text-xs text-neutral-500 leading-relaxed max-w-3xl">
            A IA do sistema analisa as respostas textuais dos leads e evolui a pontuação comercial de forma automática. Dependendo da intenção detectada, a linguagem de contato é totalmente remodelada (WhatsApp direto, DM amigável ou E-mail formal).
          </p>
        </div>
        <span className="bg-[#1A1A1A] text-white text-[9px] font-mono font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm shrink-0">
          Neural Brain v2.5
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Lado Esquerdo: Playground Interativo (Cols: 5) */}
        <div className="lg:col-span-5 bg-white p-5 border border-[#1A1A1A]/10 rounded-sm space-y-4 flex flex-col justify-between">
          
          <div className="space-y-4">
            <h4 className="text-xs font-bold font-mono text-[#1a1a1a] uppercase border-b border-neutral-100 pb-2 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-amber-600" />
              <span>Simulador de Resposta</span>
            </h4>

            {/* Select Lead */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400">1. Escolha o Lead do CRM:</label>
              <select
                value={selectedLeadId}
                onChange={(e) => {
                  setSelectedLeadId(e.target.value);
                  setAiAnalysisResult(null);
                }}
                className="w-full p-2 bg-[#FAF9F6] border border-neutral-200 focus:outline-none focus:border-[#1A1A1A] text-xs font-semibold rounded-xs"
              >
                {leads.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.nome} ({l.tipoLead === "Proprietário" ? "Particular FSBO" : "Comprador"}) - {l.bairroInteresse}
                  </option>
                ))}
              </select>
            </div>

            {/* Input Response Text */}
            <div className="space-y-1">
              <label className="block text-[10px] font-mono font-bold uppercase text-neutral-400">2. Escreva a Resposta do Lead:</label>
              <textarea
                value={responseText}
                onChange={(e) => setResponseText(e.target.value)}
                placeholder="Ex: 'quero marcar uma visita para amanhã' ou 'não tenho interesse'"
                className="w-full p-3 bg-[#FAF9F6] border border-neutral-200 focus:outline-none focus:border-[#1A1A1A] text-xs font-mono rounded-xs h-28 leading-relaxed focus:ring-1 focus:ring-amber-500"
              />
              <div className="flex flex-wrap gap-1 pt-1">
                <button 
                  onClick={() => setResponseText("quero agendar uma visita amanhã à tarde com certeza")} 
                  className="text-[9px] font-mono bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded-sm text-neutral-600 border border-neutral-200 cursor-pointer"
                >
                  "Agendar visita"
                </button>
                <button 
                  onClick={() => setResponseText("estou apenas dando uma olhada por curiosidade, sem pressa")} 
                  className="text-[9px] font-mono bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded-sm text-neutral-600 border border-neutral-200 cursor-pointer"
                >
                  "Curioso"
                </button>
                <button 
                  onClick={() => setResponseText("não me mande mais nada por favor, desisti da compra")} 
                  className="text-[9px] font-mono bg-neutral-100 hover:bg-neutral-200 px-2 py-0.5 rounded-sm text-neutral-600 border border-neutral-200 cursor-pointer"
                >
                  "Remover interesse"
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleSimulateBrain}
            disabled={isLoading || !lead}
            className="w-full py-3 bg-[#1A1A1A] hover:bg-[#5A5A40] text-white text-[10px] font-bold uppercase tracking-widest transition-all rounded-xs flex items-center justify-center gap-2 cursor-pointer disabled:bg-neutral-300"
          >
            {isLoading ? (
              <>
                <RefreshCw className="h-4 w-4 animate-spin" />
                <span>PROCESSANDO COMUNICAÇÃO ADAPTATIVA...</span>
              </>
            ) : (
              <>
                <Cpu className="h-4 w-4" />
                <span>EXECUTAR CÉREBRO IA (APRENDER)</span>
              </>
            )}
          </button>

        </div>

        {/* Lado Direito: Resultados Aprendizado (Cols: 7) */}
        <div className="lg:col-span-7 space-y-4">
          
          {!aiAnalysisResult ? (
            <div className="border border-dashed border-neutral-300 p-12 text-center text-neutral-400 text-xs rounded-sm h-full flex flex-col justify-center items-center space-y-3 bg-white">
              <Brain className="h-10 w-10 text-neutral-200 animate-pulse" />
              <p className="font-bold text-neutral-500 uppercase font-mono text-[10px]">Cérebro Neural Aguardando Entrada</p>
              <p className="text-[10px] text-neutral-400 font-serif">Escolha um lead à esquerda, digite sua resposta mais recente e clique em "Executar Cérebro IA" para gerar a análise comportamental adaptativa.</p>
            </div>
          ) : (
            <div className="space-y-4 animate-fadeIn">
              
              {/* Metadados Analíticos */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border-r border-neutral-100 last:border-none pr-2">
                  <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">Arquétipo Comportamental</span>
                  <span className={`text-base font-extrabold font-mono tracking-tight flex items-center gap-1 mt-1 ${
                    aiAnalysisResult.archetype === "Interessado" ? "text-emerald-700" :
                    aiAnalysisResult.archetype === "Curioso" ? "text-amber-700" :
                    "text-neutral-500"
                  }`}>
                    <Star className="h-4.5 w-4.5 fill-current text-amber-500" />
                    {aiAnalysisResult.archetype}
                  </span>
                </div>

                <div className="border-r border-neutral-100 last:border-none pr-2">
                  <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">Novo Score Qualificado</span>
                  <span className="text-base font-extrabold font-mono text-[#0B7C95] mt-1 block">
                    {aiAnalysisResult.score}/40 <span className="text-[10px] text-neutral-400">({aiAnalysisResult.classification})</span>
                  </span>
                </div>

                <div>
                  <span className="block text-[8px] font-mono font-bold text-neutral-400 uppercase">Probabilidade de Fechamento</span>
                  <span className="text-base font-extrabold font-mono text-neutral-800 mt-1 block">
                    {aiAnalysisResult.probability}
                  </span>
                </div>
              </div>

              {/* Explicação da Análise */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm space-y-1.5">
                <span className="block text-[9px] font-mono font-bold text-[#00AFCB] uppercase">Auditoria de Intenção do Algoritmo:</span>
                <p className="text-xs text-neutral-700 leading-relaxed font-serif">
                  {aiAnalysisResult.analysisExplanation}
                </p>
              </div>

              {/* Mensagem Multicanal Adaptada */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm space-y-4">
                <span className="block text-[9px] font-mono font-bold text-neutral-400 uppercase border-b border-neutral-100 pb-2">
                  Mensagens Geradas Sob-Medida (Linguagem Adaptada ao Arquétipo):
                </span>

                <div className="space-y-4">
                  {/* WhatsApp Copy */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 font-mono flex items-center gap-1">
                        <MessageSquare className="h-3.5 w-3.5" />
                        <span>Abordagem WhatsApp</span>
                      </span>
                      <button 
                        onClick={() => handleCopyText(aiAnalysisResult.waCopy, "wa")}
                        className="text-[9px] font-bold uppercase text-neutral-400 hover:text-[#1a1a1a]"
                      >
                        {copyStatus === "wa" ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                    <p className="bg-[#FAF9F6] p-3 text-[11px] font-mono text-neutral-800 border rounded-xs leading-relaxed whitespace-pre-wrap">
                      {aiAnalysisResult.waCopy}
                    </p>
                  </div>

                  {/* Instagram DM Copy */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 font-mono flex items-center gap-1">
                        <InstaIcon className="h-3.5 w-3.5" />
                        <span>Abordagem Instagram DM</span>
                      </span>
                      <button 
                        onClick={() => handleCopyText(aiAnalysisResult.igCopy, "ig")}
                        className="text-[9px] font-bold uppercase text-neutral-400 hover:text-[#1a1a1a]"
                      >
                        {copyStatus === "ig" ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                    <p className="bg-[#FAF9F6] p-3 text-[11px] font-mono text-neutral-800 border rounded-xs leading-relaxed whitespace-pre-wrap">
                      {aiAnalysisResult.igCopy}
                    </p>
                  </div>

                  {/* Email Copy */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 font-mono flex items-center gap-1">
                        <Mail className="h-3.5 w-3.5" />
                        <span>E-mail Estruturado</span>
                      </span>
                      <button 
                        onClick={() => handleCopyText(aiAnalysisResult.mailCopy, "mail")}
                        className="text-[9px] font-bold uppercase text-neutral-400 hover:text-[#1a1a1a]"
                      >
                        {copyStatus === "mail" ? "Copiado!" : "Copiar"}
                      </button>
                    </div>
                    <p className="bg-[#FAF9F6] p-3 text-[11px] font-mono text-neutral-800 border rounded-xs leading-relaxed whitespace-pre-wrap">
                      {aiAnalysisResult.mailCopy}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  );
}
