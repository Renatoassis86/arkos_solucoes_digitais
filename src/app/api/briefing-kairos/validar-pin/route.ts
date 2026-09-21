import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    const pinLimpo = String(pin || "").trim();

    if (!pinLimpo) {
      return NextResponse.json({ success: true, valido: false });
    }

    const { data, error } = await supabaseServer
      .from("kairos_briefing_pins")
      .select("id, respondido")
      .eq("pin", pinLimpo)
      .maybeSingle();

    if (error) {
      console.error("Supabase validar-pin error:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    if (!data) {
      return NextResponse.json({ success: true, valido: false });
    }

    return NextResponse.json({ success: true, valido: true, jaRespondido: data.respondido });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro ao validar código";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
