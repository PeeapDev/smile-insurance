"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Save, Trash2, Filter } from "lucide-react"
import { can, currentRole } from "@/lib/rbac"

// Demo storage
const KEY = "uw:rules"
export type Rule = {
  id: string
  name: string
  product: string // e.g., motor, medical, life
  condition: string // pseudo-expression
  action: "approve" | "refer" | "reject"
  severity: "low" | "medium" | "high"
  enabled: boolean
  notes?: string
  createdAt: string
}
function loadRules(): Rule[] { try { const raw = localStorage.getItem(KEY); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : [] } catch { return [] } }
function saveRules(items: Rule[]) { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {} }

export default function UwRulesPage() {
  const role = currentRole()
  const canRead = can("underwriting", "read", role)
  const canWrite = can("underwriting", "write", role)

  const [rules, setRules] = useState<Rule[]>([])
  const [q, setQ] = useState("")
  const [product, setProduct] = useState<string>("all")
  const [action, setAction] = useState<string>("all")
  const [severity, setSeverity] = useState<string>("all")

  const [form, setForm] = useState({ name: "", product: "motor", condition: "", action: "approve" as Rule["action"], severity: "low" as Rule["severity"], notes: "" })

  useEffect(() => { if (canRead) setRules(loadRules()) }, [canRead])

  const filtered = useMemo(() => {
    const t = q.trim().toLowerCase()
    return rules.filter(r =>
      (product === "all" || r.product === product) &&
      (action === "all" || r.action === action) &&
      (severity === "all" || r.severity === severity) &&
      (`${r.name} ${r.product} ${r.condition}`.toLowerCase().includes(t))
    )
  }, [rules, q, product, action, severity])

  function addRule() {
    if (!canWrite) { toast({ title: "Not allowed", description: "You do not have permission to add rules", variant: "destructive" }); return }
    if (!form.name || !form.condition) { toast({ title: "Missing fields", description: "Name and Condition are required", variant: "destructive" }); return }
    const r: Rule = {
      id: `R-${Math.floor(1000 + Math.random()*9000)}`,
      name: form.name,
      product: form.product,
      condition: form.condition,
      action: form.action,
      severity: form.severity,
      enabled: true,
      notes: form.notes,
      createdAt: new Date().toISOString(),
    }
    const next = [r, ...rules]
    setRules(next); saveRules(next)
    setForm({ name: "", product: form.product, condition: "", action: form.action, severity: form.severity, notes: "" })
    toast({ title: "Rule created", description: r.id })
  }

  function toggle(id: string, enabled: boolean) {
    if (!canWrite) return
    const next = rules.map(r => r.id === id ? { ...r, enabled } : r)
    setRules(next); saveRules(next)
  }

  function remove(id: string) {
    if (!canWrite) return
    const next = rules.filter(r => r.id !== id)
    setRules(next); saveRules(next)
  }

  if (!canRead) return <div className="p-6 text-sm text-muted-foreground">You do not have permission to view underwriting rules.</div>

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Underwriting Rules</h1>
          <div className="text-sm text-muted-foreground">Define product rules to guide automatic decisions</div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>New Rule</CardTitle>
          <CardDescription>Provide a clear name and a simple condition.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-3">
          <Input placeholder="Rule name *" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <Select value={form.product} onValueChange={(v)=>setForm({...form, product: v})}>
            <SelectTrigger><SelectValue placeholder="Product" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="motor">Motor</SelectItem>
              <SelectItem value="medical">Medical</SelectItem>
              <SelectItem value="life">Life</SelectItem>
            </SelectContent>
          </Select>
          <Select value={form.action} onValueChange={(v)=>setForm({...form, action: v as Rule["action"]})}>
            <SelectTrigger><SelectValue placeholder="Action" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="approve">Approve</SelectItem>
              <SelectItem value="refer">Refer</SelectItem>
              <SelectItem value="reject">Reject</SelectItem>
            </SelectContent>
          </Select>
          <Select value={form.severity} onValueChange={(v)=>setForm({...form, severity: v as Rule["severity"]})}>
            <SelectTrigger><SelectValue placeholder="Severity" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <div className="md:col-span-3">
            <Textarea placeholder="Condition expression * (e.g., amount > 5000 && driver_age < 25)" value={form.condition} onChange={e=>setForm({...form, condition: e.target.value})} />
          </div>
          <div className="md:col-span-3">
            <Textarea placeholder="Notes (optional)" value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} />
          </div>
          <div className="md:col-span-3 flex justify-end">
            <Button onClick={addRule}><Plus className="h-4 w-4 mr-1"/>Create Rule</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Rules</CardTitle>
          <CardDescription>Filter and manage active rules</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 md:grid-cols-4">
            <Input placeholder="Search by name/condition" value={q} onChange={e=>setQ(e.target.value)} />
            <Select value={product} onValueChange={setProduct}>
              <SelectTrigger><SelectValue placeholder="Product"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="motor">Motor</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="life">Life</SelectItem>
              </SelectContent>
            </Select>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger><SelectValue placeholder="Action"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="approve">Approve</SelectItem>
                <SelectItem value="refer">Refer</SelectItem>
                <SelectItem value="reject">Reject</SelectItem>
              </SelectContent>
            </Select>
            <Select value={severity} onValueChange={setSeverity}>
              <SelectTrigger><SelectValue placeholder="Severity"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="low">Low</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="high">High</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Condition</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Enabled</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={8} className="text-sm text-muted-foreground">No rules found.</TableCell></TableRow>
              ) : filtered.map(r => (
                <TableRow key={r.id}>
                  <TableCell className="font-mono text-xs">{r.id}</TableCell>
                  <TableCell>{r.name}</TableCell>
                  <TableCell className="capitalize">{r.product}</TableCell>
                  <TableCell className="max-w-[420px] truncate" title={r.condition}>{r.condition}</TableCell>
                  <TableCell className="capitalize">{r.action}</TableCell>
                  <TableCell>
                    <Badge variant={r.severity === 'high' ? 'destructive' : r.severity === 'medium' ? 'secondary' : 'outline'} className="capitalize">{r.severity}</Badge>
                  </TableCell>
                  <TableCell>
                    <Switch checked={r.enabled} onCheckedChange={(v)=>toggle(r.id, v)} disabled={!canWrite} />
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="icon" variant="ghost"><MoreHorizontal className="h-4 w-4"/></Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={()=>remove(r.id)} disabled={!canWrite}><Trash2 className="h-4 w-4 mr-2"/>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
