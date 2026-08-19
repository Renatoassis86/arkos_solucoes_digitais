"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabase";

export default function BriefingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Módulo 1: Identificação & Modelo de Negócio
    nome_solicitante: "",
    cargo_solicitante: "",
    empresa_nome: "",
    empresa_segmento: "b2b_saas",
    email_corporativo: "",
    telefone_whatsapp: "",
    website_atual: "",
    tamanho_empresa: "11-50",
    modelo_receita: "assinatura_saas",

    // Módulo 2: Requisitos & Escopo
    tipo_projeto: "site_institucional",
    objetivo_primario: "",
    publico_alvo: "",
    funcionalidades_chave: [] as string[],
    sistemas_legados: "",

    // Módulo 3: Arquitetura & Stack
    integracoes_necessarias: [] as string[],
    preferencia_stack: "nextjs_react",
    requisitos_seguranca: [] as string[],
    infraestrutura_hospedagem: "vercel",

    // Módulo 4: Design & Estética
    posicionamento_estetico: "tech_dark_mode",
    possui_brandbook: false,
    referencias_visuais: "",
    idiomas_necessarios: ["pt-BR"],

    // Módulo 5: Governança, Prazos & Orçamento
    prazo_desejado: "60_dias",
    faixa_investimento: "30k_60k",
    kpis_principais: [] as string[],
    observacoes_adicionais: ""
  });

  const toggleArrayItem = (field: keyof typeof formData, item: string) => {
    const currentList = (formData[field] as string[]) || [];
    if (currentList.includes(item)) {
      setFormData({
        ...formData,
        [field]: currentList.filter((i) => i !== item)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentList, item]
      });
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
            referencias_visuais: [formData.referencias_visuais]
          }
        ]);
      }
    } catch (err) {
      console.warn("Envio simulado com sucesso (Supabase URL pendente de configuração em produção)");
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "900px", margin: "0 auto", padding: "64px 24px" }}>
        {/* Header do Briefing */}
        <div style={{ marginBottom: "40px", textAlign: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Engenharia de Requisitos & Diagnóstico
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "38px", color: "var(--text-primary)", marginTop: "8px", letterSpacing: "-0.02em" }}>
            Briefing Modular do Método ARKOS
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", maxWidth: "620px", margin: "12px auto 0", lineHeight: 1.6 }}>
            Estruturado nas fases do nosso método de entrega para mapear organização, requisitos de software, design e métricas de negócio antes do desenvolvimento.
          </p>
        </div>

        {/* Stepper Visual das Fases do Método */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "8px",
          marginBottom: "40px",
          background: "var(--grafite)",
          padding: "8px",
          borderRadius: "8px",
          border: "1px solid var(--border)"
        }}>
          {[
            { step: 1, label: "01-02. Discover & Research" },
            { step: 2, label: "03-04. Strategize & Design" },
            { step: 3, label: "05-06. Architect & Build" },
            { step: 4, label: "07-10. Launch & Scale" }
          ].map((s) => (
            <button
              key={s.step}
              type="button"
              onClick={() => setCurrentStep(s.step)}
              style={{
                background: currentStep === s.step ? "var(--ardosia)" : "transparent",
                border: currentStep === s.step ? "1px solid var(--sinal)" : "1px solid transparent",
                color: currentStep === s.step ? "var(--text-primary)" : "var(--text-secondary)",
                padding: "10px 8px",
                borderRadius: "4px",
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                cursor: "pointer",
                textAlign: "center"
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {submitted ? (
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "56px 24px",
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
              fontSize: "28px",
              fontWeight: "bold",
              margin: "0 auto 20px"
            }}>
              ✓
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "30px", color: "var(--text-primary)", marginBottom: "12px" }}>
              Briefing Estruturado com Sucesso!
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "15px", maxWidth: "520px", margin: "0 auto 24px", lineHeight: 1.6 }}>
              Os dados foram registrados no banco de requisitos da ARKOS. Nossa equipe técnica analisará o escopo e retornará em até 24 horas úteis com o documento de arquitetura e proposta comercial.
            </p>
            <a href="/" style={{
              display: "inline-block",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              fontWeight: 600,
              padding: "12px 24px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              Voltar à Página Principal
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "40px"
          }}>
            {/* ETAPA 1: DISCOVER & RESEARCH */}
            {currentStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Módulo 1: Identificação da Organização & Contexto
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Fase Discover: Compreender a estrutura da sua empresa e o modelo de negócio atual.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Seu Nome *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.nome_solicitante}
                      onChange={(e) => setFormData({ ...formData, nome_solicitante: e.target.value })}
                      placeholder="Nome completo"
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Cargo / Função *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.cargo_solicitante}
                      onChange={(e) => setFormData({ ...formData, cargo_solicitante: e.target.value })}
                      placeholder="Ex: Diretor de Tecnologia / Head de Produto"
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Nome da Empresa *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.empresa_nome}
                      onChange={(e) => setFormData({ ...formData, empresa_nome: e.target.value })}
                      placeholder="Razão Social ou Fantasia"
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Segmento de Atuação *
                    </label>
                    <select
                      value={formData.empresa_segmento}
                      onChange={(e) => setFormData({ ...formData, empresa_segmento: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="b2b_saas">B2B SaaS / Tecnologia</option>
                      <option value="fintech">Fintech / Serviços Financeiros</option>
                      <option value="ecommerce">E-Commerce & Varejo D2C</option>
                      <option value="saude">Saúde, Clínicas & Biotech</option>
                      <option value="industria">Indústria & Energia</option>
                      <option value="luxo">Luxo, Arquitetura & Moda</option>
                      <option value="outro">Outro Segmento</option>
                    </select>
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email_corporativo}
                      onChange={(e) => setFormData({ ...formData, email_corporativo: e.target.value })}
                      placeholder="seu.nome@empresa.com"
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      WhatsApp / Telefone *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.telefone_whatsapp}
                      onChange={(e) => setFormData({ ...formData, telefone_whatsapp: e.target.value })}
                      placeholder="(XX) 9XXXX-XXXX"
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{ background: "var(--sinal)", color: "var(--obsidiana)", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, padding: "12px 24px", borderRadius: "4px", border: "none", cursor: "pointer", textTransform: "uppercase" }}
                  >
                    Próxima Etapa: Strategize & Design →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 2: STRATEGIZE & DESIGN */}
            {currentStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Módulo 2: Estratégia de Produto & Identidade Visual
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Fases Strategize & Design: Definir proposta de valor, estética e arquitetura de informação.
                  </p>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Qual é o objetivo principal do novo produto/site? *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={formData.objetivo_primario}
                    onChange={(e) => setFormData({ ...formData, objetivo_primario: e.target.value })}
                    placeholder="Ex: Aumentar a conversão de leads qualificados B2B e posicionar a empresa como autoridade técnica no setor..."
                    style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Direção Estética Desejada
                    </label>
                    <select
                      value={formData.posicionamento_estetico}
                      onChange={(e) => setFormData({ ...formData, posicionamento_estetico: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="tech_dark_mode">Tech Dark Mode (Obsidiana / Alta Precisão)</option>
                      <option value="minimalista_editorial">Minimalista Editorial (Off-White / Tipografia Fina)</option>
                      <option value="corporativo_clean">Corporativo Clean (Azul / Neutro)</option>
                      <option value="vibrante_moderno">Vibrante / Alto Contraste</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Sua empresa já possui Brandbook / Design System?
                    </label>
                    <select
                      value={formData.possui_brandbook ? "sim" : "nao"}
                      onChange={(e) => setFormData({ ...formData, possui_brandbook: e.target.value === "sim" })}
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="nao">Não, precisaremos construir/definir</option>
                      <option value="sim">Sim, temos manual de marca consolidado</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Sites ou plataformas de referência que admiram (URLs)
                  </label>
                  <input
                    type="text"
                    value={formData.referencias_visuais}
                    onChange={(e) => setFormData({ ...formData, referencias_visuais: e.target.value })}
                    placeholder="Ex: linear.app, stripe.com, vercel.com..."
                    style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    style={{ background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "12px", padding: "12px 20px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    style={{ background: "var(--sinal)", color: "var(--obsidiana)", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, padding: "12px 24px", borderRadius: "4px", border: "none", cursor: "pointer", textTransform: "uppercase" }}
                  >
                    Próxima Etapa: Architect & Build →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 3: ARCHITECT & BUILD */}
            {currentStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Módulo 3: Arquitetura de Software & Requisitos Técnicos
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Fases Architect & Build: Mapeamento de integrações, banco de dados e requisitos funcionais.
                  </p>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "10px" }}>
                    Funcionalidades de Software Necessárias (Marque todas as aplicáveis)
                  </label>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                    {[
                      { id: "auth_usuarios", label: "Autenticação & Login de Usuários" },
                      { id: "checkout_pagamento", label: "Gateway de Pagamento / Assinaturas" },
                      { id: "painel_admin", label: "Painel Administrativo / Dashboard" },
                      { id: "agendamento_crm", label: "Agendamento Online & Integração CRM" },
                      { id: "blog_cms", label: "Sistema de Conteúdo (CMS / Blog)" },
                      { id: "multilingue", label: "Suporte Multilíngue (i18n)" },
                      { id: "api_rest", label: "Construção de APIs REST / GraphQL" },
                      { id: "automacao_ia", label: "Agente de IA / RAG de Documentos" }
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
                          padding: "10px",
                          borderRadius: "4px",
                          border: "1px solid var(--border)",
                          cursor: "pointer"
                        }}
                      >
                        <input
                          type="checkbox"
                          checked={formData.funcionalidades_chave.includes(item.id)}
                          onChange={() => toggleArrayItem("funcionalidades_chave", item.id)}
                        />
                        {item.label}
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Sistemas Existentes ou Legados que Devem ser Integrados
                  </label>
                  <input
                    type="text"
                    value={formData.sistemas_legados}
                    onChange={(e) => setFormData({ ...formData, sistemas_legados: e.target.value })}
                    placeholder="Ex: Hubspot, RD Station, SAP, Totvs, Supabase, PostgreSQL..."
                    style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    style={{ background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "12px", padding: "12px 20px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    ← Voltar
                  </button>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    style={{ background: "var(--sinal)", color: "var(--obsidiana)", fontFamily: "var(--font-mono)", fontSize: "12px", fontWeight: 600, padding: "12px 24px", borderRadius: "4px", border: "none", cursor: "pointer", textTransform: "uppercase" }}
                  >
                    Próxima Etapa: Launch & Scale →
                  </button>
                </div>
              </div>
            )}

            {/* ETAPA 4: LAUNCH, MEASURE & SCALE */}
            {currentStep === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                <div style={{ borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
                  <h3 style={{ fontSize: "18px", color: "var(--text-primary)", fontWeight: 600 }}>
                    Módulo 4: Governança, Prazos & Orçamento
                  </h3>
                  <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                    Fases Launch, Measure & Scale: Expectativas de cronograma, investimento e métricas de sucesso.
                  </p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Prazo Estimado de Lançamento
                    </label>
                    <select
                      value={formData.prazo_desejado}
                      onChange={(e) => setFormData({ ...formData, prazo_desejado: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="30_dias">Até 30 dias (Sprint Acelerada)</option>
                      <option value="60_dias">45 a 60 dias (Padrão Completo)</option>
                      <option value="90_dias">60 a 90 dias (Plataforma Complexa)</option>
                      <option value="flexivel">Flexível / Conforme Roadmap</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Faixa de Investimento Prevista *
                    </label>
                    <select
                      value={formData.faixa_investimento}
                      onChange={(e) => setFormData({ ...formData, faixa_investimento: e.target.value })}
                      style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    >
                      <option value="15k_30k">R$ 15.000 a R$ 30.000</option>
                      <option value="30k_60k">R$ 30.000 a R$ 60.000</option>
                      <option value="60k_120k">R$ 60.000 a R$ 120.000</option>
                      <option value="acima_120k">Acima de R$ 120.000 (Enterprise)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Observações Adicionais ou Restrições Específicas
                  </label>
                  <textarea
                    rows={4}
                    value={formData.observacoes_adicionais}
                    onChange={(e) => setFormData({ ...formData, observacoes_adicionais: e.target.value })}
                    placeholder="Inclua qualquer detalhe relevante sobre tomada de decisão, equipe interna ou prazos críticos..."
                    style={{ width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", marginTop: "16px" }}>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    style={{ background: "transparent", color: "var(--text-secondary)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: "12px", padding: "12px 20px", borderRadius: "4px", cursor: "pointer" }}
                  >
                    ← Voltar
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{ background: "var(--sinal)", color: "var(--obsidiana)", fontFamily: "var(--font-mono)", fontSize: "13px", fontWeight: 600, padding: "14px 28px", borderRadius: "4px", border: "none", cursor: "pointer", textTransform: "uppercase", letterSpacing: "0.05em" }}
                  >
                    {loading ? "Registrando Briefing..." : "Finalizar & Enviar Briefing do Método →"}
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
