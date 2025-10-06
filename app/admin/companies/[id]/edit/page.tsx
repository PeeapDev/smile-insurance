"use client"

import { useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { companiesData, type Company } from "@/lib/demo/companies"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowLeft, Save } from "lucide-react"

export default function EditCompanyPage() {
  const params = useParams() as { id?: string }
  const router = useRouter()
  const { toast } = useToast()

  const id = Array.isArray(params?.id) ? params.id[0] : params?.id
  const company = useMemo<Company | undefined>(() => companiesData.find((c) => c.id === id), [id])

  const [form, setForm] = useState<Partial<Company>>({
    name: company?.name,
    logo: company?.logo,
    location: company?.location,
    description: company?.description,
    services: company?.services ?? [],
    contactPerson: company?.contactPerson,
    email: company?.email,
    phone: company?.phone,
    address: company?.address,
    planType: company?.planType,
  })
  const [servicesInput, setServicesInput] = useState<string>((company?.services ?? []).join(", "))

  if (!id) {
    return (
      <div className="space-y-6 p-6">
        <Card>
          <CardContent className="py-8">Missing company id.</CardContent>
        </Card>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Edit Company</h1>
          <Link href={`/admin/companies/${id}`}><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4"/> Back</Button></Link>
        </div>
        <Card>
          <CardContent className="py-8">Company not found.</CardContent>
        </Card>
      </div>
    )
  }

  const update = (k: keyof Company, v: any) => setForm((f) => ({ ...f, [k]: v }))

  const onSave = () => {
    // Demo only: show toast and navigate back
    toast({ title: "Company saved", description: `${form.name ?? company.name} was updated.` })
    router.push(`/admin/companies/${id}`)
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarImage src={(form.logo as string) || company.logo || "/placeholder.svg"} alt={company.name} />
            <AvatarFallback>{(form.name ?? company.name).substring(0,2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Edit Company</h1>
            <p className="text-sm text-muted-foreground">{company.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={`/admin/companies/${id}`}><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4"/> Back</Button></Link>
          <Button onClick={onSave} className="gap-2"><Save className="h-4 w-4"/> Save</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Update the company profile and branding</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-muted-foreground">Company Name</label>
              <Input value={form.name ?? ""} onChange={(e) => update("name", e.target.value)} placeholder="Company name" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Logo URL</label>
              <Input value={(form.logo as string) ?? ""} onChange={(e) => update("logo", e.target.value)} placeholder="https://..." />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Location</label>
              <Input value={form.location ?? ""} onChange={(e) => update("location", e.target.value)} placeholder="City, State" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-muted-foreground">Description</label>
              <Textarea value={form.description ?? ""} onChange={(e) => update("description", e.target.value)} placeholder="What services does the company offer?" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-muted-foreground">Services (comma separated)</label>
              <Input value={servicesInput} onChange={(e) => setServicesInput(e.target.value)} onBlur={() => update("services", servicesInput.split(",").map(s => s.trim()).filter(Boolean))} placeholder="e.g., Cloud Hosting, Cybersecurity" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contacts</CardTitle>
          <CardDescription>How we reach this company</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="text-sm text-muted-foreground">Contact Person</label>
              <Input value={form.contactPerson ?? ""} onChange={(e) => update("contactPerson", e.target.value)} placeholder="Jane Doe" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Email</label>
              <Input value={form.email ?? ""} onChange={(e) => update("email", e.target.value)} placeholder="contact@company.com" />
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Phone</label>
              <Input value={form.phone ?? ""} onChange={(e) => update("phone", e.target.value)} placeholder="+1 (555) 000-0000" />
            </div>
            <div className="sm:col-span-2">
              <label className="text-sm text-muted-foreground">Address</label>
              <Input value={form.address ?? ""} onChange={(e) => update("address", e.target.value)} placeholder="123 Street, City, ST 00000" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
