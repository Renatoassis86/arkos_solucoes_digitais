import Image from "next/image";
import Link from "next/link";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ServicesExplorer from "./components/ServicesExplorer";
import MethodStepper from "./components/MethodStepper";
import { PRINCIPLES } from "./data";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <Navbar />

      <main style={{ flex: 1, width: "100%" }}>
        {/* DOBRA 1: HERO SECTION */}
        <section className="hero-section">
          <div>
            <div style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--ardosia)",
              border: "1px solid var(--border)",
              padding: "6px 12px",
              borderRadius: "4px",
              marginBottom: "18px"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--sinal)", flexShrink: 0 }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Criação de Sites e Soluções Digitais
              </span>
            </div>

            <h1 className="hero-title">
              Criamos sites rápidos, modernos e funcionais para atrair clientes e impulsionar o seu negócio.
            </h1>

            <p style={{
              fontSize: "15px",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "24px",
              maxWidth: "540px"
            }}>
              Desenvolvemos desde landing pages para captação de clientes até sites institucionais completos e plataformas sob medida. Unimos design profissional e velocidade para gerar resultados reais.
            </p>

            <div className="hero-actions">
              <Link href="/solucoes" style={{
                background: "var(--sinal)",
                color: "var(--obsidiana)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 600,
                padding: "12px 20px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                textAlign: "center"
              }}>
                Ver Nossas Soluções
              </Link>
              <Link href="/briefing" style={{
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                background: "var(--grafite)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                padding: "12px 18px",
                borderRadius: "4px",
                textAlign: "center"
              }}>
                Preencher Briefing do Projeto →
              </Link>
            </div>
          </div>

          {/* Hero Image Authentic Workspace */}
          <div style={{
            position: "relative",
            borderRadius: "8px",
            overflow: "hidden",
            border: "1px solid var(--border)",
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)",
            width: "100%"
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
          padding: "36px 20px"
        }}>
          <div className="principles-grid">
            {PRINCIPLES.map((p, idx) => (
              <div key={idx} className="principle-item">
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", marginBottom: "6px" }}>
                  0{idx + 1}. COMPROMISSO
                </div>
                <h3 style={{ fontSize: "15px", fontWeight: 600, color: "var(--text-primary)", marginBottom: "6px" }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.5 }}>
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
          padding: "64px 20px 48px",
          width: "100%"
        }}>
          <div style={{ marginBottom: "28px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Nossos Serviços
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", marginTop: "6px", letterSpacing: "-0.02em" }}>
              Catálogo de Soluções Digitais
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px", maxWidth: "600px" }}>
              Selecione o segmento abaixo para explorar como ajudamos sua empresa a crescer na internet.
            </p>
          </div>

          <ServicesExplorer />
        </section>

        {/* DOBRA 4: NOSSA METODOLOGIA COM IMAGEM DE ALINHAMENTO */}
        <section style={{
          borderTop: "1px solid var(--border)",
          background: "var(--obsidiana)",
          padding: "64px 20px"
        }}>
          <div className="advisory-grid">
            <div style={{
              position: "relative",
              borderRadius: "8px",
              overflow: "hidden",
              border: "1px solid var(--border)"
            }}>
              <Image
                src="/assets/advisory_alignment.jpg"
                alt="Reunião de alinhamento estratégico e briefing de projeto"
                width={600}
                height={380}
                style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
              />
            </div>

            <div>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Como Trabalhamos
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", margin: "8px 0 14px", letterSpacing: "-0.02em" }}>
                Diagnóstico profundo antes de qualquer linha de código
              </h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "16px" }}>
                Não usamos modelos genéricos nem soluções pré-fabricadas. Entendemos quem é o seu cliente ideal, como ele decide a compra e desenhamos a estrutura perfeita para transformá-lo em cliente.
              </p>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "14px", color: "var(--text-primary)", marginBottom: "24px" }}>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--sinal)", fontWeight: "bold" }}>✓</span>
                  <span>Mapeamento de público-alvo e modelo de negócio</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--sinal)", fontWeight: "bold" }}>✓</span>
                  <span>Wireframes e protótipos navegáveis antes da construção</span>
                </li>
                <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <span style={{ color: "var(--sinal)", fontWeight: "bold" }}>✓</span>
                  <span>Otimização para celulares e velocidade de carregamento instantânea</span>
                </li>
              </ul>
              <Link href="/metodo" style={{
                color: "var(--sinal)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Conheça as 10 Fases do Método ARKOS →
              </Link>
            </div>
          </div>
        </section>

        {/* DOBRA 5: ESTEIRA COMPLETA EM 10 PASSOS */}
        <section style={{
          borderTop: "1px solid var(--border)",
          background: "var(--grafite)",
          padding: "64px 20px"
        }}>
          <div style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}>
            <div style={{ marginBottom: "28px" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Processo Estruturado
              </span>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", marginTop: "6px", letterSpacing: "-0.02em" }}>
                O Método ARKOS em 10 Fases
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "6px", maxWidth: "640px" }}>
                Da primeira conversa até a publicação e acompanhamento do site: veja como garantimos previsibilidade, clareza e qualidade.
              </p>
            </div>

            <MethodStepper />
          </div>
        </section>

        {/* DOBRA 6: COMPARATIVO */}
        <section style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "64px 20px",
          width: "100%"
        }}>
          <div style={{ textAlign: "center", marginBottom: "36px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Diferenciais Reais
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", marginTop: "6px", letterSpacing: "-0.02em" }}>
              Por que escolher a ARKOS Soluções Digitais?
            </h2>
          </div>

          <div className="compare-grid">
            <div style={{
              background: "var(--grafite)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              padding: "24px"
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--nevoa)", marginBottom: "10px" }}>
                COMO O MERCADO COMUM FAZ:
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "var(--text-secondary)" }}>
                <li>✕ Criação baseada em templates prontos e lentos</li>
                <li>✕ Foco apenas na estética sem pensar na conversão de clientes</li>
                <li>✕ Falta de clareza nos prazos e nas etapas de entrega</li>
                <li>✕ Sem integração com ferramentas de automação e dados</li>
              </ul>
            </div>

            <div style={{
              background: "var(--ardosia)",
              border: "1px solid var(--sinal)",
              borderRadius: "8px",
              padding: "24px"
            }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", fontWeight: 600, marginBottom: "10px" }}>
                COMO A ARKOS TRABALHA:
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "14px", color: "var(--text-primary)" }}>
                <li>✓ Código sob medida, ultra-rápido e otimizado para celulares</li>
                <li>✓ Estrutura desenhada para fazer o cliente entrar em contato</li>
                <li>✓ Método formal com 10 etapas claras e previsíveis</li>
                <li>✓ Integração direta com WhatsApp, formulários e banco de dados</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DOBRA 7: CTA FINAL */}
        <section style={{
          borderTop: "1px solid var(--border)",
          background: "var(--grafite)",
          padding: "56px 20px"
        }}>
          <div className="cta-container">
            <div>
              <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--text-primary)", marginBottom: "8px" }}>
                Pronto para transformar a presença digital da sua empresa?
              </h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", maxWidth: "560px" }}>
                Preencha nosso questionário rápido para receber uma proposta personalizada de acordo com a necessidade do seu negócio.
              </p>
            </div>
            <div className="cta-actions">
              <Link href="/briefing" style={{
                background: "var(--sinal)",
                color: "var(--obsidiana)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 600,
                padding: "14px 22px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                textAlign: "center"
              }}>
                Preencher Briefing do Projeto →
              </Link>
              <Link href="/contato" style={{
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                background: "var(--ardosia)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                padding: "14px 20px",
                borderRadius: "4px",
                textAlign: "center"
              }}>
                Fale Conosco
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

    </div>
  );
}
