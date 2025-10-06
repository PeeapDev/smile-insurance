"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { can, currentRole } from "@/lib/rbac"
import { loadArray, saveArray } from "@/lib/demo-store"

// Storage
const KEY = "enquiries:list"
export type Enquiry = { id: string; subject: string; name: string; phone?: string; email?: string; message?: string; status: "open" | "closed" | "pending"; createdAt: string }

export default function StaffNewEnquiryPage() {
  const role = currentRole()
  const canRead = can("otc", "read", role)
  const canWrite = can("otc", "write", role)

  const [items, setItems] = useState<Enquiry[]>([])
  const [createdId, setCreatedId] = useState<string | null>(null)
  const [form, setForm] = useState({ subject: "", name: "", phone: "", email: "", message: "" })

  useEffect(() => { if (canRead) setItems(loadArray<Enquiry>(KEY)) }, [canRead])

  function submit() {
    if (!canWrite) { toast({ title: "Not allowed", description: "You do not have permission to create enquiries", variant: "destructive" }); return }
    if (!form.subject || !form.name) { toast({ title: "Missing fields", description: "Subject and Name are required", variant: "destructive" }); return }
    const e: Enquiry = { id: `ENQ-${Math.floor(1000+Math.random()*9000)}`, subject: form.subject, name: form.name, phone: form.phone, email: form.email, message: form.message, status: "open", createdAt: new Date().toISOString() }
    const next = [e, ...items]
    setItems(next); saveArray(KEY, next)
    setCreatedId(e.id)
    toast({ title: "Enquiry created", description: e.id })
  }

  if (!canRead) return <div className="p-6 text-sm text-muted-foreground">You do not have permission to view this page.</div>

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">New Enquiry</h1>
        <div className="text-sm text-muted-foreground">Capture a walk-in or phone enquiry.</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Enquiry Details</CardTitle>
          <CardDescription>Fields marked with * are required</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-2">
          <Input placeholder="Subject *" value={form.subject} onChange={e=>setForm({...form, subject: e.target.value})} />
          <Input placeholder="Customer Name *" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} />
          <Input placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} />
          <Input placeholder="Email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} />
          <div className="md:col-span-2">
            <Textarea placeholder="Message / Notes" value={form.message} onChange={e=>setForm({...form, message: e.target.value})} />
          </div>
          <div className="md:col-span-2 flex gap-2 justify-end">
            <Button variant="outline" onClick={()=>setForm({ subject: "", name: "", phone: "", email: "", message: "" })}>Reset</Button>
            <Button onClick={submit} disabled={!canWrite}>Create</Button>
          </div>
          {!canWrite && (
            <div className="md:col-span-2 text-xs text-muted-foreground">Your role does not have write permission for counter operations.</div>
          )}
        </CardContent>
      </Card>

      {createdId && (
        <Card>
          <CardHeader>
            <CardTitle>Enquiry Created</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div className="text-sm">ID: <Badge variant="outline">{createdId}</Badge></div>
            <div className="text-sm text-muted-foreground">Find it later under counter enquiries (local demo storage).</div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
