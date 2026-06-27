/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Calculator, Percent, Landmark, Check, HelpCircle, ShieldAlert } from "lucide-react";
import { motion } from "motion/react";

interface BankPreset {
  id: string;
  bankName: string;
  programName: string;
  rate: number;
  maxFinancing: number; // ex: 80%
  description: string;
  category: "MCMV" | "SBPE";
}

const BANK_PRESETS: BankPreset[] = [
  {
    id: "caixa-mcmv",
    bankName: "Caixa Econômica",
    programName: "Minha Casa Minha Vida",
    rate: 7.2,
    maxFinancing: 90,
    description: "Subsídios e taxas reduzidas para famílias com renda até R$ 8 mil (Faixas 1, 2 e 3).",
    category: "MCMV"
  },
  {
    id: "caixa-sbpe",
    bankName: "Caixa Econômica",
    programName: "SBPE (Poupança/TR)",
    rate: 9.79,
    maxFinancing: 80,
    description: "Linha tradicional de Poupança + TR. Excelente taxa média para imóveis novos ou usados.",
    category: "SBPE"
  },
  {
    id: "bb-sbpe",
    bankName: "Banco do Brasil",
    programName: "SBPE Clássico",
    rate: 10.15,
    maxFinancing: 80,
    description: "Crédito SBPE com bonificações de taxas para correntistas e funcionários públicos.",
    category: "SBPE"
  },
  {
    id: "itau",
    bankName: "Itaú Unibanco",
    programName: "SBPE Imobiliário",
    rate: 10.49,
    maxFinancing: 82,
    description: "Aprovação super ágil, fluxo 100% digital e financiamento de até 82% do bem.",
    category: "SBPE"
  },
  {
    id: "bradesco",
    bankName: "Banco Bradesco",
    programName: "SBPE Fácil",
    rate: 10.5,
    maxFinancing: 80,
    description: "SBPE com prestações debitadas em conta corrente e análise simplificada.",
    category: "SBPE"
  },
  {
    id: "santander",
    bankName: "Santander Brasil",
    programName: "SBPE Super Flex",
    rate: 10.79,
    maxFinancing: 80,
    description: "Financiamento de até 80% com possibilidade de composição ampla de renda familiar.",
    category: "SBPE"
  }
];

