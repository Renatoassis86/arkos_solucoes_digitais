"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { FILTERS, SERVICES, type Category } from "../data";

type View = "grid" | "list";

export default function ServicesExplorer() {
  const [active, setActive] = useState<Category | "all">("all");
  const [open, setOpen] = useState<string | null>(null);
  const [view, setView] = useState<View>("grid");

  const visible =
    active === "all"
      ? SERVICES
      : SERVICES.filter((s) => s.categories.includes(active));

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      {/* Controles de Filtros e Visualização */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        gap: "14px",
        marginBottom: "24px"
      }}>
        {/* Pílulas de Categoria com Quebra Fluida e Sem Cortes */}
        <div
          role="tablist"
          aria-label="Categorias de soluções"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "8px",
            width: "100%"
          }}
        >
          {FILTERS.map((f) => {
            const isSelected = active === f.id;
            return (
              <button
                key={f.id}
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActive(f.id)}
                style={{
                  background: isSelected ? "var(--sinal)" : "var(--ardosia)",
                  color: isSelected ? "var(--obsidiana)" : "var(--text-primary)",
                  border: isSelected ? "1px solid var(--sinal)" : "1px solid var(--border)",
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: isSelected ? 700 : 500,
                  padding: "8px 14px",
                  borderRadius: "20px",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  textTransform: "uppercase",
                  letterSpacing: "0.03em"
                }}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Alternador de Visualização Grade / Lista */}
        <div style={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
          <div className={styles.viewToggle} role="tablist" aria-label="Alternar visualização">
            <button
              role="tab"
              aria-selected={view === "grid"}
              className={`${styles.viewButton} ${view === "grid" ? styles.viewButtonActive : ""}`}
              onClick={() => setView("grid")}
              style={{ padding: "6px 12px", fontSize: "11px" }}
            >
              Grade
            </button>
            <button
              role="tab"
              aria-selected={view === "list"}
              className={`${styles.viewButton} ${view === "list" ? styles.viewButtonActive : ""}`}
              onClick={() => setView("list")}
              style={{ padding: "6px 12px", fontSize: "11px" }}
            >
              Lista
            </button>
          </div>
        </div>
      </div>

      {/* Grade com Layout Dinâmico e Responsivo */}
      <div
        className={view === "grid" ? "services-responsive-grid" : "services-responsive-list"}
      >
        {visible.map((service, index) => {
          const isOpen = open === service.name;
          return (
            <div
              key={service.name}
              style={{
                background: "var(--grafite)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "20px",
                display: "flex",
                flexDirection: view === "grid" ? "column" : "row",
                gap: view === "grid" ? "12px" : "16px",
                transition: "all 0.2s ease"
              }}
            >
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <span style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  fontWeight: 600,
                  color: "var(--sinal)"
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                  {service.categories.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "9px",
                        color: "var(--text-secondary)",
                        background: "var(--ardosia)",
                        padding: "2px 6px",
                        borderRadius: "3px"
                      }}
                    >
                      #{c}
                    </span>
                  ))}
                </div>
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "17px",
                  color: "var(--text-primary)",
                  marginBottom: "8px",
                  lineHeight: 1.3
                }}>
                  {service.name}
                </h3>
                <p style={{
                  fontSize: "13px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                  marginBottom: "12px"
                }}>
                  {service.desc}
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : service.name)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: "4px 0",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--sinal)",
                    textTransform: "uppercase",
                    letterSpacing: "0.06em",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: "4px"
                  }}
                >
                  {isOpen ? "▲ Ver Menos" : "▼ Ver Detalhes"}
                </button>

                {isOpen && (
                  <ul style={{
                    marginTop: "10px",
                    paddingTop: "10px",
                    borderTop: "1px solid var(--border)",
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    fontSize: "12px",
                    color: "var(--text-secondary)"
                  }}>
                    {service.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                        <span style={{ color: "var(--sinal)", flexShrink: 0 }}>•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
