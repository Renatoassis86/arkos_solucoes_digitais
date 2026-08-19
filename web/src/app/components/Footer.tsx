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
        gridTemplateColumns: "2fr 1fr 1fr 1.2fr",
        gap: "48px",
        marginBottom: "48px"
      }}>
        {/* Coluna Institucional com Logo Vetorial Oficial */}
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
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: 1.6, maxWidth: "340px", marginBottom: "16px" }}>
            A infraestrutura de inteligência e soluções digitais. Engenharia de software, plataformas sob medida e inteligência de dados orientadas a conversão real.
          </p>
          <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
            Belo Horizonte, MG • Brasil
          </div>
        </div>

        {/* Coluna Soluções */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
            Soluções
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
            <li><Link href="/solucoes#experience">Digital Experience</Link></li>
            <li><Link href="/solucoes#growth">Growth Technology</Link></li>
            <li><Link href="/solucoes#platforms">Software & Platforms</Link></li>
            <li><Link href="/solucoes#data">Data & Intelligence</Link></li>
            <li><Link href="/solucoes#ai">AI & Automation</Link></li>
            <li><Link href="/solucoes#advisory">Technology Advisory</Link></li>
          </ul>
        </div>

        {/* Coluna Estrutura & Método */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
            Estrutura
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
            <li><Link href="/metodo">O Método em 10 Fases</Link></li>
            <li><Link href="/sobre">Sobre a ARKOS</Link></li>
            <li><Link href="/sobre#principles">Princípios Operacionais</Link></li>
            <li><Link href="/briefing">Briefing Modular do Método</Link></li>
          </ul>
        </div>

        {/* Coluna Canais de Contato Reais */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "16px" }}>
            Canais de Contato
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", fontSize: "13px", color: "var(--text-secondary)", marginBottom: "20px" }}>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)" }}>✉</span>
              <a href="mailto:contato@arkosintelligence.com" style={{ color: "var(--text-primary)", textDecoration: "underline", textUnderlineOffset: "4px" }}>
                contato@arkosintelligence.com
              </a>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)" }}>🌐</span>
              <span>arkosintelligence.com</span>
            </li>
            <li style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)" }}>↗</span>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}>LinkedIn</a>
              <span>•</span>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ color: "var(--text-secondary)" }}>Instagram</a>
            </li>
          </ul>

          <Link href="/briefing" style={{
            display: "inline-block",
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            color: "var(--obsidiana)",
            background: "var(--sinal)",
            padding: "10px 16px",
            borderRadius: "4px",
            textTransform: "uppercase"
          }}>
            Preencher Briefing do Projeto →
          </Link>
        </div>
      </div>

      {/* Linha Final Limpa */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        paddingTop: "24px",
        borderTop: "1px solid var(--border)",
        fontSize: "12px",
        fontFamily: "var(--font-mono)",
        color: "var(--text-secondary)"
      }}>
        © {new Date().getFullYear()} ARKOS Soluções Digitais & Intelligence. Todos os direitos reservados.
      </div>
    </footer>
  );
}
