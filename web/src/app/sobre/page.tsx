import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PRINCIPLES } from "../data";

export const metadata = {
  title: "Sobre & Princípios — ARKOS Soluções Digitais",
  description: "Conheça o estúdio ARKOS: engenharia de software sob medida, design de experiência autêntico e governança contínua de tecnologia."
};

export default function SobrePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        {/* Header Institucional */}
        <div style={{ marginBottom: "56px", maxWidth: "780px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Manifesto Institucional
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", color: "var(--text-primary)", marginTop: "12px", letterSpacing: "-0.02em" }}>
            Engenharia e design para produtos digitais que precisam funcionar de verdade.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "16px" }}>
            A ARKOS nasceu para preencher a lacuna entre agências focadas apenas em estética superficial e desenvolvedores que não entendem de negócio. Unimos rigor técnico, métricas e experiência de usuário para construir plataformas que geram receita e eficiência operacional.
          </p>
        </div>

        {/* Imagem do Estúdio Loft & Equipe */}
        <div style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          marginBottom: "64px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
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
        <section id="principles" style={{ marginBottom: "64px" }}>
          <div style={{ marginBottom: "32px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Nossos Fundamentos
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: "var(--text-primary)", marginTop: "8px" }}>
              Os 4 Princípios Inegociáveis da ARKOS
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
            {PRINCIPLES.map((p, idx) => (
              <div key={idx} style={{
                background: "var(--grafite)",
                border: "1px solid var(--border)",
                borderRadius: "8px",
                padding: "28px"
              }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", marginBottom: "8px" }}>
                  0{idx + 1}. FUNDAMENTO
                </div>
                <h3 style={{ fontSize: "18px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "10px" }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Compromisso de Qualidade & Performance */}
        <section style={{
          background: "var(--ardosia)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "40px",
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "40px",
          alignItems: "center"
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Qualidade & Confiabilidade
            </div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--text-primary)", marginBottom: "12px" }}>
              Código limpo, arquitetura escalável e alta performance
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
              Não usamos templates prontos ou soluções frágeis. Cada projeto é projetado para alta velocidade de carregamento, conformidade de segurança e facilidade de manutenção a longo prazo para a sua equipe.
            </p>
          </div>

          <div style={{ textAlign: "right" }}>
            <Link href="/contato" style={{
              display: "inline-block",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "12px 20px",
              borderRadius: "4px",
              textTransform: "uppercase"
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
