import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const { data: pins, error: pinsErr } = await supabaseServer
      .from("kairos_briefing_pins")
      .select("*")
      .order("created_at", { ascending: true });

    if (pinsErr) {
      console.error("Supabase GET pins error:", pinsErr);
      return NextResponse.json({ success: false, error: pinsErr.message }, { status: 500 });
    }

    const { data: respostas, error: respErr } = await supabaseServer
      .from("kairos_briefing_respostas")
      .select("*");

    if (respErr) {
      console.error("Supabase GET respostas error:", respErr);
      return NextResponse.json({ success: false, error: respErr.message }, { status: 500 });
    }

    const respostasPorPin = new Map((respostas ?? []).map((r) => [r.pin_id, r]));
    const linhas = (pins ?? []).map((p) => ({
      ...p,
      resposta: respostasPorPin.get(p.id) ?? null,
    }));

    return NextResponse.json({ success: true, count: linhas.length, pins: linhas });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro interno ao buscar briefing Kairós";
    console.error("GET briefing-kairos exception:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
