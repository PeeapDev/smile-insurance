"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { loadArray, saveArray } from "@/lib/demo-store"

export type Dependant = { id: string; name: string; relationship: string; dob: string; status: "active" | "inactive"; createdAt: string }
const KEY = "user:family:list"

export default function UserFamilyPage() {
  const [items, setItems] = useState<Dependant[]>([])
  const [q, setQ] = useState("")
  const [form, setForm] = useState({ name: "", relationship: "Spouse", dob: "" })

  useEffect(() => { setItems(loadArray<Dependant>(KEY)) }, [])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return items.filter(d => `${d.name} ${d.relationship}`.toLowerCase().includes(t))
  }, [items, q])

  function add() {
    if (!form.name || !form.dob) { toast({ title: "Missing fields", description: "Name and Date of Birth are required", variant: "destructive" }); return }
    const d: Dependant = { id: `DEP-${Math.floor(1000+Math.random()*9000)}`, name: form.name, relationship: form.relationship, dob: form.dob, status: "active", createdAt: new Date().toISOString() }
    const next = [d, ...items]
    setItems(next); saveArray(KEY, next)
    setForm({ name: "", relationship: form.relationship, dob: "" })
    toast({ title: "Dependant added", description: d.id })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Family</h1>
        <div className="text-sm text-muted-foreground">Manage dependants covered under your plan</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Dependant</CardTitle>
          <CardDescription>Provide the dependant's details</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <div className="space-y-2">
            <Label>Name *</Label>
            <Input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Jane Doe" />
          </div>
          <div className="space-y-2">
            <Label>Relationship</Label>
            <Input value={form.relationship} onChange={e=>setForm({...form, relationship: e.target.value})} placeholder="Spouse / Child / Parent" />
          </div>
          <div className="space-y-2">
            <Label>Date of Birth *</Label>
            <Input type="date" value={form.dob} onChange={e=>setForm({...form, dob: e.target.value})} />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <Button onClick={add}>Add</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Dependants</CardTitle>
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
                <TableHead>Relationship</TableHead>
                <TableHead>DOB</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={5} className="text-sm text-muted-foreground">No dependants yet.</TableCell></TableRow>
              ) : filtered.map(d => (
                <TableRow key={d.id}>
                  <TableCell className="font-mono text-xs">{d.id}</TableCell>
                  <TableCell>{d.name}</TableCell>
                  <TableCell>{d.relationship}</TableCell>
                  <TableCell>{d.dob}</TableCell>
                  <TableCell><Badge variant={d.status === 'active' ? 'default' : 'secondary'} className="capitalize">{d.status}</Badge></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
