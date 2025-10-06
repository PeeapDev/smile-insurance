"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useRouter } from "next/navigation"

export default function NewInvoicePage() {
  const router = useRouter()
  const [items, setItems] = useState<Array<{ desc: string; qty: number; price: number }>>([
    { desc: "Consultation", qty: 1, price: 100 },
  ])
  const [recipientEmail, setRecipientEmail] = useState("")
  const [contactId, setContactId] = useState("")
  const contacts = useMemo(
    () => [
      { id: "u-1001", name: "Sarah Johnson", email: "sarah@example.com", type: "user" },
      { id: "o-2001", name: "TechCorp LLC", email: "billing@techcorp.com", type: "organization" },
    ],
    [],
  )
  const sub = items.reduce((s, i) => s + i.qty * i.price, 0)
  const tax = sub * 0.07
  const total = sub + tax

  function addRow() {
    setItems((prev) => [...prev, { desc: "", qty: 1, price: 0 }])
  }
  function update(i: number, field: keyof (typeof items)[number], val: string) {
    setItems((prev) => prev.map((it, idx) => (idx === i ? { ...it, [field]: field === "desc" ? val : Number(val) } : it)))
  }

  function submit() {
    // Demo: pretend saved and navigate to detail
    const id = `INV-${Math.floor(Math.random() * 9000) + 1000}`
    // If contact selected and no manual email, auto-fill from contact
    const chosen = contacts.find((c) => c.id === contactId)
    const toEmail = recipientEmail || chosen?.email || ""
    console.log("Invoice saved and notification queued to:", toEmail || "(no recipient)")
    router.push(`/admin/invoices/${id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">New Invoice / Quote</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button onClick={submit}>Save</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Invoice Details</CardTitle>
          <CardDescription>Basic invoice builder (demo)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="recipientEmail">Recipient Email</Label>
              <Input id="recipientEmail" type="email" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} placeholder="billing@example.com" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Or choose a Contact</Label>
              <select className="h-10 w-full rounded-md border bg-background px-3" value={contactId} onChange={(e) => setContactId(e.target.value)}>
                <option value="">— Select Contact —</option>
                {contacts.map((c) => (
                  <option key={c.id} value={c.id}>{c.name} • {c.email}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="customer">Customer</Label>
              <Input id="customer" placeholder="TechCorp LLC" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input id="date" type="date" />
            </div>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Description</TableHead>
                <TableHead className="w-20">Qty</TableHead>
                <TableHead className="w-32">Price</TableHead>
                <TableHead className="text-right w-28">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((it, i) => (
                <TableRow key={i}>
                  <TableCell>
                    <Input value={it.desc} onChange={(e) => update(i, "desc", e.target.value)} placeholder="Service" />
                  </TableCell>
                  <TableCell>
                    <Input value={it.qty} type="number" onChange={(e) => update(i, "qty", e.target.value)} />
                  </TableCell>
                  <TableCell>
                    <Input value={it.price} type="number" onChange={(e) => update(i, "price", e.target.value)} />
                  </TableCell>
                  <TableCell className="text-right">${(it.qty * it.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Button variant="outline" onClick={addRow}>Add Line</Button>
          <div className="flex flex-col items-end gap-1">
            <div className="w-60 flex justify-between"><span>Subtotal</span><span>${sub.toFixed(2)}</span></div>
            <div className="w-60 flex justify-between"><span>Tax (7%)</span><span>${tax.toFixed(2)}</span></div>
            <div className="w-60 flex justify-between font-semibold"><span>Total</span><span>${total.toFixed(2)}</span></div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
