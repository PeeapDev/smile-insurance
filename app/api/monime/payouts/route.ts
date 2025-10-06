import { NextRequest, NextResponse } from "next/server"
import { MonimeClient } from "@/lib/monime"

function idempotency() {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random()}`
  }
}

export async function GET() {
  try {
    const client = new MonimeClient()
    const result = await client.request<any>("/v1/payouts", { method: "GET" })
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    // Optional override config for testing from client (Payments page); prefer env in production
    const cfg = {
      apiBase: body.apiBase || process.env.MONIME_API_BASE || "https://api.monime.io",
      apiKey: body.apiKey || process.env.MONIME_API_KEY || "",
      spaceId: body.spaceId || process.env.MONIME_SPACE_ID || "",
      apiVersion: body.apiVersion || process.env.MONIME_API_VERSION || undefined,
    }
    const client = new MonimeClient(cfg)
    // Pass-through create payload to Monime. Ensure server has MONIME_* env set.
    const result = await client.request<any>("/v1/payouts", {
      method: "POST",
      // Strip any client config props from body before forwarding
      body: JSON.stringify({
        amount: body?.amount,
        destination: body?.destination,
        source: body?.source,
        metadata: body?.metadata,
      }),
      idempotencyKey: idempotency(),
    })
    return NextResponse.json(result)
  } catch (err: any) {
    return NextResponse.json({ error: err?.message || String(err) }, { status: 500 })
  }
}
