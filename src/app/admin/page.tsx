"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Briefing {
  id: string;
  created_at: string;
  nome_solicitante: string;
  cargo_solicitante: string;
  empresa_nome: string;
  ramo_atuacao: string;
  email_contato: string;
  telefone_whatsapp: string;
  cidade_estado: string;
  website_atual?: string;
  o_que_sua_empresa_faz: string;
  como_sua_empresa_ganha_dinheiro: string;
  quem_e_seu_cliente_ideal: string;
  principal_dor_do_seu_cliente?: string;
  formato_do_site: string;
  numero_estimado_paginas: string;
  acao_principal_desejada: string;
  recursos_desejados: string[];
  ja_possui_logomarca_ou_brandbook: string;
  estilo_visual_preferido: string;
  links_de_sites_que_voce_gosta?: string;
  prazo_desejado: string;
  faixa_investimento: string;
  observacoes_finais?: string;
  arquivos_anexos?: string[];
  status: "novo" | "em_analise" | "proposta_enviada" | "aprovado" | "concluido";
  segmento: string;
}

export default function AdminDashboardPage() {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState("todos");
  const [selectedBudget, setSelectedBudget] = useState("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalBriefing, setActiveModalBriefing] = useState<Briefing | null>(null);
  const router = useRouter();

  useEffect(() => {
    let isMounted = true;
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("arkos_admin_auth");
      if (!auth) {
        router.push("/admin/login");
        return;
      }
    }

    const fetchData = async () => {
      try {
        const res = await fetch("/api/briefing");
        const data = await res.json();
        if (isMounted && data.success) {
          setBriefings(data.briefings);
        }
      } catch (e) {
        console.error("Erro ao carregar briefings:", e);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [router]);

  const loadBriefings = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/briefing");
      const data = await res.json();
      if (data.success) {
        setBriefings(data.briefings);
      }
    } catch (e) {
      console.error("Erro ao carregar briefings:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("arkos_admin_auth");
    }
    router.push("/admin/login");
  };

  const handleUpdateStatus = (id: string, newStatus: Briefing["status"]) => {
    setBriefings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (activeModalBriefing && activeModalBriefing.id === id) {
      setActiveModalBriefing({ ...activeModalBriefing, status: newStatus });
    }
  };

  // Segmentos disponíveis
  const segments = [
    { id: "todos", label: "Todos os Segmentos" },
    { id: "Saúde e Clínicas", label: "Saúde e Clínicas" },
    { id: "B2B e Corporativo", label: "B2B e Corporativo" },
    { id: "E-commerce e Varejo", label: "E-commerce e Varejo" },
    { id: "Direito e Advocacia", label: "Direito e Advocacia" },
    { id: "Imobiliário e Construção", label: "Imobiliário e Construção" },
    { id: "Serviços e Outros", label: "Serviços e Outros" }
  ];

  // Filtros aplicados
  const filteredBriefings = briefings.filter((b) => {
    const matchSegment = selectedSegment === "todos" || b.segmento === selectedSegment;
    const matchBudget = selectedBudget === "todos" || b.faixa_investimento === selectedBudget;
    const matchSearch =
      searchTerm === "" ||
      b.empresa_nome?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.nome_solicitante?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.email_contato?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.ramo_atuacao?.toLowerCase().includes(searchTerm.toLowerCase());
    return matchSegment && matchBudget && matchSearch;
  });

  // Métricas
  const totalBriefings = briefings.length;
  const novosCount = briefings.filter((b) => b.status === "novo").length;
  const emAnaliseCount = briefings.filter((b) => b.status === "em_analise").length;

  const budgetLabel = (faixa: string) => {
    switch (faixa) {
      case "600_a_1500": return "R$ 600 - R$ 1.500 (Express)";
      case "1500_a_3000": return "R$ 1.500 - R$ 3.000 (Institucional)";
      case "3000_a_6000": return "R$ 3.000 - R$ 6.000 (Avançado)";
      case "6000_a_15000": return "R$ 6.000 - R$ 15.000 (Plataforma)";
      case "acima_15000": return "R$ 15.000+ (Ecossistema)";
      default: return faixa;
    }
  };

  const statusBadge = (st: string) => {
    switch (st) {
      case "novo":
        return <span style={{ background: "rgba(200, 245, 66, 0.15)", color: "var(--sinal)", border: "1px solid var(--sinal)", padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Novo Briefing</span>;
      case "em_analise":
        return <span style={{ background: "rgba(255, 193, 7, 0.15)", color: "#ffc107", border: "1px solid #ffc107", padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Em Análise</span>;
      case "proposta_enviada":
        return <span style={{ background: "rgba(66, 153, 225, 0.15)", color: "#63b3ed", border: "1px solid #63b3ed", padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Proposta Enviada</span>;
      case "aprovado":
        return <span style={{ background: "rgba(72, 187, 120, 0.15)", color: "#48bb78", border: "1px solid #48bb78", padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>Aprovado</span>;
      default:
        return <span style={{ background: "var(--ardosia)", color: "var(--text-secondary)", padding: "3px 8px", borderRadius: "12px", fontSize: "10px", fontFamily: "var(--font-mono)" }}>{st}</span>;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidiana)", color: "var(--text-primary)", display: "flex", flexDirection: "column" }}>
      {/* Topo do Gestor */}
      <header style={{
        background: "var(--grafite)",
        borderBottom: "1px solid var(--border)",
        padding: "16px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <svg width="24" height="24" viewBox="0 0 200 200" fill="none">
              <line x1="30" y1="190" x2="100" y2="20" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="100" y1="20" x2="170" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
              <line x1="52" y1="130" x2="148" y2="130" stroke="#C8F542" strokeWidth="12" strokeLinecap="round"/>
              <circle cx="100" cy="20" r="10" fill="#C8F542"/>
            </svg>
            <span style={{ fontFamily: "var(--font-display)", fontSize: "18px", fontWeight: "bold" }}>
              ARKOS
            </span>
          </Link>
          <div style={{ height: "18px", width: "1px", background: "var(--border)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "12px", color: "var(--sinal)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
            Painel do Gestor
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--text-primary)" }}>
              Renato Assis
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
              renato086@gmail.com
            </div>
          </div>
          <button
            onClick={loadBriefings}
            style={{
              background: "var(--ardosia)",
              border: "1px solid var(--border)",
              color: "var(--text-primary)",
              padding: "8px 12px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              cursor: "pointer"
            }}
          >
            ↻ Atualizar
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid #ff6b6b",
              color: "#ff6b6b",
              padding: "8px 12px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              cursor: "pointer"
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo Principal do Dashboard */}
      <main style={{ flex: 1, maxWidth: "1300px", margin: "0 auto", padding: "28px 20px", width: "100%" }}>
        {/* Bloco de Métricas do Gestor */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px"
        }}>
          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Total de Briefings
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", fontWeight: "bold", color: "var(--text-primary)", marginTop: "4px" }}>
              {totalBriefings}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Respostas acumuladas
            </div>
          </div>

          <div style={{ background: "var(--grafite)", border: "1px solid rgba(200, 245, 66, 0.4)", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase" }}>
              Novos / Aguardando Contato
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", fontWeight: "bold", color: "var(--sinal)", marginTop: "4px" }}>
              {novosCount}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Prioridade de resposta imediata
            </div>
          </div>

          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#ffc107", textTransform: "uppercase" }}>
              Em Análise / Proposta
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", fontWeight: "bold", color: "#ffc107", marginTop: "4px" }}>
              {emAnaliseCount}
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Propostas em elaboração
            </div>
          </div>

          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", borderRadius: "8px", padding: "20px" }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Canal de Contato Rápido
            </div>
            <div style={{ fontSize: "14px", fontWeight: 600, color: "var(--text-primary)", marginTop: "8px" }}>
              WhatsApp Direto Ativo
            </div>
            <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Disparo de proposta com 1 clique
            </div>
          </div>
        </div>

        {/* Barra de Segmentação e Filtros de Clientes */}
        <div style={{
          background: "var(--grafite)",
          border: "1px solid var(--border)",
          borderRadius: "8px",
          padding: "20px",
          marginBottom: "24px",
          display: "flex",
          flexDirection: "column",
          gap: "16px"
        }}>
          {/* Pílulas de Segmentos por Tipo de Negócio */}
          <div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "8px" }}>
              Segmentação por Tipo de Cliente e Mercado
            </div>
            <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "4px", scrollbarWidth: "none" }}>
              {segments.map((seg) => {
                const count = seg.id === "todos" ? briefings.length : briefings.filter((b) => b.segmento === seg.id).length;
                return (
                  <button
                    key={seg.id}
                    onClick={() => setSelectedSegment(seg.id)}
                    style={{
                      background: selectedSegment === seg.id ? "var(--sinal)" : "var(--ardosia)",
                      color: selectedSegment === seg.id ? "var(--obsidiana)" : "var(--text-primary)",
                      border: "1px solid var(--border)",
                      padding: "8px 14px",
                      borderRadius: "20px",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      fontWeight: selectedSegment === seg.id ? 700 : 400,
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      display: "flex",
                      alignItems: "center",
                      gap: "6px"
                    }}
                  >
                    <span>{seg.label}</span>
                    <span style={{
                      background: selectedSegment === seg.id ? "rgba(0,0,0,0.2)" : "rgba(255,255,255,0.1)",
                      padding: "1px 6px",
                      borderRadius: "10px",
                      fontSize: "10px"
                    }}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Filtro por Faixa de Orçamento e Busca */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "12px" }}>
            <div>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "4px" }}>
                Filtrar por Faixa de Investimento
              </label>
              <select
                value={selectedBudget}
                onChange={(e) => setSelectedBudget(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--obsidiana)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  color: "var(--text-primary)",
                  fontSize: "13px"
                }}
              >
                <option value="todos">Todos os Orçamentos</option>
                <option value="600_a_1500">R$ 600 - R$ 1.500 (Express)</option>
                <option value="1500_a_3000">R$ 1.500 - R$ 3.000 (Institucional)</option>
                <option value="3000_a_6000">R$ 3.000 - R$ 6.000 (Avançado)</option>
                <option value="6000_a_15000">R$ 6.000 - R$ 15.000 (Plataforma)</option>
                <option value="acima_15000">Acima de R$ 15.000 (Ecossistema)</option>
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "4px" }}>
                Buscar Empresa, Contato ou Termo
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Ex: Dra. Camila, Clínica, B2B..."
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  background: "var(--obsidiana)",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  color: "var(--text-primary)",
                  fontSize: "13px"
                }}
              />
            </div>
          </div>
        </div>

        {/* Lista de Briefings */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "40px", color: "var(--text-secondary)" }}>
            Carregando briefings...
          </div>
        ) : filteredBriefings.length === 0 ? (
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            padding: "48px 20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "20px", color: "var(--text-primary)", fontWeight: 600, marginBottom: "6px" }}>
              Nenhum briefing encontrado com os filtros selecionados.
            </div>
            <p style={{ color: "var(--text-secondary)", fontSize: "13px" }}>
              Tente selecionar outro segmento ou limpar a busca.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredBriefings.map((b) => {
              const cleanPhone = b.telefone_whatsapp?.replace(/\D/g, "") || "";
              const whatsappLink = `https://wa.me/55${cleanPhone}?text=${encodeURIComponent(
                `Olá ${b.nome_solicitante}, tudo bem? Aqui é o Renato da ARKOS Soluções Digitais. Recebi o briefing da ${b.empresa_nome} e já estruturei a análise técnica do seu novo site. Podemos conversar?`
              )}`;

              return (
                <div
                  key={b.id}
                  style={{
                    background: "var(--grafite)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "20px",
                    display: "grid",
                    gridTemplateColumns: "1.2fr 1fr 1fr auto",
                    gap: "16px",
                    alignItems: "center"
                  }}
                  className="admin-briefing-card"
                >
                  {/* Coluna 1: Empresa & Solicitante */}
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                      <span style={{ fontSize: "16px", fontWeight: 700, color: "var(--text-primary)" }}>
                        {b.empresa_nome}
                      </span>
                      {statusBadge(b.status)}
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                      {b.nome_solicitante} ({b.cargo_solicitante}) · {b.cidade_estado}
                    </div>
                    <div style={{
                      display: "inline-block",
                      background: "rgba(200, 245, 66, 0.08)",
                      color: "var(--sinal)",
                      fontFamily: "var(--font-mono)",
                      fontSize: "10px",
                      padding: "2px 6px",
                      borderRadius: "4px",
                      marginTop: "6px"
                    }}>
                      📁 {b.segmento}
                    </div>
                  </div>

                  {/* Coluna 2: Demanda & Orçamento */}
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                      Investimento Previsto
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-primary)", fontWeight: 600, marginTop: "2px" }}>
                      {budgetLabel(b.faixa_investimento)}
                    </div>
                    <div style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "2px" }}>
                      Prazo: {b.prazo_desejado}
                    </div>
                  </div>

                  {/* Coluna 3: Anexos e Data */}
                  <div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                      Anexos Recebidos
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--text-primary)", marginTop: "2px" }}>
                      {b.arquivos_anexos && b.arquivos_anexos.length > 0 ? (
                        <span style={{ color: "var(--sinal)" }}>📎 {b.arquivos_anexos.length} arquivos</span>
                      ) : (
                        <span style={{ color: "var(--text-secondary)" }}>Nenhum anexo</span>
                      )}
                    </div>
                    <div style={{ fontSize: "11px", color: "var(--text-secondary)", marginTop: "2px" }}>
                      {new Date(b.created_at).toLocaleDateString("pt-BR")} às {new Date(b.created_at).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                    </div>
                  </div>

                  {/* Coluna 4: Ações Rápidas */}
                  <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                    <button
                      onClick={() => setActiveModalBriefing(b)}
                      style={{
                        background: "var(--ardosia)",
                        border: "1px solid var(--border)",
                        color: "var(--text-primary)",
                        padding: "8px 14px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontFamily: "var(--font-mono)",
                        cursor: "pointer"
                      }}
                    >
                      Ver Detalhes
                    </button>

                    <a
                      href={whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        background: "var(--sinal)",
                        color: "var(--obsidiana)",
                        fontWeight: 700,
                        padding: "8px 14px",
                        borderRadius: "4px",
                        fontSize: "12px",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px"
                      }}
                    >
                      <span>WhatsApp →</span>
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal / Drawer com Detalhes Completos do Briefing */}
      {activeModalBriefing && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0,0,0,0.8)",
          backdropFilter: "blur(4px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          zIndex: 9999
        }}>
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            width: "100%",
            maxWidth: "760px",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            {/* Topo do Modal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--border)", paddingBottom: "16px" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase" }}>
                  Briefing #{activeModalBriefing.id} · {activeModalBriefing.segmento}
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "24px", color: "var(--text-primary)", margin: "4px 0" }}>
                  {activeModalBriefing.empresa_nome}
                </h2>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  Solicitante: {activeModalBriefing.nome_solicitante} ({activeModalBriefing.cargo_solicitante}) · {activeModalBriefing.cidade_estado}
                </div>
              </div>
              <button
                onClick={() => setActiveModalBriefing(null)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "4px 8px"
                }}
              >
                ✕
              </button>
            </div>

            {/* Mudar Status */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", background: "var(--obsidiana)", padding: "12px 16px", borderRadius: "6px" }}>
              <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                Status Atual:
              </span>
              <select
                value={activeModalBriefing.status}
                onChange={(e) => handleUpdateStatus(activeModalBriefing.id, e.target.value as Briefing["status"])}
                style={{
                  background: "var(--grafite)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  padding: "6px 10px",
                  borderRadius: "4px",
                  fontSize: "12px",
                  fontFamily: "var(--font-mono)"
                }}
              >
                <option value="novo">Novo Briefing</option>
                <option value="em_analise">Em Análise</option>
                <option value="proposta_enviada">Proposta Enviada</option>
                <option value="aprovado">Aprovado</option>
                <option value="concluido">Concluído</option>
              </select>
            </div>

            {/* Seções Detalhadas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
              <div>
                <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                  1. Sobre o Negócio & Como Ganha Dinheiro
                </h4>
                <p style={{ color: "var(--text-primary)", lineHeight: 1.6, background: "var(--obsidiana)", padding: "12px", borderRadius: "4px" }}>
                  {activeModalBriefing.o_que_sua_empresa_faz}
                </p>
                <div style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "12px" }}>
                  <strong>Modelo de Receita:</strong> {activeModalBriefing.como_sua_empresa_ganha_dinheiro}
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                  2. Cliente Ideal (Persona) e Principal Dor
                </h4>
                <p style={{ color: "var(--text-primary)", lineHeight: 1.6, background: "var(--obsidiana)", padding: "12px", borderRadius: "4px" }}>
                  {activeModalBriefing.quem_e_seu_cliente_ideal}
                </p>
                {activeModalBriefing.principal_dor_do_seu_cliente && (
                  <p style={{ color: "var(--text-secondary)", marginTop: "6px", fontSize: "12px" }}>
                    <strong>Dor a resolver:</strong> {activeModalBriefing.principal_dor_do_seu_cliente}
                  </p>
                )}
              </div>

              <div>
                <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                  3. Especificações do Site & Recursos
                </h4>
                <div style={{ background: "var(--obsidiana)", padding: "12px", borderRadius: "4px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div><strong>Formato:</strong> {activeModalBriefing.formato_do_site}</div>
                  <div><strong>Páginas:</strong> {activeModalBriefing.numero_estimado_paginas}</div>
                  <div><strong>Ação Principal:</strong> {activeModalBriefing.acao_principal_desejada}</div>
                  <div><strong>Estilo Visual:</strong> {activeModalBriefing.estilo_visual_preferido}</div>
                </div>
                {activeModalBriefing.recursos_desejados && activeModalBriefing.recursos_desejados.length > 0 && (
                  <div style={{ marginTop: "8px" }}>
                    <strong style={{ fontSize: "12px", color: "var(--text-secondary)" }}>Recursos Solicitados: </strong>
                    <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginTop: "4px" }}>
                      {activeModalBriefing.recursos_desejados.map((rec) => (
                        <span key={rec} style={{ background: "var(--ardosia)", color: "var(--text-primary)", padding: "2px 8px", borderRadius: "4px", fontSize: "11px" }}>
                          ✓ {rec}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {activeModalBriefing.arquivos_anexos && activeModalBriefing.arquivos_anexos.length > 0 && (
                <div>
                  <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                    4. Arquivos e Documentos Anexados
                  </h4>
                  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                    {activeModalBriefing.arquivos_anexos.map((arq, i) => (
                      <div key={i} style={{ background: "var(--obsidiana)", padding: "8px 12px", borderRadius: "4px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span>📁 {arq}</span>
                        <span style={{ fontSize: "11px", color: "var(--sinal)" }}>Recebido</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Botões do Rodapé do Modal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderTop: "1px solid var(--border)", paddingTop: "16px" }}>
              <a
                href={`mailto:${activeModalBriefing.email_contato}`}
                style={{ color: "var(--text-secondary)", fontSize: "12px", fontFamily: "var(--font-mono)" }}
              >
                ✉ Enviar E-mail ({activeModalBriefing.email_contato})
              </a>
              <button
                onClick={() => setActiveModalBriefing(null)}
                style={{
                  background: "var(--sinal)",
                  color: "var(--obsidiana)",
                  fontWeight: 700,
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "none",
                  cursor: "pointer",
                  fontFamily: "var(--font-mono)",
                  fontSize: "12px",
                  textTransform: "uppercase"
                }}
              >
                Fechar Detalhes
              </button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (max-width: 860px) {
          :global(.admin-briefing-card) {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
