"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { AnexoRef } from "../api/briefing/route";

interface Briefing {
  id: string;
  created_at: string;
  updated_at?: string;
  status: "novo" | "recebido" | "em_analise" | "proposta_enviada" | "aprovado" | "concluido";
  segmento: string;
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
  por_que_o_cliente_escolhe_voce?: string;
  conquistas_e_provas_de_autoridade?: string;
  como_clientes_te_encontram_hoje?: string;
  formato_do_site: string;
  numero_estimado_paginas: string;
  acao_principal_desejada: string;
  acao_secundaria_desejada?: string;
  recursos_desejados: string[];
  outros_sistemas_para_integrar?: string;
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
  arquivos_anexos?: AnexoRef[];
}

export default function AdminDashboardPage() {
  const [briefings, setBriefings] = useState<Briefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedSegment, setSelectedSegment] = useState("todos");
  const [selectedStatus, setSelectedStatus] = useState("todos");
  const [selectedBudget, setSelectedBudget] = useState("todos");
  const [sortOrder, setSortOrder] = useState<"desc" | "asc">("desc");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeModalBriefing, setActiveModalBriefing] = useState<Briefing | null>(null);
  const [copyFeedback, setCopyFeedback] = useState(false);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);
  const router = useRouter();

  const loadBriefings = useCallback(async (isSilent = false) => {
    if (!isSilent) setRefreshing(true);
    try {
      const res = await fetch("/api/briefing", { cache: "no-store" });
      const data = await res.json();
      if (data.success && Array.isArray(data.briefings)) {
        setBriefings(data.briefings);
      }
    } catch (e) {
      console.error("Erro ao carregar briefings do Supabase:", e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("arkos_admin_auth");
      if (!auth) {
        router.push("/admin/login");
        return;
      }
    }
    loadBriefings(false);
  }, [router, loadBriefings]);

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("arkos_admin_auth");
    }
    router.push("/admin/login");
  };

  const handleUpdateStatus = async (id: string, newStatus: Briefing["status"]) => {
    setStatusUpdatingId(id);
    // Atualização otimista
    setBriefings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (activeModalBriefing && activeModalBriefing.id === id) {
      setActiveModalBriefing({ ...activeModalBriefing, status: newStatus });
    }

    try {
      await fetch("/api/briefing", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus })
      });
    } catch (err) {
      console.error("Erro ao salvar status no Supabase:", err);
    } finally {
      setStatusUpdatingId(null);
    }
  };

  // Filtragem Inteligente Multi-Critério
  const filteredBriefings = useMemo(() => {
    return briefings
      .filter((b) => {
        const matchSegment = selectedSegment === "todos" || b.segmento === selectedSegment;
        const matchStatus =
          selectedStatus === "todos" ||
          (selectedStatus === "novo" && (b.status === "novo" || b.status === "recebido")) ||
          b.status === selectedStatus;
        const matchBudget = selectedBudget === "todos" || b.faixa_investimento === selectedBudget;
        
        const q = searchTerm.toLowerCase().trim();
        const matchSearch =
          q === "" ||
          b.empresa_nome.toLowerCase().includes(q) ||
          b.nome_solicitante.toLowerCase().includes(q) ||
          b.email_contato.toLowerCase().includes(q) ||
          b.ramo_atuacao.toLowerCase().includes(q) ||
          b.cidade_estado.toLowerCase().includes(q) ||
          b.telefone_whatsapp.includes(q);

        return matchSegment && matchStatus && matchBudget && matchSearch;
      })
      .sort((a, b) => {
        const timeA = new Date(a.created_at).getTime();
        const timeB = new Date(b.created_at).getTime();
        return sortOrder === "desc" ? timeB - timeA : timeA - timeB;
      });
  }, [briefings, selectedSegment, selectedStatus, selectedBudget, searchTerm, sortOrder]);

  // Contadores e Métricas Executivas
  const metrics = useMemo(() => {
    const total = briefings.length;
    const novos = briefings.filter((b) => b.status === "novo" || b.status === "recebido").length;
    const emAnalise = briefings.filter((b) => b.status === "em_analise").length;
    const propostas = briefings.filter((b) => b.status === "proposta_enviada").length;
    const aprovados = briefings.filter((b) => b.status === "aprovado" || b.status === "concluido").length;

    // Estimativa de Pipeline
    let pipelineMin = 0;
    briefings.forEach((b) => {
      if (b.faixa_investimento === "600_a_1500") pipelineMin += 600;
      else if (b.faixa_investimento === "1500_a_3000") pipelineMin += 1500;
      else if (b.faixa_investimento === "3000_a_6000") pipelineMin += 3000;
      else if (b.faixa_investimento === "6000_a_15000") pipelineMin += 6000;
      else if (b.faixa_investimento === "acima_15000") pipelineMin += 15000;
      else pipelineMin += 2000;
    });

    return { total, novos, emAnalise, propostas, aprovados, pipelineMin };
  }, [briefings]);

  const segmentCounts = useMemo(() => {
    const counts: Record<string, number> = {
      todos: briefings.length,
      "Saúde e Clínicas": 0,
      "B2B e Corporativo": 0,
      "Imobiliário e Construção": 0,
      "E-commerce e Varejo": 0,
      "Direito e Advocacia": 0,
      "Serviços e Outros": 0
    };
    briefings.forEach((b) => {
      if (counts[b.segmento] !== undefined) {
        counts[b.segmento]++;
      } else {
        counts["Serviços e Outros"]++;
      }
    });
    return counts;
  }, [briefings]);

  const copyDiagnosticSummary = (b: Briefing) => {
    const text = `📋 DIAGNÓSTICO ESTRATÉGICO — ARKOS SOLUÇÕES DIGITAIS
==================================================
Empresa: ${b.empresa_nome}
Solicitante: ${b.nome_solicitante} (${b.cargo_solicitante || "Decisor"})
Contato: ${b.telefone_whatsapp} | ${b.email_contato}
Localização: ${b.cidade_estado || "Não informada"}
Segmento Identificado: ${b.segmento}
Data de Envio: ${new Date(b.created_at).toLocaleString("pt-BR")}

🎯 PROPOSTA DE VALOR (O QUE FAZ):
${b.o_que_sua_empresa_faz}

⭐ DIFERENCIAL COMPETITIVO:
${b.diferencial_competitivo || b.por_que_o_cliente_escolhe_voce || "Não detalhado"}

👤 CLIENTE IDEAL & PERSONA:
${b.quem_e_seu_cliente_ideal}

🔥 PRINCIPAL DOR RESOLVIDA:
${b.principal_dor_do_seu_cliente || "Não informada"}

🛠️ ARQUITETURA DO PROJETO:
- Formato: ${b.formato_do_site.replace(/_/g, " ")}
- Páginas Estimadas: ${b.numero_estimado_paginas.replace(/_/g, " ")}
- Ação Principal Desejada: ${b.acao_principal_desejada.replace(/_/g, " ")}
- Recursos: ${b.recursos_desejados?.join(", ") || "Nenhum selecionado"}
- Estilo Visual: ${b.estilo_visual_preferido.replace(/_/g, " ")}

💰 VIABILIDADE COMERCIAL:
- Faixa de Investimento: ${b.faixa_investimento.replace(/_/g, " ")}
- Prazo Desejado: ${b.prazo_desejado.replace(/_/g, " ")}
- Critério de Sucesso aos 30 Dias: ${b.criterio_de_sucesso_30_dias || "Geração contínua de contatos"}
==================================================`;

    navigator.clipboard.writeText(text);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2500);
  };

  const exportDataJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(briefings, null, 2));
    const downloadAnchor = document.createElement("a");
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `arkos_briefings_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--obsidiana)", color: "var(--text-primary)", display: "flex", flexDirection: "column" }}>
      
      {/* Top Header Oficial ARKOS Glassmorphic */}
      <header style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(17, 19, 24, 0.95)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--border)",
        padding: "14px 24px",
        boxShadow: "0 4px 20px rgba(0,0,0,0.4)"
      }}>
        <div style={{
          maxWidth: "1320px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "16px"
        }}>
          {/* Logo e Título Oficial */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
              <svg width="26" height="28" viewBox="0 0 200 220" fill="none" style={{ flexShrink: 0 }}>
                <line x1="100" y1="20" x2="30" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
                <line x1="100" y1="20" x2="170" y2="190" stroke="#F4F2ED" strokeWidth="16" strokeLinecap="round"/>
                <line x1="52" y1="130" x2="148" y2="130" stroke="#C8F542" strokeWidth="12" strokeLinecap="round"/>
                <circle cx="100" cy="20" r="10" fill="#C8F542"/>
              </svg>
              <div>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "20px", fontWeight: "bold", color: "var(--text-primary)", letterSpacing: "-0.03em" }}>
                  ARKOS
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "var(--sinal)", marginLeft: "8px", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                  SOLUÇÕES DIGITAIS
                </span>
              </div>
            </Link>

            <div style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "var(--ardosia)",
              border: "1px solid var(--border)",
              padding: "4px 10px",
              borderRadius: "20px",
              fontSize: "11px",
              fontFamily: "var(--font-mono)",
              color: "var(--text-primary)"
            }}>
              <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#4ade80", display: "inline-block", boxShadow: "0 0 8px #4ade80" }} />
              <span>Supabase Conectado</span>
            </div>
          </div>

          {/* Ações e Identificação do Gestor */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <div style={{
              fontSize: "12px",
              fontFamily: "var(--font-mono)",
              color: "var(--text-secondary)",
              background: "var(--obsidiana)",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "1px solid var(--border)",
              display: "flex",
              alignItems: "center",
              gap: "6px"
            }}>
              <span>👤</span>
              <strong style={{ color: "var(--text-primary)" }}>Renato Assis</strong>
              <span style={{ color: "var(--sinal)" }}>• Gestor Hub</span>
            </div>

            <Link
              href="/briefing"
              target="_blank"
              style={{
                background: "rgba(200, 245, 66, 0.1)",
                border: "1px solid var(--sinal)",
                color: "var(--sinal)",
                padding: "7px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                transition: "all 0.2s"
              }}
            >
              + Novo Briefing
            </Link>

            <button
              onClick={() => loadBriefings(false)}
              disabled={refreshing}
              style={{
                background: "var(--ardosia)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "7px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px"
              }}
            >
              <span style={{ display: "inline-block", transform: refreshing ? "rotate(180deg)" : "none", transition: "transform 0.5s ease" }}>↻</span>
              {refreshing ? "Atualizando..." : "Sincronizar"}
            </button>

            <button
              onClick={exportDataJSON}
              title="Exportar dados para JSON"
              style={{
                background: "var(--ardosia)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "7px 12px",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                cursor: "pointer"
              }}
            >
              📥 Exportar
            </button>

            <button
              onClick={handleLogout}
              style={{
                background: "transparent",
                border: "1px solid var(--border)",
                color: "#ff6b6b",
                padding: "7px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              Sair
            </button>
          </div>
        </div>
      </header>

      {/* Conteúdo Principal */}
      <main style={{ maxWidth: "1320px", margin: "0 auto", padding: "32px 20px", width: "100%", flex: 1 }}>
        
        {/* Banner de Boas-Vindas e Pipeline */}
        <div style={{
          background: "linear-gradient(135deg, rgba(31, 36, 45, 0.8) 0%, rgba(17, 19, 24, 0.95) 100%)",
          border: "1px solid var(--border)",
          borderRadius: "12px",
          padding: "24px 28px",
          marginBottom: "28px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "20px"
        }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span style={{ background: "var(--sinal)", color: "var(--obsidiana)", fontFamily: "var(--font-mono)", fontSize: "10px", fontWeight: 700, padding: "2px 8px", borderRadius: "4px", textTransform: "uppercase" }}>
                ARKOS INTELLIGENCE
              </span>
              <span style={{ fontSize: "12px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                Gestão Estratégica de Diagnósticos & Clientes
              </span>
            </div>
            <h1 style={{ fontFamily: "var(--font-display)", fontSize: "28px", color: "var(--text-primary)", marginTop: "6px" }}>
              Painel de Briefings & Oportunidades
            </h1>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "4px" }}>
              Acompanhe respostas em tempo real, qualifique a jornada de conversão e feche propostas personalizadas.
            </p>
          </div>

          <div style={{
            background: "rgba(10, 12, 15, 0.7)",
            border: "1px solid var(--border)",
            padding: "14px 20px",
            borderRadius: "8px",
            textAlign: "right"
          }}>
            <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase" }}>
              Pipeline Mínimo Estimado
            </div>
            <div style={{ fontSize: "24px", fontFamily: "var(--font-display)", color: "var(--sinal)", fontWeight: 700, marginTop: "2px" }}>
              R$ {metrics.pipelineMin.toLocaleString("pt-BR")},00+
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
              {briefings.length} diagnósticos ativos no banco
            </div>
          </div>
        </div>

        {/* Grade de Métricas e KPIs Executivos */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
          gap: "14px",
          marginBottom: "28px"
        }}>
          {/* Total */}
          <div style={{ background: "var(--grafite)", border: "1px solid var(--border)", padding: "18px 20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase" }}>Total de Briefings</span>
              <span style={{ fontSize: "16px" }}>📊</span>
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "var(--text-primary)", marginTop: "4px" }}>
              {metrics.total}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
              Armazenados no Supabase
            </div>
          </div>

          {/* Novos / Recebidos */}
          <div style={{ background: "var(--grafite)", border: "1px solid rgba(200, 245, 66, 0.3)", padding: "18px 20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--sinal)", textTransform: "uppercase" }}>● Novos / Pendentes</span>
              <span style={{ fontSize: "16px" }}>⚡</span>
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "var(--sinal)", marginTop: "4px" }}>
              {metrics.novos}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
              Aguardando contato inicial
            </div>
          </div>

          {/* Em Análise */}
          <div style={{ background: "var(--grafite)", border: "1px solid rgba(234, 179, 8, 0.3)", padding: "18px 20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#eab308", textTransform: "uppercase" }}>● Em Análise Técnica</span>
              <span style={{ fontSize: "16px" }}>🔍</span>
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "#eab308", marginTop: "4px" }}>
              {metrics.emAnalise}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
              Estruturação de escopo & UVP
            </div>
          </div>

          {/* Propostas Enviadas */}
          <div style={{ background: "var(--grafite)", border: "1px solid rgba(56, 189, 248, 0.3)", padding: "18px 20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#38bdf8", textTransform: "uppercase" }}>● Propostas Enviadas</span>
              <span style={{ fontSize: "16px" }}>💼</span>
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "#38bdf8", marginTop: "4px" }}>
              {metrics.propostas}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
              Em negociação com cliente
            </div>
          </div>

          {/* Aprovados */}
          <div style={{ background: "var(--grafite)", border: "1px solid rgba(74, 222, 128, 0.3)", padding: "18px 20px", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "#4ade80", textTransform: "uppercase" }}>● Aprovados / Sucesso</span>
              <span style={{ fontSize: "16px" }}>🚀</span>
            </div>
            <div style={{ fontSize: "32px", fontFamily: "var(--font-display)", color: "#4ade80", marginTop: "4px" }}>
              {metrics.aprovados}
            </div>
            <div style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)", marginTop: "2px" }}>
              Em desenvolvimento ou entregues
            </div>
          </div>
        </div>

        {/* Abas de Segmentação por Nicho de Negócio */}
        <div style={{ marginBottom: "22px" }}>
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px",
            flexWrap: "wrap",
            gap: "8px"
          }}>
            <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Filtrar por Nicho / Segmento do Cliente:
            </span>
            <span style={{ fontSize: "12px", color: "var(--sinal)", fontFamily: "var(--font-mono)" }}>
              Exibindo {filteredBriefings.length} de {briefings.length}
            </span>
          </div>

          <div style={{
            display: "flex",
            gap: "8px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollbarWidth: "thin"
          }}>
            {[
              { id: "todos", label: "Todos os Segmentos" },
              { id: "Saúde e Clínicas", label: "Saúde e Clínicas" },
              { id: "B2B e Corporativo", label: "B2B e Corporativo" },
              { id: "Imobiliário e Construção", label: "Imobiliário e Construção" },
              { id: "E-commerce e Varejo", label: "E-commerce e Varejo" },
              { id: "Direito e Advocacia", label: "Direito e Advocacia" },
              { id: "Serviços e Outros", label: "Serviços e Outros" }
            ].map((seg) => {
              const isSelected = selectedSegment === seg.id;
              const count = segmentCounts[seg.id] ?? 0;
              return (
                <button
                  key={seg.id}
                  onClick={() => setSelectedSegment(seg.id)}
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
                    gap: "8px",
                    transition: "all 0.15s ease",
                    boxShadow: isSelected ? "0 0 12px rgba(200, 245, 66, 0.2)" : "none"
                  }}
                >
                  <span>{seg.label}</span>
                  <span style={{
                    background: isSelected ? "var(--obsidiana)" : "var(--ardosia)",
                    color: isSelected ? "var(--sinal)" : "var(--text-secondary)",
                    padding: "1px 7px",
                    borderRadius: "10px",
                    fontSize: "10px",
                    fontWeight: 700
                  }}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Barra de Filtros, Busca e Ordenação */}
        <div style={{
          background: "var(--grafite)",
          border: "1px solid var(--border)",
          padding: "16px 20px",
          borderRadius: "10px",
          display: "flex",
          gap: "16px",
          flexWrap: "wrap",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "24px"
        }}>
          {/* Busca Textual */}
          <div style={{ flex: "1 1 300px", minWidth: "260px", position: "relative" }}>
            <span style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: "var(--text-secondary)", fontSize: "14px" }}>
              🔍
            </span>
            <input
              type="text"
              placeholder="Buscar por empresa, solicitante, ramo, cidade ou e-mail..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: "100%",
                padding: "10px 14px 10px 38px",
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-primary)",
                fontSize: "13px",
                outline: "none"
              }}
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "transparent",
                  border: "none",
                  color: "var(--text-secondary)",
                  cursor: "pointer",
                  fontSize: "12px"
                }}
              >
                ✕
              </button>
            )}
          </div>

          {/* Filtros em Dropdown */}
          <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
            {/* Status */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: "10px 14px",
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-primary)",
                fontSize: "12px",
                fontFamily: "var(--font-mono)"
              }}
            >
              <option value="todos">Status: Todos</option>
              <option value="novo">Status: Novos / Não lidos</option>
              <option value="em_analise">Status: Em Análise</option>
              <option value="proposta_enviada">Status: Proposta Enviada</option>
              <option value="aprovado">Status: Aprovados</option>
              <option value="concluido">Status: Concluídos</option>
            </select>

            {/* Investimento */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              style={{
                padding: "10px 14px",
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                borderRadius: "6px",
                color: "var(--text-primary)",
                fontSize: "12px",
                fontFamily: "var(--font-mono)"
              }}
            >
              <option value="todos">Investimento: Todos</option>
              <option value="600_a_1500">R$ 600 a R$ 1.500</option>
              <option value="1500_a_3000">R$ 1.500 a R$ 3.000</option>
              <option value="3000_a_6000">R$ 3.000 a R$ 6.000</option>
              <option value="6000_a_15000">R$ 6.000 a R$ 15.000</option>
              <option value="acima_15000">Acima de R$ 15.000</option>
            </select>

            {/* Ordenação */}
            <button
              onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
              style={{
                background: "var(--obsidiana)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
                padding: "10px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontFamily: "var(--font-mono)",
                cursor: "pointer"
              }}
            >
              {sortOrder === "desc" ? "↓ Mais Recentes" : "↑ Mais Antigos"}
            </button>
          </div>
        </div>

        {/* Lista de Cards de Briefings */}
        {loading ? (
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "10px",
            padding: "60px 20px",
            textAlign: "center",
            color: "var(--text-secondary)",
            fontFamily: "var(--font-mono)"
          }}>
            <div style={{ fontSize: "24px", marginBottom: "12px" }}>⏳</div>
            Conectando ao Supabase e carregando diagnósticos reais...
          </div>
        ) : filteredBriefings.length === 0 ? (
          <div style={{
            background: "var(--grafite)",
            border: "1px dashed var(--border)",
            borderRadius: "10px",
            padding: "54px 20px",
            textAlign: "center"
          }}>
            <div style={{ fontSize: "36px", marginBottom: "12px" }}>📋</div>
            <h3 style={{ fontFamily: "var(--font-display)", fontSize: "20px", color: "var(--text-primary)" }}>
              Nenhum briefing encontrado para os filtros selecionados
            </h3>
            <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginTop: "6px", maxWidth: "500px", margin: "6px auto 18px" }}>
              Tente selecionar &quot;Todos os Segmentos&quot;, limpar o termo de busca ou resetar os filtros.
            </p>
            <button
              onClick={() => {
                setSelectedSegment("todos");
                setSelectedStatus("todos");
                setSelectedBudget("todos");
                setSearchTerm("");
              }}
              style={{
                background: "var(--sinal)",
                color: "var(--obsidiana)",
                border: "none",
                fontWeight: 700,
                padding: "10px 20px",
                borderRadius: "6px",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                textTransform: "uppercase"
              }}
            >
              Resetar Filtros
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredBriefings.map((b) => {
              const dateObj = new Date(b.created_at);
              const dateFormatted = !isNaN(dateObj.getTime())
                ? dateObj.toLocaleDateString("pt-BR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit"
                  })
                : "Data recente";

              const isNovo = b.status === "novo" || b.status === "recebido";
              const isAnalise = b.status === "em_analise";
              const isProposta = b.status === "proposta_enviada";
              const isAprovado = b.status === "aprovado" || b.status === "concluido";

              const statusBadgeBg = isNovo
                ? "rgba(200, 245, 66, 0.15)"
                : isAnalise
                ? "rgba(234, 179, 8, 0.15)"
                : isProposta
                ? "rgba(56, 189, 248, 0.15)"
                : "rgba(74, 222, 128, 0.15)";

              const statusTextColor = isNovo
                ? "var(--sinal)"
                : isAnalise
                ? "#eab308"
                : isProposta
                ? "#38bdf8"
                : "#4ade80";

              const whatsappDigits = b.telefone_whatsapp.replace(/\D/g, "");
              const whatsappMsg = `Olá ${b.nome_solicitante}, tudo bem? Aqui é o Renato da ARKOS Soluções Digitais. Recebemos o seu briefing da ${b.empresa_nome} e já estruturamos a análise técnica do seu projeto. Quando você tem 10 minutos para conversarmos sobre a proposta?`;

              return (
                <div
                  key={b.id}
                  style={{
                    background: "var(--grafite)",
                    border: isNovo ? "1px solid rgba(200, 245, 66, 0.4)" : "1px solid var(--border)",
                    borderRadius: "10px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    transition: "border-color 0.2s, transform 0.15s",
                    boxShadow: isNovo ? "0 4px 20px rgba(200, 245, 66, 0.05)" : "none"
                  }}
                >
                  {/* Linha Superior: Segmento, Data, Status Dropdown */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                    gap: "12px"
                  }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap", marginBottom: "6px" }}>
                        <span style={{
                          background: "var(--ardosia)",
                          color: "var(--sinal)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          fontWeight: 700,
                          padding: "3px 10px",
                          borderRadius: "4px",
                          border: "1px solid rgba(200, 245, 66, 0.2)"
                        }}>
                          {b.segmento}
                        </span>

                        <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                          📅 {dateFormatted}
                        </span>

                        {b.cidade_estado && (
                          <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                            📍 {b.cidade_estado}
                          </span>
                        )}
                      </div>

                      {/* Nome da Empresa e Solicitante */}
                      <h2 style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "22px",
                        color: "var(--text-primary)",
                        letterSpacing: "-0.01em"
                      }}>
                        {b.empresa_nome}
                      </h2>

                      <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "3px" }}>
                        Solicitante: <strong style={{ color: "var(--text-primary)" }}>{b.nome_solicitante}</strong> {b.cargo_solicitante ? `(${b.cargo_solicitante})` : ""} • Ramo: <span style={{ color: "var(--pergaminho)" }}>{b.ramo_atuacao}</span>
                      </div>
                    </div>

                    {/* Seletor de Status Direto no Card */}
                    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <span style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                        Status:
                      </span>
                      <select
                        value={b.status}
                        disabled={statusUpdatingId === b.id}
                        onChange={(e) => handleUpdateStatus(b.id, e.target.value as Briefing["status"])}
                        style={{
                          background: statusBadgeBg,
                          color: statusTextColor,
                          border: `1px solid ${statusTextColor}`,
                          padding: "6px 12px",
                          borderRadius: "6px",
                          fontSize: "12px",
                          fontFamily: "var(--font-mono)",
                          fontWeight: 700,
                          cursor: "pointer",
                          outline: "none"
                        }}
                      >
                        <option value="novo" style={{ background: "#111318", color: "#c8f542" }}>● Novo Briefing</option>
                        <option value="em_analise" style={{ background: "#111318", color: "#eab308" }}>● Em Análise</option>
                        <option value="proposta_enviada" style={{ background: "#111318", color: "#38bdf8" }}>● Proposta Enviada</option>
                        <option value="aprovado" style={{ background: "#111318", color: "#4ade80" }}>● Aprovado</option>
                        <option value="concluido" style={{ background: "#111318", color: "#94a3b8" }}>● Concluído</option>
                      </select>
                    </div>
                  </div>

                  {/* Resumo do Negócio (UVP Express) */}
                  <div style={{
                    background: "var(--obsidiana)",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    fontSize: "13px",
                    color: "var(--text-primary)",
                    lineHeight: 1.5,
                    borderLeft: "3px solid var(--sinal)"
                  }}>
                    <strong style={{ color: "var(--sinal)", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase", display: "block", marginBottom: "2px" }}>
                      Atuação & Proposta de Valor:
                    </strong>
                    {b.o_que_sua_empresa_faz}
                  </div>

                  {/* Ficha Rápida dos Parâmetros do Projeto */}
                  <div style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                    gap: "10px",
                    background: "rgba(10, 12, 15, 0.6)",
                    border: "1px solid var(--border)",
                    padding: "12px 16px",
                    borderRadius: "6px",
                    fontSize: "12px"
                  }}>
                    <div>
                      <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "11px", fontFamily: "var(--font-mono)" }}>FORMATO:</span>
                      <strong style={{ color: "var(--text-primary)" }}>{b.formato_do_site.replace(/_/g, " ")}</strong>
                    </div>

                    <div>
                      <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "11px", fontFamily: "var(--font-mono)" }}>INVESTIMENTO:</span>
                      <strong style={{ color: "var(--sinal)" }}>{b.faixa_investimento.replace(/_/g, " ")}</strong>
                    </div>

                    <div>
                      <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "11px", fontFamily: "var(--font-mono)" }}>PRAZO DESEJADO:</span>
                      <strong style={{ color: "var(--text-primary)" }}>{b.prazo_desejado.replace(/_/g, " ")}</strong>
                    </div>

                    <div>
                      <span style={{ color: "var(--text-secondary)", display: "block", fontSize: "11px", fontFamily: "var(--font-mono)" }}>RECURSOS & ANEXOS:</span>
                      <strong style={{ color: "var(--text-primary)" }}>
                        {b.recursos_desejados?.length || 0} recurso(s) • {b.arquivos_anexos?.length || 0} anexo(s)
                      </strong>
                    </div>
                  </div>

                  {/* Barra de Ações Rápidas do Gestor */}
                  <div style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "12px",
                    paddingTop: "8px",
                    borderTop: "1px solid var(--border)"
                  }}>
                    {/* Contatos Rápidos */}
                    <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
                      <a
                        href={`https://wa.me/55${whatsappDigits}?text=${encodeURIComponent(whatsappMsg)}`}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          background: "#25D366",
                          color: "#0a0c0f",
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          fontWeight: 700,
                          padding: "8px 16px",
                          borderRadius: "6px",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px",
                          textDecoration: "none",
                          boxShadow: "0 2px 10px rgba(37, 211, 102, 0.25)"
                        }}
                      >
                        💬 WhatsApp ({b.telefone_whatsapp})
                      </a>

                      <a
                        href={`mailto:${b.email_contato}?subject=Proposta%20ARKOS%20Solu%C3%A7%C3%B5es%20Digitais%20-%20${encodeURIComponent(b.empresa_nome)}`}
                        style={{
                          background: "var(--ardosia)",
                          border: "1px solid var(--border)",
                          color: "var(--text-primary)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "12px",
                          padding: "8px 14px",
                          borderRadius: "6px",
                          textDecoration: "none",
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "6px"
                        }}
                      >
                        ✉ {b.email_contato}
                      </a>

                      <button
                        onClick={() => copyDiagnosticSummary(b)}
                        style={{
                          background: "transparent",
                          border: "1px solid var(--border)",
                          color: copyFeedback ? "var(--sinal)" : "var(--text-secondary)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          padding: "8px 12px",
                          borderRadius: "6px",
                          cursor: "pointer"
                        }}
                      >
                        {copyFeedback ? "✓ Copiado!" : "📋 Copiar Resumo"}
                      </button>
                    </div>

                    {/* Botão de Raio-X Detalhado */}
                    <button
                      onClick={() => setActiveModalBriefing(b)}
                      style={{
                        background: "var(--sinal)",
                        color: "var(--obsidiana)",
                        border: "none",
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        fontWeight: 800,
                        padding: "10px 20px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        textTransform: "uppercase",
                        letterSpacing: "0.04em",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "6px",
                        boxShadow: "0 2px 12px rgba(200, 245, 66, 0.2)"
                      }}
                    >
                      🔍 Ver Raio-X Completo →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* MODAL ESTRATÉGICO DE RAIO-X DO BRIEFING */}
      {activeModalBriefing && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalBriefing(null);
          }}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(10px)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px"
          }}
        >
          <div style={{
            background: "var(--grafite)",
            border: "1px solid var(--border)",
            borderRadius: "12px",
            maxWidth: "880px",
            width: "100%",
            maxHeight: "92vh",
            overflowY: "auto",
            padding: "32px",
            display: "flex",
            flexDirection: "column",
            gap: "24px",
            boxShadow: "0 25px 60px rgba(0,0,0,0.8)"
          }}>
            {/* Topo do Modal */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              borderBottom: "1px solid var(--border)",
              paddingBottom: "18px"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                  <span style={{ background: "var(--ardosia)", color: "var(--sinal)", fontSize: "11px", fontFamily: "var(--font-mono)", fontWeight: 700, padding: "3px 10px", borderRadius: "4px" }}>
                    {activeModalBriefing.segmento}
                  </span>
                  <span style={{ fontSize: "11px", color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}>
                    ID: {activeModalBriefing.id}
                  </span>
                </div>

                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "26px", color: "var(--text-primary)" }}>
                  {activeModalBriefing.empresa_nome}
                </h2>

                <div style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "4px" }}>
                  Solicitante: <strong style={{ color: "var(--text-primary)" }}>{activeModalBriefing.nome_solicitante}</strong> ({activeModalBriefing.cargo_solicitante || "Decisor"}) • {activeModalBriefing.email_contato} • {activeModalBriefing.telefone_whatsapp}
                </div>
              </div>

              <button
                onClick={() => setActiveModalBriefing(null)}
                style={{
                  background: "var(--ardosia)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                  borderRadius: "6px",
                  cursor: "pointer",
                  padding: "6px 12px",
                  fontSize: "14px",
                  fontWeight: 700
                }}
              >
                ✕
              </button>
            </div>

            {/* Barra de Status e Ações do Modal */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              background: "var(--obsidiana)",
              padding: "12px 18px",
              borderRadius: "8px",
              border: "1px solid var(--border)"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)" }}>
                  Alterar Status no Banco:
                </span>
                <select
                  value={activeModalBriefing.status}
                  onChange={(e) => handleUpdateStatus(activeModalBriefing.id, e.target.value as Briefing["status"])}
                  style={{
                    background: "var(--grafite)",
                    border: "1px solid var(--border)",
                    color: "var(--sinal)",
                    padding: "6px 12px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700
                  }}
                >
                  <option value="novo">● Novo Briefing</option>
                  <option value="em_analise">● Em Análise Técnica</option>
                  <option value="proposta_enviada">● Proposta Enviada</option>
                  <option value="aprovado">● Aprovado</option>
                  <option value="concluido">● Concluído</option>
                </select>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => copyDiagnosticSummary(activeModalBriefing)}
                  style={{
                    background: "var(--ardosia)",
                    border: "1px solid var(--border)",
                    color: copyFeedback ? "var(--sinal)" : "var(--text-primary)",
                    padding: "6px 12px",
                    borderRadius: "4px",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    cursor: "pointer"
                  }}
                >
                  {copyFeedback ? "✓ Resumo Copiado!" : "📋 Copiar Raio-X"}
                </button>
              </div>
            </div>

            {/* Conteúdo Estratégico Dividido em Seções do Método ARKOS */}
            <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              
              {/* Bloco 1: UVP & Modelo */}
              <div>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  1. Sobre a Empresa & Proposta Única de Valor (UVP)
                </h3>
                <div style={{ background: "var(--obsidiana)", padding: "14px", borderRadius: "6px", fontSize: "13px", lineHeight: 1.6 }}>
                  <p style={{ color: "var(--text-primary)" }}>{activeModalBriefing.o_que_sua_empresa_faz}</p>
                  
                  {(activeModalBriefing.diferencial_competitivo || activeModalBriefing.por_que_o_cliente_escolhe_voce) && (
                    <div style={{ marginTop: "10px", background: "rgba(200, 245, 66, 0.06)", border: "1px solid rgba(200, 245, 66, 0.2)", padding: "10px 12px", borderRadius: "4px", color: "var(--text-primary)" }}>
                      <strong style={{ color: "var(--sinal)" }}>Diferencial Competitivo: </strong>
                      {activeModalBriefing.diferencial_competitivo || activeModalBriefing.por_que_o_cliente_escolhe_voce}
                    </div>
                  )}

                  <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginTop: "10px", color: "var(--text-secondary)", fontSize: "12px" }}>
                    <div><strong>Modelo de Receita:</strong> {activeModalBriefing.como_sua_empresa_ganha_dinheiro}</div>
                    {activeModalBriefing.website_atual && <div><strong>Site Atual:</strong> {activeModalBriefing.website_atual}</div>}
                  </div>
                </div>
              </div>

              {/* Bloco 2: Persona, Dores & Objeções */}
              <div>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  2. Persona, Dores & Psicologia de Compra
                </h3>
                <div style={{ background: "var(--obsidiana)", padding: "14px", borderRadius: "6px", fontSize: "13px", lineHeight: 1.6, display: "flex", flexDirection: "column", gap: "8px" }}>
                  <div>
                    <strong style={{ color: "var(--text-primary)" }}>Cliente Ideal (Persona): </strong>
                    <span style={{ color: "var(--text-secondary)" }}>{activeModalBriefing.quem_e_seu_cliente_ideal}</span>
                  </div>

                  {activeModalBriefing.principal_dor_do_seu_cliente && (
                    <div>
                      <strong style={{ color: "#eab308" }}>Principal Dor Resolvida: </strong>
                      <span style={{ color: "var(--text-secondary)" }}>{activeModalBriefing.principal_dor_do_seu_cliente}</span>
                    </div>
                  )}

                  {activeModalBriefing.maior_objecao_ou_duvida_cliente && (
                    <div>
                      <strong style={{ color: "#38bdf8" }}>Maior Objeção do Cliente: </strong>
                      <span style={{ color: "var(--text-secondary)" }}>{activeModalBriefing.maior_objecao_ou_duvida_cliente}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bloco 3: Arquitetura do Site & Recursos */}
              <div>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  3. Arquitetura do Site & Conversão
                </h3>
                <div style={{ background: "var(--obsidiana)", padding: "14px", borderRadius: "6px", fontSize: "13px" }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "10px", marginBottom: "12px" }}>
                    <div><span style={{ color: "var(--text-secondary)" }}>Formato:</span> <strong style={{ color: "var(--text-primary)" }}>{activeModalBriefing.formato_do_site}</strong></div>
                    <div><span style={{ color: "var(--text-secondary)" }}>Páginas:</span> <strong style={{ color: "var(--text-primary)" }}>{activeModalBriefing.numero_estimado_paginas}</strong></div>
                    <div><span style={{ color: "var(--text-secondary)" }}>Ação Principal:</span> <strong style={{ color: "var(--sinal)" }}>{activeModalBriefing.acao_principal_desejada}</strong></div>
                    <div><span style={{ color: "var(--text-secondary)" }}>Estilo Visual:</span> <strong style={{ color: "var(--text-primary)" }}>{activeModalBriefing.estilo_visual_preferido}</strong></div>
                  </div>

                  {activeModalBriefing.recursos_desejados && activeModalBriefing.recursos_desejados.length > 0 && (
                    <div>
                      <div style={{ fontSize: "11px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", marginBottom: "6px" }}>
                        RECURSOS SELECIONADOS:
                      </div>
                      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                        {activeModalBriefing.recursos_desejados.map((rec) => (
                          <span key={rec} style={{ background: "var(--ardosia)", color: "var(--sinal)", padding: "3px 10px", borderRadius: "4px", fontSize: "11px", fontFamily: "var(--font-mono)" }}>
                            ✓ {rec}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeModalBriefing.outros_sistemas_para_integrar && (
                    <div style={{ marginTop: "10px", color: "var(--text-secondary)", fontSize: "12px" }}>
                      <strong>Integrações Desejadas:</strong> {activeModalBriefing.outros_sistemas_para_integrar}
                    </div>
                  )}
                </div>
              </div>

              {/* Bloco 4: Referências e Links */}
              {activeModalBriefing.links_de_sites_que_voce_gosta && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                    4. Referências & Concorrentes Citados
                  </h3>
                  <div style={{ background: "var(--obsidiana)", padding: "14px", borderRadius: "6px", fontSize: "12px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                      {activeModalBriefing.links_de_sites_que_voce_gosta.split(",").map((link, idx) => {
                        const trimmed = link.trim();
                        if (!trimmed) return null;
                        return (
                          <a
                            key={idx}
                            href={trimmed.startsWith("http") ? trimmed : `https://${trimmed}`}
                            target="_blank"
                            rel="noreferrer"
                            style={{ color: "var(--sinal)", textDecoration: "underline", wordBreak: "break-all" }}
                          >
                            🔗 {trimmed}
                          </a>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Bloco 4b: Anexos Enviados pelo Cliente */}
              {activeModalBriefing.arquivos_anexos && activeModalBriefing.arquivos_anexos.length > 0 && (
                <div>
                  <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                    Anexos do Cliente ({activeModalBriefing.arquivos_anexos.length})
                  </h3>
                  <div style={{ background: "var(--obsidiana)", padding: "14px", borderRadius: "6px", fontSize: "13px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {activeModalBriefing.arquivos_anexos.map((anexo, idx) => (
                      <div key={idx} style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        background: "var(--grafite)",
                        border: "1px solid var(--border)",
                        borderRadius: "4px",
                        padding: "8px 12px",
                        gap: "10px"
                      }}>
                        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "var(--text-primary)" }}>
                          📎 {anexo.name}
                        </span>
                        {anexo.url ? (
                          <a
                            href={anexo.url}
                            target="_blank"
                            rel="noreferrer"
                            style={{
                              background: "var(--sinal)",
                              color: "var(--obsidiana)",
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              fontWeight: 700,
                              padding: "5px 12px",
                              borderRadius: "4px",
                              textDecoration: "none",
                              whiteSpace: "nowrap"
                            }}
                          >
                            ⬇ Baixar
                          </a>
                        ) : (
                          <span style={{ fontSize: "11px", color: "var(--text-secondary)", whiteSpace: "nowrap" }}>indisponível</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Bloco 5: Viabilidade & Observações */}
              <div>
                <h3 style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "var(--sinal)", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>
                  5. Investimento, Prazo & Critério de Sucesso
                </h3>
                <div style={{ background: "var(--obsidiana)", padding: "14px", borderRadius: "6px", fontSize: "13px", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "10px" }}>
                  <div><span style={{ color: "var(--text-secondary)" }}>Investimento Estimado:</span> <strong style={{ color: "var(--sinal)" }}>{activeModalBriefing.faixa_investimento.replace(/_/g, " ")}</strong></div>
                  <div><span style={{ color: "var(--text-secondary)" }}>Prazo Desejado:</span> <strong style={{ color: "var(--text-primary)" }}>{activeModalBriefing.prazo_desejado.replace(/_/g, " ")}</strong></div>
                  {activeModalBriefing.observacoes_finais && (
                    <div style={{ gridColumn: "1 / -1", marginTop: "6px", color: "var(--text-primary)", background: "var(--grafite)", padding: "10px", borderRadius: "4px", fontSize: "12px" }}>
                      <strong style={{ color: "var(--sinal)" }}>Observações do Solicitante: </strong>
                      {activeModalBriefing.observacoes_finais}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Rodapé do Modal com Ações */}
            <div style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "12px",
              borderTop: "1px solid var(--border)",
              paddingTop: "18px"
            }}>
              <a
                href={`https://wa.me/55${activeModalBriefing.telefone_whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                style={{
                  background: "#25D366",
                  color: "#0a0c0f",
                  padding: "10px 18px",
                  borderRadius: "6px",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 700,
                  fontSize: "12px",
                  textDecoration: "none"
                }}
              >
                💬 Chamar no WhatsApp
              </a>

              <button
                onClick={() => setActiveModalBriefing(null)}
                style={{
                  background: "var(--sinal)",
                  color: "var(--obsidiana)",
                  fontWeight: 800,
                  padding: "10px 24px",
                  borderRadius: "6px",
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

      {/* Rodapé Institucional */}
      <footer style={{
        background: "var(--grafite)",
        borderTop: "1px solid var(--border)",
        padding: "20px 24px",
        textAlign: "center",
        fontSize: "12px",
        fontFamily: "var(--font-mono)",
        color: "var(--text-secondary)",
        marginTop: "auto"
      }}>
        ARKOS Soluções Digitais • Painel do Gestor • Gestão Segura com Supabase PostgreSQL
      </footer>
    </div>
  );
}
