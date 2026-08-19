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
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "48px 20px", width: "100%" }}>
        <div className="contato-container-grid">
          {/* Coluna de Contexto */}
          <div>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              Fale Conosco e Atendimento
            </span>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4.5vw, 38px)", color: "var(--text-primary)", marginTop: "10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
              Vamos entender o seu desafio digital.
            </h1>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "14px", marginBottom: "28px" }}>
              Preencha o formulário com os detalhes do seu projeto. Nossa equipe analisará as informações e retornará rapidamente com a melhor orientação.
            </p>

            <div style={{
              background: "var(--grafite)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "20px",
              display: "flex",
              flexDirection: "column",
              gap: "14px"
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase" }}>
                Garantias do Atendimento:
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "var(--sinal)", flexShrink: 0 }}>✓</span>
                <span>Retorno rápido e direto no seu WhatsApp ou e-mail</span>
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "var(--sinal)", flexShrink: 0 }}>✓</span>
                <span>Proposta clara com escopo, valores e prazos</span>
              </div>
              <div style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "flex-start", gap: "8px" }}>
                <span style={{ color: "var(--sinal)", flexShrink: 0 }}>✓</span>
                <span>Atendimento personalizado para pequenas e grandes empresas</span>
              </div>
            </div>
          </div>

          {/* Coluna do Formulário */}
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "clamp(20px, 4vw, 36px)"
          }}>
            {submitted ? (
              <div style={{ textAlign: "center", padding: "32px 12px" }}>
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
                  margin: "0 auto 16px"
                }}>
                  ✓
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--text-primary)", marginBottom: "10px" }}>
                  Mensagem Recebida com Sucesso!
                </h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6, maxWidth: "420px", margin: "0 auto" }}>
                  Obrigado, <strong>{formData.nome}</strong>. Nossa equipe entrará em contato pelo e-mail <strong>{formData.email}</strong> ou WhatsApp.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Seu Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nome}
                    onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                    placeholder="Ex: Amanda Ferreira"
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div className="contato-input-row">
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Nome da Empresa
                    </label>
                    <input
                      type="text"
                      value={formData.empresa}
                      onChange={(e) => setFormData({ ...formData, empresa: e.target.value })}
                      placeholder="Ex: Inovação Consultoria"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                      Telefone ou WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.telefone}
                      onChange={(e) => setFormData({ ...formData, telefone: e.target.value })}
                      placeholder="(83) 98888-7777"
                      style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    E-mail Profissional *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="amanda@empresa.com.br"
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  />
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Serviço de Maior Interesse
                  </label>
                  <select
                    value={formData.servico_interesse}
                    onChange={(e) => setFormData({ ...formData, servico_interesse: e.target.value })}
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px" }}
                  >
                    <option value="Landing Page Express / Página Única">Landing Page Express / Página Única (a partir de R$ 600)</option>
                    <option value="Site Institucional Completo">Site Institucional Completo</option>
                    <option value="Portal / Plataforma Sob Medida">Portal / Plataforma Sob Medida</option>
                    <option value="Otimização de Conversão e Velocidade">Otimização de Conversão e Velocidade</option>
                    <option value="Integração de Sistemas e Banco de Dados">Integração de Sistemas e Banco de Dados</option>
                    <option value="Outro Desafio Digital">Outro Desafio Digital</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
                    Como Podemos Ajudar? *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.mensagem}
                    onChange={(e) => setFormData({ ...formData, mensagem: e.target.value })}
                    placeholder="Conte um pouco sobre o que você deseja criar, objetivo do site e prazo ideal..."
                    style={{ width: "100%", padding: "12px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)", borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px", resize: "vertical" }}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "var(--sinal)",
                    color: "var(--obsidiana)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    padding: "14px",
                    borderRadius: "4px",
                    border: "none",
                    cursor: loading ? "wait" : "pointer",
                    marginTop: "8px"
                  }}
                >
                  {loading ? "Enviando Informações..." : "Enviar Mensagem e Solicitar Contato →"}
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
