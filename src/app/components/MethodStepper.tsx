"use client";

import { useState } from "react";
import Image from "next/image";
import { METHOD } from "../data";

export default function MethodStepper() {
  const [active, setActive] = useState(0);
  const currentStage = METHOD[active];

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* Grade de 10 Fases com Fotos Reais em cada Caixa */}
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
                border: isActive ? "2px solid var(--sinal)" : "1px solid var(--border)",
                borderRadius: "8px",
                padding: "8px",
                textAlign: "left",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
                minHeight: "120px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                width: "100%",
                overflow: "hidden",
                boxShadow: isActive ? "0 8px 24px rgba(200, 245, 66, 0.15)" : "none"
              }}
            >
              {/* Miniatura da Foto Real do Negócio / Tipo de Site */}
              <div style={{
                position: "relative",
                width: "100%",
                height: "56px",
                borderRadius: "4px",
                overflow: "hidden",
                marginBottom: "8px"
              }}>
                <Image
                  src={m.image}
                  alt={m.step}
                  fill
                  sizes="(max-width: 768px) 50vw, 20vw"
                  style={{
                    objectFit: "cover",
                    filter: isActive ? "brightness(1.05)" : "brightness(0.75) contrast(1.05)",
                    transition: "filter 0.2s ease"
                  }}
                />
                <div style={{
                  position: "absolute",
                  top: "4px",
                  left: "4px",
                  background: "rgba(10, 12, 15, 0.85)",
                  backdropFilter: "blur(4px)",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  fontWeight: 600,
                  color: isActive ? "var(--sinal)" : "#F4F2ED"
                }}>
                  {num}
                </div>
              </div>

              <div style={{
                fontSize: "11px",
                fontWeight: 600,
                color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                lineHeight: 1.25,
                display: "-webkit-box",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical",
                overflow: "hidden"
              }}>
                {title}
              </div>

              {isActive && (
                <div style={{
                  position: "absolute",
                  bottom: 0,
                  left: "8px",
                  right: "8px",
                  height: "3px",
                  background: "var(--sinal)",
                  borderRadius: "2px"
                }} />
              )}
            </button>
          );
        })}
      </div>

      {/* Painel de Destaque da Fase Ativa com Foto Real Ampliada & Descrição */}
      <div className="method-active-card" style={{
        marginTop: "24px",
        background: "var(--grafite)",
        border: "1px solid var(--border)",
        borderRadius: "12px",
        padding: "24px",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 1fr)",
        gap: "28px",
        alignItems: "center"
      }}>
        {/* Foto Real Ampliada com o tipo de site e pessoas */}
        <div style={{
          position: "relative",
          width: "100%",
          height: "280px",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          boxShadow: "0 12px 36px rgba(0,0,0,0.5)"
        }}>
          <Image
            src={currentStage.image}
            alt={currentStage.step}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            style={{ objectFit: "cover" }}
            priority
          />
          <div style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            background: "rgba(10, 12, 15, 0.88)",
            backdropFilter: "blur(6px)",
            padding: "10px 14px",
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase" }}>
              {currentStage.tag}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)" }}>
              Fase {String(active + 1).padStart(2, "0")}/10
            </span>
          </div>
        </div>

        {/* Informações da Fase e Navegação */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div>
            <div style={{
              display: "inline-block",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--sinal)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: "8px"
            }}>
              Fase {String(active + 1).padStart(2, "0")} de 10 · {currentStage.tag}
            </div>
            <h3 style={{
              fontFamily: "var(--font-display)",
              fontSize: "24px",
              color: "var(--text-primary)",
              marginBottom: "12px",
              lineHeight: 1.2
            }}>
              {currentStage.step}
            </h3>
            <p style={{
              fontSize: "15px",
              color: "var(--text-secondary)",
              lineHeight: 1.6,
              margin: 0
            }}>
              {currentStage.desc}
            </p>
          </div>

          {/* Navegação entre passos */}
          <div className="method-nav-buttons" style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
            <button
              type="button"
              disabled={active === 0}
              onClick={() => setActive((prev) => Math.max(0, prev - 1))}
              style={{
                background: "var(--ardosia)",
                border: "1px solid var(--border)",
                color: active === 0 ? "var(--border)" : "var(--text-primary)",
                padding: "12px 18px",
                borderRadius: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                cursor: active === 0 ? "not-allowed" : "pointer",
                flex: 1,
                textAlign: "center",
                transition: "all 0.2s ease"
              }}
            >
              ← Fase Anterior
            </button>
            <button
              type="button"
              disabled={active === METHOD.length - 1}
              onClick={() => setActive((prev) => Math.min(METHOD.length - 1, prev + 1))}
              style={{
                background: active === METHOD.length - 1 ? "var(--ardosia)" : "var(--sinal)",
                border: "1px solid var(--border)",
                color: active === METHOD.length - 1 ? "var(--border)" : "var(--obsidiana)",
                padding: "12px 18px",
                borderRadius: "6px",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: active === METHOD.length - 1 ? "not-allowed" : "pointer",
                flex: 1,
                textAlign: "center",
                transition: "all 0.2s ease"
              }}
            >
              Próxima Fase →
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
