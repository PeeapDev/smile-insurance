"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Users,
  Shield,
  FileText,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  CreditCard,
  BarChart,
} from "lucide-react"

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Badge variant="outline">Administrator</Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Members</CardTitle>
            <Users className="h-4 w-4 text-sky-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-700 dark:text-sky-300">12,847</div>
            <p className="text-xs text-sky-700/70 dark:text-sky-300/80">+180 from last month</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Policies</CardTitle>
            <Shield className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">11,234</div>
            <p className="text-xs text-indigo-700/70 dark:text-indigo-300/80">87.4% of total members</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <FileText className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">247</div>
            <p className="text-xs text-amber-700/70 dark:text-amber-300/80">Avg. processing time: 3.2 days</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">$2.4M</div>
            <p className="text-xs text-emerald-700/70 dark:text-emerald-300/80">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Quick Actions */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Administrative Actions</CardTitle>
            <CardDescription>Common administrative tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3 sm:grid-cols-2">
            <Button
              asChild
              variant="default"
              className="h-16 flex-col gap-1 bg-sky-600 hover:bg-sky-700 text-white"
            >
              <Link href="/admin/cards/create">
                <CreditCard className="h-6 w-6" />
                Create Insurance Card
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="h-16 flex-col gap-1 bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              <Link href="/admin/members">
                <Users className="h-6 w-6" />
                Manage Members
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="h-16 flex-col gap-1 bg-amber-500 hover:bg-amber-600 text-white"
            >
              <Link href="/admin/claims">
                <FileText className="h-6 w-6" />
                Review Claims
              </Link>
            </Button>
            <Button
              asChild
              variant="default"
              className="h-16 flex-col gap-1 bg-violet-600 hover:bg-violet-700 text-white"
            >
              <Link href="/admin/reports">
                <BarChart className="h-6 w-6" />
                Generate Reports
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>System Activity</CardTitle>
            <CardDescription>Recent system events and alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">High claim volume detected</p>
                <p className="text-sm text-muted-foreground">15% above normal threshold</p>
              </div>
              <Badge variant="destructive">Alert</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Batch processing completed</p>
                <p className="text-sm text-muted-foreground">1,247 claims processed</p>
              </div>
              <Badge variant="outline" className="text-green-600">Success</Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">Fraud review queue updated</p>
                <p className="text-sm text-muted-foreground">3 new cases added</p>
              </div>
              <Badge variant="outline">New</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims Processing Status */
      }
      <Card>
        <CardHeader>
          <CardTitle>Claims Processing Overview</CardTitle>
          <CardDescription>Current status of claims in the system</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Pending Review</p>
              <p className="text-2xl font-bold">247</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-sm font-medium">Under Investigation</p>
              <p className="text-2xl font-bold">89</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">Approved Today</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-destructive" />
            <div>
              <p className="text-sm font-medium">Requires Action</p>
              <p className="text-2xl font-bold">23</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Past Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Past Transactions</CardTitle>
          <CardDescription>Recent membership and premium payments (demo)</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Member / Company</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { date: "2025-08-05", who: "Sarah Johnson", method: "Card", amount: 129.0, status: "Paid" },
                { date: "2025-08-05", who: "TechCorp Inc.", method: "Bank", amount: 12450.0, status: "Paid" },
                { date: "2025-08-04", who: "Michael Chen", method: "Card", amount: 129.0, status: "Failed" },
                { date: "2025-08-04", who: "Global Manufacturing", method: "Invoice", amount: 8990.0, status: "Pending" },
              ].map((t) => (
                <TableRow key={t.date + t.who}>
                  <TableCell>{t.date}</TableCell>
                  <TableCell>{t.who}</TableCell>
                  <TableCell>{t.method}</TableCell>
                  <TableCell className="text-right">${t.amount.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge className={
                      t.status === "Paid"
                        ? "bg-emerald-100 text-emerald-800 border-emerald-200"
                        : t.status === "Pending"
                        ? "bg-amber-100 text-amber-800 border-amber-200"
                        : "bg-rose-100 text-rose-800 border-rose-200"
                    }>
                      {t.status}
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
