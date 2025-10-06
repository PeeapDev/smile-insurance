import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, Shield, DollarSign, FileText, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChatWidget } from "@/components/chat-widget"

export default function CompanyDashboard() {
  const company = {
    name: "Acme Corp.",
    totalEmployees: 156,
    activePlans: 3,
    pendingClaims: 5,
    monthlyPremium: "$15,000",
  }

  const quickActions = [
    {
      title: "Add New Employee",
      description: "Enroll a new employee into your company's plan.",
      icon: Users,
      href: "/company/employees/add",
    },
    {
      title: "Manage Group Plans",
      description: "View and adjust your company's insurance plans.",
      icon: Shield,
      href: "/company/plans",
    },
    {
      title: "Review Billing",
      description: "Access your billing statements and payment history.",
      icon: DollarSign,
      href: "/company/billing",
    },
    {
      title: "View Claims Overview",
      description: "Monitor claims submitted by your employees.",
      icon: FileText,
      href: "/company/claims",
    },
  ]

  const recentActivity = [
    {
      type: "Employee Added",
      description: "New employee, Alice Johnson, enrolled.",
      date: "2024-07-28",
      status: "Success",
      icon: Users,
    },
    {
      type: "Monthly Premium Paid",
      description: "Payment of $15,000 processed.",
      date: "2024-07-25",
      status: "Completed",
      icon: DollarSign,
    },
    {
      type: "Claim Update",
      description: "Claim #CLM2024003 for Bob's visit approved.",
      date: "2024-07-20",
      status: "Approved",
      icon: FileText,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {company.name}!</h1>
        <p className="text-gray-600">Your company's health insurance dashboard.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Key Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Total Employees</CardTitle>
            <CardDescription>Employees covered under your plans.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-blue-600">{company.totalEmployees}</div>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500">+5</span> new enrollments this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Active Group Plans</CardTitle>
            <CardDescription>Number of active insurance plans.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-green-600">{company.activePlans}</div>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500">No changes</span> this quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Claims</CardTitle>
            <CardDescription>Claims from your employees awaiting processing.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-orange-600">{company.pendingClaims}</div>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-red-500">-2</span> from last week
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common company-level tasks.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {quickActions.map((action, index) => (
              <Button key={index} variant="outline" className="w-full justify-start h-auto py-3 bg-transparent" asChild>
                <Link href={action.href}>
                  <action.icon className="mr-3 h-5 w-5 text-blue-600" />
                  <div className="flex flex-col items-start">
                    <span className="font-medium">{action.title}</span>
                    <span className="text-xs text-muted-foreground">{action.description}</span>
                  </div>
                  <ArrowRight className="ml-auto h-4 w-4" />
                </Link>
              </Button>
            ))}
          </CardContent>
        </Card>

        {/* Recent Activity Card */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest events related to your company's insurance.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-4">
                <div className="p-3 rounded-full bg-gray-100">
                  <activity.icon className="h-5 w-5 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="font-medium">{activity.type}</p>
                  <p className="text-sm text-gray-600">{activity.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">{activity.date}</p>
                  <Badge variant={activity.status === "Pending" ? "secondary" : "default"}>{activity.status}</Badge>
                </div>
              </div>
            ))}
            <Separator />
            <Button variant="link" className="w-full justify-center" asChild>
              <Link href="/company/activity-log">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}
