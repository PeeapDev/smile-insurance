"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { ScanLine, Search, Plus } from "lucide-react"

function parseScanned(url: string) {
  try {
    const a = document.createElement("a")
    a.href = url
    const parts = a.pathname.split("/").filter(Boolean)
    const [verify, type, id] = parts
    if (verify !== "verify" || !type || !id) return null
    return { type, id }
  } catch {
    return null
  }
}

export function StaffOtcQuick() {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState<{ type: string; id: string; name: string; status: string } | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [usingDetector, setUsingDetector] = useState(false)

  function stopCamera() {
    const stream = videoRef.current?.srcObject as MediaStream | undefined
    stream?.getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraReady(false)
  }

  useEffect(() => {
    if (!open) {
      stopCamera()
      setProfile(null)
    }
  }, [open])

  async function startScan() {
    try {
      // @ts-ignore
      const supported = "BarcodeDetector" in window
      setUsingDetector(!!supported)
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setCameraReady(true)
      }
      if (supported) loopDetect()
    } catch (e) {
      toast({ title: "Camera error", description: "Unable to access camera. Check permissions." })
    }
  }

  async function loopDetect() {
    // @ts-ignore
    const detector = new window.BarcodeDetector({ formats: ["qr_code"] })
    const el = videoRef.current
    if (!el) return
    const tick = async () => {
      if (!open) return
      try {
        // @ts-ignore
        const bitmap = await createImageBitmap(el)
        const codes = await detector.detect(bitmap)
        if (codes && codes.length > 0) {
          const raw = codes[0].rawValue as string
          const parsed = parseScanned(raw)
          if (parsed) {
            // Demo: fabricate profile info
            const name = parsed.type === "policy" ? "TechCorp Policy" : parsed.type === "user" ? "John Doe" : `Staff ${parsed.id}`
            const status = parsed.type === "policy" ? "ACTIVE" : "VERIFIED"
            setProfile({ ...parsed, name, status })
          } else {
            toast({ title: "Invalid QR", description: "Unrecognized QR format" })
          }
        }
      } catch {}
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  function handleSearch(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = new FormData(ev.currentTarget)
    const q = String(form.get("q") || "").trim()
    if (!q) return
    // Demo: return a fake profile
    setProfile({ type: "user", id: "u-1001", name: q || "Sarah Johnson", status: "ACTIVE" })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className="rounded-full" aria-label="Over the Counter">
          <Plus className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[960px]" onInteractOutside={() => setOpen(false)}>
        <DialogHeader>
          <DialogTitle>Over the Counter</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Button variant="secondary" onClick={() => (window.location.href = "/staff/visitors")}>Manage Visitor</Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/admin/members/create")}>New User</Button>
          <Button variant="secondary" onClick={() => (window.location.href = "/staff/enquiries/new")}>New Enquiry</Button>
          <Button variant="secondary" onClick={() => document.getElementById("otc-search-tab")?.click()}>Search</Button>
        </div>
        <Tabs defaultValue="scan" className="space-y-4">
          <TabsList>
            <TabsTrigger value="scan">Scan Card</TabsTrigger>
            <TabsTrigger id="otc-search-tab" value="search">Search User</TabsTrigger>
          </TabsList>
          <TabsContent value="scan" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="relative w-full aspect-[16/9] bg-black overflow-hidden rounded-md min-h-[320px]">
                  <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                  {!cameraReady && (
                    <div className="absolute inset-0 grid place-items-center text-white">
                      <Button variant="secondary" onClick={startScan}>Start Camera</Button>
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">Detector: {usingDetector ? <Badge>BarcodeDetector</Badge> : <Badge variant="outline">Not Supported</Badge>}</div>
              </div>
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle>Profile</CardTitle>
                    <CardDescription>Scanned user/organization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {!profile ? (
                      <div className="text-sm text-muted-foreground">No profile yet. Scan a card to view details.</div>
                    ) : (
                      <div className="space-y-2">
                        <div className="text-lg font-medium">{profile.name}</div>
                        <div className="text-sm">Type: {profile.type}</div>
                        <div className="text-sm">ID: {profile.id}</div>
                        <Badge variant="outline">{profile.status}</Badge>
                        <div className="pt-2 flex gap-2">
                          <Button size="sm" variant="default">Open Profile</Button>
                          <Button size="sm" variant="outline">Start Claim</Button>
                          <Button size="sm" variant="outline">Message</Button>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="search" className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input name="q" placeholder="Search by name, email, or policy no." />
              <Button type="submit"><Search className="h-4 w-4 mr-1"/>Search</Button>
            </form>
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                {!profile ? <div className="text-sm text-muted-foreground">Enter a query to lookup.</div> : (
                  <div className="space-y-2">
                    <div className="text-lg font-medium">{profile.name}</div>
                    <div className="text-sm">Type: {profile.type}</div>
                    <div className="text-sm">ID: {profile.id}</div>
                    <Badge variant="outline">{profile.status}</Badge>
                    <div className="pt-2 flex gap-2">
                      <Button size="sm" variant="default">Open Profile</Button>
                      <Button size="sm" variant="outline">Start Claim</Button>
                      <Button size="sm" variant="outline">Message</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
