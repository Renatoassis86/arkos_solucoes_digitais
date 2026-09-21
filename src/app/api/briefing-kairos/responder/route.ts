import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

interface ClienteAtual {
  nome_cliente: string;
  quantidade: string;
  unidade_quantidade: string;
  item_ou_produto_principal: string;
  valor_unitario: string;
  forma_pagamento: string;
  data_inicio: string;
  observacoes: string;
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
    .filter((c) => c.nome_cliente !== "");
}

function sanitizeForSupabase(body: Record<string, unknown>) {
  return {
    nome_solicitante: String(body.nome_solicitante || "").trim(),
    cargo_solicitante: String(body.cargo_solicitante || "").trim(),
    area_responsabilidade: String(body.area_responsabilidade || "").trim(),
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
    meta_escolas_novas_2027: String(body.meta_escolas_novas_2027 || "").trim(),
    meta_reunioes_ate_dez_2026: String(body.meta_reunioes_ate_dez_2026 || "").trim(),
    meta_alunos: String(body.meta_alunos || "").trim(),
    meta_livros_vendidos: String(body.meta_livros_vendidos || "").trim(),
    meta_faturamento_periodo: String(body.meta_faturamento_periodo || "").trim(),
    meta_percentual_renovacao: String(body.meta_percentual_renovacao || "").trim(),
    indicadores_que_ja_acompanham_hoje: String(body.indicadores_que_ja_acompanham_hoje || "").trim(),
    outras_metas_com_prazo: String(body.outras_metas_com_prazo || "").trim(),
    observacoes_finais: String(body.observacoes_finais || "").trim(),

    venda_familia_site_proprio: String(body.venda_familia_site_proprio || "").trim(),
    preco_familia_vs_escola: String(body.preco_familia_vs_escola || "").trim(),
    compra_parcelada_ou_avulsa: String(body.compra_parcelada_ou_avulsa || "").trim(),
    familia_multiplos_filhos: String(body.familia_multiplos_filhos || "").trim(),
    desconto_irmaos: String(body.desconto_irmaos || "").trim(),
    compra_tem_atendimento_humano: String(body.compra_tem_atendimento_humano || "").trim(),
    suporte_pos_venda_familia: String(body.suporte_pos_venda_familia || "").trim(),

    rastreamento_envio_individual: String(body.rastreamento_envio_individual || "").trim(),
    controle_estoque_livros: String(body.controle_estoque_livros || "").trim(),
    familia_de_escola_parceira_compra_avulso: String(body.familia_de_escola_parceira_compra_avulso || "").trim(),
    metas_separadas_por_canal: String(body.metas_separadas_por_canal || "").trim(),
    outras_funcionalidades_importantes: String(body.outras_funcionalidades_importantes || "").trim(),
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const pin = String(body.pin || "").trim();

    if (!pin) {
      return NextResponse.json({ success: false, error: "Código de acesso ausente." }, { status: 400 });
    }

    const { data: pinRow, error: pinErr } = await supabaseServer
      .from("kairos_briefing_pins")
      .select("id")
      .eq("pin", pin)
      .maybeSingle();

    if (pinErr) {
      console.error("Supabase pin lookup error:", pinErr);
      return NextResponse.json({ success: false, error: pinErr.message }, { status: 500 });
    }
    if (!pinRow) {
      return NextResponse.json({ success: false, error: "Código de acesso inválido." }, { status: 400 });
    }

    const payload = sanitizeForSupabase(body);

    // Upsert por pin_id (UNIQUE): primeira vez cria a linha, as próximas
    // atualizam — o mesmo PIN pode ser reaberto e editado quantas vezes for
    // preciso, tanto por um autosave de progresso quanto pelo envio final.
    const { error: upsertErr } = await supabaseServer
      .from("kairos_briefing_respostas")
      .upsert([{ pin_id: pinRow.id, ...payload }], { onConflict: "pin_id" });

    if (upsertErr) {
      console.error("Supabase upsert error:", upsertErr);
      return NextResponse.json({ success: false, error: upsertErr.message }, { status: 500 });
    }

    const { error: updateErr } = await supabaseServer
      .from("kairos_briefing_pins")
      .update({ respondido: true, respondido_em: new Date().toISOString() })
      .eq("id", pinRow.id);

    if (updateErr) {
      console.error("Supabase pin update error:", updateErr);
      // A resposta já foi salva — não falha o envio por causa disso, só loga.
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao salvar resposta";
    console.error("POST briefing-kairos/responder exception:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
