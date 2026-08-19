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
    <div>
      <div className={styles.explorerControls}>
        <div className={styles.filterBar} role="tablist" aria-label="Filtrar soluções por frente">
          {FILTERS.map((f) => (
            <button
              key={f.id}
              role="tab"
              aria-selected={active === f.id}
              className={`${styles.filterTab} ${active === f.id ? styles.filterTabActive : ""}`}
              onClick={() => setActive(f.id)}
            >
              {f.label}
            </button>
          ))}
        </div>
        <div className={styles.viewToggle} role="tablist" aria-label="Alternar visualização">
          <button
            role="tab"
            aria-selected={view === "grid"}
            className={`${styles.viewButton} ${view === "grid" ? styles.viewButtonActive : ""}`}
            onClick={() => setView("grid")}
          >
            Grade
          </button>
          <button
            role="tab"
            aria-selected={view === "list"}
            className={`${styles.viewButton} ${view === "list" ? styles.viewButtonActive : ""}`}
            onClick={() => setView("list")}
          >
            Lista
          </button>
        </div>
      </div>

      {/* Grade com Layout Dinâmico e Perfeitamente Simétrico */}
      <div
        style={
          view === "grid"
            ? {
                display: "grid",
                gridTemplateColumns:
                  visible.length === 1
                    ? "1fr"
                    : visible.length === 2
                    ? "1fr 1fr"
                    : "repeat(3, 1fr)",
                gap: "16px",
                width: "100%"
              }
            : {
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                width: "100%"
              }
        }
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
                padding: "24px",
                display: "flex",
                flexDirection: view === "grid" ? "column" : "row",
                gap: view === "grid" ? "14px" : "20px",
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
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "var(--sinal)"
                }}>
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div style={{ display: "flex", gap: "6px" }}>
                  {service.categories.map((c) => (
                    <span
                      key={c}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "10px",
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
                  fontSize: "18px",
                  color: "var(--text-primary)",
                  marginBottom: "8px"
                }}>
                  {service.name}
                </h3>
                <p style={{
                  fontSize: "14px",
                  color: "var(--text-secondary)",
                  lineHeight: 1.55,
                  marginBottom: "14px"
                }}>
                  {service.desc}
                </p>

                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : service.name)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
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
                    marginTop: "12px",
                    paddingTop: "12px",
                    borderTop: "1px solid var(--border)",
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                    fontSize: "13px",
                    color: "var(--text-secondary)"
                  }}>
                    {service.items.map((item) => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: "6px" }}>
                        <span style={{ color: "var(--sinal)" }}>•</span>
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
