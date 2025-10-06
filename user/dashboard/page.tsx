import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { CreditCard, FileText, Users, DollarSign, Calendar, ArrowRight } from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ChatWidget } from "@/components/chat-widget"

export default function UserDashboard() {
  const user = {
    name: "John Doe",
    policyStatus: "Active",
    policyType: "Standard Family Plan",
    nextPaymentDue: "2024-08-01",
    unreadMessages: 2,
    pendingClaims: 1,
    upcomingAppointments: 1,
    deductibleMet: 300,
    totalDeductible: 500,
  }

  const quickActions = [
    {
      title: "View My Card",
      description: "Access your digital insurance card.",
      icon: CreditCard,
      href: "/cards",
    },
    {
      title: "File a Claim",
      description: "Submit a new medical claim.",
      icon: FileText,
      href: "/claims/submit",
    },
    {
      title: "Manage Family",
      description: "Add or remove family members.",
      icon: Users,
      href: "/family",
    },
    {
      title: "Make a Payment",
      description: "Pay your upcoming premium.",
      icon: DollarSign,
      href: "/billing",
    },
  ]

  const recentActivity = [
    {
      type: "Claim Submitted",
      description: "Claim #CLM2024001 for ER visit submitted.",
      date: "2024-07-25",
      status: "Pending",
      icon: FileText,
    },
    {
      type: "Payment Received",
      description: "Monthly premium payment processed.",
      date: "2024-07-20",
      status: "Completed",
      icon: DollarSign,
    },
    {
      type: "Appointment Reminder",
      description: "Dental check-up with Dr. Lee tomorrow.",
      date: "2024-07-31",
      status: "Upcoming",
      icon: Calendar,
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome, {user.name}!</h1>
        <p className="text-gray-600">Your personalized health insurance dashboard.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Policy Overview Card */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Policy Overview</span>
              <Badge variant={user.policyStatus === "Active" ? "default" : "outline"}>{user.policyStatus}</Badge>
            </CardTitle>
            <CardDescription>Your current plan details and status.</CardDescription>
          </CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Plan Type</p>
              <p className="text-lg font-semibold">{user.policyType}</p>
            </div>
            <div className="space-y-2">
              <p className="text-sm text-gray-600">Next Payment Due</p>
              <p className="text-lg font-semibold">{user.nextPaymentDue}</p>
            </div>
            <div className="space-y-2 md:col-span-2">
              <p className="text-sm text-gray-600">
                Deductible Progress (${user.deductibleMet} / ${user.totalDeductible})
              </p>
              <Progress value={(user.deductibleMet / user.totalDeductible) * 100} className="w-full" />
            </div>
            <div className="md:col-span-2 flex justify-end gap-2">
              <Button variant="outline" asChild>
                <Link href="/coverage">View Full Coverage</Link>
              </Button>
              <Button asChild>
                <Link href="/billing">Make a Payment</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Perform common tasks quickly.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
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
        <Card className="lg:col-span-full">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest interactions with SMILE Insurance.</CardDescription>
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
                  <Badge
                    variant={
                      activity.status === "Pending"
                        ? "secondary"
                        : activity.status === "Completed"
                          ? "default"
                          : "outline"
                    }
                  >
                    {activity.status}
                  </Badge>
                </div>
              </div>
            ))}
            <Separator />
            <Button variant="link" className="w-full justify-center" asChild>
              <Link href="/activity-log">View All Activity</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}
