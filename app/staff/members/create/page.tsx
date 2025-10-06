"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState } from "react"
import { membersAdd } from "@/lib/demo-members"
import { can, currentRole } from "@/lib/rbac"
import { toast } from "@/hooks/use-toast"
import Link from "next/link"

export default function StaffMemberCreatePage() {
  const role = currentRole()
  const allowed = can("members", "write", role)
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", plan: "" })
  const [createdId, setCreatedId] = useState<string | null>(null)

  function submit(ev: React.FormEvent) {
    ev.preventDefault()
    if (!allowed) { toast({ title: "Permission required", description: "Your role cannot create members.", variant: "destructive" }); return }
    const name = `${form.firstName} ${form.lastName}`.trim()
    if (!name || !form.email) { toast({ title: "Missing fields", description: "Name and Email are required", variant: "destructive" }); return }
    const m = membersAdd({ name, email: form.email, phone: form.phone, plan: form.plan })
    setCreatedId(m.id)
    toast({ title: "Member created", description: m.id })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add New Member</h1>
        <Link href="/staff/visitors"><Button variant="outline">Back</Button></Link>
      </div>

      {!allowed && (
        <div className="text-sm text-muted-foreground">You do not have permission to create members.</div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Member Information</CardTitle>
          <CardDescription>Enter details to enroll a new member</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" value={form.firstName} onChange={e=>setForm({...form, firstName: e.target.value})} placeholder="John" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" value={form.lastName} onChange={e=>setForm({...form, lastName: e.target.value})} placeholder="Doe" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="john.doe@example.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} placeholder="(555) 123-4567" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="plan">Plan</Label>
              <Select value={form.plan} onValueChange={(v)=>setForm({...form, plan: v})}>
                <SelectTrigger id="plan">
                  <SelectValue placeholder="Select a plan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="reset" variant="outline" onClick={()=>setForm({ firstName: "", lastName: "", email: "", phone: "", plan: "" })}>Reset</Button>
              <Button type="submit" disabled={!allowed}>Create Member</Button>
            </div>
          </form>
          {createdId && (
            <div className="pt-3 text-sm">Created ID: <span className="font-mono">{createdId}</span></div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
