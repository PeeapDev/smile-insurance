export type SmtpConfig = {
  host: string
  port: number
  user: string
  pass: string
  from: string
  useTLS: boolean
}

export function getSmtpConfig(): SmtpConfig | null {
  try {
    const cfg = {
      host: localStorage.getItem("smtpHost") || "",
      port: Number(localStorage.getItem("smtpPort") || 587),
      user: localStorage.getItem("smtpUser") || "",
      pass: localStorage.getItem("smtpPass") || "",
      from: localStorage.getItem("fromEmail") || "no-reply@example.com",
      useTLS: (localStorage.getItem("useTLS") || "true") === "true",
    }
    return cfg
  } catch {
    return null
  }
}

// Demo sender: logs to console and returns success. Replace with real API/SMTP.
export async function sendEmail(to: string, subject: string, html: string) {
  const cfg = getSmtpConfig()
  console.info("[DEMO EMAIL]", { to, subject, html, cfg })
  await new Promise((r) => setTimeout(r, 400))
  return { ok: true }
}

export async function sendStaffWelcome(to: string, name: string, role: string) {
  const subject = `Welcome to SMILE Insurance — ${role}`
  const html = `
    <div style="font-family:sans-serif">
      <h2>Welcome, ${name}</h2>
      <p>Your staff account has been created with the role: <b>${role}</b>.</p>
      <p>Login URL: <a href="/login">/login</a></p>
    </div>
  `
  return sendEmail(to, subject, html)
}
