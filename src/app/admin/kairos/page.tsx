"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

interface Resposta {
  id: string;
  created_at: string;
  nome_solicitante: string;
  cargo_solicitante: string;
  area_responsabilidade: string;
  empresa_nome: string;
  ramo_atuacao: string;
  email_contato: string;
  telefone_whatsapp: string;
  cidade_estado: string;
  site_atual: string;
  o_que_a_empresa_vende: string;
  unidade_de_venda: string;
  quem_e_o_cliente_comprador: string;
  ticket_medio_atual: string;
  quantos_clientes_ativos_hoje: string;
  modelo_de_precificacao: string;
  existe_tabela_de_precos_hoje: string;
  margem_de_negociacao: string;
  quem_aprova_descontos_especiais: string;
  formas_de_pagamento_aceitas: string[];
  variaveis_que_definem_o_preco: string;
  como_surge_um_lead_hoje: string;
  etapas_do_processo_comercial: string;
  tempo_medio_de_fechamento: string;
  documentos_usados_no_processo: string;
  o_que_acontece_apos_o_fechamento: string;
  tipo_de_relacionamento_com_cliente: string;
  como_e_feita_a_renovacao: string;
  clientes_atuais: ClienteAtual[];
  periodo_de_planejamento: string;
  meta_novos_clientes_periodo: string;
  meta_escolas_novas_2027: string;
  meta_reunioes_ate_dez_2026: string;
  meta_alunos: string;
  meta_livros_vendidos: string;
  meta_faturamento_periodo: string;
  meta_percentual_renovacao: string;
  indicadores_que_ja_acompanham_hoje: string;
  outras_metas_com_prazo: string;
  observacoes_finais: string;
  venda_familia_site_proprio: string;
  preco_familia_vs_escola: string;
  compra_parcelada_ou_avulsa: string;
  familia_multiplos_filhos: string;
  desconto_irmaos: string;
  compra_tem_atendimento_humano: string;
  suporte_pos_venda_familia: string;
  rastreamento_envio_individual: string;
  controle_estoque_livros: string;
  familia_de_escola_parceira_compra_avulso: string;
  metas_separadas_por_canal: string;
  outras_funcionalidades_importantes: string;
}

interface PinLinha {
  id: string;
  rotulo: string;
  pin: string;
  respondido: boolean;
  respondido_em: string | null;
  created_at: string;
  resposta: Resposta | null;
}

