"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  TrendingUp,
  Download,
  CalendarIcon,
  DollarSign,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle,
  Target,
  Activity,
  Zap,
} from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

const reportData = {
  financial: {
    totalRevenue: 2450000,
    monthlyGrowth: 12.5,
    totalClaims: 1680000,
    claimsRatio: 0.686,
    netProfit: 770000,
    profitMargin: 0.314,
  },
  membership: {
    totalMembers: 15420,
    activeMembers: 14890,
    newMembers: 245,
    churnRate: 0.034,
    membershipGrowth: 8.2,
  },
  claims: {
    totalClaims: 1247,
    pendingClaims: 89,
    approvedClaims: 1058,
    rejectedClaims: 100,
    avgProcessingTime: 3.2,
    claimsSatisfaction: 4.6,
  },
  companies: {
    totalCompanies: 127,
    activeCompanies: 119,
    newCompanies: 8,
    renewalRate: 0.94,
    avgEmployeesPerCompany: 121,
  },
}

const monthlyData = [
  { month: "Jan", revenue: 180000, claims: 120000, members: 14200 },
  { month: "Feb", revenue: 195000, claims: 135000, members: 14350 },
  { month: "Mar", revenue: 210000, claims: 145000, members: 14500 },
  { month: "Apr", revenue: 225000, claims: 155000, members: 14680 },
  { month: "May", revenue: 240000, claims: 160000, members: 14850 },
  { month: "Jun", revenue: 245000, claims: 168000, members: 15420 },
]

const industryBreakdown = [
  { industry: "Technology", companies: 45, percentage: 35.4, revenue: 980000 },
  { industry: "Healthcare", companies: 28, percentage: 22.0, revenue: 650000 },
  { industry: "Manufacturing", companies: 22, percentage: 17.3, revenue: 420000 },
  { industry: "Retail", companies: 18, percentage: 14.2, revenue: 280000 },
  { industry: "Other", companies: 14, percentage: 11.0, revenue: 120000 },
]

