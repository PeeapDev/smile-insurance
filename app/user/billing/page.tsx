"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { DollarSign, CreditCard, Calendar, Download, Bell, Settings, CheckCircle, Clock, AlertCircle } from 'lucide-react'

export default function BillingPage() {
  const [autoPayEnabled, setAutoPayEnabled] = useState(true)

  const billingData = {
    currentBalance: "$0.00",
    nextPayment: "$299.00",
    nextDueDate: "February 1, 2024",
    paymentMethod: "•••• •••• •••• 4532",
    planName: "Premium Health Plus",
    monthlyPremium: "$299.00",
  }

  const paymentHistory = [
    {
      id: "PAY-2024-001",
      date: "2024-01-01",
      amount: "$299.00",
      method: "Auto-Pay (Visa ••4532)",
      status: "Paid",
      description: "Monthly Premium - January 2024",
    },
    {
      id: "PAY-2023-012",
      date: "2023-12-01",
      amount: "$299.00",
      method: "Auto-Pay (Visa ••4532)",
      status: "Paid",
      description: "Monthly Premium - December 2023",
    },
    {
      id: "PAY-2023-011",
      date: "2023-11-01",
      amount: "$299.00",
      method: "Auto-Pay (Visa ••4532)",
      status: "Paid",
      description: "Monthly Premium - November 2023",
    },
    {
      id: "PAY-2023-010",
      date: "2023-10-01",
      amount: "$299.00",
      method: "Manual Payment",
      status: "Paid",
      description: "Monthly Premium - October 2023",
    },
  ]

  const upcomingPayments = [
    { date: "2024-02-01", amount: "$299.00", description: "Monthly Premium - February 2024", status: "Scheduled" },
    { date: "2024-03-01", amount: "$299.00", description: "Monthly Premium - March 2024", status: "Scheduled" },
    { date: "2024-04-01", amount: "$299.00", description: "Monthly Premium - April 2024", status: "Scheduled" },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Scheduled":
        return "secondary"
      case "Overdue":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Paid":
        return CheckCircle
      case "Scheduled":
        return Clock
      case "Overdue":
        return AlertCircle
      default:
        return Clock
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Billing & Payments</h1>
          <p className="text-muted-foreground">Manage your insurance payments and billing information</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <CreditCard className="w-4 h-4 mr-2" />
              Make Payment
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Make a Payment</DialogTitle>
              <DialogDescription>Pay your insurance premium securely online.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="amount">Payment Amount</Label>
                <Input id="amount" placeholder="$299.00" />
              </div>
              <div>
                <Label htmlFor="method">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select payment method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="card1">Visa ending in 4532</SelectItem>
                    <SelectItem value="card2">Add new card</SelectItem>
                    <SelectItem value="bank">Bank transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>Process Payment</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="text-2xl font-bold text-emerald-700">{billingData.currentBalance}</p>
                <p className="text-sm text-muted-foreground">Current Balance</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-neutral-700" />
              <div>
                <p className="text-2xl font-bold">{billingData.nextPayment}</p>
                <p className="text-sm text-muted-foreground">Next Payment</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-700" />
              <div>
                <p className="text-lg font-bold">Feb 1</p>
                <p className="text-sm text-muted-foreground">Due Date</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-700" />
              <div>
                <p className="text-lg font-bold">••4532</p>
                <p className="text-sm text-muted-foreground">Payment Method</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Current Plan
            </CardTitle>
            <CardDescription>Your active insurance plan details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Plan Name</span>
                <span className="font-medium">{billingData.planName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Monthly Premium</span>
                <span className="font-medium">{billingData.monthlyPremium}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Payment Method</span>
                <span className="font-medium">{billingData.paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Next Due Date</span>
                <span className="font-medium">{billingData.nextDueDate}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Manage your payment preferences</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Auto-Pay</p>
                  <p className="text-sm text-muted-foreground">Automatically pay your monthly premium</p>
                </div>
                <Switch checked={autoPayEnabled} onCheckedChange={setAutoPayEnabled} />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Payment Reminders</p>
                  <p className="text-sm text-muted-foreground">Get notified before payments are due</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Receipts</p>
                  <p className="text-sm text-muted-foreground">Receive payment confirmations via email</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Button variant="outline" className="w-full">
                <CreditCard className="w-4 h-4 mr-2" />
                Update Payment Method
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="history" className="w-full">
        <TabsList>
          <TabsTrigger value="history">Payment History</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming Payments</TabsTrigger>
        </TabsList>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Your recent payment transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {paymentHistory.map((payment) => {
                  const StatusIcon = getStatusIcon(payment.status)
                  return (
                    <div key={payment.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <StatusIcon className="w-5 h-5 text-emerald-700" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">{payment.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                          <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              <Button variant="outline" className="w-full mt-4">
                <Download className="w-4 h-4 mr-2" />
                Download Payment History
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="upcoming">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Payments</CardTitle>
              <CardDescription>Your scheduled future payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayments.map((payment, index) => {
                  const StatusIcon = getStatusIcon(payment.status)
                  return (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                          <StatusIcon className="w-5 h-5 text-neutral-700" />
                        </div>
                        <div>
                          <p className="font-medium">{payment.description}</p>
                          <p className="text-sm text-muted-foreground">Auto-Pay Scheduled</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{payment.amount}</p>
                        <div className="flex items-center gap-2">
                          <p className="text-sm text-muted-foreground">{payment.date}</p>
                          <Badge variant={getStatusColor(payment.status)}>{payment.status}</Badge>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card className="bg-gradient-to-r from-neutral-50 to-emerald-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-neutral-900 rounded-lg flex items-center justify-center">
                <Bell className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900">Payment Reminder</h3>
                <p className="text-neutral-700 text-sm">Your next payment of $299.00 is due on February 1, 2024</p>
              </div>
            </div>
            <Button className="bg-neutral-900 hover:bg-neutral-800">Pay Now</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
