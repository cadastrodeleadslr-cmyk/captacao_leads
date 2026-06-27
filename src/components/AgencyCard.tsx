/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Imobiliaria } from "../types";
import { MapPin, Phone, MessageSquare, Star, Heart, Copy, Check, ExternalLink, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface AgencyCardProps {
  agency: Imobiliaria;
  index?: number;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onEdit?: (agency: Imobiliaria) => void;
  onDelete?: (id: string) => void;
  themeMode?: "light" | "dark" | "night";
  onUpdateStatus?: (id: string, status: "Não Contatado" | "Mensagem Enviada" | "Interesse Confirmado" | "Recusado / Sem Interesse" | "Número Incorreto" | "Sem WhatsApp") => void;
}

export const AgencyCard: React.FC<AgencyCardProps> = ({
  agency,
  index,
  isFavorite,
  onToggleFavorite,
  onEdit,
  onDelete,
  themeMode = "light",
  onUpdateStatus,
}) => {
  const [copied, setCopied] = useState(false);

  // Formatar link do WhatsApp com mensagem de saudação curada e personalizada
  const getWhatsAppLink = () => {
    const textMsg = `Olá! Vi o contato de vocês no Guia de Imobiliárias de ${agency.cidade} e gostaria de conversar com um corretor sobre novos imóveis.`;
    return `https://wa.me/${agency.whatsapp}?text=${encodeURIComponent(textMsg)}`;
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(agency.telefone);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Falha ao copiar telefone:", err);
    }
  };

  const isDarkOrNight = themeMode !== "light";
  const textPrimaryClass = isDarkOrNight ? "text-[#FAF9F6]" : "text-[#1A1A1A]";
  const textMutedClass = isDarkOrNight ? "text-[#FAF9F6]/60" : "text-[#1A1A1A]/60";
  const borderClass = isDarkOrNight ? "border-neutral-700" : "border-[#1A1A1A]/10";
  const bgBadge = isDarkOrNight ? "bg-neutral-800 border-neutral-700 text-[#FAF9F6]" : "bg-[#FAF9F6]/95 border-[#1A1A1A]/15 text-[#1A1A1A]";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col justify-between border-b pb-8 transition-all duration-300 ${borderClass}`}
    >
      {/* Imagem Superior - Elegant framed editorial picture box */}
      <div className={`relative h-56 w-full overflow-hidden border mb-5 ${isDarkOrNight ? "bg-neutral-900 border-neutral-800" : "bg-[#F3F1ED] border-[#1A1A1A]/5"}`}>
        <img
          src={agency.imagemUrl}
          alt={agency.nome}
          referrerPolicy="no-referrer"
          className="h-full w-full object-cover grayscale brightness-95 opacity-90 group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-[1.03] transition-all duration-700"
        />
        
        {/* Badge de Destaque */}
        {agency.destacada && (
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-[#1A1A1A] text-[#FAF9F6] text-[9px] uppercase tracking-widest font-mono font-bold px-2 py-0.5 shadow-xs">
            <Sparkles className="h-2.5 w-2.5 text-amber-400 fill-amber-400" />
            <span>Curadoria Editorial</span>
          </div>
        )}

        {/* Botão Favoritar - Sophisticated minimalist button */}
        <button
          onClick={() => onToggleFavorite(agency.id)}
          className={`absolute top-3 right-3 p-2 active:scale-95 transition-all border ${
            isDarkOrNight ? "bg-neutral-800/90 hover:bg-neutral-800 border-neutral-700 text-[#FAF9F6]" : "bg-[#FAF9F6]/90 hover:bg-[#FAF9F6] border-[#1A1A1A]/10 text-[#1A1A1A]"
          }`}
          title={isFavorite ? "Remover de favoritos" : "Salvar em favoritos"}
        >
          <Heart
            className={`h-4 w-4 transition-colors ${
              isFavorite ? "fill-current accent-text" : "opacity-60"
            }`}
          />
        </button>

        {/* Nota / Avaliações */}
        <div className={`absolute bottom-3 left-3 flex items-center gap-1 text-[10px] px-2 py-0.5 font-bold font-mono border ${bgBadge}`}>
          <Star className="h-3 w-3 fill-current" />
          <span>{agency.nota.toFixed(1)}</span>
          <span className="opacity-40">({agency.avaliacoes})</span>
        </div>

        {/* CRECI Badge */}
        <div className={`absolute bottom-3 right-3 text-[9px] font-mono px-2 py-0.5 border ${bgBadge}`}>
          CRECI {agency.creci}
        </div>
      </div>

      {/* Conteúdo do Card */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Logo, Nome e Bairro */}
          <div className="flex items-start justify-between gap-2 mb-4">
            <div className="flex items-start gap-3">
              {/* Logomarca */}
              {agency.logoUrl ? (
                <img
                  src={agency.logoUrl}
                  alt={`Logo ${agency.nome}`}
                  referrerPolicy="no-referrer"
                  className="h-11 w-11 rounded-full border theme-border object-cover shrink-0 mt-0.5 bg-white"
                />
              ) : (
                <div className="h-11 w-11 rounded-full border theme-border flex items-center justify-center font-bold font-mono text-[11px] shrink-0 mt-0.5 accent-bg-light accent-text">
                  {agency.nome.split(" ").slice(0, 2).map(w => w[0]).join("").toUpperCase().substring(0, 2)}
                </div>
              )}
              
              <div>
                <div className="flex items-baseline gap-1.5 flex-wrap">
                  {index !== undefined && (
                    <span className={`text-lg font-serif italic ${isDarkOrNight ? "text-[#FAF9F6]/20" : "text-[#1A1A1A]/30"}`}>
                      {String(index).padStart(2, "0")}.
                    </span>
                  )}
                  <h3 className={`text-base font-bold uppercase tracking-tight group-hover:accent-text transition-colors leading-tight ${textPrimaryClass}`}>
                    {agency.nome}
                  </h3>
                </div>

                {/* Responsável */}
                {agency.responsavel && (
                  <div className={`text-[11px] font-serif italic mt-0.5 flex items-center gap-1 ${textMutedClass}`}>
                    <span className="font-sans text-[8px] font-bold uppercase tracking-wider not-italic opacity-60">Responsável:</span>
                    <span className="font-medium text-current">{agency.responsavel}</span>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-1 shrink-0">
              <span className={`text-[10px] font-mono tracking-widest font-extrabold uppercase ${isDarkOrNight ? "text-[#FAF9F6]/50" : "text-[#1A1A1A]/50"}`}>
                {agency.bairro}
              </span>
              
              {agency.status && agency.status !== "Não Contatado" && (
                <span className={`text-[8px] font-mono font-extrabold uppercase px-1.5 py-0.5 border ${
                  agency.status === "Interesse Confirmado" ? "bg-green-100 border-green-300 text-green-800" :
                  agency.status === "Mensagem Enviada" ? "bg-blue-100 border-blue-300 text-blue-800" :
                  agency.status === "Recusado / Sem Interesse" ? "bg-red-100 border-red-300 text-red-800" :
                  agency.status === "Número Incorreto" ? "bg-amber-100 border-amber-300 text-amber-800" :
                  agency.status === "Sem WhatsApp" ? "bg-orange-100 border-orange-300 text-orange-800" : ""
                }`}>
                  {agency.status}
                </span>
              )}
            </div>
          </div>

          {/* Descrição - Classy serif narrative layout */}
          <p className={`text-sm leading-relaxed font-serif italic mb-4 line-clamp-3 ${isDarkOrNight ? "text-neutral-300" : "text-[#4A4A4A]"}`}>
            {agency.descricao}
          </p>

          {/* Tags / Especialidades */}
          <div className="flex flex-wrap gap-1.5 mb-5">
            {agency.especialidades.map((tag) => (
              <span
                key={tag}
                className={`text-[9px] font-mono uppercase tracking-wider font-semibold border px-2 py-0.5 ${
                  isDarkOrNight 
                    ? "bg-neutral-900 border-neutral-800 text-[#FAF9F6]/60" 
                    : "bg-[#FAF9F6] border-[#1A1A1A]/10 text-[#1A1A1A]/60"
                }`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Endereço & Ações */}
        <div className={`pt-3 border-t space-y-4 ${isDarkOrNight ? "border-neutral-800" : "border-[#1A1A1A]/5"}`}>
          <div className={`flex items-start gap-2 text-xs font-sans leading-relaxed ${textMutedClass}`}>
            <MapPin className="h-3.5 w-3.5 shrink-0 mt-0.5 opacity-60" />
            <span className="line-clamp-2">{agency.endereco}</span>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onUpdateStatus && onUpdateStatus(agency.id, "Mensagem Enviada")}
                className={`inline-block text-[11px] font-bold uppercase tracking-widest border-b-2 pb-0.5 hover:accent-text hover:border-current transition-colors ${textPrimaryClass} border-current`}
              >
                WhatsApp {agency.telefone}
              </a>
              <button
                onClick={copyToClipboard}
                className={`text-[10px] font-bold uppercase tracking-wider transition-colors ${textMutedClass} hover:text-current`}
              >
                {copied ? "Copiado!" : "Copiar Fone"}
              </button>
            </div>

            {/* Ações Rápidas de Erro de Contato */}
            {onUpdateStatus && (
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() => onUpdateStatus(agency.id, "Número Incorreto")}
                  className="flex items-center justify-center gap-1 py-1 px-2 text-[9px] font-bold uppercase tracking-wider bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 border border-amber-500/20 active:scale-95 duration-150 cursor-pointer"
                  title="Marcar Celular como Incorreto/Errado"
                >
                  ⚠️ Fone Errado
                </button>
                <button
                  type="button"
                  onClick={() => onUpdateStatus(agency.id, "Sem WhatsApp")}
                  className="flex items-center justify-center gap-1 py-1 px-2 text-[9px] font-bold uppercase tracking-wider bg-orange-500/10 hover:bg-orange-500/20 text-orange-700 border border-orange-500/20 active:scale-95 duration-150 cursor-pointer"
                  title="Marcar número como Sem WhatsApp"
                >
                  🚫 Sem Whats
                </button>
              </div>
            )}

            {/* Website Link (se houver) */}
            {agency.site && (
              <div className={`border-t pt-2 ${isDarkOrNight ? "border-neutral-800" : "border-[#1A1A1A]/5"}`}>
                <a
                  href={`https://${agency.site}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider hover:accent-text transition-colors ${textMutedClass}`}
                >
                  <span>Visitar Site Oficial</span>
                  <ExternalLink className="h-2.5 w-2.5" />
                </a>
              </div>
            )}

            {/* Gerenciamento de Leads e Contatos */}
            {(onEdit || onDelete) && (
              <div className={`flex gap-2.5 pt-2.5 border-t mt-1 justify-end ${isDarkOrNight ? "border-neutral-800" : "border-[#1A1A1A]/5"}`}>
                {onEdit && (
                  <button
                    onClick={() => onEdit(agency)}
                    className={`inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold hover:accent-text transition-colors bg-transparent border-none cursor-pointer ${textMutedClass}`}
                  >
                    Editar Lead
                  </button>
                )}
                {onEdit && onDelete && <span className="opacity-20">•</span>}
                {onDelete && (
                  <button
                    onClick={() => onDelete(agency.id)}
                    className="inline-flex items-center gap-1 text-[9px] uppercase tracking-wider font-extrabold text-red-600/70 hover:text-red-600 transition-colors bg-transparent border-none cursor-pointer"
                  >
                    Excluir Lead
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
