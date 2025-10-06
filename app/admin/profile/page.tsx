"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Phone, ShieldCheck, UserRound, Building2, Calendar, Edit3 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"

export default function AdminProfilePage() {
  const { toast } = useToast()

  // Demo profile
  const profile = {
    name: "Admin User",
    role: "System Administrator",
    email: "admin@example.com",
    phone: "+1 (555) 000-1234",
    company: "SMILE Insurance Medicare",
    joined: "2024-01-12",
    avatar: "/placeholder-user.jpg",
    status: "active" as const,
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserRound className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Profile</h1>
        </div>
        <Button onClick={() => toast({ title: "Profile saved", description: "Changes stored locally (demo)" })}>
          Save Changes
        </Button>
      </div>

      {/* Header */}
      <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center gap-6">
          <Avatar className="h-28 w-28 ring-2 ring-indigo-200">
            <AvatarImage src={profile.avatar} alt={profile.name} />
            <AvatarFallback>AU</AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <CardTitle className="text-xl">{profile.name}</CardTitle>
            <CardDescription>{profile.role}</CardDescription>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
              <span className="text-sm text-muted-foreground">Joined {profile.joined}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="flex items-center gap-2"><Mail className="h-4 w-4"/><span>{profile.email}</span></div>
          <div className="flex items-center gap-2"><Phone className="h-4 w-4"/><span>{profile.phone}</span></div>
          <div className="flex items-center gap-2"><Building2 className="h-4 w-4"/><span>{profile.company}</span></div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Editable Details */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Personal Details</CardTitle>
            <CardDescription>Update your contact information</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" defaultValue={profile.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue={profile.email} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" defaultValue={profile.phone} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input id="company" defaultValue={profile.company} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Last updates you made</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[ 
                { t: "Updated member profile", d: "2025-08-05" },
                { t: "Approved claim #A1247", d: "2025-08-04" },
                { t: "Generated monthly report", d: "2025-08-01" },
              ].map((a) => (
                <div key={a.t} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-emerald-600"/>
                    <span className="text-sm">{a.t}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{a.d}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle>Change Password</CardTitle>
          <CardDescription>Update your account password</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="currentPass">Current Password</Label>
              <Input id="currentPass" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPass">New Password</Label>
              <Input id="newPass" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPass">Confirm New Password</Label>
              <Input id="confirmPass" type="password" placeholder="••••••••" />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <Button onClick={() => toast({ title: "Password updated", description: "Password changed (demo)", })}>Save Password</Button>
          </div>
        </CardContent>
      </Card>

      {/* Preferences */}
      <Card>
        <CardHeader>
          <CardTitle>Preferences</CardTitle>
          <CardDescription>Display, notifications and security</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Two-factor Authentication</span>
                <Badge variant="outline" className="text-emerald-600">Enabled</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Extra protection on login</p>
              <Button asChild size="sm" variant="secondary" className="mt-3">
                <Link href="/admin/settings/2fa">Manage</Link>
              </Button>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Email Reports</span>
                <Badge variant="outline">Weekly</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Send utilization summaries</p>
              <Button size="sm" variant="secondary" className="mt-3">Change</Button>
            </div>
            <div className="rounded-md border p-4">
              <div className="flex items-center justify-between">
                <span className="font-medium">Theme</span>
                <Badge variant="outline">System</Badge>
              </div>
              <p className="text-sm text-muted-foreground mt-2">Follows your OS setting</p>
              <Button size="sm" variant="secondary" className="mt-3">Switch</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
