export type DemoMember = { id: string; name: string; email?: string; phone?: string; plan?: string; status?: string; createdAt: string }

const KEY = "members:list"

export function membersLoad(): DemoMember[] {
  try {
    const raw = localStorage.getItem(KEY)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

export function membersSave(items: DemoMember[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {}
}

export function membersAdd(m: Omit<DemoMember, "id"|"createdAt"> & Partial<Pick<DemoMember, "status">>) {
  const id = `MBR-${Math.floor(1000 + Math.random()*9000)}`
  const item: DemoMember = { id, createdAt: new Date().toISOString(), status: m.status || "Active", name: m.name, email: m.email, phone: m.phone, plan: m.plan }
  const list = membersLoad()
  list.unshift(item)
  membersSave(list)
  return item
}

export function membersFind(query: string): DemoMember | null {
  const q = query.trim().toLowerCase()
  if (!q) return null
  const list = membersLoad()
  return list.find(m => m.id.toLowerCase() === q || (m.email||"").toLowerCase() === q || (m.name||"").toLowerCase().includes(q)) || null
}
