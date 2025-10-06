"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Briefcase, ArrowRight, Users, CheckCircle2, CalendarX, Clock } from "lucide-react"

export default function AdminHROverviewPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Briefcase className="h-6 w-6" />
        <h1 className="text-2xl font-bold">HR</h1>
        <Badge variant="secondary">Preview</Badge>
      </div>

      {/* Analytics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-sky-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-700 dark:text-sky-300">146</div>
            <p className="text-xs text-sky-700/70 dark:text-sky-300/80">Across all partner companies</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Present Today</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">132</div>
            <p className="text-xs text-emerald-700/70 dark:text-emerald-300/80">90% attendance</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On Leave</CardTitle>
            <CalendarX className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">9</div>
            <p className="text-xs text-amber-700/70 dark:text-amber-300/80">Approved leave</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Late Arrivals</CardTitle>
            <Clock className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700 dark:text-rose-300">5</div>
            <p className="text-xs text-rose-700/70 dark:text-rose-300/80">Today</p>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Trend (Demo) */}
      <Card>
        <CardHeader>
          <CardTitle>Attendance Trend (Last 7 workdays)</CardTitle>
          <CardDescription>Demo data for visualization only</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Simple Bar Chart without external deps */}
          <div className="grid grid-cols-7 gap-3 items-end h-40">
            {[
              { day: "Mon", pct: 0.92 },
              { day: "Tue", pct: 0.88 },
              { day: "Wed", pct: 0.9 },
              { day: "Thu", pct: 0.95 },
              { day: "Fri", pct: 0.86 },
              { day: "Mon", pct: 0.91 },
              { day: "Tue", pct: 0.89 },
            ].map((d) => (
              <div key={d.day + d.pct} className="flex flex-col items-center gap-2">
                <div className="w-full rounded-md bg-gradient-to-t from-sky-200 to-sky-500 dark:from-sky-900 dark:to-sky-400" style={{ height: `${Math.round(d.pct * 100)}%` }} />
                <span className="text-xs text-muted-foreground">{d.day}</span>
              </div>
            ))}
          </div>
          <div className="mt-3 text-sm text-muted-foreground">Average attendance: 90%</div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Staff Directory</CardTitle>
            <CardDescription>Manage employees of partner companies</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-end">
            <div className="text-sm text-muted-foreground">View, add and update staff</div>
            <Link href="/admin/hr/staff"><Button variant="secondary" className="gap-2">Open <ArrowRight className="h-4 w-4"/></Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