const campo = (label: string, valor?: string | null) => {
  if (!valor) return null;
  return (
    <div style={{ marginBottom: "10px" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "2px" }}>
        {label}
      </div>
      <div style={{ fontSize: "13px", color: "var(--text-primary)", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>{valor}</div>
    </div>
  );
};

export default function AdminKairosPage() {
  const [linhas, setLinhas] = useState<PinLinha[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandido, setExpandido] = useState<string | null>(null);
  const router = useRouter();

  const carregar = useCallback(async () => {
    try {
      const res = await fetch("/api/briefing-kairos", { cache: "no-store" });
      const data = await res.json();
      if (data.success) setLinhas(data.pins);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("arkos_admin_auth");
      if (!auth) {
        router.push("/admin/login");
        return;
      }
    }
    carregar();
  }, [router, carregar]);

  if (loading) {
    return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-secondary)" }}>Carregando...</div>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidiana)", padding: "clamp(16px, 4vw, 32px) clamp(12px, 4vw, 24px)" }}>
      <div style={{ maxWidth: "960px", margin: "0 auto" }}>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
          <div>
            <Link href="/admin" style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>← Voltar ao Painel</Link>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(20px, 4vw, 26px)", color: "var(--text-primary)", marginTop: "8px" }}>
              Briefing Kairós — PINs e Respostas
            </h1>
          </div>
          <button onClick={carregar} style={{
            background: "var(--sinal)", color: "var(--obsidiana)", border: "none", padding: "10px 18px", borderRadius: "4px",
            fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 700, cursor: "pointer", textTransform: "uppercase",
          }}>
            Atualizar
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
          {linhas.map((l) => (
            <div key={l.id} style={{ background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "6px", overflow: "hidden" }}>
              <div
                onClick={() => l.respondido && setExpandido(expandido === l.id ? null : l.id)}
                style={{
                  display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: "10px", padding: "14px 18px",
                  cursor: l.respondido ? "pointer" : "default",
                }}
              >
                <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "12px", minWidth: 0 }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-secondary)", minWidth: "90px" }}>{l.rotulo}</span>
                  <span style={{
                    fontFamily: "var(--font-mono)", fontSize: "20px", letterSpacing: "0.15em", fontWeight: 700,
                    color: l.respondido ? "var(--text-secondary)" : "var(--sinal)",
                  }}>
                    {l.pin}
                  </span>
                  {l.respondido && l.resposta && (
                    <span style={{ fontSize: "13px", color: "var(--text-primary)" }}>
                      {l.resposta.nome_solicitante} — {l.resposta.cargo_solicitante}
                    </span>
                  )}
                </div>
                <span style={{
                  fontSize: "11px", fontWeight: 700, fontFamily: "var(--font-mono)", textTransform: "uppercase",
                  padding: "4px 10px", borderRadius: "3px",
                  background: l.respondido ? "rgba(200,245,66,0.15)" : "rgba(255,255,255,0.06)",
                  color: l.respondido ? "var(--sinal)" : "var(--text-secondary)",
                }}>
                  {l.respondido ? "Respondido" : "Pendente"}
                </span>
              </div>

              {expandido === l.id && l.resposta && (
                <div style={{ padding: "18px", borderTop: "1px solid var(--border)" }}>
                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", marginBottom: "12px" }}>Sobre quem respondeu</h4>
                  {campo("Nome", l.resposta.nome_solicitante)}
                  {campo("Cargo", l.resposta.cargo_solicitante)}
                  {campo("Área de responsabilidade", l.resposta.area_responsabilidade)}
                  {campo("E-mail", l.resposta.email_contato)}
                  {campo("WhatsApp", l.resposta.telefone_whatsapp)}

                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>O que vendem (institucional)</h4>
                  {campo("O que a Kairós vende", l.resposta.o_que_a_empresa_vende)}
                  {campo("Unidade de venda", l.resposta.unidade_de_venda)}
                  {campo("Quem decide a compra", l.resposta.quem_e_o_cliente_comprador)}
                  {campo("Ticket médio", l.resposta.ticket_medio_atual)}
                  {campo("Escolas ativas hoje", l.resposta.quantos_clientes_ativos_hoje)}

                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>Precificação</h4>
                  {campo("Modelo de precificação", l.resposta.modelo_de_precificacao)}
                  {campo("Tabela de preços", l.resposta.existe_tabela_de_precos_hoje)}
                  {campo("Margem de negociação", l.resposta.margem_de_negociacao)}
                  {campo("Quem aprova descontos", l.resposta.quem_aprova_descontos_especiais)}
                  {campo("Formas de pagamento", l.resposta.formas_de_pagamento_aceitas?.join(", "))}
                  {campo("O que muda o preço", l.resposta.variaveis_que_definem_o_preco)}

                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>Fluxo comercial</h4>
                  {campo("Origem do lead", l.resposta.como_surge_um_lead_hoje)}
                  {campo("Etapas do processo", l.resposta.etapas_do_processo_comercial)}
                  {campo("Tempo médio de fechamento", l.resposta.tempo_medio_de_fechamento)}
                  {campo("Documentos usados", l.resposta.documentos_usados_no_processo)}
                  {campo("Pós-venda", l.resposta.o_que_acontece_apos_o_fechamento)}
                  {campo("Tipo de relacionamento", l.resposta.tipo_de_relacionamento_com_cliente)}
                  {campo("Renovação", l.resposta.como_e_feita_a_renovacao)}

                  {l.resposta.clientes_atuais?.length > 0 && (
                    <>
                      <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>Escolas atuais citadas</h4>
                      {l.resposta.clientes_atuais.map((c, i) => (
                        <div key={i} style={{ background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", padding: "10px 12px", marginBottom: "8px", fontSize: "12px", color: "var(--text-secondary)" }}>
                          <strong style={{ color: "var(--text-primary)" }}>{c.nome_cliente}</strong> — {c.quantidade} {c.unidade_quantidade}, {c.item_ou_produto_principal}, {c.valor_unitario}, {c.forma_pagamento}
                        </div>
                      ))}
                    </>
                  )}

                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>Metas</h4>
                  {campo("Período de planejamento", l.resposta.periodo_de_planejamento)}
                  {campo("Meta de novas escolas (por período)", l.resposta.meta_novos_clientes_periodo)}
                  {campo("Meta de escolas novas até 2027", l.resposta.meta_escolas_novas_2027)}
                  {campo("Meta de reuniões até dez/2026", l.resposta.meta_reunioes_ate_dez_2026)}
                  {campo("Meta de alunos atendidos", l.resposta.meta_alunos)}
                  {campo("Meta de livros vendidos", l.resposta.meta_livros_vendidos)}
                  {campo("Meta de faturamento", l.resposta.meta_faturamento_periodo)}
                  {campo("Meta de renovação", l.resposta.meta_percentual_renovacao)}
                  {campo("Indicadores acompanhados hoje", l.resposta.indicadores_que_ja_acompanham_hoje)}
                  {campo("Outras metas com prazo", l.resposta.outras_metas_com_prazo)}
                  {campo("Observações institucionais", l.resposta.observacoes_finais)}

                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>Canal de varejo — venda para a família</h4>
                  {campo("Site próprio da família", l.resposta.venda_familia_site_proprio)}
                  {campo("Preço família vs. escola", l.resposta.preco_familia_vs_escola)}
                  {campo("Parcelada ou avulsa", l.resposta.compra_parcelada_ou_avulsa)}
                  {campo("Família com múltiplos filhos", l.resposta.familia_multiplos_filhos)}
                  {campo("Desconto por irmãos", l.resposta.desconto_irmaos)}
                  {campo("Atendimento humano na compra", l.resposta.compra_tem_atendimento_humano)}
                  {campo("Suporte pós-venda família", l.resposta.suporte_pos_venda_familia)}

                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>Logística e cruzamento entre canais</h4>
                  {campo("Rastreamento de envio individual", l.resposta.rastreamento_envio_individual)}
                  {campo("Controle de estoque de livros", l.resposta.controle_estoque_livros)}
                  {campo("Família de escola parceira compra avulso", l.resposta.familia_de_escola_parceira_compra_avulso)}
                  {campo("Metas separadas por canal", l.resposta.metas_separadas_por_canal)}

                  <h4 style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", margin: "18px 0 12px" }}>Pergunta aberta</h4>
                  {campo("Outras funcionalidades importantes", l.resposta.outras_funcionalidades_importantes)}
                </div>
              )}
            </div>
          ))}

          {linhas.length === 0 && (
            <div style={{ color: "var(--text-secondary)", fontSize: "14px", textAlign: "center", padding: "40px" }}>
              Nenhum PIN cadastrado ainda.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
