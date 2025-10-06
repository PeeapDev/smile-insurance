export type RoleKey = "admin" | "manager" | "finance" | "counter" | "staff" | string
export type PermissionMap = Record<string, { read: boolean; write: boolean; del: boolean }>

const DEFAULTS: Record<RoleKey, PermissionMap> = {
  admin: {
    dashboard: { read: true, write: true, del: true },
    members: { read: true, write: true, del: true },
    companies: { read: true, write: true, del: true },
    claims: { read: true, write: true, del: true },
    inventory: { read: true, write: true, del: true },
    reports: { read: true, write: true, del: true },
    settings: { read: true, write: true, del: true },
    invoices: { read: true, write: true, del: true },
    files: { read: true, write: true, del: true },
    hr: { read: true, write: true, del: true },
    attendance: { read: true, write: true, del: true },
    chat: { read: true, write: true, del: true },
    otc: { read: true, write: true, del: true },
    underwriting: { read: true, write: true, del: true },
    payments: { read: true, write: true, del: true },
  },
  manager: {
    dashboard: { read: true, write: false, del: false },
    members: { read: true, write: true, del: false },
    companies: { read: true, write: true, del: false },
    claims: { read: true, write: true, del: false },
    inventory: { read: true, write: false, del: false },
    reports: { read: true, write: false, del: false },
    settings: { read: false, write: false, del: false },
    invoices: { read: true, write: true, del: false },
    files: { read: true, write: true, del: false },
    hr: { read: true, write: true, del: false },
    attendance: { read: true, write: true, del: false },
    chat: { read: true, write: true, del: false },
    otc: { read: true, write: true, del: false },
    underwriting: { read: true, write: true, del: false },
    payments: { read: true, write: true, del: false },
  },
  finance: {
    dashboard: { read: true, write: false, del: false },
    members: { read: false, write: false, del: false },
    companies: { read: true, write: true, del: false },
    claims: { read: true, write: false, del: false },
    inventory: { read: false, write: false, del: false },
    reports: { read: true, write: true, del: false },
    settings: { read: false, write: false, del: false },
    invoices: { read: true, write: true, del: false },
    files: { read: true, write: true, del: false },
    hr: { read: false, write: false, del: false },
    attendance: { read: true, write: false, del: false },
    chat: { read: true, write: true, del: false },
    otc: { read: false, write: false, del: false },
    underwriting: { read: false, write: false, del: false },
    payments: { read: true, write: true, del: false },
  },
  counter: {
    dashboard: { read: true, write: false, del: false },
    members: { read: true, write: true, del: false },
    companies: { read: true, write: false, del: false },
    claims: { read: true, write: true, del: false },
    inventory: { read: false, write: false, del: false },
    reports: { read: false, write: false, del: false },
    settings: { read: false, write: false, del: false },
    invoices: { read: true, write: false, del: false },
    files: { read: true, write: false, del: false },
    hr: { read: false, write: false, del: false },
    attendance: { read: true, write: false, del: false },
    chat: { read: true, write: true, del: false },
    otc: { read: true, write: true, del: false },
    underwriting: { read: false, write: false, del: false },
    payments: { read: true, write: false, del: false },
  },
  staff: {
    dashboard: { read: true, write: false, del: false },
    members: { read: true, write: true, del: false },
    companies: { read: false, write: false, del: false },
    claims: { read: true, write: false, del: false },
    inventory: { read: false, write: false, del: false },
    reports: { read: false, write: false, del: false },
    settings: { read: false, write: false, del: false },
    invoices: { read: false, write: false, del: false },
    files: { read: false, write: false, del: false },
    hr: { read: false, write: false, del: false },
    attendance: { read: true, write: false, del: false },
    chat: { read: true, write: true, del: false },
    otc: { read: true, write: true, del: false },
    underwriting: { read: false, write: false, del: false },
    payments: { read: false, write: false, del: false },
  },
  underwriter: {
    dashboard: { read: true, write: false, del: false },
    members: { read: true, write: true, del: false },
    companies: { read: true, write: true, del: false },
    claims: { read: true, write: true, del: false },
    inventory: { read: false, write: false, del: false },
    reports: { read: true, write: false, del: false },
    settings: { read: false, write: false, del: false },
    invoices: { read: false, write: false, del: false },
    files: { read: true, write: true, del: false },
    hr: { read: false, write: false, del: false },
    attendance: { read: true, write: false, del: false },
    chat: { read: true, write: true, del: false },
    otc: { read: true, write: false, del: false },
    underwriting: { read: true, write: true, del: false },
    payments: { read: false, write: false, del: false },
  },
  driver: {
    dashboard: { read: true, write: false, del: false },
    members: { read: false, write: false, del: false },
    companies: { read: false, write: false, del: false },
    claims: { read: true, write: false, del: false },
    inventory: { read: false, write: false, del: false },
    reports: { read: false, write: false, del: false },
    settings: { read: false, write: false, del: false },
    invoices: { read: false, write: false, del: false },
    files: { read: false, write: false, del: false },
    hr: { read: false, write: false, del: false },
    attendance: { read: true, write: false, del: false },
    chat: { read: true, write: true, del: false },
    otc: { read: true, write: true, del: false },
    underwriting: { read: false, write: false, del: false },
    payments: { read: false, write: false, del: false },
  },
  hr: {
    dashboard: { read: true, write: false, del: false },
    members: { read: true, write: true, del: false },
    companies: { read: true, write: true, del: false },
    claims: { read: false, write: false, del: false },
    inventory: { read: false, write: false, del: false },
    reports: { read: true, write: false, del: false },
    settings: { read: true, write: true, del: false },
    invoices: { read: false, write: false, del: false },
    files: { read: true, write: true, del: false },
    hr: { read: true, write: true, del: false },
    attendance: { read: true, write: true, del: false },
    chat: { read: true, write: true, del: false },
    otc: { read: true, write: false, del: false },
    underwriting: { read: false, write: false, del: false },
    payments: { read: true, write: false, del: false },
  },
}

const STORAGE_KEY = "rbac_roles"

export function getAllRoles(): Record<RoleKey, PermissionMap> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch {}
  return DEFAULTS
}

export function saveAllRoles(map: Record<RoleKey, PermissionMap>) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map))
}

export function getRolePermissions(role: RoleKey): PermissionMap {
  const all = getAllRoles()
  return all[role] || DEFAULTS.staff
}

export function setRolePermissions(role: RoleKey, perms: PermissionMap) {
  const all = getAllRoles()
  all[role] = perms
  saveAllRoles(all)
}

export function currentRole(): RoleKey {
  try {
    return (localStorage.getItem("demo_role") as RoleKey) || "user"
  } catch {
    return "user"
  }
}

export function can(resource: string, action: "read" | "write" | "del", role?: RoleKey) {
  const r = role || currentRole()
  const perms = getRolePermissions(r)
  const p = perms[resource]
  if (!p) return false
  return Boolean(p[action])
}
