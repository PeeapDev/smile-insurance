"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Shield, Heart, Eye, Pill, Stethoscope, Calendar, DollarSign, FileText, Phone, MapPin, Users } from 'lucide-react'

export default function CoveragePage() {
  const coverageData = {
    planName: "Premium Health Plus",
    policyNumber: "SIA-2024-001234",
    effectiveDate: "January 1, 2024",
    expirationDate: "December 31, 2024",
    status: "Active",
    monthlyPremium: "$299",
    deductible: "$1,500",
    deductibleUsed: "$450",
    outOfPocketMax: "$8,000",
    outOfPocketUsed: "$1,200",
  }

  const benefits = [
    {
      category: "Medical",
      icon: Stethoscope,
      color: "bg-emerald-500",
      items: [
        { service: "Primary Care Visit", coverage: "100% after deductible", copay: "$25" },
        { service: "Specialist Visit", coverage: "80% after deductible", copay: "$50" },
        { service: "Emergency Room", coverage: "80% after deductible", copay: "$300" },
        { service: "Urgent Care", coverage: "90% after deductible", copay: "$75" },
        { service: "Preventive Care", coverage: "100% covered", copay: "$0" },
      ],
    },
    {
      category: "Prescription",
      icon: Pill,
      color: "bg-teal-500",
      items: [
        { service: "Generic Drugs", coverage: "90% after deductible", copay: "$10" },
        { service: "Brand Name Drugs", coverage: "70% after deductible", copay: "$40" },
        { service: "Specialty Drugs", coverage: "60% after deductible", copay: "$100" },
      ],
    },
    {
      category: "Vision",
      icon: Eye,
      color: "bg-purple-500",
      items: [
        { service: "Eye Exam", coverage: "100% covered", copay: "$0" },
        { service: "Glasses/Contacts", coverage: "$200 allowance", copay: "N/A" },
        { service: "Laser Surgery", coverage: "Not covered", copay: "N/A" },
      ],
    },
    {
      category: "Dental",
      icon: Heart,
      color: "bg-rose-500",
      items: [
        { service: "Preventive Care", coverage: "100% covered", copay: "$0" },
        { service: "Basic Procedures", coverage: "80% after deductible", copay: "Varies" },
        { service: "Major Procedures", coverage: "50% after deductible", copay: "Varies" },
      ],
    },
  ] as const

  const networkProviders = [
    { name: "City General Hospital", type: "Hospital", distance: "2.3 miles", rating: 4.8 },
    { name: "Dr. Sarah Johnson", type: "Primary Care", distance: "1.1 miles", rating: 4.9 },
    { name: "Metro Urgent Care", type: "Urgent Care", distance: "0.8 miles", rating: 4.6 },
    { name: "Vision Plus Center", type: "Vision Care", distance: "1.5 miles", rating: 4.7 },
  ]

  type Dependant = { id: string; name: string; relationship: string; dob: string }
  const [dependants, setDependants] = useState<Dependant[]>([])
  const [depName, setDepName] = useState("")
  const [depRel, setDepRel] = useState("")
  const [depDob, setDepDob] = useState("")

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('dependants') : null
    if (raw) {
      try { setDependants(JSON.parse(raw)) } catch {}
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('dependants', JSON.stringify(dependants))
    }
  }, [dependants])

  function addDependant() {
    if (!depName.trim() || !depRel.trim() || !depDob) return
    const d: Dependant = { id: crypto.randomUUID(), name: depName.trim(), relationship: depRel.trim(), dob: depDob }
    setDependants(prev => [d, ...prev])
    setDepName("")
    setDepRel("")
    setDepDob("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Coverage</h1>
          <p className="text-muted-foreground">View your insurance coverage details and benefits</p>
        </div>
        <Badge variant={coverageData.status === "Active" ? "default" : "secondary"} className="text-sm">
          <Shield className="w-4 h-4 mr-1" />
          {coverageData.status}
        </Badge>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            Plan Overview
          </CardTitle>
          <CardDescription>Your current insurance plan details</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Plan Name</p>
              <p className="text-lg font-semibold">{coverageData.planName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Policy Number</p>
              <p className="text-lg font-semibold">{coverageData.policyNumber}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Monthly Premium</p>
              <p className="text-lg font-semibold text-emerald-600">{coverageData.monthlyPremium}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Coverage Period</p>
              <p className="text-sm">
                {coverageData.effectiveDate} - {coverageData.expirationDate}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Deductible Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Used: $450</span>
                <span>Remaining: $1,050</span>
              </div>
              <Progress value={30} className="h-2" />
              <p className="text-sm text-muted-foreground">
                You&apos;ve met 30% of your {coverageData.deductible} annual deductible
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Out-of-Pocket Maximum
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Used: $1,200</span>
                <span>Remaining: $6,800</span>
              </div>
              <Progress value={15} className="h-2" />
              <p className="text-sm text-muted-foreground">
                You&apos;ve used 15% of your {coverageData.outOfPocketMax} annual maximum
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Coverage Benefits</CardTitle>
          <CardDescription>Detailed breakdown of your coverage benefits</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="medical" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="medical">Medical</TabsTrigger>
              <TabsTrigger value="prescription">Prescription</TabsTrigger>
              <TabsTrigger value="vision">Vision</TabsTrigger>
              <TabsTrigger value="dental">Dental</TabsTrigger>
            </TabsList>

            {benefits.map((benefit) => (
              <TabsContent key={benefit.category} value={benefit.category.toLowerCase()}>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 mb-4">
                    <div className={`p-2 rounded-lg ${benefit.color}`}>
                      <benefit.icon className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold">{benefit.category} Coverage</h3>
                  </div>

                  <div className="space-y-3">
                    {benefit.items.map((item, index) => (
                      <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                        <div>
                          <p className="font-medium">{item.service}</p>
                          <p className="text-sm text-muted-foreground">Coverage: {item.coverage}</p>
                        </div>
                        <Badge variant="outline">{item.copay}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Nearby Network Providers
          </CardTitle>
          <CardDescription>Find in-network healthcare providers near you</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {networkProviders.map((provider, index) => (
              <div key={index} className="p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-semibold">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">{provider.type}</p>
                  </div>
                  <Badge variant="outline">★ {provider.rating}</Badge>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  {provider.distance}
                </div>
                <Button variant="outline" size="sm" className="mt-2 w-full">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </Button>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4">
            <MapPin className="w-4 h-4 mr-2" />
            Find More Providers
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="h-20 flex-col gap-2">
                  <FileText className="w-6 h-6" />
                  Download ID Card
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Download Insurance ID Card</DialogTitle>
                  <DialogDescription>Your digital insurance ID card will be downloaded as a PDF.</DialogDescription>
                </DialogHeader>
                <div className="flex justify-end gap-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Download PDF</Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button variant="outline" className="h-20 flex-col gap-2">
              <Calendar className="w-6 h-6" />
              Schedule Appointment
            </Button>

            <Button variant="outline" className="h-20 flex-col gap-2">
              <Phone className="w-6 h-6" />
              Contact Support
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" /> Dependants
          </CardTitle>
          <CardDescription>Add and manage dependants linked to your policy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              className="border rounded-md px-3 py-2"
              placeholder="Full name"
              value={depName}
              onChange={(e)=>setDepName(e.target.value)}
            />
            <input
              className="border rounded-md px-3 py-2"
              placeholder="Relationship (e.g., Spouse, Child)"
              value={depRel}
              onChange={(e)=>setDepRel(e.target.value)}
            />
            <input
              className="border rounded-md px-3 py-2"
              type="date"
              value={depDob}
              onChange={(e)=>setDepDob(e.target.value)}
            />
          </div>
          <Button onClick={addDependant} className="mb-4">Add Dependant</Button>
          {dependants.length === 0 ? (
            <p className="text-sm text-muted-foreground">No dependants added yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 pr-4">Name</th>
                    <th className="text-left py-2 pr-4">Relationship</th>
                    <th className="text-left py-2 pr-4">Date of Birth</th>
                  </tr>
                </thead>
                <tbody>
                  {dependants.map(d => (
                    <tr key={d.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium">{d.name}</td>
                      <td className="py-2 pr-4">{d.relationship}</td>
                      <td className="py-2 pr-4">{d.dob}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
