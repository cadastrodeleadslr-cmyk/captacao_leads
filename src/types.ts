/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Imobiliaria {
  id: string;
  nome: string;
  creci: string;
  telefone: string;
  whatsapp: string; // Fomato numérico limpo para wa.me, ex: "5521971429905"
  endereco: string;
  bairro: string;
  cidade: "Teresópolis" | "Guapimirim" | "Rio de Janeiro" | "Nova Friburgo";
  descricao: string;
  site?: string;
  destacada?: boolean;
  nota: number; // ex: 4.8
  avaliacoes: number; // contagem de avaliações, ex: 142
  especialidades: string[]; // ex: ["Lançamentos", "Condomínios Fechados", "Locação"]
  imagemUrl?: string;
  logoUrl?: string;
  responsavel?: string;
  tipo?: "Imobiliária" | "Autônomo";
  status?: "Não Contatado" | "Mensagem Enviada" | "Interesse Confirmado" | "Recusado / Sem Interesse" | "Número Incorreto" | "Sem WhatsApp";
}

export interface BairroInfo {
  nome: string;
  descricao: string;
  caracteristicas: string[];
  perfil: string;
}

export interface BuyerLead {
  id: string;
  tipoLead?: "Comprador" | "Proprietário";
  nome: string;
  telefone: string;
  whatsapp: string;
  email: string;
  redeSocial?: string;
  cidade: "Teresópolis" | "Guapimirim" | "Rio de Janeiro" | "Nova Friburgo";
  bairroInteresse: string; // no caso de proprietário, Bairro do Imóvel
  tipoImovel: "Apartamento" | "Casa" | "Casa em Condomínio" | "Terreno" | "Sítio/Chácara" | "Cobertura";
  valorMaximo: number; // no caso de proprietário, Valor Solicitado
  quartos: number;
  origem: string; // flexível para Comprador/Proprietário
  dataCaptura: string;
  status: "Pendente" | "Contatado" | "Interesse Confirmado" | "Sem Interesse" | "Número Incorreto";
  detalhes?: string;
  
  // Novos campos de validação e qualidade dos dados
  confidenceScore?: number; // Score de Confiabilidade: 0 a 100
  confidenceLevel?: "Altamente Confiável" | "Dados Consistentes" | "Necessita Revisão" | "Não Recomendado";
  sourcesChecked?: string[]; // Fontes cruzadas (ex: site imobiliária, redes sociais, CRECI-RJ)
  urlTrace?: string; // URL exata de captura para auditoria
  capturedAt?: string; // Timestamp exato de captura
  textExcerpt?: string; // Trecho da página onde o contato foi encontrado
  captureMethod?: string; // Método usado
  hasInconsistencies?: boolean;
  inconsistenciesDetected?: string[];
  userFeedback?: "contato_correto" | "telefone_errado" | "nome_incorreto" | "imovel_vendido" | "imovel_alugado" | "anuncio_invalido" | null;
  _originalLeads?: BuyerLead[];
  perfilAnunciante?: string;
  analisePerfilJustificativa?: string;
  linkOrigem?: string;
  whatsappLink?: string;
  facebookLink?: string;
  instagramLink?: string;
}

export interface IntegrationInfo {
  id: string;
  key: "facebook" | "instagram" | "whatsapp" | "google" | "analytics" | "searchconsole" | "maps" | "firebase";
  name: string;
  status: "connected" | "needs_reauth" | "token_expired" | "disconnected" | "insufficient_permissions";
  user?: string;
  lastSync?: string;
  nextUpdate?: string;
  scopes?: string[];
  errorHistory?: { timestamp: string; type: string; message: string }[];
}

export interface MarketplaceOpportunity {
  id: string;
  type: "Venda" | "Aluguel";
  propertyType: "Apartamento" | "Casa" | "Casa em Condomínio" | "Terreno" | "Sítio/Chácara" | "Cobertura";
  city: "Teresópolis" | "Guapimirim" | "Rio de Janeiro" | "Nova Friburgo";
  bairro: string;
  value: number;
  date: string;
  source: "Facebook Marketplace" | "OLX" | "Grupo de Facebook" | "LinkedIn" | "ZAP Imóveis";
  contactName: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  socialProfile?: string;
  adLink: string;
  aiClassification?: "Proprietário" | "Corretor de Imóveis" | "Imobiliária" | "Investidor" | "Comprador" | "Locatário" | "Proprietário buscando locação" | "Proprietário buscando venda";
  aiConfidence?: number;
  radarScore?: number;
  urgencyLevel?: "Alta" | "Média" | "Baixa";
  details?: string;
  status?: "Novo" | "Analisado" | "Capturado" | "Ignorado";
}


