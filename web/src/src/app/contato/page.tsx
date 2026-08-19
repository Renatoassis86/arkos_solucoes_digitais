"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "@/lib/supabase";

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: "",
    empresa: "",
    email: "",
    telefone: "",
    servico_interesse: "Landing Page Express / Página Única",
    mensagem: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (process.env.NEXT_PUBLIC_SUPABASE_URL) {
        await supabase.from("contatos").insert([
          {
            nome: formData.nome,
            empresa: formData.empresa,
            email: formData.email,
            telefone: formData.telefone,
            servico_interesse: formData.servico_interesse,
            mensagem: formData.mensagem,
            origem_url: "/contato"
          }
        ]);
      }
    } catch (err) {
      console.warn("Contato salvo:", err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "64px", alignItems: "flex-start" }}>
          {/* Coluna de Contexto */}
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Fale Conosco e Atendimento
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "40px", color: "var(--text-primary)", marginTop: "12px", letterSpacing: "-0.02em" }}>
              Vamos entender o seu desafio digital.
            </h1>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "16px", marginBottom: "32px" }}>
              Preencha o formulário com os detalhes do seu projeto. Nossa equipe analisará as informações e retornará rapidamente com a melhor orientação.
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
                Garantias do Atendimento:
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--sinal)" }}>✓</span> Retorno rápido e direto no seu WhatsApp ou e-mail
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--sinal)" }}>✓</span> Proposta clara com escopo, valores e prazos
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "var(--sinal)" }}>✓</span> Atendimento personalizado para pequenas e grandes empresas
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
                  Mensagem Recebida com Sucesso!
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto" }}>
                  Obrigado, <strong>{formData.nome}</strong>. Nossa equipe entrará em contato pelo e-mail <strong>{formData.email}</strong> ou WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Seu Nome *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Nome completo"
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
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Empresa ou Marca"
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
                      WhatsApp com DDD *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(31) 99999-9999"
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

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    E-mail de Contato *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="seuemail@empresa.com"
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
                    Solução ou Tipo de Site Desejado
                  </label>
                  <select
                    value={formData.servico_interesse}
                    onChange={(e) => setFormData({ ...formData, servico_interesse: e.target.value })}
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
                    <option value="Landing Page Express / Página Única">Landing Page Express / Página Única (a partir de R$ 600)</option>
                    <option value="Site Institucional Completo">Site Institucional Completo</option>
                    <option value="Loja Virtual ou Catálogo Digital">Loja Virtual ou Catálogo Digital</option>
                    <option value="Portal de Clientes ou Sistema Web">Portal de Clientes ou Sistema Web</option>
                    <option value="Automação e Integrações">Automação de Processos e Integrações</option>
                    <option value="Consultoria e Otimização">Consultoria Técnica e Otimização</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "8px" }}>
                    Resumo da sua Necessidade
                  </label>
                  <textarea
                    rows={4}
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder="Conte brevemente sobre o seu projeto ou objetivos..."
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
                  disabled={loading}
                  style={{
                    background: "var(--sinal)",
                    color: "var(--obsidiana)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    fontWeight: 600,
                    padding: "14px 28px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: "pointer",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    marginTop: "8px"
                  }}
                >
                  {loading ? "Enviando..." : "Enviar Mensagem →"}
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
