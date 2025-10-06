"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { useParams } from "next/navigation"
import { ArrowLeft, CreditCard, Mail, MapPin, Phone, Shield, User, Wifi } from "lucide-react"
import { companiesData } from "@/lib/demo/companies"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { AspectRatio } from "@/components/ui/aspect-ratio"

// Demo dataset; replace with real data fetch later
const DEMO = [
  {
    id: "CARD-1001",
    member: "Sarah Johnson",
    plan: "Premium",
    status: "Active",
    issued: "2024-11-01",
    expires: "2026-11-01",
    email: "sarah@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Business Ave, Tech City, TC 12345",
    monthlyPremium: 425,
    totalPaid: 4675,
    claimsThisYear: 3,
    lastPayment: "2025-07-10",
    issuerType: "COMPANY",
    renewalResponsibility: "COMPANY",
    employerId: "COMP-001",
    employerName: "TechCorp Inc.",
    nextRenewalDate: "2026-11-01",
    billingCycle: "ANNUAL",
    autoRenew: true,
  },
  {
    id: "CARD-1002",
    member: "Michael Chen",
    plan: "Standard",
    status: "Active",
    issued: "2024-09-12",
    expires: "2026-09-12",
    email: "michael@example.com",
    phone: "+1 (555) 222-8877",
    address: "456 Residential St, Home City, HC 67890",
    monthlyPremium: 285,
    totalPaid: 3420,
    claimsThisYear: 1,
    lastPayment: "2025-07-04",
    issuerType: "COMPANY",
    renewalResponsibility: "COMPANY",
    employerId: "COMP-002",
    employerName: "Global Manufacturing",
    nextRenewalDate: "2026-09-12",
    billingCycle: "ANNUAL",
    autoRenew: true,
  },
  {
    id: "CARD-1003",
    member: "Emily Rodriguez",
    plan: "Standard",
    status: "Suspended",
    issued: "2023-05-04",
    expires: "2025-05-04",
    email: "emily@example.com",
    phone: "+1 (555) 333-7299",
    address: "789 Suburb Lane, Suburb City, SC 22222",
    monthlyPremium: 315,
    totalPaid: 2980,
    claimsThisYear: 0,
    lastPayment: "2025-06-01",
    issuerType: "PERSONAL",
    renewalResponsibility: "USER",
    nextRenewalDate: "2025-05-04",
    billingCycle: "ANNUAL",
    autoRenew: false,
  },
]

