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
  estagio_empresa?: string;
  diferencial_competitivo?: string;
  email_contato: string;
  telefone_whatsapp: string;
  cidade_estado: string;
  website_atual?: string;
  o_que_sua_empresa_faz: string;
  como_sua_empresa_ganha_dinheiro: string;
  ticket_medio?: string;
  quem_e_seu_cliente_ideal: string;
  principal_dor_do_seu_cliente?: string;
  maior_objecao_ou_duvida_cliente?: string;
  conquistas_e_provas_de_autoridade?: string;
  como_clientes_te_encontram_hoje?: string;
  formato_do_site: string;
  numero_estimado_paginas: string;
  acao_principal_desejada: string;
  acao_secundaria_desejada?: string;
  recursos_desejados: string[];
  integracoes_sistemas_externos?: string;
  ja_possui_logomarca_ou_brandbook: string;
  estilo_visual_preferido: string;
  sensacao_desejada_marca?: string;
  links_de_sites_que_voce_gosta?: string;
  o_que_voce_nao_quer_no_site?: string;
  prazo_desejado: string;
  faixa_investimento: string;
  quem_aprova_o_projeto?: string;
  criterio_de_sucesso_30_dias?: string;
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

  // Filtragem Inteligente
  const filteredBriefings = briefings.filter((b) => {
    const matchSegment = selectedSegment === "todos" || b.segmento === selectedSegment;
    const matchBudget = selectedBudget === "todos" || b.faixa_investimento === selectedBudget;
    const searchLower = searchTerm.toLowerCase();
    const matchSearch =
      searchTerm === "" ||
      b.empresa_nome.toLowerCase().includes(searchLower) ||
      b.nome_solicitante.toLowerCase().includes(searchLower) ||
      b.email_contato.toLowerCase().includes(searchLower) ||
      b.ramo_atuacao.toLowerCase().includes(searchLower);

    return matchSegment && matchBudget && matchSearch;
  });

  // Métricas
  const totalBriefings = briefings.length;
  const novosCount = briefings.filter((b) => b.status === "novo").length;
  const emAnaliseCount = briefings.filter((b) => b.status === "em_analise").length;
  const propostasCount = briefings.filter((b) => b.status === "proposta_enviada" || b.status === "aprovado").length;

  const segmentCounts: Record<string, number> = {
    todos: briefings.length,
    "Saúde e Clínicas": briefings.filter((b) => b.segmento === "Saúde e Clínicas").length,
    "B2B e Corporativo": briefings.filter((b) => b.segmento === "B2B e Corporativo").length,
    "E-commerce e Varejo": briefings.filter((b) => b.segmento === "E-commerce e Varejo").length,
    "Direito e Advocacia": briefings.filter((b) => b.segmento === "Direito e Advocacia").length,
    "Imobiliário e Construção": briefings.filter((b) => b.segmento === "Imobiliário e Construção").length,
    "Serviços e Outros": briefings.filter((b) => b.segmento === "Serviços e Outros").length,
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidiana)", color: "var(--text-primary)", paddingBottom: "60px" }}>
      {/* Header do Painel do Gestor */}
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
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <Link href="/" style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <span style={{
              width: "12px",
              height: "12px",
              background: "var(--sinal)",
              borderRadius: "2px",
              display: "inline-block"
            }} />
            <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: 700, letterSpacing: "-0.02em" }}>
              ARKOS
            </span>
          </Link>
          <div style={{
            background: "var(--ardosia)",
            padding: "4px 10px",
            borderRadius: "4px",
            fontSize: "11px",
            fontFamily: "var(--font-mono)",
            color: "var(--sinal)"
          }}>
            GESTOR HUB • renato086@gmail.com
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <button
            onClick={loadBriefings}
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
            ↻ Atualizar
          </button>
          <button
            onClick={handleLogout}
            style={{
              background: "transparent",
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              padding: "8px 14px",
              borderRadius: "4px",
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              cursor: "pointer"
            }}
          >
            Sair
          </button>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main style={{ maxWidth: "1240px", margin: "0 auto", padding: "32px 20px" }}>
        
        {/* Bloco de Métricas Rápidas */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
          marginBottom: "28px"
        }}>
          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", padding: "20px", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase" }}>Total de Briefings</div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "var(--text-primary)", marginTop: "4px" }}>{totalBriefings}</div>
          </div>
          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", padding: "20px", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--sinal)", textTransform: "uppercase" }}>● Novos / Não Lidos</div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "var(--sinal)", marginTop: "4px" }}>{novosCount}</div>
          </div>
          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", padding: "20px", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#eab308", textTransform: "uppercase" }}>● Em Análise Técnica</div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "#eab308", marginTop: "4px" }}>{emAnaliseCount}</div>
          </div>
          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", padding: "20px", borderRadius: "8px" }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#38bdf8", textTransform: "uppercase" }}>● Propostas Enviadas</div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "#38bdf8", marginTop: "4px" }}>{propostasCount}</div>
          </div>
        </div>

        {/* Abas de Segmentação de Clientes */}
        <div style={{ marginBottom: "20px" }}>
          <div style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase", marginBottom: "8px" }}>
            Segmentação por Nicho de Cliente:
          </div>
          <div style={{ display: "flex", gap: "8px", overflowX: "auto", paddingBottom: "6px" }}>
            {[
              "todos",
              "Saúde e Clínicas",
              "B2B e Corporativo",
              "E-commerce e Varejo",
              "Direito e Advocacia",
              "Imobiliário e Construção",
              "Serviços e Outros"
            ].map((seg) => {
              const isSelected = selectedSegment === seg;
              const count = segmentCounts[seg] || 0;
              return (
                <button
                  key={seg}
                  onClick={() => setSelectedSegment(seg)}
                  style={{
                    background: isSelected ? "var(--sinal)" : "var(--grafite)",
                    color: isSelected ? "var(--obsidiana)" : "var(--text-primary)",
                    border: isSelected ? "1px solid var(--sinal)" : "1px solid var(--border)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    fontWeight: isSelected ? 700 : 500,
                    padding: "8px 16px",
                    borderRadius: "20px",
                    cursor: "pointer",
                    whiteSpace: "nowrap",
                    display: "flex",
                    alignItems: "center",
                    gap: "6px"
                  }}
                >
                  <span>{seg === "todos" ? "Todos os Segmentos" : seg}</span>
                  <span style={{
                    background: isSelected ? "var(--obsidiana)" : "var(--ardosia)",
                    color: isSelected ? "var(--sinal)" : "var(--text-secondary)",
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

        {/* Barra de Filtros e Busca */}
        <div style={{
          background: "var(--grafite)",
          border: "1px solid var(--border)",
          padding: "16px",
          borderRadius: "8px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}>
          <div style={{ flex: 1, minWidth: "260px" }}>
            <input
              type="text"
              placeholder="Buscar por empresa, solicitante, ramo ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px",
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-primary)",
                fontSize: "13px"
              }}
            />
          </div>

          <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
            <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
              Investimento:
            </span>
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              style={{
                padding: "10px 14px",
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                borderRadius: "4px",
                color: "var(--text-primary)",
                fontSize: "13px"
              }}
            >
              <option value="todos">Todos os Valores</option>
              <option value="600_a_1500">R$ 600 a R$ 1.500</option>
              <option value="1500_a_3000">R$ 1.500 a R$ 3.000</option>
              <option value="3000_a_6000">R$ 3.000 a R$ 6.000</option>
              <option value="6000_a_15000">R$ 6.000 a R$ 15.000</option>
              <option value="acima_15000">Acima de R$ 15.000</option>
            </select>
          </div>
        </div>

        {/* Lista de Briefings */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
            Carregando diagnósticos de clientes...
          </div>
        ) : filteredBriefings.length === 0 ? (
          <div style={{
            background: "var(--grafite)",
            border: "1px dashed var(--border)",
            borderRadius: "8px",
            padding: "48px 20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "28px", marginBottom: "8px" }}>📋</div>
            <h3 style={{ fontSize: "16px", color: "var(--text-primary)" }}>Nenhum briefing encontrado para este filtro</h3>
            <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Tente selecionar &quot;Todos os Segmentos&quot; ou limpar o campo de busca.
            </p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {filteredBriefings.map((b) => {
              const dateStr = new Date(b.created_at).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit"
              });

              const statusColor =
                b.status === "novo"
                  ? "var(--sinal)"
                  : b.status === "em_analise"
                  ? "#eab308"
                  : b.status === "proposta_enviada"
                  ? "#38bdf8"
                  : b.status === "aprovado"
                  ? "#4ade80"
                  : "var(--text-secondary)";

              const statusLabel =
                b.status === "novo"
                  ? "Novo Briefing"
                  : b.status === "em_analise"
                  ? "Em Análise"
                  : b.status === "proposta_enviada"
                  ? "Proposta Enviada"
                  : b.status === "aprovado"
                  ? "Aprovado"
                  : "Concluído";

              const whatsappDigits = b.telefone_whatsapp.replace(/\D/g, "");

              return (
                <div
                  key={b.id}
                  style={{
                    background: "var(--grafite)",
                    border: "1px solid var(--border)",
                    borderRadius: "8px",
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "14px"
                  }}
                >
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "4px" }}>
                        <span style={{
                          background: "var(--ardosia)",
                          color: "var(--sinal)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "10px",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          fontWeight: 600
                        }}>
                          {b.segmento}
                        </span>
                        <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                          {dateStr}
                        </span>
                        <span style={{
                          fontSize: "11px",
                          fontFamily: "var(--font-mono)",
                          color: statusColor,
                          fontWeight: 600,
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "4px"
                        }}>
                          ● {statusLabel}
                        </span>
                      </div>

                      <h3 style={{ fontFamily: "var(--font-display)", fontSize: "19px", color: "var(--text-primary)" }}>
                        {b.empresa_nome}
                      </h3>
                      <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "2px" }}>
                        Solicitante: <strong style={{ color: "var(--text-primary)" }}>{b.nome_solicitante}</strong> ({b.cargo_solicitante}) • {b.cidade_estado}
                      </div>
                    </div>

                    {/* Ações Rápidas */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
                      <a
                        href={`https://wa.me/55${whatsappDigits}?text=Ol%C3%A1%20${encodeURIComponent(b.nome_solicitante)}%2C%20aqui%20%C3%A9%20o%20Renato%20da%20ARKOS%20Solu%C3%A7%C3%B5es%20Digitais.%20Recebemos%20o%20seu%20briefing%20da%20${encodeURIComponent(b.empresa_nome)}%20e%20gostaria%20de%20conversar%20sobre%20a%20sua%20proposta.`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: "#25D366",
                          color: "#0a0c0f",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "8px 14px",
                          borderRadius: "4px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          textDecoration: "none"
                        }}
                      >
                        💬 WhatsApp ({b.telefone_whatsapp})
                      </a>

                      <button
                        onClick={() => setActiveModalBriefing(b)}
                        style={{
                          background: "var(--sinal)",
                          color: "var(--obsidiana)",
                          border: "none",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "8px 16px",
                          borderRadius: "4px",
                          cursor: "pointer",
                          textTransform: "uppercase"
                        }}
                      >
                        🔍 Ver Raio-X Completo
                      </button>
                    </div>
                  </div>

                  {/* Resumo Rápido */}
                  <div style={{
                    background: "var(--obsidiana)",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "var(--text-secondary)",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                    gap: "12px"
                  }}>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Formato:</strong> {b.formato_do_site.replace(/_/g, " ")}
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Investimento:</strong> {b.faixa_investimento.replace(/_/g, " ")}
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Prazo:</strong> {b.prazo_desejado.replace(/_/g, " ")}
                    </div>
                    <div>
                      <strong style={{ color: "var(--text-primary)" }}>Anexos:</strong> {b.arquivos_anexos?.length || 0} arquivo(s)
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* Modal de Raio-X do Briefing */}
      {activeModalBriefing && (
        <div style={{
          position: "fixed",
          inset: 0,
          background: "rgba(0, 0, 0, 0.85)",
          backdropFilter: "blur(6px)",
          zIndex: 9999,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px"
        }}>
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "8px",
            maxWidth: "800px",
            width: "100%",
            maxHeight: "90vh",
            overflowY: "auto",
            padding: "28px",
            display: "flex",
            flexDirection: "column",
            gap: "20px"
          }}>
            {/* Topo do Modal */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", borderBottom: "1px solid var(--border)", paddingBottom: "14px" }}>
              <div>
                <span style={{ background: "var(--ardosia)", color: "var(--sinal)", fontSize: "11px", fontFamily: "var(--font-mono)", padding: "2px 8px", borderRadius: "4px" }}>
                  {activeModalBriefing.segmento} • ID: {activeModalBriefing.id}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "22px", marginTop: "6px" }}>
                  {activeModalBriefing.empresa_nome}
                </h3>
                <div style={{ fontSize: "13px", color: "var(--text-secondary)" }}>
                  {activeModalBriefing.nome_solicitante} ({activeModalBriefing.cargo_solicitante}) • {activeModalBriefing.email_contato} • {activeModalBriefing.telefone_whatsapp}
                </div>
              </div>
              <button
                onClick={() => setActiveModalBriefing(null)}
                style={{
                  background: "transparent",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  borderRadius: "4px",
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

            {/* Seções Detalhadas Estratégicas */}
            <div style={{ display: "flex", flexDirection: "column", gap: "16px", fontSize: "13px" }}>
              <div>
                <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                  1. Sobre o Negócio & Proposta Única de Valor (UVP)
                </h4>
                <p style={{ color: "var(--text-primary)", lineHeight: 1.6, background: "var(--obsidiana)", padding: "12px", borderRadius: "4px" }}>
                  {activeModalBriefing.o_que_sua_empresa_faz}
                </p>
                {activeModalBriefing.diferencial_competitivo && (
                  <div style={{ marginTop: "6px", color: "var(--text-primary)", background: "rgba(200, 245, 66, 0.05)", border: "1px solid var(--border)", padding: "8px 12px", borderRadius: "4px", fontSize: "12px" }}>
                    <strong style={{ color: "var(--sinal)" }}>Diferencial Competitivo:</strong> {activeModalBriefing.diferencial_competitivo}
                  </div>
                )}
                <div style={{ marginTop: "6px", color: "var(--text-secondary)", fontSize: "12px", display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  <div><strong>Modelo:</strong> {activeModalBriefing.como_sua_empresa_ganha_dinheiro}</div>
                  {activeModalBriefing.ticket_medio && <div><strong>Ticket Médio:</strong> {activeModalBriefing.ticket_medio}</div>}
                  {activeModalBriefing.estagio_empresa && <div><strong>Estágio:</strong> {activeModalBriefing.estagio_empresa}</div>}
                </div>
              </div>

              <div>
                <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                  2. Cliente Ideal (Persona), Dores e Objeções
                </h4>
                <p style={{ color: "var(--text-primary)", lineHeight: 1.6, background: "var(--obsidiana)", padding: "12px", borderRadius: "4px" }}>
                  {activeModalBriefing.quem_e_seu_cliente_ideal}
                </p>
                {activeModalBriefing.principal_dor_do_seu_cliente && (
                  <p style={{ color: "var(--text-secondary)", marginTop: "6px", fontSize: "12px" }}>
                    <strong>Principal Dor do Cliente:</strong> {activeModalBriefing.principal_dor_do_seu_cliente}
                  </p>
                )}
                {activeModalBriefing.maior_objecao_ou_duvida_cliente && (
                  <p style={{ color: "var(--text-secondary)", marginTop: "4px", fontSize: "12px" }}>
                    <strong>Maior Objeção / Dúvida antes de fechar:</strong> {activeModalBriefing.maior_objecao_ou_duvida_cliente}
                  </p>
                )}
                {activeModalBriefing.conquistas_e_provas_de_autoridade && (
                  <p style={{ color: "var(--text-secondary)", marginTop: "4px", fontSize: "12px" }}>
                    <strong>Provas de Autoridade:</strong> {activeModalBriefing.conquistas_e_provas_de_autoridade}
                  </p>
                )}
              </div>

              <div>
                <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                  3. Especificações do Site, Gatilhos e Conversão
                </h4>
                <div style={{ background: "var(--obsidiana)", padding: "12px", borderRadius: "4px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <div><strong>Formato:</strong> {activeModalBriefing.formato_do_site}</div>
                  <div><strong>Páginas:</strong> {activeModalBriefing.numero_estimado_paginas}</div>
                  <div><strong>Ação Primária:</strong> {activeModalBriefing.acao_principal_desejada}</div>
                  <div><strong>Ação Secundária:</strong> {activeModalBriefing.acao_secundaria_desejada || "Nenhuma"}</div>
                  <div><strong>Estilo Visual:</strong> {activeModalBriefing.estilo_visual_preferido}</div>
                  <div><strong>Sensação:</strong> {activeModalBriefing.sensacao_desejada_marca || "Padrão"}</div>
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
                {activeModalBriefing.integracoes_sistemas_externos && (
                  <p style={{ color: "var(--text-secondary)", marginTop: "6px", fontSize: "12px" }}>
                    <strong>Integrações:</strong> {activeModalBriefing.integracoes_sistemas_externos}
                  </p>
                )}
              </div>

              {activeModalBriefing.criterio_de_sucesso_30_dias && (
                <div>
                  <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                    4. Expectativa de Sucesso (Primeiros 30 dias)
                  </h4>
                  <p style={{ color: "var(--text-primary)", background: "var(--obsidiana)", padding: "10px 12px", borderRadius: "4px", fontSize: "12px" }}>
                    {activeModalBriefing.criterio_de_sucesso_30_dias}
                  </p>
                </div>
              )}

              {activeModalBriefing.arquivos_anexos && activeModalBriefing.arquivos_anexos.length > 0 && (
                <div>
                  <h4 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", marginBottom: "6px" }}>
                    5. Arquivos e Documentos Anexados
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
    </div>
  );
}
