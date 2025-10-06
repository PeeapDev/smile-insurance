"use client"

import { useState } from "react"
import { FeatureGate } from "@/components/feature-gate"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"

const KEY = "staff:cards"
function loadCards() { try { const raw = localStorage.getItem(KEY); const arr = raw ? JSON.parse(raw) : []; return Array.isArray(arr) ? arr : [] } catch { return [] } }
function saveCards(items: any[]) { try { localStorage.setItem(KEY, JSON.stringify(items)) } catch {} }

export default function StaffInsuranceCardCreatePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    memberName: "",
    memberId: "",
    groupNumber: "",
    policyNumber: "",
    planName: "",
    effectiveDate: "",
    expirationDate: "",
    issueDate: new Date().toISOString().slice(0,10),
    cardType: "Digital" as "Digital" | "Physical" | "Digital & Physical",
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    const req = ["memberName","memberId","policyNumber","effectiveDate","expirationDate"]
    if (req.some(k => !(form as any)[k])) {
      toast({ title: "Missing fields", description: "Fill all required fields", variant: "destructive" })
      return
    }
    const id = `CARD-${Math.floor(1000 + Math.random()*9000)}`
    const item = { id, ...form, createdAt: new Date().toISOString() }
    const list = loadCards(); list.unshift(item); saveCards(list)
    toast({ title: "Card created", description: `${id} for ${form.memberName}` })
    router.push(ROUTES.user.card) // quick preview in card UI
  }

  return (
    <FeatureGate feature="staff.insurance_cards" resource="members">
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">Create Insurance Card</h1>
          <div className="text-sm text-muted-foreground">Issue a new member card</div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Card Details</CardTitle>
            <CardDescription>Required fields are marked with *</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Member Name *</Label>
                <Input value={form.memberName} onChange={e=>setForm({...form, memberName: e.target.value})} placeholder="John Smith"/>
              </div>
              <div className="space-y-2">
                <Label>Member ID *</Label>
                <Input value={form.memberId} onChange={e=>setForm({...form, memberId: e.target.value})} placeholder="MBR-1234-5678"/>
              </div>
              <div className="space-y-2">
                <Label>Group Number</Label>
                <Input value={form.groupNumber} onChange={e=>setForm({...form, groupNumber: e.target.value})} placeholder="GRP-001"/>
              </div>
              <div className="space-y-2">
                <Label>Policy Number *</Label>
                <Input value={form.policyNumber} onChange={e=>setForm({...form, policyNumber: e.target.value})} placeholder="PLCY-0001"/>
              </div>
              <div className="space-y-2">
                <Label>Plan Name</Label>
                <Input value={form.planName} onChange={e=>setForm({...form, planName: e.target.value})} placeholder="Premium"/>
              </div>
              <div className="space-y-2">
                <Label>Card Type</Label>
                <Select value={form.cardType} onValueChange={(v)=>setForm({...form, cardType: v as any})}>
                  <SelectTrigger><SelectValue placeholder="Select type"/></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Digital">Digital</SelectItem>
                    <SelectItem value="Physical">Physical</SelectItem>
                    <SelectItem value="Digital & Physical">Digital & Physical</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Effective Date *</Label>
                <Input type="date" value={form.effectiveDate} onChange={e=>setForm({...form, effectiveDate: e.target.value})} />
              </div>
              <div className="space-y-2">
                <Label>Expiration Date *</Label>
                <Input type="date" value={form.expirationDate} onChange={e=>setForm({...form, expirationDate: e.target.value})} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label>Issue Date</Label>
                <Input type="date" value={form.issueDate} onChange={e=>setForm({...form, issueDate: e.target.value})} />
              </div>
              <div className="md:col-span-2 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={()=>router.push("/staff/insurance-cards")}>Cancel</Button>
                <Button type="submit">Create Card</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </FeatureGate>
  )
}
