"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    objetivo: "Novo Site Institucional / E-Commerce",
    orcamento: "R$ 15k a R$ 30k",
    mensagem: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "flex-start" }}>
          {/* Coluna de Contexto */}
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Briefing Técnico & Avaliação
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", color: "var(--text-primary)", marginTop: "12px", letterSpacing: "-0.02em" }}>
              Vamos entender o seu desafio digital.
            </h1>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "16px", marginBottom: "32px" }}>
              Preencha o formulário com os detalhes do seu projeto. Nossa equipe de engenharia e produto analisará as informações e retornará em até 24 horas úteis com uma avaliação prévia e proposta de alinhamento.
            </p>

            <div style={{
              background: "var(--grafite)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "24px",
              display: "flex",
              flexDirection: "column",
              gap: "16px"
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase" }}>
                Garantias do Processo:
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--sinal)" }}>✓</span> Acordo de Confidencialidade (NDA) disponível
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--sinal)" }}>✓</span> Análise direta por arquiteto sênior
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--sinal)" }}>✓</span> Proposta com escopo, prazos e arquitetura clara
              </div>
            </div>
          </div>

          {/* Coluna do Formulário */}
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "40px"
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "48px 16px" }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "50%",
                  background: "var(--sinal)",
                  color: "var(--obsidiana)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  fontWeight: "bold",
                  margin: "0 auto 20px"
                }}>
                  ✓
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", marginBottom: "12px" }}>
                  Briefing Recebido com Sucesso!
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto" }}>
                  Obrigado, <strong>{formData.nome}</strong>. Nossa equipe técnica entrará em contato pelo e-mail <strong>{formData.email}</strong> para o próximo passo.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Carlos Eduardo"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--obsidiana)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      outline: "none"
                    }}
                  />
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                      Empresa / Organização *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Nome da sua empresa"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--obsidiana)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        color: "var(--text-primary)",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                      E-mail Corporativo *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="seu.nome@empresa.com"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--obsidiana)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        color: "var(--text-primary)",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                      Objetivo Principal *
                    </label>
                    <select
                      value={formData.objetivo}
                      onChange={(e) => setFormData({ ...formData, objetivo: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--obsidiana)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        color: "var(--text-primary)",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    >
                      <option value="Novo Site Institucional / E-Commerce">Novo Site Institucional / E-Commerce</option>
                      <option value="Plataforma Web Sob Medida / SaaS">Plataforma Web Sob Medida / SaaS</option>
                      <option value="Engenharia de Dados & BI">Engenharia de Dados & BI</option>
                      <option value="Automação & Agentes de IA">Automação & Agentes de IA</option>
                      <option value="Consultoria Técnica (CTO as a Service)">Consultoria Técnica (CTO as a Service)</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                      Faixa Orçamentária Prevista
                    </label>
                    <select
                      value={formData.orcamento}
                      onChange={(e) => setFormData({ ...formData, orcamento: e.target.value })}
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        background: "var(--obsidiana)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        color: "var(--text-primary)",
                        fontSize: "14px",
                        outline: "none"
                      }}
                    >
                      <option value="R$ 15k a R$ 30k">R$ 15k a R$ 30k</option>
                      <option value="R$ 30k a R$ 60k">R$ 30k a R$ 60k</option>
                      <option value="R$ 60k a R$ 120k">R$ 60k a R$ 120k</option>
                      <option value="Acima de R$ 120k">Acima de R$ 120k</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Resumo do Desafio ou Escopo
                  </label>
                  <textarea
                    rows={4}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder="Conte brevemente sobre o projeto, expectativas ou sistemas existentes..."
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      background: "var(--obsidiana)",
                      border: "1px solid var(--border)",
                      borderRadius: "4px",
                      color: "var(--text-primary)",
                      fontSize: "14px",
                      outline: "none",
                      resize: "vertical"
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: "var(--sinal)",
                    color: "var(--obsidiana)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "14px 24px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "8px"
                  }}
                >
                  Enviar Briefing para Avaliação Técnica →
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
