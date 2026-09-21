"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { FormularioGenerico } from "./FormularioGenerico";
import { FormularioKairos } from "./FormularioKairos";

// Um único link para o Briefing de Plataforma Comercial. Por padrão mostra o
// formulário genérico (qualquer visitante, sem código). Quem tem um código de
// acesso digita aqui em cima e, se o PIN for válido, o conteúdo muda pro
// questionário customizado daquela empresa — hoje só a Kairós tem um
// customizado; um próximo cliente com formulário próprio ganharia seu
// próprio componente (como FormularioKairos) selecionado pelo campo
// `empresa` que a validação do PIN retornar.
export default function BriefingPlataformaComercialPage() {
  const [pin, setPin] = useState("");
  const [modoPrivado, setModoPrivado] = useState(false);
  const [validandoPin, setValidandoPin] = useState(false);
  const [pinError, setPinError] = useState("");
  const [jaRespondido, setJaRespondido] = useState(false);

  const handleValidarPin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinError("");
    if (!pin.trim()) return;
    setValidandoPin(true);
    try {
      // Único ponto de checagem hoje: a tabela de PINs da Kairós. Quando
      // existir um segundo cliente customizado, essa rota passa a checar
      // várias tabelas/uma tabela com coluna `empresa` e devolver qual
      // formulário customizado montar.
      const res = await fetch("/api/briefing-kairos/validar-pin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pin: pin.trim() }),
      });
      const data = await res.json();
      if (!data.success || !data.valido) {
        setPinError("Código inválido. Confira o código recebido e tente novamente.");
        return;
      }
      setJaRespondido(!!data.jaRespondido);
      setModoPrivado(true);
    } catch {
      setPinError("Falha de conexão. Verifique sua internet e tente novamente.");
    } finally {
      setValidandoPin(false);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "880px", margin: "0 auto", padding: "40px 18px", width: "100%" }}>
        {!modoPrivado && (
          <div style={{
            background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "8px",
            padding: "16px 20px", marginBottom: "24px",
          }}>
            <form onSubmit={handleValidarPin} style={{ display: "flex", flexWrap: "wrap", gap: "10px", alignItems: "flex-end" }}>
              <div style={{ flex: "1 1 220px" }}>
                <label style={{
                  display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)",
                  textTransform: "uppercase", marginBottom: "4px",
                }}>
                  Tem um código de acesso da sua empresa?
                </label>
                <input
                  type="text"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  placeholder="Digite seu código aqui"
                  style={{
                    width: "100%", padding: "10px 14px", background: "var(--obsidiana)", border: "1px solid var(--border)",
                    borderRadius: "4px", color: "var(--text-primary)", fontSize: "14px",
                  }}
                />
              </div>
              <button type="submit" disabled={validandoPin || !pin.trim()} className="briefing-btn-back" style={{ height: "41px" }}>
                {validandoPin ? "Verificando..." : "Entrar com código →"}
              </button>
            </form>
            {pinError && (
              <div style={{ marginTop: "10px", fontSize: "12px", color: "#ff6b6b" }}>⚠ {pinError}</div>
            )}
            <p style={{ marginTop: "10px", fontSize: "12px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
              Sem código? Sem problema — o formulário geral abaixo já está pronto pra você preencher.
            </p>
          </div>
        )}

        {modoPrivado ? (
          jaRespondido ? (
            <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "8px", padding: "40px 28px", textAlign: "center" }}>
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
                As respostas ligadas a este código já foram enviadas. Cada código é de uso único. Se você ainda não respondeu, confirme com quem te passou o código.
              </p>
            </div>
          ) : (
            <FormularioKairos pin={pin} />
          )
        ) : (
          <FormularioGenerico />
        )}
      </main>

      <Footer />
    </div>
  );
}
