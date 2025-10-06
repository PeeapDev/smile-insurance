"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Search, Download, Receipt } from "lucide-react"

type Invoice = { id: string; date: string; amount: number; status: "Paid"|"Due"|"Overdue" }

const invoices: Invoice[] = [
  { id: "INV-1009", date: "2025-06-30", amount: 1299, status: "Paid" },
  { id: "INV-1010", date: "2025-07-31", amount: 1299, status: "Due" },
  { id: "INV-1011", date: "2025-08-31", amount: 1299, status: "Due" },
]

export default function CompanyBillingPage() {
  const [q, setQ] = useState("")
  const [status, setStatus] = useState("all")
  const filtered = useMemo(() => {
    return invoices.filter(i => (
      (status === "all" || i.status === status) && `${i.id} ${i.date}`.toLowerCase().includes(q.toLowerCase())
    ))
  }, [q, status])

  const totals = useMemo(() => {
    return {
      invoices: invoices.length,
      due: invoices.filter(i=>i.status!="Paid").reduce((a,b)=>a+b.amount,0),
      paid: invoices.filter(i=>i.status==="Paid").reduce((a,b)=>a+b.amount,0)
    }
  }, [])

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Billing</h2>
        <p className="text-muted-foreground">Invoices, payments, and balance</p>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-indigo-500 to-sky-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base">Total Invoices</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{totals.invoices}</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-rose-500 to-red-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base">Amount Due</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">${totals.due}</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base">Amount Paid</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">${totals.paid}</CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search invoices" value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>
          <div className="flex items-center gap-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-[160px]"><SelectValue placeholder="Status"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Due">Due</SelectItem>
                <SelectItem value="Overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="gap-2"><Download className="h-4 w-4"/> Export CSV</Button>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5"/> Invoices</CardTitle>
          <CardDescription>Download receipts and track payments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 pr-4">Invoice</th>
                  <th className="text-left py-2 pr-4">Date</th>
                  <th className="text-left py-2 pr-4">Amount</th>
                  <th className="text-left py-2 pr-4">Status</th>
                  <th className="text-right py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(inv => (
                  <tr key={inv.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{inv.id}</td>
                    <td className="py-3 pr-4">{inv.date}</td>
                    <td className="py-3 pr-4">${inv.amount}</td>
                    <td className="py-3 pr-4">{inv.status === "Paid" ? <Badge className="bg-emerald-600 text-white">Paid</Badge> : inv.status === "Due" ? <Badge variant="secondary">Due</Badge> : <Badge className="bg-rose-600 text-white">Overdue</Badge>}</td>
                    <td className="py-3 text-right"><Button variant="outline" size="sm" className="gap-2"><Receipt className="h-4 w-4"/> Receipt</Button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
