"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ROUTES } from "@/lib/routes"
import { useRouter } from "next/navigation"
import { can, currentRole } from "@/lib/rbac"
import { loadArray } from "@/lib/demo-store"
import { Plus, Users, FileText, ScanLine, Search } from "lucide-react"

export default function StaffDashboardPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [role, setRole] = useState<string>("")
  useEffect(() => { setMounted(true); setRole(currentRole()) }, [])
  const canCreateMember = mounted ? can("members", "write", role) : false

  type Visitor = { id: string; name: string; status: string; createdAt: string }
  type Enquiry = { id: string; subject: string; name: string; status: string; createdAt: string }

  const [visitors, setVisitors] = useState<Visitor[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])

  useEffect(() => {
    setVisitors(loadArray<Visitor>("visitors:list"))
    setEnquiries(loadArray<Enquiry>("enquiries:list"))
  }, [])

  const waitingCount = useMemo(() => visitors.filter(v=>v.status === "waiting").length, [visitors])
  const openEnquiries = useMemo(() => enquiries.filter(e=>e.status === "open").length, [enquiries])

  const recentVisitors = useMemo(() => visitors.slice(0,5), [visitors])
  const recentEnquiries = useMemo(() => enquiries.slice(0,5), [enquiries])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff Dashboard</h1>
        <Badge variant="outline" suppressHydrationWarning>Role: {mounted ? role : "…"}</Badge>
      </div>

      {/* Stats & Quick Actions */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Waiting Visitors</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{waitingCount}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Open Enquiries</CardTitle></CardHeader>
          <CardContent><div className="text-2xl font-bold">{openEnquiries}</div></CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Today</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Use the header OTC button for scan/search.</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Shortcuts</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-2">
            <Button variant="outline" onClick={()=>router.push(ROUTES.staff.visitors)}><Users className="h-4 w-4 mr-1"/>Visitors</Button>
            <Button variant="outline" onClick={()=>router.push(ROUTES.staff.enquiryNew)}><FileText className="h-4 w-4 mr-1"/>New Enquiry</Button>
            <Button variant="outline" onClick={()=>router.push(ROUTES.user.dashboard)}><Search className="h-4 w-4 mr-1"/>Search User</Button>
            <Button variant="outline" onClick={()=> canCreateMember ? router.push(ROUTES.staff.memberCreate) : undefined } disabled={!canCreateMember}><Plus className="h-4 w-4 mr-1"/>New User</Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Lists */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Visitors</CardTitle>
            <CardDescription>Latest 5 items (local demo)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentVisitors.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-sm text-muted-foreground">No visitors yet.</TableCell></TableRow>
                ) : recentVisitors.map(v => (
                  <TableRow key={v.id}>
                    <TableCell className="font-mono text-xs">{v.id}</TableCell>
                    <TableCell>{v.name}</TableCell>
                    <TableCell className="capitalize">{v.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Enquiries</CardTitle>
            <CardDescription>Latest 5 items (local demo)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentEnquiries.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-sm text-muted-foreground">No enquiries yet.</TableCell></TableRow>
                ) : recentEnquiries.map(e => (
                  <TableRow key={e.id}>
                    <TableCell className="font-mono text-xs">{e.id}</TableCell>
                    <TableCell className="truncate max-w-[180px]" title={e.subject}>{e.subject}</TableCell>
                    <TableCell className="capitalize">{e.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

