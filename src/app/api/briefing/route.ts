import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

// Mock store em memória para persistência contínua durante a sessão
let inMemoryBriefings: any[] = [
  {
    id: "brf-001",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    nome_solicitante: "Dra. Camila Vasconcelos",
    cargo_solicitante: "Sócia Proprietária",
    empresa_nome: "Clínica Vasconcelos Dermatologia",
    ramo_atuacao: "Saúde e Estética Avançada",
    email_contato: "camila@clinicavasconcelos.med.br",
    telefone_whatsapp: "(83) 99876-5432",
    cidade_estado: "João Pessoa, PB",
    website_atual: "www.clinicavasconcelos.com.br",
    o_que_sua_empresa_faz: "Clínica médica de dermatologia clínica e estética de alto padrão.",
    como_sua_empresa_ganha_dinheiro: "agendamento_consultas",
    quem_e_seu_cliente_ideal: "Mulheres e homens de 28 a 60 anos das classes A e B que buscam tratamentos preventivos e rejuvenescimento.",
    principal_dor_do_seu_cliente: "Dificuldade para agendar pelo site atual e falta de clareza sobre os procedimentos.",
    formato_do_site: "site_institucional_completo",
    numero_estimado_paginas: "2_a_5_paginas",
    acao_principal_desejada: "agendar_horario",
    recursos_desejados: ["botao_whatsapp", "agendamento_online", "depoimentos_clientes", "galeria_fotos"],
    ja_possui_logomarca_ou_brandbook: "sim_tenho_tudo",
    estilo_visual_preferido: "claro_minimalista",
    links_de_sites_que_voce_gosta: "https://clinicaharmonie.com.br",
    prazo_desejado: "rapido_15_dias",
    faixa_investimento: "3000_a_6000",
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
    email_contato: "rodrigo@apexlogistica.com.br",
    telefone_whatsapp: "(11) 98123-4567",
    cidade_estado: "São Paulo, SP",
    website_atual: "",
    o_que_sua_empresa_faz: "Operações logísticas para e-commerce e indústria farmacêutica.",
    como_sua_empresa_ganha_dinheiro: "mensalidade_assinatura",
    quem_e_seu_cliente_ideal: "Diretores de logística de médias e grandes empresas.",
    principal_dor_do_seu_cliente: "Buscam previsibilidade e relatórios de rastreamento em tempo real.",
    formato_do_site: "portal_ou_sistema",
    numero_estimado_paginas: "6_a_10_paginas",
    acao_principal_desejada: "preencher_formulario",
    recursos_desejados: ["formulario_contato", "calculadora_simulador", "botao_whatsapp"],
    ja_possui_logomarca_ou_brandbook: "sim_tenho_tudo",
    estilo_visual_preferido: "escuro_moderno",
    links_de_sites_que_voce_gosta: "https://flexport.com",
    prazo_desejado: "normal_30_dias",
    faixa_investimento: "6000_a_15000",
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

    const newBriefing = {
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
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
