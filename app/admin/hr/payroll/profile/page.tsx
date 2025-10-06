"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { ArrowLeft, Printer, Download } from "lucide-react"

// Types
type Staff = { name: string; email: string; phone: string; role: string }

type SalaryEntry = { name?: string; currency: string; amount: number; contractType?: string }

type PaymentEntry = {
  id: string
  month: string // YYYY-MM
  date: string // ISO timestamp
  currency: string
  amount: number
  status: "paid" | "pending" | "failed" | "unpaid"
  attendance?: { present: number; late: number; absent: number }
}

// Demo storage helpers
function loadSalary(email: string): SalaryEntry | null {
  try {
    const raw = localStorage.getItem(`salary:${email}`)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}
function saveSalary(email: string, data: SalaryEntry) {
  try { localStorage.setItem(`salary:${email}`, JSON.stringify(data)) } catch {}
}
function loadPayments(email: string): PaymentEntry[] {
  try {
    const raw = localStorage.getItem(`payments:${email}`)
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch { return [] }
}
function savePayments(email: string, items: PaymentEntry[]) {
  try { localStorage.setItem(`payments:${email}`, JSON.stringify(items)) } catch {}
}
function currentMonthId() {
  const d = new Date(); const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2, "0"); return `${y}-${m}`
}

export default function PayrollPaymentProfilePage() {
  const params = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  const email = params.get("email") || ""

  const [staff, setStaff] = useState<Staff | null>(null)
  const [salary, setSalary] = useState<SalaryEntry>({ currency: "SLE", amount: 0, contractType: "full_time" })
  const [history, setHistory] = useState<PaymentEntry[]>([])
  const [viewPaymentId, setViewPaymentId] = useState<string | null>(null)

  // Load staff from directory or demo fallback
  useEffect(() => {
    if (!email) return
    try {
      const candidateKeys = ["staff_directory", "staffDirectory", "demo_staff_directory"]
      let parsed: Staff[] = []
      for (const k of candidateKeys) {
        const raw = localStorage.getItem(k)
        if (!raw) continue
        try { const arr = JSON.parse(raw); if (Array.isArray(arr)) { parsed = arr; break } } catch {}
      }
      if (!parsed.length) {
        parsed = [
          { name: "Sarah Johnson", email: "sarah.johnson@example.com", phone: "+1 (555) 123-4567", role: "HR Manager" },
          { name: "Michael Chen", email: "michael.chen@example.com", phone: "+1 (555) 222-1188", role: "Supervisor" },
        ]
      }
      const s = parsed.find((x) => x.email === email) || null
      setStaff(s)
      const sal = loadSalary(email) || { currency: "SLE", amount: 0, contractType: "full_time" }
      setSalary({ ...sal, currency: "SLE" })
      setHistory(loadPayments(email))
    } catch {}
  }, [email])

  const month = useMemo(currentMonthId, [])

  function updateBase(val: number) {
    const next = { ...salary, currency: "SLE", amount: val }
    setSalary(next)
    if (email) saveSalary(email, next)
  }
  function updateContract(val: string) {
    const next = { ...salary, contractType: val as any }
    setSalary(next)
    if (email) saveSalary(email, next)
  }

  function onPrint() { window.print() }

  function downloadInvoice(pay: PaymentEntry) {
    if (!staff) return
    const html = `<!doctype html><html><head><meta charset='utf-8'><title>Invoice ${pay.id}</title>
    <style>body{font-family:ui-sans-serif,system-ui,Arial;padding:24px} h1{font-size:20px;margin:0 0 8px} table{width:100%;border-collapse:collapse;margin-top:16px} td{padding:8px;border-top:1px solid #ddd}</style>
    </head><body>
    <h1>Payroll Invoice</h1>
    <div>Invoice ID: ${pay.id}</div>
    <div>Date: ${new Date(pay.date).toLocaleString()}</div>
    <div>Month: ${pay.month}</div>
    <div>Staff: ${staff.name} (${staff.email})</div>
    <table><tr><td>Status</td><td>${pay.status}</td></tr>
    <tr><td>Amount (SLE)</td><td>${pay.amount.toFixed(2)}</td></tr></table>
    </body></html>`
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `invoice-${pay.month}-${staff.email}.html`
    a.click()
    URL.revokeObjectURL(url)
  }

  if (!email) {
    return (
      <div className="p-6">
        <Link href="/admin/hr/payroll"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4"/>Back</Button></Link>
        <Card className="mt-4"><CardHeader><CardTitle>Missing email</CardTitle><CardDescription>Provide ?email=... in the URL</CardDescription></CardHeader></Card>
      </div>
    )
  }

  if (!staff) {
    return (
      <div className="p-6">
        <Link href="/admin/hr/payroll"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4"/>Back</Button></Link>
        <Card className="mt-4"><CardHeader><CardTitle>Staff not found</CardTitle><CardDescription>{email}</CardDescription></CardHeader></Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <Link href="/admin/hr/payroll"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4"/>Back</Button></Link>
        <div className="flex gap-2">
          <Button variant="secondary" onClick={onPrint}><Printer className="h-4 w-4 mr-2"/>Print</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment Profile • {staff.name}</CardTitle>
          <CardDescription>{staff.email} • {staff.phone}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label>Base (SLE)</Label>
              <Input type="number" value={salary.amount} onChange={(e) => updateBase(Number(e.target.value || 0))} />
            </div>
            <div>
              <Label>Phone</Label>
              <Input value={staff.phone} disabled />
            </div>
            <div>
              <Label>Contract</Label>
              <Select value={salary.contractType || "full_time"} onValueChange={updateContract}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="full_time">Full-time</SelectItem>
                  <SelectItem value="part_time">Part-time</SelectItem>
                  <SelectItem value="contractor">Contractor</SelectItem>
                  <SelectItem value="intern">Intern</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="font-medium">Payment History</div>
            <div className="text-sm text-muted-foreground">Current month: {month}</div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Month</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Amount (SLE)</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {history.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-sm text-muted-foreground">No payments yet.</TableCell>
                </TableRow>
              ) : (
                history.slice().reverse().map((p) => (
                  <TableRow key={p.id}>
                    <TableCell>{new Date(p.date).toLocaleDateString()}</TableCell>
                    <TableCell>{p.month}</TableCell>
                    <TableCell className="capitalize">{p.status}</TableCell>
                    <TableCell>{p.amount.toFixed(2)}</TableCell>
                    <TableCell className="flex gap-2">
                      <Button size="sm" variant="outline" onClick={() => setViewPaymentId(p.id)}>View</Button>
                      <Button size="sm" variant="secondary" onClick={() => downloadInvoice(p)}><Download className="h-4 w-4 mr-1"/>Invoice</Button>
                      <Link href={`/admin/hr/staff/${encodeURIComponent(staff.name.toLowerCase().replace(/\s+/g, "-"))}?month=${p.month}`} className="inline-flex"><Button size="sm" variant="outline">View Attendance</Button></Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>

          {viewPaymentId && (() => {
            const pay = history.find((x) => x.id === viewPaymentId)
            if (!pay) return null
            return (
              <div className="mt-4 rounded-md border p-4">
                <div className="font-medium mb-2">Invoice Preview</div>
                <div className="text-sm text-muted-foreground">Invoice ID: {pay.id}</div>
                <div className="text-sm text-muted-foreground">Date: {new Date(pay.date).toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Month: {pay.month}</div>
                <div className="text-sm text-muted-foreground">Status: {pay.status}</div>
                <div className="text-sm text-muted-foreground">Amount (SLE): {pay.amount.toFixed(2)}</div>
                <div className="mt-2 flex gap-2">
                  <Button onClick={() => window.print()}><Printer className="h-4 w-4 mr-2"/>Print</Button>
                  <Button variant="outline" onClick={() => setViewPaymentId(null)}>Close</Button>
                </div>
              </div>
            )
          })()}
        </CardContent>
      </Card>
    </div>
  )
}
