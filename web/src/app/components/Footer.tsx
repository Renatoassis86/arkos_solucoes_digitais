import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      background: "var(--grafite)",
      padding: "64px 24px 32px",
      marginTop: "96px"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "1.8fr 1fr 1.2fr 1.4fr",
        gap: "40px",
        marginBottom: "48px"
      }}>
        {/* Coluna 1: Institucional com Logo Oficial */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <svg width="24" height="26" viewBox="0 0 200 220" fill="none">
              <line x1="100" y1="20" x2="30" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="100" y1="20" x2="170" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="52" y1="130" x2="148" y2="130" stroke="#C8F542" strokeWidth="12" strokeLinecap="round"/>
              <circle cx="100" cy="20" r="10" fill="#C8F542"/>
            </svg>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "22px", fontWeight: "bold", letterSpacing: "-0.02em" }}>
              ARKOS
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em" }}>
              SOLUÇÕES DIGITAIS
            </span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", marginBottom: "12px" }}>
            Data · Intelligence · Decision
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.6, maxWidth: "300px", marginBottom: "16px" }}>
            A infraestrutura de inteligência e soluções digitais. Criação de sites de alta conversão, plataformas web sob medida e tecnologia orientada a resultados.
          </p>
        </div>

        {/* Coluna 2: Soluções */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px", borderBottom: "2px solid var(--sinal)", paddingBottom: "4px", display: "inline-block" }}>
            Soluções
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
            <li><Link href="/solucoes">Sites e Páginas</Link></li>
            <li><Link href="/solucoes">Tecnologia para Vendas</Link></li>
            <li><Link href="/solucoes">Sistemas e Plataformas</Link></li>
            <li><Link href="/solucoes">Organização de Dados</Link></li>
            <li><Link href="/solucoes">Automação de Processos</Link></li>
            <li><Link href="/solucoes">Consultoria e Apoio</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Fale Conosco Real */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px", borderBottom: "2px solid var(--sinal)", paddingBottom: "4px", display: "inline-block" }}>
            Fale Conosco
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-primary)" }}>
            <a href="mailto:renato@arkosintelligence.com" style={{ color: "var(--text-primary)", textDecoration: "none" }}>
              renato@arkosintelligence.com
            </a>
            <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              +55 (83) 98195-7737
            </div>
            <div style={{ marginTop: "6px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "3px", height: "16px", background: "var(--sinal)", display: "inline-block" }}></span>
              <a href="https://wa.me/5583981957737" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sinal)", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>
                Falar com Consultor
              </a>
            </div>
          </div>
        </div>

        {/* Coluna 4: Localização Oficial Real */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px", borderBottom: "2px solid var(--sinal)", paddingBottom: "4px", display: "inline-block" }}>
            Localização
          </h4>
          <div style={{ fontSize: "13px", color: "var(--text-secondary)", lineHeight: 1.6 }}>
            <div>Avenida João Machado, 849, Sala 801</div>
            <div>Centro, João Pessoa - PB</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", marginTop: "4px" }}>CEP: 58013-522</div>
          </div>

          <div style={{ marginTop: "16px" }}>
            <Link href="/briefing" style={{
              display: "inline-block",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              color: "var(--obsidiana)",
              background: "var(--sinal)",
              padding: "8px 14px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              Preencher Briefing →
            </Link>
          </div>
        </div>
      </div>

      {/* Faixa de Redes Sociais e Copyright Oficial */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "24px",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        fontSize: "12px",
        color: "var(--text-secondary)"
      }}>
        <div>
          <span>Encontre a </span>
          <strong style={{ color: "var(--sinal)" }}>Arkos Intelligence</strong>
          <span> nas redes sociais</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            border: "1px solid rgba(200, 245, 66, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--sinal)",
            fontSize: "12px",
            textDecoration: "none"
          }}>
            IG
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            border: "1px solid rgba(200, 245, 66, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--sinal)",
            fontSize: "12px",
            textDecoration: "none"
          }}>
            YT
          </a>
          <a href="mailto:renato@arkosintelligence.com" style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            border: "1px solid rgba(200, 245, 66, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--sinal)",
            fontSize: "12px",
            textDecoration: "none"
          }}>
            ✉
          </a>
          <a href="https://wa.me/5583981957737" target="_blank" rel="noopener noreferrer" style={{
            width: "32px",
            height: "32px",
            borderRadius: "6px",
            border: "1px solid rgba(200, 245, 66, 0.3)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "var(--sinal)",
            fontSize: "12px",
            textDecoration: "none"
          }}>
            ✆
          </a>
        </div>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "12px auto 0",
        textAlign: "center",
        fontSize: "11px",
        fontFamily: "var(--font-mono)",
        color: "var(--text-secondary)"
      }}>
        © {new Date().getFullYear()} ARKOS Soluções Digitais e Intelligence. Todos os direitos reservados.
      </div>
    </footer>
  );
}
