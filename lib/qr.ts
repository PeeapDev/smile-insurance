import QRCode from "qrcode"

export type QrFormat = "png" | "svg" | "terminal"

type QrOptions = {
  margin?: number
  width?: number
  color?: {
    dark?: string
    light?: string
  }
}

export async function generateQrDataUrl(text: string, opts?: QrOptions) {
  return QRCode.toDataURL(text, {
    margin: opts?.margin ?? 1,
    width: opts?.width ?? 256,
    color: {
      dark: opts?.color?.dark ?? "#000000",
      light: opts?.color?.light ?? "#ffffff",
    },
  })
}

export async function generateQrSvg(text: string, opts?: QrOptions) {
  return QRCode.toString(text, {
    type: "svg",
    margin: opts?.margin ?? 1,
    width: opts?.width ?? 256,
    color: {
      dark: opts?.color?.dark ?? "#000000",
      light: opts?.color?.light ?? "#ffffff",
    },
  })
}

export function buildVerificationUrl(type: "user" | "staff" | "policy", id: string) {
  if (typeof window !== "undefined") {
    const base = window.location.origin
    return `${base}/verify/${type}/${id}`
  }
  // server-side fallback (adjust if you have known base URL in env)
  return `/verify/${type}/${id}`
}
