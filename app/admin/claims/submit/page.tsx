"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"

// Local demo store
const KEY = "admin:claims:submissions"
function loadSubmissions() { try { const raw = localStorage.getItem(KEY); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : [] } catch { return [] } }
function saveSubmissions(items: any[]) { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {} }

export default function AdminClaimSubmitPage() {
  const [form, setForm] = useState({
    patient: "",
    company: "",
    type: "medical",
    amount: "",
    provider: "",
    diagnosis: "",
    notes: "",
  })
  const [createdId, setCreatedId] = useState<string | null>(null)

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.patient || !form.company || !form.amount) {
      toast({ title: "Missing fields", description: "Patient, Company and Amount are required", variant: "destructive" })
      return
    }
    const id = `CLM-${Math.floor(1000 + Math.random() * 9000)}`
    const entry = {
      id,
      patient: form.patient,
      company: form.company,
      type: form.type,
      amount: Number(form.amount || 0),
      provider: form.provider,
      diagnosis: form.diagnosis,
      notes: form.notes,
      status: "pending" as const,
      createdAt: new Date().toISOString(),
    }
    const list = loadSubmissions()
    list.unshift(entry)
    saveSubmissions(list)
    setCreatedId(id)
    toast({ title: "Claim submitted", description: id })
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Submit Claim</h1>
        <div className="text-sm text-muted-foreground">Create a new claim for processing</div>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Claim Information</CardTitle>
          <CardDescription>Provide claim details below</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Patient</Label>
              <Input value={form.patient} onChange={e=>setForm({...form, patient: e.target.value})} placeholder="Full name" />
            </div>
            <div className="space-y-2">
              <Label>Company</Label>
              <Input value={form.company} onChange={e=>setForm({...form, company: e.target.value})} placeholder="Org / Employer" />
            </div>
            <div className="space-y-2">
              <Label>Type</Label>
              <Select value={form.type} onValueChange={(v)=>setForm({...form, type: v})}>
                <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="medical">Medical</SelectItem>
                  <SelectItem value="dental">Dental</SelectItem>
                  <SelectItem value="vision">Vision</SelectItem>
                  <SelectItem value="emergency">Emergency</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Amount (SLE)</Label>
              <Input type="number" value={form.amount} onChange={e=>setForm({...form, amount: e.target.value})} placeholder="0.00" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Provider</Label>
              <Input value={form.provider} onChange={e=>setForm({...form, provider: e.target.value})} placeholder="Hospital / Clinic" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Diagnosis</Label>
              <Input value={form.diagnosis} onChange={e=>setForm({...form, diagnosis: e.target.value})} placeholder="Diagnosis" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Notes</Label>
              <Textarea value={form.notes} onChange={e=>setForm({...form, notes: e.target.value})} placeholder="Optional notes" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="reset" variant="outline" onClick={()=>{ setForm({ patient: "", company: "", type: "medical", amount: "", provider: "", diagnosis: "", notes: "" }); setCreatedId(null) }}>Reset</Button>
              <Button type="submit">Submit Claim</Button>
            </div>
            {createdId && (
              <div className="md:col-span-2 text-sm">Created Claim ID: <strong className="font-mono">{createdId}</strong></div>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
