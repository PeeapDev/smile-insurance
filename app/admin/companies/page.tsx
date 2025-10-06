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
// removed Dialog-based details view; using dedicated page instead
import {
  Search,
  Building,
  Users,
  DollarSign,
  TrendingUp,
  Plus,
  Eye,
  Edit,
  MoreHorizontal,
  CheckCircle,
  Clock,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ShieldCheck, ShieldAlert, AlertTriangle as AlertBadge, CheckCircle2 } from "lucide-react"
// User icon no longer needed after dialog removal

import { companiesData } from "@/lib/demo/companies"
const companiesLocal = companiesData
import { useToast } from "@/components/ui/use-toast"

const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending_renewal":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "suspended":
      return "bg-red-100 text-red-800 border-red-200"
    case "inactive":
      return "bg-gray-100 text-gray-800 border-gray-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getPaymentStatusColor = (status: string) => {
  switch (status) {
    case "current":
      return "bg-green-100 text-green-800 border-green-200"
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200"
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function CompaniesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [industryFilter, setIndustryFilter] = useState("all")
  const { toast } = useToast()

  const filteredCompanies = companiesLocal.filter((company) => {
    const matchesSearch =
      company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.industry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      company.contactPerson.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || company.status === statusFilter
    const matchesIndustry = industryFilter === "all" || company.industry.toLowerCase() === industryFilter
    return matchesSearch && matchesStatus && matchesIndustry
  })

  const stats = {
    totalCompanies: companiesLocal.length,
    activeCompanies: companiesLocal.filter((c) => c.status === "active").length,
    totalEmployees: companiesLocal.reduce((sum, company) => sum + company.employees, 0),
    totalPremiums: companiesLocal.reduce((sum, company) => sum + company.monthlyPremium, 0),
    avgClaimsRatio: companiesLocal.reduce((sum, company) => sum + company.claimsRatio, 0) / companiesLocal.length,
    // Demo estimate: assume ~40% of active members have registered dependants
    totalDependants: companiesLocal.reduce((sum, c) => sum + Math.round(c.activeMembers * 0.4), 0),
  }

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Company Management</h1>
          <p className="text-muted-foreground">Manage corporate clients and their insurance plans</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Building className="h-4 w-4 mr-2" />
            Export Data
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Company
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Companies</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCompanies}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +2 new this month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Companies</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCompanies}</div>
            <p className="text-xs text-muted-foreground">
              {((stats.activeCompanies / stats.totalCompanies) * 100).toFixed(1)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Employees</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalEmployees.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% from last quarter
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Premiums</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(stats.totalPremiums / 1000).toFixed(0)}K</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Dependants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalDependants.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Estimated based on active members</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all-companies" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all-companies">All Companies</TabsTrigger>
          <TabsTrigger value="active">Active ({stats.activeCompanies})</TabsTrigger>
          <TabsTrigger value="renewals">Pending Renewals</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="all-companies" className="space-y-4">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Search & Filters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                  <Label htmlFor="search">Search Companies</Label>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by company name, industry, or contact..."
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
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending_renewal">Pending Renewal</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="sm:w-48">
                  <Label htmlFor="industry">Industry</Label>
                  <Select value={industryFilter} onValueChange={setIndustryFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Industries" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Industries</SelectItem>
                      <SelectItem value="technology">Technology</SelectItem>
                      <SelectItem value="manufacturing">Manufacturing</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Companies Table */}
          <Card>
            <CardHeader>
              <CardTitle>Companies ({filteredCompanies.length})</CardTitle>
              <CardDescription>Manage corporate insurance clients</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Company</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Monthly Premium</TableHead>
                    <TableHead>Claims Ratio</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCompanies.map((company) => (
                    <TableRow key={company.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                            <AvatarFallback>{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                          </Avatar>
                          <div>
                            <a href={`/admin/companies/${company.id}`} className="font-medium underline-offset-2 hover:underline">
                              {company.name}
                            </a>
                            <p className="text-sm text-muted-foreground">{company.contactPerson}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{company.industry}</TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{company.employees.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">{company.activeMembers} active</p>
                        </div>
                      </TableCell>
                      <TableCell>${company.monthlyPremium.toLocaleString()}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{(company.claimsRatio * 100).toFixed(1)}%</span>
                          </div>
                          <Progress value={company.claimsRatio * 100} className="w-16" />
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(company.status) + " flex items-center gap-1"}>
                          {company.status === "active" && <CheckCircle2 className="h-3 w-3" />}
                          {company.status === "pending_renewal" && <AlertBadge className="h-3 w-3" />}
                          {company.status === "suspended" && <ShieldAlert className="h-3 w-3" />}
                          {company.status === "inactive" && <ShieldAlert className="h-3 w-3" />}
                          {company.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getPaymentStatusColor(company.paymentStatus) + " flex items-center gap-1"}>
                          {company.paymentStatus === "current" && <ShieldCheck className="h-3 w-3" />}
                          {company.paymentStatus === "overdue" && <ShieldAlert className="h-3 w-3" />}
                          {company.paymentStatus === "pending" && <AlertBadge className="h-3 w-3" />}
                          {company.paymentStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <a href={`/admin/companies/${company.id}`} className="flex items-center">
                                <Eye className="h-4 w-4 mr-2" />
                                View Details
                              </a>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Company
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Users className="h-4 w-4 mr-2" />
                              Manage Members
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <DollarSign className="h-4 w-4 mr-2" />
                              Billing History
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

        <TabsContent value="active" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Companies</CardTitle>
              <CardDescription>Companies with active insurance plans</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companiesLocal
                  .filter((c) => c.status === "active")
                  .map((company) => (
                    <div key={company.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
                          <AvatarFallback>{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {company.employees} employees • {company.planType}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="font-medium">${company.monthlyPremium.toLocaleString()}/mo</p>
                          <p className="text-sm text-muted-foreground">
                            Claims: {(company.claimsRatio * 100).toFixed(1)}%
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="renewals" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Pending Renewals</CardTitle>
              <CardDescription>Companies requiring renewal attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {companiesLocal
                  .filter((c) => c.status === "pending_renewal")
                  .map((company) => (
                    <div
                      key={company.id}
                      className="flex items-center justify-between p-4 border-l-4 border-yellow-500 bg-yellow-50 rounded-lg"
                    >
                      <div className="flex items-center space-x-4">
                        <Clock className="h-6 w-6 text-yellow-500" />
                        <div>
                          <p className="font-medium">{company.name}</p>
                          <p className="text-sm text-muted-foreground">Renewal due: {company.renewalDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">RENEWAL DUE</Badge>
                        <Button
                          size="sm"
                          onClick={() =>
                            toast({
                              title: "Renewal initiated",
                              description: `${company.name}: forwarding to company for processing…`,
                            })
                          }
                        >
                          Process Renewal
                        </Button>
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
                <CardTitle>Industry Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {["Technology", "Manufacturing", "Healthcare", "Retail", "Software"].map((industry) => {
                    const count = companiesLocal.filter((c) => c.industry === industry).length
                    const percentage = (count / companiesLocal.length) * 100
                    return (
                      <div key={industry} className="flex justify-between items-center">
                        <span>{industry}</span>
                        <div className="flex items-center space-x-2">
                          <Progress value={percentage} className="w-20" />
                          <span className="text-sm font-medium w-12">{count}</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Average Claims Ratio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Overall Average</span>
                    <span className="font-medium">{(stats.avgClaimsRatio * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={stats.avgClaimsRatio * 100} className="w-full" />
                  <div className="flex justify-between items-center">
                    <span>Industry Benchmark: 75%</span>
                    <span className="text-sm text-green-600">
                      {stats.avgClaimsRatio < 0.75 ? "Below benchmark" : "Above benchmark"}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
