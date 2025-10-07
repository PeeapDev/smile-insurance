"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UserPlus, ArrowLeft, IdCard, Upload, RefreshCw } from "lucide-react"
import QRCode from "react-qr-code"

export default function NewEmployeePage() {
  const params = useParams<{ company: string }>()
  const companySlug = (params?.company as string) || "company"
  const companyName = useMemo(() => companySlug.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()), [companySlug])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [department, setDepartment] = useState("Engineering")
  const [position, setPosition] = useState("")
  const [startDate, setStartDate] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [healthStatus, setHealthStatus] = useState("Good")
  const [healthHistory, setHealthHistory] = useState("")
  const [image, setImage] = useState<string | null>(null)
  const [memberId, setMemberId] = useState("")
  const [isClient, setIsClient] = useState(false)

  // Generate a 5-character ID excluding i, o, l and 0,1. Pattern: LLLNN or LLNNN
  const generateMemberId = () => {
    const letters = "ABCDEFGHJKMNPQRSTUVWXYZ" // no I, O, L
    const digits = "23456789" // no 0,1
    const patterns: Array<("L"|"N")[]> = [
      ["L","L","L","N","N"],
      ["L","L","N","N","N"],
    ]
    const pattern = patterns[Math.floor(Math.random()*patterns.length)]
    const pick = (pool: string) => pool[Math.floor(Math.random()*pool.length)]
    return pattern.map(t => t === "L" ? pick(letters) : pick(digits)).join("")
  }

  useEffect(() => {
    setMemberId(generateMemberId())
    setIsClient(true)
  }, [])

  const onFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (!f) return
    const url = URL.createObjectURL(f)
    setImage(url)
  }

  const disabled = !name || !email

  const [showBack, setShowBack] = useState(false)
  const flip = () => setShowBack((v) => !v)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="gap-2"><Link href="../employees"><ArrowLeft className="h-4 w-4"/> Back</Link></Button>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Add Employee</h2>
            <p className="text-muted-foreground">Create a new employee profile</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button type="button" variant="outline" className="gap-2" onClick={()=>setMemberId(generateMemberId())}><RefreshCw className="h-4 w-4"/> Regenerate ID</Button>
          <Button disabled={disabled} className="bg-sky-600 hover:bg-sky-700 text-white gap-2"><UserPlus className="h-4 w-4"/> Create</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Profile Information</CardTitle>
            <CardDescription>Basic details and health information</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full name</Label>
                <Input id="name" value={name} onChange={(e)=>setName(e.target.value)} placeholder="Jane Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} placeholder="jane@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" value={phone} onChange={(e)=>setPhone(e.target.value)} placeholder="(555) 123-4567" />
              </div>
              <div className="space-y-2">
                <Label>Department</Label>
                <Select value={department} onValueChange={setDepartment}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="HR">HR</SelectItem>
                    <SelectItem value="Finance">Finance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="position">Position</Label>
                <Input id="position" value={position} onChange={(e)=>setPosition(e.target.value)} placeholder="Role / Title" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="start">Start date</Label>
                <Input id="start" type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="expiry">Expiry date</Label>
                <Input id="expiry" type="date" value={expiryDate} onChange={(e)=>setExpiryDate(e.target.value)} />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Current health status</Label>
                <Select value={healthStatus} onValueChange={setHealthStatus}>
                  <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="photo">Profile image</Label>
                <div className="flex gap-3 items-center">
                  <Input id="photo" type="file" accept="image/*" onChange={onFile} />
                  <Button type="button" variant="outline" className="gap-2"><Upload className="h-4 w-4"/> Upload</Button>
                </div>
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="history">Past health information</Label>
                <Textarea id="history" value={healthHistory} onChange={(e)=>setHealthHistory(e.target.value)} placeholder="Allergies, surgeries, chronic conditions, medications..." rows={5} />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Card Preview */}
        <Card className="relative overflow-hidden">
          <CardHeader>
            <div className="flex items-center justify-between gap-2">
              <div>
                <CardTitle className="flex items-center gap-2"><IdCard className="h-5 w-5"/> Membership Card</CardTitle>
                <CardDescription>Front: ID, Name, Expiry • Back: QR code</CardDescription>
              </div>
              <Button type="button" variant="outline" size="sm" className="gap-2" onClick={flip}><RefreshCw className="h-4 w-4"/> Flip</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="group relative mx-auto w-full max-w-[340px] aspect-[85/54]">
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-r from-sky-500 via-indigo-500 to-violet-600 blur opacity-30 transition-opacity group-hover:opacity-60" />
              {/* Card front/back */}
              {!showBack ? (
                <div className="absolute inset-0 rounded-2xl border bg-white/80 dark:bg-background/80 backdrop-blur p-3 sm:p-4 shadow-sm transition-transform duration-500 group-hover:-translate-y-0.5">
                  <div className="flex items-center justify-between">
                    <div className="text-[9px] sm:text-[10px] tracking-widest text-muted-foreground">{companyName}</div>
                    <div className="h-3.5 w-6 rounded-sm bg-gradient-to-r from-zinc-300 to-zinc-50 border" />
                  </div>
                  <div className="mt-2 sm:mt-3">
                    <div className="text-[10px] sm:text-[11px] text-muted-foreground">Full Name</div>
                    <div className="text-base sm:text-lg font-semibold leading-tight truncate">{name || "Full Name"}</div>
                  </div>
                  <div className="mt-2 sm:mt-3 grid grid-cols-2 gap-2 text-[10px] sm:text-[11px]">
                    <div className="rounded-md border p-1.5 sm:p-2">
                      <div className="text-muted-foreground">Member ID</div>
                      <div className="font-medium tracking-wide truncate">{memberId}</div>
                    </div>
                    <div className="rounded-md border p-1.5 sm:p-2">
                      <div className="text-muted-foreground">Expires</div>
                      <div className="font-medium">{expiryDate || "—"}</div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 sm:bottom-3 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-[9px] sm:text-[10px] text-muted-foreground">
                    <span>Powered by SMILE Insurance Company</span>
                    <span className="uppercase tracking-widest">Smile</span>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 rounded-2xl border bg-white/80 dark:bg-background/80 backdrop-blur p-3 sm:p-4 shadow-sm">
                  <div className="text-[9px] sm:text-[10px] tracking-widest text-muted-foreground flex items-center justify-between">
                    <span>{companyName}</span>
                    <span>Powered by SMILE Insurance Company</span>
                  </div>
                  <div className="h-full flex items-center justify-center">
                    <div className="flex flex-col items-center gap-2 text-center">
                      <div className="bg-white p-1 rounded">
                        {isClient ? (
                          <>
                            <QRCode value={`${memberId}|${companySlug}|${expiryDate || ""}`} size={88} className="hidden sm:block" />
                            <QRCode value={`${memberId}|${companySlug}|${expiryDate || ""}`} size={64} className="sm:hidden" />
                          </>
                        ) : (
                          <div className="h-[64px] w-[64px] sm:h-[88px] sm:w-[88px] bg-zinc-200 rounded" />
                        )}
                      </div>
                      <div className="text-[10px] sm:text-xs text-muted-foreground">Scan for membership details</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
