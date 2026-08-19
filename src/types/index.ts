/**
 * ARKOS Soluções Digitais — Camada de Domínio & Tipagens (Domain Types)
 * Estruturado segundo princípios de Engenharia de Software e Modelagem Formal.
 */

// ============================================================================
// 1. DOMÍNIO DE REQUISITOS & BRIEFING (REQUIREMENTS ENGINEERING)
// ============================================================================

export type FormatoSite =
  | "landing_page_unica"
  | "site_institucional_completo"
  | "loja_virtual"
  | "portal_ou_sistema";

export type NumeroPaginas =
  | "1_pagina"
  | "2_a_5_paginas"
  | "6_a_10_paginas"
  | "mais_de_10_paginas";

export type AcaoPrincipal =
  | "chamar_no_whatsapp"
  | "preencher_formulario"
  | "comprar_direto"
  | "agendar_horario"
  | "ligar_telefone";

export type FaixaInvestimento =
  | "a_partir_600"
  | "1500_a_3000"
  | "3000_a_6000"
  | "6000_a_15000"
  | "acima_15000";

export type PrazoDesejado =
  | "urgente_15_dias"
  | "normal_30_dias"
  | "45_a_60_dias"
  | "flexivel";

export type StatusBriefing =
  | "recebido"
  | "em_analise"
  | "proposta_enviada"
  | "fechado"
  | "arquivado";

export interface BriefingInput {
  // Identificação e Contato
  nome_solicitante: string;
  cargo_solicitante: string;
  empresa_nome: string;
  ramo_atuacao: string;
  email_contato: string;
  telefone_whatsapp: string;
  cidade_estado: string;
  website_atual?: string;

  // Modelo de Negócio e Persona
  o_que_sua_empresa_faz: string;
  como_sua_empresa_ganha_dinheiro: string;
  quem_e_seu_cliente_ideal: string;
  principal_dor_do_seu_cliente?: string;
  por_que_o_cliente_escolhe_voce?: string;

  // Requisitos Funcionais do Site
  formato_do_site: FormatoSite;
  numero_estimado_paginas?: NumeroPaginas;
  acao_principal_desejada: AcaoPrincipal;
  recursos_desejados: string[];
  outros_sistemas_para_integrar?: string;

  // Visual e Referências
  ja_possui_logomarca_ou_brandbook?: string;
  estilo_visual_preferido?: string;
  links_de_sites_que_voce_gosta?: string;
  arquivos_anexos?: string[];

  // Governança e Orçamento
  prazo_desejado?: PrazoDesejado;
  faixa_investimento: FaixaInvestimento;
  observacoes_finais?: string;
}

export interface BriefingRecord extends BriefingInput {
  id: string;
  created_at: string;
  updated_at: string;
  status: StatusBriefing;
}

export interface BriefingAnexoRecord {
  id: string;
  briefing_id: string;
  created_at: string;
  nome_arquivo: string;
  tipo_arquivo?: string;
  url_arquivo?: string;
  tamanho_bytes?: number;
}

// ============================================================================
// 2. DOMÍNIO DE LEADS & CONTATOS (LEAD CAPTURE)
// ============================================================================

export type StatusContato = "novo" | "em_atendimento" | "convertido" | "descartado";

export interface ContatoInput {
  nome: string;
  email: string;
  telefone: string;
  empresa?: string;
  servico_interesse?: string;
  mensagem?: string;
  origem_url?: string;
}

export interface ContatoRecord extends ContatoInput {
  id: string;
  created_at: string;
  updated_at: string;
  status: StatusContato;
}

// ============================================================================
// 3. DOMÍNIO DE PRODUTO & CAPACIDADES (SERVICE PORTFOLIO)
// ============================================================================

export type Category = "experiencia" | "sistemas" | "automacao" | "consultoria";

export interface ServiceItem {
  name: string;
  categories: Category[];
  desc: string;
  items: string[];
}

export interface MethodPhase {
  step: string;
  desc: string;
}

export interface PrincipleItem {
  name: string;
  desc: string;
}
