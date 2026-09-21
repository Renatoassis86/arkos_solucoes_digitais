import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

// Devolve também a resposta já salva pra esse PIN (se houver), pra o
// formulário carregar de onde a pessoa parou. Um PIN nunca "trava" depois
// de usado — pode ser reaberto e atualizado quantas vezes for preciso.
export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    const pinLimpo = String(pin || "").trim();

    if (!pinLimpo) {
      return NextResponse.json({ success: true, valido: false });
    }

    const { data: pinRow, error: pinErr } = await supabaseServer
      .from("kairos_briefing_pins")
      .select("id")
      .eq("pin", pinLimpo)
      .maybeSingle();

    if (pinErr) {
      console.error("Supabase validar-pin error:", pinErr);
      return NextResponse.json({ success: false, error: pinErr.message }, { status: 500 });
    }

    if (!pinRow) {
      return NextResponse.json({ success: true, valido: false });
    }

    const { data: resposta, error: respErr } = await supabaseServer
      .from("kairos_briefing_respostas")
      .select("*")
      .eq("pin_id", pinRow.id)
      .maybeSingle();

    if (respErr) {
      console.error("Supabase validar-pin (resposta) error:", respErr);
      return NextResponse.json({ success: false, error: respErr.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, valido: true, dadosSalvos: resposta || null });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao validar código";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
