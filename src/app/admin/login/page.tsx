"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Validação das credenciais oficiais do gestor
    if (email.trim().toLowerCase() === "renato086@gmail.com" && password === "admin123") {
      if (typeof window !== "undefined") {
        sessionStorage.setItem("arkos_admin_auth", JSON.stringify({
          email: "renato086@gmail.com",
          name: "Renato Assis",
          role: "Gestor Principal",
          loggedInAt: new Date().toISOString()
        }));
      }
      router.push("/admin");
    } else {
      setError("E-mail ou senha incorretos. Verifique suas credenciais de gestor.");
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--obsidiana)",
      padding: "20px"
    }}>
      <div style={{
        width: "100%",
        maxWidth: "420px",
        background: "var(--grafite)",
        border: "1px solid var(--border)",
        borderRadius: "8px",
        padding: "36px 28px",
        boxShadow: "0 20px 40px rgba(0,0,0,0.5)"
      }}>
        {/* Logo ARKOS */}
        <div style={{ textAlign: "center", marginBottom: "28px" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "10px" }}>
            <svg width="28" height="28" viewBox="0 0 200 200" fill="none">
              <line x1="30" y1="190" x2="100" y2="20" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="100" y1="20" x2="170" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="52" y1="130" x2="148" y2="130" stroke="#C8F542" strokeWidth="12" strokeLinecap="round"/>
              <circle cx="100" cy="20" r="10" fill="#C8F542"/>
            </svg>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "bold", color: "var(--text-primary)" }}>
              ARKOS
            </span>
          </Link>
          <div style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--sinal)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginTop: "6px"
          }}>
            Painel do Gestor · Acesso Restrito
          </div>
        </div>

        {error && (
          <div style={{
            background: "rgba(255, 107, 107, 0.1)",
            border: "1px solid rgba(255, 107, 107, 0.4)",
            borderRadius: "4px",
            padding: "10px 14px",
            fontSize: "13px",
            color: "#ff6b6b",
            marginBottom: "20px"
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div>
            <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
              E-mail do Gestor
            </label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="renato086@gmail.com"
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-primary)",
                fontSize: "14px"
              }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "6px" }}>
              Senha de Acesso
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%",
                padding: "12px 14px",
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-primary)",
                fontSize: "14px"
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              marginTop: "8px",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 700,
              padding: "14px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              transition: "opacity 0.2s"
            }}
          >
            {loading ? "Entrando..." : "Acessar Painel do Gestor →"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "24px", fontSize: "12px", color: "var(--text-secondary)" }}>
          <Link href="/" style={{ color: "var(--text-secondary)" }}>
            ← Voltar para o site público
          </Link>
        </div>
      </div>
    </div>
  );
}
