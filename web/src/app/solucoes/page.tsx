import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { SERVICES } from "../data";

export const metadata = {
  title: "Soluções Digitais & Engenharia — ARKOS",
  description: "Portfólio completo de capacidades modulares da ARKOS: Digital Experience, Growth Technology, Software & Platforms, Data & Intelligence, AI & Automation e Technology Advisory."
};

export default function SolucoesPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        {/* Header da Página */}
        <div style={{ marginBottom: "56px", maxWidth: "760px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Capacidades Modulares de Engenharia
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", color: "var(--text-primary)", marginTop: "12px", letterSpacing: "-0.02em" }}>
            Soluções digitais desenhadas para resolver problemas reais de negócio.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "16px" }}>
            Da estratégia e design de interfaces à engenharia de software e inteligência de dados. Trabalhamos em módulos integrados ou dedicados conforme o momento da sua empresa.
          </p>
        </div>

        {/* Imagem de Destaque da Arquitetura */}
        <div style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          marginBottom: "64px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
        }}>
          <Image
            src="/assets/software_architecture.jpg"
            alt="Estação de engenharia de software com código TypeScript limpo e diagrama de dados"
            width={1200}
            height={500}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
        </div>

        {/* Grade Detalhada de Serviços */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "32px" }}>
          {SERVICES.map((srv, idx) => (
            <div key={idx} id={srv.categories[0]} style={{
              background: "var(--grafite)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "32px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                    0{idx + 1}. Módulo
                  </span>
                  <div style={{ display: "flex", gap: "6px" }}>
                    {srv.categories.map((c, i) => (
                      <span key={i} style={{ fontSize: "10px", fontFamily: "var(--font-mono)", background: "var(--ardosia)", padding: "2px 6px", borderRadius: "3px", color: "var(--text-secondary)" }}>
                        #{c}
                      </span>
                    ))}
                  </div>
                </div>

                <h2 style={{ fontSize: "22px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "12px" }}>
                  {srv.name}
                </h2>

                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
                  {srv.desc}
                </p>

                <div style={{ borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
                  <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", textTransform: "uppercase", marginBottom: "10px" }}>
                    Entregáveis & Capacidades:
                  </div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {srv.items.map((item, itIdx) => (
                      <li key={itIdx} style={{ fontSize: "13px", color: "var(--text-secondary)", display: "flex", alignItems: "center", gap: "8px" }}>
                        <span style={{ color: "var(--sinal)", fontSize: "10px" }}>■</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div style={{ marginTop: "32px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                <Link href="/contato" style={{
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  color: "var(--sinal)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px"
                }}>
                  Solicitar este módulo →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
