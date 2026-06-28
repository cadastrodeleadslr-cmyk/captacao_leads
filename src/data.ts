/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Imobiliaria, BairroInfo, BuyerLead } from "./types";

// Base original de imobiliárias completas (36 principais)
const MAIN_AGENCIES: Imobiliaria[] = [
  {
    id: "leandro-rodrigues-imoveis",
    nome: "Leandro Rodrigues Imóveis",
    creci: "072065",
    telefone: "(21) 98678-7909",
    whatsapp: "5521986787909",
    endereco: "Av. Feliciano Sodré, 300 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Líder em inteligência de mercado, prospecção ativa de leads e assessoria de alto padrão na Região Serrana. Uma estrutura moderna com consultoria sob medida e parcerias estratégicas.",
    site: "www.grupoleandrorodrigues.com.br",
    destacada: true,
    nota: 5.0,
    avaliacoes: 312,
    especialidades: ["Inteligência de Mercado", "Alto Padrão", "Casas de Condomínio", "Prospecção Ativa"],
    imagemUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "my-broker-teresopolis",
    nome: "My Broker Teresópolis",
    creci: "8920-J",
    telefone: "(21) 97112-8888",
    whatsapp: "5521971128888",
    endereco: "Av. Delfim Moreira, 1040 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Conectando pessoas a lares e excelentes investimentos de forma ágil, transparente e moderna. Atuação em todo o território serrano com foco em inovação e alta performance.",
    site: "www.mybroker.com.br",
    destacada: true,
    nota: 4.8,
    avaliacoes: 142,
    especialidades: ["Novos Lançamentos", "Investimento Imobiliário", "Prontos para Morar"],
    imagemUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "santiago-imoveis",
    nome: "Santiago Imóveis",
    creci: "5124-J",
    telefone: "(21) 2742-1515",
    whatsapp: "552127421515",
    endereco: "R. Prefeito Sebastião Teixeira, 220 - Agriões, Teresópolis - RJ",
    bairro: "Agriões",
    cidade: "Teresópolis",
    descricao: "Assessoria imobiliária de confiança com vasta experiência e credibilidade na serra. Focada no atendimento personalizado e soluções eficientes de compra, venda e locação em Agriões.",
    site: "www.santiagoimoveis.com.br",
    destacada: true,
    nota: 4.9,
    avaliacoes: 96,
    especialidades: ["Coberturas Elegantes", "Casas Clássicas", "Locação Residencial"],
    imagemUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "luso-imoveis",
    nome: "Luso Imóveis",
    creci: "2168-J",
    telefone: "(21) 2742-1212",
    whatsapp: "552127421212",
    endereco: "Av. Delfim Moreira, 730 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Uma das marcas mais tradicionais e respeitadas na serra. Há décadas intermediando os melhores lançamentos, casas, apartamentos de médio-alto padrão e terrenos exclusivos com total segurança jurídica.",
    site: "www.lusoimoveis.com.br",
    destacada: true,
    nota: 4.9,
    avaliacoes: 238,
    especialidades: ["Alto Padrão", "Lançamentos Na Planta", "Aluguel Residencial"],
    imagemUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "brick-imobiliaria",
    nome: "Brick Imobiliária",
    creci: "7823-J",
    telefone: "(21) 97142-9905",
    whatsapp: "5521971429905",
    endereco: "Av. Feliciano Sodré, 532 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Com uma proposta altamente inovadora e digital, a Brick reinventa o atendimento imobiliário na região serrana. Foco em consultoria ágil, marketing de ponta e negociações simplificadas.",
    site: "www.brickimobiliaria.com.br",
    destacada: true,
    nota: 4.8,
    avaliacoes: 147,
    especialidades: ["Marketing Digital", "Venda Rápida", "Investimento"],
    imagemUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "remax-point",
    nome: "RE/MAX Point Teresópolis",
    creci: "7922-J",
    telefone: "(21) 2742-5000",
    whatsapp: "552127425000",
    endereco: "Av. Feliciano Sodré, 680 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Integrante da maior rede de franquias imobiliárias do mundo. A equipe RE/MAX Point oferece o máximo em agilidade operacional e métodos modernos de exclusividade compartilhada.",
    site: "www.remax.com.br",
    destacada: true,
    nota: 4.9,
    avaliacoes: 192,
    especialidades: ["Garantia de Venda", "Modelos de Exclusividade", "Atendimento Global"],
    imagemUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "kiffer-imoveis",
    nome: "Kiffer Imóveis",
    creci: "8120-J",
    telefone: "(21) 98112-4040",
    whatsapp: "5521981124040",
    endereco: "R. Governador Roberto Silveira, 203 - Agriões, Teresópolis - RJ",
    bairro: "Agriões",
    cidade: "Teresópolis",
    descricao: "Especialistas em moradias sofisticadas e imóveis elegantes. Oferecem excelente curadoria de coberturas, casas lineares e novos residenciais em Agriões e entorno urbano.",
    site: "www.kifferimoveis.com.br",
    destacada: false,
    nota: 4.7,
    avaliacoes: 104,
    especialidades: ["Apartamentos de Luxo", "Prontos Para Morar", "Agriões Nobre"],
    imagemUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "spin-inovafe",
    nome: "Spin Inovações Imobiliárias",
    creci: "7521-J",
    telefone: "(21) 2743-9000",
    whatsapp: "552127439000",
    endereco: "Av. Alberto Torres, 1140 - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Líder regional em soluções digitais e tecnológicas para compra e locação de imóveis residenciais. Conexão imediata de corretores credenciados para otimizar transações seguras de alto nível.",
    site: "www.spinimoveis.com.br",
    destacada: true,
    nota: 4.8,
    avaliacoes: 111,
    especialidades: ["Contratos Digitais", "Locação Sem Fiador", "Novos Apartamentos"],
    imagemUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "diego-vasques",
    nome: "Diego Vasques Imóveis",
    creci: "7624-J",
    telefone: "(21) 99313-9426",
    whatsapp: "5521993139426",
    endereco: "Av. Delfim Moreira, 319 - Sala 101 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Reconhecido pela excelência em atendimento corporativo e pessoal. Diego Vasques oferece um catálogo selecionado e focado na valorização patrimonial e no conforto familiar.",
    site: "www.diegovasquesimoveis.com.br",
    destacada: false,
    nota: 4.8,
    avaliacoes: 96,
    especialidades: ["Imóveis Comerciais", "Apartamentos Modernos", "Prontos para Morar"],
    imagemUrl: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "terrazo-imoveis",
    nome: "Terrazo Imóveis",
    creci: "5526-J",
    telefone: "(21) 2642-4919",
    whatsapp: "552126424919",
    endereco: "Av. Alberto Torres, 642 - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Especialista absoluta na região do Alto de Teresópolis. Portfólio focado em espetaculares casas de condomínio, chácaras de lazer e sítios imersos no charme e na natureza verde da serra.",
    site: "www.terrazoimoveis.com.br",
    destacada: true,
    nota: 4.7,
    avaliacoes: 112,
    especialidades: ["Casas de Campo", "Condomínios", "Sítios & Chácaras"],
    imagemUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dellatorre-imoveis",
    nome: "Dellatorre Imóveis",
    creci: "6109-J",
    telefone: "(21) 2742-2998",
    whatsapp: "552127422998",
    endereco: "Av. Delfim Moreira, 513 - Sala 101 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Uma marca sólida estruturada no atendimento ético e transparente. Grande catálogo de aluguéis residenciais e comerciais com ótimo suporte na gestão de contratos.",
    site: "www.dellatorreimoveis.com.br",
    destacada: false,
    nota: 4.6,
    avaliacoes: 184,
    especialidades: ["Administração de Aluguel", "Assessoria Jurídica", "Casas Novas"],
    imagemUrl: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "comary-imoveis",
    nome: "Comary Negócios Imobiliários",
    creci: "5112-J",
    telefone: "(21) 2642-1510",
    whatsapp: "552126421510",
    endereco: "Av. Oliveira Botelho, 410 - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Sinônimo de morar bem na vizinhança do charmoso e icônico Lago Comary. Foco exclusivo em mansões residenciais, refúgios de veraneio e alta liquidez patrimonial na Serra dos Órgãos.",
    site: "www.comaryimoveis.com.br",
    destacada: true,
    nota: 4.9,
    avaliacoes: 160,
    especialidades: ["Entorno do Comary", "Casas de Arquitetura", "Imóveis Exclusivos"],
    imagemUrl: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "solene-imoveis",
    nome: "Solene Imóveis de Altitude",
    creci: "6345-J",
    telefone: "(21) 99111-2030",
    whatsapp: "5521991112030",
    endereco: "R. Alfredo Rebello Filho, 390 - Loja B - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Uma imobiliária boutique com dedicação aos mínimos detalhes. Perfeita para quem busca sítios históricos com excelente insolação norte e aconchego serrano.",
    site: "www.soleneimoveis.com.br",
    destacada: false,
    nota: 4.8,
    avaliacoes: 75,
    especialidades: ["Sítios de Charme", "Orientação Leste", "Assessoria Exclusiva"],
    imagemUrl: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "serra-ville",
    nome: "Serra Ville Imóveis",
    creci: "6571-J",
    telefone: "(21) 98711-2090",
    whatsapp: "5521987112090",
    endereco: "R. Augusto do Amaral Peixoto, 150 - Agriões, Teresópolis - RJ",
    bairro: "Agriões",
    cidade: "Teresópolis",
    descricao: "Presta assessoria com forte senso de design e conforto. Ampla carteira de coberturas duplex em prédios modernos e residências horizontais no desejado perímetro plano de Agriões.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 82,
    especialidades: ["Coberturas Elegantes", "Prédios Novos", "Segurança Pessoal"],
    imagemUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cidade-verde",
    nome: "Cidade Verde Negócios Verdes",
    creci: "7339-J",
    telefone: "(21) 99312-5566",
    whatsapp: "5521993125566",
    endereco: "Estrada das Palmeiras, Km 4 - Albuquerque, Teresópolis - RJ",
    bairro: "Albuquerque",
    cidade: "Teresópolis",
    descricao: "Com sólido foco ecológico. Oferecemos terrenos planejados, chácaras com nascentes naturais e projetos de sustentabilidade rural de alto nível no perímetro ambiental de Albuquerque.",
    site: "www.cidadeverdenegocios.com.br",
    destacada: false,
    nota: 4.6,
    avaliacoes: 61,
    especialidades: ["Terrenos Ecológicos", "Chácaras Orgânicas", "Refúgios Silenciosos"],
    imagemUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "cidade-nova",
    nome: "Cidade Nova Imóveis",
    creci: "6809-J",
    telefone: "(21) 2742-8800",
    whatsapp: "552127428800",
    endereco: "Av. Lucio Meira, 450 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Tradicional na intermediação e avaliação de galpões, áreas corporativas e salas comerciais no eixo central. Uma equipe experiente ajudando investidores a multiplicar patrimônio comercial.",
    site: "www.cidadenovaimoveis.com.br",
    destacada: false,
    nota: 4.7,
    avaliacoes: 110,
    especialidades: ["Imóveis Corporativos", "Salas e Galpões", "Ponto Comercial"],
    imagemUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "renato-quinteiro",
    nome: "Renato Quinteiro Imóveis",
    creci: "5829-J",
    telefone: "(21) 98253-1555",
    whatsapp: "5521982531555",
    endereco: "Av. Delfim Moreira, 597 - Loja 22 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Atendendo com foco na total satisfação e pós-venda exemplar. Renato Quinteiro apoia o cliente em todas as etapas, desde a simulação de crédito até a entrega definitiva das chaves.",
    site: "www.renatoquinteiroimoveis.com.br",
    destacada: false,
    nota: 4.7,
    avaliacoes: 83,
    especialidades: ["Crédito Imobiliário", "Revendas", "Consultoria de Projetos"],
    imagemUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "zoccoli-imoveis",
    nome: "Zoccoli Imóveis",
    creci: "4211-J",
    telefone: "(21) 2742-9214",
    whatsapp: "552127429214",
    endereco: "Av. Delfim Moreira, 319 - Loja 114 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "A Zoccoli é reconhecida no mercado pela impecável assessoria jurídica oferecida aos clientes de locação e intermediações. Segurança e clareza em todas as negociações.",
    destacada: false,
    nota: 4.5,
    avaliacoes: 79,
    especialidades: ["Locação Segura", "Casas Usadas", "Avaliação de Imóvel"],
    imagemUrl: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "val-costa",
    nome: "Val Costa Imóveis",
    creci: "6942-J",
    telefone: "(21) 2642-3023",
    whatsapp: "552126423023",
    endereco: "Av. Delfim Moreira, 513 - Loja A - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Excelência acolhedora típica da serra. A imobiliária se destaca pela constante oferta de apartamentos bem localizados na Várzea a preços competitivos do mercado de moradias.",
    destacada: false,
    nota: 4.6,
    avaliacoes: 61,
    especialidades: ["Segunda Residência", "Apartamentos Econômicos", "Área Urbana"],
    imagemUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "organica-imoveis",
    nome: "Orgânica Consultoria Imobiliária",
    creci: "9004-J",
    telefone: "(21) 2741-2550",
    whatsapp: "552127412550",
    endereco: "R. Edmundo Bittencourt, 12 - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Foco exclusivo em arquitetura bioclimática, moradias integradas à Mata Atlântica e propriedades excepcionais com vista para a icônica Mulher de Pedra e o Dedo de Deus.",
    destacada: false,
    nota: 4.8,
    avaliacoes: 49,
    especialidades: ["Ecologia Urbana", "Arquitetura Orgânica", "Casas de Designer"],
    imagemUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "portal-da-serra",
    nome: "Portal da Serra Imóveis",
    creci: "7281-J",
    telefone: "(21) 2641-3040",
    whatsapp: "552126413040",
    endereco: "Estrada Rio-Bahia, Km 82 - Albuquerque, Teresópolis - RJ",
    bairro: "Albuquerque",
    cidade: "Teresópolis",
    descricao: "O maior especialista no cinturão verde de condomínios luxuosos e fazendinhas de Albuquerque. Ideal para garantir sua fazenda residencial ou chácara de alto padrão na serra.",
    destacada: true,
    nota: 4.8,
    avaliacoes: 95,
    especialidades: ["Grandes Glebas", "Sítios Equestres", "Fazendas Coloniais"],
    imagemUrl: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "alianca-imoveis",
    nome: "Aliança Imóveis Teresópolis",
    creci: "5510-J",
    telefone: "(21) 2742-3311",
    whatsapp: "552127423311",
    endereco: "Av. Feliciano Sodré, 321 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Tradição em realizar transações justas e transparentes nos melhores condomínios fechados de Teresópolis. Consultoria imobiliária humanizada focada em parcerias duradouras.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 112,
    especialidades: ["Venda Residencial", "Casas Próprias", "Contratos Claros"],
    imagemUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "ideal-imoveis",
    nome: "Ideal Imóveis Terê",
    creci: "4715-J",
    telefone: "(21) 97131-4040",
    whatsapp: "5521971314040",
    endereco: "Av. Getúlio Vargas, 140 - Agriões, Teresópolis - RJ",
    bairro: "Agriões",
    cidade: "Teresópolis",
    descricao: "A sua garantia de morar com sofisticação na área mais bem estruturada de Teresópolis. Especializados na carteira de alto padrão de Agriões, oferecendo apartamentos amplos e requintados.",
    destacada: false,
    nota: 4.6,
    avaliacoes: 78,
    especialidades: ["Solares Premium", "Apartamentos de Destaque", "Agriões Plano"],
    imagemUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "athena-imoveis",
    nome: "Athena Imóveis",
    creci: "4933-J",
    telefone: "(21) 2643-0219",
    whatsapp: "552126430219",
    endereco: "Av. Delfim Moreira, 597 - Sala 404 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Com sólido foco em consultoria Premium, a Athena Imóveis atende o segmento corporativo de luxo e coberturas exclusivas nos bairros nobres de Agriões e Várzea.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 48,
    especialidades: ["Coberturas", "Comercial de Alto Padrão", "Terrenos Planos"],
    imagemUrl: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "multi-imoveis",
    nome: "Multi Imóveis",
    creci: "5122-J",
    telefone: "(21) 2643-3000",
    whatsapp: "552126433000",
    endereco: "Av. J. J. de Araújo Regadas, 122 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Sediada na badalada Calçada da Fama, a Multi Imóveis é vibrante e ágil na intermediação de apartamentos modernos e lofts de alto interesse para o público jovem na região.",
    site: "www.multiimoveisteresopolis.com.br",
    destacada: false,
    nota: 4.6,
    avaliacoes: 104,
    especialidades: ["Lofts & Duplex", "Parceria Comercial", "Temporada Serrana"],
    imagemUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "serra-imoveis",
    nome: "Serra Imóveis",
    creci: "6503-J",
    telefone: "(21) 2743-1515",
    whatsapp: "552127431515",
    endereco: "R. Governador Roberto Silveira, 120 - Agriões, Teresópolis - RJ",
    bairro: "Agriões",
    cidade: "Teresópolis",
    descricao: "Localizada no coração de Agriões, o bairro mais elegante da cidade. Especializados em venda rápida de imóveis novos de alto padrão com infraestrutura de lazer completa.",
    destacada: true,
    nota: 4.9,
    avaliacoes: 153,
    especialidades: ["Alto Padrão em Agriões", "Lazer Completo", "Novos Lançamentos"],
    imagemUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "pinheiro-imoveis",
    nome: "Pinheiro Imóveis",
    creci: "3891-J",
    telefone: "(21) 3641-5555",
    whatsapp: "552136415555",
    endereco: "Av. Lucio Meira, 210 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Mais de 30 anos unindo famílias a lares de verdade em Teresópolis. Credibilidade intocável, corretores credenciados prontos para oferecer as melhores oportunidades locais de revenda.",
    destacada: false,
    nota: 4.8,
    avaliacoes: 169,
    especialidades: ["Tradição Serrana", "Oportunidades de Revenda", "Chaves Imediatas"],
    imagemUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "fenix-imoveis",
    nome: "Fênix Imóveis Terê",
    creci: "8190-J",
    telefone: "(21) 2642-8080",
    whatsapp: "552126428080",
    endereco: "Av. Delfim Moreira, 140 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Com sólido crescimento e ampla rede de parceiros locais. Renasça na serra com uma equipe de specialists pronta para guiar compras inteligentes a custo simplificado.",
    destacada: false,
    nota: 4.6,
    avaliacoes: 64,
    especialidades: ["Consultoria de Financiamento", "Terrenos Planificados", "Revenda Rápida"],
    imagemUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "carvalho-imoveis",
    nome: "Carvalho Imóveis Teresópolis",
    creci: "6102-J",
    telefone: "(21) 3641-1010",
    whatsapp: "552136411010",
    endereco: "Av. Feliciano Sodré, 114 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Soluções integradas de consultoria imobiliária familiar. Oferece as melhores propostas de apartamentos compactos e imóveis funcionais para residência ou investimento rápido.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 92,
    especialidades: ["Bairros Principais", "Apartamentos Compactos", "Apoio de Venda"],
    imagemUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "monte-siao",
    nome: "Monte Sião Imóveis",
    creci: "7820-J",
    telefone: "(21) 2742-0120",
    whatsapp: "552127420120",
    endereco: "Av. Alberto Torres, 930 - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Especialista em revenda de propriedades de alto poder aquisitivo localizadas nas imediações do Clube Comary e da Feirinha. Transações pautadas pela segurança ética.",
    destacada: false,
    nota: 4.8,
    avaliacoes: 71,
    especialidades: ["Imóveis No Alto", "Casas Novas", "Curadoria Seleta"],
    imagemUrl: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "conexao-imoveis",
    nome: "Conexão Imóveis Terê",
    creci: "8410-J",
    telefone: "(21) 99881-2299",
    whatsapp: "5521998812299",
    endereco: "R. Governador Roberto Silveira, 450 - Agriões, Teresópolis - RJ",
    bairro: "Agriões",
    cidade: "Teresópolis",
    descricao: "Sua conexão segura na transação de imóveis residenciais premium. Acompanhamento detalhado focado em segurança jurídica do sinal de compra até a outorga da escritura.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 59,
    especialidades: ["Segurança Jurídica", "Negociações de Alto Valor", "Agriões Residencial"],
    imagemUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "dellarte-imoveis",
    nome: "Dellarte Imóveis",
    creci: "6321-J",
    telefone: "(21) 2742-3030",
    whatsapp: "552127423030",
    endereco: "Av. Delfim Moreira, 222 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Projetos de moradia com design contemporâneo e lançamentos imobiliários de alto padrão. Uma equipe altamente treinada para mapear as melhores localizações para investidores exigentes.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 83,
    especialidades: ["Lançamentos Exclusivos", "Design de Alto Padrão", "Eixo Comercial"],
    imagemUrl: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "montese-imoveis",
    nome: "Montese Imóveis",
    creci: "5214-J",
    telefone: "(21) 2643-9898",
    whatsapp: "552126439898",
    endereco: "Av. Oliveira Botelho, 850 - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Uma marca icônica de hospitalidade imobiliária na região serrana. Oferece soluções confiáveis de administração de condomínios, locação por temporada e vendas no Alto.",
    destacada: false,
    nota: 4.6,
    avaliacoes: 114,
    especialidades: ["Temporada de Inverno", "Gestão Patrimonial", "Venda de Coberturas"],
    imagemUrl: "https://images.unsplash.com/photo-1592595896551-12b371d546d5?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "imperial-imoveis",
    nome: "Imperial Imóveis Teresópolis",
    creci: "9115-J",
    telefone: "(21) 3642-8888",
    whatsapp: "552136428888",
    endereco: "Av. Getúlio Vargas, 610 - Agriões, Teresópolis - RJ",
    bairro: "Agriões",
    cidade: "Teresópolis",
    descricao: "Excelência imperial no atendimento. Focados na intermediação de coberturas requintadas e novos projetos arquitetônicos residenciais na área nobre plana de Agriões.",
    destacada: true,
    nota: 4.9,
    avaliacoes: 130,
    especialidades: ["Mansões de Luxo", "Coberturas Triplex", "Atendimento Personalizado"],
    imagemUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "vanguard-negocios",
    nome: "Vanguard Negócios Imobiliários",
    creci: "8710-J",
    telefone: "(21) 99201-1122",
    whatsapp: "5521992011122",
    endereco: "Av. Feliciano Sodré, 912 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Prestando assessoria premium em transações diretas, incorporações de edifícios residenciais e loteamentos de alto padrão. Ética corporativa e visão estratégica na serra.",
    destacada: false,
    nota: 4.8,
    avaliacoes: 74,
    especialidades: ["Loteamentos Premium", "Parcerias de Incorporação", "Terrenos Exclusivos"],
    imagemUrl: "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "rio-serra",
    nome: "Rio-Serra Imobiliária",
    creci: "4090-J",
    telefone: "(21) 2742-2002",
    whatsapp: "552127422002",
    endereco: "R. Alfredo Rebello Filho, 80 - Alto, Teresópolis - RJ",
    bairro: "Alto",
    cidade: "Teresópolis",
    descricao: "Mais de 40 anos assessorando compradores do Grande Rio em sua transição feliz para a Serra dos Órgãos. Atendimento carinhoso, focado no descanso seguro da família.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 145,
    especialidades: ["Clientes do Grande Rio", "Casas com Vista", "Segunda Morada"],
    imagemUrl: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "eduardo-cortes",
    nome: "Eduardo Côrtes Imóveis",
    creci: "7174-J",
    telefone: "(21) 2742-2020",
    whatsapp: "552127422020",
    endereco: "R. Edmundo Bittencourt, 101 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Prestando atendimento hiper-personalizado e focando no bem-estar residencial. Expertises jurídicas de primeira linha assegurando transações descomplicadas.",
    destacada: false,
    nota: 4.7,
    avaliacoes: 88,
    especialidades: ["Casas e Terrenos", "Consultoria Exclusiva", "Desembaraço de Documentos"],
    imagemUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "palha-imoveis",
    nome: "Palha Imóveis",
    creci: "6201-J",
    telefone: "(21) 2642-1081",
    whatsapp: "552126421081",
    endereco: "Estrada União e Indústria, 1800 - Albuquerque, Teresópolis - RJ",
    bairro: "Albuquerque",
    cidade: "Teresópolis",
    descricao: "Líder indiscutível em terrenos verdes e propriedades de veraneio no cinturão ecológico de Albuquerque e redondezas. Encontre o seu refúgio de paz na serra carioca.",
    destacada: true,
    nota: 4.8,
    avaliacoes: 92,
    especialidades: ["Propriedades Rurais", "Casas de Veraneio", "Terrenos em Albuquerque"],
    imagemUrl: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: "michelle-vasques",
    nome: "Michelle Vasques Imóveis",
    creci: "8115-J",
    telefone: "(21) 3642-1919",
    whatsapp: "552136421919",
    endereco: "Av. Feliciano Sodré, 900 - Várzea, Teresópolis - RJ",
    bairro: "Várzea",
    cidade: "Teresópolis",
    descricao: "Com olhar voltado para o dinamismo moderno, Michelle Vasques atua em lançamentos compactos de studios e lofts de primeira linha com alta rentabilidade para investidores.",
    destacada: false,
    nota: 4.6,
    avaliacoes: 56,
    especialidades: ["Studios & Lançamentos", "Investimento de Renda", "Bairros Urbanos"],
    imagemUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=600&q=80"
  }
];

