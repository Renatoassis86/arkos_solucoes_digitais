import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const ANEXOS_BUCKET = "briefing-anexos";
const SIGNED_URL_TTL_SECONDS = 60 * 60 * 24; // 24h

export interface AnexoRef {
  name: string;
  path: string;
  url?: string;
}

async function withSignedUrls(anexos: unknown): Promise<AnexoRef[]> {
  if (!Array.isArray(anexos)) return [];
  const normalized: AnexoRef[] = anexos
    .map((a) => (typeof a === "string" ? { name: a, path: "" } : a))
    .filter((a): a is AnexoRef => !!a && typeof a === "object" && typeof a.name === "string");

  return Promise.all(
    normalized.map(async (a) => {
      if (!a.path) return a;
      const { data } = await supabaseServer.storage
        .from(ANEXOS_BUCKET)
        .createSignedUrl(a.path, SIGNED_URL_TTL_SECONDS);
      return { ...a, url: data?.signedUrl };
    })
  );
}

export interface BriefingItem {
  id: string;
  created_at: string;
  updated_at?: string;
  status: "novo" | "recebido" | "em_analise" | "proposta_enviada" | "aprovado" | "concluido";
  segmento: string;
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
  por_que_o_cliente_escolhe_voce?: string;
  conquistas_e_provas_de_autoridade?: string;
  como_clientes_te_encontram_hoje?: string;
  formato_do_site: string;
  numero_estimado_paginas: string;
  acao_principal_desejada: string;
  acao_secundaria_desejada?: string;
  recursos_desejados: string[];
  outros_sistemas_para_integrar?: string;
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
  arquivos_anexos?: AnexoRef[];
}

export function classifySegment(ramo: string = "", oQueFaz: string = ""): string {
  const text = (ramo + " " + oQueFaz).toLowerCase();
  if (
    text.includes("saúde") ||
    text.includes("saude") ||
    text.includes("médic") ||
    text.includes("medic") ||
    text.includes("clínic") ||
    text.includes("clinic") ||
    text.includes("odonto") ||
    text.includes("estétic") ||
    text.includes("estetic") ||
    text.includes("plano") ||
    text.includes("psicol")
  ) {
    return "Saúde e Clínicas";
  }
  if (
    text.includes("imobiliár") ||
    text.includes("imobiliar") ||
    text.includes("imóve") ||
    text.includes("imove") ||
    text.includes("corretor") ||
    text.includes("engenharia") ||
    text.includes("arquitet") ||
    text.includes("locação") ||
    text.includes("locacao") ||
    text.includes("condomínio")
  ) {
    return "Imobiliário e Construção";
  }
  if (
    text.includes("loja") ||
    text.includes("e-commerce") ||
    text.includes("ecommerce") ||
    text.includes("produto") ||
    text.includes("venda direta") ||
    text.includes("roupa") ||
    text.includes("calçado") ||
    text.includes("varejo")
  ) {
    return "E-commerce e Varejo";
  }
  if (
    text.includes("advocacia") ||
    text.includes("advogad") ||
    text.includes("jurídic") ||
    text.includes("juridic") ||
    text.includes("direito") ||
    text.includes("tributár")
  ) {
    return "Direito e Advocacia";
  }
  if (
    text.includes("consultoria") ||
    text.includes("b2b") ||
    text.includes("logística") ||
    text.includes("logistica") ||
    text.includes("software") ||
    text.includes("tecnologia") ||
    text.includes("indústria") ||
    text.includes("industria") ||
    text.includes("financeir") ||
    text.includes("gestão") ||
    text.includes("gestao")
  ) {
    return "B2B e Corporativo";
  }
  return "Serviços e Outros";
}

