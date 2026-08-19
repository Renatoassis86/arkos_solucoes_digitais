"use client";

import { useState } from "react";
import { METHOD } from "../data";

export default function MethodStepper() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ width: "100%" }}>
      {/* Grade Simétrica de 10 Fases: 5 colunas x 2 linhas */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(5, 1fr)",
        gap: "10px",
        marginBottom: "24px"
      }}>
        {METHOD.map((m, i) => {
          const isActive = active === i;
          // Extrai o número e o título de forma limpa (ex: "1. Entendimento" -> "01" e "Entendimento")
          const parts = m.step.split(". ");
          const num = String(i + 1).padStart(2, "0");
          const title = parts.length > 1 ? parts[1] : m.step;

          return (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              style={{
                background: isActive ? "var(--ardosia)" : "var(--grafite)",
                border: isActive ? "1px solid var(--sinal)" : "1px solid var(--border)",
                borderRadius: "6px",
                padding: "16px 12px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                minHeight: "84px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between"
              }}
            >
              <div style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                fontWeight: 600,
                color: isActive ? "var(--sinal)" : "var(--text-secondary)",
                letterSpacing: "0.04em"
              }}>
                {num}.
              </div>

              <div style={{
                fontSize: "13px",
                fontWeight: 600,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                lineHeight: 1.3
              }}>
                {title}
              </div>

              {isActive && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "12px",
                  right: "12px",
                  height: "2px",
                  background: "var(--sinal)",
                  borderRadius: "2px"
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Painel de Destaque da Fase Ativa */}
      <div style={{
        background: "var(--grafite)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "24px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "24px"
      }}>
        <div style={{ flex: 1 }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--sinal)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "6px"
          }}>
            Fase Ativa {String(active + 1).padStart(2, "0")} de 10
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            color: "var(--text-primary)",
            marginBottom: "8px"
          }}>
            {METHOD[active].step}
          </h3>
          <p style={{
            fontSize: "15px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0
          }}>
            {METHOD[active].desc}
          </p>
        </div>

        {/* Navegação entre passos */}
        <div style={{ display: "flex", gap: "8px", flexShrink: 0 }}>
          <button
            type="button"
            disabled={active === 0}
            onClick={() => setActive((prev) => Math.max(0, prev - 1))}
            style={{
              background: "var(--ardosia)",
              border: "1px solid var(--border)",
              color: active === 0 ? "var(--border)" : "var(--text-primary)",
              padding: "8px 14px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              cursor: active === 0 ? "not-allowed" : "pointer"
            }}
          >
            ← Anterior
          </button>
          <button
            type="button"
            disabled={active === METHOD.length - 1}
            onClick={() => setActive((prev) => Math.min(METHOD.length - 1, prev + 1))}
            style={{
              background: active === METHOD.length - 1 ? "var(--ardosia)" : "var(--sinal)",
              border: "1px solid var(--border)",
              color: active === METHOD.length - 1 ? "var(--border)" : "var(--obsidiana)",
              padding: "8px 14px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: active === METHOD.length - 1 ? "not-allowed" : "pointer"
            }}
          >
            Próxima Fase →
          </button>
        </div>
      </div>
    </div>
  );
}