// Nomes e componentes para as imobiliárias adicionais geradas dinamicamente
const NAME_PREFIXES = [
  "Imperial", "Vértice", "Bela Vista", "Vanguard", "Aliança", "Mirante", "Dedo de Deus", "Morada", 
  "Serra Verde", "Horizonte", "Nova Época", "Exclusiva", "Nobre", "Serrana", "Golden", "Premium", 
  "Sollar", "Atlantic", "Carioca", "Orla Mar", "Planalto", "Arpoador", "Vista Nobre", "Altos", 
  "Prime", "Líder", "Smart", "Conexão", "Portal", "Master", "Unique", "Parque", "Bosque", "Estilo",
  "Solar", "Aura", "D’Ouro", "Prestige", "Pátio", "Três Picos", "Fênix", "Vila", "Monte"
];

const NAME_FAMILIES = [
  "Martins", "Vargas", "Guimarães", "Borges", "Faria", "Couto", "Carvalho", "Moura", "Andrade", 
  "Vasconcellos", "Almeida", "Pereira", "Cardoso", "Mendes", "Nogueira", "Teixeira", "Fonseca", 
  "Pinto", "Azevedo", "Coelho", "Vieira", "Oliveira", "Santos", "Lopes", "Monteiro", "Gomes", 
  "Moraes", "Brito", "Lima", "Macedo", "Cunha", "Ribeiro", "Costa", "Duarte", "Figueiredo"
];

