"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { addCompany } from "@/lib/services/companies"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"
import { toast } from "@/hooks/use-toast"

export default function AdminCompanyCreatePage() {
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    industry: "technology",
    employees: "",
    contactPerson: "",
    email: "",
    phone: "",
    address: "",
    planType: "Standard Corporate",
    monthlyPremium: "",
    location: "",
    description: "",
  })

  function submit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.name || !form.industry || !form.employees || !form.contactPerson || !form.email || !form.phone || !form.address || !form.planType || !form.monthlyPremium) {
      toast({ title: "Missing fields", description: "Please fill all required fields", variant: "destructive" })
      return
    }
    const created = addCompany({
      name: form.name,
      industry: form.industry,
      employees: Number(form.employees),
      contactPerson: form.contactPerson,
      email: form.email,
      phone: form.phone,
      address: form.address,
      planType: form.planType,
      monthlyPremium: Number(form.monthlyPremium),
      location: form.location,
      description: form.description,
    })
    toast({ title: "Company created", description: created.id })
    router.push(ROUTES.admin.companiesList)
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Add Company</h1>
        <div className="text-sm text-muted-foreground">Enter company information and plan details</div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Details</CardTitle>
          <CardDescription>Required fields are marked with *</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Name *</Label>
              <Input value={form.name} onChange={e=>setForm({...form, name: e.target.value})} placeholder="Acme Corp" />
            </div>
            <div className="space-y-2">
              <Label>Industry *</Label>
              <Select value={form.industry} onValueChange={(v)=>setForm({...form, industry: v})}>
                <SelectTrigger><SelectValue placeholder="Select industry"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="healthcare">Healthcare</SelectItem>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="software">Software</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Employees *</Label>
              <Input type="number" value={form.employees} onChange={e=>setForm({...form, employees: e.target.value})} placeholder="100" />
            </div>
            <div className="space-y-2">
              <Label>Contact Person *</Label>
              <Input value={form.contactPerson} onChange={e=>setForm({...form, contactPerson: e.target.value})} placeholder="Jane Doe" />
            </div>
            <div className="space-y-2">
              <Label>Email *</Label>
              <Input type="email" value={form.email} onChange={e=>setForm({...form, email: e.target.value})} placeholder="contact@acme.com" />
            </div>
            <div className="space-y-2">
              <Label>Phone *</Label>
              <Input value={form.phone} onChange={e=>setForm({...form, phone: e.target.value})} placeholder="+232 76 000 000" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Address *</Label>
              <Input value={form.address} onChange={e=>setForm({...form, address: e.target.value})} placeholder="1 Main St, Freetown" />
            </div>
            <div className="space-y-2">
              <Label>Plan Type *</Label>
              <Select value={form.planType} onValueChange={(v)=>setForm({...form, planType: v})}>
                <SelectTrigger><SelectValue placeholder="Select plan"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Basic Corporate">Basic Corporate</SelectItem>
                  <SelectItem value="Standard Corporate">Standard Corporate</SelectItem>
                  <SelectItem value="Premium Corporate">Premium Corporate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Monthly Premium (SLE) *</Label>
              <Input type="number" value={form.monthlyPremium} onChange={e=>setForm({...form, monthlyPremium: e.target.value})} placeholder="25000" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Location</Label>
              <Input value={form.location} onChange={e=>setForm({...form, location: e.target.value})} placeholder="Freetown" />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label>Description</Label>
              <Textarea value={form.description} onChange={e=>setForm({...form, description: e.target.value})} placeholder="Optional notes" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button type="button" variant="outline" onClick={()=>router.push("/admin/companies")}>Cancel</Button>
              <Button type="submit">Create Company</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
