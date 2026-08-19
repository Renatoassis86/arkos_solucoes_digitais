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

      <div className={view === "grid" ? styles.servicesGrid : styles.servicesList}>
        {visible.map((service, index) => {
          const isOpen = open === service.name;
          return (
            <div
              className={view === "grid" ? styles.serviceCard : styles.serviceRow}
              key={service.name}
            >
              <span className={styles.serviceIndex}>
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className={styles.serviceBody}>
                <h3 className={styles.serviceName}>{service.name}</h3>
                <div className={styles.tagRow}>
                  {service.categories.map((c) => (
                    <span className={styles.tag} key={c}>
                      #{c}
                    </span>
                  ))}
                </div>
                <p className={styles.serviceDesc}>{service.desc}</p>
                <button
                  className={styles.accordionToggle}
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? null : service.name)}
                >
                  {isOpen ? "Ver menos" : "Ver capacidades"}
                </button>
                {isOpen && (
                  <ul className={styles.accordionList}>
                    {service.items.map((item) => (
                      <li key={item}>{item}</li>
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