export default function ReportsPage() {
  // Avoid SSR Date() differences causing hydration mismatch
  const [dateRange, setDateRange] = useState<DateRange>({ from: undefined, to: undefined })
  // Set default range on client after mount
  useEffect(() => {
    const now = new Date()
    setDateRange({ from: new Date(now.getFullYear(), 0, 1), to: now })
  }, [])
  const [reportType, setReportType] = useState("overview")

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Reports & Analytics</h1>
          <p className="text-muted-foreground">Comprehensive business intelligence and performance metrics</p>
        </div>
        <div className="flex items-center space-x-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="sm">
                <CalendarIcon className="h-4 w-4 mr-2" />
                {dateRange.from && dateRange.to
                  ? `${format(dateRange.from, "MMM dd")} - ${format(dateRange.to, "MMM dd")}`
                  : "Select dates"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="range"
                selected={dateRange}
                onSelect={(range) => setDateRange(range || { from: undefined, to: undefined })}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm">
            <Activity className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-indigo-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-700 dark:text-indigo-300">${(reportData.financial.totalRevenue / 1000000).toFixed(2)}M</div>
            <p className="text-xs text-indigo-700/70 dark:text-indigo-300/80">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />+{reportData.financial.monthlyGrowth}% from
              last month
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Members</CardTitle>
            <Users className="h-4 w-4 text-emerald-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{reportData.membership.activeMembers.toLocaleString()}</div>
            <p className="text-xs text-emerald-700/70 dark:text-emerald-300/80">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />+{reportData.membership.membershipGrowth}%
              growth
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-fuchsia-50 to-white dark:from-fuchsia-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Claims Ratio</CardTitle>
            <FileText className="h-4 w-4 text-fuchsia-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-fuchsia-700 dark:text-fuchsia-300">{(reportData.financial.claimsRatio * 100).toFixed(1)}%</div>
            <p className="text-xs text-fuchsia-700/70 dark:text-fuchsia-300/80">
              <Target className="h-3 w-3 inline mr-1" />
              Target: 70%
            </p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Net Profit</CardTitle>
            <TrendingUp className="h-4 w-4 text-amber-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-amber-700 dark:text-amber-300">${(reportData.financial.netProfit / 1000).toFixed(0)}K</div>
            <p className="text-xs text-amber-700/70 dark:text-amber-300/80">
              <TrendingUp className="h-3 w-3 inline mr-1 text-green-500" />
              {(reportData.financial.profitMargin * 100).toFixed(1)}% margin
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="financial" className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="membership">Membership</TabsTrigger>
          <TabsTrigger value="claims">Claims</TabsTrigger>
          <TabsTrigger value="companies">Companies</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue vs Claims Trend</CardTitle>
                <CardDescription>Monthly comparison of revenue and claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyData.map((data, index) => (
                    <div key={data.month} className="flex items-center justify-between">
                      <span className="text-sm font-medium">{data.month}</span>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">${(data.revenue / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-muted-foreground">Revenue</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-red-600">${(data.claims / 1000).toFixed(0)}K</p>
                          <p className="text-xs text-muted-foreground">Claims</p>
                        </div>
                        <div className="w-20">
                          <Progress value={((data.revenue - data.claims) / data.revenue) * 100} className="h-2" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Profit Margin Analysis</CardTitle>
                <CardDescription>Breakdown of financial performance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Total Revenue</span>
                      <span className="font-medium">${(reportData.financial.totalRevenue / 1000000).toFixed(2)}M</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Total Claims</span>
                      <span className="font-medium">${(reportData.financial.totalClaims / 1000000).toFixed(2)}M</span>
                    </div>
                    <Progress value={reportData.financial.claimsRatio * 100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Net Profit</span>
                      <span className="font-medium text-green-600">
                        ${(reportData.financial.netProfit / 1000000).toFixed(2)}M
                      </span>
                    </div>
                    <Progress value={reportData.financial.profitMargin * 100} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="membership" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Membership Growth</CardTitle>
                <CardDescription>Monthly member acquisition and retention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Members</span>
                    <span className="text-2xl font-bold">{reportData.membership.totalMembers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Members</span>
                    <span className="font-medium">{reportData.membership.activeMembers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>New This Month</span>
                    <span className="font-medium text-green-600">+{reportData.membership.newMembers}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Churn Rate</span>
                    <span className="font-medium text-red-600">
                      {(reportData.membership.churnRate * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress
                    value={(reportData.membership.activeMembers / reportData.membership.totalMembers) * 100}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Member Demographics</CardTitle>
                <CardDescription>Age and plan distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { category: "18-30 years", count: 3850, percentage: 25 },
                    { category: "31-45 years", count: 6160, percentage: 40 },
                    { category: "46-60 years", count: 4620, percentage: 30 },
                    { category: "60+ years", count: 770, percentage: 5 },
                  ].map((demo) => (
                    <div key={demo.category} className="flex justify-between items-center">
                      <span className="text-sm">{demo.category}</span>
                      <div className="flex items-center space-x-2">
                        <Progress value={demo.percentage} className="w-20" />
                        <span className="text-sm font-medium w-16">{demo.count.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="claims" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Claims Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Claims</span>
                    <span className="font-bold">{reportData.claims.totalClaims.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Pending</span>
                    <Badge className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      {reportData.claims.pendingClaims}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Approved</span>
                    <Badge className="bg-green-100 text-green-800 border-green-200">
                      {reportData.claims.approvedClaims}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Rejected</span>
                    <Badge className="bg-red-100 text-red-800 border-red-200">{reportData.claims.rejectedClaims}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Processing Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Avg Processing Time</span>
                      <span className="font-medium">{reportData.claims.avgProcessingTime} days</span>
                    </div>
                    <Progress value={68} className="w-full" />
                    <p className="text-xs text-muted-foreground mt-1">Target: 2.5 days</p>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Approval Rate</span>
                      <span className="font-medium">
                        {((reportData.claims.approvedClaims / reportData.claims.totalClaims) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(reportData.claims.approvedClaims / reportData.claims.totalClaims) * 100}
                      className="w-full"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Satisfaction Score</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-2">
                  <div className="text-4xl font-bold text-green-600">{reportData.claims.claimsSatisfaction}</div>
                  <div className="text-sm text-muted-foreground">out of 5.0</div>
                  <Progress value={reportData.claims.claimsSatisfaction * 20} className="w-full" />
                  <p className="text-xs text-muted-foreground">Based on 1,247 reviews</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="companies" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Company Portfolio</CardTitle>
                <CardDescription>Corporate client overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Total Companies</span>
                    <span className="font-bold">{reportData.companies.totalCompanies}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Companies</span>
                    <span className="font-medium">{reportData.companies.activeCompanies}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>New This Quarter</span>
                    <span className="font-medium text-green-600">+{reportData.companies.newCompanies}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Renewal Rate</span>
                    <span className="font-medium">{(reportData.companies.renewalRate * 100).toFixed(1)}%</span>
                  </div>
                  <Progress value={reportData.companies.renewalRate * 100} className="w-full" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Industry Breakdown</CardTitle>
                <CardDescription>Revenue by industry sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {industryBreakdown.map((industry) => (
                    <div key={industry.industry} className="flex justify-between items-center">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-medium">{industry.industry}</span>
                        <Badge variant="outline" className="text-xs">
                          {industry.companies}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Progress value={industry.percentage} className="w-16" />
                        <span className="text-sm font-medium w-12">{industry.percentage.toFixed(1)}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Zap className="h-5 w-5 mr-2 text-yellow-500" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Uptime</span>
                      <span className="font-medium">99.9%</span>
                    </div>
                    <Progress value={99.9} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Response Time</span>
                      <span className="font-medium">1.2s</span>
                    </div>
                    <Progress value={85} className="w-full" />
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm">Error Rate</span>
                      <span className="font-medium">0.1%</span>
                    </div>
                    <Progress value={1} className="w-full" />
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="h-5 w-5 mr-2 text-blue-500" />
                  KPI Targets
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Claims Processing</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">On Track</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Member Satisfaction</span>
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Exceeded</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Revenue Growth</span>
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm font-medium">At Risk</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Activity className="h-5 w-5 mr-2 text-green-500" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                    <span className="text-sm">New company onboarded</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full" />
                    <span className="text-sm">Monthly report generated</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" />
                    <span className="text-sm">System maintenance scheduled</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full" />
                    <span className="text-sm">Policy updates deployed</span>
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
