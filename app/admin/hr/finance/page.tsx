"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Separator } from "@/components/ui/separator"
import { PermissionGuard } from "@/components/permission-guard"

 type Entry = {
  id: string
  type: "income" | "expense"
  amount: number
  currency: string
  category: string
  note?: string
  date: string
}

const STORAGE_KEY = "hr_ledger_entries"

function loadEntries(): Entry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

function saveEntries(items: Entry[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    return true
  } catch {
    return false
  }
}

function uuid() {
  try {
    return crypto.randomUUID()
  } catch {
    return `${Date.now()}-${Math.random()}`
  }
}

export default function FinancePage() {
  const { toast } = useToast()
  const [items, setItems] = useState<Entry[]>([])

  // form
  const [type, setType] = useState<"income" | "expense">("income")
  const [amount, setAmount] = useState("")
  const [currency, setCurrency] = useState("SLE")
  const [category, setCategory] = useState("")
  const [note, setNote] = useState("")
  const [date, setDate] = useState<string>(() => new Date().toISOString().slice(0, 10))

  useEffect(() => {
    setItems(loadEntries())
  }, [])

  const totals = useMemo(() => {
    const income = items.filter(i => i.type === "income").reduce((s, i) => s + i.amount, 0)
    const expense = items.filter(i => i.type === "expense").reduce((s, i) => s + i.amount, 0)
    return { income, expense, net: income - expense }
  }, [items])

  function addEntry() {
    if (!amount || !category) {
      toast({ title: "Missing fields", description: "Enter amount and category", variant: "destructive" })
      return
    }
    const entry: Entry = {
      id: uuid(),
      type,
      amount: Number(amount),
      currency,
      category,
      note,
      date,
    }
    const next = [entry, ...items]
    setItems(next)
    saveEntries(next)
    setAmount("")
    setCategory("")
    setNote("")
    toast({ title: "Saved", description: `Added ${type}` })
  }

  function remove(id: string) {
    const next = items.filter(i => i.id !== id)
    setItems(next)
    saveEntries(next)
  }

  function exportCsv() {
    const headers = ["id,type,amount,currency,category,note,date"]
    const rows = items.map(i => [i.id, i.type, i.amount, i.currency, i.category, (i.note||"").replace(/,/g, " "), i.date].join(","))
    const csv = [headers.join("\n"), rows.join("\n")].join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `hr-ledger-${new Date().toISOString().slice(0,10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <PermissionGuard resource="hr" action="write">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">HR • Finance (Income & Expenses)</h1>

        <Card>
          <CardHeader>
            <CardTitle>New Entry</CardTitle>
            <CardDescription>Track income and expenses. Data is stored locally for demo; we will migrate to Supabase.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label>Type</Label>
                <Select value={type} onValueChange={(v: any) => setType(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Amount</Label>
                <Input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="100" />
              </div>
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={currency} onValueChange={(v) => setCurrency(v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SLE">SLE</SelectItem>
                    <SelectItem value="USD">USD</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Date</Label>
                <Input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Category</Label>
                <Input value={category} onChange={(e) => setCategory(e.target.value)} placeholder="e.g. Salary, Fuel, Office" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Note</Label>
                <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="optional" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={addEntry}>Add</Button>
              <Button variant="outline" onClick={exportCsv}>Export CSV</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ledger</CardTitle>
            <CardDescription>
              Income: <b>{totals.income.toFixed(2)}</b> • Expenses: <b>{totals.expense.toFixed(2)}</b> • Net: <b>{totals.net.toFixed(2)}</b>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {items.length === 0 && <div className="text-sm text-muted-foreground">No entries yet.</div>}
              {items.map((i) => (
                <div key={i.id} className="flex items-center justify-between border rounded p-3">
                  <div className="space-y-1">
                    <div className="font-medium">{i.type.toUpperCase()} • {i.category} • {i.currency} {i.amount.toFixed(2)}</div>
                    <div className="text-xs text-muted-foreground">{i.date} {i.note ? `• ${i.note}` : ""}</div>
                  </div>
                  <Button variant="ghost" onClick={() => remove(i.id)}>Remove</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  )
}
