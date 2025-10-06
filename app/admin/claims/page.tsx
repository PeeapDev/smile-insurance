"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea"
import {
  Search,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  DollarSign,
  FileText,
  Calendar,
  TrendingUp,
  TrendingDown,
  MoreHorizontal,
  Download,
  Send,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"

const claimsData = [
  {
    id: "CLM-2024-001",
    patient: "Sarah Johnson",
    company: "TechCorp Inc.",
    type: "Medical",
    amount: 2450.0,
    status: "pending",
    priority: "high",
    submittedDate: "2024-01-15",
    dueDate: "2024-01-22",
    provider: "City General Hospital",
    diagnosis: "Routine Checkup",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CLM-2024-002",
    patient: "Michael Chen",
    company: "StartupXYZ",
    type: "Dental",
    amount: 890.0,
    status: "approved",
    priority: "medium",
    submittedDate: "2024-01-14",
    dueDate: "2024-01-21",
    provider: "Smile Dental Clinic",
    diagnosis: "Dental Cleaning",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CLM-2024-003",
    patient: "Emily Rodriguez",
    company: "Global Solutions",
    type: "Vision",
    amount: 320.0,
    status: "rejected",
    priority: "low",
    submittedDate: "2024-01-13",
    dueDate: "2024-01-20",
    provider: "Vision Care Center",
    diagnosis: "Eye Exam",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CLM-2024-004",
    patient: "David Wilson",
    company: "Manufacturing Co.",
    type: "Emergency",
    amount: 5200.0,
    status: "under_review",
    priority: "urgent",
    submittedDate: "2024-01-12",
    dueDate: "2024-01-19",
    provider: "Emergency Medical Center",
    diagnosis: "Work Injury",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "CLM-2024-005",
    patient: "Lisa Thompson",
    company: "Retail Chain",
    type: "Prescription",
    amount: 180.0,
    status: "processing",
    priority: "medium",
    submittedDate: "2024-01-11",
    dueDate: "2024-01-18",
    provider: "Community Pharmacy",
    diagnosis: "Medication Refill",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "under_review":
      return "bg-blue-100 text-blue-800 border-blue-200"
    case "processing":
      return "bg-purple-100 text-purple-800 border-purple-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPriorityColor = (priority: string) => {
  switch (priority) {
    case "urgent":
      return "bg-red-500"
    case "high":
      return "bg-orange-500"
    case "medium":
      return "bg-yellow-500"
    case "low":
      return "bg-green-500"
    default:
      return "bg-gray-500"
  }
}

export default function ClaimsProcessingPage() {
  const router = useRouter()
  const [selectedClaim, setSelectedClaim] = useState<any>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")

  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch =
      claim.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || claim.status === statusFilter
    const matchesPriority = priorityFilter === "all" || claim.priority === priorityFilter
    return matchesSearch && matchesStatus && matchesPriority
  })

  const stats = {
    totalClaims: claimsData.length,
    pendingClaims: claimsData.filter((c) => c.status === "pending").length,
    approvedClaims: claimsData.filter((c) => c.status === "approved").length,
    rejectedClaims: claimsData.filter((c) => c.status === "rejected").length,
    totalAmount: claimsData.reduce((sum, claim) => sum + claim.amount, 0),
    avgProcessingTime: "3.2 days",
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Claims Processing</h1>
          <p className="text-muted-foreground">Manage and process insurance claims efficiently</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={() => router.push(ROUTES.admin.memberCreate.replace("/members/create", "/claims/submit"))}>
            <FileText className="h-4 w-4 mr-2" />
            New Claim
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-sky-50 to-white dark:from-sky-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Claims</CardTitle>
            <FileText className="h-4 w-4 text-sky-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sky-700 dark:text-sky-300">{stats.totalClaims}</div>
            <p className="text-xs text-sky-700/70 dark:text-sky-300/80">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">{stats.pendingClaims}</div>
            <p className="text-xs text-amber-700/70 dark:text-amber-300/80">
              <AlertTriangle className="h-3 w-3 inline mr-1" />
              Requires attention
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Amount</CardTitle>
            <DollarSign className="h-4 w-4 text-rose-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-rose-700 dark:text-rose-300">${stats.totalAmount.toLocaleString()}</div>
            <p className="text-xs text-rose-700/70 dark:text-rose-300/80">
              <TrendingDown className="h-3 w-3 inline mr-1" />
              -5% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Processing</CardTitle>
            <Calendar className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{stats.avgProcessingTime}</div>
            <p className="text-xs text-emerald-700/70 dark:text-emerald-300/80">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              Improved by 0.5 days
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-claims" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-claims">All Claims</TabsTrigger>
          <TabsTrigger value="pending">Pending ({stats.pendingClaims})</TabsTrigger>
          <TabsTrigger value="urgent">Urgent</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-claims" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filters & Search</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Claims</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by patient, claim ID, or company..."
                      className="pl-8"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="status">Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                      <SelectItem value="under_review">Under Review</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Priorities" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      <SelectItem value="urgent">Urgent</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Claims Table */}
          <Card>
            <CardHeader>
              <CardTitle>Claims List ({filteredClaims.length})</CardTitle>
              <CardDescription>Manage and process insurance claims</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Patient</TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Priority</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredClaims.map((claim) => (
                    <TableRow key={claim.id}>
                      <TableCell className="font-medium">{claim.id}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={claim.avatar || "/placeholder.svg"} alt={claim.patient} />
                            <AvatarFallback>
                              {claim.patient
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span>{claim.patient}</span>
                        </div>
                      </TableCell>
                      <TableCell>{claim.company}</TableCell>
                      <TableCell>{claim.type}</TableCell>
                      <TableCell>${claim.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(claim.status)}>{claim.status.replace("_", " ")}</Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getPriorityColor(claim.priority)}`} />
                          <span className="capitalize">{claim.priority}</span>
                        </div>
                      </TableCell>
                      <TableCell>{claim.dueDate}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setSelectedClaim(claim)}>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Approve
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="h-4 w-4 mr-2" />
                              Reject
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Send className="h-4 w-4 mr-2" />
                              Request Info
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Claims</CardTitle>
              <CardDescription>Claims requiring immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimsData
                  .filter((c) => c.status === "pending")
                  .map((claim) => (
                    <div key={claim.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar>
                          <AvatarImage src={claim.avatar || "/placeholder.svg"} alt={claim.patient} />
                          <AvatarFallback>
                            {claim.patient
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{claim.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {claim.id} • {claim.company}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">${claim.amount.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">Due: {claim.dueDate}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button size="sm" variant="outline">
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Urgent Claims</CardTitle>
              <CardDescription>High priority claims requiring immediate action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {claimsData
                  .filter((c) => c.priority === "urgent" || c.priority === "high")
                  .map((claim) => (
                    <div
                      key={claim.id}
                      className="flex items-center justify-between p-4 border-l-4 border-red-500 bg-red-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <AlertTriangle className="h-6 w-6 text-red-500" />
                        <div>
                          <p className="font-medium">{claim.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {claim.diagnosis} • {claim.provider}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-red-100 text-red-800 border-red-200">{claim.priority.toUpperCase()}</Badge>
                        <Button size="sm">Review Now</Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Processing Time Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Average Processing Time</span>
                    <span className="font-medium">3.2 days</span>
                  </div>
                  <Progress value={68} className="w-full" />
                  <div className="flex justify-between items-center">
                    <span>Target: 2.5 days</span>
                    <span className="text-sm text-muted-foreground">68% efficiency</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Approval Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Current Approval Rate</span>
                    <span className="font-medium">87%</span>
                  </div>
                  <Progress value={87} className="w-full" />
                  <div className="flex justify-between items-center">
                    <span>Industry Average: 82%</span>
                    <span className="text-sm text-green-600">+5% above average</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Claim Details Dialog */}
      <Dialog open={!!selectedClaim} onOpenChange={() => setSelectedClaim(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Claim Details - {selectedClaim?.id}</DialogTitle>
            <DialogDescription>Review and process this insurance claim</DialogDescription>
          </DialogHeader>
          {selectedClaim && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Patient Information</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="font-medium">{selectedClaim.patient}</p>
                    <p className="text-sm text-muted-foreground">{selectedClaim.company}</p>
                  </div>
                </div>
                <div>
                  <Label>Claim Amount</Label>
                  <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                    <p className="text-2xl font-bold">${selectedClaim.amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div>
                <Label>Provider & Diagnosis</Label>
                <div className="mt-2 p-3 bg-gray-50 rounded-lg">
                  <p className="font-medium">{selectedClaim.provider}</p>
                  <p className="text-sm text-muted-foreground">{selectedClaim.diagnosis}</p>
                </div>
              </div>
              <div>
                <Label>Processing Notes</Label>
                <Textarea placeholder="Add notes about this claim..." className="mt-2" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setSelectedClaim(null)}>
                  Cancel
                </Button>
                <Button variant="outline">
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
