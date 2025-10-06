"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CreditCard, Download, Mail, Smartphone, QrCode, Shield, Calendar, Phone, Copy, Check, Wifi } from 'lucide-react'

export default function CardPage() {
  const [copied, setCopied] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [profile, setProfile] = useState<{
    user: any
    insuranceProfile: any
  } | null>(null)

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/me", { cache: "no-store" })
        if (!res.ok) return
        const data = await res.json()
        setProfile(data)
      } catch {}
    }
    load()
  }, [])

  const cardData = profile?.insuranceProfile ?? {
    memberName: "",
    memberId: "",
    groupNumber: "",
    policyNumber: "",
    planName: "",
    effectiveDate: "",
    expirationDate: "",
    issueDate: "",
    cardType: "",
  }

  // Build QR from fetched profile
  const qrData = encodeURIComponent(
    JSON.stringify({
      type: "insurance_card",
      provider: "SMILE_INSURANCE",
      memberId: cardData.memberId,
      policy: cardData.policyNumber,
      name: cardData.memberName,
      exp: cardData.expirationDate,
    })
  )

  const emergencyContacts = [
    { service: "Member Services", phone: "1-800-SMILE-01", hours: "24/7" },
    { service: "Pre-Authorization", phone: "1-800-SMILE-02", hours: "Mon-Fri 8AM-6PM" },
    { service: "Mental Health", phone: "1-800-SMILE-03", hours: "24/7" },
    { service: "Pharmacy Benefits", phone: "1-800-SMILE-04", hours: "24/7" },
  ]

  const recentActivity = [
    { date: "2024-01-15", action: "Card used at City General Hospital", status: "Approved" },
    { date: "2024-01-10", action: "Digital card accessed via mobile app", status: "Success" },
    { date: "2024-01-05", action: "Card information updated", status: "Completed" },
    { date: "2023-12-28", action: "New card issued and mailed", status: "Delivered" },
  ]

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Insurance Card</h1>
          <p className="text-muted-foreground">Access and manage your insurance identification card</p>
        </div>
        <Badge variant="default" className="text-sm">
          <Shield className="w-4 h-4 mr-1" />
          Active
        </Badge>
      </div>

      {/* Interactive flip credit card (front/back) */}
      <div className="flex justify-center">
        <div className="w-full max-w-md [perspective:1200px]">
          <AspectRatio ratio={85.6/53.98}>
            <button
              type="button"
              onClick={() => setCopied((v: boolean) => v)}
              className="sr-only"
              aria-hidden
            />
            <div
              onClick={() => setFlipped((f: boolean) => !f)}
              className="relative h-full w-full cursor-pointer [transform-style:preserve-3d] transition-transform duration-700 ease-in-out"
              style={{ transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)' }}
            >
              {/* Front */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl bg-gradient-to-br from-emerald-600 via-emerald-700 to-emerald-900 text-white shadow-2xl p-5 [backface-visibility:hidden]">
                <div className="pointer-events-none absolute inset-0 opacity-20" style={{backgroundImage:"radial-gradient(circle at 20% 20%, rgba(255,255,255,0.35) 0, transparent 40%), radial-gradient(circle at 80% 0%, rgba(255,255,255,0.25) 0, transparent 35%)"}} />
                <div className="relative flex items-center justify-between">
                  <div className="font-semibold tracking-wider">SMILE INSURANCE</div>
                  <div className="text-[10px] text-emerald-100">Member Since 2024</div>
                </div>
                <div className="mt-5 flex items-center gap-3">
                  <div className="h-6 w-8 rounded-sm bg-yellow-300/90 shadow-inner" aria-hidden />
                  <Wifi className="h-4 w-4 rotate-90 opacity-80" aria-hidden />
                </div>
                <div className="mt-5">
                  <div className="text-[10px] uppercase tracking-wide text-emerald-100">Member</div>
                  <div className="text-lg font-semibold leading-tight">{cardData.memberName}</div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3 text-xs font-mono">
                  <div>
                    <div className="text-[10px] uppercase text-emerald-100">Member ID</div>
                    <div>{cardData.memberId}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-emerald-100">Policy</div>
                    <div className="truncate">{cardData.policyNumber}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-emerald-100">Group</div>
                    <div>{cardData.groupNumber}</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase text-emerald-100">Expires</div>
                    <div>{cardData.expirationDate}</div>
                  </div>
                </div>
              </div>
              {/* Back */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-2xl p-5 [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div className="h-8 w-full rounded bg-slate-700/70" aria-hidden />
                <div className="mt-4 grid grid-cols-2 gap-3 text-[11px]">
                  <div>
                    <div className="text-slate-300">Member ID</div>
                    <div className="font-mono">{cardData.memberId}</div>
                  </div>
                  <div>
                    <div className="text-slate-300">Policy</div>
                    <div className="font-mono truncate">{cardData.policyNumber}</div>
                  </div>
                </div>
                <div className="absolute bottom-5 right-5 rounded-md bg-white p-3 shadow-md">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`}
                    alt="Verification QR code"
                    className="h-24 w-24 md:h-28 md:w-28"
                  />
                </div>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>


      {/* Colorful analytics/action tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-0 bg-gradient-to-br from-indigo-500 via-sky-500 to-cyan-400 text-white">
          <CardContent className="h-20 flex items-center justify-between">
            <div>
              <div className="text-xs/5 opacity-90">Downloads</div>
              <div className="text-lg font-semibold">Card PDF</div>
            </div>
            <Download className="w-6 h-6" />
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-fuchsia-500 via-pink-500 to-rose-400 text-white">
          <CardContent className="h-20 flex items-center justify-between">
            <div>
              <div className="text-xs/5 opacity-90">Share</div>
              <div className="text-lg font-semibold">Email Card</div>
            </div>
            <Mail className="w-6 h-6" />
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-emerald-500 via-teal-500 to-lime-400 text-white">
          <CardContent className="h-20 flex items-center justify-between">
            <div>
              <div className="text-xs/5 opacity-90">Request</div>
              <div className="text-lg font-semibold">Physical Card</div>
            </div>
            <CreditCard className="w-6 h-6" />
          </CardContent>
        </Card>
        <Card className="border-0 bg-gradient-to-br from-amber-500 via-orange-500 to-red-400 text-white">
          <CardContent className="h-20 flex items-center justify-between">
            <div>
              <div className="text-xs/5 opacity-90">Access</div>
              <div className="text-lg font-semibold">Show QR</div>
            </div>
            <QrCode className="w-6 h-6" />
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Emergency Contacts
            </CardTitle>
            <CardDescription>Important phone numbers for your insurance needs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {emergencyContacts.map((contact, index) => (
                <div key={index} className="flex justify-between items-center p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">{contact.service}</p>
                    <p className="text-sm text-muted-foreground">{contact.hours}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-mono text-sm">{contact.phone}</p>
                    <Button variant="ghost" size="sm" className="h-auto p-1" aria-label={`Call ${contact.service}`}>
                      <Phone className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              Card Details
            </CardTitle>
            <CardDescription>Additional information about your insurance card</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Issue Date</span>
                <span className="font-medium">{cardData.issueDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Card Type</span>
                <Badge variant="outline">{cardData.cardType}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <Badge variant="default">Active</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Replacement Fee</span>
                <span className="font-medium">$15.00</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rush Delivery</span>
                <span className="font-medium">$25.00</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Card Activity</CardTitle>
          <CardDescription>Track how and when your insurance card has been used</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-emerald-700" />
                  </div>
                  <div>
                    <p className="font-medium">{activity.action}</p>
                    <p className="text-sm text-muted-foreground">{activity.date}</p>
                  </div>
                </div>
                <Badge variant="default">{activity.status}</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-emerald-900">Get the Mobile App</h3>
                <p className="text-emerald-700 text-sm">Access your card instantly, anywhere you go</p>
              </div>
            </div>
            <Button className="bg-emerald-600 hover:bg-emerald-700">Download App</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