export const FinanceCalculator: React.FC = () => {
  const [propertyValue, setPropertyValue] = useState<number>(350000);
  const [downPayment, setDownPayment] = useState<number>(70000); // 20% inicial de R$350.000
  const [interestRate, setInterestRate] = useState<number>(9.79); // Taxa do preset padrão (Caixa SBPE)
  const [selectedPresetId, setSelectedPresetId] = useState<string>("caixa-sbpe");
  const [years, setYears] = useState<number>(30);
  const [amortizationSystem, setAmortizationSystem] = useState<"SAC" | "PRICE">("SAC");

  const [financedAmount, setFinancedAmount] = useState<number>(280000);
  const [monthlyInstallment, setMonthlyInstallment] = useState<number>(0);
  const [lastInstallment, setLastInstallment] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [totalFinanced, setTotalFinanced] = useState<number>(0);

  // Selecionar preset bancário
  const handleSelectPreset = (preset: BankPreset) => {
    setSelectedPresetId(preset.id);
    setInterestRate(preset.rate);
    
    // Ajustar o financiamento máximo permitido pelo banco
    const maxFinancedPercent = preset.maxFinancing / 100;
    const maxFinancedValue = propertyValue * maxFinancedPercent;
    const minDownPaymentValue = propertyValue - maxFinancedValue;
    
    if (downPayment < minDownPaymentValue) {
      setDownPayment(Math.ceil(minDownPaymentValue));
    }
  };

  // Sincronizar o valor de entrada mínimo sugerido (20%) se o preço mudar drasticamente
  useEffect(() => {
    const minDownPayment = propertyValue * 0.2;
    if (downPayment < minDownPayment) {
      setDownPayment(Math.round(minDownPayment));
    }
  }, [propertyValue]);

  useEffect(() => {
    const principal = propertyValue - downPayment;
    setFinancedAmount(principal);

    if (principal <= 0) {
      setMonthlyInstallment(0);
      setLastInstallment(0);
      setTotalInterest(0);
      setTotalFinanced(0);
      return;
    }

    const months = years * 12;
    const monthlyRate = Math.pow(1 + interestRate / 100, 1 / 12) - 1;

    if (amortizationSystem === "PRICE") {
      // Tabela PRICE: Parcelas iguais
      let pmt = 0;
      if (monthlyRate === 0) {
        pmt = principal / months;
      } else {
        pmt = (principal * (monthlyRate * Math.pow(1 + monthlyRate, months))) / (Math.pow(1 + monthlyRate, months) - 1);
      }
      setMonthlyInstallment(pmt);
      setLastInstallment(pmt);
      setTotalFinanced(pmt * months);
      setTotalInterest(pmt * months - principal);
    } else {
      // Tabela SAC: Amortizações constantes, parcelas decrescentes
      const monthlyAmortization = principal / months;
      const firstInstallment = monthlyAmortization + principal * monthlyRate;
      
      let runningPrincipal = principal;
      let totalPaid = 0;
      for (let m = 0; m < months; m++) {
        const interest = runningPrincipal * monthlyRate;
        totalPaid += (monthlyAmortization + interest);
        runningPrincipal -= monthlyAmortization;
      }
      
      const last = monthlyAmortization + monthlyAmortization * monthlyRate;

      setMonthlyInstallment(firstInstallment);
      setLastInstallment(last);
      setTotalFinanced(totalPaid);
      setTotalInterest(totalPaid - principal);
    }
  }, [propertyValue, downPayment, interestRate, years, amortizationSystem]);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      maximumFractionDigits: 0,
    }).format(val);
  };

  const activePreset = BANK_PRESETS.find(p => p.id === selectedPresetId);

  return (
    <div className="theme-bg-panel border theme-border p-6 md:p-10 max-w-5xl mx-auto space-y-8">
      {/* Cabeçalho */}
      <div className="flex items-center gap-4 pb-4 border-b theme-border-panel">
        <div className="p-2.5 accent-bg text-white">
          <Calculator className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl md:text-2xl font-bold uppercase tracking-tight theme-text-primary">
            Simulador de Crédito Imobiliário Avançado
          </h2>
          <p className="theme-text-muted text-xs font-serif italic text-left">
            Compare em tempo real as taxas médias vigentes dos maiores bancos e programas de habitação nacionais (MCMV vs. SBPE).
          </p>
        </div>
      </div>

      {/* Seção de Taxas de Bancos / Programas Oficiais */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Landmark className="h-4 w-4 accent-text" />
          <h3 className="text-xs font-bold uppercase tracking-wider theme-text-primary font-mono">
            Taxas Médias de Mercado (MCMV / SBPE) — Toque para Selecionar
          </h3>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {BANK_PRESETS.map((preset) => {
            const isSelected = selectedPresetId === preset.id;
            return (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`text-left p-4 border transition-all relative flex flex-col justify-between h-40 ${
                  isSelected
                    ? "theme-bg-card border-2 border-neutral-800 dark:border-neutral-200 shadow-sm"
                    : "bg-transparent hover:bg-neutral-500/5 theme-border"
                }`}
              >
                {isSelected && (
                  <div className="absolute top-2 right-2 p-1 accent-bg text-white rounded-full">
                    <Check className="h-3 w-3" />
                  </div>
                )}
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-bold tracking-widest uppercase theme-text-muted font-mono block">
                      {preset.bankName}
                    </span>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 font-mono uppercase ${
                      preset.category === "MCMV" 
                        ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" 
                        : "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                    }`}>
                      {preset.category}
                    </span>
                  </div>
                  
                  <h4 className="text-xs font-bold theme-text-primary uppercase tracking-tight line-clamp-1 mb-1.5">
                    {preset.programName}
                  </h4>
                  
                  <p className="text-[10px] theme-text-muted font-serif italic leading-snug line-clamp-2">
                    {preset.description}
                  </p>
                </div>

                <div className="pt-2 border-t theme-border border-dashed flex justify-between items-end">
                  <div>
                    <span className="text-[8px] uppercase font-mono theme-text-muted block">Taxa Média</span>
                    <span className="text-base font-serif italic font-bold accent-text">{preset.rate}% a.a.</span>
                  </div>
                  <div className="text-right">
                    <span className="text-[8px] uppercase font-mono theme-text-muted block">Financiamento Máx.</span>
                    <span className="text-xs font-mono font-bold theme-text-primary">{preset.maxFinancing}%</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid de Controle e Resultados */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t theme-border-panel">
        {/* Entradas */}
        <div className="space-y-6">
          {/* Valor do Imóvel */}
          <div>
            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2 font-mono">
              Valor do Imóvel: <span className="theme-text-primary font-serif italic text-base block sm:inline sm:ml-1 font-bold">{formatCurrency(propertyValue)}</span>
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="100000"
                max="3000000"
                step="50000"
                value={propertyValue}
                onChange={(e) => setPropertyValue(Number(e.target.value))}
                className="w-full h-1 bg-neutral-500/20 rounded-none appearance-none cursor-pointer accent-[var(--accent-primary)]"
              />
            </div>
          </div>

          {/* Valor da Entrada */}
          <div>
            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2 font-mono">
              Entrada Mínima: <span className="theme-text-primary font-serif italic text-base block sm:inline sm:ml-1 font-bold">{formatCurrency(downPayment)}</span> <span className="text-xs theme-text-muted font-bold font-mono">({( (downPayment / propertyValue) * 100).toFixed(0)}%)</span>
            </label>
            <input
              type="range"
              min={Math.ceil(propertyValue * (1 - (activePreset ? activePreset.maxFinancing : 80) / 100))}
              max={propertyValue * 0.9}
              step="10000"
              value={downPayment}
              onChange={(e) => setDownPayment(Number(e.target.value))}
              className="w-full h-1 bg-neutral-500/20 rounded-none appearance-none cursor-pointer accent-[var(--accent-primary)]"
            />
            {activePreset && (
              <p className="text-[10px] theme-text-muted italic mt-1.5 flex items-center gap-1">
                <ShieldAlert className="h-3 w-3 shrink-0 text-amber-500" />
                <span>
                  O limite máximo de financiamento da modalidade <strong>{activePreset.programName}</strong> exige uma entrada de no mínimo <strong>{(100 - activePreset.maxFinancing)}%</strong> ({formatCurrency(propertyValue * (1 - activePreset.maxFinancing / 100))}).
                </span>
              </p>
            )}
          </div>

          {/* Taxa de Juros Ajustável */}
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider font-mono">
                Taxa de Juros Anual (Personalizável):
              </label>
              <span className="theme-text-primary font-serif italic text-base font-bold">{interestRate}% a.a.</span>
            </div>
            <input
              type="range"
              min="4"
              max="16"
              step="0.05"
              value={interestRate}
              onChange={(e) => {
                setInterestRate(Number(e.target.value));
                setSelectedPresetId(""); // desmarca o preset se mudar manualmente
              }}
              className="w-full h-1 bg-neutral-500/20 rounded-none appearance-none cursor-pointer accent-[var(--accent-primary)]"
            />
          </div>

          {/* Prazo Anos */}
          <div>
            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-2 font-mono">
              Prazo de Pagamento: <span className="theme-text-primary font-serif italic text-base block sm:inline sm:ml-1 font-bold">{years} anos</span> <span className="text-xs theme-text-muted font-bold font-mono">({years * 12} meses)</span>
            </label>
            <input
              type="range"
              min="5"
              max="35"
              step="1"
              value={years}
              onChange={(e) => setYears(Number(e.target.value))}
              className="w-full h-1 bg-neutral-500/20 rounded-none appearance-none cursor-pointer accent-[var(--accent-primary)]"
            />
          </div>

          {/* Sistema de Amortização */}
          <div>
            <label className="block text-xs font-bold theme-text-muted uppercase tracking-wider mb-3 font-mono">
              Sistema de Amortização
            </label>
            <div className="grid grid-cols-2 gap-3 text-[11px] uppercase tracking-widest font-bold">
              <button
                type="button"
                onClick={() => setAmortizationSystem("SAC")}
                className={`py-3 px-3 transition-colors ${
                  amortizationSystem === "SAC"
                    ? "accent-bg text-white"
                    : "bg-transparent border theme-border theme-text-muted hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                }`}
              >
                Tabela SAC (Decrescentes)
              </button>
              <button
                type="button"
                onClick={() => setAmortizationSystem("PRICE")}
                className={`py-3 px-3 transition-colors ${
                  amortizationSystem === "PRICE"
                    ? "accent-bg text-white"
                    : "bg-transparent border theme-border theme-text-muted hover:border-[var(--accent-primary)] hover:text-[var(--accent-primary)]"
                }`}
              >
                PRICE (Fixas)
              </button>
            </div>
          </div>
        </div>

        {/* Resultados */}
        <div className="theme-bg-card border theme-border p-6 md:p-8 flex flex-col justify-between">
          <div className="space-y-6">
            <h3 className="font-bold uppercase tracking-wider theme-text-primary opacity-80 text-xs border-b theme-border-panel pb-2 font-mono">
              Resumo do Financiamento Comparado
            </h3>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <span className="block text-[9px] theme-text-muted uppercase font-bold tracking-widest font-mono">Valor Financiado</span>
                <span className="text-base font-serif italic theme-text-primary font-bold">{formatCurrency(financedAmount)}</span>
              </div>
              <div>
                <span className="block text-[9px] theme-text-muted uppercase font-bold tracking-widest font-mono">Valor da Entrada</span>
                <span className="text-base font-serif italic theme-text-primary font-bold">{formatCurrency(downPayment)}</span>
              </div>
            </div>

            <div className="theme-bg-panel p-5 border theme-border space-y-3">
              {amortizationSystem === "SAC" ? (
                <>
                  <div className="flex justify-between items-baseline text-xs">
                    <span className="theme-text-muted font-serif italic font-medium">Primeira Parcela (Máxima):</span>
                    <span className="text-lg font-serif italic font-bold accent-text">{formatCurrency(monthlyInstallment)}</span>
                  </div>
                  <div className="flex justify-between items-baseline text-xs pt-2 border-t theme-border">
                    <span className="theme-text-muted font-serif italic font-medium">Última Parcela (Mínima):</span>
                    <span className="text-sm font-bold theme-text-primary">{formatCurrency(lastInstallment)}</span>
                  </div>
                </>
              ) : (
                <div className="flex justify-between items-baseline text-xs">
                  <span className="theme-text-muted font-serif italic font-medium">Parcela Mensal Fixa:</span>
                  <span className="text-lg font-serif italic font-bold accent-text">{formatCurrency(monthlyInstallment)}</span>
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-2 text-xs border-t theme-border-panel">
              <div className="flex justify-between theme-text-muted">
                <span>Total Pago em Juros:</span>
                <span className="font-semibold theme-text-primary font-mono">{formatCurrency(totalInterest)}</span>
              </div>
              <div className="flex justify-between theme-text-muted font-medium">
                <span>Custo Efetivo Total:</span>
                <span className="font-semibold theme-text-primary font-mono">{formatCurrency(totalFinanced)}</span>
              </div>
              <div className="flex justify-between theme-text-primary pt-2 border-t theme-border font-bold">
                <span className="uppercase tracking-wider font-mono text-[9px] theme-text-muted">Custo Total Imóvel + Finanç:</span>
                <span className="font-serif italic text-base theme-text-primary font-bold">{formatCurrency(totalFinanced + downPayment)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8 text-[10px] theme-text-muted leading-relaxed text-left font-serif italic pt-3 border-t border-neutral-500/10 space-y-2">
            <p>
              * As taxas de juros apresentadas correspondem à média de mercado divulgada oficialmente pelos respectivos bancos para o ano de 2026. MCMV refere-se ao programa Minha Casa Minha Vida e SBPE ao Sistema Brasileiro de Poupança e Empréstimo.
            </p>
            <p>
              ** Simulação informativa baseada em juros compostos padrão. Taxas de seguros obrigatórios (MIP e DFI) e taxas de administração do contrato não estão inclusas neste cálculo referencial preliminar.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
