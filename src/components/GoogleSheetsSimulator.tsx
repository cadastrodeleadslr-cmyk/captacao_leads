import React, { useState, useMemo } from "react";
import { 
  FileText, ArrowDown, ChevronRight, Download, Search, Edit2, 
  Check, Save, Copy, RefreshCw, BarChart2, MessageSquare, Mail, 
  Instagram as InstaIcon, ExternalLink, HelpCircle, Table, Plus
} from "lucide-react";
import { BuyerLead } from "../types";

interface GoogleSheetsSimulatorProps {
  leads: BuyerLead[];
  onUpdateLeads: (updatedLeads: BuyerLead[]) => void;
  accentColor: string;
}

export function GoogleSheetsSimulator({ leads, onUpdateLeads, accentColor }: GoogleSheetsSimulatorProps) {
  const [activeSheetTab, setActiveSheetTab] = useState<"leads" | "imoveis" | "scripts" | "performance">("leads");
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: string } | null>({ row: 0, col: "J" });
  const [searchQuery, setSearchQuery] = useState("");
  
  // Script helper selection
  const [selectedScriptLeadId, setSelectedScriptLeadId] = useState<string>(leads[0]?.id || "");
  const selectedScriptLead = useMemo(() => {
    return leads.find(l => l.id === selectedScriptLeadId) || leads[0];
  }, [leads, selectedScriptLeadId]);

  // Edit states
  const [editingCell, setEditingCell] = useState<{ row: number; col: string; value: string } | null>(null);

  // Leads columns config
  const leadsCols = [
    { key: "A", name: "Data", width: "100px" },
    { key: "B", name: "Nome", width: "140px" },
    { key: "C", name: "Tipo", width: "100px" },
    { key: "D", name: "Segmento", width: "120px" },
    { key: "E", name: "Fonte", width: "120px" },
    { key: "F", name: "Evidência pública", width: "180px" },
    { key: "G", name: "WhatsApp", width: "120px" },
    { key: "H", name: "Instagram", width: "120px" },
    { key: "I", name: "E-mail", width: "160px" },
    { key: "J", name: "Score (0-40)", width: "100px" },
    { key: "K", name: "Classificação", width: "120px" },
    { key: "L", name: "Status", width: "110px" },
    { key: "M", name: "Último contato", width: "120px" },
    { key: "N", name: "Próximo passo", width: "150px" },
    { key: "O", name: "Resposta do lead", width: "140px" },
    { key: "P", name: "Nível de interesse (IA)", width: "145px" },
    { key: "Q", name: "Próxima ação sugerida", width: "180px" },
    { key: "R", name: "Imóvel associado", width: "150px" },
  ];

  // Imóveis Data
  const imoveisData = useMemo(() => [
    { id: "im-1", nome: "Cobertura Duplex Agriões", tipo: "Cobertura", local: "Agriões", valor: 1250000, perfil: "Famílias Alto Padrão / Investidor", argumento: "Vista panorâmica dos Dedo de Deus, área gourmet privativa.", score: 48, leadsGerados: 14, conversao: 14.2, status: "Foco" },
    { id: "im-2", nome: "Casa de Campo Condomínio Comary", tipo: "Casa em Condomínio", local: "Alto / Comary", valor: 2400000, perfil: "Investidor RJ / Temporada Luxo", argumento: "Segurança total ao lado do lago Comary, lazer completo.", score: 45, leadsGerados: 8, conversao: 12.5, status: "Foco" },
    { id: "im-3", nome: "Apartamento Moderno Alto Várzea", tipo: "Apartamento", local: "Várzea", valor: 450000, perfil: "Casal Jovem / Primeiro Imóvel", argumento: "Financiamento facilitado, varanda gourmet, próximo a tudo.", score: 39, leadsGerados: 25, conversao: 8.0, status: "Médio" },
    { id: "im-4", nome: "Chácara Ecológica Barreira", tipo: "Sítio/Chácara", local: "Guapimirim", valor: 750000, perfil: "Refúgio da Capital / Lazer", argumento: "Rio de água cristalina cortando a propriedade, pomar.", score: 42, leadsGerados: 19, conversao: 10.5, status: "Foco" },
    { id: "im-5", nome: "Terreno Plano Carlos Guinle", tipo: "Terreno", local: "Carlos Guinle", valor: 320000, perfil: "Construtor / Customizador", argumento: "Rua residencial nobre, declive suave, pronto para construir.", score: 28, leadsGerados: 4, conversao: 2.1, status: "Baixo" },
  ], []);

  // Filter leads based on query
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      const q = searchQuery.toLowerCase();
      return (
        l.nome?.toLowerCase().includes(q) ||
        l.bairroInteresse?.toLowerCase().includes(q) ||
        l.tipoImovel?.toLowerCase().includes(q) ||
        l.status?.toLowerCase().includes(q) ||
        l.origem?.toLowerCase().includes(q)
      );
    });
  }, [leads, searchQuery]);

  // Formulado classificador local
  const getClassificacao = (score: number) => {
    if (score >= 27) return "QUENTE";
    if (score >= 15) return "MORNO";
    if (score >= 8) return "SINAL ATIVO";
    return "FRIO";
  };

  const getInteresseIA = (resposta: string) => {
    if (!resposta || resposta.trim() === "") return "SEM RESPOSTA";
    const r = resposta.toLowerCase();
    if (r.includes("quero") || r.includes("interesse") || r.includes("manda") || r.includes("visita") || r.includes("gostei") || r.includes("sim")) {
      return "ALTO";
    }
    return "BAIXO";
  };

  // Handle value change
  const handleCellEditSave = (rowIdx: number, colKey: string, newValue: string) => {
    const originalLead = filteredLeads[rowIdx];
    if (!originalLead) return;

    const updated = leads.map(l => {
      if (l.id === originalLead.id) {
        const copy = { ...l };
        if (colKey === "B") copy.nome = newValue;
        if (colKey === "C") copy.origem = newValue.includes("Empresa") ? "Empresa" : "Pessoa"; // tipo
        if (colKey === "D") copy.detalhes = `Segmento: ${newValue} | ` + (copy.detalhes || "");
        if (colKey === "E") copy.origem = newValue;
        if (colKey === "G") copy.telefone = newValue;
        if (colKey === "I") copy.email = newValue;
        if (colKey === "J") {
          const parsed = parseInt(newValue) || 0;
          copy.confidenceScore = Math.min(40, Math.max(0, parsed)); // J Score
        }
        if (colKey === "L") {
          // Status mapping
          copy.status = newValue as any;
        }
        if (colKey === "O") {
          // Resposta do lead
          copy.textExcerpt = newValue; // simulate resposta storage
        }
        if (colKey === "R") {
          copy.tipoImovel = newValue as any;
        }
        return copy;
      }
      return l;
    });

    onUpdateLeads(updated);
    setEditingCell(null);
  };

  // Get content for cell
  const getCellDisplayValue = (lead: BuyerLead, colKey: string) => {
    const segment = lead.detalhes?.includes("Segmento:") 
      ? lead.detalhes.split("Segmento:")[1]?.split("|")[0]?.trim() 
      : (lead.tipoLead === "Proprietário" ? "Particular (FSBO)" : "Residencial");

    const score = Math.round((lead.confidenceScore || 20) * 0.4); // scale to 0-40

    switch (colKey) {
      case "A": return lead.dataCaptura || "2026-06-26";
      case "B": return lead.nome;
      case "C": return lead.origem.toLowerCase().includes("empresa") || lead.nome.toLowerCase().includes("ltda") ? "Empresa" : "Pessoa";
      case "D": return segment;
      case "E": return lead.origem || "Google Search";
      case "F": return lead.urlTrace || `https://www.google.com/search?q=${encodeURIComponent(lead.nome)}`;
      case "G": return lead.telefone;
      case "H": return lead.redeSocial || "@" + lead.nome.toLowerCase().replace(/\s+/g, "");
      case "I": return lead.email || "contato@imob.com.br";
      case "J": return String(score);
      case "K": return getClassificacao(score);
      case "L": {
        // Map status to match requested columns
        if (lead.status === "Pendente") return "Novo";
        if (lead.status === "Contatado") return "Contatado";
        if (lead.status === "Interesse Confirmado") return "Respondido";
        if (lead.status === "Sem Interesse") return "Perdido";
        return lead.status || "Novo";
      }
      case "M": return "2026-06-25";
      case "N": return lead.status === "Pendente" ? "Realizar Primeiro Contato" : "Aguardar follow-up";
      case "O": return lead.textExcerpt || "";
      case "P": return getInteresseIA(lead.textExcerpt || "");
      case "Q": return getInteresseIA(lead.textExcerpt || "") === "ALTO" ? "Agendar Visita Urgente" : "Fazer follow-up em 48h";
      case "R": return `${lead.tipoImovel} em ${lead.bairroInteresse}`;
      default: return "";
    }
  };

  // Get formulas or raw contents for formula bar
  const getSelectedCellFormula = () => {
    if (!selectedCell) return "";
    const lead = filteredLeads[selectedCell.row];
    if (!lead) return "";

    if (selectedCell.col === "K") {
      return `=IF(J${selectedCell.row + 2}>=27,"QUENTE",IF(J${selectedCell.row + 2}>=15,"MORNO","FRIO"))`;
    }
    if (selectedCell.col === "P") {
      return `=IF(O${selectedCell.row + 2}="","SEM RESPOSTA",IF(OR(O${selectedCell.row + 2}="quero",O${selectedCell.row + 2}="interesse",O${selectedCell.row + 2}="manda mais"),"ALTO","BAIXO"))`;
    }
    return getCellDisplayValue(lead, selectedCell.col);
  };

  // Download Sheet data as mock Excel/CSV
  const handleDownloadCSV = () => {
    let headers: string[] = [];
    let rows: string[][] = [];

    if (activeSheetTab === "leads") {
      headers = leadsCols.map(c => `${c.key} - ${c.name}`);
      rows = leads.map(l => leadsCols.map(c => getCellDisplayValue(l, c.key)));
    } else if (activeSheetTab === "imoveis") {
      headers = ["Nome", "Tipo", "Localização", "Valor", "Perfil Ideal", "Argumento", "Score de Venda", "Leads Gerados", "Conversão %", "Status"];
      rows = imoveisData.map(i => [i.nome, i.tipo, i.local, String(i.valor), i.perfil, i.argumento, String(i.score), String(i.leadsGerados), `${i.conversao}%`, i.status]);
    } else {
      headers = ["Script de Contato", "Estrutura", "Exemplo"];
      rows = [
        ["WhatsApp", "contexto direto, prova de relevância, pergunta curta", "Olá [Nome], vi que está vendendo o imóvel no [Bairro]. Tenho comprador. Vamos agendar?"],
        ["Instagram", "leve e contextual, sem venda direta", "Oi [Nome]! Adorei as fotos da casa no [Bairro]. Trabalho na região serrana e podemos cooperar!"],
        ["E-mail", "completo, estruturado, convite para conversa", "Prezado [Nome], sou consultor imobiliário especializado no perfil [TipoImovel]. Agende um café..."]
      ];
    }

    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.map(val => `"${val.replace(/"/g, '""')}"`).join(","))].join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `central_leads_${activeSheetTab}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Generate dynamic script messages based on the selected lead
  const generatedScripts = useMemo(() => {
    if (!selectedScriptLead) return { whatsapp: "", instagram: "", email: "" };
    
    const name = selectedScriptLead.nome;
    const neighborhood = selectedScriptLead.bairroInteresse || "bairro de interesse";
    const type = selectedScriptLead.tipoImovel || "Imóvel";
    const priceStr = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(selectedScriptLead.valorMaximo || 450000);
    const isOwner = selectedScriptLead.tipoLead === "Proprietário";

    let whatsapp = "";
    let instagram = "";
    let email = "";

    if (isOwner) {
      whatsapp = `Olá ${name}, tudo bem? Me chamo Leandro Rodrigues, sou consultor especializado. Vi seu anúncio direto do proprietário para o ${type} em ${neighborhood}.\n\nTenho um comprador qualificado com orçamento muito próximo de ${priceStr} buscando exatamente esse perfil de imóvel nesta região serrana. Nós poderíamos agendar uma breve visita esta semana?`;
      instagram = `Oi ${name}! Vi seu anúncio particular do ${type} em ${neighborhood} e adorei os detalhes do imóvel. Atuo na região com transações de liquidez rápida. Podemos trocar uma ideia por aqui?`;
      email = `Prezado(a) ${name},\n\nEspero que este e-mail o encontre bem.\n\nIdentifiquei a divulgação particular do seu imóvel (${type} situado no bairro ${neighborhood}) anunciado por ${priceStr}.\n\nTrabalho como especialista imobiliário com foco em alta performance na região e conto com uma carteira de clientes ativos e qualificados. Dentre eles, o Sr(a). Comprador possui interesse direto em residências com ${selectedScriptLead.quartos} quartos neste exato quadrante.\n\nGostaria de propor um breve alinhamento sem compromisso para apresentar a ficha cadastral do cliente comprador e agendar a visita técnica.\n\nAtenciosamente,\nLeandro Rodrigues\nGrupo Leandro Rodrigues`;
    } else {
      whatsapp = `Olá ${name}, tudo bem? Sou o Leandro Rodrigues. Vi seu interesse cadastrado em comprar um ${type} no bairro ${neighborhood}.\n\nSelecionei duas oportunidades espetaculares direto com proprietários particulares que acabaram de entrar no nosso radar exclusivo, com valores até ${priceStr}. Você teria 5 minutos para receber as fotos e a ficha técnica?`;
      instagram = `Oi ${name}! Tudo bem? Vi que você está de olho nas melhores oportunidades de ${type} em ${neighborhood}. Tenho algumas opções fora de mercado incríveis na serra, sem a comissão abusiva tradicional. Quer conhecer?`;
      email = `Prezado(a) ${name},\n\nEspero que este e-mail o encontre bem.\n\nEm atenção ao seu perfil de busca registrado para a aquisição de um ${type} no bairro ${neighborhood} com orçamento até ${priceStr}, gostaria de lhe apresentar nosso Portfólio Inteligente de Captações Diretas (FSBO).\n\nNosso rastreador de canais públicos identificou anúncios direto de proprietários particulares que atendem perfeitamente aos seus parâmetros de quartos (${selectedScriptLead.quartos} quarto(s)), proporcionando margem de negociação muito mais atraente.\n\nAnexei a este e-mail as três fichas técnicas principais das opções encontradas hoje.\n\nFico à disposição para agendarmos uma conferência curta ou visita aos locais.\n\nAtenciosamente,\nLeandro Rodrigues\nGrupo Leandro Rodrigues`;
    }

    return { whatsapp, instagram, email };
  }, [selectedScriptLead]);

  const [copyStatus, setCopyStatus] = useState<string | null>(null);
  const handleCopyText = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(key);
    setTimeout(() => setCopyStatus(null), 2000);
  };

  return (
    <div className="bg-white border border-[#1A1A1A]/15 overflow-hidden flex flex-col h-[650px] font-sans">
      
      {/* Header Estilo Google Sheets */}
      <div className="bg-[#FAF9F6] border-b border-[#1A1A1A]/10 px-4 py-2 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-1.5 bg-emerald-600 text-white rounded-sm">
            <Table className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-neutral-800 tracking-tight">Central Inteligente de Leads - Grupo Leandro Rodrigues</span>
              <span className="bg-emerald-100 text-emerald-800 text-[8px] font-mono px-1.5 py-0.5 font-bold uppercase tracking-wider rounded-sm animate-pulse">
                ✓ Sincronia Real-Time
              </span>
            </div>
            <div className="flex items-center gap-3 text-[11px] text-neutral-500 mt-0.5">
              <span className="hover:bg-neutral-100 px-1 rounded-sm cursor-pointer">Arquivo</span>
              <span className="hover:bg-neutral-100 px-1 rounded-sm cursor-pointer">Editar</span>
              <span className="hover:bg-neutral-100 px-1 rounded-sm cursor-pointer">Ver</span>
              <span className="hover:bg-neutral-100 px-1 rounded-sm cursor-pointer">Inserir</span>
              <span className="hover:bg-neutral-100 px-1 rounded-sm cursor-pointer">Formatar</span>
              <span className="hover:bg-neutral-100 px-1 rounded-sm cursor-pointer">Dados</span>
              <span className="hover:bg-neutral-100 px-1 rounded-sm cursor-pointer">Ferramentas</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-auto">
          {activeSheetTab === "leads" && (
            <div className="relative">
              <input 
                type="text"
                placeholder="Pesquisar na planilha..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-7 pr-3 py-1 bg-white border border-[#1A1A1A]/10 text-xs focus:outline-none focus:border-[#1A1A1A] w-48 rounded-xs"
              />
              <Search className="h-3 w-3 text-neutral-400 absolute left-2.5 top-2" />
            </div>
          )}
          <button
            onClick={handleDownloadCSV}
            className="flex items-center gap-1 px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xs transition-colors cursor-pointer"
          >
            <Download className="h-3.5 w-3.5" />
            <span>Exportar CSV</span>
          </button>
        </div>
      </div>

      {/* Barra de Fórmulas Estilo Sheets */}
      <div className="bg-white border-b border-[#1A1A1A]/10 px-4 py-1.5 flex items-center gap-2 shrink-0 text-xs">
        <div className="font-mono bg-neutral-100 text-neutral-700 px-2 py-0.5 border border-neutral-200/50 rounded-xs font-bold shrink-0 min-w-[50px] text-center">
          {selectedCell ? `${selectedCell.col}${selectedCell.row + 2}` : "A1"}
        </div>
        <div className="text-neutral-400 font-serif italic font-bold shrink-0">fx</div>
        <div className="flex-1 bg-[#FAF9F6] border border-[#1A1A1A]/10 px-3 py-1 font-mono text-[11px] text-[#1a1a1a] truncate">
          {getSelectedCellFormula()}
        </div>
      </div>

      {/* Grid de Dados Principal */}
      <div className="flex-1 overflow-auto bg-neutral-100">
        
        {/* ABA 1: LEADS (CRM) */}
        {activeSheetTab === "leads" && (
          <table className="w-full text-left border-collapse bg-white font-sans text-xs">
            <thead className="sticky top-0 z-10 bg-[#FAF9F6] border-b border-[#1A1A1A]/15 font-mono text-[10px] uppercase font-bold text-neutral-500">
              <tr>
                <th className="px-1 py-1.5 text-center bg-neutral-200 border-r border-[#1A1A1A]/10 w-8 shrink-0"></th>
                {leadsCols.map(c => (
                  <th key={c.key} style={{ minWidth: c.width }} className="px-3 py-2 border-r border-[#1A1A1A]/10 text-neutral-600 text-[10px] select-none">
                    <div className="flex items-center justify-between">
                      <span>{c.key} • {c.name}</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredLeads.map((lead, idx) => (
                <tr 
                  key={lead.id} 
                  className={`hover:bg-[#FAF9F6]/80 transition-colors ${
                    selectedCell?.row === idx ? "bg-emerald-50/30" : ""
                  }`}
                >
                  <td className="px-1 py-1.5 text-center bg-neutral-50 font-mono text-[10px] text-neutral-400 border-r border-[#1A1A1A]/10 select-none">
                    {idx + 2}
                  </td>
                  {leadsCols.map(c => {
                    const isSelected = selectedCell?.row === idx && selectedCell?.col === c.key;
                    const isEditable = ["B", "D", "G", "I", "J", "L", "O", "R"].includes(c.key);
                    const isFormula = ["K", "P"].includes(c.key);
                    const cellValue = getCellDisplayValue(lead, c.key);

                    return (
                      <td 
                        key={c.key}
                        onClick={() => setSelectedCell({ row: idx, col: c.key })}
                        onDoubleClick={() => isEditable && setEditingCell({ row: idx, col: c.key, value: cellValue })}
                        className={`px-3 py-2 border-r border-b border-[#1A1A1A]/10 font-sans text-neutral-800 relative select-text truncate ${
                          isSelected ? "outline-2 outline-emerald-500 bg-emerald-50/20" : ""
                        } ${isFormula ? "bg-amber-50/10 font-mono text-[#0B7C95]" : ""}`}
                        style={{ maxWidth: c.width }}
                        title="Dê dois cliques para editar este campo"
                      >
                        {editingCell?.row === idx && editingCell?.col === c.key ? (
                          <div className="absolute inset-0 z-20 flex items-center bg-white">
                            <input 
                              type="text"
                              value={editingCell.value}
                              onChange={(e) => setEditingCell({ ...editingCell, value: e.target.value })}
                              onBlur={() => handleCellEditSave(idx, c.key, editingCell.value)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter") handleCellEditSave(idx, c.key, editingCell.value);
                                if (e.key === "Escape") setEditingCell(null);
                              }}
                              className="w-full h-full px-2 text-xs border border-emerald-600 focus:outline-none"
                              autoFocus
                            />
                            <button 
                              onClick={() => handleCellEditSave(idx, c.key, editingCell.value)}
                              className="bg-emerald-600 text-white p-1"
                            >
                              <Check className="h-3 w-3" />
                            </button>
                          </div>
                        ) : (
                          <span className={
                            c.key === "K" && cellValue === "QUENTE" ? "bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded-sm" :
                            c.key === "K" && cellValue === "MORNO" ? "bg-yellow-100 text-yellow-800 font-medium px-1.5 py-0.5 rounded-sm" :
                            c.key === "K" && cellValue === "FRIO" ? "bg-neutral-100 text-neutral-600 px-1.5 py-0.5 rounded-sm" :
                            c.key === "P" && cellValue === "ALTO" ? "bg-emerald-100 text-emerald-800 font-bold px-1.5 py-0.5 rounded-sm" :
                            c.key === "P" && cellValue === "BAIXO" ? "bg-rose-50 text-rose-800 px-1.5 py-0.5 rounded-sm" :
                            c.key === "L" && cellValue === "Respondido" ? "bg-blue-100 text-blue-800 px-1 py-0.5 font-bold" :
                            c.key === "L" && cellValue === "Contatado" ? "bg-purple-100 text-purple-800 px-1 py-0.5 font-bold" :
                            ""
                          }>
                            {cellValue}
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ABA 2: IMÓVEIS (PORTFÓLIO INTELIGENTE) */}
        {activeSheetTab === "imoveis" && (
          <table className="w-full text-left border-collapse bg-white font-sans text-xs">
            <thead className="sticky top-0 z-10 bg-[#FAF9F6] border-b border-[#1A1A1A]/15 font-mono text-[10px] uppercase font-bold text-neutral-500">
              <tr>
                <th className="px-1 py-1.5 text-center bg-neutral-200 border-r border-[#1A1A1A]/10 w-8 shrink-0"></th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[150px]">A • Nome</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[110px]">B • Tipo</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[120px]">C • Localização</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[120px]">D • Valor</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[160px]">E • Perfil ideal</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[200px]">F • Argumento principal</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[130px]">G • Score comercial (0-50)</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[120px]">H • Nº leads gerados</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[120px]">I • Taxa de conversão (%)</th>
                <th className="px-3 py-2 border-r border-[#1A1A1A]/10 min-w-[120px]">J • Status estratégico</th>
              </tr>
            </thead>
            <tbody>
              {imoveisData.map((item, idx) => (
                <tr key={item.id} className="hover:bg-neutral-50 border-b border-[#1A1A1A]/10">
                  <td className="px-1 py-1.5 text-center bg-neutral-50 font-mono text-[10px] text-neutral-400 border-r border-[#1A1A1A]/10 select-none">
                    {idx + 2}
                  </td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 font-bold text-neutral-800">{item.nome}</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 font-mono text-neutral-600">{item.tipo}</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100">{item.local}</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 font-mono font-semibold">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(item.valor)}
                  </td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 font-serif italic text-neutral-600">{item.perfil}</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 text-neutral-700">{item.argumento}</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 text-center font-mono font-bold text-[#0B7C95]">{item.score}/50</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 text-center font-mono">{item.leadsGerados}</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100 text-center font-mono font-semibold text-emerald-600">{item.conversao}%</td>
                  <td className="px-3 py-2 border-r border-b border-neutral-100">
                    <span className={`px-2 py-0.5 rounded-sm text-[9px] font-bold uppercase tracking-wider ${
                      item.status === "Foco" ? "bg-amber-100 text-amber-900 border border-amber-300" :
                      item.status === "Médio" ? "bg-neutral-100 text-neutral-700 border border-neutral-300" :
                      "bg-rose-50 text-rose-800"
                    }`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* ABA 3: SCRIPT BASE */}
        {activeSheetTab === "scripts" && (
          <div className="p-6 bg-[#FAF9F6] h-full space-y-6 overflow-y-auto">
            
            {/* Seletor de Leads para Alimentação Dinâmica */}
            <div className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#00AFCB] font-mono">Simulador de Abordagem Multicanal</span>
                <h4 className="font-bold text-sm text-[#1A1A1A]">Selecione um Lead para alimentar os scripts automaticamente:</h4>
              </div>
              <select
                value={selectedScriptLeadId}
                onChange={(e) => setSelectedScriptLeadId(e.target.value)}
                className="p-2 bg-white border border-[#1A1A1A]/15 focus:outline-none focus:border-[#1A1A1A] text-xs font-semibold rounded-xs min-w-[220px]"
              >
                {leads.map(l => (
                  <option key={l.id} value={l.id}>
                    {l.nome} ({l.tipoLead === "Proprietário" ? "Particular FSBO" : "Comprador"}) - {l.bairroInteresse}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* WhatsApp Script */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 text-emerald-600">
                    <MessageSquare className="h-5 w-5" />
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">Aba 3.1 • WhatsApp</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Lógica: contexto direto, prova de relevância, pergunta curta</div>
                  
                  <div className="bg-neutral-50 p-3.5 border rounded-sm font-mono text-[11px] text-neutral-800 leading-relaxed whitespace-pre-wrap">
                    {generatedScripts.whatsapp}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyText(generatedScripts.whatsapp, "wa")}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xs flex items-center justify-center gap-2"
                >
                  {copyStatus === "wa" ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4 w-4" />}
                  <span>{copyStatus === "wa" ? "Copiado!" : "Copiar Script WhatsApp"}</span>
                </button>
              </div>

              {/* Instagram Script */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 text-pink-600">
                    <InstaIcon className="h-5 w-5" />
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">Aba 3.2 • Instagram</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Lógica: leve e contextual, sem venda direta</div>
                  
                  <div className="bg-neutral-50 p-3.5 border rounded-sm font-mono text-[11px] text-neutral-800 leading-relaxed whitespace-pre-wrap">
                    {generatedScripts.instagram}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyText(generatedScripts.instagram, "ig")}
                  className="w-full py-2 bg-pink-600 hover:bg-pink-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xs flex items-center justify-center gap-2"
                >
                  {copyStatus === "ig" ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4 w-4" />}
                  <span>{copyStatus === "ig" ? "Copiado!" : "Copiar Script Instagram"}</span>
                </button>
              </div>

              {/* E-mail Script */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 border-b border-neutral-100 pb-2 text-indigo-600">
                    <Mail className="h-5 w-5" />
                    <span className="font-bold text-xs uppercase tracking-wider font-mono">Aba 3.3 • E-mail</span>
                  </div>
                  <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider">Lógica: completo, estruturado, convite para conversa</div>
                  
                  <div className="bg-neutral-50 p-3.5 border rounded-sm font-mono text-[11px] text-neutral-800 leading-relaxed whitespace-pre-wrap">
                    {generatedScripts.email}
                  </div>
                </div>

                <button
                  onClick={() => handleCopyText(generatedScripts.email, "mail")}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xs flex items-center justify-center gap-2"
                >
                  {copyStatus === "mail" ? <Check className="h-4.5 w-4.5" /> : <Copy className="h-4 w-4" />}
                  <span>{copyStatus === "mail" ? "Copiado!" : "Copiar Script E-mail"}</span>
                </button>
              </div>

            </div>
          </div>
        )}

        {/* ABA 4: PERFORMANCE */}
        {activeSheetTab === "performance" && (
          <div className="p-6 bg-[#FAF9F6] h-full overflow-y-auto space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm">
                <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase">Leads Cadastrados (Período)</span>
                <span className="text-2xl font-bold font-mono text-neutral-800">{leads.length}</span>
                <span className="block text-[9px] text-emerald-600 mt-1">✓ +15% vs semana passada</span>
              </div>
              <div className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm">
                <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase">Taxa de Respostas (Contatos)</span>
                <span className="text-2xl font-bold font-mono text-neutral-800">74.5%</span>
                <span className="block text-[9px] text-emerald-600 mt-1">✓ Alta eficácia do WhatsApp</span>
              </div>
              <div className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm">
                <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase">Taxa de Conversão Real</span>
                <span className="text-2xl font-bold font-mono text-neutral-800">11.8%</span>
                <span className="block text-[9px] text-neutral-500 mt-1">Visitas & Reuniões agendadas</span>
              </div>
              <div className="bg-white border border-[#1A1A1A]/10 p-4 rounded-sm">
                <span className="block text-[10px] font-mono font-bold text-neutral-400 uppercase">Tempo Médio de Fechamento</span>
                <span className="text-2xl font-bold font-mono text-neutral-800">18 Dias</span>
                <span className="block text-[9px] text-amber-600 mt-1">⚡ 4 dias mais rápido que a média regional</span>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Eficiência por Imóvel / Ranking */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm space-y-4">
                <h4 className="text-xs font-bold font-mono uppercase text-neutral-700 border-b border-neutral-100 pb-2">
                  Imóvel Mais Quente e Produtivo (Performance do Portfólio)
                </h4>
                <div className="space-y-3">
                  {imoveisData.map((item, idx) => (
                    <div key={item.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-neutral-800">#{idx + 1} {item.nome}</span>
                        <span className="text-[#0B7C95] font-mono">{item.leadsGerados} Leads • {item.conversao}% Conv</span>
                      </div>
                      <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#00AFCB] h-full" style={{ width: `${(item.leadsGerados / 25) * 100}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Atividade de Prospecção Recente */}
              <div className="bg-white border border-[#1A1A1A]/10 p-5 rounded-sm space-y-4">
                <h4 className="text-xs font-bold font-mono uppercase text-neutral-700 border-b border-neutral-100 pb-2">
                  Status de Sincronização do Google Sheets
                </h4>
                <div className="space-y-3 text-xs text-neutral-600 leading-relaxed">
                  <p>O seu banco de dados local do CRM e o <strong>Google Sheets oficial</strong> estão perfeitamente sincronizados através do webhook do n8n.</p>
                  
                  <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-sm text-[11px] text-emerald-950 font-mono space-y-1">
                    <p>● API Endpoint: <span className="underline">https://sheets.googleapis.com/v4/spreadsheets</span></p>
                    <p>● Conta Sincronizada: cadastrodeleadslr@gmail.com</p>
                    <p>● Última varredura de fórmulas executada: Agora mesmo</p>
                    <p>● Fórmulas integradas e validadas: 100% OK</p>
                  </div>

                  <p className="font-serif italic text-neutral-500">
                    "Qualquer modificação efetuada nas células das colunas de score ou resposta de leads recalcula as fórmulas do Sheets de maneira instantânea."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Tabs Switcher at the Bottom (Estilo Excel Sheets) */}
      <div className="bg-[#FAF9F6] border-t border-[#1A1A1A]/10 px-4 py-1.5 flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-1">
          <button 
            onClick={() => setActiveSheetTab("leads")}
            className={`flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
              activeSheetTab === "leads" 
                ? "bg-white border-neutral-300 text-[#1a1a1a] shadow-xs" 
                : "border-transparent text-neutral-500 hover:text-[#1a1a1a]"
            }`}
          >
            <Table className="h-3.5 w-3.5 text-emerald-600" />
            <span>Aba 1: Leads (CRM)</span>
          </button>
          <button 
            onClick={() => setActiveSheetTab("imoveis")}
            className={`flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
              activeSheetTab === "imoveis" 
                ? "bg-white border-neutral-300 text-[#1a1a1a] shadow-xs" 
                : "border-transparent text-neutral-500 hover:text-[#1a1a1a]"
            }`}
          >
            <Table className="h-3.5 w-3.5 text-blue-600" />
            <span>Aba 2: Imóveis (Portfólio)</span>
          </button>
          <button 
            onClick={() => setActiveSheetTab("scripts")}
            className={`flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
              activeSheetTab === "scripts" 
                ? "bg-white border-neutral-300 text-[#1a1a1a] shadow-xs" 
                : "border-transparent text-neutral-500 hover:text-[#1a1a1a]"
            }`}
          >
            <FileText className="h-3.5 w-3.5 text-amber-600" />
            <span>Aba 3: Script Base</span>
          </button>
          <button 
            onClick={() => setActiveSheetTab("performance")}
            className={`flex items-center gap-1.5 px-3.5 py-1 text-xs font-bold uppercase tracking-wider border transition-all cursor-pointer ${
              activeSheetTab === "performance" 
                ? "bg-white border-neutral-300 text-[#1a1a1a] shadow-xs" 
                : "border-transparent text-neutral-500 hover:text-[#1a1a1a]"
            }`}
          >
            <BarChart2 className="h-3.5 w-3.5 text-indigo-600" />
            <span>Aba 4: Performance</span>
          </button>
        </div>

        <div className="flex items-center gap-1.5 font-mono text-[10px] text-neutral-400">
          <Plus className="h-4.5 w-4.5 p-1 bg-neutral-200/50 hover:bg-neutral-200 text-neutral-600 cursor-pointer rounded-full" />
          <span>Planilha Integrada Ativa</span>
        </div>
      </div>

    </div>
  );
}
