export type MonimeConfig = {
  apiBase: string
  apiKey: string
  spaceId: string
  apiVersion?: string
}

export function getMonimeConfig(): MonimeConfig {
  const apiBase = process.env.MONIME_API_BASE || "https://api.monime.io"
  const apiKey = process.env.MONIME_API_KEY || ""
  const spaceId = process.env.MONIME_SPACE_ID || ""
  const apiVersion = process.env.MONIME_API_VERSION || undefined
  return { apiBase, apiKey, spaceId, apiVersion }
}

export class MonimeClient {
  private cfg: MonimeConfig
  constructor(cfg: MonimeConfig = getMonimeConfig()) {
    this.cfg = cfg
  }

  private headers(extra?: Record<string, string>) {
    const h: Record<string, string> = {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${this.cfg.apiKey}`,
    }
    if (this.cfg.spaceId) h["Monime-Space-Id"] = this.cfg.spaceId
    if (this.cfg.apiVersion) h["Monime-Version"] = this.cfg.apiVersion
    return { ...h, ...(extra || {}) }
  }

  async request<T>(path: string, init?: RequestInit & { idempotencyKey?: string }): Promise<T> {
    const url = `${this.cfg.apiBase}${path}`
    const headers = this.headers(
      init?.idempotencyKey ? { "Idempotency-Key": init.idempotencyKey } : undefined,
    )
    const res = await fetch(url, { ...init, headers })
    if (!res.ok) {
      const text = await res.text().catch(() => "")
      throw new Error(`Monime error ${res.status}: ${text}`)
    }
    return (await res.json()) as T
  }

  // Connectivity check using Quick Token Test from docs
  ping() {
    return this.request<any>("/")
  }
}
