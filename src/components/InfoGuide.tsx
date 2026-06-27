/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { ALL_CITIES_BAIRROS } from "../data";
import { Info, Map, CheckCircle, HelpCircle, Trees, Shield } from "lucide-react";
import { motion } from "motion/react";

interface InfoGuideProps {
  selectedCity?: string;
}

export const InfoGuide: React.FC<InfoGuideProps> = ({ selectedCity = "Teresópolis" }) => {
  const currentBairros = ALL_CITIES_BAIRROS[selectedCity] || ALL_CITIES_BAIRROS["Teresópolis"];

  return (
    <div className="space-y-12 max-w-5xl mx-auto">
      {/* Seção Guia de Bairros */}
      <section className="theme-bg-panel border theme-border p-8 md:p-10">
        <div className="flex items-center gap-4 mb-8 pb-4 border-b theme-border-panel">
          <div className="p-2.5 accent-bg text-white">
            <Map className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight theme-text-primary">
              Guia de Bairros de {selectedCity}
            </h2>
            <p className="theme-text-muted text-xs font-serif italic">
              Conheça as principais regiões para morar ou investir na cidade: {selectedCity}.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {currentBairros.map((bairro, idx) => (
            <motion.div
              key={bairro.nome}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-transparent border-l-2 border-neutral-500/30 pl-6 py-1"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl font-serif italic theme-text-muted opacity-50">0{idx + 1}.</span>
                <h3 className="font-bold uppercase tracking-wide text-base theme-text-primary">{bairro.nome}</h3>
              </div>
              <p className="text-sm theme-text-primary opacity-80 leading-relaxed font-serif italic mb-4">
                {bairro.descricao}
              </p>
              
              <div className="space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {bairro.caracteristicas.map((char) => (
                    <span 
                      key={char} 
                      className="text-[9px] uppercase tracking-wider font-semibold border theme-border theme-text-muted theme-bg-card px-2.5 py-0.5"
                    >
                      {char}
                    </span>
                  ))}
                </div>
                <p className="text-xs theme-text-muted italic mt-1 font-sans">
                  <span className="font-bold uppercase tracking-wider text-[9px] theme-text-muted opacity-80 font-mono not-italic block mb-0.5">Perfil do Morador:</span>
                  {bairro.perfil}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Dicas e Conselhos de Segurança para Transações Imobiliárias */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Segurança no Creci */}
        <div className="theme-bg-card border theme-border theme-text-primary p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-amber-500 mb-6 font-bold">
              <Shield className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-mono">Conselho Editorial</span>
            </div>
            <h3 className="font-serif italic text-2xl md:text-3xl mb-4 leading-tight">
              A Importância do CRECI na sua Negociação
            </h3>
            <p className="text-sm theme-text-primary opacity-80 leading-relaxed mb-6 font-serif italic">
              O CRECI (Conselho Regional de Corretores de Imóveis) garante que você está negociando com um profissional habilitado ou uma imobiliária devidamente registrada. Na nossa listagem, todas as imobiliárias possuem o número de CRECI visível:
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Previna fraudes efetuando transferências de sinal apenas para contas de corretores credenciados ou imobiliárias registradas.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Com o CRECI ativo, você possui canais reguladores oficiais aos quais recorrer em caso de irregularidades transacionais.</span>
              </li>
              <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                <CheckCircle className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Exija sempre cópia atualizada da certidão de ônus reais do imóvel antes de firmar qualquer proposta comercial ou sinal de compra.</span>
              </li>
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t theme-border text-[10px] font-mono tracking-widest uppercase theme-text-muted">
            Guia de Contatos de {selectedCity} — RJ
          </div>
        </div>

        {/* Fatores climáticos e de geologia na serra */}
        <div className="theme-bg-panel border theme-border theme-text-primary p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 accent-text mb-6">
              <Trees className="h-4 w-4" />
              <span className="text-[10px] uppercase tracking-widest font-mono font-bold">
                {
                  selectedCity === "Rio de Janeiro" ? "Estilo Cosmopolita" :
                  selectedCity === "Guapimirim" ? "Cachoeiras e Natureza" :
                  selectedCity === "Nova Friburgo" ? "Charme Europeu" : "Clima de Altitude"
                }
              </span>
            </div>
            <h3 className="font-serif italic text-2xl md:text-3xl mb-4 leading-tight">
              {
                selectedCity === "Rio de Janeiro" ? "O Que Avaliar ao Comprar na Capital Carioca" :
                selectedCity === "Guapimirim" ? "O Que Avaliar ao Comprar em Guapimirim" :
                selectedCity === "Nova Friburgo" ? "O Que Avaliar ao Comprar em Nova Friburgo" :
                "O Que Avaliar ao Comprar na Serra do Rio"
              }
            </h3>
            <p className="text-sm theme-text-primary opacity-80 leading-relaxed mb-6 font-serif italic">
              {
                selectedCity === "Rio de Janeiro" ? "O Rio de Janeiro combina o pulso de uma metrópole internacional com praias belíssimas. Negociar na capital exige foco na segurança jurídica e conveniência local:" :
                selectedCity === "Guapimirim" ? "Conhecida como o portal verde da serra, Guapimirim oferece clima tropical agradável e abundância de águas puras. Ideal para quem busca sossego e contato com a natureza:" :
                selectedCity === "Nova Friburgo" ? "Com colonização suíço-alemã, Nova Friburgo é famosa por seu clima serrano frio, moda de alta qualidade e culinária espetacular. Atente-se a pontos importantes da região:" :
                "Teresópolis oferece montanhas de tirar o fôlego e temperaturas amenas europeias que encantam. Contudo, investir na região serrana exige atenção a fatores exclusivos:"
              }
            </p>
            <ul className="space-y-4">
              {
                selectedCity === "Rio de Janeiro" ? (
                  <>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Conectividade e Mobilidade:</strong> Proximidade a linhas de metrô, ciclovias e eixos de acesso reduz consideravelmente tempos de deslocamento no trânsito carioca.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Infraestrutura de Segurança:</strong> Portaria 24 horas, sistemas de vigilância e condomínios fechados estruturados agregam valor crítico de revenda.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Ventilação Cruzada:</strong> Em apartamentos urbanos, janelas bem orientadas criam correntes de ar indispensáveis para amenizar as estações quentes de verão.</span>
                    </li>
                  </>
                ) : selectedCity === "Guapimirim" ? (
                  <>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Proximidade Ecológica:</strong> Propriedades muito próximas a rios ou reservas naturais exigem verificação rigorosa de limites florestais e diretrizes ambientais municipais.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Potencial de Sítio:</strong> Chácaras com pomares, poço artesiano de boa vazão e piscinas naturais têm altíssima liquidez de venda na região do pé de serra.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Estrutura de Lazer:</strong> Áreas com espaço gourmet bem equipado e varandas integradas ao verde proporcionam o padrão ideal de moradia local.</span>
                    </li>
                  </>
                ) : selectedCity === "Nova Friburgo" ? (
                  <>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Sistemas de Calefação:</strong> Lareiras, aquecedores centrais a gás ou pisos térmicos são extremamente valorizados no frio do inverno friburguense.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Qualidade do Acesso:</strong> Certifique-se das condições de pavimentação e drenagem pluvial nas vias de subida para bairros de montanha (como Mury ou Cônego).</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Rentabilidade por Temporada:</strong> Chalés e casas de bom gosto têm excelente ocupação via plataformas como Airbnb para casais e turistas.</span>
                    </li>
                  </>
                ) : (
                  <>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Orientação Solar:</strong> Imóveis voltados para o sol da manhã (leste) ou norte ajudam a prevenir umidade excessiva e reduzem o frio no inverno intenso da serra.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Fontes de Calefação:</strong> Itens cruciais na serra, onde as noites de inverno atingem facilmente 5°C. Sistemas de aquecimento solar ou lareiras agregam excelente valor.</span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs theme-text-primary opacity-90 font-sans">
                      <CheckCircle className="h-4 w-4 accent-text shrink-0 mt-0.5" />
                      <span><strong>Topografia do Terreno:</strong> Em encostas montanhosas, certifique-se da drenagem pluvial eficiente e da integridade física de taludes e muros de contenção.</span>
                    </li>
                  </>
                )
              }
            </ul>
          </div>
          <div className="mt-8 pt-4 border-t theme-border text-[10px] font-mono tracking-widest uppercase theme-text-muted">
            Informações Úteis de {selectedCity}
          </div>
        </div>
      </section>
    </div>
  );
};
