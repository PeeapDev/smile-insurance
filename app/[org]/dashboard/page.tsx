"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  Users,
  Shield,
  FileText,
  DollarSign,
  UserPlus,
  Activity,
  CheckCircle,
  Clock,
} from "lucide-react"
import { ChatWidget } from "@/components/chat-widget"

function titleCase(slug: string) {
  return slug
    .split("-")
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" ")
}

export default function CompanyDashboardBySlug() {
  const params = useParams<{ company: string }>()
  const company = params?.company || "Company"
  const companyName = titleCase(company)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">{companyName} Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline" className="text-green-600">
            Enterprise Plan
          </Badge>
        </div>
      </div>

      {/* Company Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-0 text-white bg-gradient-to-br from-blue-500 to-indigo-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-white/80">+12 new hires this month</p>
          </CardContent>
        </Card>
        <Card className="border-0 text-white bg-gradient-to-br from-emerald-500 to-green-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Plans</CardTitle>
            <Shield className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">234</div>
            <p className="text-xs text-white/80">94.7% enrollment rate</p>
          </CardContent>
        </Card>
        <Card className="border-0 text-white bg-gradient-to-br from-orange-500 to-amber-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Claims</CardTitle>
            <FileText className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-white/80">Avg. processing: 2.1 days</p>
          </CardContent>
        </Card>
        <Card className="border-0 text-white bg-gradient-to-br from-fuchsia-500 to-purple-600">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Premium</CardTitle>
            <DollarSign className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$47,890</div>
            <p className="text-xs text-white/80">Next payment due Jan 15</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions */}
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Company Actions</CardTitle>
            <CardDescription>Manage your company's insurance needs</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Button asChild className="h-20 flex-col gap-2 bg-sky-600 hover:bg-sky-700 text-white">
              <Link href={`/${company}/employees`}>
                <UserPlus className="h-6 w-6" />
                Add Employee
              </Link>
            </Button>
            <Button asChild className="h-20 flex-col gap-2 bg-indigo-600 hover:bg-indigo-700 text-white">
              <Link href={`/${company}/policies`}>
                <Shield className="h-6 w-6" />
                Manage Plans
              </Link>
            </Button>
            <Button asChild className="h-20 flex-col gap-2 bg-amber-500 hover:bg-amber-600 text-white">
              <Link href={`/${company}/billing`}>
                <DollarSign className="h-6 w-6" />
                Review Billing
              </Link>
            </Button>
            <Button asChild className="h-20 flex-col gap-2 bg-violet-600 hover:bg-violet-700 text-white">
              <Link href={`/${company}/claims`}>
                <FileText className="h-6 w-6" />
                View Claims
              </Link>
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest company insurance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <UserPlus className="h-4 w-4 text-green-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">New employee enrolled</p>
                  <p className="text-sm text-muted-foreground">Sarah Johnson - Premium Plan</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  New
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <DollarSign className="h-4 w-4 text-blue-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Payment processed</p>
                  <p className="text-sm text-muted-foreground">Monthly premium - $47,890</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  Paid
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <FileText className="h-4 w-4 text-orange-600" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Claim submitted</p>
                  <p className="text-sm text-muted-foreground">Employee medical claim - $2,450</p>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Employee Overview */}
      <Card className="border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <CardHeader>
          <CardTitle>Employee Insurance Overview</CardTitle>
          <CardDescription>Current status of employee insurance coverage</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-4">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">Enrolled</p>
              <p className="text-2xl font-bold">234</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-orange-600" />
            <div>
              <p className="text-sm font-medium">Pending Enrollment</p>
              <p className="text-2xl font-bold">8</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Eligible</p>
              <p className="text-2xl font-bold">247</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-sm font-medium">Utilization Rate</p>
              <p className="text-2xl font-bold">78%</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact / Account Management */}
      <Card className="border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <CardHeader>
          <CardTitle>Account Management</CardTitle>
          <CardDescription>Your dedicated account management team</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Account Manager</p>
              <p className="text-xs text-muted-foreground">1-800-SMILE-BIZ</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <DollarSign className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">business@smileins.com</p>
              <p className="text-xs text-muted-foreground">Business support</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-purple-600" />
            <div>
              <p className="text-sm font-medium">Schedule Review</p>
              <p className="text-xs text-muted-foreground">Quarterly business review</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChatWidget />
    </div>
  )
}
