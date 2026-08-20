import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { METHOD } from "../data";

export const metadata = {
  title: "O Método de Entrega em 10 Fases — ARKOS",
  description: "Como a ARKOS estrutura o ciclo de vida de soluções digitais: do entendimento à escala, com método e foco em resultados reais."
};

export default function MetodoPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "48px 20px", width: "100%" }}>
        {/* Header da Página */}
        <div style={{ marginBottom: "40px", maxWidth: "760px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Ciclo de Vida e Rigor de Engenharia
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(26px, 4.5vw, 40px)", color: "var(--text-primary)", marginTop: "10px", letterSpacing: "-0.02em", lineHeight: 1.2 }}>
            Um método estruturado para eliminar incertezas e entregar valor contínuo.
          </h1>
          <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "14px" }}>
            Não pulamos etapas nem usamos atalhos frágeis. Cada projeto segue um fluxo testado de 10 fases, da imersão no problema à escala sustentável em produção.
          </p>
        </div>

        {/* Imagem de Workshop de Design Sprint e Wireframing */}
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
            src="/assets/method_wireframing.jpg"
            alt="Mesa de sprint de design de produto com wireframes desenhados à mão e fluxogramas no Figma"
            width={1200}
            height={500}
            style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
          />
        </div>

        {/* As 10 Fases do Método em Linha do Tempo */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          {METHOD.map((m, idx) => (
            <div key={idx} id={m.step.toLowerCase()} className="metodo-phase-card" style={{
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: "24px",
              alignItems: "center"
            }}>
              <div style={{
                position: "relative",
                width: "100%",
                height: "120px",
                borderRadius: "6px",
                overflow: "hidden",
                border: "1px solid var(--border)"
              }}>
                <Image
                  src={m.image}
                  alt={m.step}
                  fill
                  sizes="(max-width: 768px) 100vw, 200px"
                  style={{ objectFit: "cover" }}
                />
                <div style={{
                  position: "absolute",
                  top: "6px",
                  left: "6px",
                  background: "rgba(10, 12, 15, 0.85)",
                  backdropFilter: "blur(4px)",
                  padding: "2px 6px",
                  borderRadius: "3px",
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  color: "var(--sinal)",
                  fontWeight: 600
                }}>
                  {idx < 9 ? `0${idx + 1}` : idx + 1}. FASE
                </div>
              </div>

              <div>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase" }}>
                  {m.tag}
                </span>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)", margin: "4px 0 8px", lineHeight: 1.3 }}>
                  {m.step}
                </h3>
                <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, margin: 0 }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Box de CTA de Conversão no Método */}
        <div style={{
          marginTop: "48px",
          background: "var(--ardosia)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "36px 20px",
          textAlign: "center"
        }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--text-primary)", marginBottom: "10px" }}>
            Pronto para aplicar este método ao seu projeto?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginBottom: "20px", maxWidth: "560px", margin: "0 auto 20px", lineHeight: 1.6 }}>
            Preencha nosso briefing ou entre em contato para avaliarmos o momento da sua empresa e desenharmos o roadmap adequado.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/briefing" style={{
              display: "inline-block",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "12px 22px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              Iniciar Briefing do Método →
            </Link>
            <Link href="/contato" style={{
              display: "inline-block",
              background: "var(--grafite)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              padding: "12px 20px",
              borderRadius: "4px"
            }}>
              Falar com Consultor
            </Link>
          </div>
        </div>
      </main>

      <Footer />

    </div>
  );
}
