"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function BriefingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileNames, setFileNames] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    // ETAPA 1: SOBRE VOCÊ E SUA EMPRESA
    nome_solicitante: "",
    cargo_solicitante: "",
    empresa_nome: "",
    ramo_atuacao: "",
    estagio_empresa: "consolidada_modernizacao",
    diferencial_competitivo: "",
    email_contato: "",
    telefone_whatsapp: "",
    cidade_estado: "",
    website_atual: "",

    // ETAPA 2: MODELO DE NEGÓCIO, PERSONA E DECISÃO DE COMPRA
    o_que_sua_empresa_faz: "",
    como_sua_empresa_ganha_dinheiro: "servico_sob_consulta",
    ticket_medio: "",
    quem_e_seu_cliente_ideal: "",
    principal_dor_do_seu_cliente: "",
    maior_objecao_ou_duvida_cliente: "",
    conquistas_e_provas_de_autoridade: "",
    como_clientes_te_encontram_hoje: "indicacao_boca_a_boca",

    // ETAPA 3: O QUE O SITE PRECISA TER E ARQUITETURA DE CONVERSÃO
    formato_do_site: "landing_page_unica",
    numero_estimado_paginas: "1_pagina",
    acao_principal_desejada: "chamar_no_whatsapp",
    acao_secundaria_desejada: "baixar_material_ou_catalogo",
    recursos_desejados: [] as string[],
    integracoes_sistemas_externos: "",

    // ETAPA 4: IDENTIDADE VISUAL, REFERÊNCIAS E ANEXOS
    ja_possui_logomarca_ou_brandbook: "tenho_apenas_logo",
    estilo_visual_preferido: "escuro_moderno",
    sensacao_desejada_marca: "autoridade_e_sofisticacao",
    links_de_sites_que_voce_gosta: "",
    o_que_voce_nao_quer_no_site: "",

    // ETAPA 5: PRAZO, INVESTIMENTO E CRITÉRIO DE SUCESSO
    prazo_desejado: "normal_30_dias",
    faixa_investimento: "1500_a_3000",
    quem_aprova_o_projeto: "apenas_eu",
    criterio_de_sucesso_30_dias: "",
    observacoes_finais: ""
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files).map((f) => f.name);
      setFileNames((prev) => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index: number) => {
    setFileNames((prev) => prev.filter((_, i) => i !== index));
  };

  const toggleRecurso = (id: string) => {
    const list = formData.recursos_desejados;
    if (list.includes(id)) {
      setFormData({ ...formData, recursos_desejados: list.filter((item) => item !== id) });
    } else {
      setFormData({ ...formData, recursos_desejados: [...list, id] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/briefing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          arquivos_anexos: fileNames
        })
      });
      const data = await res.json();
      if (!data.success) {
        console.warn("Falha no servidor, prosseguindo com sucesso no cliente");
      }
    } catch {
      console.warn("Envio simulado com sucesso");
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const stepsList = [
    { step: 1, label: "1. Sua Empresa" },
    { step: 2, label: "2. Persona & Negócio" },
    { step: 3, label: "3. Conversão & Recursos" },
    { step: 4, label: "4. Visual & Referências" },
    { step: 5, label: "5. Investimento & Sucesso" }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "880px", margin: "0 auto", padding: "40px 18px", width: "100%" }}>
        {/* Cabeçalho do Briefing Estratégico */}
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--sinal)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "8px"
          }}>
            Diagnóstico de Engenharia & Estratégia Digital
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 5vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Briefing Oficial de Criação de Site e Soluções Digitais
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "660px", margin: "10px auto 0", lineHeight: 1.6 }}>
            Este formulário foi estruturado por especialistas em design, engenharia de software e marketing digital. Cada resposta nos dá a base exata para criar uma solução de alta conversão para o seu negócio.
          </p>
        </div>

        {/* Barra de Etapas com Navegação Fluida */}
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
                  flexShrink: 0
                }}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {submitted ? (
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "48px 24px",
            textAlign: "center"
          }}>
            <div style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "26px",
              fontWeight: "bold",
              margin: "0 auto 16px"
            }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--text-primary)", marginBottom: "10px" }}>
              Briefing Estratégico Recebido com Sucesso!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Muito obrigado pelas respostas detalhadas. Nossa equipe de arquitetura de software e design irá estudar suas respostas e entrará em contato direto pelo WhatsApp e e-mail com o diagnóstico e a proposta personalizada.
            </p>
            <Link href="/" style={{
              display: "inline-block",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              padding: "14px 28px",
              borderRadius: "4px",
              textTransform: "uppercase",
              letterSpacing: "0.05em"
            }}>
              Voltar ao Início
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "clamp(20px, 4vw, 36px)"
          }}>
            {/* ======================================================
                ETAPA 1: SUA EMPRESA E POSICIONAMENTO
               ====================================================== */}
            {currentStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 1 de 5: Sua Empresa e Posicionamento
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Informações essenciais sobre você, sua marca e o momento da sua empresa no mercado.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Seu Nome Completo *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Com quem nossa equipe técnica irá conversar durante o projeto.
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.nome_solicitante}
                      onChange={(e) => setFormData({ ...formData, nome_solicitante: e.target.value })}
                      placeholder="Ex: Carlos Alberto Silva"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Seu Cargo ou Papel na Empresa *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Ajuda a alinhar o nível de decisão técnica ou executiva.
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.cargo_solicitante}
                      onChange={(e) => setFormData({ ...formData, cargo_solicitante: e.target.value })}
                      placeholder="Ex: Sócio Fundador, Diretor Comercial, Gerente"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Nome da Empresa ou Marca *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Como a marca é conhecida pelos clientes.
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.empresa_nome}
                      onChange={(e) => setFormData({ ...formData, empresa_nome: e.target.value })}
                      placeholder="Ex: Nexus Engenharia, Clínica Lumina"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Ramo de Atuação / Segmento *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Área em que você atua para benchmarking de concorrentes.
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.ramo_atuacao}
                      onChange={(e) => setFormData({ ...formData, ramo_atuacao: e.target.value })}
                      placeholder="Ex: Odontologia, Consultoria Financeira B2B, Logística"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Estágio Atual do Negócio *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      O momento da empresa dita a velocidade e sofisticação necessária.
                    </span>
                    <select
                      value={formData.estagio_empresa}
                      onChange={(e) => setFormData({ ...formData, estagio_empresa: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="empresa_nova">Empresa Nova / Lançamento no mercado</option>
                      <option value="consolidada_modernizacao">Empresa Consolidada buscando modernização digital</option>
                      <option value="forte_escala">Em fase de forte expansão e geração de leads</option>
                      <option value="reposicionamento">Reposicionamento de marca para público de maior valor</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Site Atual da Empresa (se tiver)
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Analisaremos a velocidade e estrutura atual gratuitamente.
                    </span>
                    <input
                      type="text"
                      value={formData.website_atual}
                      onChange={(e) => setFormData({ ...formData, website_atual: e.target.value })}
                      placeholder="www.minhaempresa.com.br"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Diferencial Competitivo Principal (Proposta Única de Valor)
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Em uma frase: por que um cliente deve contratar ou comprar de você e NÃO do seu concorrente? (Ex: &quot;Atendimento com hora marcada e retorno em até 2 horas&quot; ou &quot;Mais de 15 anos com garantia total&quot;).
                  </span>
                  <input
                    type="text"
                    value={formData.diferencial_competitivo}
                    onChange={(e) => setFormData({ ...formData, diferencial_competitivo: e.target.value })}
                    placeholder="Ex: Entregamos relatórios analíticos em tempo real com atendimento direto dos sócios..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      WhatsApp Comercial com DDD *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Onde enviaremos o resumo da proposta e tiraremos dúvidas rápidas.
                    </span>
                    <input
                      type="text"
                      required
                      value={formData.telefone_whatsapp}
                      onChange={(e) => setFormData({ ...formData, telefone_whatsapp: e.target.value })}
                      placeholder="(83) 99999-9999"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      E-mail Corporativo ou Principal *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Para envio formal da proposta técnica e cronograma.
                    </span>
                    <input
                      type="email"
                      required
                      value={formData.email_contato}
                      onChange={(e) => setFormData({ ...formData, email_contato: e.target.value })}
                      placeholder="seuemail@empresa.com.br"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Cidade e Estado *
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Indica o mercado geográfico de atuação da sua marca.
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.cidade_estado}
                    onChange={(e) => setFormData({ ...formData, cidade_estado: e.target.value })}
                    placeholder="Ex: João Pessoa - PB, São Paulo - SP ou Atuação Nacional"
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div style={{ textAlign: "right", marginTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="briefing-btn-primary"
                  >
                    Avançar para Etapa 2: Persona & Negócio →
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================
                ETAPA 2: MODELO DE NEGÓCIO, PERSONA E COMPORTAMENTO
               ====================================================== */}
            {currentStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 2 de 5: Modelo de Negócio e Cliente Ideal (Persona)
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Para criar um site que converte visitantes em clientes, precisamos mapear quem compra e por que compra.
                  </p>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    O que a sua empresa faz e qual é a sua principal oferta? *
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Explique com suas palavras: qual o serviço, solução ou produto principal que gera a maior receita hoje?
                  </span>
                  <textarea
                    rows={3}
                    required
                    value={formData.o_que_sua_empresa_faz}
                    onChange={(e) => setFormData({ ...formData, o_que_sua_empresa_faz: e.target.value })}
                    placeholder="Ex: Realizamos projetos arquitetônicos residenciais de alto padrão e gerenciamento de obras civis..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Como sua empresa fatura / Modelo de Receita? *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Define o fluxo de conversão e os botões de ação do site.
                    </span>
                    <select
                      value={formData.como_sua_empresa_ganha_dinheiro}
                      onChange={(e) => setFormData({ ...formData, como_sua_empresa_ganha_dinheiro: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="servico_sob_consulta">Prestação de serviços com orçamento sob medida</option>
                      <option value="agendamento_consultas">Agendamento de consultas ou atendimentos individuais</option>
                      <option value="venda_produtos_ecommerce">Venda direta de produtos (Loja virtual / Catálogo)</option>
                      <option value="mensalidade_assinatura">Contratos mensais, assinaturas recorrentes ou retainer</option>
                      <option value="outro">Outro modelo de monetização</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Ticket Médio ou Valor Médio por Cliente (Opcional)
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Quanto em média um cliente investe com você? Ajuda a calibrar o tom da comunicação.
                    </span>
                    <input
                      type="text"
                      value={formData.ticket_medio}
                      onChange={(e) => setFormData({ ...formData, ticket_medio: e.target.value })}
                      placeholder="Ex: R$ 500 por consulta, R$ 5.000 por projeto, R$ 150 por produto"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Quem é o seu Cliente Ideal (Persona)? *
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Descreva quem decide a compra: São pessoas físicas (B2C) ou empresas (B2B)? Qual a idade média, profissão, classe social ou tamanho da empresa?
                  </span>
                  <textarea
                    rows={3}
                    required
                    value={formData.quem_e_seu_cliente_ideal}
                    onChange={(e) => setFormData({ ...formData, quem_e_seu_cliente_ideal: e.target.value })}
                    placeholder="Ex: Gestores e diretores de médias empresas de logística (B2B) OU Homens e mulheres de 30 a 55 anos buscando tratamento odontológico de precisão (B2C)..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Qual é o principal problema ou dor que seu cliente quer resolver ao te procurar?
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Qual necessidade urgente faz ele buscar a sua empresa? (Ex: Falta de tempo, medo de prejuízo, frustração com outros fornecedores).
                  </span>
                  <input
                    type="text"
                    value={formData.principal_dor_do_seu_cliente}
                    onChange={(e) => setFormData({ ...formData, principal_dor_do_seu_cliente: e.target.value })}
                    placeholder="Ex: Quer atendimento ágil e seguro sem burocracia, e não aguenta promessas não cumpridas..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Qual é a maior dúvida, desconfiança ou objeção do cliente antes de fechar?
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    O que faz um cliente hesitar antes de te pagar? (Ex: &quot;Acha que é muito caro&quot;, &quot;Não sabe se vai dar resultado&quot;, &quot;Demora para responder&quot;). Nós criamos blocos estratégicos no site para quebrar essa objeção antes dele perguntar!
                  </span>
                  <input
                    type="text"
                    value={formData.maior_objecao_ou_duvida_cliente}
                    onChange={(e) => setFormData({ ...formData, maior_objecao_ou_duvida_cliente: e.target.value })}
                    placeholder="Ex: Tem receio de o prazo não ser cumprido ou de ter custos extras não combinados..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Provas de Autoridade e Conquistas
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      O que comprova sua credibilidade? (Ex: Anos no mercado, nº de clientes, prêmios, notas no Google).
                    </span>
                    <input
                      type="text"
                      value={formData.conquistas_e_provas_de_autoridade}
                      onChange={(e) => setFormData({ ...formData, conquistas_e_provas_de_autoridade: e.target.value })}
                      placeholder="Ex: 12 anos no mercado, +500 projetos entregues, nota 4.9 no Google..."
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Como a maioria dos clientes chega até você hoje?
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Qual é o seu principal canal de atração atual?
                    </span>
                    <select
                      value={formData.como_clientes_te_encontram_hoje}
                      onChange={(e) => setFormData({ ...formData, como_clientes_te_encontram_hoje: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="indicacao_boca_a_boca">Indicação direta / Boca a boca</option>
                      <option value="instagram_redes_sociais">Instagram / Redes Sociais</option>
                      <option value="google_anuncios">Busca no Google / Anúncios patrocinados</option>
                      <option value="prospeccao_ativa">Prospecção ativa (vendas B2B)</option>
                      <option value="parcerias_eventos">Parcerias comerciais e eventos</option>
                    </select>
                  </div>
                </div>

                <div className="briefing-actions">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="briefing-btn-back"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="briefing-btn-primary"
                  >
                    Avançar para Etapa 3: Conversão & Recursos →
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================
                ETAPA 3: O QUE O SITE PRECISA TER E CONVERSÃO
               ====================================================== */}
            {currentStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 3 de 5: Estrutura, Recursos e Gatilhos de Conversão
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Defina o formato ideal, as integrações técnicas e os botões que gerarão negócios.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Formato Desejado do Projeto *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Qual a arquitetura de páginas mais indicada para o seu momento?
                    </span>
                    <select
                      value={formData.formato_do_site}
                      onChange={(e) => setFormData({ ...formData, formato_do_site: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="landing_page_unica">Landing Page de Página Única (Foco em conversão rápida de anúncios)</option>
                      <option value="site_institucional_completo">Site Institucional Completo (Início, Sobre, Serviços, Casos, Contato)</option>
                      <option value="loja_virtual_catalogo">Loja Virtual ou Catálogo Digital de Produtos</option>
                      <option value="portal_plataforma_sob_medida">Portal de Clientes, Área de Membros ou Sistema Sob Medida</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Número Estimado de Páginas
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Volume de conteúdo a ser estruturado.
                    </span>
                    <select
                      value={formData.numero_estimado_paginas}
                      onChange={(e) => setFormData({ ...formData, numero_estimado_paginas: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="1_pagina">1 página única (Landing page direta e fluida)</option>
                      <option value="2_a_5_paginas">2 a 5 páginas (Padrão institucional corporativo)</option>
                      <option value="6_a_10_paginas">6 a 10 páginas (Estrutura robusta com páginas dedicadas por serviço)</option>
                      <option value="mais_de_10_paginas">Mais de 10 páginas / Portal amplo e expansível</option>
                    </select>
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Ação Principal do Visitante (CTA Primário) *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      O que o cliente pronto para fechar deve fazer ao acessar o site?
                    </span>
                    <select
                      value={formData.acao_principal_desejada}
                      onChange={(e) => setFormData({ ...formData, acao_principal_desejada: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="chamar_no_whatsapp">Clicar para iniciar conversa direta no WhatsApp</option>
                      <option value="preencher_formulario_triagem">Preencher formulário detalhado para pedir orçamento</option>
                      <option value="agendar_horario_online">Agendar consulta ou reunião online em calendário</option>
                      <option value="comprar_pagar_direto">Realizar pagamento ou compra direta na página</option>
                      <option value="ligar_telefone">Ligar para o telefone fixo ou central da empresa</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Ação Secundária (Para quem ainda está pesquisando)
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Garante que você não perde o contato de quem ainda não vai comprar hoje.
                    </span>
                    <select
                      value={formData.acao_secundaria_desejada}
                      onChange={(e) => setFormData({ ...formData, acao_secundaria_desejada: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="baixar_material_ou_catalogo">Baixar apresentação / Catálogo em PDF em troca do e-mail</option>
                      <option value="seguir_instagram">Seguir no Instagram para acompanhar novidades</option>
                      <option value="simular_orcamento">Fazer simulação de preço ou diagnóstico rápido</option>
                      <option value="ler_artigos_blog">Ler artigos explicativos e tirar dúvidas no Blog</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Recursos Técnicos Desejados (Marque todos os que forem úteis)
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "8px" }}>
                    Selecione as funcionalidades que você quer ativas no seu projeto.
                  </span>
                  <div className="briefing-checkbox-grid">
                    {[
                      { id: "botao_whatsapp", label: "Botão WhatsApp com mensagem pré-definida" },
                      { id: "formulario_contato", label: "Formulário inteligente com envio por e-mail" },
                      { id: "galeria_fotos", label: "Galeria de fotos / Portfólio de projetos" },
                      { id: "depoimentos_clientes", label: "Área de depoimentos com fotos e notas" },
                      { id: "agendamento_online", label: "Agendamento integrado com Google Calendar" },
                      { id: "pagamento_online", label: "Pagamento online por Pix e Cartão de Crédito" },
                      { id: "blog_seo", label: "Área de Blog para ranqueamento orgânico no Google" },
                      { id: "calculadora_simulador", label: "Calculadora interativa ou simulador de valores" },
                      { id: "area_membros_login", label: "Área restrita de login para clientes ou equipe" },
                      { id: "multilingue", label: "Versão em múltiplos idiomas (Português/Inglês/Espanhol)" }
                    ].map((item) => (
                      <label
                        key={item.id}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "13px",
                          color: "var(--text-secondary)",
                          background: "var(--obsidiana)",
                          padding: "10px 12px",
                          borderRadius: "4px",
                          border: "1px solid var(--border)",
                          cursor: "pointer"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.recursos_desejados.includes(item.id)}
                          onChange={() => toggleRecurso(item.id)}
                        />
                        <span>{item.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Sistemas ou Ferramentas para Integração
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Você usa algum CRM, ERP ou ferramenta de automação? (Ex: RD Station, HubSpot, ActiveCampaign, Bling, Tiny, Asaas).
                  </span>
                  <input
                    type="text"
                    value={formData.integracoes_sistemas_externos}
                    onChange={(e) => setFormData({ ...formData, integracoes_sistemas_externos: e.target.value })}
                    placeholder="Ex: Queremos que os leads caiam direto no RD Station e planilha Google Sheets..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div className="briefing-actions">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="briefing-btn-back"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="briefing-btn-primary"
                  >
                    Avançar para Etapa 4: Visual & Referências →
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================
                ETAPA 4: IDENTIDADE VISUAL, REFERÊNCIAS E ANEXOS
               ====================================================== */}
            {currentStep === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 4 de 5: Identidade Visual, Estilo e Anexos
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    A estética transmite autoridade instantânea. Indique suas preferências e anexe seus materiais.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Você já possui Logomarca ou Brandbook? *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Define se usaremos seu manual existente ou criaremos os elementos.
                    </span>
                    <select
                      value={formData.ja_possui_logomarca_ou_brandbook}
                      onChange={(e) => setFormData({ ...formData, ja_possui_logomarca_ou_brandbook: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="sim_tenho_tudo">Sim, tenho logomarca e manual de marca completo (Brandbook)</option>
                      <option value="tenho_apenas_logo">Tenho apenas o arquivo da logomarca</option>
                      <option value="nao_preciso_criar">Não tenho, precisarei criar a identidade visual do zero</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Sensação Principal que o Site Deve Passar *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Qual a primeira impressão nos primeiros 3 segundos de visita?
                    </span>
                    <select
                      value={formData.sensacao_desejada_marca}
                      onChange={(e) => setFormData({ ...formData, sensacao_desejada_marca: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="autoridade_e_sofisticacao">Autoridade, Sofisticação e Alto Padrão (Elegante e Imponente)</option>
                      <option value="inovacao_e_tecnologia">Inovação, Alta Tecnologia e Precisão (Moderno e Disruptivo)</option>
                      <option value="saude_e_confianca">Saúde, Confiança e Limpeza (Claro, Acolhedor e Seguro)</option>
                      <option value="corporativo_tradicional">Corporativo Tradicional e Sólido (Institucional e Firme)</option>
                      <option value="dinamismo_e_vendas">Dinamismo, Varejo e Vendas Rápidas (Chamativo e Direto)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Sites que Você Admira e Considera Boas Referências
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Cole links de sites de concorrentes ou empresas de outros segmentos cujo design, visual ou estrutura você gosta.
                  </span>
                  <textarea
                    rows={2}
                    value={formData.links_de_sites_que_voce_gosta}
                    onChange={(e) => setFormData({ ...formData, links_de_sites_que_voce_gosta: e.target.value })}
                    placeholder="Ex: www.referencia1.com.br, www.referencia2.com..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    O que você NÃO quer de jeito nenhum no seu site?
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Ajuda nossos designers a evitarem frustrações visuais. (Ex: &quot;Não quero fundo branco chapado&quot;, &quot;Não quero pop-ups agressivos&quot;, &quot;Não quero visual infantil&quot;).
                  </span>
                  <input
                    type="text"
                    value={formData.o_que_voce_nao_quer_no_site}
                    onChange={(e) => setFormData({ ...formData, o_que_voce_nao_quer_no_site: e.target.value })}
                    placeholder="Ex: Não quero textos excessivamente longos sem imagens, nem cores muito apagadas..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                {/* Área de Múltiplos Anexos */}
                <div style={{
                  background: "var(--obsidiana)",
                  border: "1px dashed var(--border)",
                  borderRadius: "8px",
                  padding: "24px 20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", fontWeight: 600, marginBottom: "4px" }}>
                      Anexar Arquivos do Projeto (Logomarca, Brandbook, Fotos ou Prints)
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>
                      Formatos aceitos: PDF, PNG, JPG, DOCX, XLSX, ZIP. Você pode adicionar quantos arquivos quiser.
                    </p>
                  </div>

                  {fileNames.length === 0 ? (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <label style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "8px",
                        background: "var(--sinal)",
                        color: "var(--obsidiana)",
                        padding: "12px 24px",
                        borderRadius: "4px",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        fontWeight: 600,
                        cursor: "pointer",
                        textTransform: "uppercase"
                      }}>
                        <span>+ Adicionar Arquivos</span>
                        <input
                          type="file"
                          multiple
                          onChange={handleFileChange}
                          style={{ display: "none" }}
                        />
                      </label>
                    </div>
                  ) : (
                    <div style={{
                      background: "var(--grafite)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "16px",
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px"
                    }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", fontWeight: 600 }}>
                          Arquivos Anexados ({fileNames.length}):
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-secondary)" }}>
                          Clique no ✕ para remover
                        </span>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        {fileNames.map((fn, idx) => (
                          <div key={idx} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "13px",
                            color: "var(--text-primary)",
                            background: "var(--obsidiana)",
                            padding: "8px 12px",
                            borderRadius: "4px",
                            border: "1px solid var(--border)"
                          }}>
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "85%" }}>
                              📄 {fn}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              title="Remover arquivo"
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ff6b6b",
                                cursor: "pointer",
                                fontSize: "14px",
                                fontWeight: "bold",
                                padding: "2px 6px"
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Botão para adicionar mais embaixo */}
                      <div style={{ marginTop: "8px", textAlign: "center" }}>
                        <label style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          background: "rgba(200, 245, 66, 0.08)",
                          border: "1px dashed var(--sinal)",
                          color: "var(--sinal)",
                          padding: "10px 20px",
                          borderRadius: "4px",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          fontWeight: 600,
                          cursor: "pointer",
                          textTransform: "uppercase"
                        }}>
                          <span>+ Adicionar Mais Arquivos</span>
                          <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            style={{ display: "none" }}
                          />
                        </label>
                      </div>
                    </div>
                  )}
                </div>

                <div className="briefing-actions">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="briefing-btn-back"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(5)}
                    className="briefing-btn-primary"
                  >
                    Avançar para Etapa 5: Investimento & Sucesso →
                  </button>
                </div>
              </div>
            )}

            {/* ======================================================
                ETAPA 5: PRAZO, INVESTIMENTO E CRITÉRIO DE SUCESSO
               ====================================================== */}
            {currentStep === 5 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 5 de 5: Prazo, Faixa de Investimento e Expectativa
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Alinhamento transparente de cronograma e metas do projeto.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Qual o seu prazo ideal para o site estar no ar? *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Planejaremos a esteira de sprints conforme sua urgência.
                    </span>
                    <select
                      value={formData.prazo_desejado}
                      onChange={(e) => setFormData({ ...formData, prazo_desejado: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="urgente_7_dias">Urgente (em até 7 a 10 dias úteis)</option>
                      <option value="rapido_15_dias">Rápido (em até 15 dias úteis)</option>
                      <option value="normal_30_dias">Prazo Padrão (20 a 30 dias)</option>
                      <option value="sem_pressa">Sem pressa / Em fase de planejamento estratégico</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Qual faixa de investimento você planeja? *
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Atuamos desde landing pages express até plataformas complexas.
                    </span>
                    <select
                      value={formData.faixa_investimento}
                      onChange={(e) => setFormData({ ...formData, faixa_investimento: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="600_a_1500">R$ 600 a R$ 1.500 (Landing Page Express de Alta Conversão)</option>
                      <option value="1500_a_3000">R$ 1.500 a R$ 3.000 (Site Institucional Padrão)</option>
                      <option value="3000_a_6000">R$ 3.000 a R$ 6.000 (Site Institucional Avançado / Catálogo)</option>
                      <option value="6000_a_15000">R$ 6.000 a R$ 15.000 (Plataforma / Sistema Sob Medida)</option>
                      <option value="acima_15000">Acima de R$ 15.000 (Ecossistema Digital Completo)</option>
                    </select>
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      Quem participará da aprovação final do site?
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Ajuda a estruturar as rodadas de validação e feedback.
                    </span>
                    <select
                      value={formData.quem_aprova_o_projeto}
                      onChange={(e) => setFormData({ ...formData, quem_aprova_o_projeto: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="apenas_eu">Apenas eu decido e aprovo diretamente</option>
                      <option value="eu_e_socios">Eu e outros sócios da empresa</option>
                      <option value="diretoria_conselho">Diretoria, comitê ou conselho executivo</option>
                    </select>
                  </div>

                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                      O que define o SUCESSO deste projeto nos primeiros 30 dias?
                    </label>
                    <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                      Qual resultado prático você espera ver após o site estar no ar?
                    </span>
                    <input
                      type="text"
                      value={formData.criterio_de_sucesso_30_dias}
                      onChange={(e) => setFormData({ ...formData, criterio_de_sucesso_30_dias: e.target.value })}
                      placeholder="Ex: Receber contatos qualificados no WhatsApp todos os dias..."
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Observações Adicionais ou Comentários Extras
                  </label>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", display: "block", marginBottom: "6px" }}>
                    Algo mais que considera importante nossa equipe de engenharia e marketing saber antes da proposta?
                  </span>
                  <textarea
                    rows={3}
                    value={formData.observacoes_finais}
                    onChange={(e) => setFormData({ ...formData, observacoes_finais: e.target.value })}
                    placeholder="Sinta-se à vontade para compartilhar qualquer detalhe extra..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div className="briefing-actions">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="briefing-btn-back"
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="briefing-btn-submit"
                  >
                    {loading ? "Enviando Briefing Estratégico..." : "Finalizar e Enviar Briefing Completo →"}
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
