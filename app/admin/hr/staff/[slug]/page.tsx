"use client"

import Image from "next/image"
import Link from "next/link"
import { useMemo } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { CalendarDays, DollarSign, UserRound, ArrowLeft, CheckCircle, XCircle, Clock } from "lucide-react"

const demoStaff = [
  {
    slug: "sarah-johnson",
    name: "Sarah Johnson",
    role: "HR Manager",
    email: "sarah.johnson@example.com",
    phone: "+1 (555) 123-4567",
    salary: 72000,
    avatar: "/placeholder.svg?height=120&width=120",
    status: "active" as const,
    company: "SMILE Insurance Medicare",
  },
  {
    slug: "michael-chen",
    name: "Michael Chen",
    role: "Supervisor",
    email: "michael.chen@example.com",
    phone: "+1 (555) 222-1188",
    salary: 64000,
    avatar: "/placeholder.svg?height=120&width=120",
    status: "active" as const,
    company: "SMILE Insurance Medicare",
  },
]

type Attendance = { date: string; status: "present" | "absent" | "late" }

function buildMonthlyAttendance(): Attendance[] {
  // Demo: build a simple month of 20 entries with mixed status
  const days = Array.from({ length: 20 }, (_, i) => i + 1)
  return days.map((d) => {
    if (d % 9 === 0) return { date: `2025-08-${String(d).padStart(2, "0")}`, status: "absent" }
    if (d % 5 === 0) return { date: `2025-08-${String(d).padStart(2, "0")}`, status: "late" }
    return { date: `2025-08-${String(d).padStart(2, "0")}`, status: "present" }
  })
}

export default function StaffDetailPage() {
  const params = useParams<{ slug: string }>()
  const { toast } = useToast()

  const staff = useMemo(() => demoStaff.find((s) => s.slug === params.slug), [params.slug])
  const attendance = useMemo(buildMonthlyAttendance, [])

  if (!staff) {
    return (
      <div className="p-6">
        <Link href="/admin/hr/staff"><Button variant="outline" className="mb-4 gap-2"><ArrowLeft className="h-4 w-4"/>Back</Button></Link>
        <Card>
          <CardHeader>
            <CardTitle>Staff Not Found</CardTitle>
            <CardDescription>Invalid staff identifier.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  const present = attendance.filter((a) => a.status === "present").length
  const absent = attendance.filter((a) => a.status === "absent").length
  const late = attendance.filter((a) => a.status === "late").length

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <UserRound className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Staff Details</h1>
        </div>
        <Link href="/admin/hr/staff"><Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4"/> Back</Button></Link>
      </div>

      {/* Profile */}
      <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20">
        <CardHeader className="flex flex-row items-center gap-6">
          <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-indigo-200">
            <Image src={staff.avatar} alt={staff.name} fill className="object-cover" />
          </div>
          <div className="space-y-1">
            <CardTitle className="text-xl">{staff.name}</CardTitle>
            <CardDescription>{staff.role} • {staff.company}</CardDescription>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800 border-green-200">Active</Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <p className="text-sm text-muted-foreground">Email</p>
            <p className="font-medium">{staff.email}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Phone</p>
            <p className="font-medium">{staff.phone}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Status</p>
            <p className="font-medium capitalize">{staff.status}</p>
          </div>
        </CardContent>
      </Card>

      {/* Salary & Attendance Summary */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><DollarSign className="h-5 w-5 text-emerald-600"/> Salary</CardTitle>
            <CardDescription>Annual compensation</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-emerald-700 dark:text-emerald-300">${staff.salary.toLocaleString()}</div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><CalendarDays className="h-5 w-5 text-amber-600"/> Attendance (Monthly)</CardTitle>
            <CardDescription>Summary for current month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-6">
              <div className="flex items-center gap-2 text-emerald-700"><CheckCircle className="h-4 w-4"/> {present} Present</div>
              <div className="flex items-center gap-2 text-amber-700"><Clock className="h-4 w-4"/> {late} Late</div>
              <div className="flex items-center gap-2 text-rose-700"><XCircle className="h-4 w-4"/> {absent} Absent</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Monthly Attendance Table */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Attendance Report</CardTitle>
          <CardDescription>Snapshot of daily status</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attendance.map((a) => (
                <TableRow key={a.date}>
                  <TableCell>{a.date}</TableCell>
                  <TableCell>
                    <Badge className={
                      a.status === "present" ? "bg-green-100 text-green-800 border-green-200" :
                      a.status === "late" ? "bg-amber-100 text-amber-800 border-amber-200" :
                      "bg-rose-100 text-rose-800 border-rose-200"
                    }>
                      {a.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
