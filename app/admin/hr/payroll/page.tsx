"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { PermissionGuard } from "@/components/permission-guard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"

// Demo: local storage salary store
type SalaryEntry = { name?: string; currency: string; amount: number; contractType?: string }

function loadSalary(email: string): SalaryEntry | null {
  try {
    const raw = localStorage.getItem(`salary:${email}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

function saveSalary(email: string, data: SalaryEntry): boolean {
  try {
    localStorage.setItem(`salary:${email}`, JSON.stringify(data))
    return true
  } catch {
    return false
  }
}

// Payment history helpers (demo via localStorage)
type PaymentEntry = {
  id: string
  month: string // YYYY-MM
  date: string // ISO timestamp
  currency: string
  amount: number
  status: "paid" | "pending" | "failed" | "unpaid"
  attendance?: { present: number; late: number; absent: number }
}

function loadPayments(email: string): PaymentEntry[] {
  try {
    const raw = localStorage.getItem(`payments:${email}`)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}

function savePayments(email: string, items: PaymentEntry[]) {
  try {
    localStorage.setItem(`payments:${email}`, JSON.stringify(items))
  } catch {}
}

function addPayment(email: string, entry: PaymentEntry) {
  const items = loadPayments(email)
  items.push(entry)
  savePayments(email, items)
}

function currentMonthId() {
  const d = new Date()
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  return `${y}-${m}`
}

export default function PayrollPage() {
  const { toast } = useToast()

  // Single payout UI removed; salary is managed per-staff in the table below

  const [busy, setBusy] = useState(false)

  // Batch payroll
  type Staff = { name: string; email: string; phone: string; role: string }
  const [staff, setStaff] = useState<Staff[]>([])
  const [selected, setSelected] = useState<Record<string, boolean>>({})
  const [defaultProviderId, setDefaultProviderId] = useState("mtn")

  // Single payout UI removed; no per-staff effect needed here

  // Load staff directory for batch payroll
  function reloadStaffDirectory(showToast = false) {
    try {
      if (typeof window === "undefined") return
      const candidateKeys = [
        "staff_directory",
        "staffDirectory",
        "demo_staff_directory",
      ]
      let usedKey: string | null = null
      let parsed: any = []
      for (const k of candidateKeys) {
        const raw = localStorage.getItem(k)
        if (raw) {
          try {
            const val = JSON.parse(raw)
            if (Array.isArray(val)) {
              usedKey = k
              parsed = val
              break
            }
          } catch {}
        }
      }
      let list: Staff[] = Array.isArray(parsed) ? parsed : []
      if (!list.length) {
        // Demo fallback so Payroll matches the demo Staff page
        list = [
          { name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "+1 (555) 123-4567", role: "HR Manager" },
          { name: "Michael Chen", email: "michael.chen@example.com", phone: "+1 (555) 222-1188", role: "Supervisor" },
        ]
      }
      setStaff(Array.isArray(list) ? list : [])
      const sel: Record<string, boolean> = {}
      list.forEach((s) => (sel[s.email] = true))
      setSelected(sel)

      // Seed demo base salaries and a full year of payments + attendance if none exist
      const now = new Date(); const year = now.getFullYear()
      function seedYear(email: string, base: number) {
        // Ensure base salary exists
        const current = loadSalary(email) || { currency: "SLE", amount: base, contractType: "full_time" }
        if (!current.amount) current.amount = base
        saveSalary(email, { ...current, currency: "SLE" })
        // If payments already exist, skip
        const existing = loadPayments(email)
        const hasAnyForYear = existing.some((p) => p.month.startsWith(`${year}-`))
        if (hasAnyForYear) return
        const seeded = [...existing]
        for (let m = 1; m <= 12; m++) {
          const mm = String(m).padStart(2, "0")
          const date = new Date(`${year}-${mm}-05T10:00:00Z`).toISOString()
          const attendance = {
            present: 20 - (m % 3 === 0 ? 1 : 0),
            late: m % 4 === 0 ? 2 : 1,
            absent: m % 5 === 0 ? 1 : 0,
          }
          seeded.push({
            id: `${email}-${year}-${mm}`,
            month: `${year}-${mm}`,
            date,
            currency: "SLE",
            amount: base,
            status: "paid",
            attendance,
          })
        }
        savePayments(email, seeded)
      }
      // Only seed for the two demo profiles
      list.forEach((s) => {
        if (s.email === "sarah.johnson@example.com") seedYear(s.email, 1500)
        if (s.email === "michael.chen@example.com") seedYear(s.email, 1300)
      })
      if (showToast) {
        const keyMsg = usedKey ? `from ${usedKey}` : `no known key`
        toast({ title: "Directory loaded", description: `${list.length} staff found (${keyMsg})` })
      }
    } catch (e: any) {
      if (showToast) toast({ title: "Load error", description: String(e?.message || e), variant: "destructive" })
    }
  }

  useEffect(() => {
    reloadStaffDirectory(false)
  }, [])

  // Read default MOMO provider from Admin → Payments settings
  useEffect(() => {
    try {
      const p = localStorage.getItem("monime_default_momo_provider")
      if (p) setDefaultProviderId(p)
    } catch {}
  }, [])

  // Single payout actions removed from Payroll page

  // Batch helpers
  function updateSalary(email: string, _currency: string, amount: number, contractType: string) {
    // Currency fixed to SLE
    saveSalary(email, { currency: "SLE", amount, contractType })
  }

  const batchRows = useMemo(() => {
    const month = currentMonthId()
    return staff.map((s) => {
      const stored = loadSalary(s.email) || { currency: "SLE", amount: 0, contractType: "full_time" }
      const sal = { ...stored, currency: "SLE" }
      const pays = loadPayments(s.email).filter((p) => p.month === month)
      const current = pays.length ? pays[pays.length - 1] : { status: "unpaid", amount: 0, currency: "SLE" }
      return { ...s, salary: sal, currentPayment: current as any }
    })
  }, [staff])

  async function payBatchMomo() {
    if (!selected || Object.keys(selected).length === 0) {
      toast({ title: "No staff selected", description: "Select at least one staff to pay", variant: "destructive" })
      return
    }
    try {
      setBusy(true)
      const creds = {
        apiKey: typeof window !== "undefined" ? localStorage.getItem("monime_api_key") || undefined : undefined,
        spaceId: typeof window !== "undefined" ? localStorage.getItem("monime_space_id") || undefined : undefined,
        apiVersion: typeof window !== "undefined" ? localStorage.getItem("monime_api_version") || undefined : undefined,
        apiBase: typeof window !== "undefined" ? localStorage.getItem("monime_api_base") || undefined : undefined,
      }
      
      for (const row of batchRows) {
        if (!selected[row.email]) continue
        const payload: any = {
          ...creds,
          amount: { currency: "SLE", value: Number(row.salary.amount) },
          destination: {
            type: "momo",
            providerId: (typeof window !== "undefined" ? localStorage.getItem("monime_default_momo_provider") : null) || defaultProviderId,
            accountNumber: row.phone,
          },
          metadata: {
            staffEmail: row.email,
            staffName: row.name,
            contractType: row.salary.contractType,
            purpose: "payroll_batch",
          },
        }
        const res = await fetch("/api/monime/payouts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        })
        if (!res.ok) {
          const data = await res.json().catch(() => ({}))
          throw new Error(data?.error || `Payout failed for ${row.email}`)
        }
        // Record payment for current month as 'paid'
        addPayment(row.email, {
          id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`,
          month: currentMonthId(),
          date: new Date().toISOString(),
          currency: "SLE",
          amount: Number(row.salary.amount),
          status: "paid",
        })
      }
      toast({ title: "Batch submitted", description: "Payouts have been initiated for selected staff" })
    } catch (e: any) {
      toast({ title: "Batch error", description: String(e?.message || e), variant: "destructive" })
    } finally {
      setBusy(false)
    }
  }

  return (
    <PermissionGuard resource="hr" action="write">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">HR • Payroll</h1>

        

        

        <Card>
          <CardHeader>
            <CardTitle>Batch Payroll</CardTitle>
            <CardDescription>Clean payroll list. Configure providers in Admin → Payments. Manage attendance on each staff page.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">Directory below is synced from Staff. Click a row to manage salary and attendance for that staff.</div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => {
                  const sel: Record<string, boolean> = {}
                  staff.forEach((s) => (sel[s.email] = true))
                  setSelected(sel)
                }}>Select All</Button>
                <Button variant="outline" onClick={() => setSelected({})}>Unselect All</Button>
                <Button variant="secondary" onClick={() => reloadStaffDirectory(true)}>Refresh Directory</Button>
              </div>
            </div>

            {staff.length === 0 ? (
              <div className="text-sm text-muted-foreground">No staff in directory. Add staff in HR → Staff → Add Staff.</div>
            ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Select</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Paid (SLE)</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {batchRows.map((row) => (
                  <TableRow key={row.email}>
                    <TableCell>
                      <Checkbox checked={!!selected[row.email]} onCheckedChange={(v) => setSelected({ ...selected, [row.email]: !!v })} />
                    </TableCell>
                    <TableCell>
                      <Link href={`/admin/hr/payroll/profile?email=${encodeURIComponent(row.email)}`} className="underline-offset-2 hover:underline">{row.name}</Link>
                    </TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>
                      {row.currentPayment?.status || "unpaid"}
                    </TableCell>
                    <TableCell>
                      {(row.currentPayment?.amount ?? 0).toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="outline"><Link href={`/admin/hr/payroll/profile?email=${encodeURIComponent(row.email)}`}>Open Profile</Link></Button>
                    </TableCell>
                    
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            )}

            <div className="flex gap-2">
              <Button disabled={busy} onClick={payBatchMomo}>{busy ? "Processing..." : "Pay Selected via Monime (MOMO)"}</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  )
}
