"use client";

import { useState } from "react";
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

export function FormularioGenerico() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [formData, setFormData] = useState({
    // ETAPA 1: SOBRE VOCÊ E SUA EMPRESA
    nome_solicitante: "",
    cargo_solicitante: "",
    empresa_nome: "",
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
    meta_faturamento_periodo: "",
    meta_percentual_renovacao: "",
    indicadores_que_ja_acompanham_hoje: "",
    observacoes_finais: "",
  });

  // ETAPA 5: CLIENTES ATUAIS — lista dinâmica, começa com 1 linha em branco
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

  // Campos obrigatórios por etapa — como cada etapa só renderiza seus próprios
  // campos no DOM, o `required` do HTML só protege a etapa visível no momento
  // do envio. Sem essa checagem, quem pula direto pra Etapa 6 pela barra de
  // navegação consegue enviar um briefing vazio (aconteceu no primeiro teste
  // em produção). Valida tudo de 1 a 4 antes de aceitar o envio, de qualquer etapa.
  function encontrarEtapaComCampoFaltando(): { etapa: number; mensagem: string } | null {
    const etapa1: [string, string][] = [
      [formData.nome_solicitante, "Seu Nome Completo"],
      [formData.cargo_solicitante, "Seu Cargo ou Papel na Empresa"],
      [formData.empresa_nome, "Nome da Empresa"],
      [formData.ramo_atuacao, "Ramo de Atuação"],
      [formData.telefone_whatsapp, "WhatsApp Comercial"],
      [formData.email_contato, "E-mail de Contato"],
    ];
    for (const [valor, nome] of etapa1) {
      if (!valor.trim()) return { etapa: 1, mensagem: `Falta preencher "${nome}" na Etapa 1.` };
    }

    const etapa2: [string, string][] = [
      [formData.o_que_a_empresa_vende, "O que a sua empresa vende"],
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
      const res = await fetch("/api/briefing-plataforma-comercial", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          clientes_atuais: clientesAtuais.filter((c) => c.nome_cliente.trim() !== ""),
        }),
      });
      const data = await res.json();
      if (!data.success) {
        setSubmitError(data.error || "Não foi possível salvar seu briefing agora. Tente novamente em instantes ou nos chame no WhatsApp.");
        return;
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Falha de conexão ao enviar o briefing. Verifique sua internet e tente novamente, ou nos chame no WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const stepsList = [
    { step: 1, label: "1. Sua Empresa" },
    { step: 2, label: "2. O Que Vendem" },
    { step: 3, label: "3. Precificação" },
    { step: 4, label: "4. Fluxo Comercial" },
    { step: 5, label: "5. Clientes Atuais" },
    { step: 6, label: "6. Metas" },
  ];

  return (
    <>
      <div style={{ marginBottom: "28px", textAlign: "center" }}>
        <div style={{
          display: "inline-block",
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--sinal)",
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          marginBottom: "8px",
        }}>
          Diagnóstico Comercial & Arquitetura de Plataforma
        </div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 5vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
          Briefing para Construção de Plataforma Comercial
        </h1>
        <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "660px", margin: "10px auto 0", lineHeight: 1.6 }}>
          Este formulário mapeia como o seu negócio vende hoje — do primeiro contato ao pós-venda — para que possamos desenhar um CRM ou plataforma comercial sob medida para a sua realidade, e não um sistema genérico.
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
                padding: "8px 12px",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: currentStep === s.step ? 600 : 400,
                cursor: "pointer",
                textAlign: "center",
                whiteSpace: "nowrap",
                flexShrink: 0,
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
            Briefing Comercial Recebido com Sucesso!
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.6 }}>
            Obrigado pelas respostas. Nossa equipe vai estudar o seu fluxo comercial e retornar com um diagnóstico de como estruturar sua plataforma, pelo WhatsApp e e-mail informados.
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

          {/* ETAPA 1 — SOBRE VOCÊ E SUA EMPRESA */}
          {currentStep === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 1 de 6: Sua Empresa</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Quem preenche e qual empresa vamos mapear.
                </p>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Seu Nome Completo *</label>
                  <span style={hintStyle}>Com quem vamos conversar durante o diagnóstico.</span>
                  <input type="text" required value={formData.nome_solicitante}
                    onChange={(e) => setFormData({ ...formData, nome_solicitante: e.target.value })}
                    placeholder="Ex: Ana Beatriz Souza" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Seu Cargo ou Papel na Empresa *</label>
                  <span style={hintStyle}>Ajuda a entender o nível de decisão sobre o processo comercial.</span>
                  <input type="text" required value={formData.cargo_solicitante}
                    onChange={(e) => setFormData({ ...formData, cargo_solicitante: e.target.value })}
                    placeholder="Ex: Diretora Comercial, Sócio, Gerente de Vendas" style={inputStyle} />
                </div>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Nome da Empresa *</label>
                  <span style={hintStyle}>Como a empresa é conhecida pelos seus clientes.</span>
                  <input type="text" required value={formData.empresa_nome}
                    onChange={(e) => setFormData({ ...formData, empresa_nome: e.target.value })}
                    placeholder="Ex: Nome da sua empresa" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Ramo de Atuação / Segmento *</label>
                  <span style={hintStyle}>O tipo de negócio, mercado em que atua.</span>
                  <input type="text" required value={formData.ramo_atuacao}
                    onChange={(e) => setFormData({ ...formData, ramo_atuacao: e.target.value })}
                    placeholder="Ex: Educação, Saúde, B2B, Varejo" style={inputStyle} />
                </div>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>WhatsApp Comercial com DDD *</label>
                  <span style={hintStyle}>Para retornarmos com o diagnóstico.</span>
                  <input type="text" required value={formData.telefone_whatsapp}
                    onChange={(e) => setFormData({ ...formData, telefone_whatsapp: e.target.value })}
                    placeholder="(83) 99999-9999" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>E-mail de Contato *</label>
                  <span style={hintStyle}>Para envio formal do diagnóstico e proposta.</span>
                  <input type="email" required value={formData.email_contato}
                    onChange={(e) => setFormData({ ...formData, email_contato: e.target.value })}
                    placeholder="seuemail@empresa.com.br" style={inputStyle} />
                </div>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Cidade e Estado</label>
                  <span style={hintStyle}>Mercado geográfico de atuação.</span>
                  <input type="text" value={formData.cidade_estado}
                    onChange={(e) => setFormData({ ...formData, cidade_estado: e.target.value })}
                    placeholder="Ex: João Pessoa - PB ou Atuação Nacional" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Site ou Sistema Atual (se tiver)</label>
                  <span style={hintStyle}>Se já usam alguma planilha, CRM ou sistema hoje.</span>
                  <input type="text" value={formData.site_atual}
                    onChange={(e) => setFormData({ ...formData, site_atual: e.target.value })}
                    placeholder="www.suaempresa.com.br ou nome do sistema atual" style={inputStyle} />
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
                <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 2 de 6: O Que Vocês Vendem</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Entender o produto/serviço principal e quem decide a compra.
                </p>
              </div>

              <div>
                <label style={labelStyle}>O que a sua empresa vende, exatamente? *</label>
                <span style={hintStyle}>Descreva o produto ou serviço que gera a maior parte da receita hoje.</span>
                <textarea rows={3} required value={formData.o_que_a_empresa_vende}
                  onChange={(e) => setFormData({ ...formData, o_que_a_empresa_vende: e.target.value })}
                  placeholder="Ex: Vendemos uma licença de uso anual do nosso produto, cobrada por unidade/pessoa atendida pelo cliente..."
                  style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Qual é a unidade de venda? *</label>
                <span style={hintStyle}>O que exatamente é cobrado — por pessoa/unidade, por pacote fechado, por item avulso ou por contrato recorrente?</span>
                <select value={formData.unidade_de_venda}
                  onChange={(e) => setFormData({ ...formData, unidade_de_venda: e.target.value })}
                  style={inputStyle}>
                  <option value="por_pessoa_ou_unidade">Por pessoa/unidade atendida (ex: por aluno, por usuário, por paciente)</option>
                  <option value="pacote_fechado_por_cliente">Pacote fechado por cliente, independente de volume</option>
                  <option value="produto_unitario_avulso">Produto/item unitário vendido avulso</option>
                  <option value="servico_recorrente">Serviço ou contrato recorrente (mensalidade/assinatura)</option>
                  <option value="projeto_sob_medida">Projeto sob medida, orçado caso a caso</option>
                </select>
              </div>

              <div>
                <label style={labelStyle}>Quem é o cliente que decide e assina a compra? *</label>
                <span style={hintStyle}>Pessoa física, empresa, instituição — e quem dentro dela aprova.</span>
                <textarea rows={3} required value={formData.quem_e_o_cliente_comprador}
                  onChange={(e) => setFormData({ ...formData, quem_e_o_cliente_comprador: e.target.value })}
                  placeholder="Ex: Diretores ou responsáveis legais de instituições, que decidem em nome da organização..."
                  style={inputStyle} />
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Ticket Médio Atual</label>
                  <span style={hintStyle}>Valor médio que um cliente paga, hoje.</span>
                  <input type="text" value={formData.ticket_medio_atual}
                    onChange={(e) => setFormData({ ...formData, ticket_medio_atual: e.target.value })}
                    placeholder="Ex: R$ 15.000/ano por cliente" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Quantos clientes ativos vocês têm hoje?</label>
                  <span style={hintStyle}>Número aproximado — vamos usar essa base na Etapa 5.</span>
                  <input type="text" value={formData.quantos_clientes_ativos_hoje}
                    onChange={(e) => setFormData({ ...formData, quantos_clientes_ativos_hoje: e.target.value })}
                    placeholder="Ex: cerca de 40 clientes ativos" style={inputStyle} />
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
                <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 3 de 6: Como Funciona o Preço</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  A régua de preços e a margem de negociação viram regras dentro da plataforma.
                </p>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Como o preço é definido hoje? *</label>
                  <span style={hintStyle}>Isso define se a plataforma precisa de um motor de cálculo ou só de um campo de valor.</span>
                  <select value={formData.modelo_de_precificacao}
                    onChange={(e) => setFormData({ ...formData, modelo_de_precificacao: e.target.value })}
                    style={inputStyle}>
                    <option value="preco_unico_fixo">Preço único e fixo, igual para todos os clientes</option>
                    <option value="preco_varia_por_volume_ou_perfil">Preço varia por volume, porte ou perfil do cliente</option>
                    <option value="sob_consulta_caso_a_caso">Sob consulta, decidido caso a caso</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Existe uma tabela de preços formal hoje? *</label>
                  <span style={hintStyle}>Se já existe, ela pode virar a base cadastrada na plataforma.</span>
                  <select value={formData.existe_tabela_de_precos_hoje}
                    onChange={(e) => setFormData({ ...formData, existe_tabela_de_precos_hoje: e.target.value })}
                    style={inputStyle}>
                    <option value="sim_tabela_formal">Sim, temos uma tabela de preços formal e documentada</option>
                    <option value="tenho_referencia_nao_rigida">Tenho uma referência, mas não é seguida à risca</option>
                    <option value="nao_decido_na_hora">Não, decido o valor na hora, conforme o caso</option>
                  </select>
                </div>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Existe margem de negociação sobre o preço? *</label>
                  <span style={hintStyle}>Define se a plataforma precisa de um controle de desconto com alçada de aprovação.</span>
                  <select value={formData.margem_de_negociacao}
                    onChange={(e) => setFormData({ ...formData, margem_de_negociacao: e.target.value })}
                    style={inputStyle}>
                    <option value="sem_margem_preco_fechado">Nenhuma — preço fechado, sem desconto</option>
                    <option value="desconto_limitado_com_alcada">Desconto limitado, com alçada de aprovação por nível</option>
                    <option value="negociacao_livre">Negociação livre, conforme o vendedor achar melhor</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Quem aprova descontos fora do padrão?</label>
                  <span style={hintStyle}>Ex: até X% qualquer vendedor aprova; acima disso, só a gerência ou diretoria.</span>
                  <input type="text" value={formData.quem_aprova_descontos_especiais}
                    onChange={(e) => setFormData({ ...formData, quem_aprova_descontos_especiais: e.target.value })}
                    placeholder="Ex: até 10% o vendedor decide, acima disso precisa da diretoria" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Quais formas de pagamento vocês aceitam?</label>
                <span style={hintStyle}>Selecione todas as que se aplicam.</span>
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
                <label style={labelStyle}>O que exatamente muda o valor cobrado de um cliente para outro?</label>
                <span style={hintStyle}>Ex: quantidade de pessoas atendidas, porte do cliente, região, urgência, tempo de contrato.</span>
                <textarea rows={2} value={formData.variaveis_que_definem_o_preco}
                  onChange={(e) => setFormData({ ...formData, variaveis_que_definem_o_preco: e.target.value })}
                  placeholder="Ex: o valor final depende do número de pessoas atendidas e do tempo de contrato..."
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
                <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 4 de 6: Fluxo Comercial — Pré-Venda ao Pós-Venda</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Cada etapa que você descrever aqui vira uma fase do funil dentro da plataforma.
                </p>
              </div>

              <div>
                <label style={labelStyle}>Como surge um lead/oportunidade hoje?</label>
                <span style={hintStyle}>De onde vêm os contatos: indicação, prospecção ativa, eventos, site, redes sociais.</span>
                <textarea rows={2} value={formData.como_surge_um_lead_hoje}
                  onChange={(e) => setFormData({ ...formData, como_surge_um_lead_hoje: e.target.value })}
                  placeholder="Ex: a maior parte vem de indicação e de eventos do setor..."
                  style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Descreva as etapas do processo comercial, do primeiro contato até o fechamento *</label>
                <span style={hintStyle}>Liste na ordem que acontece hoje, mesmo que informal. Ex: 1) primeiro contato → 2) apresentação/reunião → 3) proposta enviada → 4) negociação → 5) contrato assinado.</span>
                <textarea rows={5} required value={formData.etapas_do_processo_comercial}
                  onChange={(e) => setFormData({ ...formData, etapas_do_processo_comercial: e.target.value })}
                  placeholder="Ex: 1) Primeiro contato via indicação → 2) Reunião de apresentação → 3) Envio de proposta comercial → 4) Negociação de valores → 5) Assinatura do contrato..."
                  style={inputStyle} />
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Tempo médio até fechar uma venda</label>
                  <span style={hintStyle}>Do primeiro contato até a assinatura.</span>
                  <input type="text" value={formData.tempo_medio_de_fechamento}
                    onChange={(e) => setFormData({ ...formData, tempo_medio_de_fechamento: e.target.value })}
                    placeholder="Ex: cerca de 45 dias" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Quais documentos são usados no processo?</label>
                  <span style={hintStyle}>Proposta, contrato, termo de aceite, ordem de serviço, etc.</span>
                  <input type="text" value={formData.documentos_usados_no_processo}
                    onChange={(e) => setFormData({ ...formData, documentos_usados_no_processo: e.target.value })}
                    placeholder="Ex: proposta em PDF e contrato assinado digitalmente" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>O que acontece depois que o contrato é fechado (pós-venda)?</label>
                <span style={hintStyle}>Onboarding, entrega, ativação, suporte — o que vem depois do &quot;sim&quot;.</span>
                <textarea rows={3} value={formData.o_que_acontece_apos_o_fechamento}
                  onChange={(e) => setFormData({ ...formData, o_que_acontece_apos_o_fechamento: e.target.value })}
                  placeholder="Ex: depois de assinado, o cliente passa por um processo de implantação/onboarding antes de começar a usar..."
                  style={inputStyle} />
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>O relacionamento com o cliente é recorrente ou pontual? *</label>
                  <span style={hintStyle}>Define se a plataforma precisa de um módulo de renovação.</span>
                  <select value={formData.tipo_de_relacionamento_com_cliente}
                    onChange={(e) => setFormData({ ...formData, tipo_de_relacionamento_com_cliente: e.target.value })}
                    style={inputStyle}>
                    <option value="recorrente_com_renovacao">Recorrente, com renovação periódica</option>
                    <option value="contrato_longo_sem_renovacao_frequente">Contrato longo, sem renovação frequente</option>
                    <option value="venda_pontual_sem_continuidade">Venda pontual, sem continuidade depois</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Como é feita a renovação hoje (se houver)?</label>
                  <span style={hintStyle}>Quem entra em contato, com que antecedência, o que é reavaliado.</span>
                  <input type="text" value={formData.como_e_feita_a_renovacao}
                    onChange={(e) => setFormData({ ...formData, como_e_feita_a_renovacao: e.target.value })}
                    placeholder="Ex: entramos em contato 60 dias antes do vencimento para renegociar" style={inputStyle} />
                </div>
              </div>

              <div className="briefing-actions">
                <button type="button" onClick={() => setCurrentStep(3)} className="briefing-btn-back">← Voltar</button>
                <button type="button" onClick={() => setCurrentStep(5)} className="briefing-btn-primary">
                  Avançar para Etapa 5: Clientes Atuais →
                </button>
              </div>
            </div>
          )}

          {/* ETAPA 5 — CLIENTES ATUAIS (CADASTRO) */}
          {currentStep === 5 && (
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 5 de 6: Sua Carteira de Clientes Atuais</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Liste os clientes que vocês já atendem hoje, com os principais dados contratuais de cada um. Essa base pode ser importada direto para a plataforma no dia em que ela entrar no ar — não precisa ser uma lista completa agora, só uma amostra já ajuda.
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
                        Cliente {index + 1}
                      </span>
                      {clientesAtuais.length > 1 && (
                        <button type="button" onClick={() => removerCliente(index)} title="Remover cliente"
                          style={{ background: "transparent", border: "none", color: "#ff6b6b", cursor: "pointer", fontSize: "13px", fontWeight: "bold" }}>
                          ✕ Remover
                        </button>
                      )}
                    </div>

                    <div className="briefing-grid-2">
                      <div>
                        <label style={labelStyle}>Nome do Cliente</label>
                        <input type="text" value={cliente.nome_cliente}
                          onChange={(e) => atualizarCliente(index, "nome_cliente", e.target.value)}
                          placeholder="Ex: nome do cliente/instituição" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Item ou Produto Principal Contratado</label>
                        <input type="text" value={cliente.item_ou_produto_principal}
                          onChange={(e) => atualizarCliente(index, "item_ou_produto_principal", e.target.value)}
                          placeholder="Ex: o que esse cliente comprou" style={inputStyle} />
                      </div>
                    </div>

                    <div className="briefing-grid-2">
                      <div>
                        <label style={labelStyle}>Quantidade</label>
                        <input type="text" value={cliente.quantidade}
                          onChange={(e) => atualizarCliente(index, "quantidade", e.target.value)}
                          placeholder="Ex: 120" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Unidade dessa Quantidade</label>
                        <input type="text" value={cliente.unidade_quantidade}
                          onChange={(e) => atualizarCliente(index, "unidade_quantidade", e.target.value)}
                          placeholder="Ex: alunos, usuários, licenças, unidades" style={inputStyle} />
                      </div>
                    </div>

                    <div className="briefing-grid-2">
                      <div>
                        <label style={labelStyle}>Valor Unitário ou Total do Contrato</label>
                        <input type="text" value={cliente.valor_unitario}
                          onChange={(e) => atualizarCliente(index, "valor_unitario", e.target.value)}
                          placeholder="Ex: R$ 250/unidade ou R$ 30.000 no total" style={inputStyle} />
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
                          placeholder="Ex: 03/2024 ou 'cliente desde 2021'" style={inputStyle} />
                      </div>
                      <div>
                        <label style={labelStyle}>Observações</label>
                        <input type="text" value={cliente.observacoes}
                          onChange={(e) => atualizarCliente(index, "observacoes", e.target.value)}
                          placeholder="Ex: cliente renovou 2x, está em negociação de reajuste..." style={inputStyle} />
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
                  + Adicionar Outro Cliente
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
                <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>Etapa 6 de 6: Metas e Planejamento Comercial</h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Essas respostas alimentam o módulo de Metas da plataforma — o painel que acompanha se vocês estão no caminho do que planejaram.
                </p>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Qual o período de planejamento comercial de vocês?</label>
                  <span style={hintStyle}>Com que frequência vocês revisam metas hoje.</span>
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
                  <label style={labelStyle}>Meta de novos clientes por período</label>
                  <span style={hintStyle}>Quantos clientes novos vocês querem fechar nesse período.</span>
                  <input type="text" value={formData.meta_novos_clientes_periodo}
                    onChange={(e) => setFormData({ ...formData, meta_novos_clientes_periodo: e.target.value })}
                    placeholder="Ex: 15 novos clientes por trimestre" style={inputStyle} />
                </div>
              </div>

              <div className="briefing-grid-2">
                <div>
                  <label style={labelStyle}>Meta de faturamento por período</label>
                  <span style={hintStyle}>Se tiver um número em mente, mesmo que aproximado.</span>
                  <input type="text" value={formData.meta_faturamento_periodo}
                    onChange={(e) => setFormData({ ...formData, meta_faturamento_periodo: e.target.value })}
                    placeholder="Ex: R$ 500.000 no trimestre" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Meta de renovação de clientes existentes</label>
                  <span style={hintStyle}>Percentual da carteira atual que vocês querem manter/renovar.</span>
                  <input type="text" value={formData.meta_percentual_renovacao}
                    onChange={(e) => setFormData({ ...formData, meta_percentual_renovacao: e.target.value })}
                    placeholder="Ex: 90% de renovação" style={inputStyle} />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Quais indicadores vocês já acompanham hoje, mesmo que informalmente?</label>
                <span style={hintStyle}>Ex: número de propostas enviadas, taxa de fechamento, ticket médio, tempo de ciclo de venda.</span>
                <textarea rows={3} value={formData.indicadores_que_ja_acompanham_hoje}
                  onChange={(e) => setFormData({ ...formData, indicadores_que_ja_acompanham_hoje: e.target.value })}
                  placeholder="Ex: hoje acompanhamos apenas o total faturado no mês, em planilha..."
                  style={inputStyle} />
              </div>

              <div>
                <label style={labelStyle}>Observações Adicionais</label>
                <span style={hintStyle}>Algo mais que considera importante sobre como vocês vendem hoje?</span>
                <textarea rows={3} value={formData.observacoes_finais}
                  onChange={(e) => setFormData({ ...formData, observacoes_finais: e.target.value })}
                  placeholder="Sinta-se à vontade para compartilhar qualquer detalhe extra..."
                  style={inputStyle} />
              </div>

              <div className="briefing-actions">
                <button type="button" onClick={() => setCurrentStep(5)} className="briefing-btn-back">← Voltar</button>
                <button type="submit" disabled={loading} className="briefing-btn-submit">
                  {loading ? "Enviando Briefing Comercial..." : "Finalizar e Enviar Briefing →"}
                </button>
              </div>
            </div>
          )}
        </form>
      )}
    </>
  );
}
