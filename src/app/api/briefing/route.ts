import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

interface BriefingItem {
  id: string;
  created_at: string;
  nome_solicitante: string;
  cargo_solicitante: string;
  empresa_nome: string;
  ramo_atuacao: string;
  estagio_empresa?: string;
  diferencial_competitivo?: string;
  email_contato: string;
  telefone_whatsapp: string;
  cidade_estado: string;
  website_atual?: string;
  o_que_sua_empresa_faz: string;
  como_sua_empresa_ganha_dinheiro: string;
  ticket_medio?: string;
  quem_e_seu_cliente_ideal: string;
  principal_dor_do_seu_cliente?: string;
  maior_objecao_ou_duvida_cliente?: string;
  conquistas_e_provas_de_autoridade?: string;
  como_clientes_te_encontram_hoje?: string;
  formato_do_site: string;
  numero_estimado_paginas: string;
  acao_principal_desejada: string;
  acao_secundaria_desejada?: string;
  recursos_desejados: string[];
  integracoes_sistemas_externos?: string;
  ja_possui_logomarca_ou_brandbook: string;
  estilo_visual_preferido: string;
  sensacao_desejada_marca?: string;
  links_de_sites_que_voce_gosta?: string;
  o_que_voce_nao_quer_no_site?: string;
  prazo_desejado: string;
  faixa_investimento: string;
  quem_aprova_o_projeto?: string;
  criterio_de_sucesso_30_dias?: string;
  observacoes_finais?: string;
  arquivos_anexos?: string[];
  status: "novo" | "em_analise" | "proposta_enviada" | "aprovado" | "concluido";
  segmento: string;
}

// Mock store em memória para persistência contínua durante a sessão
let inMemoryBriefings: BriefingItem[] = [
  {
    id: "brf-001",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    nome_solicitante: "Dra. Camila Vasconcelos",
    cargo_solicitante: "Sócia Proprietária",
    empresa_nome: "Clínica Vasconcelos Dermatologia",
    ramo_atuacao: "Saúde e Estética Avançada",
    estagio_empresa: "consolidada_modernizacao",
    diferencial_competitivo: "Atendimento médico exclusivo em consultórios privativos com dermatologia de precisão e retorno em 24h.",
    email_contato: "camila@clinicavasconcelos.med.br",
    telefone_whatsapp: "(83) 99876-5432",
    cidade_estado: "João Pessoa, PB",
    website_atual: "www.clinicavasconcelos.com.br",
    o_que_sua_empresa_faz: "Clínica médica de dermatologia clínica e estética de alto padrão.",
    como_sua_empresa_ganha_dinheiro: "agendamento_consultas",
    ticket_medio: "R$ 650 por consulta / R$ 3.500 por protocolo",
    quem_e_seu_cliente_ideal: "Mulheres e homens de 28 a 60 anos das classes A e B que buscam tratamentos preventivos e rejuvenescimento.",
    principal_dor_do_seu_cliente: "Dificuldade para agendar pelo site atual e falta de clareza sobre os procedimentos.",
    maior_objecao_ou_duvida_cliente: "Medo de resultados artificiais e dúvida sobre o tempo de recuperação.",
    conquistas_e_provas_de_autoridade: "+10 anos de atuação, mais de 4.000 pacientes atendidos, nota 4.9 no Google.",
    como_clientes_te_encontram_hoje: "indicacao_boca_a_boca",
    formato_do_site: "site_institucional_completo",
    numero_estimado_paginas: "2_a_5_paginas",
    acao_principal_desejada: "agendar_horario_online",
    acao_secundaria_desejada: "seguir_instagram",
    recursos_desejados: ["botao_whatsapp", "agendamento_online", "depoimentos_clientes", "galeria_fotos"],
    integracoes_sistemas_externos: "Google Calendar e RD Station",
    ja_possui_logomarca_ou_brandbook: "sim_tenho_tudo",
    estilo_visual_preferido: "claro_minimalista",
    sensacao_desejada_marca: "saude_e_confianca",
    links_de_sites_que_voce_gosta: "https://clinicaharmonie.com.br",
    o_que_voce_nao_quer_no_site: "Não queremos cores escuras ou poluição visual.",
    prazo_desejado: "rapido_15_dias",
    faixa_investimento: "3000_a_6000",
    quem_aprova_o_projeto: "apenas_eu",
    criterio_de_sucesso_30_dias: "Atingir pelo menos 20 agendamentos diretos pelo site no primeiro mês.",
    observacoes_finais: "Queremos fotos dos consultórios e depoimentos em vídeo.",
    arquivos_anexos: ["manual_da_marca.pdf", "logo_vetor_alta.png"],
    status: "novo",
    segmento: "Saúde e Clínicas"
  },
  {
    id: "brf-002",
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    nome_solicitante: "Rodrigo Mendonça",
    cargo_solicitante: "CEO",
    empresa_nome: "Apex Logística e Supply Chain",
    ramo_atuacao: "Transportes e Logística B2B",
    estagio_empresa: "forte_escala",
    diferencial_competitivo: "Frota 100% monitorada por telemetria com seguro total e SLA de entrega de 99.4%.",
    email_contato: "rodrigo@apexlogistica.com.br",
    telefone_whatsapp: "(11) 98123-4567",
    cidade_estado: "São Paulo, SP",
    website_atual: "",
    o_que_sua_empresa_faz: "Operações logísticas para e-commerce e indústria farmacêutica.",
    como_sua_empresa_ganha_dinheiro: "mensalidade_assinatura",
    ticket_medio: "Contratos de R$ 12.000 a R$ 45.000/mês",
    quem_e_seu_cliente_ideal: "Diretores e gerentes de suprimentos de médias e grandes indústrias.",
    principal_dor_do_seu_cliente: "Falta de rastreamento confiável e atrasos de transportadoras genéricas.",
    maior_objecao_ou_duvida_cliente: "Preocupação com custos de integração e prazo de transição.",
    conquistas_e_provas_de_autoridade: "Mais de 1 milhão de entregas realizadas, certificação ISO 9001 e ANVISA.",
    como_clientes_te_encontram_hoje: "prospeccao_ativa",
    formato_do_site: "portal_plataforma_sob_medida",
    numero_estimado_paginas: "6_a_10_paginas",
    acao_principal_desejada: "preencher_formulario_triagem",
    acao_secundaria_desejada: "baixar_material_ou_catalogo",
    recursos_desejados: ["formulario_contato", "calculadora_simulador", "botao_whatsapp"],
    integracoes_sistemas_externos: "Integração futura com ERP TOTVS e CRM HubSpot",
    ja_possui_logomarca_ou_brandbook: "sim_tenho_tudo",
    estilo_visual_preferido: "escuro_moderno",
    sensacao_desejada_marca: "inovacao_e_tecnologia",
    links_de_sites_que_voce_gosta: "https://flexport.com",
    o_que_voce_nao_quer_no_site: "Evitar animações lentas que atrapalhem o acesso corporativo rápido.",
    prazo_desejado: "normal_30_dias",
    faixa_investimento: "6000_a_15000",
    quem_aprova_o_projeto: "diretoria_conselho",
    criterio_de_sucesso_30_dias: "Captação de ao menos 15 RFPs (pedidos de cotação corporativa) no trimestre.",
    observacoes_finais: "Integração futura com nosso ERP.",
    arquivos_anexos: ["brandbook_apex.pdf"],
    status: "em_analise",
    segmento: "B2B e Corporativo"
  }
];

