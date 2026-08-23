import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabaseServer";

const BUCKET = "briefing-anexos";
const MAX_SIZE = 20 * 1024 * 1024;

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");
    const sessionId = String(formData.get("sessionId") || "sem-sessao");

    if (!(file instanceof File)) {
      return NextResponse.json({ success: false, error: "Nenhum arquivo enviado" }, { status: 400 });
    }
    if (file.size > MAX_SIZE) {
      return NextResponse.json({ success: false, error: "Arquivo maior que 20MB" }, { status: 400 });
    }

    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = `${sessionId}/${Date.now()}-${safeName}`;

    const { error } = await supabaseServer.storage
      .from(BUCKET)
      .upload(path, file, { contentType: file.type || "application/octet-stream" });

    if (error) {
      console.error("Upload de anexo falhou:", error);
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true, path, name: file.name });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Erro desconhecido ao enviar anexo";
    console.error("POST briefing/upload exception:", err);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
