import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      background: "rgba(10, 12, 15, 0.85)",
      borderBottom: "1px solid var(--border)",
      transition: "all 0.2s ease"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "14px 24px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Brand Logo com Símbolo Oficial SVG */}
        <Link href="/" style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          textDecoration: "none"
        }}>
          <svg width="22" height="24" viewBox="0 0 200 220" fill="none">
            <line x1="100" y1="20" x2="30" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
            <line x1="100" y1="20" x2="170" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
            <line x1="52" y1="130" x2="148" y2="130" stroke="#C8F542" strokeWidth="12" strokeLinecap="round"/>
            <circle cx="100" cy="20" r="10" fill="#C8F542"/>
          </svg>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: "bold",
            color: "var(--text-primary)",
            letterSpacing: "-0.03em"
          }}>
            ARKOS
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            color: "var(--sinal)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderLeft: "1px solid var(--border)",
            paddingLeft: "10px"
          }}>
            Soluções Digitais
          </span>
        </Link>

        {/* Navigation Links */}
        <nav style={{
          display: "flex",
          alignItems: "center",
          gap: "28px"
        }}>
          <Link href="/solucoes" style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            transition: "color 0.2s",
            fontWeight: 500
          }}>
            Soluções
          </Link>
          <Link href="/metodo" style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            transition: "color 0.2s",
            fontWeight: 500
          }}>
            Método
          </Link>
          <Link href="/sobre" style={{
            fontSize: "14px",
            color: "var(--text-secondary)",
            transition: "color 0.2s",
            fontWeight: 500
          }}>
            Sobre e Princípios
          </Link>
          <Link href="/briefing" style={{
            fontSize: "13px",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--obsidiana)",
            background: "var(--sinal)",
            padding: "10px 18px",
            borderRadius: "4px",
            transition: "background 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}>
            Iniciar Briefing do Método →
          </Link>
        </nav>
      </div>
    </header>
  );
}