function classifySegment(ramo: string, oQueFaz: string): string {
  const text = (ramo + " " + oQueFaz).toLowerCase();
  if (text.includes("saúde") || text.includes("médic") || text.includes("clínic") || text.includes("odonto") || text.includes("estétic") || text.includes("psicol")) {
    return "Saúde e Clínicas";
  }
  if (text.includes("loja") || text.includes("e-commerce") || text.includes("produto") || text.includes("venda direta") || text.includes("roupa")) {
    return "E-commerce e Varejo";
  }
  if (text.includes("advocacia") || text.includes("advogad") || text.includes("jurídic") || text.includes("direito")) {
    return "Direito e Advocacia";
  }
  if (text.includes("consultoria") || text.includes("b2b") || text.includes("logística") || text.includes("software") || text.includes("tecnologia") || text.includes("indústria")) {
    return "B2B e Corporativo";
  }
  if (text.includes("imobiliár") || text.includes("imóve") || text.includes("corretor") || text.includes("engenharia") || text.includes("arquitet")) {
    return "Imobiliário e Construção";
  }
  return "Serviços e Outros";
}

export async function GET() {
  try {
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://sua-url-supabase.supabase.co") {
      const { data, error } = await supabase.from("briefings").select("*").order("created_at", { ascending: false });
      if (!error && data && data.length > 0) {
        return NextResponse.json({ success: true, briefings: data });
      }
    }
  } catch (err) {
    console.warn("Supabase fetch fallback to local store:", err);
  }

  return NextResponse.json({ success: true, briefings: inMemoryBriefings });
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const segmento = classifySegment(body.ramo_atuacao || "", body.o_que_sua_empresa_faz || "");

    const newBriefing: BriefingItem = {
      id: "brf-" + Date.now().toString().slice(-6),
      created_at: new Date().toISOString(),
      ...body,
      segmento,
      status: "novo"
    };

    inMemoryBriefings = [newBriefing, ...inMemoryBriefings];

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://sua-url-supabase.supabase.co") {
        await supabase.from("briefings").insert([newBriefing]);
      }
    } catch (e) {
      console.warn("Supabase insert fallback:", e);
    }

    return NextResponse.json({ success: true, briefing: newBriefing });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
