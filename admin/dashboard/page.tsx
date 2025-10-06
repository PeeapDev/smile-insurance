import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Users, CreditCard, FileText, BarChart3, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChatWidget } from "@/components/chat-widget"

export default function AdminDashboard() {
  const stats = {
    totalMembers: "50,123",
    activePolicies: "48,900",
    pendingClaims: 23,
    newCardsIssued: 156,
    totalRevenue: "$12.5M",
  }

  const quickActions = [
    {
      title: "Create New Card",
      description: "Issue a new insurance card for a member.",
      icon: CreditCard,
      href: "/admin/cards/create",
    },
    {
      title: "Manage Members",
      description: "View, edit, or add new members.",
      icon: Users,
      href: "/admin/members",
    },
    {
      title: "Review Claims",
      description: "Process pending insurance claims.",
      icon: FileText,
      href: "/admin/claims",
    },
    {
      title: "Generate Reports",
      description: "Access various system reports.",
      icon: BarChart3,
      href: "/admin/reports",
    },
  ]

  const recentActivity = [
    {
      type: "New Member Registered",
      description: "Sarah Connor (Policy: POL998877)",
      date: "2024-07-30",
      status: "Success",
      icon: Users,
    },
    {
      type: "Claim Submitted",
      description: "Claim #CLM2024005 for dental work.",
      date: "2024-07-29",
      status: "Pending",
      icon: FileText,
    },
    {
      type: "Card Issued",
      description: "New card for Michael Brown.",
      date: "2024-07-28",
      status: "Completed",
      icon: CreditCard,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600">Overview of the SMILE Insurance Medicare system.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Key Metrics */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Total Members</CardTitle>
            <CardDescription>Current number of registered members.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-blue-600">{stats.totalMembers}</div>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500">+1.2%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Active Policies</CardTitle>
            <CardDescription>Currently active insurance policies.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-green-600">{stats.activePolicies}</div>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-green-500">+0.8%</span> from last month
            </p>
          </CardContent>
        </Card>
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Pending Claims</CardTitle>
            <CardDescription>Claims awaiting review and processing.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-5xl font-bold text-orange-600">{stats.pendingClaims}</div>
            <p className="text-sm text-gray-500 mt-2">
              <span className="text-red-500">-15%</span> from last week
            </p>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="md:col-span-2 xl:col-span-3 h-full">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common administrative tasks.</CardDescription>
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
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest system events and user actions.</CardDescription>
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
              <Link href="/admin/activity-log">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}
