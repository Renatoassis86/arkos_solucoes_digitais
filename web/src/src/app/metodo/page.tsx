import Image from "next/image";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { METHOD } from "../data";

export const metadata = {
  title: "O Método de Entrega em 10 Fases — ARKOS",
  description: "Como a ARKOS estrutura o ciclo de vida de soluções digitais: do Discover ao Scale, com rigor de engenharia e foco em resultados mensuráveis."
};

export default function MetodoPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1, maxWidth: "1200px", margin: "0 auto", padding: "64px 24px" }}>
        {/* Header da Página */}
        <div style={{ marginBottom: "56px", maxWidth: "760px" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
            Ciclo de Vida & Rigor de Engenharia
          </span>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "42px", color: "var(--text-primary)", marginTop: "12px", letterSpacing: "-0.02em" }}>
            Um método estruturado para eliminar incertezas e entregar valor contínuo.
          </h1>
          <p style={{ fontSize: "16px", color: "var(--text-secondary)", lineHeight: 1.6, marginTop: "16px" }}>
            Não pulamos etapas nem inventamos atalhos frágeis. Cada projeto segue um fluxo testado de 10 fases, da imersão no problema à escala sustentável em produção.
          </p>
        </div>

        {/* Imagem de Workshop de Design Sprint & Wireframing */}
        <div style={{
          position: "relative",
          borderRadius: "8px",
          overflow: "hidden",
          border: "1px solid var(--border)",
          marginBottom: "64px",
          boxShadow: "0 20px 60px rgba(0,0,0,0.4)"
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
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          {METHOD.map((m, idx) => (
            <div key={idx} id={m.step.toLowerCase()} style={{
              background: "var(--grafite)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "28px 32px",
              display: "grid",
              gridTemplateColumns: "180px 1fr",
              gap: "32px",
              alignItems: "center"
            }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", marginBottom: "4px" }}>
                  {idx < 9 ? `0${idx + 1}` : idx + 1}. FASE
                </div>
                <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--text-primary)" }}>
                  {m.step}
                </h3>
              </div>

              <div>
                <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {m.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Box de CTA de Conversão no Método */}
        <div style={{
          marginTop: "64px",
          background: "var(--ardosia)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "40px",
          textAlign: "center"
        }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", marginBottom: "12px" }}>
            Pronto para aplicar este método ao seu projeto?
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "15px", marginBottom: "24px", maxWidth: "560px", margin: "0 auto 24px" }}>
            Agende uma sessão técnica inicial para avaliarmos o momento da sua plataforma e desenharmos o roadmap adequado.
          </p>
          <Link href="/contato" style={{
            display: "inline-block",
            background: "var(--sinal)",
            color: "var(--obsidiana)",
            fontFamily: "var(--font-mono)",
            fontSize: "13px",
            fontWeight: 600,
            padding: "12px 24px",
            borderRadius: "4px",
            textTransform: "uppercase"
          }}>
            Iniciar Avaliação Técnica →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
