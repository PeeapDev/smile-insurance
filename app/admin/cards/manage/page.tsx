"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Search,
  Building2,
  User,
  CreditCard,
  AlertTriangle,
  RefreshCw,
  Download,
  Mail,
  Phone,
  MapPin,
  DollarSign,
  FileText,
} from "lucide-react"
import { format } from "date-fns"

export default function CardManagePage() {
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [filterType, setFilterType] = useState("all")

  // Mock data for insurance cards
  const insuranceCards = [
    {
      id: "1",
      cardNumber: "SIMC1234567890",
      type: "Company",
      subscriberName: "TechCorp Solutions",
      contactPerson: "John Smith",
      email: "john.smith@techcorp.com",
      phone: "+1 (555) 123-4567",
      address: "123 Business Ave, Tech City, TC 12345",
      planType: "Corporate Premium",
      employeeCount: 150,
      subscriptionStart: "2024-01-01",
      subscriptionEnd: "2024-12-31",
      status: "Active",
      monthlyPremium: 15750,
      totalPaid: 157500,
      claimsThisYear: 23,
      lastPayment: "2024-01-01",
      renewalDate: "2024-12-31",
      daysToExpiry: 45,
    },
    {
      id: "2",
      cardNumber: "SIMC0987654321",
      type: "Individual",
      subscriberName: "Sarah Johnson",
      contactPerson: "Sarah Johnson",
      email: "sarah.johnson@email.com",
      phone: "+1 (555) 987-6543",
      address: "456 Residential St, Home City, HC 67890",
      planType: "Individual Standard",
      employeeCount: 1,
      subscriptionStart: "2023-06-15",
      subscriptionEnd: "2024-06-14",
      status: "Expired",
      monthlyPremium: 285,
      totalPaid: 3420,
      claimsThisYear: 3,
      lastPayment: "2024-05-15",
      renewalDate: "2024-06-14",
      daysToExpiry: -30,
    },
    {
      id: "3",
      cardNumber: "SIMC1122334455",
      type: "Company",
      subscriberName: "HealthFirst Medical Group",
      contactPerson: "Dr. Michael Brown",
      email: "m.brown@healthfirst.com",
      phone: "+1 (555) 234-5678",
      address: "789 Medical Plaza, Health City, HC 11111",
      planType: "Corporate Standard",
      employeeCount: 75,
      subscriptionStart: "2024-03-01",
      subscriptionEnd: "2025-02-28",
      status: "Active",
      monthlyPremium: 8250,
      totalPaid: 57750,
      claimsThisYear: 12,
      lastPayment: "2024-03-01",
      renewalDate: "2025-02-28",
      daysToExpiry: 120,
    },
    {
      id: "4",
      cardNumber: "SIMC9988776655",
      type: "Individual",
      subscriberName: "Robert Wilson",
      contactPerson: "Robert Wilson",
      email: "r.wilson@email.com",
      phone: "+1 (555) 345-6789",
      address: "321 Family Lane, Suburb City, SC 22222",
      planType: "Individual Premium",
      employeeCount: 1,
      subscriptionStart: "2024-01-15",
      subscriptionEnd: "2025-01-14",
      status: "Active",
      monthlyPremium: 425,
      totalPaid: 4675,
      claimsThisYear: 1,
      lastPayment: "2024-01-15",
      renewalDate: "2025-01-14",
      daysToExpiry: 75,
    },
    {
      id: "5",
      cardNumber: "SIMC5544332211",
      type: "Company",
      subscriberName: "StartupHub Inc",
      contactPerson: "Emily Davis",
      email: "emily@startuphub.com",
      phone: "+1 (555) 456-7890",
      address: "555 Innovation Blvd, Startup City, SC 33333",
      planType: "Corporate Basic",
      employeeCount: 25,
      subscriptionStart: "2024-02-01",
      subscriptionEnd: "2025-01-31",
      status: "Active",
      monthlyPremium: 3125,
      totalPaid: 31250,
      claimsThisYear: 5,
      lastPayment: "2024-02-01",
      renewalDate: "2025-01-31",
      daysToExpiry: 92,
    },
    {
      id: "6",
      cardNumber: "SIMC7766554433",
      type: "Individual",
      subscriberName: "Lisa Anderson",
      contactPerson: "Lisa Anderson",
      email: "lisa.anderson@email.com",
      phone: "+1 (555) 567-8901",
      address: "888 Quiet Street, Peaceful City, PC 44444",
      planType: "Individual Standard",
      employeeCount: 1,
      subscriptionStart: "2024-04-01",
      subscriptionEnd: "2025-03-31",
      status: "Pending Renewal",
      monthlyPremium: 285,
      totalPaid: 2565,
      claimsThisYear: 2,
      lastPayment: "2024-04-01",
      renewalDate: "2025-03-31",
      daysToExpiry: 15,
    },
  ]

  // Filter cards based on search and filters
  const filteredCards = insuranceCards.filter((card) => {
    const matchesSearch =
      card.subscriberName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus = filterStatus === "all" || card.status.toLowerCase() === filterStatus.toLowerCase()
    const matchesType = filterType === "all" || card.type.toLowerCase() === filterType.toLowerCase()

    return matchesSearch && matchesStatus && matchesType
  })

  // Calculate statistics
  const totalCards = insuranceCards.length
  const activeCards = insuranceCards.filter((card) => card.status === "Active").length
  const expiredCards = insuranceCards.filter((card) => card.status === "Expired").length
  const pendingRenewal = insuranceCards.filter((card) => card.status === "Pending Renewal").length
  const totalRevenue = insuranceCards.reduce((sum, card) => sum + card.totalPaid, 0)
  const monthlyRevenue = insuranceCards
    .filter((card) => card.status === "Active")
    .reduce((sum, card) => sum + card.monthlyPremium, 0)
  const expiringCards = insuranceCards.filter((card) => card.daysToExpiry <= 30 && card.daysToExpiry > 0).length

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Active</Badge>
      case "Expired":
        return <Badge variant="destructive">Expired</Badge>
      case "Pending Renewal":
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Pending Renewal</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getExpiryBadge = (daysToExpiry: number) => {
    if (daysToExpiry < 0) {
      return <Badge variant="destructive">Expired</Badge>
    } else if (daysToExpiry <= 30) {
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Expires in {daysToExpiry} days</Badge>
    } else if (daysToExpiry <= 60) {
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Expires in {daysToExpiry} days</Badge>
    } else {
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Expires in {daysToExpiry} days</Badge>
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Insurance Card Management</h1>
        <p className="text-gray-600">Manage all insurance card subscriptions for companies and individuals</p>
      </header>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cards</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCards}</div>
            <p className="text-xs text-muted-foreground">
              {activeCards} active, {expiredCards} expired
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${monthlyRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">From {activeCards} active subscriptions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{expiringCards}</div>
            <p className="text-xs text-muted-foreground">Cards expiring within 30 days</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Renewals</CardTitle>
            <RefreshCw className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{pendingRenewal}</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="flex-1">
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>Insurance Card Subscriptions</CardTitle>
              <CardDescription>Manage all company and individual insurance card subscriptions</CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
              <Button>
                <CreditCard className="mr-2 h-4 w-4" />
                Issue New Card
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <TabsList>
                <TabsTrigger value="all">All Cards ({totalCards})</TabsTrigger>
                <TabsTrigger value="companies">
                  Companies ({insuranceCards.filter((c) => c.type === "Company").length})
                </TabsTrigger>
                <TabsTrigger value="individuals">
                  Individuals ({insuranceCards.filter((c) => c.type === "Individual").length})
                </TabsTrigger>
                <TabsTrigger value="expiring">Expiring ({expiringCards})</TabsTrigger>
              </TabsList>

              <div className="flex gap-2 w-full sm:w-auto">
                <div className="relative flex-1 sm:w-64">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search cards..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="expired">Expired</SelectItem>
                    <SelectItem value="pending renewal">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterType} onValueChange={setFilterType}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="company">Company</SelectItem>
                    <SelectItem value="individual">Individual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Card Details</TableHead>
                      <TableHead>Subscriber</TableHead>
                      <TableHead>Plan & Coverage</TableHead>
                      <TableHead>Subscription Period</TableHead>
                      <TableHead>Financial</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards.map((card) => (
                      <TableRow key={card.id}>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{card.cardNumber}</div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {card.type === "Company" ? (
                                <Building2 className="h-3 w-3" />
                              ) : (
                                <User className="h-3 w-3" />
                              )}
                              {card.type}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{card.subscriberName}</div>
                            <div className="text-sm text-muted-foreground">{card.contactPerson}</div>
                            <div className="text-xs text-muted-foreground">{card.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">{card.planType}</div>
                            <div className="text-sm text-muted-foreground">
                              {card.type === "Company" ? `${card.employeeCount} employees` : "Individual coverage"}
                            </div>
                            <div className="text-xs text-muted-foreground">{card.claimsThisYear} claims this year</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="text-sm">
                              {format(new Date(card.subscriptionStart), "MMM dd, yyyy")} -{" "}
                              {format(new Date(card.subscriptionEnd), "MMM dd, yyyy")}
                            </div>
                            {getExpiryBadge(card.daysToExpiry)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="font-medium">${card.monthlyPremium}/month</div>
                            <div className="text-sm text-muted-foreground">
                              Total: ${card.totalPaid.toLocaleString()}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              Last: {format(new Date(card.lastPayment), "MMM dd, yyyy")}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(card.status)}</TableCell>
                        <TableCell className="text-right">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button variant="outline" size="sm">
                                View Details
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                              <DialogHeader>
                                <DialogTitle>Insurance Card Details</DialogTitle>
                                <DialogDescription>Complete information for {card.subscriberName}</DialogDescription>
                              </DialogHeader>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Card Information */}
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold mb-3">Card Information</h3>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Card Number:</span>
                                        <span className="font-medium">{card.cardNumber}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Type:</span>
                                        <span className="font-medium">{card.type}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Plan:</span>
                                        <span className="font-medium">{card.planType}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Status:</span>
                                        {getStatusBadge(card.status)}
                                      </div>
                                    </div>
                                  </div>

                                  {/* Contact Information */}
                                  <div>
                                    <h3 className="text-lg font-semibold mb-3">Contact Information</h3>
                                    <div className="space-y-2">
                                      <div className="flex items-center gap-2">
                                        <User className="h-4 w-4 text-muted-foreground" />
                                        <span>{card.contactPerson}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Mail className="h-4 w-4 text-muted-foreground" />
                                        <span>{card.email}</span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Phone className="h-4 w-4 text-muted-foreground" />
                                        <span>{card.phone}</span>
                                      </div>
                                      <div className="flex items-start gap-2">
                                        <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                                        <span className="text-sm">{card.address}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>

                                {/* Subscription & Financial */}
                                <div className="space-y-4">
                                  <div>
                                    <h3 className="text-lg font-semibold mb-3">Subscription Details</h3>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Start Date:</span>
                                        <span className="font-medium">
                                          {format(new Date(card.subscriptionStart), "MMM dd, yyyy")}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">End Date:</span>
                                        <span className="font-medium">
                                          {format(new Date(card.subscriptionEnd), "MMM dd, yyyy")}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Days to Expiry:</span>
                                        {getExpiryBadge(card.daysToExpiry)}
                                      </div>
                                      {card.type === "Company" && (
                                        <div className="flex justify-between">
                                          <span className="text-sm text-muted-foreground">Employees:</span>
                                          <span className="font-medium">{card.employeeCount}</span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  <div>
                                    <h3 className="text-lg font-semibold mb-3">Financial Summary</h3>
                                    <div className="space-y-2">
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Monthly Premium:</span>
                                        <span className="font-medium">${card.monthlyPremium.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Total Paid:</span>
                                        <span className="font-medium">${card.totalPaid.toLocaleString()}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Last Payment:</span>
                                        <span className="font-medium">
                                          {format(new Date(card.lastPayment), "MMM dd, yyyy")}
                                        </span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-sm text-muted-foreground">Claims This Year:</span>
                                        <span className="font-medium">{card.claimsThisYear}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>

                              <DialogFooter className="flex gap-2">
                                <Button variant="outline">
                                  <FileText className="mr-2 h-4 w-4" />
                                  View Claims
                                </Button>
                                <Button variant="outline">
                                  <Mail className="mr-2 h-4 w-4" />
                                  Send Renewal Notice
                                </Button>
                                <Button>
                                  <RefreshCw className="mr-2 h-4 w-4" />
                                  Process Renewal
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="companies" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Company Details</TableHead>
                      <TableHead>Contact Person</TableHead>
                      <TableHead>Plan & Employees</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Monthly Premium</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards
                      .filter((card) => card.type === "Company")
                      .map((card) => (
                        <TableRow key={card.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{card.subscriberName}</div>
                              <div className="text-sm text-muted-foreground">{card.cardNumber}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{card.contactPerson}</div>
                              <div className="text-sm text-muted-foreground">{card.email}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{card.planType}</div>
                              <div className="text-sm text-muted-foreground">{card.employeeCount} employees</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{format(new Date(card.subscriptionEnd), "MMM dd, yyyy")}</div>
                              {getExpiryBadge(card.daysToExpiry)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${card.monthlyPremium.toLocaleString()}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(card.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="individuals" className="space-y-4">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Individual Details</TableHead>
                      <TableHead>Contact Information</TableHead>
                      <TableHead>Plan Type</TableHead>
                      <TableHead>Subscription</TableHead>
                      <TableHead>Monthly Premium</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards
                      .filter((card) => card.type === "Individual")
                      .map((card) => (
                        <TableRow key={card.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{card.subscriberName}</div>
                              <div className="text-sm text-muted-foreground">{card.cardNumber}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{card.email}</div>
                              <div className="text-sm text-muted-foreground">{card.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">{card.planType}</div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="text-sm">{format(new Date(card.subscriptionEnd), "MMM dd, yyyy")}</div>
                              {getExpiryBadge(card.daysToExpiry)}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-medium">${card.monthlyPremium}</div>
                          </TableCell>
                          <TableCell>{getStatusBadge(card.status)}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="outline" size="sm">
                              Manage
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="expiring" className="space-y-4">
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <h3 className="font-semibold text-orange-800">Cards Expiring Soon</h3>
                </div>
                <p className="text-sm text-orange-700 mt-1">
                  These cards will expire within the next 30 days. Consider sending renewal notices.
                </p>
              </div>

              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Subscriber</TableHead>
                      <TableHead>Card Number</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Expiry Date</TableHead>
                      <TableHead>Days Remaining</TableHead>
                      <TableHead>Monthly Premium</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCards
                      .filter((card) => card.daysToExpiry <= 30 && card.daysToExpiry > 0)
                      .map((card) => (
                        <TableRow key={card.id}>
                          <TableCell>
                            <div className="space-y-1">
                              <div className="font-medium">{card.subscriberName}</div>
                              <div className="text-sm text-muted-foreground">{card.contactPerson}</div>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{card.cardNumber}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              {card.type === "Company" ? (
                                <Building2 className="h-4 w-4" />
                              ) : (
                                <User className="h-4 w-4" />
                              )}
                              {card.type}
                            </div>
                          </TableCell>
                          <TableCell>{format(new Date(card.subscriptionEnd), "MMM dd, yyyy")}</TableCell>
                          <TableCell>
                            <Badge variant="destructive">{card.daysToExpiry} days</Badge>
                          </TableCell>
                          <TableCell>${card.monthlyPremium.toLocaleString()}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button variant="outline" size="sm">
                                <Mail className="mr-2 h-4 w-4" />
                                Send Notice
                              </Button>
                              <Button size="sm">
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Renew
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
