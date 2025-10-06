"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Shield, CreditCard, FileText, Users, DollarSign, Calendar, Phone, Mail, Activity } from "lucide-react"
import { ChatWidget } from "@/components/chat-widget"

export default function UserDashboard() {
  const deductibleProgress = 65 // 65% of deductible met

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, John!</h2>
        <div className="flex items-center space-x-2">
          <Badge variant="outline">Premium Member</Badge>
        </div>
      </div>

      {/* Policy Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group/card relative overflow-hidden border-0 text-white bg-gradient-to-br from-emerald-500 via-emerald-600 to-green-600 shadow-lg ring-1 ring-white/20 transition-all duration-500 ease-out hover:shadow-2xl hover:ring-white/40 hover:scale-[1.01]">
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.28),transparent_55%)] opacity-0 blur-2xl scale-100 transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:scale-105" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Policy Status</CardTitle>
            <Shield className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-white/80">Expires Dec 31, 2024</p>
          </CardContent>
        </Card>
        <Card className="group/card relative overflow-hidden border-0 text-white bg-gradient-to-br from-sky-500 via-blue-600 to-indigo-700 shadow-lg ring-1 ring-white/20 transition-all duration-500 ease-out hover:shadow-2xl hover:ring-white/40 hover:scale-[1.01]">
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_top_right,rgba(255,255,255,0.28),transparent_55%)] opacity-0 blur-2xl scale-100 transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:scale-105" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Premium</CardTitle>
            <DollarSign className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$289</div>
            <p className="text-xs text-white/80">Next payment due Jan 15</p>
          </CardContent>
        </Card>
        <Card className="group/card relative overflow-hidden border-0 text-white bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 shadow-lg ring-1 ring-white/20 transition-all duration-500 ease-out hover:shadow-2xl hover:ring-white/40 hover:scale-[1.01]">
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_bottom_left,rgba(255,255,255,0.26),transparent_58%)] opacity-0 blur-2xl scale-100 transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:scale-105" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Deductible</CardTitle>
            <Activity className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$650 / $1,000</div>
            <Progress value={deductibleProgress} className="mt-2" />
            <p className="text-xs text-white/80 mt-1">{deductibleProgress}% met this year</p>
          </CardContent>
        </Card>
        <Card className="group/card relative overflow-hidden border-0 text-white bg-gradient-to-br from-fuchsia-500 via-fuchsia-600 to-purple-700 shadow-lg ring-1 ring-white/20 transition-all duration-500 ease-out hover:shadow-2xl hover:ring-white/40 hover:scale-[1.01]">
          <div className="pointer-events-none absolute -inset-10 bg-[radial-gradient(ellipse_at_bottom_right,rgba(255,255,255,0.26),transparent_58%)] opacity-0 blur-2xl scale-100 transition-all duration-500 ease-out group-hover/card:opacity-100 group-hover/card:scale-105" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Family Members</CardTitle>
            <Users className="h-4 w-4 text-white/90" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-white/80">All covered under plan</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Quick Actions */}
        <Card className="col-span-4 border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and services</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <CreditCard className="h-6 w-6" />
              View Insurance Card
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <FileText className="h-6 w-6" />
              File a Claim
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <Users className="h-6 w-6" />
              Manage Family
            </Button>
            <Button className="h-20 flex-col gap-2 bg-transparent" variant="outline">
              <DollarSign className="h-6 w-6" />
              Make Payment
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="col-span-3 border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Your latest insurance activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <FileText className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Claim submitted</p>
                  <p className="text-sm text-muted-foreground">Dental cleaning - $150</p>
                </div>
                <Badge variant="secondary">Pending</Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <DollarSign className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Payment processed</p>
                  <p className="text-sm text-muted-foreground">Monthly premium - $289</p>
                </div>
                <Badge variant="outline" className="text-green-600">
                  Paid
                </Badge>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    <Calendar className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium leading-none">Appointment scheduled</p>
                  <p className="text-sm text-muted-foreground">Annual checkup - Dr. Smith</p>
                </div>
                <Badge variant="outline">Upcoming</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contact Information */}
      <Card className="border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
        <CardHeader>
          <CardTitle>Emergency Contacts & Support</CardTitle>
          <CardDescription>Important numbers and support information</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-red-600" />
            <div>
              <p className="text-sm font-medium">Emergency: 911</p>
              <p className="text-xs text-muted-foreground">Life-threatening emergencies</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Phone className="h-4 w-4 text-blue-600" />
            <div>
              <p className="text-sm font-medium">Member Services</p>
              <p className="text-xs text-muted-foreground">1-800-SMILE-INS</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-green-600" />
            <div>
              <p className="text-sm font-medium">support@smileins.com</p>
              <p className="text-xs text-muted-foreground">Email support</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ChatWidget />
    </div>
  )
}
