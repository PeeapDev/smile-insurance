"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { FileText, Search, Filter, Plus, Eye, Download, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

export default function ClaimsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const claimsData = [
    {
      id: "CLM-2024-001",
      date: "2024-01-15",
      provider: "City General Hospital",
      service: "Emergency Room Visit",
      amount: "$2,450.00",
      approved: "$1,960.00",
      yourPortion: "$490.00",
      status: "Approved",
      progress: 100,
      description: "Emergency treatment for chest pain evaluation",
    },
    {
      id: "CLM-2024-002",
      date: "2024-01-10",
      provider: "Dr. Sarah Johnson",
      service: "Specialist Consultation",
      amount: "$350.00",
      approved: "$280.00",
      yourPortion: "$70.00",
      status: "Processing",
      progress: 60,
      description: "Cardiology consultation and EKG",
    },
    {
      id: "CLM-2024-003",
      date: "2024-01-05",
      provider: "Metro Pharmacy",
      service: "Prescription Medication",
      amount: "$125.00",
      approved: "$100.00",
      yourPortion: "$25.00",
      status: "Paid",
      progress: 100,
      description: "Monthly prescription refill",
    },
    {
      id: "CLM-2024-004",
      date: "2024-01-02",
      provider: "Vision Plus Center",
      service: "Eye Examination",
      amount: "$180.00",
      approved: "$0.00",
      yourPortion: "$180.00",
      status: "Denied",
      progress: 100,
      description: "Annual eye exam - not covered under current plan",
    },
  ]

  const claimsSummary = {
    totalClaims: 12,
    totalAmount: "$8,450.00",
    approvedAmount: "$6,760.00",
    yourPortion: "$1,690.00",
    pendingClaims: 2,
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
      case "Paid":
        return "default"
      case "Processing":
        return "secondary"
      case "Denied":
        return "destructive"
      default:
        return "secondary"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Approved":
      case "Paid":
        return CheckCircle
      case "Processing":
        return Clock
      case "Denied":
        return XCircle
      default:
        return AlertCircle
    }
  }

  const filteredClaims = claimsData.filter((claim) => {
    const matchesSearch =
      claim.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.service.toLowerCase().includes(searchTerm.toLowerCase()) ||
      claim.id.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || claim.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Claims</h1>
          <p className="text-muted-foreground">Track and manage your insurance claims</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Submit New Claim
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Submit New Claim</DialogTitle>
              <DialogDescription>Start the process of submitting a new insurance claim.</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Medical Claim
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Prescription Claim
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <FileText className="w-4 h-4 mr-2" />
                Vision/Dental Claim
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-neutral-700" />
              <div>
                <p className="text-2xl font-bold">{claimsSummary.totalClaims}</p>
                <p className="text-sm text-muted-foreground">Total Claims</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="text-2xl font-bold">{claimsSummary.totalAmount}</p>
                <p className="text-sm text-muted-foreground">Total Amount</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-emerald-700" />
              <div>
                <p className="text-2xl font-bold">{claimsSummary.approvedAmount}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-amber-700" />
              <div>
                <p className="text-2xl font-bold">{claimsSummary.yourPortion}</p>
                <p className="text-sm text-muted-foreground">Your Portion</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-600" />
              <div>
                <p className="text-2xl font-bold">{claimsSummary.pendingClaims}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search claims by provider, service, or claim ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="processing">Processing</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="denied">Denied</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredClaims.map((claim) => {
          const StatusIcon = getStatusIcon(claim.status)
          return (
            <Card key={claim.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-neutral-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-neutral-700" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{claim.service}</h3>
                      <p className="text-sm text-muted-foreground">{claim.provider}</p>
                    </div>
                  </div>
                  <Badge variant={getStatusColor(claim.status)} className="flex items-center gap-1">
                    <StatusIcon className="w-3 h-3" />
                    {claim.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Claim ID</p>
                    <p className="font-medium">{claim.id}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-medium">{claim.date}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Amount</p>
                    <p className="font-medium">{claim.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Your Portion</p>
                    <p className="font-medium text-amber-700">{claim.yourPortion}</p>
                  </div>
                </div>

                {claim.status === "Processing" && (
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Processing Progress</span>
                      <span>{claim.progress}%</span>
                    </div>
                    <Progress value={claim.progress} className="h-2" />
                  </div>
                )}

                <p className="text-sm text-muted-foreground mb-4">{claim.description}</p>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl">
                      <DialogHeader>
                        <DialogTitle>Claim Details - {claim.id}</DialogTitle>
                        <DialogDescription>Complete information about your insurance claim</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="font-medium">Service Provider</p>
                            <p className="text-muted-foreground">{claim.provider}</p>
                          </div>
                          <div>
                            <p className="font-medium">Service Date</p>
                            <p className="text-muted-foreground">{claim.date}</p>
                          </div>
                          <div>
                            <p className="font-medium">Total Billed</p>
                            <p className="text-muted-foreground">{claim.amount}</p>
                          </div>
                          <div>
                            <p className="font-medium">Insurance Approved</p>
                            <p className="text-muted-foreground">{claim.approved}</p>
                          </div>
                        </div>
                        <div>
                          <p className="font-medium">Description</p>
                          <p className="text-muted-foreground">{claim.description}</p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredClaims.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Claims Found</h3>
            <p className="text-muted-foreground">
              {searchTerm || statusFilter !== "all" ? "Try adjusting your search or filter criteria" : "You haven't submitted any claims yet"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