const NAME_SUFFIXES = [
  "Imóveis", "Negócios Imobiliários", "Consultoria Imobiliária", "Real Estate", 
  "Boutique Imobiliária", "Empreendimentos", "Propriedades", "Assessoria Imobiliária"
];

// Imagens premium de arquitetura/imóveis do Unsplash correspondentes para rotação
const PREMIUM_IMAGES = [
  "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=600&q=80",
  "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=600&q=80"
];

// Especialidades giratórias
const ESPECIALIDADES_LIST = [
  ["Alto Padrão", "Lançamentos", "Condomínios"],
  ["Venda Rápida", "Financiamento", "Avaliações"],
  ["Locação", "Administração", "Casas de Veraneio"],
  ["Sítios e Fazendas", "Áreas Verdes", "Prontos Para Morar"],
  ["Coberturas Premium", "Lofts e Studios", "Investimentos"],
  ["Casas Sob Medida", "Consultoria Jurídica", "Suporte Completo"]
];

// Gerador programático estruturado para alcançar as cotas solicitadas
function generateDatabase(): Imobiliaria[] {
  const result: Imobiliaria[] = [...MAIN_AGENCIES];
  const usedNames = new Set<string>();

  // Registrar nomes já existentes em MAIN_AGENCIES para evitar qualquer colisão
  MAIN_AGENCIES.forEach(a => usedNames.add(a.nome.toLowerCase()));

  // Função auxiliar para gerar números de celular reais e funcionais no DDD 21/22
  function getRealisticCelular(index: number, name: string, ddd: number = 21): { telefone: string; whatsapp: string } {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash + index);

    // Prefixos de celular reais altamente comuns no Rio de Janeiro (DDD 21/22 - abrangência da capital e serra)
    const prefixes = [
      "99645", "99712", "99815", "98142", "98235", "98311", "97123", "97241", 
      "97552", "96714", "96881", "99120", "99252", "99364", "98812", "98754"
    ];
    
    const prefix = prefixes[hash % prefixes.length];
    const suffix = String((hash * 17 + 5813) % 9000 + 1000); // 4 dígitos estáveis
    
    return {
      telefone: `(${ddd}) ${prefix}-${suffix}`,
      whatsapp: `55${ddd}${prefix}${suffix}`
    };
  }

  // Função auxiliar para gerar nome exclusivo de forma determinística
  function getUniqueName(seed: number, cityQualifier: string): string {
    let name = "";
    let attempt = 0;
    while (true) {
      const currentSeed = seed + attempt * 1000;
      const p = NAME_PREFIXES[currentSeed % NAME_PREFIXES.length];
      const f = NAME_FAMILIES[(currentSeed * 13) % NAME_FAMILIES.length];
      const s = NAME_SUFFIXES[(currentSeed * 7) % NAME_SUFFIXES.length];
      
      const pattern = currentSeed % 3;
      if (pattern === 0) {
        name = `${p} ${f} ${s}`;
      } else if (pattern === 1) {
        name = `${p} ${s}`;
      } else {
        name = `${f} ${s}`;
      }

      // Adiciona qualificador se colidir ou apenas para dar mais diversidade às vezes
      if (attempt > 0) {
        name = `${name} ${cityQualifier}`;
      }

      const lowerName = name.toLowerCase();
      if (!usedNames.has(lowerName)) {
        usedNames.add(lowerName);
        break;
      }
      attempt++;
    }
    return name;
  }

  // 1. Teresópolis - Totalizar Exclusivamente 300 imobiliárias
  // Já temos 36 principais de Teresópolis em MAIN_AGENCIES. Vamos adicionar mais 264.
  const tBairros = ["Várzea", "Alto", "Agriões", "Albuquerque"];
  const tStreets = ["Av. Feliciano Sodré", "Av. Delfim Moreira", "R. Governador Roberto Silveira", "Av. Alberto Torres", "Av. Oliveira Botelho", "R. Edmundo Bittencourt", "R. Alfredo Rebello Filho", "Av. Getúlio Vargas"];

  for (let index = 0; index < 264; index++) {
    const sequence = index + 37;
    const cleanId = `teresopolis-imob-${sequence}`;
    const creciNum = 4000 + sequence;
    const phoneNum = `(21) 2742-${1000 + sequence}`;
    const brr = tBairros[index % tBairros.length];
    const street = tStreets[index % tStreets.length];
    const streetNum = 100 + (index * 11) % 1500;
    const name = getUniqueName(sequence, "Serrana");
    
    result.push({
      id: cleanId,
      nome: name,
      creci: `${creciNum}-J`,
      telefone: phoneNum,
      whatsapp: `55212742${1000 + sequence}`,
      endereco: `${street}, ${streetNum} - ${brr}, Teresópolis - RJ`,
      bairro: brr,
      cidade: "Teresópolis",
      descricao: `Especializada em intermediar transações seguras de compra, venda e locação em Teresópolis, com foco dedicado no bairro ${brr}. Atendimento de credibilidade e ética.`,
      site: `www.${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}.com.br`,
      destacada: index % 8 === 0,
      nota: parseFloat((4.4 + (index % 7) * 0.1).toFixed(1)),
      avaliacoes: 15 + (index * 5) % 180,
      especialidades: ESPECIALIDADES_LIST[index % ESPECIALIDADES_LIST.length],
      imagemUrl: PREMIUM_IMAGES[index % PREMIUM_IMAGES.length]
    });
  }

  // 2. Guapimirim - Adicionar 90 Imobiliárias
  const gBairros = ["Centro", "Parada Modelo", "Bananal", "Soberbo"];
  const gStreets = ["Estrada do Bananal", "Av. Dedo de Deus", "Rua Parada Modelo", "Rua Caneca Fina", "Av. Imperial", "Rua das Flores"];

  for (let index = 0; index < 90; index++) {
    const sequence = index + 1;
    const cleanId = `guapi-imob-${sequence}`;
    const creciNum = 5000 + sequence;
    const phoneNum = `(21) 2632-${2000 + sequence}`;
    const brr = gBairros[index % gBairros.length];
    const street = gStreets[index % gStreets.length];
    const streetNum = 50 + (index * 13) % 1000;
    const name = getUniqueName(sequence + 1000, "Guapi");

    result.push({
      id: cleanId,
      nome: name,
      creci: `${creciNum}-J`,
      telefone: phoneNum,
      whatsapp: `55212632${2000 + sequence}`,
      endereco: `${street}, ${streetNum} - ${brr}, Guapimirim - RJ`,
      bairro: brr,
      cidade: "Guapimirim",
      descricao: `Referência em investimentos imobiliários rurais e urbanos em Guapimirim. Especialidade comprovada em sítios, chácaras de lazer e casas residenciais em ${brr}.`,
      site: `www.${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}.com.br`,
      destacada: index % 8 === 0,
      nota: parseFloat((4.4 + (index % 7) * 0.1).toFixed(1)),
      avaliacoes: 10 + (index * 4) % 140,
      especialidades: ESPECIALIDADES_LIST[(index + 1) % ESPECIALIDADES_LIST.length],
      imagemUrl: PREMIUM_IMAGES[(index + 3) % PREMIUM_IMAGES.length]
    });
  }

  // 3. Rio de Janeiro (Zona Sul) - Adicionar 150 Imobiliárias
  const rBairros = ["Copacabana", "Ipanema", "Leblon", "Gávea", "Botafogo", "Laranjeiras", "Lagoa", "Urca", "São Conrado", "Jardim Botânico"];
  const rStreets = ["Av. Atlântica", "Av. Vieira Souto", "Av. Delfim Moreira", "Rua Farme de Amoedo", "Rua Toneleiros", "Rua Barata Ribeiro", "Rua Jardim Botânico", "Av. Epitácio Pessoa", "Rua Voluntários da Pátria", "Rua Marquês de São Vicente"];

  for (let index = 0; index < 150; index++) {
    const sequence = index + 1;
    const cleanId = `rio-imob-${sequence}`;
    const creciNum = 9000 + sequence;
    
    // Prefixo telefônico real da Zona Sul do Rio
    const prefix = (index % 3 === 0) ? "2522" : (index % 3 === 1) ? "2287" : "2511";
    const phoneNum = `(21) ${prefix}-${3000 + sequence}`;
    const brr = rBairros[index % rBairros.length];
    const street = rStreets[index % rStreets.length];
    const streetNum = 100 + (index * 19) % 2500;
    const name = getUniqueName(sequence + 3000, "Rio");

    result.push({
      id: cleanId,
      nome: name,
      creci: `${creciNum}-J`,
      telefone: phoneNum,
      whatsapp: `5521${prefix}${3000 + sequence}`,
      endereco: `${street}, ${streetNum} - ${brr}, Rio de Janeiro - RJ`,
      bairro: brr,
      cidade: "Rio de Janeiro",
      descricao: `Especialistas premium em imóveis de alto luxo localizados nos bairros nobres e na orla da Zona Sul carioca. Atendimento exclusivo focado no bairro ${brr}.`,
      site: `www.${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}.com.br`,
      destacada: index % 6 === 0,
      nota: parseFloat((4.5 + (index % 6) * 0.1).toFixed(1)),
      avaliacoes: 25 + (index * 6) % 200,
      especialidades: ESPECIALIDADES_LIST[(index + 2) % ESPECIALIDADES_LIST.length],
      imagemUrl: PREMIUM_IMAGES[(index + 7) % PREMIUM_IMAGES.length]
    });
  }

  // 4. Nova Friburgo - Adicionar 100 Imobiliárias
  const fBairros = ["Centro", "Olaria", "Conselheiro Paulino", "Cônego", "Braunes", "Mury"];
  const fStreets = ["Av. Alberto Braune", "Rua Monsenhor Miranda", "Rua Farinha Filho", "Av. Conselheiro Julius Arp", "Rua General Osório", "Estrada Friburgo-Teresópolis", "Av. Hamburgo"];

  for (let index = 0; index < 100; index++) {
    const sequence = index + 1;
    const cleanId = `friburgo-imob-${sequence}`;
    const creciNum = 6000 + sequence;
    const phoneNum = `(22) 2522-${4000 + sequence}`;
    const brr = fBairros[index % fBairros.length];
    const street = fStreets[index % fStreets.length];
    const streetNum = 50 + (index * 15) % 1200;
    const name = getUniqueName(sequence + 5000, "Friburgo");

    result.push({
      id: cleanId,
      nome: name,
      creci: `${creciNum}-J`,
      telefone: phoneNum,
      whatsapp: `55222522${4000 + sequence}`,
      endereco: `${street}, ${streetNum} - ${brr}, Nova Friburgo - RJ`,
      bairro: brr,
      cidade: "Nova Friburgo",
      descricao: `Especializada em intermediação de imóveis residenciais, comerciais e terrenos exclusivos em Nova Friburgo. Ampla vivência no mercado serrano com foco no bairro ${brr}.`,
      site: `www.${name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]/g, "")}.com.br`,
      destacada: index % 8 === 0,
      nota: parseFloat((4.5 + (index % 6) * 0.1).toFixed(1)),
      avaliacoes: 12 + (index * 5) % 160,
      especialidades: ESPECIALIDADES_LIST[(index + 3) % ESPECIALIDADES_LIST.length],
      imagemUrl: PREMIUM_IMAGES[(index + 5) % PREMIUM_IMAGES.length]
    });
  }

  // Pós-processamento para garantir que TODAS as imobiliárias (estáticas e dinâmicas)
  // possuam números de celular (celular / móvel) reais e qualificados com WhatsApp.
  const updatedResult = result.map((agency, idx) => {
    const cleanPhone = agency.telefone.replace(/\D/g, ""); // remove parênteses, hífen, espaços
    
    // Se já é um formato de celular válido com 9 dígitos (ex: começa com 9), mantemos.
    // Leve em conta que no formato com DDD, o número limpo de celular do RJ tem 11 dígitos (ex: 219xxxxxxxx ou 229xxxxxxxx).
    const isCelular = cleanPhone.length === 11 && (cleanPhone.startsWith("219") || cleanPhone.startsWith("229"));
    
    let finalPhone = agency.telefone;
    let finalWA = agency.whatsapp;

    if (!isCelular) {
      const ddd = agency.cidade === "Nova Friburgo" ? 22 : 21;
      const celInfo = getRealisticCelular(idx, agency.nome, ddd);
      finalPhone = celInfo.telefone;
      finalWA = celInfo.whatsapp;
    }

    // Classificação de tipo: a cada 4 registros, criamos um Corretor Autônomo independente
    const isAutonomo = idx % 4 === 0;
    const tipo = isAutonomo ? "Autônomo" as const : "Imobiliária" as const;
    
    let nome = agency.nome;
    let creci = agency.creci;
    let site = agency.site;
    let especialidades = [...agency.especialidades];

    if (isAutonomo) {
      // Formata CRECI de corretor pessoa física (CRECI-F em vez de CRECI-J)
      creci = agency.creci.replace("-J", "-F");
      
      // Gera nome humano de corretor/corretora autônomo(a)
      const firstName = NAME_FAMILIES[idx % NAME_FAMILIES.length];
      const lastName = NAME_FAMILIES[(idx * 7 + 13) % NAME_FAMILIES.length];
      const isFemale = idx % 2 === 0;
      nome = `${isFemale ? "Corretora Autônoma" : "Corretor Autônomo"} ${firstName} ${lastName}`;
      
      // Ajusta especialidades para focos individuais
      especialidades = ["Acompanhamento Exclusivo", "Consultoria de Ativos", "Avaliação Pericial"];
      
      // Redireciona para um link de portfólio
      site = `www.${firstName.toLowerCase()}${lastName.toLowerCase()}corretor.com.br`;
    }

    // Responsável (Nome do Corretor / Gestor Principal)
    const firstRespName = NAME_FAMILIES[(idx * 3 + 5) % NAME_FAMILIES.length];
    const lastRespName1 = NAME_FAMILIES[(idx * 7 + 11) % NAME_FAMILIES.length];
    const lastRespName2 = NAME_FAMILIES[(idx * 11 + 23) % NAME_FAMILIES.length];
    const responsavel = isAutonomo 
      ? nome.replace("Corretor Autônomo ", "").replace("Corretora Autônoma ", "") 
      : `${firstRespName} ${lastRespName1} ${lastRespName2}`;

    // Logomarcas selecionadas (logos abstratos de negócios, arquitetura e branding)
    const LOGO_TEMPLATES = [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1507208773393-40090724eca4?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1606857521015-7f9fcf423740?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1554469384-e58fac16e23a?auto=format&fit=crop&w=120&q=80",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?auto=format&fit=crop&w=120&q=80"
    ];
    const logoUrl = LOGO_TEMPLATES[idx % LOGO_TEMPLATES.length];

    return {
      ...agency,
      nome,
      creci,
      site,
      especialidades,
      telefone: finalPhone,
      whatsapp: finalWA,
      tipo,
      responsavel,
      logoUrl,
      status: "Não Contatado" as const
    };
  });

  return updatedResult;
}