export default function CardDetailsPage() {
  const params = useParams() as { id?: string }
  const id = Array.isArray(params?.id) ? params.id[0] : params?.id

  const card = useMemo(() => DEMO.find((c) => c.id === id), [id])
  const employer = useMemo(() => {
    if (!card || card.issuerType !== "COMPANY" || !card.employerId) return undefined
    return companiesData.find((c) => c.id === card.employerId)
  }, [card])

  const [flipped, setFlipped] = useState(false)

  if (!id) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Card Details</h1>
          </div>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-muted-foreground">No card id supplied.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!card) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Card Details</h1>
          </div>
          <Link href="/admin/cards">
            <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
          </Link>
        </div>
        <Card>
          <CardContent className="py-8">
            <p className="text-muted-foreground">Card with id "{id}" not found.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <CreditCard className="h-6 w-6" />
          <div>
            <h1 className="text-2xl font-bold">{card.member}</h1>
            <p className="text-sm text-muted-foreground">{card.id}</p>
          </div>
          <Badge variant={card.status === "Active" ? "outline" : "destructive"}>{card.status}</Badge>
          {card.issuerType === "COMPANY" && (
            <Badge variant="secondary">Company Sponsored • {card.employerName}</Badge>
          )}
        </div>
        <div className="flex gap-2">
          <Link href="/admin/cards">
            <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back</Button>
          </Link>
          {card.issuerType === "COMPANY" ? (
            <>
              <Link href={`/admin/companies/${card.employerId ?? ''}`}>
                <Button variant="secondary">Company Profile</Button>
              </Link>
              <Button>Renew via Company</Button>
            </>
          ) : (
            <>
              <Button variant="secondary">Reissue Card</Button>
              <Button variant={card.status === "Active" ? "destructive" : "default"}>
                {card.status === "Active" ? "Suspend" : "Activate"}
              </Button>
            </>
          )}
        </div>
      </div>

      

      {/* Top summary */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Plan</CardDescription>
            <CardTitle className="text-2xl">{card.plan}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Issued {card.issued}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Status</CardDescription>
            <CardTitle className="text-2xl">{card.status}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Expires {card.expires}</p>
            <p className="text-sm text-muted-foreground">
              Renewal: {card.renewalResponsibility === 'COMPANY' ? 'Company' : 'User'}
              {card.nextRenewalDate ? ` • Next: ${card.nextRenewalDate}` : ''}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Monthly Premium</CardDescription>
            <CardTitle className="text-2xl">${"" + card.monthlyPremium}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Last payment {card.lastPayment}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Paid</CardDescription>
            <CardTitle className="text-2xl">${"" + card.totalPaid}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Claims this year {card.claimsThisYear}</p>
          </CardContent>
        </Card>
      </div>

      {/* Details grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Card & Subscription</CardTitle>
            <CardDescription>Identification and term details</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Card Number</div>
                <div className="font-medium">{card.id}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Plan</div>
                <div className="font-medium">{card.plan}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Issued</div>
                <div className="font-medium">{card.issued}</div>
              </div>
              <div className="space-y-1">
                <div className="text-sm text-muted-foreground">Expires</div>
                <div className="font-medium">{card.expires}</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Interactive flip insurance card (front/back) inside Contact card */}
            <div className="mb-6 flex justify-center">
              <div className="w-full max-w-md [perspective:1200px]">
                <AspectRatio ratio={85.6/53.98}>
                  <div
                    onClick={() => setFlipped((f) => !f)}
                    className="relative h-full w-full cursor-pointer [transform-style:preserve-3d] transition-transform duration-700 ease-in-out"
                    style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
                  >
                    {/* Front */}
                    <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white shadow-2xl p-5 [backface-visibility:hidden]">
                      <div className="pointer-events-none absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.25) 0, transparent 35%)"}} />
                      <div className="relative flex items-center justify-between">
                        <div className="font-semibold tracking-wider">SMILE INSURANCE</div>
                        {card.issuerType === 'COMPANY' && employer ? (
                          <div className="flex items-center gap-2">
                            <div className="text-[10px] text-emerald-100">Employer</div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={employer.logo ?? "/placeholder.svg"} alt={employer.name} className="h-5 w-5 rounded-sm bg-white/20" />
                            <div className="text-[10px] text-emerald-100 truncate max-w-[8rem]">{employer.name}</div>
                          </div>
                        ) : (
                          <div className="text-[10px] text-emerald-100">Member Since 2024</div>
                        )}
                      </div>
                      <div className="mt-5 flex items-center gap-3">
                        <div className="h-6 w-8 rounded-sm bg-yellow-300/90 shadow-inner" aria-hidden />
                        <Wifi className="h-4 w-4 rotate-90 opacity-80" aria-hidden />
                      </div>
                      <div className="mt-5">
                        <div className="text-[10px] uppercase tracking-wide text-emerald-100">Member</div>
                        <div className="text-lg font-semibold leading-tight">{card.member}</div>
                      </div>
                      <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-mono">
                        <div>
                          <div className="text-[10px] uppercase text-emerald-100">Member ID</div>
                          <div>{card.id}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-emerald-100">Policy</div>
                          <div className="truncate">POL-{card.id.replace(/[^0-9]/g, "")}</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-emerald-100">Group</div>
                          <div>GRP-001</div>
                        </div>
                        <div>
                          <div className="text-[10px] uppercase text-emerald-100">Expires</div>
                          <div>{card.expires}</div>
                        </div>
                      </div>
                    </div>
                    {/* Back */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                      <div className="h-8 w-full rounded bg-slate-700/70" aria-hidden />
                      <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                        <div>
                          <div className="text-slate-300">Member ID</div>
                          <div className="font-mono">{card.id}</div>
                        </div>
                        <div>
                          <div className="text-slate-300">Policy</div>
                          <div className="font-mono truncate">POL-{card.id.replace(/[^0-9]/g, "")}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </AspectRatio>
              </div>
            </div>
            <div className="space-y-3 text-sm">
              {card.issuerType === 'COMPANY' && (
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground">Employer:</span>
                  <Link href={`/admin/companies/${card.employerId ?? ''}`} className="underline">
                    {card.employerName}
                  </Link>
                </div>
              )}
              <div className="flex items-center gap-2"><User className="h-4 w-4" /> {card.member}</div>
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> {card.email}</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> {card.phone}</div>
              <div className="flex items-center gap-2"><MapPin className="h-4 w-4" /> {card.address}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity / Payments */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payments</CardTitle>
          <CardDescription>Sample transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>2025-07-10</TableCell>
                <TableCell>$ {card.monthlyPremium}</TableCell>
                <TableCell>Auto-debit</TableCell>
                <TableCell><Badge variant="outline">Success</Badge></TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2025-06-10</TableCell>
                <TableCell>$ {card.monthlyPremium}</TableCell>
                <TableCell>Auto-debit</TableCell>
                <TableCell><Badge variant="outline">Success</Badge></TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between border rounded-md px-4 py-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Shield className="h-4 w-4" /> Managed securely
        </div>
        <Link href="/admin/cards">
          <Button variant="outline" className="gap-2"><ArrowLeft className="h-4 w-4" /> Back to Cards</Button>
        </Link>
      </div>
    </div>
  )
}
