import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{
      borderTop: "1px solid var(--border)",
      background: "var(--grafite)",
      padding: "56px 20px 32px",
      marginTop: "72px",
      width: "100%",
      overflowX: "hidden"
    }}>
      {/* Grade Principal do Rodapé com Suporte a Mobile */}
      <div className="footer-main-grid">
        {/* Coluna 1: Institucional com Logo Oficial */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "14px" }}>
            <svg width="24" height="26" viewBox="0 0 200 220" fill="none" style={{ flexShrink: 0 }}>
              <line x1="100" y1="20" x2="30" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="100" y1="20" x2="170" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="52" y1="130" x2="148" y2="130" stroke="#C8F542" strokeWidth="12" strokeLinecap="round"/>
              <circle cx="100" cy="20" r="10" fill="#C8F542"/>
            </svg>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "bold", letterSpacing: "-0.02em" }}>
              ARKOS
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--sinal)", letterSpacing: "0.08em" }}>
              SOLUÇÕES DIGITAIS
            </span>
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--text-primary)", marginBottom: "10px" }}>
            Data · Intelligence · Decision
          </div>
          <p style={{ color: "var(--text-secondary)", fontSize: "13px", lineHeight: 1.6, maxWidth: "320px", marginBottom: "16px" }}>
            A infraestrutura de inteligência e soluções digitais. Criação de sites de alta conversão, plataformas web sob medida e tecnologia orientada a resultados.
          </p>
        </div>

        {/* Coluna 2: Soluções */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px", borderBottom: "2px solid var(--sinal)", paddingBottom: "4px", display: "inline-block" }}>
            Soluções
          </h4>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-secondary)" }}>
            <li><Link href="/solucoes" style={{ display: "inline-block", padding: "2px 0" }}>Sites e Páginas</Link></li>
            <li><Link href="/solucoes" style={{ display: "inline-block", padding: "2px 0" }}>Tecnologia para Vendas</Link></li>
            <li><Link href="/solucoes" style={{ display: "inline-block", padding: "2px 0" }}>Sistemas e Plataformas</Link></li>
            <li><Link href="/solucoes" style={{ display: "inline-block", padding: "2px 0" }}>Organização de Dados</Link></li>
            <li><Link href="/solucoes" style={{ display: "inline-block", padding: "2px 0" }}>Automação de Processos</Link></li>
            <li><Link href="/solucoes" style={{ display: "inline-block", padding: "2px 0" }}>Consultoria e Apoio</Link></li>
          </ul>
        </div>

        {/* Coluna 3: Fale Conosco Real */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px", borderBottom: "2px solid var(--sinal)", paddingBottom: "4px", display: "inline-block" }}>
            Fale Conosco
          </h4>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "var(--text-primary)" }}>
            <a href="mailto:renato@arkosintelligence.com" style={{ color: "var(--text-primary)", textDecoration: "none", wordBreak: "break-all" }}>
              renato@arkosintelligence.com
            </a>
            <div style={{ fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              +55 (83) 98195-7737
            </div>
            <div style={{ marginTop: "4px", display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ width: "3px", height: "16px", background: "var(--sinal)", display: "inline-block" }}></span>
              <a href="https://wa.me/5583981957737" target="_blank" rel="noopener noreferrer" style={{ color: "var(--sinal)", fontWeight: 600, fontSize: "13px", textDecoration: "none" }}>
                Falar com Consultor no WhatsApp →
              </a>
            </div>
          </div>
        </div>

        {/* Coluna 4: Localização Oficial Real */}
        <div>
          <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "14px", borderBottom: "2px solid var(--sinal)", paddingBottom: "4px", display: "inline-block" }}>
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
              padding: "10px 16px",
              borderRadius: "4px",
              textTransform: "uppercase"
            }}>
              Preencher Briefing →
            </Link>
          </div>
        </div>
      </div>

      {/* Faixa de Redes Sociais com Ícones Vetoriais SVG Oficiais */}
      <div className="footer-social-bar">
        <div>
          <span>Encontre a </span>
          <strong style={{ color: "var(--sinal)" }}>ARKOS Soluções Digitais</strong>
          <span> nas redes sociais</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/renato-assis-929587b6/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn - Renato Assis"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              border: "1px solid rgba(200, 245, 66, 0.3)",
              background: "rgba(200, 245, 66, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--sinal)",
              transition: "all 0.2s ease"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              border: "1px solid rgba(200, 245, 66, 0.3)",
              background: "rgba(200, 245, 66, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--sinal)",
              transition: "all 0.2s ease"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
          </a>

          {/* YouTube */}
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              border: "1px solid rgba(200, 245, 66, 0.3)",
              background: "rgba(200, 245, 66, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--sinal)",
              transition: "all 0.2s ease"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </a>

          {/* E-mail */}
          <a
            href="mailto:renato@arkosintelligence.com"
            title="Enviar E-mail"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              border: "1px solid rgba(200, 245, 66, 0.3)",
              background: "rgba(200, 245, 66, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--sinal)",
              transition: "all 0.2s ease"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
              <polyline points="22,6 12,13 2,6"/>
            </svg>
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/5583981957737"
            target="_blank"
            rel="noopener noreferrer"
            title="WhatsApp: +55 (83) 98195-7737"
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "6px",
              border: "1px solid rgba(200, 245, 66, 0.3)",
              background: "rgba(200, 245, 66, 0.05)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--sinal)",
              transition: "all 0.2s ease"
            }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.38-.44.13-.15.17-.25.25-.42.08-.17.04-.31-.02-.44s-.56-1.35-.77-1.85c-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.07-.12-.23-.19-.48-.31z"/>
            </svg>
          </a>
        </div>
      </div>

      <div style={{
        maxWidth: "1200px",
        margin: "16px auto 0",
        textAlign: "center",
        fontSize: "11px",
        fontFamily: "var(--font-mono)",
        color: "var(--text-secondary)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "16px",
        flexWrap: "wrap"
      }}>
        <span>© {new Date().getFullYear()} ARKOS Soluções Digitais. Todos os direitos reservados.</span>
        <span>·</span>
        <Link href="/admin/login" style={{ color: "var(--text-secondary)", textDecoration: "underline" }}>
          Painel do Gestor
        </Link>
      </div>

    </footer>
  );
}
