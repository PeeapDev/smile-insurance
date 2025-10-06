import { companiesData, type Company } from "@/lib/demo/companies"

const KEY = "companies:list"

export function loadCompanies(): Company[] {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const arr = JSON.parse(raw)
      return Array.isArray(arr) ? arr : companiesData
    }
  } catch {}
  // seed with demo data on first load
  saveCompanies(companiesData)
  return companiesData
}

export function saveCompanies(items: Company[]) {
  try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {}
}

export function addCompany(input: Partial<Company> & Pick<Company, "name" | "industry" | "employees" | "contactPerson" | "email" | "phone" | "address" | "planType" | "monthlyPremium">): Company {
  const id = `COMP-${Math.floor(1000 + Math.random()*9000)}`
  const now = new Date()
  const next: Company = {
    id,
    name: input.name,
    industry: input.industry,
    employees: input.employees,
    activeMembers: Math.min(input.employees, input.activeMembers ?? Math.max(1, Math.round(input.employees * 0.95))),
    monthlyPremium: input.monthlyPremium,
    status: input.status ?? "active",
    joinDate: input.joinDate ?? now.toISOString().slice(0,10),
    renewalDate: input.renewalDate ?? new Date(now.getFullYear()+1, now.getMonth(), now.getDate()).toISOString().slice(0,10),
    contactPerson: input.contactPerson,
    email: input.email,
    phone: input.phone,
    address: input.address,
    logo: input.logo,
    location: input.location ?? "",
    description: input.description ?? "",
    services: input.services ?? [],
    planType: input.planType,
    claimsRatio: input.claimsRatio ?? 0.5,
    paymentStatus: input.paymentStatus ?? "current",
  }
  const list = loadCompanies()
  const updated = [next, ...list]
  saveCompanies(updated)
  return next
}
