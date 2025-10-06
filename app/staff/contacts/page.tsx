"use client"

import { FeatureGate } from "@/components/feature-gate"
import { useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { loadArray, saveArray } from "@/lib/demo-store"

export type Contact = { id: string; name: string; email: string; phone: string; company?: string; createdAt: string }
const KEY = "staff:contacts:list"

export default function StaffContactsPage() {
  return (
    <FeatureGate feature="staff.contacts">
      <ContactsInner />
    </FeatureGate>
  )
}

function ContactsInner() {
  const [items, setItems] = useState<Contact[]>([])
  const [q, setQ] = useState("")
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "" })

  useEffect(() => { setItems(loadArray<Contact>(KEY)) }, [])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return items.filter(c => `${c.name} ${c.email} ${c.phone} ${c.company ?? ""}`.toLowerCase().includes(t))
  }, [items, q])

  function add() {
    if (!form.name || !form.email) return
    const c: Contact = { id: `CNT-${Math.floor(1000+Math.random()*9000)}`, name: form.name, email: form.email, phone: form.phone, company: form.company || undefined, createdAt: new Date().toISOString() }
    const next = [c, ...items]
    setItems(next); saveArray(KEY, next)
    setForm({ name: "", email: "", phone: "", company: "" })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Contacts</h1>
        <div className="text-sm text-muted-foreground">Directory of useful contacts</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Contact</CardTitle>
          <CardDescription>Provide minimal contact info</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Jane Smith" />
          </div>
          <div className="space-y-2">
            <Label>Email *</Label>
            <Input type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="jane@company.com" />
          </div>
          <div className="space-y-2">
            <Label>Phone</Label>
            <Input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} placeholder="+232 76 000 000" />
          </div>
          <div className="space-y-2">
            <Label>Company</Label>
            <Input value={form.company} onChange={e=>setForm({...form, company: e.target.value})} placeholder="Acme" />
          </div>
          <div className="md:col-span-4 flex justify-end">
            <Button onClick={add} disabled={!form.name || !form.email}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center mb-3">
            <Input placeholder="Search" className="w-64" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Company</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-sm text-muted-foreground">No contacts yet.</TableCell></TableRow>
              ) : filtered.map(c => (
                <TableRow key={c.id}>
                  <TableCell className="font-mono text-xs">{c.id}</TableCell>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell>{c.phone}</TableCell>
                  <TableCell>{c.company ?? "-"}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
