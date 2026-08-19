"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabase";

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
    email_contato: "",
    telefone_whatsapp: "",
    cidade_estado: "",
    website_atual: "",

    // ETAPA 2: MODELO DE NEGÓCIO E CLIENTE IDEAL (PERSONA)
    o_que_sua_empresa_faz: "",
    como_sua_empresa_ganha_dinheiro: "servico_sob_consulta",
    quem_e_seu_cliente_ideal: "",
    principal_dor_do_seu_cliente: "",
    por_que_o_cliente_escolhe_voce: "",

    // ETAPA 3: O QUE O SITE PRECISA TER
    formato_do_site: "landing_page_unica",
    numero_estimado_paginas: "1_pagina",
    acao_principal_desejada: "chamar_no_whatsapp",
    recursos_desejados: [] as string[],
    outros_sistemas_para_integrar: "",

    // ETAPA 4: VISUAL E ARQUIVOS
    ja_possui_logomarca_ou_brandbook: "tenho_apenas_logo",
    estilo_visual_preferido: "escuro_moderno",
    links_de_sites_que_voce_gosta: "",

    // ETAPA 5: PRAZO E ORÇAMENTO
    prazo_desejado: "normal_30_dias",
    faixa_investimento: "1500_a_3000",
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
      if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://sua-url-supabase.supabase.co") {
        await supabase.from("briefings").insert([
          {
            ...formData,
            arquivos_anexos: fileNames
          }
        ]);
      }
    } catch (err) {
      console.warn("Envio simulado com sucesso");
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  const stepsList = [
    { step: 1, label: "1. Sua Empresa" },
    { step: 2, label: "2. Seu Cliente" },
    { step: 3, label: "3. O Site" },
    { step: 4, label: "4. Visual e Anexos" },
    { step: 5, label: "5. Prazo e Investimento" }
  ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "860px", margin: "0 auto", padding: "40px 18px", width: "100%" }}>
        {/* Cabeçalho do Briefing */}
        <div style={{ marginBottom: "28px", textAlign: "center" }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--sinal)",
            textTransform: "uppercase",
            letterSpacing: "0.06em",
            marginBottom: "8px"
          }}>
            Diagnóstico Inicial de Projeto
          </div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(24px, 5vw, 36px)", color: "var(--text-primary)", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Briefing para Criação de Site e Soluções Digitais
          </h1>
          <p style={{ fontSize: "14px", color: "var(--text-secondary)", maxWidth: "620px", margin: "10px auto 0", lineHeight: 1.6 }}>
            Preencha este questionário passo a passo para entendermos sua empresa, seus clientes e o que o seu site precisa ter. Com essas informações, montaremos a melhor proposta técnica e comercial.
          </p>
        </div>

        {/* Barra de Etapas com Scroll Horizontal Suave no Mobile */}
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
            padding: "40px 20px",
            textAlign: "center"
          }}>
            <div style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "24px",
              fontWeight: "bold",
              margin: "0 auto 16px"
            }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--text-primary)", marginBottom: "10px" }}>
              Briefing Recebido com Sucesso!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "480px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Muito obrigado pelas informações. Nossa equipe irá analisar suas respostas e entrará em contato pelo WhatsApp e e-mail com a proposta detalhada.
            </p>
            <a href="/" style={{
              display: "inline-block",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              Voltar ao Início
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "clamp(18px, 4vw, 36px)"
          }}>
            {/* ETAPA 1: SUA EMPRESA */}
            {currentStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 1 de 5: Sobre Você e Sua Empresa
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Informações básicas para podermos entrar em contato e entender o seu negócio.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Seu Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nome_solicitante}
                      onChange={(e) => setFormData({ ...formData, nome_solicitante: e.target.value })}
                      placeholder="Ex: Carlos Silva"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Seu Cargo ou Função na Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cargo_solicitante}
                      onChange={(e) => setFormData({ ...formData, cargo_solicitante: e.target.value })}
                      placeholder="Ex: Sócio, Diretor, Gerente"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.empresa_nome}
                      onChange={(e) => setFormData({ ...formData, empresa_nome: e.target.value })}
                      placeholder="Nome da sua marca ou empresa"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Ramo de Atuação da Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.ramo_atuacao}
                      onChange={(e) => setFormData({ ...formData, ramo_atuacao: e.target.value })}
                      placeholder="Ex: Clínica, Advocacia, Consultoria"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      E-mail de Contato *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email_contato}
                      onChange={(e) => setFormData({ ...formData, email_contato: e.target.value })}
                      placeholder="seuemail@empresa.com"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.telefone_whatsapp}
                      onChange={(e) => setFormData({ ...formData, telefone_whatsapp: e.target.value })}
                      placeholder="(31) 99999-9999"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Cidade e Estado *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cidade_estado}
                      onChange={(e) => setFormData({ ...formData, cidade_estado: e.target.value })}
                      placeholder="Ex: João Pessoa, PB"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Site Atual (se já possuir)
                    </label>
                    <input
                      type="text"
                      value={formData.website_atual}
                      onChange={(e) => setFormData({ ...formData, website_atual: e.target.value })}
                      placeholder="www.minhaempresa.com.br"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="briefing-btn-primary"
                  >
                    Avançar para Etapa 2: Seu Cliente →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: MODELO DE NEGÓCIO E PERSONA */}
            {currentStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 2 de 5: Seu Modelo de Negócio e Cliente Ideal (Persona)
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Para criar um site que realmente venda, precisamos entender o que você entrega e quem compra de você.
                  </p>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    O que a sua empresa faz e qual é o seu principal produto ou serviço? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.o_que_sua_empresa_faz}
                    onChange={(e) => setFormData({ ...formData, o_que_sua_empresa_faz: e.target.value })}
                    placeholder="Explique com suas próprias palavras: o que você vende ou presta de serviço..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Como a sua empresa ganha dinheiro hoje? *
                  </label>
                  <select
                    value={formData.como_sua_empresa_ganha_dinheiro}
                    onChange={(e) => setFormData({ ...formData, como_sua_empresa_ganha_dinheiro: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  >
                    <option value="servico_sob_consulta">Prestação de serviços com orçamento sob consulta</option>
                    <option value="venda_produtos">Venda direta de produtos (físicos ou digitais)</option>
                    <option value="mensalidade_assinatura">Mensalidade, contratos fixos ou assinaturas</option>
                    <option value="agendamento_consultas">Agendamento de consultas ou atendimentos individuais</option>
                    <option value="outro">Outro modelo</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Quem é o seu cliente ideal (Persona)? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.quem_e_seu_cliente_ideal}
                    onChange={(e) => setFormData({ ...formData, quem_e_seu_cliente_ideal: e.target.value })}
                    placeholder="Descreva quem costuma comprar de você: empresas (B2B) ou pessoas físicas (B2C)? Idade, profissão..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Qual é o principal problema ou dor que seu cliente quer resolver?
                  </label>
                  <input
                    type="text"
                    value={formData.principal_dor_do_seu_cliente}
                    onChange={(e) => setFormData({ ...formData, principal_dor_do_seu_cliente: e.target.value })}
                    placeholder="Ex: Precisa de atendimento rápido, não encontra confiança em outros fornecedores..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
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
                    Avançar para Etapa 3: O Site →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3: O SITE E SEUS RECURSOS */}
            {currentStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 3 de 5: O que o Site Precisa Ter
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Defina o tamanho do site, os botões e as funções necessárias.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Formato Desejado do Site *
                    </label>
                    <select
                      value={formData.formato_do_site}
                      onChange={(e) => setFormData({ ...formData, formato_do_site: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="landing_page_unica">Landing Page de Página Única (Foco em conversão)</option>
                      <option value="site_institucional_completo">Site Institucional Completo (Início, Sobre, Serviços, Contato)</option>
                      <option value="loja_virtual">Loja Virtual ou Catálogo de Produtos</option>
                      <option value="portal_ou_sistema">Portal de Clientes, Área de Membros ou Sistema Sob Medida</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Número Estimado de Páginas
                    </label>
                    <select
                      value={formData.numero_estimado_paginas}
                      onChange={(e) => setFormData({ ...formData, numero_estimado_paginas: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="1_pagina">1 página única (Landing Page direta)</option>
                      <option value="2_a_5_paginas">2 a 5 páginas (Padrão Institucional)</option>
                      <option value="6_a_10_paginas">6 a 10 páginas (Site mais encorpado)</option>
                      <option value="mais_de_10_paginas">Mais de 10 páginas / Portal amplo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Qual a principal ação que o visitante deve tomar no site? *
                  </label>
                  <select
                    value={formData.acao_principal_desejada}
                    onChange={(e) => setFormData({ ...formData, acao_principal_desejada: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  >
                    <option value="chamar_no_whatsapp">Clicar para chamar diretamente no WhatsApp</option>
                    <option value="preencher_formulario">Preencher formulário para pedir orçamento</option>
                    <option value="agendar_horario">Agendar um horário ou reunião online</option>
                    <option value="comprar_direto">Fazer o pagamento ou compra na hora</option>
                    <option value="ligar_telefone">Ligar para o telefone da empresa</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Recursos que você quer no site (Marque o que desejar)
                  </label>
                  <div className="briefing-checkbox-grid">
                    {[
                      { id: "botao_whatsapp", label: "Botão flutuante de WhatsApp" },
                      { id: "formulario_contato", label: "Formulário com envio por e-mail" },
                      { id: "galeria_fotos", label: "Galeria de fotos de trabalhos" },
                      { id: "depoimentos_clientes", label: "Depoimentos de clientes" },
                      { id: "agendamento_online", label: "Agendamento online integrado" },
                      { id: "pagamento_online", label: "Pagamento por Pix ou Cartão" },
                      { id: "blog_noticias", label: "Área de Blog e Notícias" },
                      { id: "calculadora_simulador", label: "Simulador ou calculadora" }
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
                    Avançar para Etapa 4: Visual e Anexos →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 4: VISUAL E ARQUIVOS */}
            {currentStep === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 4 de 5: Identidade Visual, Referências e Anexos
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Envie sua logomarca, manual de marca (Brandbook) ou prints de sites que você gosta.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Você já possui Logomarca ou Brandbook?
                    </label>
                    <select
                      value={formData.ja_possui_logomarca_ou_brandbook}
                      onChange={(e) => setFormData({ ...formData, ja_possui_logomarca_ou_brandbook: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="sim_tenho_tudo">Sim, tenho logo e manual completo</option>
                      <option value="tenho_apenas_logo">Tenho apenas a logomarca</option>
                      <option value="nao_preciso_criar">Não tenho, precisarei criar</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Qual estilo visual mais combina?
                    </label>
                    <select
                      value={formData.estilo_visual_preferido}
                      onChange={(e) => setFormData({ ...formData, estilo_visual_preferido: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="escuro_moderno">Fundo escuro moderno e sofisticado</option>
                      <option value="claro_minimalista">Fundo claro, limpo e elegante</option>
                      <option value="corporativo_tradicional">Corporativo tradicional e sóbrio</option>
                      <option value="colorido_vibrante">Colorido e dinâmico</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Cole aqui links de sites de referências que você admira
                  </label>
                  <textarea
                    rows={2}
                    value={formData.links_de_sites_que_voce_gosta}
                    onChange={(e) => setFormData({ ...formData, links_de_sites_que_voce_gosta: e.target.value })}
                    placeholder="Ex: www.exemplo1.com.br, www.exemplo2.com.br..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                {/* Área de Múltiplos Anexos */}
                <div style={{
                  background: "var(--obsidiana)",
                  border: "1px dashed var(--border)",
                  borderRadius: "8px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "14px"
                }}>
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", fontWeight: 600, marginBottom: "4px" }}>
                      Anexar Arquivos do Projeto (Logos, Documentos, Imagens)
                    </div>
                    <p style={{ fontSize: "12px", color: "var(--text-secondary)", margin: 0 }}>
                      Formatos aceitos: PDF, PNG, JPG, DOCX, XLSX, ZIP. Adicione quantos quiser.
                    </p>
                  </div>

                  <div style={{ display: "flex", justifyContent: "center", gap: "10px", flexWrap: "wrap" }}>
                    <label style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "8px",
                      background: "var(--sinal)",
                      color: "var(--obsidiana)",
                      padding: "10px 16px",
                      borderRadius: "4px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
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

                  {fileNames.length > 0 && (
                    <div style={{
                      background: "var(--grafite)",
                      border: "1px solid var(--border)",
                      borderRadius: "6px",
                      padding: "12px"
                    }}>
                      <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", marginBottom: "8px" }}>
                        Arquivos Selecionados ({fileNames.length}):
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                        {fileNames.map((fn, idx) => (
                          <div key={idx} style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            fontSize: "12px",
                            color: "var(--text-primary)",
                            background: "var(--obsidiana)",
                            padding: "6px 10px",
                            borderRadius: "4px"
                          }}>
                            <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "80%" }}>
                              📁 {fn}
                            </span>
                            <button
                              type="button"
                              onClick={() => removeFile(idx)}
                              style={{
                                background: "transparent",
                                border: "none",
                                color: "#ff6b6b",
                                cursor: "pointer",
                                fontSize: "13px",
                                fontWeight: "bold"
                              }}
                            >
                              ✕
                            </button>
                          </div>
                        ))}
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
                    Avançar para Etapa 5: Prazo e Investimento →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 5: PRAZO E ORÇAMENTO */}
            {currentStep === 5 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "12px" }}>
                  <h3 style={{ fontSize: "17px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Etapa 5 de 5: Prazo e Faixa de Investimento
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Atuamos desde pequenas landing pages até plataformas completas.
                  </p>
                </div>

                <div className="briefing-grid-2">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Qual o seu prazo ideal para o site estar no ar? *
                    </label>
                    <select
                      value={formData.prazo_desejado}
                      onChange={(e) => setFormData({ ...formData, prazo_desejado: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="urgente_7_dias">Urgente (em até 7 a 10 dias úteis)</option>
                      <option value="rapido_15_dias">Rápido (em até 15 dias úteis)</option>
                      <option value="normal_30_dias">Prazo Padrão (20 a 30 dias)</option>
                      <option value="sem_pressa">Sem pressa / Em fase de planejamento</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Qual faixa de investimento você planeja? *
                    </label>
                    <select
                      value={formData.faixa_investimento}
                      onChange={(e) => setFormData({ ...formData, faixa_investimento: e.target.value })}
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="600_a_1500">R$ 600 a R$ 1.500 (Landing Page Express)</option>
                      <option value="1500_a_3000">R$ 1.500 a R$ 3.000 (Site Institucional Padrão)</option>
                      <option value="3000_a_6000">R$ 3.000 a R$ 6.000 (Site Institucional Avançado)</option>
                      <option value="6000_a_15000">R$ 6.000 a R$ 15.000 (Plataforma Sob Medida)</option>
                      <option value="acima_15000">Acima de R$ 15.000 (Ecossistema Digital Completo)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Observações Adicionais ou Dúvidas
                  </label>
                  <textarea
                    rows={3}
                    value={formData.observacoes_finais}
                    onChange={(e) => setFormData({ ...formData, observacoes_finais: e.target.value })}
                    placeholder="Algo mais que considera importante sabermos antes de montar a proposta?"
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
                    {loading ? "Enviando Briefing..." : "Finalizar e Enviar Briefing Completo →"}
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
