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
import { can, currentRole } from "@/lib/rbac"
import { membersFind } from "@/lib/demo-members"
import { parseScanned as parseScannedUrl, useQrScanner } from "@/hooks/use-qr-scanner"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/lib/routes"

function parseScanned(url: string) { return parseScannedUrl(url) }

export function StaffOtcQuick() {
  const [open, setOpen] = useState(false)
  const [profile, setProfile] = useState<{ type: string; id: string; name: string; status: string } | null>(null)
  const { videoRef, canvasRef, start, stop, detectorType, cameraReady } = useQrScanner()
  const [tab, setTab] = useState<"scan" | "search">("scan")
  const role = typeof window !== "undefined" ? currentRole() : "user"
  const router = useRouter()

  function stopCamera() { stop() }

  useEffect(() => {
    if (!open) { stopCamera(); setProfile(null) }
  }, [open])

  useEffect(() => { return () => { stopCamera() } }, [])

  async function startScan() {
    try { await start(handleDecodedRaw) } catch { toast({ title: "Camera error", description: "Unable to access camera. Check permissions." }) }
  }

  // detection loop handled inside useQrScanner()

  function handleDecodedRaw(raw: string) {
    const parsed = parseScanned(raw)
    if (parsed) {
      const name = parsed.type === "policy" ? "TechCorp Policy" : parsed.type === "user" ? "John Doe" : `Staff ${parsed.id}`
      const status = parsed.type === "policy" ? "ACTIVE" : "VERIFIED"
      setProfile({ ...parsed, name, status })
    } else {
      toast({ title: "Invalid QR", description: "Unrecognized QR format" })
    }
  }

  function handleSearch(ev: React.FormEvent<HTMLFormElement>) {
    ev.preventDefault()
    const form = new FormData(ev.currentTarget)
    const q = String(form.get("q") || "").trim()
    if (!q) return
    const m = membersFind(q)
    if (m) {
      setProfile({ type: "user", id: m.id, name: m.name, status: m.status || "ACTIVE" })
    } else {
      toast({ title: "No match", description: "No user found by that ID, email, or name" })
    }
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
          <Button variant="secondary" onClick={() => router.push(ROUTES.staff.visitors)}>Manage Visitor</Button>
          <Button
            variant="secondary"
            onClick={() => {
              if (can("members", "write", role)) {
                router.push(ROUTES.staff.memberCreate)
              } else {
                toast({ title: "Permission required", description: "You do not have access to create users." })
              }
            }}
          >
            New User
          </Button>
          <Button variant="secondary" onClick={() => router.push(ROUTES.staff.enquiryNew)}>New Enquiry</Button>
          <Button variant="secondary" onClick={() => setTab("search")}>Search</Button>
        </div>
        <Tabs value={tab} onValueChange={(v)=>setTab(v as any)} className="space-y-4">
          <TabsList>
            <TabsTrigger value="scan">Scan Card</TabsTrigger>
            <TabsTrigger id="otc-search-tab" value="search">Search User</TabsTrigger>
          </TabsList>
          <TabsContent value="scan" className="space-y-4">
            <div className="grid lg:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="relative w-full aspect-[16/9] bg-black overflow-hidden rounded-md min-h-[320px]">
                  <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
                  {/* hidden canvas used for jsQR fallback */}
                  <canvas ref={canvasRef} className="hidden" />
                  {!cameraReady && (
                    <div className="absolute inset-0 grid place-items-center text-white">
                      <Button variant="secondary" onClick={startScan}>Start Camera</Button>
                    </div>
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  Detector: {detectorType === "barcode" ? (
                    <Badge>BarcodeDetector</Badge>
                  ) : detectorType === "jsqr" ? (
                    <Badge variant="secondary">jsQR Fallback</Badge>
                  ) : (
                    <Badge variant="outline">Not Supported</Badge>
                  )}
                </div>
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
