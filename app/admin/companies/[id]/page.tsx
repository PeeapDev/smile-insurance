"use client"

import Link from "next/link"
import { useMemo } from "react"
import { useParams } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Building, ArrowLeft, Users, DollarSign, TrendingUp, Phone, Mail, MapPin, Calendar, Shield } from "lucide-react"
import { companiesData, type Company } from "@/lib/demo/companies"

// Use shared demo dataset

const statusBadge = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200"
    case "pending_renewal":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "suspended":
      return "bg-red-100 text-red-800 border-red-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

export default function CompanyDetailsPage() {
  const params = useParams() as { id?: string }
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id

  const company = useMemo<Company | undefined>(() => companiesData.find((c) => c.id === id), [id])

  if (!id) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Company Details</h1>
          </div>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-muted-foreground">No company id supplied.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!company) {
    return (
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Building className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Company Details</h1>
          </div>
          <Link href="/admin/companies">
            <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-muted-foreground">Company with id "{id}" not found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={company.logo || "/placeholder.svg"} alt={company.name} />
            <AvatarFallback>{company.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{company.name}</h1>
            <p className="text-sm text-muted-foreground">{company.id} • {company.industry}</p>
          </div>
          <Badge className={statusBadge(company.status)}>{company.status.replace("_", " ")}</Badge>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/companies">
            <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
          </Link>
          <Link href={`/admin/companies/${id}/edit`}>
            <Button variant="secondary">Edit Company</Button>
          </Link>
          <Button>Manage Members</Button>
        </div>
      </div>

      {/* Top stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-blue-50 to-white dark:from-blue-950/20">
          <CardHeader className="pb-2">
            <CardDescription>Employees</CardDescription>
            <CardTitle className="text-2xl">{company.employees.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-blue-600 dark:text-blue-300">Active {company.activeMembers.toLocaleString()}</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-emerald-50 to-white dark:from-emerald-950/20">
          <CardHeader className="pb-2">
            <CardDescription>Monthly Premium</CardDescription>
            <CardTitle className="text-2xl">${company.monthlyPremium.toLocaleString()}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-emerald-600 dark:text-emerald-300 flex items-center gap-1"><TrendingUp className="h-3 w-3" /> Trend stable</p>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-violet-50 to-white dark:from-violet-950/20">
          <CardHeader className="pb-2">
            <CardDescription>Joined</CardDescription>
            <CardTitle className="text-2xl">{company.joinDate}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-violet-600 dark:text-violet-300">Renewal {company.renewalDate}</p>
          </CardContent>
        </Card>
        <Card className={
          company.paymentStatus === 'current'
            ? 'bg-gradient-to-br from-green-50 to-white dark:from-green-950/20'
            : company.paymentStatus === 'overdue'
            ? 'bg-gradient-to-br from-rose-50 to-white dark:from-rose-950/20'
            : 'bg-gradient-to-br from-amber-50 to-white dark:from-amber-950/20'
        }>
          <CardHeader className="pb-2">
            <CardDescription>Payment</CardDescription>
            <CardTitle className="text-2xl capitalize">{company.paymentStatus}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-amber-700 dark:text-amber-300">Claims ratio {(company.claimsRatio*100).toFixed(1)}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Info grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Company Information</CardTitle>
            <CardDescription>Comprehensive profile</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1"><div className="text-sm text-muted-foreground">Contact</div><div className="font-medium">{company.contactPerson}</div></div>
              <div className="space-y-1"><div className="text-sm text-muted-foreground">Plan</div><div className="font-medium">{company.planType}</div></div>
              <div className="space-y-1"><div className="text-sm text-muted-foreground">Email</div><div className="font-medium flex items-center gap-2"><Mail className="h-4 w-4" /> {company.email}</div></div>
              <div className="space-y-1"><div className="text-sm text-muted-foreground">Phone</div><div className="font-medium flex items-center gap-2"><Phone className="h-4 w-4" /> {company.phone}</div></div>
              <div className="space-y-1 sm:col-span-2"><div className="text-sm text-muted-foreground">Address</div><div className="font-medium flex items-center gap-2"><MapPin className="h-4 w-4" /> {company.address}</div></div>
              {company.location && (
                <div className="space-y-1 sm:col-span-2"><div className="text-sm text-muted-foreground">Location</div><div className="font-medium">{company.location}</div></div>
              )}
              {company.description && (
                <div className="space-y-1 sm:col-span-2"><div className="text-sm text-muted-foreground">About</div><div className="font-medium text-muted-foreground/90">{company.description}</div></div>
              )}
              {company.services && company.services.length > 0 && (
                <div className="space-y-1 sm:col-span-2"><div className="text-sm text-muted-foreground">Services</div><div className="flex flex-wrap gap-2">{company.services.map((s) => (<Badge key={s} variant="outline">{s}</Badge>))}</div></div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Renewal & Policy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4" /> Renewal: {company.renewalDate}</div>
              <div className="flex items-center gap-2"><Shield className="h-4 w-4" /> Plan: {company.planType}</div>
              <div className="flex items-center gap-2"><DollarSign className="h-4 w-4" /> Premium: ${company.monthlyPremium.toLocaleString()}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Members placeholder */}
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
          <CardDescription>Employees covered under this company</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Member ID</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Example Member</TableCell>
                <TableCell>MEM-0001</TableCell>
                <TableCell><Badge variant="outline">Active</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
