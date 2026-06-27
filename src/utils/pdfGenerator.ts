import { jsPDF } from "jspdf";
import { Imobiliaria } from "../types";

/**
 * Função para remover acentos e caracteres especiais se houver algum problema de renderização,
 * embora a fonte Helvetica padrão do jsPDF lide bem com o charset Latin-1.
 */
function sanitizeText(text: string): string {
  // O jsPDF com fonte padrão (Helvetica) suporta caracteres Latin-1.
  // Fazemos uma higienização simples para remover quaisquer caracteres não suportados comuns.
  return text
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/—/g, "-")
    .replace(/&copy;/g, "©")
    .replace(/&bull;/g, "•");
}

export function generateAgenciesPDF(agencies: Imobiliaria[], cityName: string) {
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const margin = 15;
  const contentWidth = pageWidth - margin * 2; // 180mm

  let currentPage = 1;
  let y = margin;

  // Parâmetros de paginação e altura de linha
  const headerHeight = 25;
  const rowHeight = 24; // Altura de cada imobiliária no relatório
  const footerSpace = 15;
  const maxContentHeight = pageHeight - footerSpace;

  const drawHeader = (docInstance: jsPDF, city: string, total: number) => {
    // Fundo sutil do cabeçalho
    docInstance.setFillColor(243, 241, 237); // #F3F1ED
    docInstance.rect(margin, margin, contentWidth, 20, "F");

    // Bordas de destaque editorial
    docInstance.setDrawColor(26, 26, 26);
    docInstance.setLineWidth(0.5);
    docInstance.line(margin, margin, margin + contentWidth, margin);
    docInstance.line(margin, margin + 20, margin + contentWidth, margin + 20);

    // Título Principal
    docInstance.setTextColor(26, 26, 26);
    docInstance.setFont("helvetica", "bold");
    docInstance.setFontSize(11);
    docInstance.text(
      sanitizeText(`GUIA EDITORIAL DE IMOBILIÁRIAS — EDICÃO 2026`),
      margin + 5,
      margin + 8
    );

    // Cidade e Subtítulo
    docInstance.setFont("helvetica", "oblique");
    docInstance.setFontSize(9);
    docInstance.setTextColor(90, 90, 70); // Cor mais suave
    const cleanCity = city === "Rio de Janeiro" ? "Rio de Janeiro (Zona Sul)" : city;
    docInstance.text(
      sanitizeText(`Catálogo Oficial de Impressão • Cidade: ${cleanCity} (${total} registros)`),
      margin + 5,
      margin + 14
    );

    // Data de Emissão (Direta ou formatada)
    docInstance.setFont("helvetica", "normal");
    docInstance.setFontSize(7);
    docInstance.setTextColor(120, 120, 120);
    const dateStr = new Date().toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric"
    });
    docInstance.text(`EMITIDO EM: ${dateStr}`, margin + contentWidth - 35, margin + 11);
  };

  const drawFooter = (docInstance: jsPDF, pageNum: number, totalPages: number) => {
    docInstance.setDrawColor(26, 26, 26, 0.1);
    docInstance.setLineWidth(0.2);
    docInstance.line(margin, pageHeight - 12, margin + contentWidth, pageHeight - 12);

    docInstance.setFont("helvetica", "normal");
    docInstance.setFontSize(7);
    docInstance.setTextColor(120, 120, 120);
    docInstance.text(
      sanitizeText("© 2026 Guia Editorial - Todos os direitos reservados. Foco de Utilidade Pública."),
      margin,
      pageHeight - 8
    );

    const pageStr = `Página ${pageNum} de ${totalPages}`;
    docInstance.text(pageStr, margin + contentWidth - 25, pageHeight - 8);
  };

  // Precisamos estimar o total de páginas com antecedência para poder exibir "X de Y" no rodapé
  const recordsPerPage = 10;
  const totalPages = Math.max(1, Math.ceil(agencies.length / recordsPerPage));

  // Loop principal das agências
  agencies.forEach((agency, index) => {
    // Se for o primeiro item da página ou se estourar o limite de altura, cria página/cabeçalho
    const itemIndexInPage = index % recordsPerPage;
    
    if (index === 0) {
      // Primeira página
      drawHeader(doc, cityName, agencies.length);
      y = margin + headerHeight;
    } else if (itemIndexInPage === 0) {
      // Desenha o rodapé da página que está terminando
      drawFooter(doc, currentPage, totalPages);
      
      // Adiciona nova página
      doc.addPage();
      currentPage++;
      drawHeader(doc, cityName, agencies.length);
      y = margin + headerHeight;
    }

    const currentIdx = index + 1;

    // Fundo zebrado sutil para facilitar a leitura física
    if (index % 2 === 0) {
      doc.setFillColor(250, 249, 246); // #FAF9F6
      doc.rect(margin, y, contentWidth, rowHeight - 2, "F");
    }

    // Linha divisória sutil inferior
    doc.setDrawColor(26, 26, 26, 0.08);
    doc.setLineWidth(0.15);
    doc.line(margin, y + rowHeight - 2, margin + contentWidth, y + rowHeight - 2);

    // 1. Número sequencial de índice redondo e nobre
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.setTextColor(90, 90, 70); // estilo militar/bronze
    doc.text(`#${String(currentIdx).padStart(3, "0")}`, margin + 3, y + 6);

    // 2. Nome da Imobiliária principal
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.setTextColor(26, 26, 26);
    doc.text(sanitizeText(agency.nome), margin + 15, y + 6);

    // Selo de Destaque se houver
    if (agency.destacada) {
      doc.setFillColor(90, 90, 70);
      doc.rect(margin + 15 + doc.getTextWidth(agency.nome) + 2, y + 2.5, 14, 4, "F");
      doc.setTextColor(250, 249, 246);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(5.5);
      doc.text("EDITORIAL", margin + 15 + doc.getTextWidth(agency.nome) + 3.5, y + 5.5);
    }

    // 3. CRECI e Tipo de Lead + Status CRM
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(110, 110, 110);
    const tipoLabel = agency.tipo ? `[${agency.tipo.toUpperCase()}]` : "[IMOBILIÁRIA]";
    const statusLabel = agency.status ? ` | Status CRM: ${agency.status}` : "";
    doc.text(`CRECI: ${sanitizeText(agency.creci)}   ${sanitizeText(tipoLabel)}${sanitizeText(statusLabel)}`, margin + 15, y + 10.5);

    // 4. Endereço completo
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(70, 70, 70);
    // Quebrar endereço se for longo demais
    let cleanAddr = `${agency.endereco}`;
    if (cleanAddr.length > 70) {
      cleanAddr = cleanAddr.substring(0, 67) + "...";
    }
    doc.text(sanitizeText(cleanAddr), margin + 15, y + 15);

    // 5. Especialidades
    doc.setFont("helvetica", "oblique");
    doc.setFontSize(7.5);
    doc.setTextColor(110, 110, 110);
    doc.text(
      sanitizeText(`Foco: ${agency.especialidades.join(" • ")}`),
      margin + 15,
      y + 19.5
    );

    // 6. Coluna da Direita - Contatos e Canais
    // Telefone
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(26, 26, 26);
    doc.text(`Tel: ${agency.telefone}`, margin + contentWidth - 55, y + 6);

    // WhatsApp
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(80, 80, 80);
    doc.text(`WhatsApp: WA.ME/${agency.whatsapp}`, margin + contentWidth - 55, y + 11);

    // Site oficial se houver
    if (agency.site) {
      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(90, 90, 70);
      doc.text(sanitizeText(agency.site), margin + contentWidth - 55, y + 16);
    }

    // Incrementar Y para o próximo item
    y += rowHeight;
  });

  // Fecha o rodapé da última página
  drawFooter(doc, currentPage, totalPages);

  // Nome final do arquivo higienizado
  const cleanCityFile = cityName.toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "_");
  
  doc.save(`Guia_Editorial_Imobiliarias_${cleanCityFile}_2026.pdf`);
}
