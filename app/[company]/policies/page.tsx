"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Shield, Search, Plus, FileText } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

type Policy = { id: number; name: string; tier: "Standard"|"Premium"|"Enterprise"; members: number; monthly: number; status: "Active"|"Archived" }

const demoPolicies: Policy[] = [
  { id: 101, name: "Standard Health", tier: "Standard", members: 120, monthly: 179.0, status: "Active" },
  { id: 102, name: "Premium Plan", tier: "Premium", members: 84, monthly: 249.0, status: "Active" },
  { id: 103, name: "Enterprise Plan", tier: "Enterprise", members: 43, monthly: 339.0, status: "Active" },
]

export default function CompanyPoliciesPage() {
  const [q, setQ] = useState("")
  const [tier, setTier] = useState("all")
  const [policies, setPolicies] = useState<Policy[]>(demoPolicies)
  const [open, setOpen] = useState(false)
  const [newName, setNewName] = useState("")
  const [newTier, setNewTier] = useState<Policy["tier"]>("Standard")
  const [newMonthly, setNewMonthly] = useState("179")

  const filtered = useMemo(() => {
    return policies.filter(p => (
      (tier === "all" || p.tier === tier) && `${p.name} ${p.tier}`.toLowerCase().includes(q.toLowerCase())
    ))
  }, [q, tier, policies])

  function createPolicy() {
    if (!newName.trim()) return
    const id = Math.max(0, ...policies.map(p => p.id)) + 1
    const monthly = Number(newMonthly) || 0
    const p: Policy = { id, name: newName.trim(), tier: newTier, members: 0, monthly, status: "Active" }
    setPolicies(prev => [p, ...prev])
    setOpen(false)
    setNewName("")
    setNewTier("Standard")
    setNewMonthly("179")
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Policies</h2>
          <p className="text-muted-foreground">Manage company plans and coverage</p>
        </div>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="bg-violet-600 hover:bg-violet-700 text-white gap-2"><Plus className="h-4 w-4"/> New Policy</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create Company Policy</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Policy Name</label>
                <Input placeholder="e.g., Corporate Premium" value={newName} onChange={(e)=>setNewName(e.target.value)} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Tier</label>
                  <Select value={newTier} onValueChange={(v: Policy["tier"])=>setNewTier(v)}>
                    <SelectTrigger><SelectValue placeholder="Tier"/></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Standard">Standard</SelectItem>
                      <SelectItem value="Premium">Premium</SelectItem>
                      <SelectItem value="Enterprise">Enterprise</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Monthly Premium ($)</label>
                  <Input inputMode="decimal" value={newMonthly} onChange={(e)=>setNewMonthly(e.target.value)} />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={()=>setOpen(false)}>Cancel</Button>
                <Button onClick={createPolicy}>Create</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-indigo-500 to-sky-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base">Active Plans</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{policies.length}</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base">Total Members</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{policies.reduce((a,b)=>a+b.members,0)}</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base">Avg. Premium</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">${policies.length ? Math.round(policies.reduce((a,b)=>a+b.monthly,0)/policies.length) : 0}</CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search policy" value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>
          <Select value={tier} onValueChange={setTier}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Tier"/></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All tiers</SelectItem>
              <SelectItem value="Standard">Standard</SelectItem>
              <SelectItem value="Premium">Premium</SelectItem>
              <SelectItem value="Enterprise">Enterprise</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Shield className="h-5 w-5"/> Company Policies</CardTitle>
          <CardDescription>Review and manage plan tiers</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Tier</th>
                  <th className="text-left py-2 pr-4">Members</th>
                  <th className="text-left py-2 pr-4">Monthly</th>
                  <th className="text-left py-2 pr-4">Status</th>
                  <th className="text-right py-2">Docs</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(p => (
                  <tr key={p.id} className="border-b last:border-0">
                    <td className="py-3 pr-4 font-medium">{p.name}</td>
                    <td className="py-3 pr-4">{p.tier}</td>
                    <td className="py-3 pr-4">{p.members}</td>
                    <td className="py-3 pr-4">${p.monthly}</td>
                    <td className="py-3 pr-4">{p.status === "Active" ? <Badge className="bg-emerald-600 text-white">Active</Badge> : <Badge variant="secondary">Archived</Badge>}</td>
                    <td className="py-3 text-right"><Button variant="outline" size="sm" className="gap-2"><FileText className="h-4 w-4"/> View</Button></td>
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
