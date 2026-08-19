import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ServicesExplorer from "./components/ServicesExplorer";
import MethodStepper from "./components/MethodStepper";
import { PRINCIPLES } from "./data";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />

      <main style={{ flex: 1 }}>
        {/* DOBRA 1: HERO SECTION */}
        <section style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "80px 24px 64px",
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: "48px",
          alignItems: "center"
        }}>
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--ardosia)",
              border: "1px solid var(--border)",
              padding: "6px 12px",
              borderRadius: "4px",
              marginBottom: "24px"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--sinal)" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Engenharia de Software & Experiência Digital
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "44px",
              lineHeight: 1.15,
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "20px"
            }}>
              Desenhamos e construímos produtos digitais orientados a dados, clareza técnica e conversão real.
            </h1>

            <p style={{
              fontSize: "17px",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "32px",
              maxWidth: "540px"
            }}>
              Substituímos o achismo estético por rigor de engenharia. Criamos sites de alta performance, plataformas sob medida e inteligência de dados desenhadas para acelerar a operação do seu negócio.
            </p>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Link href="/solucoes" style={{
                background: "var(--sinal)",
                color: "var(--obsidiana)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                fontWeight: 600,
                padding: "14px 24px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                transition: "opacity 0.2s"
              }}>
                Ver Nossas Soluções
              </Link>
              <Link href="/metodo" style={{
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                background: "var(--grafite)",
                fontFamily: "var(--font-mono)",
                fontSize: "13px",
                padding: "14px 20px",
                borderRadius: "4px",
                transition: "border-color 0.2s"
              }}>
                Entenda Nosso Método →
              </Link>
            </div>
          </div>

          {/* Hero Image Authentic Workspace */}
          <div style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "0 24px 64px rgba(0,0,0,0.5)"
          }}>
            <Image
              src="/assets/hero_workspace.jpg"
              alt="Mesa de trabalho de design de produto e arquitetura com iPad e wireframes reais"
              width={640}
              height={400}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              priority
            />
          </div>
        </section>

        {/* DOBRA 2: PRINCÍPIOS OPERACIONAIS */}
        <section style={{
          borderTop: "1px solid var(--border)",
          borderBottom: "1px solid var(--border)",
          background: "var(--grafite)",
          padding: "48px 24px"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "32px"
          }}>
            {PRINCIPLES.map((p, idx) => (
              <div key={idx} style={{ paddingRight: "16px", borderRight: idx < 3 ? "1px solid var(--border)" : "none" }}>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", marginBottom: "8px" }}>
                  0{idx + 1}. PRINCÍPIO
                </div>
                <h3 style={{ fontSize: "16px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "8px" }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* DOBRA 3: CATÁLOGO DE SOLUÇÕES COM FILTRO */}
        <section style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "96px 24px 64px"
        }}>
          <div style={{ marginBottom: "40px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Capacidades Modulares
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "var(--text-primary)", marginTop: "8px", letterSpacing: "-0.02em" }}>
              Soluções desenhadas para a sua operação.
            </h2>
          </div>

          <ServicesExplorer />
        </section>

        {/* DOBRA 4: PLATAFORMAS & DADOS COM IMAGEM ANALÍTICA */}
        <section style={{
          maxWidth: "1200px",
          margin: "64px auto",
          padding: "48px 24px",
          background: "var(--grafite)",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "48px",
          alignItems: "center"
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              Decisão Factual
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "32px", color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "16px" }}>
              Infraestrutura de dados para dar visibilidade total ao seu negócio.
            </h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
              Não entregamos apenas telas bonitas; estruturamos pipelines que medem cada interação, taxa de conversão e comportamento de usuário. Sua empresa ganha clareza factual para tomar decisões estratégicas com segurança.
            </p>
            <div style={{ display: "flex", gap: "24px", fontFamily: "var(--font-mono)", fontSize: "13px", color: "var(--text-primary)" }}>
              <div>
                <span style={{ color: "var(--sinal)", fontWeight: 600 }}>•</span> Telemetria desde o dia 1
              </div>
              <div>
                <span style={{ color: "var(--sinal)", fontWeight: 600 }}>•</span> Painéis sem ruído
              </div>
            </div>
          </div>

          <div style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <Image
              src="/assets/data_dashboard.jpg"
              alt="Painel analítico real de conversão e métricas de engenharia"
              width={600}
              height={360}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            />
          </div>
        </section>

        {/* DOBRA 5: MÉTODO EM 10 ETAPAS */}
        <section style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 24px"
        }}>
          <div style={{ marginBottom: "40px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Processo de Ponta a Ponta
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "36px", color: "var(--text-primary)", marginTop: "8px", letterSpacing: "-0.02em" }}>
              O Método ARKOS de Entrega
            </h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", marginTop: "8px" }}>
              10 fases estruturadas para transformar problemas de negócio em software e interfaces de alto impacto.
            </p>
          </div>

          <MethodStepper />
        </section>

        {/* DOBRA 6: ADVISORY & CONSULTORIA TÉCNICA */}
        <section style={{
          maxWidth: "1200px",
          margin: "64px auto 0",
          padding: "48px 24px",
          background: "var(--grafite)",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "48px",
          alignItems: "center"
        }}>
          <div style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <Image
              src="/assets/advisory_alignment.jpg"
              alt="Revisão de arquitetura técnica e produto em estúdio de design"
              width={600}
              height={360}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            />
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
              Technology Advisory
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "30px", color: "var(--text-primary)", lineHeight: 1.2, marginBottom: "16px" }}>
              Parceria técnica contínua para apoiar a liderança da sua empresa.
            </h2>
            <p style={{ fontSize: "15px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "24px" }}>
              Apoiamos sua equipe na priorização de escopo, na escolha de arquiteturas adequadas e na garantia de que cada linha de código entregue gere valor real de negócio.
            </p>
            <Link href="/contato" style={{
              display: "inline-block",
              background: "var(--sinal)",
              color: "var(--obsidiana)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              fontWeight: 600,
              padding: "10px 18px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              Agendar Conversa Técnica →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
