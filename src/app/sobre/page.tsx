import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PRINCIPLES } from "../data";

export const metadata = {
  title: "Sobre e Princípios — ARKOS Soluções Digitais",
  description: "Conheça o estúdio ARKOS: engenharia de software sob medida, design de experiência autêntico e governança contínua de tecnologia."
};

export default function SobrePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "48px 20px", width: "100%" }}>
        {/* Header Institucional */}
        <div style={{ marginBottom: "40px", maxWidth: "780px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Manifesto Institucional
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4.5vw, 40px)", color: "var(--text-primary)", marginTop: "10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Engenharia e design para produtos digitais que precisam funcionar de verdade.
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "14px" }}>
            A ARKOS nasceu para preencher a lacuna entre agências focadas apenas em estética superficial e desenvolvedores que não entendem de negócio. Unimos rigor técnico, métricas e experiência de usuário para construir plataformas que geram receita e eficiência operacional.
          </p>
        </div>

        {/* Imagem do Estúdio Loft e Equipe */}
        <div style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          marginBottom: "48px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)",
          width: "100%"
        }}>
          <Image
            src="/assets/studio_team.jpg"
            alt="Ambiente de estúdio contemporâneo com equipe de design e engenharia colaborando em mesas de madeira sob luz natural"
            width={1200}
            height={550}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
        </div>

        {/* Nossos Princípios Operacionais */}
        <section id="principles" style={{ marginBottom: "48px" }}>
          <div style={{ marginBottom: "24px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Nossos Fundamentos
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", marginTop: "6px" }}>
              Os 4 Princípios Inegociáveis da ARKOS
            </h2>
          </div>

          <div className="sobre-principles-grid">
            {PRINCIPLES.map((p, idx) => (
              <div key={idx} style={{
                background: "var(--grafite)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "24px"
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", marginBottom: "6px" }}>
                  0{idx + 1}. FUNDAMENTO
                </div>
                <h3 style={{ fontSize: "17px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Compromisso de Qualidade e Performance */}
        <section className="sobre-quality-card">
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>
              Qualidade e Confiabilidade
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", color: "var(--text-primary)", marginBottom: "10px" }}>
              Código limpo, arquitetura escalável e alta performance
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Não usamos templates prontos ou soluções frágeis. Cada projeto é projetado para alta velocidade de carregamento, conformidade de segurança e facilidade de manutenção a longo prazo para a sua equipe.
            </p>
          </div>

          <div className="sobre-quality-btn">
            <Link href="/contato" style={{
              display: "inline-block",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "12px 20px",
              borderRadius: "4px",
              textTransform: "uppercase",
              textAlign: "center"
            }}>
              Conversar com o Time Técnico →
            </Link>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
