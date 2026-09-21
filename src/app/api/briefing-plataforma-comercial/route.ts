import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export interface ClienteAtual {
  nome_cliente: string;
  quantidade: string;
  unidade_quantidade: string;
  item_ou_produto_principal: string;
  valor_unitario: string;
  forma_pagamento: string;
  data_inicio: string;
  observacoes: string;
}

export interface BriefingPlataformaComercialItem {
  id: string;
  created_at: string;
  updated_at?: string;
  status: "novo" | "em_analise" | "proposta_enviada" | "aprovado" | "concluido";
  nome_solicitante: string;
  cargo_solicitante?: string;
  empresa_nome: string;
  ramo_atuacao: string;
  email_contato: string;
  telefone_whatsapp: string;
  cidade_estado?: string;
  site_atual?: string;
  o_que_a_empresa_vende: string;
  unidade_de_venda: string;
  quem_e_o_cliente_comprador: string;
  ticket_medio_atual?: string;
  quantos_clientes_ativos_hoje?: string;
  modelo_de_precificacao: string;
  existe_tabela_de_precos_hoje: string;
  margem_de_negociacao: string;
  quem_aprova_descontos_especiais?: string;
  formas_de_pagamento_aceitas: string[];
  variaveis_que_definem_o_preco?: string;
  como_surge_um_lead_hoje?: string;
  etapas_do_processo_comercial: string;
  tempo_medio_de_fechamento?: string;
  documentos_usados_no_processo?: string;
  o_que_acontece_apos_o_fechamento?: string;
  tipo_de_relacionamento_com_cliente: string;
  como_e_feita_a_renovacao?: string;
  clientes_atuais: ClienteAtual[];
  periodo_de_planejamento?: string;
  meta_novos_clientes_periodo?: string;
  meta_faturamento_periodo?: string;
  meta_percentual_renovacao?: string;
  indicadores_que_ja_acompanham_hoje?: string;
  observacoes_finais?: string;
}

function sanitizeClientesAtuais(input: unknown): ClienteAtual[] {
  if (!Array.isArray(input)) return [];
  return input
    .filter((c): c is Record<string, unknown> => !!c && typeof c === "object")
    .map((c) => ({
      nome_cliente: String(c.nome_cliente || "").trim(),
      quantidade: String(c.quantidade || "").trim(),
      unidade_quantidade: String(c.unidade_quantidade || "").trim(),
      item_ou_produto_principal: String(c.item_ou_produto_principal || "").trim(),
      valor_unitario: String(c.valor_unitario || "").trim(),
      forma_pagamento: String(c.forma_pagamento || "").trim(),
      data_inicio: String(c.data_inicio || "").trim(),
      observacoes: String(c.observacoes || "").trim(),
    }))
    .filter((c) => c.nome_cliente !== ""); // descarta linhas em branco deixadas no formulário
}

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
    site_atual: String(body.site_atual || "").trim(),

    o_que_a_empresa_vende: String(body.o_que_a_empresa_vende || "").trim(),
    unidade_de_venda: String(body.unidade_de_venda || "").trim(),
    quem_e_o_cliente_comprador: String(body.quem_e_o_cliente_comprador || "").trim(),
    ticket_medio_atual: String(body.ticket_medio_atual || "").trim(),
    quantos_clientes_ativos_hoje: String(body.quantos_clientes_ativos_hoje || "").trim(),

    modelo_de_precificacao: String(body.modelo_de_precificacao || "").trim(),
    existe_tabela_de_precos_hoje: String(body.existe_tabela_de_precos_hoje || "").trim(),
    margem_de_negociacao: String(body.margem_de_negociacao || "").trim(),
    quem_aprova_descontos_especiais: String(body.quem_aprova_descontos_especiais || "").trim(),
    formas_de_pagamento_aceitas: Array.isArray(body.formas_de_pagamento_aceitas) ? body.formas_de_pagamento_aceitas : [],
    variaveis_que_definem_o_preco: String(body.variaveis_que_definem_o_preco || "").trim(),

    como_surge_um_lead_hoje: String(body.como_surge_um_lead_hoje || "").trim(),
    etapas_do_processo_comercial: String(body.etapas_do_processo_comercial || "").trim(),
    tempo_medio_de_fechamento: String(body.tempo_medio_de_fechamento || "").trim(),
    documentos_usados_no_processo: String(body.documentos_usados_no_processo || "").trim(),
    o_que_acontece_apos_o_fechamento: String(body.o_que_acontece_apos_o_fechamento || "").trim(),
    tipo_de_relacionamento_com_cliente: String(body.tipo_de_relacionamento_com_cliente || "").trim(),
    como_e_feita_a_renovacao: String(body.como_e_feita_a_renovacao || "").trim(),

    clientes_atuais: sanitizeClientesAtuais(body.clientes_atuais),

    periodo_de_planejamento: String(body.periodo_de_planejamento || "").trim(),
    meta_novos_clientes_periodo: String(body.meta_novos_clientes_periodo || "").trim(),
    meta_faturamento_periodo: String(body.meta_faturamento_periodo || "").trim(),
    meta_percentual_renovacao: String(body.meta_percentual_renovacao || "").trim(),
    indicadores_que_ja_acompanham_hoje: String(body.indicadores_que_ja_acompanham_hoje || "").trim(),
    observacoes_finais: String(body.observacoes_finais || "").trim(),
  };
}

export async function GET() {
  try {
    const { data, error } = await supabaseServer
      .from("briefings_plataforma_comercial")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Supabase GET error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, count: data?.length ?? 0, briefings: data ?? [] });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno ao buscar briefings";
    console.error("GET briefings-plataforma-comercial exception:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = sanitizeForSupabase(body);

    const { data, error } = await supabaseServer
      .from("briefings_plataforma_comercial")
      .insert([payload])
      .select();

    if (error) {
      console.error("Supabase POST error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, briefing: data?.[0] ?? payload });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao salvar briefing";
    console.error("POST briefing-plataforma-comercial exception:", err);
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
      .from("briefings_plataforma_comercial")
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