// Higieniza dados para inserção compatível com a tabela Supabase
function sanitizeForSupabase(body: Record<string, unknown>) {
  return {
    status: (body.status as string) || "novo",
    nome_solicitante: String(body.nome_solicitante || "").trim(),
    cargo_solicitante: String(body.cargo_solicitante || "").trim(),
    empresa_nome: String(body.empresa_nome || "").trim(),
    ramo_atuacao: String(body.ramo_atuacao || "").trim(),
    email_contato: String(body.email_contato || "").trim(),
    telefone_whatsapp: String(body.telefone_whatsapp || "").trim(),
    cidade_estado: String(body.cidade_estado || "").trim(),
    website_atual: String(body.website_atual || "").trim(),
    o_que_sua_empresa_faz: String(body.o_que_sua_empresa_faz || "").trim(),
    como_sua_empresa_ganha_dinheiro: String(body.como_sua_empresa_ganha_dinheiro || "").trim(),
    quem_e_seu_cliente_ideal: String(body.quem_e_seu_cliente_ideal || "").trim(),
    principal_dor_do_seu_cliente: String(body.principal_dor_do_seu_cliente || "").trim(),
    por_que_o_cliente_escolhe_voce: String(body.por_que_o_cliente_escolhe_voce || body.diferencial_competitivo || "").trim(),
    formato_do_site: String(body.formato_do_site || "landing_page_unica").trim(),
    numero_estimado_paginas: String(body.numero_estimado_paginas || "1_pagina").trim(),
    acao_principal_desejada: String(body.acao_principal_desejada || "chamar_no_whatsapp").trim(),
    recursos_desejados: Array.isArray(body.recursos_desejados) ? body.recursos_desejados : [],
    outros_sistemas_para_integrar: String(body.outros_sistemas_para_integrar || body.integracoes_sistemas_externos || "").trim(),
    ja_possui_logomarca_ou_brandbook: String(body.ja_possui_logomarca_ou_brandbook || "tenho_apenas_logo").trim(),
    estilo_visual_preferido: String(body.estilo_visual_preferido || "escuro_moderno").trim(),
    links_de_sites_que_voce_gosta: String(body.links_de_sites_que_voce_gosta || "").trim(),
    arquivos_anexos: Array.isArray(body.arquivos_anexos) ? body.arquivos_anexos : [],
    prazo_desejado: String(body.prazo_desejado || "normal_30_dias").trim(),
    faixa_investimento: String(body.faixa_investimento || "1500_a_3000").trim(),
    observacoes_finais: String(body.observacoes_finais || "").trim()
  };
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("briefings")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    // Normalizar e enriquecer os dados para o dashboard
    const enrichedBriefings: BriefingItem[] = await Promise.all(
      (data || []).map(async (row) => ({
        ...row,
        segmento: row.segmento || classifySegment(row.ramo_atuacao, row.o_que_sua_empresa_faz),
        diferencial_competitivo: row.diferencial_competitivo || row.por_que_o_cliente_escolhe_voce || "",
        integracoes_sistemas_externos: row.integracoes_sistemas_externos || row.outros_sistemas_para_integrar || "",
        recursos_desejados: Array.isArray(row.recursos_desejados) ? row.recursos_desejados : [],
        arquivos_anexos: await withSignedUrls(row.arquivos_anexos)
      }))
    );

    return NextResponse.json({
      success: true,
      count: enrichedBriefings.length,
      briefings: enrichedBriefings,
      source: "supabase"
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno ao buscar briefings";
    console.error("GET briefings exception:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = sanitizeForSupabase(body);

    const { data, error } = await supabaseServer
      .from("briefings")
      .insert([payload])
      .select();

    if (error) {
      console.error("Supabase POST error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    const inserted = data && data[0] ? data[0] : payload;
    const enriched: BriefingItem = {
      ...inserted,
      segmento: inserted.segmento || classifySegment(inserted.ramo_atuacao, inserted.o_que_sua_empresa_faz),
      diferencial_competitivo: inserted.diferencial_competitivo || inserted.por_que_o_cliente_escolhe_voce || "",
      integracoes_sistemas_externos: inserted.integracoes_sistemas_externos || inserted.outros_sistemas_para_integrar || ""
    };

    return NextResponse.json({ success: true, briefing: enriched });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao salvar briefing";
    console.error("POST briefing exception:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID e novo status são obrigatórios" }, { status: 400 });
    }

    const { data, error } = await supabaseServer
      .from("briefings")
      .update({ status, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase PATCH error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, updated: data });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao atualizar status";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
