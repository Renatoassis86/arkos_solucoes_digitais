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
          padding: "72px 24px 56px",
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
              marginBottom: "20px"
            }}>
              <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: "var(--sinal)" }}></span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-primary)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Criação de Sites e Soluções Digitais
              </span>
            </div>

            <h1 style={{
              fontFamily: "var(--font-display)",
              fontSize: "42px",
              lineHeight: 1.18,
              fontWeight: 600,
              color: "var(--text-primary)",
              letterSpacing: "-0.02em",
              marginBottom: "20px"
            }}>
              Criamos sites rápidos, modernos e funcionais para atrair clientes e impulsionar o seu negócio.
            </h1>

            <p style={{
              fontSize: "16px",
              lineHeight: 1.6,
              color: "var(--text-secondary)",
              marginBottom: "28px",
              maxWidth: "540px"
            }}>
              Desenvolvemos desde landing pages para captação de clientes até sites institucionais completos e plataformas sob medida. Unimos design profissional e velocidade para gerar resultados reais.
            </p>

            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <Link href="/solucoes" style={{
                background: "var(--sinal)",
                color: "var(--obsidiana)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                fontWeight: 600,
                padding: "12px 22px",
                borderRadius: "4px",
                textTransform: "uppercase",
                letterSpacing: "0.05em"
              }}>
                Ver Nossas Soluções
              </Link>
              <Link href="/briefing" style={{
                color: "var(--text-primary)",
                border: "1px solid var(--border)",
                background: "var(--grafite)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                padding: "12px 20px",
                borderRadius: "4px"
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
            boxShadow: "0 20px 50px rgba(0,0,0,0.5)"
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
          padding: "40px 24px"
        }}>
          <div style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "28px"
          }}>
            {PRINCIPLES.map((p, idx) => (
              <div key={idx} style={{ paddingRight: "16px", borderRight: idx < 3 ? "1px solid var(--border)" : "none" }}>
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
          padding: "80px 24px 56px"
        }}>
          <div style={{ marginBottom: "32px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Nossos Serviços
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "34px", color: "var(--text-primary)", marginTop: "6px", letterSpacing: "-0.02em" }}>
              Soluções desenhadas para a sua necessidade
            </h2>
          </div>

          <ServicesExplorer />
        </section>

        {/* DOBRA 4: PLATAFORMAS E DADOS */}
        <section style={{
          maxWidth: "1200px",
          margin: "48px auto",
          padding: "40px 24px",
          background: "var(--grafite)",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "40px",
          alignItems: "center"
        }}>
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Acompanhamento de Resultados
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "14px" }}>
              Tenha clareza sobre os acessos e contatos gerados pelo seu site
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
              Configuramos métricas transparentes para você saber exatamente quantas pessoas visitaram sua página, quantos cliques o botão do WhatsApp recebeu e quais produtos despertaram maior interesse.
            </p>
            <div style={{ display: "flex", gap: "20px", fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)" }}>
              <div>
                <span style={{ color: "var(--sinal)", fontWeight: 600 }}>•</span> Relatórios simples de entender
              </div>
              <div>
                <span style={{ color: "var(--sinal)", fontWeight: 600 }}>•</span> Contagem real de conversões
              </div>
            </div>
          </div>

          <div style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <Image
              src="/assets/data_dashboard.jpg"
              alt="Painel analítico real de conversão e visitas"
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
          padding: "56px 24px"
        }}>
          <div style={{ marginBottom: "32px" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
              Passo a Passo
            </span>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "34px", color: "var(--text-primary)", marginTop: "6px", letterSpacing: "-0.02em" }}>
              Como trabalhamos do início ao fim
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "6px" }}>
              10 fases organizadas para garantir que seu projeto seja entregue com qualidade, no prazo e sem surpresas.
            </p>
          </div>

          <MethodStepper />
        </section>

        {/* DOBRA 6: CONSULTORIA E APOIO */}
        <section style={{
          maxWidth: "1200px",
          margin: "48px auto 0",
          padding: "40px 24px",
          background: "var(--grafite)",
          borderRadius: "8px",
          border: "1px solid var(--border)",
          display: "grid",
          gridTemplateColumns: "1fr 1.1fr",
          gap: "40px",
          alignItems: "center"
        }}>
          <div style={{ borderRadius: "6px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <Image
              src="/assets/advisory_alignment.jpg"
              alt="Reunião de alinhamento técnico e projeto"
              width={600}
              height={360}
              style={{ width: "100%", height: "auto", display: "block", objectFit: "cover" }}
            />
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
              Apoio Técnico
            </div>
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", lineHeight: 1.25, marginBottom: "14px" }}>
              Parceria contínua para ajudar sua empresa a crescer no digital
            </h2>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "20px" }}>
              Apoiamos sua equipe na definição das melhores ferramentas, na manutenção das páginas e na garantia de que cada investimento traga retorno para o seu negócio.
            </p>
            <Link href="/briefing" style={{
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
              Iniciar Diagnóstico do Seu Projeto →
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
