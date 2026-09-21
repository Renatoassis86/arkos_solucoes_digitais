"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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

const CLIENTE_VAZIO: ClienteAtual = {
  nome_cliente: "",
  quantidade: "",
  unidade_quantidade: "",
  item_ou_produto_principal: "",
  valor_unitario: "",
  forma_pagamento: "",
  data_inicio: "",
  observacoes: "",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontFamily: "var(--font-mono)",
  fontSize: "11px",
  color: "var(--text-primary)",
  textTransform: "uppercase",
  marginBottom: "4px",
};
const hintStyle: React.CSSProperties = {
  fontSize: "11px",
  color: "var(--text-secondary)",
  display: "block",
  marginBottom: "6px",
};
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  background: "var(--obsidiana)",
  border: "1px solid var(--border)",
  borderRadius: "4px",
  color: "var(--text-primary)",
  fontSize: "14px",
};

const TOTAL_ETAPAS = 8;

export default function BriefingKairosPage() {
  // ── Portão de PIN ──────────────────────────────────────────────
  const [pin, setPin] = useState("");
  const [pinValidado, setPinValidado] = useState(false);
  const [validandoPin, setValidandoPin] = useState(false);
  const [pinError, setPinError] = useState("");
  const [jaRespondido, setJaRespondido] = useState(false);

  const handleValidarPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    setValidandoPin(true);
    try {
      const res = await fetch("/api/briefing-kairos/validar-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin.trim() }),
      });
      const data = await res.json();
      if (!data.success || !data.valido) {
        setPinError("Código inválido. Confira o PIN recebido e tente novamente.");
        return;
      }
      if (data.jaRespondido) {
        setJaRespondido(true);
      }
      setPinValidado(true);
    } catch {
      setPinError("Falha de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setValidandoPin(false);
    }
  };

  // ── Formulário ─────────────────────────────────────────────────
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    // ETAPA 1: SOBRE VOCÊ
    nome_solicitante: "",
    cargo_solicitante: "",
    area_responsabilidade: "",
    empresa_nome: "Kairós",
    ramo_atuacao: "",
    email_contato: "",
    telefone_whatsapp: "",
    cidade_estado: "",
    site_atual: "",

    // ETAPA 2: O QUE VENDEM E PARA QUEM
    o_que_a_empresa_vende: "",
    unidade_de_venda: "pacote_fechado_por_cliente",
    quem_e_o_cliente_comprador: "",
    ticket_medio_atual: "",
    quantos_clientes_ativos_hoje: "",

    // ETAPA 3: COMO FUNCIONA O PREÇO
    modelo_de_precificacao: "preco_unico_fixo",
    existe_tabela_de_precos_hoje: "nao_decido_na_hora",
    margem_de_negociacao: "sem_margem_preco_fechado",
    quem_aprova_descontos_especiais: "",
    formas_de_pagamento_aceitas: [] as string[],
    variaveis_que_definem_o_preco: "",

    // ETAPA 4: FLUXO COMERCIAL, DA PRÉ-VENDA AO PÓS-VENDA
    como_surge_um_lead_hoje: "",
    etapas_do_processo_comercial: "",
    tempo_medio_de_fechamento: "",
    documentos_usados_no_processo: "",
    o_que_acontece_apos_o_fechamento: "",
    tipo_de_relacionamento_com_cliente: "recorrente_com_renovacao",
    como_e_feita_a_renovacao: "",

    // ETAPA 6: METAS E PLANEJAMENTO COMERCIAL
    periodo_de_planejamento: "mensal",
    meta_novos_clientes_periodo: "",
    meta_escolas_novas_2027: "",
    meta_reunioes_ate_dez_2026: "",
    meta_alunos: "",
    meta_livros_vendidos: "",
    meta_faturamento_periodo: "",
    meta_percentual_renovacao: "",
    indicadores_que_ja_acompanham_hoje: "",
    outras_metas_com_prazo: "",
    observacoes_finais: "",

    // ETAPA 7: CANAL DE VAREJO — VENDA PARA A FAMÍLIA
    venda_familia_site_proprio: "",
    preco_familia_vs_escola: "",
    compra_parcelada_ou_avulsa: "",
    familia_multiplos_filhos: "",
    desconto_irmaos: "",
    compra_tem_atendimento_humano: "",
    suporte_pos_venda_familia: "",

    // ETAPA 8: LOGÍSTICA, CRUZAMENTO ENTRE CANAIS E PERGUNTA ABERTA
    rastreamento_envio_individual: "",
    controle_estoque_livros: "",
    familia_de_escola_parceira_compra_avulso: "",
    metas_separadas_por_canal: "",
    outras_funcionalidades_importantes: "",
  });

  // ETAPA 5: CLIENTES/ESCOLAS ATUAIS — lista dinâmica
  const [clientesAtuais, setClientesAtuais] = useState<ClienteAtual[]>([{ ...CLIENTE_VAZIO }]);

  const atualizarCliente = (index: number, campo: keyof ClienteAtual, valor: string) => {
    setClientesAtuais((prev) => prev.map((c, i) => (i === index ? { ...c, [campo]: valor } : c)));
  };
  const adicionarCliente = () => setClientesAtuais((prev) => [...prev, { ...CLIENTE_VAZIO }]);
  const removerCliente = (index: number) => setClientesAtuais((prev) => prev.filter((_, i) => i !== index));

  const togglePagamento = (id: string) => {
    const list = formData.formas_de_pagamento_aceitas;
    setFormData({
      ...formData,
      formas_de_pagamento_aceitas: list.includes(id) ? list.filter((item) => item !== id) : [...list, id],
    });
  };

  function encontrarEtapaComCampoFaltando(): { etapa: number; mensagem: string } | null {
    const etapa1: [string, string][] = [
      [formData.nome_solicitante, "Seu Nome Completo"],
      [formData.cargo_solicitante, "Seu Cargo"],
      [formData.area_responsabilidade, "Pelo que você é responsável na Kairós"],
      [formData.email_contato, "E-mail de Contato"],
    ];
    for (const [valor, nome] of etapa1) {
      if (!valor.trim()) return { etapa: 1, mensagem: `Falta preencher "${nome}" na Etapa 1.` };
    }

    const etapa2: [string, string][] = [
      [formData.o_que_a_empresa_vende, "O que a Kairós vende"],
      [formData.quem_e_o_cliente_comprador, "Quem é o cliente que decide a compra"],
    ];
    for (const [valor, nome] of etapa2) {
      if (!valor.trim()) return { etapa: 2, mensagem: `Falta preencher "${nome}" na Etapa 2.` };
    }

    if (!formData.etapas_do_processo_comercial.trim()) {
      return { etapa: 4, mensagem: 'Falta descrever "as etapas do processo comercial" na Etapa 4.' };
    }

    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");

    const faltando = encontrarEtapaComCampoFaltando();
    if (faltando) {
      setCurrentStep(faltando.etapa);
      setSubmitError(faltando.mensagem);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/briefing-kairos/responder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          pin: pin.trim(),
          ...formData,
          clientes_atuais: clientesAtuais.filter((c) => c.nome_cliente.trim() !== ""),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setSubmitError(data.error || "Não foi possível salvar suas respostas agora. Tente novamente em instantes.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Falha de conexão ao enviar. Verifique sua internet e tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { step: 1, label: "1. Você" },
    { step: 2, label: "2. O Que Vendem" },
    { step: 3, label: "3. Precificação" },
    { step: 4, label: "4. Fluxo Comercial" },
    { step: 5, label: "5. Escolas Atuais" },
    { step: 6, label: "6. Metas" },
    { step: 7, label: "7. Venda p/ Família" },
    { step: 8, label: "8. Logística & Mais" },
  ];

  // ══════════════════════════════════════════════════════════════
  // TELA 1: PORTÃO DE PIN
  // ══════════════════════════════════════════════════════════════
  if (!pinValidado) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
        <Navbar />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 18px" }}>
          <div style={{
            width: "100%", maxWidth: "420px", background: "var(--grafite)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "36px 28px",
          }}>
            <div style={{ textAlign: "center", marginBottom: "24px" }}>
              <div style={{
                fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase",
                letterSpacing: "0.08em", marginBottom: "8px",
              }}>
                Acesso Restrito — Equipe Kairós
              </div>
              <h1 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--text-primary)" }}>
                Briefing da Plataforma Comercial Kairós
              </h1>
              <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "8px", lineHeight: 1.6 }}>
                Digite o código de acesso que você recebeu para responder o briefing.
              </p>
            </div>

            <form onSubmit={handleValidarPin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label style={labelStyle}>Código de Acesso (PIN)</label>
                <input
                  type="text"
                  required
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="000000"
                  style={{ ...inputStyle, textAlign: "center", fontSize: "22px", letterSpacing: "0.2em", fontFamily: "var(--font-mono)" }}
                />
              </div>

              {pinError && (
                <div style={{
                  background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.4)", borderRadius: "4px",
                  padding: "10px 14px", fontSize: "13px", color: "#ff6b6b",
                }}>
                  ⚠ {pinError}
                </div>
              )}

              <button type="submit" disabled={validandoPin} className="briefing-btn-primary" style={{ width: "100%", textAlign: "center" }}>
                {validandoPin ? "Verificando..." : "Acessar Briefing →"}
              </button>
            </form>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // TELA 2: PIN JÁ USADO
  // ══════════════════════════════════════════════════════════════
  if (jaRespondido) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
        <Navbar />
        <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 18px" }}>
          <div style={{
            width: "100%", maxWidth: "480px", background: "var(--grafite)", border: "1px solid var(--border)",
            borderRadius: "8px", padding: "40px 28px", textAlign: "center",
          }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%", background: "var(--sinal)", color: "var(--obsidiana)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "bold", margin: "0 auto 16px",
            }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--text-primary)", marginBottom: "10px" }}>
              Este código já foi usado
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6 }}>
              As respostas ligadas a este PIN já foram enviadas. Cada código é de uso único. Se você ainda não respondeu, confirme com quem te passou o código.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // ══════════════════════════════════════════════════════════════
  // TELA 3: FORMULÁRIO
  // ══════════════════════════════════════════════════════════════
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "880px", margin: "0 auto", padding: "40px 18px", width: "100%" }}>
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <div style={{
            display: "inline-block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)",
            textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px",
          }}>
            Acesso Restrito — Equipe Kairós
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 5vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Briefing da Plataforma Comercial Kairós
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "660px", margin: "10px auto 0", lineHeight: 1.6 }}>
            Este briefing mapeia como a Kairós vende hoje — para as escolas parceiras e direto para as famílias — para desenharmos a plataforma comercial de vocês fiel à realidade do negócio. Mais de uma pessoa da equipe pode responder; cada resposta é independente.
          </p>
        </div>

        <div className="briefing-step-container">
          <div className="briefing-step-bar">
            {stepsList.map((s) => (
              <button
                key={s.step}
                type="button"
                onClick={() => setCurrentStep(s.step)}
                style={{
                  background: currentStep === s.step ? "var(--ardosia)" : "transparent",
                  border: currentStep === s.step ? "1px solid var(--sinal)" : "1px solid transparent",
                  color: currentStep === s.step ? "var(--text-primary)" : "var(--text-secondary)",
                  padding: "8px 12px", borderRadius: "4px", fontFamily: "var(--font-mono)", fontSize: "11px",
                  fontWeight: currentStep === s.step ? 600 : 400, cursor: "pointer", textAlign: "center",
                  whiteSpace: "nowrap", flexShrink: 0,
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {submitted ? (
          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "8px", padding: "48px 24px", textAlign: "center" }}>
            <div style={{
              width: "56px", height: "56px", borderRadius: "50%", background: "var(--sinal)", color: "var(--obsidiana)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: "26px", fontWeight: "bold", margin: "0 auto 16px",
            }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--text-primary)", marginBottom: "10px" }}>
              Respostas Recebidas com Sucesso!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Obrigado pelas respostas. Elas já foram registradas para a construção da plataforma comercial da Kairós.
            </p>
            <Link href="/" style={{
              display: "inline-block", background: "var(--sinal)", color: "var(--obsidiana)", fontFamily: "var(--font-mono)",
              fontSize: "12px", fontWeight: 700, padding: "14px 28px", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              Voltar ao Início
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "8px", padding: "clamp(20px, 4vw, 36px)" }}>

            {submitError && (
              <div style={{
                background: "rgba(255, 107, 107, 0.1)", border: "1px solid rgba(255, 107, 107, 0.4)", borderRadius: "4px",
                padding: "12px 16px", fontSize: "13px", color: "#ff6b6b", lineHeight: 1.5, marginBottom: "20px",
              }}>
                ⚠ {submitError}
              </div>
            )}

            {/* ETAPA 1 — SOBRE VOCÊ */}
            {currentStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 1 de {TOTAL_ETAPAS}: Sobre Você</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Quem está respondendo e qual sua área dentro da Kairós.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Seu Nome Completo *</label>
                    <input type="text" required value={formData.nome_solicitante}
                      onChange={(e) => setFormData({ ...formData, nome_solicitante: e.target.value })}
                      placeholder="Ex: Ana Beatriz Souza" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Seu Cargo *</label>
                    <input type="text" required value={formData.cargo_solicitante}
                      onChange={(e) => setFormData({ ...formData, cargo_solicitante: e.target.value })}
                      placeholder="Ex: Diretora Comercial, Sócio, Coordenador Pedagógico" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Pelo que você é responsável na Kairós? *</label>
                  <span style={hintStyle}>Sua área de atuação real no dia a dia — ajuda a entender qual parte deste briefing você conhece melhor.</span>
                  <textarea rows={2} required value={formData.area_responsabilidade}
                    onChange={(e) => setFormData({ ...formData, area_responsabilidade: e.target.value })}
                    placeholder="Ex: relacionamento com escolas parceiras e fechamento de contratos institucionais"
                    style={inputStyle} />
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>WhatsApp com DDD</label>
                    <input type="text" value={formData.telefone_whatsapp}
                      onChange={(e) => setFormData({ ...formData, telefone_whatsapp: e.target.value })}
                      placeholder="(83) 99999-9999" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>E-mail de Contato *</label>
                    <input type="email" required value={formData.email_contato}
                      onChange={(e) => setFormData({ ...formData, email_contato: e.target.value })}
                      placeholder="seuemail@kairos.com.br" style={inputStyle} />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Cidade e Estado</label>
                    <input type="text" value={formData.cidade_estado}
                      onChange={(e) => setFormData({ ...formData, cidade_estado: e.target.value })}
                      placeholder="Ex: João Pessoa - PB ou Atuação Nacional" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Site ou Sistema Atual (se houver)</label>
                    <input type="text" value={formData.site_atual}
                      onChange={(e) => setFormData({ ...formData, site_atual: e.target.value })}
                      placeholder="Site de venda para família, planilhas, sistema atual..." style={inputStyle} />
                  </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "10px" }}>
                  <button type="button" onClick={() => setCurrentStep(2)} className="briefing-btn-primary">
                    Avançar para Etapa 2: O Que Vendem →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2 — O QUE VENDEM E PARA QUEM */}
            {currentStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 2 de {TOTAL_ETAPAS}: O Que a Kairós Vende</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Pense no canal institucional (escolas parceiras) para estas perguntas — o canal de família tem etapa própria mais adiante.
                  </p>
                </div>

                <div>
                  <label style={labelStyle}>O que a Kairós vende para as escolas parceiras, exatamente? *</label>
                  <textarea rows={3} required value={formData.o_que_a_empresa_vende}
                    onChange={(e) => setFormData({ ...formData, o_que_a_empresa_vende: e.target.value })}
                    placeholder="Ex: licenciamento de currículo por aluno/ano, por segmento..."
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Qual é a unidade de venda para a escola? *</label>
                  <select value={formData.unidade_de_venda}
                    onChange={(e) => setFormData({ ...formData, unidade_de_venda: e.target.value })}
                    style={inputStyle}>
                    <option value="por_pessoa_ou_unidade">Por aluno/unidade atendida</option>
                    <option value="pacote_fechado_por_cliente">Pacote fechado por escola, independente de volume</option>
                    <option value="produto_unitario_avulso">Produto/item unitário vendido avulso</option>
                    <option value="servico_recorrente">Contrato recorrente (mensalidade/assinatura)</option>
                    <option value="projeto_sob_medida">Projeto sob medida, orçado caso a caso</option>
                  </select>
                </div>

                <div>
                  <label style={labelStyle}>Quem é o cliente que decide e assina a compra? *</label>
                  <textarea rows={3} required value={formData.quem_e_o_cliente_comprador}
                    onChange={(e) => setFormData({ ...formData, quem_e_o_cliente_comprador: e.target.value })}
                    placeholder="Ex: diretores/mantenedores da escola parceira..."
                    style={inputStyle} />
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Ticket Médio Atual (institucional)</label>
                    <input type="text" value={formData.ticket_medio_atual}
                      onChange={(e) => setFormData({ ...formData, ticket_medio_atual: e.target.value })}
                      placeholder="Ex: R$ 15.000/ano por escola" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Quantas escolas parceiras ativas hoje?</label>
                    <input type="text" value={formData.quantos_clientes_ativos_hoje}
                      onChange={(e) => setFormData({ ...formData, quantos_clientes_ativos_hoje: e.target.value })}
                      placeholder="Número aproximado" style={inputStyle} />
                  </div>
                </div>

                <div className="briefing-actions">
                  <button type="button" onClick={() => setCurrentStep(1)} className="briefing-btn-back">← Voltar</button>
                  <button type="button" onClick={() => setCurrentStep(3)} className="briefing-btn-primary">
                    Avançar para Etapa 3: Precificação →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3 — COMO FUNCIONA O PREÇO */}
            {currentStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 3 de {TOTAL_ETAPAS}: Como Funciona o Preço (Institucional)</h3>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Como o preço para a escola é definido hoje? *</label>
                    <select value={formData.modelo_de_precificacao}
                      onChange={(e) => setFormData({ ...formData, modelo_de_precificacao: e.target.value })}
                      style={inputStyle}>
                      <option value="preco_unico_fixo">Preço único e fixo, igual para todas</option>
                      <option value="preco_varia_por_volume_ou_perfil">Varia por volume, porte ou perfil da escola</option>
                      <option value="sob_consulta_caso_a_caso">Sob consulta, decidido caso a caso</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Existe uma tabela de preços formal hoje? *</label>
                    <select value={formData.existe_tabela_de_precos_hoje}
                      onChange={(e) => setFormData({ ...formData, existe_tabela_de_precos_hoje: e.target.value })}
                      style={inputStyle}>
                      <option value="sim_tabela_formal">Sim, tabela formal e documentada</option>
                      <option value="tenho_referencia_nao_rigida">Tenho uma referência, não é seguida à risca</option>
                      <option value="nao_decido_na_hora">Não, decido o valor na hora</option>
                    </select>
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Existe margem de negociação sobre o preço? *</label>
                    <select value={formData.margem_de_negociacao}
                      onChange={(e) => setFormData({ ...formData, margem_de_negociacao: e.target.value })}
                      style={inputStyle}>
                      <option value="sem_margem_preco_fechado">Nenhuma — preço fechado, sem desconto</option>
                      <option value="desconto_limitado_com_alcada">Desconto limitado, com alçada de aprovação</option>
                      <option value="negociacao_livre">Negociação livre</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Quem aprova descontos fora do padrão?</label>
                    <input type="text" value={formData.quem_aprova_descontos_especiais}
                      onChange={(e) => setFormData({ ...formData, quem_aprova_descontos_especiais: e.target.value })}
                      placeholder="Ex: até 10% o consultor decide, acima disso precisa da diretoria" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Quais formas de pagamento vocês aceitam?</label>
                  <div className="briefing-checkbox-grid">
                    {[
                      { id: "a_vista", label: "À vista" },
                      { id: "pix", label: "PIX" },
                      { id: "boleto_parcelado", label: "Boleto parcelado" },
                      { id: "cartao_parcelado", label: "Cartão de crédito parcelado" },
                      { id: "contrato_anual_faturamento_mensal", label: "Contrato anual, faturado mensalmente" },
                      { id: "outro", label: "Outra forma" },
                    ].map((item) => (
                      <label key={item.id} style={{
                        display: "flex", alignItems: "center", gap: "8px", fontSize: "13px", color: "var(--text-secondary)",
                        background: "var(--obsidiana)", padding: "10px 12px", borderRadius: "4px", border: "1px solid var(--border)", cursor: "pointer",
                      }}>
                        <input type="checkbox" checked={formData.formas_de_pagamento_aceitas.includes(item.id)} onChange={() => togglePagamento(item.id)} />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>O que exatamente muda o valor cobrado de uma escola para outra?</label>
                  <textarea rows={2} value={formData.variaveis_que_definem_o_preco}
                    onChange={(e) => setFormData({ ...formData, variaveis_que_definem_o_preco: e.target.value })}
                    placeholder="Ex: número de alunos por segmento, tempo de contrato..."
                    style={inputStyle} />
                </div>

                <div className="briefing-actions">
                  <button type="button" onClick={() => setCurrentStep(2)} className="briefing-btn-back">← Voltar</button>
                  <button type="button" onClick={() => setCurrentStep(4)} className="briefing-btn-primary">
                    Avançar para Etapa 4: Fluxo Comercial →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 4 — FLUXO COMERCIAL, DA PRÉ-VENDA AO PÓS-VENDA */}
            {currentStep === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 4 de {TOTAL_ETAPAS}: Fluxo Comercial — Pré-Venda ao Pós-Venda</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Cada etapa que você descrever aqui vira uma fase do funil dentro da plataforma.
                  </p>
                </div>

                <div>
                  <label style={labelStyle}>Como surge uma escola parceira em potencial hoje?</label>
                  <textarea rows={2} value={formData.como_surge_um_lead_hoje}
                    onChange={(e) => setFormData({ ...formData, como_surge_um_lead_hoje: e.target.value })}
                    placeholder="Ex: indicação, prospecção ativa, eventos do setor..."
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Descreva as etapas do processo comercial, do primeiro contato até o fechamento *</label>
                  <span style={hintStyle}>Liste na ordem que acontece hoje, mesmo que informal.</span>
                  <textarea rows={5} required value={formData.etapas_do_processo_comercial}
                    onChange={(e) => setFormData({ ...formData, etapas_do_processo_comercial: e.target.value })}
                    placeholder="Ex: 1) Primeiro contato → 2) Reunião de apresentação → 3) Proposta comercial → 4) Negociação → 5) Contrato assinado..."
                    style={inputStyle} />
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Tempo médio até fechar uma venda</label>
                    <input type="text" value={formData.tempo_medio_de_fechamento}
                      onChange={(e) => setFormData({ ...formData, tempo_medio_de_fechamento: e.target.value })}
                      placeholder="Ex: cerca de 45 dias" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Quais documentos são usados no processo?</label>
                    <input type="text" value={formData.documentos_usados_no_processo}
                      onChange={(e) => setFormData({ ...formData, documentos_usados_no_processo: e.target.value })}
                      placeholder="Ex: proposta em PDF e contrato assinado" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>O que acontece depois que o contrato com a escola é fechado (pós-venda)?</label>
                  <textarea rows={3} value={formData.o_que_acontece_apos_o_fechamento}
                    onChange={(e) => setFormData({ ...formData, o_que_acontece_apos_o_fechamento: e.target.value })}
                    placeholder="Ex: implantação/onboarding pedagógico antes do início das aulas..."
                    style={inputStyle} />
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>O relacionamento com a escola é recorrente ou pontual? *</label>
                    <select value={formData.tipo_de_relacionamento_com_cliente}
                      onChange={(e) => setFormData({ ...formData, tipo_de_relacionamento_com_cliente: e.target.value })}
                      style={inputStyle}>
                      <option value="recorrente_com_renovacao">Recorrente, com renovação periódica</option>
                      <option value="contrato_longo_sem_renovacao_frequente">Contrato longo, sem renovação frequente</option>
                      <option value="venda_pontual_sem_continuidade">Venda pontual, sem continuidade</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Como é feita a renovação hoje (se houver)?</label>
                    <input type="text" value={formData.como_e_feita_a_renovacao}
                      onChange={(e) => setFormData({ ...formData, como_e_feita_a_renovacao: e.target.value })}
                      placeholder="Ex: contato 60 dias antes do vencimento" style={inputStyle} />
                  </div>
                </div>

                <div className="briefing-actions">
                  <button type="button" onClick={() => setCurrentStep(3)} className="briefing-btn-back">← Voltar</button>
                  <button type="button" onClick={() => setCurrentStep(5)} className="briefing-btn-primary">
                    Avançar para Etapa 5: Escolas Atuais →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 5 — ESCOLAS/CLIENTES ATUAIS (CADASTRO) */}
            {currentStep === 5 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 5 de {TOTAL_ETAPAS}: Escolas Parceiras Atuais</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Liste algumas escolas que a Kairós já atende hoje, com os principais dados contratuais. Não precisa ser a lista completa — uma amostra já ajuda.
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {clientesAtuais.map((cliente, index) => (
                    <div key={index} style={{
                      background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "6px", padding: "16px",
                      display: "flex", flexDirection: "column", gap: "12px",
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", fontWeight: 600, textTransform: "uppercase" }}>
                          Escola {index + 1}
                        </span>
                        {clientesAtuais.length > 1 && (
                          <button type="button" onClick={() => removerCliente(index)} title="Remover"
                            style={{ background: "transparent", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>
                            ✕ Remover
                          </button>
                        )}
                      </div>

                      <div className="briefing-grid-2">
                        <div>
                          <label style={labelStyle}>Nome da Escola</label>
                          <input type="text" value={cliente.nome_cliente}
                            onChange={(e) => atualizarCliente(index, "nome_cliente", e.target.value)}
                            placeholder="Ex: nome da escola parceira" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Item ou Produto Principal Contratado</label>
                          <input type="text" value={cliente.item_ou_produto_principal}
                            onChange={(e) => atualizarCliente(index, "item_ou_produto_principal", e.target.value)}
                            placeholder="Ex: currículo completo, materiais..." style={inputStyle} />
                        </div>
                      </div>

                      <div className="briefing-grid-2">
                        <div>
                          <label style={labelStyle}>Quantidade de Alunos</label>
                          <input type="text" value={cliente.quantidade}
                            onChange={(e) => atualizarCliente(index, "quantidade", e.target.value)}
                            placeholder="Ex: 120" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Quantidade de Livros (se aplicável)</label>
                          <input type="text" value={cliente.unidade_quantidade}
                            onChange={(e) => atualizarCliente(index, "unidade_quantidade", e.target.value)}
                            placeholder="Ex: 120 kits, um por aluno" style={inputStyle} />
                        </div>
                      </div>

                      <div className="briefing-grid-2">
                        <div>
                          <label style={labelStyle}>Valor dos Livros / Total do Contrato</label>
                          <input type="text" value={cliente.valor_unitario}
                            onChange={(e) => atualizarCliente(index, "valor_unitario", e.target.value)}
                            placeholder="Ex: R$ 250/aluno ou R$ 30.000 no total" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Forma de Pagamento</label>
                          <input type="text" value={cliente.forma_pagamento}
                            onChange={(e) => atualizarCliente(index, "forma_pagamento", e.target.value)}
                            placeholder="Ex: boleto em 10x, PIX à vista" style={inputStyle} />
                        </div>
                      </div>

                      <div className="briefing-grid-2">
                        <div>
                          <label style={labelStyle}>Início do Contrato</label>
                          <input type="text" value={cliente.data_inicio}
                            onChange={(e) => atualizarCliente(index, "data_inicio", e.target.value)}
                            placeholder="Ex: 03/2024 ou 'parceira desde 2021'" style={inputStyle} />
                        </div>
                        <div>
                          <label style={labelStyle}>Observações</label>
                          <input type="text" value={cliente.observacoes}
                            onChange={(e) => atualizarCliente(index, "observacoes", e.target.value)}
                            placeholder="Ex: renovou 2x, em negociação de reajuste..." style={inputStyle} />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ textAlign: "center" }}>
                  <button type="button" onClick={adicionarCliente} style={{
                    display: "inline-flex", alignItems: "center", gap: "8px", background: "rgba(200, 245, 66, 0.08)",
                    border: "1px dashed var(--sinal)", color: "var(--sinal)", padding: "10px 20px", borderRadius: "4px",
                    fontFamily: "var(--font-mono)", fontSize: "11px", fontWeight: 600, cursor: "pointer", textTransform: "uppercase",
                  }}>
                    + Adicionar Outra Escola
                  </button>
                </div>

                <div className="briefing-actions">
                  <button type="button" onClick={() => setCurrentStep(4)} className="briefing-btn-back">← Voltar</button>
                  <button type="button" onClick={() => setCurrentStep(6)} className="briefing-btn-primary">
                    Avançar para Etapa 6: Metas →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 6 — METAS E PLANEJAMENTO COMERCIAL */}
            {currentStep === 6 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 6 de {TOTAL_ETAPAS}: Metas e Planejamento Comercial</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Essas respostas alimentam o módulo de Metas da plataforma.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Qual o período de planejamento comercial?</label>
                    <select value={formData.periodo_de_planejamento}
                      onChange={(e) => setFormData({ ...formData, periodo_de_planejamento: e.target.value })}
                      style={inputStyle}>
                      <option value="mensal">Mensal</option>
                      <option value="trimestral">Trimestral</option>
                      <option value="semestral">Semestral</option>
                      <option value="anual">Anual</option>
                    </select>
                  </div>
                  <div>
                    <label style={labelStyle}>Meta de novas escolas parceiras por período</label>
                    <input type="text" value={formData.meta_novos_clientes_periodo}
                      onChange={(e) => setFormData({ ...formData, meta_novos_clientes_periodo: e.target.value })}
                      placeholder="Ex: 15 novas escolas por trimestre" style={inputStyle} />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Meta de escolas parceiras novas até 2027</label>
                    <input type="text" value={formData.meta_escolas_novas_2027}
                      onChange={(e) => setFormData({ ...formData, meta_escolas_novas_2027: e.target.value })}
                      placeholder="Ex: 40 escolas parceiras novas até 2027" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Meta de reuniões até dezembro de 2026</label>
                    <input type="text" value={formData.meta_reunioes_ate_dez_2026}
                      onChange={(e) => setFormData({ ...formData, meta_reunioes_ate_dez_2026: e.target.value })}
                      placeholder="Ex: 100 reuniões comerciais até dez/2026" style={inputStyle} />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Meta de número de alunos atendidos</label>
                    <input type="text" value={formData.meta_alunos}
                      onChange={(e) => setFormData({ ...formData, meta_alunos: e.target.value })}
                      placeholder="Ex: 5.000 alunos atendidos no período" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Meta de livros vendidos</label>
                    <input type="text" value={formData.meta_livros_vendidos}
                      onChange={(e) => setFormData({ ...formData, meta_livros_vendidos: e.target.value })}
                      placeholder="Ex: 3.000 livros/kits vendidos no período" style={inputStyle} />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={labelStyle}>Meta financeira de faturamento</label>
                    <input type="text" value={formData.meta_faturamento_periodo}
                      onChange={(e) => setFormData({ ...formData, meta_faturamento_periodo: e.target.value })}
                      placeholder="Ex: R$ 500.000 no trimestre" style={inputStyle} />
                  </div>
                  <div>
                    <label style={labelStyle}>Meta de renovação de escolas existentes</label>
                    <input type="text" value={formData.meta_percentual_renovacao}
                      onChange={(e) => setFormData({ ...formData, meta_percentual_renovacao: e.target.value })}
                      placeholder="Ex: 90% de renovação" style={inputStyle} />
                  </div>
                </div>

                <div>
                  <label style={labelStyle}>Quais indicadores vocês já acompanham hoje, mesmo que informalmente?</label>
                  <textarea rows={3} value={formData.indicadores_que_ja_acompanham_hoje}
                    onChange={(e) => setFormData({ ...formData, indicadores_que_ja_acompanham_hoje: e.target.value })}
                    placeholder="Ex: hoje acompanhamos só o total faturado no mês, em planilha..."
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Outras metas com prazo definido que não couberam acima</label>
                  <span style={hintStyle}>Qualquer outro número que vocês acompanham com uma data-alvo específica.</span>
                  <textarea rows={2} value={formData.outras_metas_com_prazo}
                    onChange={(e) => setFormData({ ...formData, outras_metas_com_prazo: e.target.value })}
                    placeholder="Ex: 20 propostas enviadas até março de 2027..."
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Observações Adicionais sobre o canal institucional</label>
                  <textarea rows={3} value={formData.observacoes_finais}
                    onChange={(e) => setFormData({ ...formData, observacoes_finais: e.target.value })}
                    placeholder="Sinta-se à vontade para compartilhar qualquer detalhe extra..."
                    style={inputStyle} />
                </div>

                <div className="briefing-actions">
                  <button type="button" onClick={() => setCurrentStep(5)} className="briefing-btn-back">← Voltar</button>
                  <button type="button" onClick={() => setCurrentStep(7)} className="briefing-btn-primary">
                    Avançar para Etapa 7: Venda para Família →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 7 — CANAL DE VAREJO: VENDA PARA A FAMÍLIA */}
            {currentStep === 7 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 7 de {TOTAL_ETAPAS}: Canal de Varejo — Venda para a Família</h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    A Kairós também vende direto para famílias homeschooling, fora do modelo institucional das etapas anteriores. Este canal ainda não está mapeado na plataforma — responda o que souber, mesmo que parcial.
                  </p>
                </div>

                <div>
                  <label style={labelStyle}>A venda para a família já acontece hoje num site/carrinho próprio, ou é feita manualmente?</label>
                  <span style={hintStyle}>Se já existe uma loja/plataforma rodando, a plataforma precisa importar os pedidos de lá ou vai substituí-la?</span>
                  <textarea rows={3} value={formData.venda_familia_site_proprio}
                    onChange={(e) => setFormData({ ...formData, venda_familia_site_proprio: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>O preço para a família é igual ao preço por aluno cobrado da escola, ou é uma tabela de varejo separada?</label>
                  <textarea rows={2} value={formData.preco_familia_vs_escola}
                    onChange={(e) => setFormData({ ...formData, preco_familia_vs_escola: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>A compra da família é parcelada/recorrente (assinatura anual) ou é uma compra avulsa repetida manualmente todo ano?</label>
                  <textarea rows={2} value={formData.compra_parcelada_ou_avulsa}
                    onChange={(e) => setFormData({ ...formData, compra_parcelada_ou_avulsa: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Família com mais de um filho: é um pedido por criança ou um cadastro de família com vários &quot;alunos&quot; dentro?</label>
                  <textarea rows={2} value={formData.familia_multiplos_filhos}
                    onChange={(e) => setFormData({ ...formData, familia_multiplos_filhos: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Existe algum desconto por quantidade de filhos/irmãos na mesma família?</label>
                  <input type="text" value={formData.desconto_irmaos}
                    onChange={(e) => setFormData({ ...formData, desconto_irmaos: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>A compra da família passa por atendimento humano antes de fechar, ou é 100% self-service?</label>
                  <textarea rows={2} value={formData.compra_tem_atendimento_humano}
                    onChange={(e) => setFormData({ ...formData, compra_tem_atendimento_humano: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Existe suporte pós-venda para a família (dúvida sobre material, reposição de livro etc.) que precisa ficar registrado?</label>
                  <textarea rows={2} value={formData.suporte_pos_venda_familia}
                    onChange={(e) => setFormData({ ...formData, suporte_pos_venda_familia: e.target.value })}
                    style={inputStyle} />
                </div>

                <div className="briefing-actions">
                  <button type="button" onClick={() => setCurrentStep(6)} className="briefing-btn-back">← Voltar</button>
                  <button type="button" onClick={() => setCurrentStep(8)} className="briefing-btn-primary">
                    Avançar para Etapa 8: Logística & Mais →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 8 — LOGÍSTICA, CRUZAMENTO ENTRE CANAIS E PERGUNTA ABERTA */}
            {currentStep === 8 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 8 de {TOTAL_ETAPAS}: Logística, Cruzamento entre Canais e Pergunta Aberta</h3>
                </div>

                <div>
                  <label style={labelStyle}>Pedido de família precisa de rastreamento de envio individual (endereço, status, transportadora)? De quem é essa responsabilidade — Kairós ou parceiro logístico?</label>
                  <textarea rows={2} value={formData.rastreamento_envio_individual}
                    onChange={(e) => setFormData({ ...formData, rastreamento_envio_individual: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Existe controle de estoque/tiragem dos livros que precisa aparecer no CRM, ou é gerido em outro sistema?</label>
                  <textarea rows={2} value={formData.controle_estoque_livros}
                    onChange={(e) => setFormData({ ...formData, controle_estoque_livros: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>Pode acontecer de uma família de escola parceira comprar também direto no varejo, fora do contrato institucional? Como evitar contar isso duas vezes?</label>
                  <textarea rows={2} value={formData.familia_de_escola_parceira_compra_avulso}
                    onChange={(e) => setFormData({ ...formData, familia_de_escola_parceira_compra_avulso: e.target.value })}
                    style={inputStyle} />
                </div>

                <div>
                  <label style={labelStyle}>As metas de faturamento/crescimento são um número só (varejo + institucional) ou a diretoria acompanha os dois canais separados?</label>
                  <textarea rows={2} value={formData.metas_separadas_por_canal}
                    onChange={(e) => setFormData({ ...formData, metas_separadas_por_canal: e.target.value })}
                    style={inputStyle} />
                </div>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}>
                  <label style={labelStyle}>Pergunta aberta: existe alguma outra funcionalidade que você imagina ser importante ter na plataforma, para toda a gestão comercial?</label>
                  <span style={hintStyle}>Fique à vontade para citar tudo que julgar necessário — institucional, varejo, ou qualquer outra coisa, mesmo que pareça fora do que perguntamos aqui.</span>
                  <textarea rows={5} value={formData.outras_funcionalidades_importantes}
                    onChange={(e) => setFormData({ ...formData, outras_funcionalidades_importantes: e.target.value })}
                    style={inputStyle} />
                </div>

                <div className="briefing-actions">
                  <button type="button" onClick={() => setCurrentStep(7)} className="briefing-btn-back">← Voltar</button>
                  <button type="submit" disabled={loading} className="briefing-btn-submit">
                    {loading ? "Enviando Respostas..." : "Finalizar e Enviar Respostas →"}
                  </button>
                </div>
              </div>
            )}
          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
