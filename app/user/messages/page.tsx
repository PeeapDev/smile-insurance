"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { MessageSquare, Send, Search, Plus, Reply, Archive, Trash2, Clock, CheckCircle, AlertCircle } from 'lucide-react'

export default function MessagesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMessage, setSelectedMessage] = useState<number | null>(null)

  const messages = [
    {
      id: 1,
      subject: "Claim Update - CLM-2024-001",
      from: "Claims Department",
      date: "2024-01-15",
      time: "2:30 PM",
      status: "unread",
      priority: "high",
      category: "Claims",
      preview: "Your claim for emergency room visit has been approved and processed...",
      content:
        "Dear John Smith,\n\nWe're pleased to inform you that your claim CLM-2024-001 for emergency room visit at City General Hospital has been approved and processed.\n\nClaim Details:\n- Service Date: January 15, 2024\n- Provider: City General Hospital\n- Total Amount: $2,450.00\n- Approved Amount: $1,960.00\n- Your Responsibility: $490.00\n\nPayment has been sent directly to the provider. You may receive a separate bill for your portion.\n\nIf you have any questions, please don't hesitate to contact us.\n\nBest regards,\nSmile Insurance Claims Team",
    },
    {
      id: 2,
      subject: "Welcome to Premium Health Plus",
      from: "Member Services",
      date: "2024-01-01",
      time: "9:00 AM",
      status: "read",
      priority: "normal",
      category: "General",
      preview: "Welcome to your new insurance plan! Here's everything you need to know...",
      content:
        "Dear John Smith,\n\nWelcome to Premium Health Plus! We're excited to have you as a member.\n\nYour coverage is now active and includes:\n- Comprehensive medical coverage\n- Prescription drug benefits\n- Vision and dental coverage\n- 24/7 member support\n\nYour member ID is: SIA123456789\n\nTo get started:\n1. Download your digital ID card\n2. Find in-network providers\n3. Schedule your first appointment\n\nWelcome to the Smile Insurance family!\n\nBest regards,\nMember Services Team",
    },
    {
      id: 3,
      subject: "Prescription Prior Authorization Required",
      from: "Pharmacy Benefits",
      date: "2024-01-10",
      time: "11:15 AM",
      status: "read",
      priority: "high",
      category: "Pharmacy",
      preview: "Prior authorization is required for your recent prescription request...",
      content:
        "Dear John Smith,\n\nWe received a request for prior authorization for the following medication:\n\nMedication: Specialty Heart Medication\nPrescribing Doctor: Dr. Sarah Johnson\nPharmacy: Metro Pharmacy\n\nTo complete this request, we need:\n1. Medical records supporting the need\n2. Previous medication trials\n3. Doctor's treatment plan\n\nYour doctor can submit these documents through our provider portal, or you can call us at 1-800-SMILE-04.\n\nProcessing time: 3-5 business days\n\nThank you,\nPharmacy Benefits Team",
    },
    {
      id: 4,
      subject: "Annual Wellness Visit Reminder",
      from: "Preventive Care Team",
      date: "2024-01-08",
      time: "10:00 AM",
      status: "read",
      priority: "normal",
      category: "Preventive Care",
      preview: "Don't forget to schedule your annual wellness visit - it's 100% covered...",
      content:
        "Dear John Smith,\n\nThis is a friendly reminder that you're due for your annual wellness visit.\n\nBenefits of your annual wellness visit:\n- 100% covered by your plan\n- Comprehensive health screening\n- Personalized health plan\n- Early detection of health issues\n- Vaccination updates\n\nTo schedule your appointment:\n- Call your primary care doctor\n- Use our online provider directory\n- Contact member services for assistance\n\nTake charge of your health today!\n\nBest regards,\nPreventive Care Team",
    },
    {
      id: 5,
      subject: "Payment Confirmation - January 2024",
      from: "Billing Department",
      date: "2024-01-01",
      time: "12:00 PM",
      status: "read",
      priority: "normal",
      category: "Billing",
      preview: "Your payment of $299.00 has been successfully processed...",
      content:
        "Dear John Smith,\n\nThis confirms that your payment has been successfully processed.\n\nPayment Details:\n- Amount: $299.00\n- Payment Method: Auto-Pay (Visa ending in 4532)\n- Payment Date: January 1, 2024\n- Coverage Period: January 2024\n\nYour account is current and your coverage remains active.\n\nNext payment due: February 1, 2024\n\nThank you for choosing Smile Insurance!\n\nBest regards,\nBilling Department",
    },
  ]

  const getStatusColor = (status: string) => (status === "unread" ? "default" : "secondary")
  const getPriorityColor = (priority: string) => (priority === "high" ? "destructive" : "secondary")
  const getStatusIcon = (status: string) => (status === "unread" ? AlertCircle : CheckCircle)

  const filteredMessages = messages.filter(
    (message) =>
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.from.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Messages</h1>
          <p className="text-muted-foreground">Communicate with your insurance team</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Message
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Send New Message</DialogTitle>
              <DialogDescription>Send a message to our support team</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="department">Department</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="claims">Claims Department</SelectItem>
                    <SelectItem value="billing">Billing Department</SelectItem>
                    <SelectItem value="member">Member Services</SelectItem>
                    <SelectItem value="pharmacy">Pharmacy Benefits</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Enter message subject" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Type your message here..." rows={4} />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline">Cancel</Button>
                <Button>
                  <Send className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-neutral-700" />
              <div>
                <p className="text-2xl font-bold">5</p>
                <p className="text-sm text-muted-foreground">Total Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-amber-700" />
              <div>
                <p className="text-2xl font-bold">1</p>
                <p className="text-sm text-muted-foreground">Unread</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">2</p>
                <p className="text-sm text-muted-foreground">High Priority</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-muted-foreground">Read</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search messages by subject, sender, or category..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Inbox</CardTitle>
            <CardDescription>Your recent messages</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {filteredMessages.map((message) => {
                const StatusIcon = getStatusIcon(message.status)
                return (
                  <div
                    key={message.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-muted/50 ${
                      selectedMessage === message.id ? "bg-muted/50 border-primary" : ""
                    } ${message.status === "unread" ? "bg-neutral-50/50" : ""}`}
                    onClick={() => setSelectedMessage(message.id)}
                    aria-label={`Open message: ${message.subject}`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <StatusIcon
                          className={`w-4 h-4 ${message.status === "unread" ? "text-neutral-800" : "text-emerald-700"}`}
                        />
                        <h4 className={`font-medium ${message.status === "unread" ? "font-semibold" : ""}`}>
                          {message.subject}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(message.priority)} className="text-xs">
                          {message.priority}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {message.category}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{message.from}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{message.preview}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-muted-foreground">
                        {message.date} at {message.time}
                      </span>
                      <Badge variant={getStatusColor(message.status)} className="text-xs">
                        {message.status}
                      </Badge>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Message Details</CardTitle>
            <CardDescription>{selectedMessage ? "View message content" : "Select a message to view details"}</CardDescription>
          </CardHeader>
          <CardContent>
            {selectedMessage ? (
              <div className="space-y-4">
                {(() => {
                  const message = messages.find((m) => m.id === selectedMessage)
                  if (!message) return null

                  return (
                    <>
                      <div className="border-b pb-4">
                        <h3 className="text-lg font-semibold mb-2">{message.subject}</h3>
                        <div className="flex items-center justify-between text-sm text-muted-foreground">
                          <span>From: {message.from}</span>
                          <span>
                            {message.date} at {message.time}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-2">
                          <Badge variant={getPriorityColor(message.priority)} className="text-xs">
                            {message.priority} priority
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {message.category}
                          </Badge>
                        </div>
                      </div>

                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{message.content}</pre>
                      </div>

                      <div className="flex gap-2 pt-4 border-t">
                        <Button size="sm">
                          <Reply className="w-4 h-4 mr-2" />
                          Reply
                        </Button>
                        <Button variant="outline" size="sm">
                          <Archive className="w-4 h-4 mr-2" />
                          Archive
                        </Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Delete
                        </Button>
                      </div>
                    </>
                  )
                })()}
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Select a message to view its content</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageSquare className="w-5 h-5" />
              Contact Claims
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageSquare className="w-5 h-5" />
              Billing Support
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageSquare className="w-5 h-5" />
              Member Services
            </Button>
            <Button variant="outline" className="h-16 flex-col gap-2">
              <MessageSquare className="w-5 h-5" />
              Pharmacy Help
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
