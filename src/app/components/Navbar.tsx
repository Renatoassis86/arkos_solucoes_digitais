"use client";

import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen((prev) => !prev);
  const closeMenu = () => setIsOpen(false);

  return (
    <header style={{
      position: "sticky",
      top: 0,
      zIndex: 100,
      backdropFilter: "blur(16px)",
      WebkitBackdropFilter: "blur(16px)",
      background: "rgba(10, 12, 15, 0.92)",
      borderBottom: "1px solid var(--border)",
      transition: "all 0.2s ease",
      width: "100%"
    }}>
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
      }}>
        {/* Brand Logo com Símbolo Oficial SVG */}
        <Link href="/" onClick={closeMenu} style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none"
        }}>
          <svg width="22" height="24" viewBox="0 0 200 220" fill="none" style={{ flexShrink: 0 }}>
            <line x1="100" y1="20" x2="30" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
            <line x1="100" y1="20" x2="170" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
            <line x1="52" y1="130" x2="148" y2="130" stroke="#C8F542" strokeWidth="12" strokeLinecap="round"/>
            <circle cx="100" cy="20" r="10" fill="#C8F542"/>
          </svg>
          <span style={{
            fontFamily: "var(--font-display)",
            fontSize: "20px",
            fontWeight: "bold",
            color: "var(--text-primary)",
            letterSpacing: "-0.03em"
          }}>
            ARKOS
          </span>
          <span style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--sinal)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            borderLeft: "1px solid var(--border)",
            paddingLeft: "8px",
            display: "inline-block"
          }}>
            Soluções Digitais
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="desktop-nav" style={{
          display: "flex",
          alignItems: "center",
          gap: "24px"
        }}>
          <Link href="/solucoes" style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            transition: "color 0.2s",
            fontWeight: 500
          }}>
            Soluções
          </Link>
          <Link href="/metodo" style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            transition: "color 0.2s",
            fontWeight: 500
          }}>
            Método
          </Link>
          <Link href="/sobre" style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            transition: "color 0.2s",
            fontWeight: 500
          }}>
            Sobre
          </Link>
          <Link href="/contato" style={{
            fontSize: "13px",
            color: "var(--text-secondary)",
            transition: "color 0.2s",
            fontWeight: 500
          }}>
            Contato
          </Link>
          <Link href="/briefing" style={{
            fontSize: "12px",
            fontFamily: "var(--font-mono)",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: "var(--obsidiana)",
            background: "var(--sinal)",
            padding: "9px 16px",
            borderRadius: "4px",
            transition: "background 0.2s",
            display: "inline-flex",
            alignItems: "center",
            gap: "6px"
          }}>
            Briefing do Método →
          </Link>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          type="button"
          onClick={toggleMenu}
          aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
          className="mobile-hamburger"
          style={{
            background: "transparent",
            border: "1px solid var(--border)",
            color: "var(--text-primary)",
            padding: "8px 12px",
            borderRadius: "4px",
            cursor: "pointer",
            display: "none",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-mono)",
            fontSize: "16px"
          }}
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isOpen && (
        <div style={{
          background: "rgba(17, 19, 24, 0.98)",
          borderBottom: "1px solid var(--border)",
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          <Link
            href="/solucoes"
            onClick={closeMenu}
            style={{
              fontSize: "15px",
              color: "var(--text-primary)",
              padding: "10px 0",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Soluções Digitais</span>
            <span style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>→</span>
          </Link>

          <Link
            href="/metodo"
            onClick={closeMenu}
            style={{
              fontSize: "15px",
              color: "var(--text-primary)",
              padding: "10px 0",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>O Método em 10 Fases</span>
            <span style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>→</span>
          </Link>

          <Link
            href="/sobre"
            onClick={closeMenu}
            style={{
              fontSize: "15px",
              color: "var(--text-primary)",
              padding: "10px 0",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Sobre e Princípios</span>
            <span style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>→</span>
          </Link>

          <Link
            href="/contato"
            onClick={closeMenu}
            style={{
              fontSize: "15px",
              color: "var(--text-primary)",
              padding: "10px 0",
              borderBottom: "1px solid var(--border)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <span>Fale Conosco</span>
            <span style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "12px" }}>→</span>
          </Link>

          <Link
            href="/briefing"
            onClick={closeMenu}
            style={{
              fontSize: "13px",
              fontFamily: "var(--font-mono)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
              color: "var(--obsidiana)",
              background: "var(--sinal)",
              padding: "14px",
              borderRadius: "4px",
              textAlign: "center",
              marginTop: "8px"
            }}
          >
            Iniciar Briefing do Método →
          </Link>
        </div>
      )}

    </header>
  );
}
