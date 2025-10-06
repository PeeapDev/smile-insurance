"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { getAllRoles } from "@/lib/rbac"
import { sendStaffWelcome } from "@/lib/email"

export default function CreateStaffPage() {
  const router = useRouter()
  const [roles, setRoles] = useState<string[]>([])
  const [role, setRole] = useState<string>("staff")

  useEffect(() => {
    try {
      const r = getAllRoles()
      setRoles(Object.keys(r))
      if (r["staff"]) setRole("staff")
    } catch {}
  }, [])

  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const firstName = String(data.get("firstName") || "")
    const lastName = String(data.get("lastName") || "")
    const email = String(data.get("email") || "")
    const phone = String(data.get("phone") || "")
    const name = `${firstName} ${lastName}`.trim()
    // Assign role mapping (demo store)
    try {
      const raw = localStorage.getItem("rbac_staff_roles")
      const map = raw ? JSON.parse(raw) : {}
      map[email.toLowerCase()] = role
      localStorage.setItem("rbac_staff_roles", JSON.stringify(map))
    } catch {}
    // Persist staff directory (demo) for payroll listing
    try {
      const raw = localStorage.getItem("staff_directory")
      const list: Array<{ name: string; email: string; phone: string; role: string }> = raw ? JSON.parse(raw) : []
      const idx = list.findIndex((s) => s.email.toLowerCase() === email.toLowerCase())
      const entry = { name: name || firstName, email, phone, role }
      if (idx >= 0) list[idx] = entry
      else list.push(entry)
      localStorage.setItem("staff_directory", JSON.stringify(list))
    } catch {}
    // Send welcome email (demo)
    if (email) {
      sendStaffWelcome(email, name || firstName || "New Staff", role)
    }
    // Demo only: pretend saved then go back
    router.push("/admin/hr/staff")
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Add Staff</h1>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => router.back()}>Cancel</Button>
          <Button form="staffForm" type="submit">Save</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Details</CardTitle>
          <CardDescription>Basic staff profile (demo)</CardDescription>
        </CardHeader>
        <CardContent>
          <form id="staffForm" onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" placeholder="Sarah" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" placeholder="Johnson" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="sarah@example.com" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" name="phone" type="tel" placeholder="+2327xxxxxxx" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="TechCorp Inc." />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <select id="role" name="role" className="h-10 rounded-md border bg-background px-3" value={role} onChange={(e) => setRole(e.target.value)}>
                {roles.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="notes">Notes</Label>
              <Input id="notes" name="notes" placeholder="Optional notes" />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
