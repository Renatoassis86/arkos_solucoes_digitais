"use client";

import { useState } from "react";
import styles from "../page.module.css";
import { METHOD } from "../data";

export default function MethodStepper() {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className={styles.methodStrip} role="tablist" aria-label="Etapas do método">
        {METHOD.map((m, i) => (
          <button
            key={m.step}
            role="tab"
            aria-selected={active === i}
            className={`${styles.methodStep} ${active === i ? styles.methodStepActive : ""}`}
            onClick={() => setActive(i)}
          >
            {m.step}
          </button>
        ))}
      </div>
      <p className={styles.methodDesc}>{METHOD[active].desc}</p>
    </div>
  );
}
