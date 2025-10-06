"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Upload, FilePlus2 } from "lucide-react"

// Types
 type Claim = {
  id: string
  createdAt: string
  org: string
  claimant: string
  policyId?: string
  type?: string
  amount: number
  currency: "SLE"
  status: "draft" | "submitted" | "approved" | "rejected" | "paid"
  description?: string
  attachments?: { id: string; name: string }[]
}

// Storage helpers
function keyFor(org: string) { return `claims:${org}` }
function loadClaims(org: string): Claim[] {
  try { const raw = localStorage.getItem(keyFor(org)); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : [] } catch { return [] }
}
function saveClaims(org: string, items: Claim[]) { try { localStorage.setItem(keyFor(org), JSON.stringify(items)) } catch {} }

// Files repo (re-using chat local repo keys)
 type RepoFile = { id: string; name: string; folder: string; mime: string; dataUrl: string; createdAt: string }
function repoList(): RepoFile[] { try { const raw = localStorage.getItem("files:repo"); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : [] } catch { return [] } }
function getFileById(id: string) { const f = repoList().find((x) => x.id === id); return f ? { id: f.id, name: f.name } : null }

export default function OrgClaimsPage() {
  const params = useParams() as { org?: string }
  const org = (params?.org || "org").toString()
  const { toast } = useToast()

  const [claims, setClaims] = useState<Claim[]>([])
  const [query, setQuery] = useState("")
  const [showNew, setShowNew] = useState(false)
  const [form, setForm] = useState<{ claimant: string; policyId?: string; type?: string; amount: string; description?: string; attachments: { id: string; name: string }[] }>({ claimant: "", policyId: "", type: "", amount: "", description: "", attachments: [] })
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  useEffect(() => { setClaims(loadClaims(org)) }, [org])

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    const base = claims.slice().sort((a,b) => (a.createdAt < b.createdAt ? 1 : -1))
    if (!q) return base
    return base.filter((c) => c.id.toLowerCase().includes(q) || (c.claimant || "").toLowerCase().includes(q))
  }, [claims, query])

  const stats = useMemo(() => {
    const total = claims.length
    const submitted = claims.filter((c) => c.status === "submitted").length
    const approved = claims.filter((c) => c.status === "approved").length
    return { total, submitted, approved }
  }, [claims])

  function addAttachmentFromRepo() {
    const items = repoList()
    if (!items.length) { toast({ title: "Files repo empty", description: "Upload a file first (e.g., quotes) from chat or here." }); return }
    const pick = prompt("Type filename to attach (e.g., quote.pdf). Available:\n" + items.map((x) => `• [${x.folder}] ${x.name}`).join("\n"))
    if (!pick) return
    const f = items.find((x) => x.name.toLowerCase() === pick.toLowerCase())
    if (!f) { toast({ title: "Not found", description: pick, variant: "destructive" }); return }
    setForm((prev) => ({ ...prev, attachments: [...prev.attachments, { id: f.id, name: f.name }] }))
  }

  function onUploadFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const dataUrl = String(reader.result || "")
      // Save into repo
      const id = crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`
      const f: RepoFile = { id, name: file.name, folder: file.name.toLowerCase().includes("quote") || file.name.toLowerCase().endsWith(".pdf") ? "quotes" : "general", mime: file.type || "application/octet-stream", dataUrl, createdAt: new Date().toISOString() }
      const items = repoList(); items.push(f); localStorage.setItem("files:repo", JSON.stringify(items))
      setForm((prev) => ({ ...prev, attachments: [...prev.attachments, { id: f.id, name: f.name }] }))
      toast({ title: "Uploaded", description: f.name })
    }
    reader.readAsDataURL(file)
    e.currentTarget.value = ""
  }

  function createClaim() {
    const amt = Number(form.amount || "0")
    if (!form.claimant || !amt) { toast({ title: "Missing fields", description: "Enter claimant and amount" , variant: "destructive"}); return }
    const id = `CLM-${Math.floor(2000 + Math.random() * 8000)}`
    const item: Claim = { id, createdAt: new Date().toISOString(), org, claimant: form.claimant, policyId: form.policyId, type: form.type, amount: amt, currency: "SLE", status: "draft", description: form.description, attachments: form.attachments }
    const next = [item, ...claims]
    setClaims(next)
    saveClaims(org, next)
    setShowNew(false)
    setForm({ claimant: "", policyId: "", type: "", amount: "", description: "", attachments: [] })
    toast({ title: "Claim created", description: id })
  }

  function submitClaim(id: string) {
    const next = claims.map((c) => (c.id === id ? { ...c, status: "submitted" as const } : c))
    setClaims(next)
    saveClaims(org, next)
    toast({ title: "Submitted", description: id })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Claims</h1>
          <div className="text-sm text-muted-foreground">Track submissions and approvals</div>
        </div>
        <Button className="gap-2" onClick={() => setShowNew(true)}><Plus className="h-4 w-4"/> New Claim</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card><CardHeader><CardTitle>Total</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{stats.total}</CardContent></Card>
        <Card><CardHeader><CardTitle>Approved</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{stats.approved}</CardContent></Card>
        <Card><CardHeader><CardTitle>Submitted</CardTitle></CardHeader><CardContent className="text-2xl font-bold">{stats.submitted}</CardContent></Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Claims</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex gap-2">
            <Input placeholder="Search by ID or employee" value={query} onChange={(e) => setQuery(e.target.value)} />
            <Select defaultValue="all"><SelectTrigger className="w-32"><SelectValue placeholder="All"/></SelectTrigger><SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="submitted">Submitted</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent></Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Claim</TableHead>
                <TableHead>Employee</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Amount (SLE)</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow><TableCell colSpan={7} className="text-sm text-muted-foreground">No claims yet.</TableCell></TableRow>
              ) : (
                filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.id}</TableCell>
                    <TableCell>{c.claimant}</TableCell>
                    <TableCell>{c.type || "-"}</TableCell>
                    <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{c.amount.toFixed(2)}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center rounded px-2 py-0.5 text-xs ${c.status === 'approved' ? 'bg-green-100 text-green-700' : c.status === 'submitted' ? 'bg-orange-100 text-orange-700' : c.status === 'rejected' ? 'bg-red-100 text-red-700' : 'bg-muted'}`}>{c.status}</span>
                    </TableCell>
                    <TableCell className="space-x-2">
                      {c.status === 'draft' && (<Button size="sm" variant="outline" onClick={() => submitClaim(c.id)}>Submit</Button>)}
                      {c.attachments && c.attachments.length > 0 && (
                        <Button size="sm" variant="ghost" asChild>
                          <a href="#" onClick={(e) => { e.preventDefault(); alert(c.attachments?.map((a) => a.name).join('\n') || 'No attachments') }}>Attachments</a>
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {showNew && (
        <div className="fixed inset-0 z-20 bg-black/30 flex items-center justify-center">
          <div className="w-full max-w-2xl rounded-lg bg-background p-4 shadow">
            <div className="flex items-center justify-between pb-2"><div className="font-semibold">New Claim</div><Button variant="ghost" onClick={() => setShowNew(false)}>Close</Button></div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>Employee</Label>
                <Input value={form.claimant} onChange={(e) => setForm({ ...form, claimant: e.target.value })} placeholder="Employee full name" />
              </div>
              <div>
                <Label>Type</Label>
                <Input value={form.type || ''} onChange={(e) => setForm({ ...form, type: e.target.value })} placeholder="e.g., Medical" />
              </div>
              <div>
                <Label>Policy ID (optional)</Label>
                <Input value={form.policyId || ''} onChange={(e) => setForm({ ...form, policyId: e.target.value })} placeholder="POL-123" />
              </div>
              <div>
                <Label>Amount (SLE)</Label>
                <Input type="number" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} />
              </div>
              <div className="md:col-span-2">
                <Label>Description</Label>
                <Input value={form.description || ''} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Summary" />
              </div>
              <div className="md:col-span-2 space-y-2">
                <div className="font-medium text-sm">Attachments</div>
                <div className="flex gap-2">
                  <Button variant="outline" className="gap-2" onClick={() => fileInputRef.current?.click()}><Upload className="h-4 w-4"/> Upload</Button>
                  <Button variant="outline" className="gap-2" onClick={addAttachmentFromRepo}><FilePlus2 className="h-4 w-4"/> From Files</Button>
                  <input ref={fileInputRef} type="file" className="hidden" onChange={onUploadFile} />
                </div>
                <div className="text-xs text-muted-foreground">Quotes can be stored under the "quotes" folder and attached here.</div>
                {(form.attachments?.length || 0) > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {form.attachments!.map((a) => (
                      <div key={a.id} className="text-xs border rounded px-2 py-1 flex items-center gap-2">
                        <span>{a.name}</span>
                        <button className="text-muted-foreground hover:text-foreground" onClick={() => setForm((prev) => ({ ...prev, attachments: prev.attachments.filter((x) => x.id !== a.id) }))}>✕</button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="pt-4 flex justify-end gap-2">
              <Button variant="outline" onClick={() => setShowNew(false)}>Cancel</Button>
              <Button onClick={createClaim}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
