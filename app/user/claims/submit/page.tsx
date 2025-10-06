"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

const KEY = "user:claims:submissions"
function loadClaims() { try { const raw = localStorage.getItem(KEY); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : [] } catch { return [] } }
function saveClaims(items: any[]) { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {} }

export default function UserClaimSubmitPage() {
  const [form, setForm] = useState({ type: "medical", amount: "", provider: "", date: "", notes: "" })
  const [createdId, setCreatedId] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.amount || !form.provider || !form.date) {
      toast({ title: "Missing fields", description: "Amount, Provider and Date are required", variant: "destructive" })
      return
    }
    const id = `UCLM-${Math.floor(1000 + Math.random()*9000)}`
    const entry = { id, ...form, amount: Number(form.amount), status: "pending" as const, createdAt: new Date().toISOString() }
    const list = loadClaims(); list.unshift(entry); saveClaims(list)
    setCreatedId(id)
    toast({ title: "Claim filed", description: id })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">File a Claim</h1>
        <div className="text-sm text-muted-foreground">Submit medical, dental, or other claims</div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Claim Details</CardTitle>
          <CardDescription>Required fields marked *</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v)=>setForm({...form, type: v})}>
                <SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="dental">Dental</SelectItem>
                  <SelectItem value="vision">Vision</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount (SLE) *</Label>
              <Input type="number" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} placeholder="0.00" />
            </div>
            <div className="space-y-2">
              <Label>Provider *</Label>
              <Input value={form.provider} onChange={e=>setForm({...form, provider: e.target.value})} placeholder="Hospital / Clinic" />
            </div>
            <div className="space-y-2">
              <Label>Date of Service *</Label>
              <Input type="date" value={form.date} onChange={e=>setForm({...form, date: e.target.value})} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} placeholder="Optional details" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="reset" variant="outline" onClick={()=>{ setForm({ type: "medical", amount: "", provider: "", date: "", notes: "" }); setCreatedId(null) }}>Reset</Button>
              <Button type="submit">Submit</Button>
            </div>
            {createdId && (<div className="md:col-span-2 text-sm">Created Claim ID: <span className="font-mono">{createdId}</span></div>)}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
