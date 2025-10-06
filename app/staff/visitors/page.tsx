"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { can, currentRole } from "@/lib/rbac"
import { loadArray, saveArray } from "@/lib/demo-store"

// Local storage helpers
const KEY = "visitors:list"
export type Visitor = { id: string; name: string; phone?: string; purpose?: string; status: "waiting" | "served" | "escalated"; createdAt: string }

export default function StaffVisitorsPage() {
  const role = currentRole()
  const canRead = can("otc", "read", role)
  const canWrite = can("otc", "write", role)

  const [items, setItems] = useState<Visitor[]>([])
  const [q, setQ] = useState("")
  const [form, setForm] = useState({ name: "", phone: "", purpose: "" })

  useEffect(() => { if (canRead) setItems(loadArray<Visitor>(KEY)) }, [canRead])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return items.filter(v => `${v.name} ${v.phone} ${v.purpose}`.toLowerCase().includes(t))
  }, [items, q])

  function addVisitor() {
    if (!canWrite) { toast({ title: "Not allowed", description: "You do not have permission to add visitors", variant: "destructive" }); return }
    if (!form.name) { toast({ title: "Name required", description: "Enter visitor name", variant: "destructive" }); return }
    const v: Visitor = { id: `V-${Math.floor(1000+Math.random()*9000)}`, name: form.name, phone: form.phone, purpose: form.purpose, status: "waiting", createdAt: new Date().toISOString() }
    const next = [v, ...items]
    setItems(next); saveArray(KEY, next)
    setForm({ name: "", phone: "", purpose: "" })
    toast({ title: "Visitor added", description: v.id })
  }

  function mark(id: string, status: Visitor["status"]) {
    if (!canWrite) { toast({ title: "Not allowed", description: "You do not have permission", variant: "destructive" }); return }
    const next = items.map(v => v.id === id ? { ...v, status } : v)
    setItems(next); saveArray(KEY, next)
  }

  if (!canRead) return <div className="p-6 text-sm text-muted-foreground">You do not have permission to view visitors.</div>

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Manage Visitors</h1>
        <div className="text-sm text-muted-foreground">Track walk-ins and actions at the counter.</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Visitor</CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-4 gap-2">
          <Input placeholder="Full name" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <Input placeholder="Phone (optional)" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
          <Input placeholder="Purpose (e.g., New policy)" value={form.purpose} onChange={e=>setForm({...form, purpose: e.target.value})} />
          <Button onClick={addVisitor} disabled={!canWrite}>Add</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Visitors</CardTitle>
          <Input placeholder="Search" className="w-56" value={q} onChange={e=>setQ(e.target.value)} />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Purpose</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-sm text-muted-foreground">No visitors yet.</TableCell></TableRow>
              ) : filtered.map(v => (
                <TableRow key={v.id}>
                  <TableCell>{v.id}</TableCell>
                  <TableCell>{v.name}</TableCell>
                  <TableCell>{v.phone || "-"}</TableCell>
                  <TableCell>{v.purpose || "-"}</TableCell>
                  <TableCell>{new Date(v.createdAt).toLocaleTimeString()}</TableCell>
                  <TableCell>
                    <Badge variant={v.status === "waiting" ? "outline" : v.status === "served" ? "default" : "secondary"}>{v.status}</Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button size="sm" variant="outline" disabled={!canWrite} onClick={()=>mark(v.id, "served")}>Mark Served</Button>
                    <Button size="sm" variant="outline" disabled={!canWrite} onClick={()=>mark(v.id, "escalated")}>Escalate</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
