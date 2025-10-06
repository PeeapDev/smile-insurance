import { NextRequest, NextResponse } from "next/server"
import { MonimeClient, type MonimeConfig } from "@/lib/monime"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const cfg: MonimeConfig = {
      apiBase: body.apiBase || process.env.MONIME_API_BASE || "https://api.monime.io",
      apiKey: body.apiKey || process.env.MONIME_API_KEY || "",
      spaceId: body.spaceId || process.env.MONIME_SPACE_ID || "",
      apiVersion: body.apiVersion || process.env.MONIME_API_VERSION || undefined,
    }

    if (!cfg.apiKey) {
      return NextResponse.json({ error: "Missing API key" }, { status: 400 })
    }

    const client = new MonimeClient(cfg)
    const result = await client.ping()
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
