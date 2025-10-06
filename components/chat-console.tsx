"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import type React from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { cn } from "@/lib/utils"
import { Paperclip, Plus } from "lucide-react"

export type ChatConsoleProps = {
  currentUserEmail: string
  role?: "admin" | "staff"
}

type Message = {
  id: string
  at: string // ISO
  from: string
  to: string
  text: string
  deliveredAt?: string
  readAt?: string
  attachmentId?: string
}

type Person = { name: string; email: string; company?: string; username: string }

function normalizeKey(a: string, b: string) {
  const [x, y] = [a.toLowerCase(), b.toLowerCase()].sort()
  return `dm:${x}:${y}`
}

function loadThread(a: string, b: string): Message[] {
  try {
    const raw = localStorage.getItem(normalizeKey(a, b))
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function saveThread(a: string, b: string, msgs: Message[]) {
  try { localStorage.setItem(normalizeKey(a, b), JSON.stringify(msgs)) } catch {}
}

function slugify(s: string) {
  return (s || "").toLowerCase().trim().replace(/[^a-z0-9]+/g, " ").trim().replace(/\s+/g, "-")
}

function deriveUsername(name: string, company?: string) {
  const first = (name || "").split(" ")[0] || "user"
  const org = company ? slugify(company).replace(/-/g, "") : "smile"
  return `${first.toLowerCase()}@${org || "smile"}`
}

function resolveUsername(email: string, name: string, company?: string) {
  try {
    const saved = localStorage.getItem(`username:${email}`)
    if (saved) return saved
  } catch {}
  return deriveUsername(name, company)
}

function loadRoster(): Person[] {
  try {
    const keys = ["staff_directory", "staffDirectory", "demo_staff_directory"]
    let list: any[] = []
    for (const k of keys) {
      const raw = localStorage.getItem(k)
      if (!raw) continue
      try { const arr = JSON.parse(raw); if (Array.isArray(arr)) { list = arr; break } } catch {}
    }
    if (!list.length) {
      list = [
        { name: "Sarah Johnson", email: "sarah.johnson@example.com", company: "TechCorp Inc." },
        { name: "Michael Chen", email: "michael.chen@example.com", company: "Global Manufacturing" },
      ]
    }
    return list.map((x) => ({ name: x.name, email: x.email, company: x.company, username: resolveUsername(x.email, x.name, x.company) }))
  } catch { return [] }
}

export function ChatConsole({ currentUserEmail, role }: ChatConsoleProps) {
  const [roster, setRoster] = useState<Person[]>([])
  const [partner, setPartner] = useState<Person | null>(null)
  const [text, setText] = useState("")
  const [messages, setMessages] = useState<Message[]>([])
  const listRef = useRef<HTMLDivElement | null>(null)
  const [query, setQuery] = useState("")
  const [showPicker, setShowPicker] = useState(false)
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [filesRepoVersion, setFilesRepoVersion] = useState(0)

  useEffect(() => {
    let r = loadRoster()
    // Ensure current user exists for demo threads
    const existsMe = r.some((p) => p.email.toLowerCase() === currentUserEmail.toLowerCase())
    if (!existsMe) r = [{ name: "You", email: currentUserEmail, username: resolveUsername(currentUserEmail, "You", "smile") }, ...r]
    // Ensure admin contact is visible to staff users
    if (role === "staff") {
      const adminEmail = (typeof window !== "undefined" ? localStorage.getItem("admin_user_email") : null) || "admin@example.com"
      const hasAdmin = r.some((p) => p.email.toLowerCase() === adminEmail.toLowerCase())
      if (!hasAdmin) r = [{ name: "Admin", email: adminEmail, username: "admin@smile" }, ...r]
    }
    setRoster(r)
  }, [currentUserEmail])

  useEffect(() => {
    if (!partner) return
    const msgs = loadThread(currentUserEmail, partner.email)
    setMessages(msgs)
  }, [currentUserEmail, partner?.email])

  function send() {
    if (!partner) return
    const attachId = (typeof window !== "undefined" ? localStorage.getItem("files:lastAttachmentId") : null) || undefined
    const trimmed = text.trim()
    if (!trimmed && !attachId) return
    const now = new Date().toISOString()
    const next: Message = { id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`, at: now, from: currentUserEmail, to: partner.email, text: trimmed, attachmentId: attachId }
    const thread = [...messages, next]
    setMessages(thread)
    saveThread(currentUserEmail, partner.email, thread)
    setText("")
    try { localStorage.removeItem("files:lastAttachmentId") } catch {}
    // Notify other tabs and listeners
    try {
      window.dispatchEvent(new CustomEvent("dm:new", { detail: { from: currentUserEmail, to: partner.email } }))
    } catch {}
  }

  const others = useMemo(() => roster.filter((p) => p.email.toLowerCase() !== currentUserEmail.toLowerCase()), [roster, currentUserEmail])
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return others
    return others.filter((p) => p.name.toLowerCase().includes(q) || p.username.toLowerCase().includes(q))
  }, [others, query])

  // Refresh thread when storage changes or when a dm:new event fires
  useEffect(() => {
    function onStorage(e: StorageEvent) {
      if (!partner) return
      const key = normalizeKey(currentUserEmail, partner.email)
      if (e.key === key) {
        const t = loadThread(currentUserEmail, partner.email)
        setMessages(t)
      }
    }
    function onNew(ev: Event) {
      const d = (ev as CustomEvent).detail || {}
      // Mark delivered for any messages addressed to me in the related thread
      const other = d.from === currentUserEmail ? d.to : d.from
      if (!other) return
      const key = normalizeKey(currentUserEmail, other)
      const t = loadThread(currentUserEmail, other)
      let changed = false
      const now = new Date().toISOString()
      for (const m of t) {
        if (m.to === currentUserEmail && !m.deliveredAt) { m.deliveredAt = now; changed = true }
      }
      if (changed) saveThread(currentUserEmail, other, t)
      if (partner && (other === partner.email)) setMessages(loadThread(currentUserEmail, partner.email))
      // Desktop notification + sound if message is to me and not currently focused on that partner
      const last = t[t.length - 1]
      if (last && last.to === currentUserEmail) {
        const focusedOnPartner = !!partner && partner.email === last.from
        if (!focusedOnPartner || document.hidden) {
          tryNotify(`${last.from}`, last.text)
          playBeep()
        }
      }
    }
    window.addEventListener("storage", onStorage)
    window.addEventListener("dm:new", onNew as any)
    return () => {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener("dm:new", onNew as any)
    }
  }, [currentUserEmail, partner?.email])

  // Unread indicator per partner using last-read timestamps
  function readKey(me: string, them: string) { return `dmread:${me.toLowerCase()}:${them.toLowerCase()}` }
  function markRead(me: string, them: string) { try { localStorage.setItem(readKey(me, them), new Date().toISOString()) } catch {} }
  function lastRead(me: string, them: string) { try { return localStorage.getItem(readKey(me, them)) || "" } catch { return "" } }
  useEffect(() => {
    if (partner) {
      // Mark last-read timestamp for unread badge logic
      markRead(currentUserEmail, partner.email)
      // Mark read receipts for incoming messages from partner
      const t = loadThread(currentUserEmail, partner.email)
      let changed = false
      const now = new Date().toISOString()
      for (const m of t) {
        if (m.from === partner.email && !m.readAt) { m.readAt = now; changed = true }
      }
      if (changed) {
        saveThread(currentUserEmail, partner.email, t)
        setMessages(t)
        try { window.dispatchEvent(new CustomEvent("dm:read", { detail: { with: partner.email, by: currentUserEmail } })) } catch {}
      }
    }
  }, [currentUserEmail, partner?.email, messages.length])

  function unreadCount(p: Person) {
    const thread = loadThread(currentUserEmail, p.email)
    if (thread.length === 0) return 0
    const lr = lastRead(currentUserEmail, p.email)
    let c = 0
    for (const m of thread) {
      if (m.from === p.email && (!lr || new Date(m.at) > new Date(lr))) c++
    }
    return c
  }

  function hasUnread(p: Person) { return unreadCount(p) > 0 }

  // Compute and publish total unread for sidebar badges
  useEffect(() => {
    const total = others.reduce((acc, p) => acc + unreadCount(p), 0)
    try { localStorage.setItem("dm:unread_total", String(total)) } catch {}
    try { window.dispatchEvent(new CustomEvent("dm:unread-total", { detail: { total } })) } catch {}
  }, [messages, roster, partner?.email, currentUserEmail])

  return (
    <div className="grid md:grid-cols-[260px_1fr] gap-4 min-h-[520px]">
      {/* Roster */}
      <Card className="p-2">
        <div className="text-sm font-medium px-2 py-1">People</div>
        <div className="px-2 pb-2">
          <Input placeholder="Search name or email" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
        <ScrollArea className="h-[460px]">
          <div className="space-y-1">
            {filtered.map((p) => (
              <button
                key={p.email}
                className={cn(
                  "w-full text-left px-2 py-2 rounded hover:bg-muted",
                  partner?.email === p.email && "bg-muted"
                )}
                onClick={() => setPartner(p)}
              >
                <div className="font-medium text-sm">{p.username}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-2">
                  <span>{p.name}</span>
                  {hasUnread(p) && (
                    <span className="ml-auto inline-flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] px-1.5 min-w-[16px] h-4" aria-label="unread-count">{unreadCount(p)}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </ScrollArea>
      </Card>

      {/* Thread */}
      <Card className="p-0 flex flex-col">
        <div className="border-b px-4 py-2 text-sm font-medium">
          {partner ? partner.name : "Select a conversation"}
        </div>
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-3">
            {messages.map((m) => (
              <div key={m.id} className={cn("flex", m.from === currentUserEmail ? "justify-end" : "justify-start")}>
                <div className={cn("max-w-[70%] rounded px-3 py-2 text-sm", m.from === currentUserEmail ? "bg-blue-600 text-white" : "bg-muted")}>
                  <div>{m.text}</div>
                  {m.attachmentId && (() => {
                    const f = getFileById(m.attachmentId)
                    if (!f) return null
                    return (
                      <a className={cn("mt-2 inline-block text-xs underline", m.from === currentUserEmail ? "text-blue-100" : "text-foreground")} href={f.url} download={f.name} target="_blank" rel="noreferrer">
                        Attachment: {f.name}
                      </a>
                    )
                  })()}
                  <div className="flex items-center gap-2 mt-1">
                    <span className={cn("text-[10px] opacity-70", m.from === currentUserEmail ? "text-blue-100" : "text-foreground/60")}>{new Date(m.at).toLocaleString()}</span>
                    {m.from === currentUserEmail && (
                      <span className={cn("text-[10px]", m.readAt ? "text-blue-300" : "text-foreground/60")}
                        title={m.readAt ? `Read ${new Date(m.readAt).toLocaleString()}` : m.deliveredAt ? `Delivered ${new Date(m.deliveredAt).toLocaleString()}` : "Sent"}
                      >
                        {m.readAt ? "✓✓" : m.deliveredAt ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="border-t px-3 py-2 flex gap-2 items-center relative">
          <Button variant="outline" size="icon" onClick={() => setShowPicker((s) => !s)} aria-label="Add attachment" className="rounded-full"><Plus className="h-4 w-4"/></Button>
          {showPicker && (
            <div className="absolute bottom-12 left-3 z-10 rounded border bg-background shadow p-2 w-64">
              <div className="text-xs mb-2">Attach</div>
              <div className="space-y-1">
                <Button variant="ghost" className="w-full justify-start" onClick={() => fileInputRef.current?.click()}>Upload from computer</Button>
                <Button variant="ghost" className="w-full justify-start" onClick={() => { openFileSelectFromRepo(partner?.email || "") }}>File from Files</Button>
              </div>
            </div>
          )}
          <input ref={fileInputRef} type="file" className="hidden" onChange={(e) => onUploadFile(e, setFilesRepoVersion)} />
          {(() => {
            const attachId = (typeof window !== "undefined" ? localStorage.getItem("files:lastAttachmentId") : null) || undefined
            if (!attachId) return null
            const f = getFileById(attachId)
            if (!f) return null
            return (
              <div className="text-xs border rounded px-2 py-1 flex items-center gap-2 max-w-[40%] truncate" title={f.name}>
                <span className="truncate">{f.name}</span>
                <button className="text-muted-foreground hover:text-foreground" onClick={() => { try { localStorage.removeItem("files:lastAttachmentId") } catch {} ; setFilesRepoVersion((v) => v + 1) }}>✕</button>
              </div>
            )
          })()}
          <Input placeholder="Type a message" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter") send() }} />
          <Button onClick={send}>Send</Button>
        </div>
      </Card>
    </div>
  )
}

// ===== Notification + Sound =====
function tryNotify(title: string, body: string) {
  try {
    if (typeof window === "undefined" || typeof Notification === "undefined") return
    if (Notification.permission === "granted") new Notification(title, { body })
    else if (Notification.permission !== "denied") Notification.requestPermission().then((p) => { if (p === "granted") new Notification(title, { body }) })
  } catch {}
}

function playBeep() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)()
    const o = ctx.createOscillator(); const g = ctx.createGain(); o.type = "sine"; o.frequency.value = 880; o.connect(g); g.connect(ctx.destination); g.gain.setValueAtTime(0.001, ctx.currentTime); g.gain.exponentialRampToValueAtTime(0.05, ctx.currentTime + 0.01); o.start();
    setTimeout(() => { g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.1); o.stop(ctx.currentTime + 0.12) }, 120)
  } catch {}
}

// ===== Simple Files Repository (localStorage) =====
type RepoFile = { id: string; name: string; folder: string; mime: string; dataUrl: string; createdAt: string }

function repoList(): RepoFile[] {
  try { const raw = localStorage.getItem("files:repo"); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : [] } catch { return [] }
}
function repoSave(items: RepoFile[]) { try { localStorage.setItem("files:repo", JSON.stringify(items)) } catch {} }
function addFileToRepo(name: string, folder: string, mime: string, dataUrl: string): RepoFile {
  const f: RepoFile = { id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`, name, folder, mime, dataUrl, createdAt: new Date().toISOString() }
  const items = repoList(); items.push(f); repoSave(items); return f
}
function getFileById(id: string): { name: string; url: string } | null {
  const f = repoList().find((x) => x.id === id)
  if (!f) return null
  return { name: f.name, url: f.dataUrl }
}

function onUploadFile(e: React.ChangeEvent<HTMLInputElement>, bump: React.Dispatch<React.SetStateAction<number>>) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = () => {
    const dataUrl = String(reader.result || "")
    addFileToRepo(file.name, inferFolder(file.name), file.type || "application/octet-stream", dataUrl)
    bump((v) => (typeof v === 'number' ? v + 1 : 1))
  }
  reader.readAsDataURL(file)
  e.currentTarget.value = ""
}

function inferFolder(name: string) {
  const n = name.toLowerCase()
  if (n.includes("quote") || n.endsWith(".pdf")) return "quotes"
  return "general"
}

function openFileSelectFromRepo(peerEmail: string) {
  const items = repoList()
  const pick = prompt("Type filename to attach (e.g., quote.pdf). Available: \n" + items.map((x) => `• [${x.folder}] ${x.name}`).join("\n"))
  if (!pick) return
  const f = items.find((x) => x.name.toLowerCase() === pick.toLowerCase())
  if (!f) { alert("File not found in repo"); return }
  // Stash selection for sending: we store chosen file id in a temp key the ChatConsole can read on next send
  try { localStorage.setItem("files:lastAttachmentId", f.id) } catch {}
}
