"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/components/ui/use-toast"
import { Badge } from "@/components/ui/badge"
import { ShieldCheck, ShieldAlert, Mail } from "lucide-react"
import { useEffect, useState } from "react"
import { getAllRoles, setRolePermissions, type PermissionMap } from "@/lib/rbac"

export default function AdminSettingsPage() {
  const { toast } = useToast()
  const [customRoleName, setCustomRoleName] = useState("")
  const [roles, setRoles] = useState<Record<string, PermissionMap>>({})
  const [staffRoleEmail, setStaffRoleEmail] = useState("")
  const [staffRole, setStaffRole] = useState("")
  const [staffRolesMap, setStaffRolesMap] = useState<Record<string, string>>({})
  const [expanded, setExpanded] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      setRoles(getAllRoles())
      const raw = localStorage.getItem("rbac_staff_roles")
      if (raw) setStaffRolesMap(JSON.parse(raw))
    } catch {}
  }, [])

  function saveStaffRoleAssignment() {
    if (!staffRoleEmail || !staffRole) return
    const next = { ...staffRolesMap, [staffRoleEmail.toLowerCase()]: staffRole }
    setStaffRolesMap(next)
    localStorage.setItem("rbac_staff_roles", JSON.stringify(next))
    toast({ title: "Staff role assigned", description: `${staffRoleEmail} → ${staffRole}` })
  }

  function addCustomRole() {
    const key = customRoleName.trim().toLowerCase()
    if (!key) return
    if (roles[key]) {
      toast({ title: "Role exists", description: `Role "${key}" already exists`, variant: "destructive" })
      return
    }
    const perms: PermissionMap = {
      dashboard: { read: true, write: false, del: false },
      members: { read: true, write: false, del: false },
      companies: { read: false, write: false, del: false },
      claims: { read: true, write: false, del: false },
      inventory: { read: false, write: false, del: false },
      reports: { read: false, write: false, del: false },
      settings: { read: false, write: false, del: false },
      invoices: { read: false, write: false, del: false },
      files: { read: false, write: false, del: false },
      hr: { read: false, write: false, del: false },
      attendance: { read: true, write: false, del: false },
      chat: { read: true, write: true, del: false },
      otc: { read: true, write: true, del: false },
    }
    setRolePermissions(key, perms)
    setRoles(getAllRoles())
    setCustomRoleName("")
    toast({ title: "Custom role added", description: key })
  }
  function saveAttendanceSettings(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = new FormData(e.currentTarget)
    const data = {
      clockInStart: String(form.get("clockInStart") || "07:00"),
      clockInEnd: String(form.get("clockInEnd") || "10:00"),
      clockOutStart: String(form.get("clockOutStart") || "16:00"),
      clockOutEnd: String(form.get("clockOutEnd") || "20:00"),
    }
    localStorage.setItem("attendanceSettings", JSON.stringify(data))
    toast({ title: "Attendance settings saved", description: "QR scan windows updated" })
  }

  function getAttendanceSettings() {
    try {
      const raw = localStorage.getItem("attendanceSettings")
      if (!raw) return null
      return JSON.parse(raw) as {
        clockInStart: string; clockInEnd: string; clockOutStart: string; clockOutEnd: string
      }
    } catch {
      return null
    }
  }

  const att = getAttendanceSettings() || { clockInStart: "07:00", clockInEnd: "10:00", clockOutStart: "16:00", clockOutEnd: "20:00" }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Settings</h1>

      <Tabs defaultValue="roles">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
          <TabsTrigger value="email-smtp">Email / SMTP</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Organization</CardTitle>
              <CardDescription>Update company details used across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company">Company Name</Label>
                  <Input id="company" placeholder="SMILE Insurance" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="supportEmail">Support Email</Label>
                  <Input id="supportEmail" type="email" placeholder="support@smile.com" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button variant="outline" type="reset">Cancel</Button>
                  <Button type="submit">Save Changes</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Attendance Settings */}
        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Windows</CardTitle>
              <CardDescription>Configure when staff can clock-in and clock-out using QR</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={saveAttendanceSettings} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="clockInStart">Clock-in Start</Label>
                  <Input id="clockInStart" name="clockInStart" type="time" defaultValue={att.clockInStart} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clockInEnd">Clock-in End</Label>
                  <Input id="clockInEnd" name="clockInEnd" type="time" defaultValue={att.clockInEnd} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clockOutStart">Clock-out Start</Label>
                  <Input id="clockOutStart" name="clockOutStart" type="time" defaultValue={att.clockOutStart} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clockOutEnd">Clock-out End</Label>
                  <Input id="clockOutEnd" name="clockOutEnd" type="time" defaultValue={att.clockOutEnd} />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button variant="outline" type="reset">Reset</Button>
                  <Button type="submit">Save Attendance</Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle>Billing Settings</CardTitle>
              <CardDescription>Manage billing contacts and invoicing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="billingEmail">Billing Email</Label>
                  <Input id="billingEmail" type="email" placeholder="billing@smile.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="poNumber">PO Number (optional)</Label>
                  <Input id="poNumber" placeholder="PO-2024-001" />
                </div>
                <div className="md:col-span-2 flex justify-end gap-2">
                  <Button variant="outline" type="reset">Discard</Button>
                  <Button type="submit">Update Billing</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions */}
        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>Roles & Permissions</CardTitle>
              <CardDescription>Control staff access across the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {([
                  { key: "admin", label: "Admin", desc: "Full access to all resources", accent: "green", icon: <ShieldCheck className="h-4 w-4"/> },
                  { key: "manager", label: "Manager", desc: "Manage members, companies, and claims", accent: "indigo", icon: <ShieldCheck className="h-4 w-4"/> },
                  { key: "staff", label: "Staff", desc: "Limited access: view/update assigned records", accent: "amber", icon: <ShieldAlert className="h-4 w-4"/> },
                ] as const).map((b) => {
                  const perms = roles[b.key] || {}
                  const isOpen = !!expanded[b.key]
                  const modules: { key: keyof PermissionMap; label: string }[] = [
                    { key: "companies" as any, label: "Organization" },
                    { key: "members" as any, label: "Users" },
                    { key: "hr" as any, label: "Org Staff / Beneficiaries" },
                    { key: "claims" as any, label: "Claims" },
                    { key: "invoices" as any, label: "Invoices" },
                    { key: "files" as any, label: "Files" },
                    { key: "reports" as any, label: "Reports" },
                    { key: "settings" as any, label: "Settings" },
                    { key: "attendance" as any, label: "Attendance" },
                    { key: "chat" as any, label: "Chat" },
                    { key: "otc" as any, label: "OTC" },
                    { key: "underwriting" as any, label: "Underwriting" },
                  ]
                  return (
                    <div key={b.key} className="rounded-lg border">
                      <div className="flex items-center justify-between p-4">
                        <div className="flex items-center gap-2">
                          <Badge className={`bg-${b.accent}-100 text-${b.accent}-800 border-${b.accent}-200 flex items-center gap-1`}>{b.icon}{b.label}</Badge>
                          <span className="text-sm text-muted-foreground">{b.desc}</span>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setExpanded((s) => ({ ...s, [b.key]: !s[b.key] }))}>
                          {isOpen ? "Hide Permissions" : "Edit Permissions"}
                        </Button>
                      </div>
                      {isOpen && (
                        <div className="p-3 border-t">
                          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                            {modules.map((m) => (
                              <div key={m.key as string} className="flex items-center justify-between gap-2 border rounded px-2 py-2">
                                <span>{m.label}</span>
                                <div className="flex items-center gap-3">
                                  <div className="flex items-center gap-1"><span className="text-xs">Read</span><Switch checked={!!perms[m.key as any]?.read} onCheckedChange={(v) => {
                                    const next = { ...perms, [m.key]: { ...(perms[m.key as any] || { read: false, write: false, del: false }), read: Boolean(v) } } as PermissionMap
                                    setRolePermissions(b.key as any, next)
                                    setRoles(getAllRoles())
                                  }} /></div>
                                  <div className="flex items-center gap-1"><span className="text-xs">Write</span><Switch checked={!!perms[m.key as any]?.write} onCheckedChange={(v) => {
                                    const next = { ...perms, [m.key]: { ...(perms[m.key as any] || { read: false, write: false, del: false }), write: Boolean(v) } } as PermissionMap
                                    setRolePermissions(b.key as any, next)
                                    setRoles(getAllRoles())
                                  }} /></div>
                                  <div className="flex items-center gap-1"><span className="text-xs">Delete</span><Switch checked={!!perms[m.key as any]?.del} onCheckedChange={(v) => {
                                    const next = { ...perms, [m.key]: { ...(perms[m.key as any] || { read: false, write: false, del: false }), del: Boolean(v) } } as PermissionMap
                                    setRolePermissions(b.key as any, next)
                                    setRoles(getAllRoles())
                                  }} /></div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}

                {/* Custom Roles */}
                <div className="rounded-lg border p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium">Custom Roles</div>
                      <div className="text-sm text-muted-foreground">Add roles like Driver, Underwriter, HR, etc.</div>
                    </div>
                    <div className="flex gap-2">
                      <Input placeholder="Role key (e.g., underwriter)" value={customRoleName} onChange={(e) => setCustomRoleName(e.target.value)} />
                      <Button onClick={addCustomRole}>Add</Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {Object.keys(roles)
                      .filter((k) => !["admin", "manager", "staff"].includes(k))
                      .map((key) => {
                        const perms = roles[key]
                        const isOpen = !!expanded[key]
                        const modules: { key: keyof PermissionMap; label: string }[] = [
                          { key: "companies" as any, label: "Companies" },
                          { key: "members" as any, label: "Members" },
                          { key: "claims" as any, label: "Claims" },
                          { key: "inventory" as any, label: "Inventory" },
                          { key: "reports" as any, label: "Reports" },
                          { key: "settings" as any, label: "Settings" },
                          { key: "invoices" as any, label: "Invoices" },
                          { key: "files" as any, label: "Files" },
                          { key: "hr" as any, label: "HR" },
                          { key: "attendance" as any, label: "Attendance" },
                          { key: "chat" as any, label: "Chat" },
                          { key: "otc" as any, label: "OTC" },
                        ]
                        return (
                          <div key={key} className="border rounded-md">
                            <div className="flex items-center justify-between p-3">
                              <div className="font-mono text-sm">{key}</div>
                              <div className="flex gap-2">
                                <Button variant="outline" size="sm" onClick={() => setExpanded((s) => ({ ...s, [key]: !s[key] }))}>
                                  {isOpen ? "Hide Permissions" : "Edit Permissions"}
                                </Button>
                              </div>
                            </div>
                            {isOpen && (
                              <div className="p-3 border-t">
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                                  {modules.map((m) => (
                                    <div key={m.key as string} className="flex items-center justify-between gap-2 border rounded px-2 py-2">
                                      <span>{m.label}</span>
                                      <div className="flex items-center gap-3">
                                        <div className="flex items-center gap-1"><span className="text-xs">Read</span><Switch checked={!!perms[m.key as any]?.read} onCheckedChange={(v) => {
                                          const next = { ...perms, [m.key]: { ...(perms[m.key as any] || { read: false, write: false, del: false }), read: Boolean(v) } } as PermissionMap
                                          setRolePermissions(key, next)
                                          setRoles(getAllRoles())
                                        }} /></div>
                                        <div className="flex items-center gap-1"><span className="text-xs">Write</span><Switch checked={!!perms[m.key as any]?.write} onCheckedChange={(v) => {
                                          const next = { ...perms, [m.key]: { ...(perms[m.key as any] || { read: false, write: false, del: false }), write: Boolean(v) } } as PermissionMap
                                          setRolePermissions(key, next)
                                          setRoles(getAllRoles())
                                        }} /></div>
                                        <div className="flex items-center gap-1"><span className="text-xs">Delete</span><Switch checked={!!perms[m.key as any]?.del} onCheckedChange={(v) => {
                                          const next = { ...perms, [m.key]: { ...(perms[m.key as any] || { read: false, write: false, del: false }), del: Boolean(v) } } as PermissionMap
                                          setRolePermissions(key, next)
                                          setRoles(getAllRoles())
                                        }} /></div>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      })}
                  </div>
                </div>

                {/* Staff Role Assignment removed per spec; roles are assigned on the Add Staff form */}
                <div className="rounded-lg border p-4 text-sm text-muted-foreground">
                  Roles are assigned when creating a staff in `app/admin/hr/staff/create/page.tsx`. Use Custom Roles above to define permissions.
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Email / SMTP */}
        <TabsContent value="email-smtp">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><Mail className="h-5 w-5"/> Email / SMTP</CardTitle>
              <CardDescription>Configure outbound email service for alerts and reports</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="smtpHost">SMTP Host</Label>
                  <Input id="smtpHost" placeholder="smtp.mailprovider.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPort">SMTP Port</Label>
                  <Input id="smtpPort" placeholder="587" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpUser">Username</Label>
                  <Input id="smtpUser" placeholder="apikey" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtpPass">Password</Label>
                  <Input id="smtpPass" type="password" placeholder="••••••••" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fromEmail">From Email</Label>
                  <Input id="fromEmail" type="email" placeholder="no-reply@smile.com" />
                </div>
                <div className="space-y-2 flex items-end justify-between md:col-span-2">
                  <div className="flex items-center gap-2">
                    <Switch id="useTLS" defaultChecked />
                    <Label htmlFor="useTLS">Use TLS</Label>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => toast({ title: "Test email sent", description: "Check your inbox (demo)", })}>Send Test</Button>
                    <Button onClick={() => toast({ title: "SMTP saved", description: "Settings stored locally (demo)", })}>Save Settings</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Control email alerts and system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Member Signup Alerts</p>
                    <p className="text-sm text-muted-foreground">Email when a new member is created</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Payment Failures</p>
                    <p className="text-sm text-muted-foreground">Notify billing contact of failed charges</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Monthly Reports</p>
                    <p className="text-sm text-muted-foreground">Receive monthly utilization summaries</p>
                  </div>
                  <Switch />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
