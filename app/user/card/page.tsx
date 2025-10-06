"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { CreditCard, Download, Mail, Smartphone, QrCode, Shield, Calendar, Phone, Copy, Check, Wifi, RotateCcw, Printer } from 'lucide-react'

export default function CardPage() {
  const [copied, setCopied] = useState(false)
  const [flipped, setFlipped] = useState(false)
  const [qrOpen, setQrOpen] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
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
    memberName: "John Doe",
    memberId: "MBR-1024-9988",
    groupNumber: "GRP-321",
    policyNumber: "PLCY-7788-5544",
    planName: "Premium Member",
    effectiveDate: "2024-01-01",
    expirationDate: "2024-12-31",
    issueDate: "2024-01-02",
    cardType: "Digital",
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

  function printCard() {
    window.print()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">My Insurance Card</h1>
          <p className="text-muted-foreground">Access and manage your insurance identification card</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="default" className="text-sm">
            <Shield className="w-4 h-4 mr-1" />
            Active
          </Badge>
          <Button size="sm" variant="outline" onClick={() => setFlipped(false)} aria-label="Show front">
            <RotateCcw className="h-4 w-4 mr-1" /> Reset
          </Button>
          <Button size="sm" variant="outline" onClick={printCard} aria-label="Print card">
            <Printer className="h-4 w-4 mr-1" /> Print
          </Button>
        </div>
      </div>

      {/* Interactive flip credit card (front/back) */}
      <div className="flex justify-center">
        <div className="w-full max-w-md [perspective:1200px]" ref={cardRef}>
          <AspectRatio ratio={85.6/53.98}>
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
                    <div className="flex items-center gap-1">
                      <span>{cardData.memberId}</span>
                      <Button size="icon" variant="ghost" className="h-5 w-5" onClick={(e)=>{e.stopPropagation(); copyToClipboard(cardData.memberId)}} aria-label="Copy member ID">
                        {copied ? <Check className="h-3 w-3"/> : <Copy className="h-3 w-3"/>}
                      </Button>
                    </div>
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
                <button onClick={(e)=>{ e.stopPropagation(); setQrOpen(true) }} className="absolute bottom-5 right-5 rounded-md bg-white p-3 shadow-md" aria-label="Open QR code">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${qrData}`} alt="Verification QR code" className="h-24 w-24 md:h-28 md:w-28" />
                </button>
              </div>
            </div>
          </AspectRatio>
        </div>
      </div>

      {/* QR Dialog */}
      <Dialog open={qrOpen} onOpenChange={setQrOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Card QR Code</DialogTitle>
            <DialogDescription>Show this at the provider to verify your membership</DialogDescription>
          </DialogHeader>
          <div className="flex justify-center p-3">
            <img src={`https://api.qrserver.com/v1/create-qr-code/?size=280x280&data=${qrData}`} alt="Insurance QR" className="h-72 w-72" />
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={()=>setQrOpen(false)}>Close</Button>
          </div>
        </DialogContent>
      </Dialog>


      {/* Action tiles */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button className="h-20 flex-col gap-1" variant="outline" onClick={printCard}>
          <Download className="w-5 h-5" />
          Download/Print Card
        </Button>
        <Button className="h-20 flex-col gap-1" variant="outline" onClick={()=>{ window.location.href = `mailto:?subject=My Insurance Card&body=Member ID: ${cardData.memberId}%0APolicy: ${cardData.policyNumber}` }}>
          <Mail className="w-5 h-5" />
          Email Card
        </Button>
        <Button className="h-20 flex-col gap-1" variant="outline" onClick={()=>alert("Request submitted. A physical card will be mailed to your address on file.") }>
          <CreditCard className="w-5 h-5" />
          Request Physical Card
        </Button>
        <Button className="h-20 flex-col gap-1" variant="outline" onClick={()=>setQrOpen(true)}>
          <QrCode className="w-5 h-5" />
          Show Large QR
        </Button>
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
