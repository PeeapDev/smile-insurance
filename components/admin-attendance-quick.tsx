"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Camera } from "lucide-react"
import { toast } from "@/hooks/use-toast"

function loadSettings() {
  try {
    const raw = localStorage.getItem("attendanceSettings")
    if (raw) return JSON.parse(raw) as { clockInStart: string; clockInEnd: string; clockOutStart: string; clockOutEnd: string }
  } catch {}
  return { clockInStart: "07:00", clockInEnd: "10:00", clockOutStart: "16:00", clockOutEnd: "20:00" }
}

function inWindow(now: Date, startHHMM: string, endHHMM: string) {
  const [sh, sm] = startHHMM.split(":").map(Number)
  const [eh, em] = endHHMM.split(":").map(Number)
  const start = new Date(now)
  start.setHours(sh, sm, 0, 0)
  const end = new Date(now)
  end.setHours(eh, em, 0, 0)
  return now >= start && now <= end
}

export function AdminAttendanceQuick() {
  const [nowStr, setNowStr] = useState("")
  const [open, setOpen] = useState(false)
  const [cameraReady, setCameraReady] = useState(false)
  const [scanned, setScanned] = useState<string>("")
  const [usingDetector, setUsingDetector] = useState<boolean>(false)
  const [cfg, setCfg] = useState(loadSettings())
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const id = setInterval(() => {
      const now = new Date()
      setNowStr(now.toLocaleString())
    }, 1000)
    return () => clearInterval(id)
  }, [])

  function stopCamera() {
    const stream = videoRef.current?.srcObject as MediaStream | undefined
    stream?.getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraReady(false)
  }

  useEffect(() => {
    // keep cfg up to date
    setCfg(loadSettings())
    if (!open) {
      stopCamera()
      return
    }
    let stop = false
    async function init() {
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
    init()
    return () => {
      stopCamera()
      stop = true
    }
  }, [open])

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
          if (raw && raw !== scanned) {
            setScanned(raw)
            handleQRCode(raw)
            setOpen(false)
          }
        }
      } catch {}
      requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }

  function handleQRCode(url: string) {
    try {
      const a = document.createElement("a")
      a.href = url
      const parts = a.pathname.split("/").filter(Boolean)
      const [verify, type, id] = parts
      const now = new Date()
      if (verify !== "verify" || !type || !id) {
        toast({ title: "Invalid QR", description: "Unrecognized QR format." })
        return
      }
      const current = loadSettings()
      const withinClockIn = inWindow(now, current.clockInStart, current.clockInEnd)
      const withinClockOut = inWindow(now, current.clockOutStart, current.clockOutEnd)
      if (type === "staff") {
        if (withinClockIn) {
          toast({ title: "Clock-in recorded", description: `Staff #${id} at ${now.toLocaleTimeString()}` })
        } else if (withinClockOut) {
          toast({ title: "Clock-out recorded", description: `Staff #${id} at ${now.toLocaleTimeString()}` })
        } else {
          toast({ title: "Outside allowed time", description: `Staff #${id} scan not allowed now`, variant: "destructive" })
        }
      } else {
        toast({ title: "Scanned", description: url })
      }
    } catch {
      toast({ title: "Invalid QR", description: "Failed to parse QR content." })
    }
  }

  return (
    <div className="relative flex items-center justify-center gap-3 w-full">
      <span className="text-xs sm:text-sm text-muted-foreground">{nowStr}</span>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button size="icon" className="rounded-full" aria-label="Open attendance scanner">
            <Camera className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[820px]" onInteractOutside={() => setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Attendance Scanner</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div className="relative w-full aspect-[16/9] bg-black overflow-hidden rounded-md min-h-[360px]">
              <video ref={videoRef} className="w-full h-full object-cover" playsInline muted />
              {!cameraReady && <div className="absolute inset-0 grid place-items-center text-white">Starting camera…</div>}
            </div>
            <div className="text-sm text-muted-foreground">Detector: {usingDetector ? <Badge>BarcodeDetector</Badge> : <Badge variant="outline">Not Supported</Badge>}</div>
            {scanned && (
              <div className="text-xs">Last scanned: <span className="font-mono break-all">{scanned}</span></div>
            )}
            <div className="text-xs text-muted-foreground">
              Allowed times: Clock-in {cfg.clockInStart}-{cfg.clockInEnd}, Clock-out {cfg.clockOutStart}-{cfg.clockOutEnd}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