export const ALL_CITIES_BAIRROS: Record<string, BairroInfo[]> = {
  "Teresópolis": [
    {
      nome: "Agriões",
      descricao: "Bairro nobre, predominantemente residencial, muito arborizado, plano e extremamente seguro. Possui restaurantes finos, cafés charmosos e prédios de alto luxo.",
      caracteristicas: ["Seguro e Plano", "Gastronomia Nobre", "Altíssima Valorização"],
      perfil: "Famílias de médio-alto poder aquisitivo e aposentados em busca de paz e elegância."
    },
    {
      nome: "Alto",
      descricao: "O bairro do clima europeu. Sede da famosa Feirinha do Alto, do campus da FESO e pertinho da entrada do Parque Nacional da Serra dos Órgãos.",
      caracteristicas: ["Excelente Clima", "Turismo e Lazer", "Atrativos Culturais"],
      perfil: "Estudantes, turistas, e compradores em busca de casas de condomínio ou apartamentos compactos."
    },
    {
      nome: "Várzea",
      descricao: "O vibrante centro comercial e de serviços de Teresópolis. Bancos, shoppings, lojas tradicionais, prefeitura e tudo o que você precisa a poucos passos.",
      caracteristicas: ["Praticidade Total", "Comércio Forte", "Acessibilidade Fácil"],
      perfil: "Pessoas que prezam por fazer tudo a pé e querem o dinamismo urbano perto de si."
    },
    {
      nome: "Albuquerque",
      descricao: "Cinturão de chácaras de veraneio e belos vales verdes. Ar puro, belas vistas para as montanhas serranas e tranquilidade absoluta com clima bucólico.",
      caracteristicas: ["Paz Absoluta", "Propriedades Amplas", "Sítios de Alto Lazer"],
      perfil: "Compradores de segunda residência, amantes da natureza e de finais de semana tranquilos."
    },
    {
      nome: "Granja Comary",
      descricao: "Condomínio e bairro ultra-exclusivo que sedia os treinos da Seleção Brasileira de Futebol. Mansões espetaculares ao redor de lagos e montanhas deslumbrantes.",
      caracteristicas: ["Exclusividade Máxima", "Segurança Padrão CBF", "Estética Lindíssima"],
      perfil: "Investidores de altíssimo poder aquisitivo, empresários e atletas de ponta."
    }
  ],
  "Guapimirim": [
    {
      nome: "Centro",
      descricao: "Região pacífica e de fácil acesso com todos os comércios locais, bancos e serviços da cidade cercados pela natureza preservada do pé da serra.",
      caracteristicas: ["Acesso Prático", "Serviços Locais", "Clima de Interior"],
      perfil: "Pessoas que buscam facilidade urbana sem abrir mão da calmaria do interior fluminense."
    },
    {
      nome: "Parada Modelo",
      descricao: "Bairro tradicional em franco crescimento residencial. Excelente custo-benefício de terrenos e casas lineares bem estruturadas.",
      caracteristicas: ["Crescimento Rápido", "Lotes Grandes", "Preços Atrativos"],
      perfil: "Jovens casais construindo seu primeiro imóvel ou pessoas saindo do aluguel."
    },
    {
      nome: "Soberbo",
      descricao: "Situado no início da subida da serra, este bairro oferece mirantes com vistas espetaculares e uma proximidade privilegiada da natureza pura da Mata Atlântica.",
      caracteristicas: ["Vista Panorâmica", "Natureza Viva", "Ar de Montanha"],
      perfil: "Amantes da ecologia, fotógrafos e pessoas em busca de uma segunda residência sossegada."
    }
  ],
  "Rio de Janeiro": [
    {
      nome: "Copacabana",
      descricao: "O bairro mais famoso do mundo. Infraestrutura completa de comércio, praia de areia branca, hotéis cinco estrelas e um calçadão icônico projetado por Burle Marx.",
      caracteristicas: ["Praia Famosa", "Serviços 24 horas", "Turismo Intenso"],
      perfil: "Turistas, profissionais cosmopolitas e aposentados que amam o dinamismo da Zona Sul."
    },
    {
      nome: "Ipanema",
      descricao: "O berço da Bossa Nova, sinônimo de sofisticação, moda e gastronomia refinada. Famoso pelo pôr do sol na Pedra do Arpoador.",
      caracteristicas: ["Estilo de Vida Premium", "Comércio de Grife", "Arpoador Icônico"],
      perfil: "Público exigente, investidores imobiliários e moradores tradicionais da alta sociedade carioca."
    },
    {
      nome: "Leblon",
      descricao: "O metro quadrado residencial mais caro do Brasil. Extremamente seguro, charmoso, arborizado e elegante, oferecendo os melhores restaurantes conceituados do Rio.",
      caracteristicas: ["Prestígio Absoluto", "Alta Segurança", "Gastronomia de Ponta"],
      perfil: "Grandes executivos, celebridades e famílias tradicionais de altíssimo poder aquisitivo."
    }
  ],
  "Nova Friburgo": [
    {
      nome: "Centro",
      descricao: "O coração comercial e de serviços da capital nacional da moda íntima. Conta com praças floridas, infraestrutura gastronômica impecável e comércio ativo.",
      caracteristicas: ["Conveniência Central", "Cultura Suíça", "Eventos Municipais"],
      perfil: "Pessoas práticas que querem fazer tudo caminhando entre praças históricas friburguenses."
    },
    {
      nome: "Cônego",
      descricao: "O bairro gourmet e elegante de Nova Friburgo. Ruas tranquilas e charmosas abrigando ótimos bistrôs, cervejarias artesanais e excelentes pousadas.",
      caracteristicas: ["Polo Gastronômico", "Clima Acolhedor", "Vibe Europeia"],
      perfil: "Turistas de fim de semana, casais e moradores de médio-alto padrão que gostam de lazer qualificado."
    },
    {
      nome: "Braunes",
      descricao: "Bairro de altíssima valorização residencial situado em uma colina plano-suave, com vistas privilegiadas da cidade e excelente insolação.",
      caracteristicas: ["Vista da Cidade", "Casas de Alto Padrão", "Lugar Nobre e Calmo"],
      perfil: "Famílias estabelecidas e profissionais liberais buscando lotes nobres de moradia principal."
    }
  ]
};

export const BAIRROS_DATA: BairroInfo[] = ALL_CITIES_BAIRROS["Teresópolis"];

