export type FeatureKey =
  | "staff.members"
  | "staff.insurance_cards"
  | "staff.claims"
  | "staff.underwriting"
  | "staff.payments"
  | "staff.chat"
  | "staff.contacts"
  | "staff.invoices"
  | "staff.files"
  | "staff.companies"
  | "staff.hr"
  | "staff.inventory"
  | "staff.reports"
  | "staff.settings"
  | "staff.motor"
  | "staff.medical"

const KEY = "feature:flags"

export type FeatureFlags = Record<FeatureKey, boolean>

export const DEFAULT_FLAGS: FeatureFlags = {
  "staff.members": true,
  "staff.insurance_cards": true,
  "staff.claims": true,
  "staff.underwriting": false,
  "staff.payments": true,
  "staff.chat": true,
  "staff.contacts": true,
  "staff.invoices": true,
  "staff.files": true,
  "staff.companies": true,
  "staff.hr": false,
  "staff.inventory": false,
  "staff.reports": true,
  "staff.settings": true,
  "staff.motor": true,
  "staff.medical": true,
}

export function loadFlags(): FeatureFlags {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) { saveFlags(DEFAULT_FLAGS); return DEFAULT_FLAGS }
    const json = JSON.parse(raw)
    return { ...DEFAULT_FLAGS, ...(json || {}) }
  } catch {
    return DEFAULT_FLAGS
  }
}

export function saveFlags(flags: FeatureFlags) {
  try { localStorage.setItem(KEY, JSON.stringify(flags)) } catch {}
}

export function isEnabled(k: FeatureKey): boolean {
  const flags = loadFlags()
  return !!flags[k]
}
