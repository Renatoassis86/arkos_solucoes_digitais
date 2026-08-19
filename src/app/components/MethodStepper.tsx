"use client";

import { useState } from "react";
import { METHOD } from "../data";

export default function MethodStepper() {
  const [active, setActive] = useState(0);

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* Grade de 10 Fases com Media Queries para Mobile */}
      <div className="method-stepper-grid">
        {METHOD.map((m, i) => {
          const isActive = active === i;
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
                padding: "14px 10px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                minHeight: "76px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%"
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
                fontSize: "12px",
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
                  left: "10px",
                  right: "10px",
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
      <div className="method-active-card">
        <div style={{ flex: 1 }}>
          <div style={{
            display: "inline-block",
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--sinal)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "6px"
          }}>
            Fase {String(active + 1).padStart(2, "0")} de 10
          </div>
          <h3 style={{
            fontFamily: "var(--font-display)",
            fontSize: "18px",
            color: "var(--text-primary)",
            marginBottom: "8px",
            lineHeight: 1.3
          }}>
            {METHOD[active].step}
          </h3>
          <p style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            lineHeight: 1.6,
            margin: 0
          }}>
            {METHOD[active].desc}
          </p>
        </div>

        {/* Navegação entre passos */}
        <div className="method-nav-buttons">
          <button
            type="button"
            disabled={active === 0}
            onClick={() => setActive((prev) => Math.max(0, prev - 1))}
            style={{
              background: "var(--ardosia)",
              border: "1px solid var(--border)",
              color: active === 0 ? "var(--border)" : "var(--text-primary)",
              padding: "10px 14px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              cursor: active === 0 ? "not-allowed" : "pointer",
              flex: 1,
              textAlign: "center"
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
              padding: "10px 14px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: active === METHOD.length - 1 ? "not-allowed" : "pointer",
              flex: 1,
              textAlign: "center"
            }}
          >
            Próxima Fase →
          </button>
        </div>
      </div>

    </div>
  );
}
