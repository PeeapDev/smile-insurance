"use client"

import { useEffect, useState } from "react"
import type React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/components/ui/use-toast"
import { PermissionGuard } from "@/components/permission-guard"
import { QrCode, Trash2 } from "lucide-react"

// Types
type AttendanceLog = {
  id: string
  time: string // ISO
  type: "check_in" | "check_out"
  staffEmail: string
  raw?: string
}

function loadLogs(): AttendanceLog[] {
  try {
    const raw = localStorage.getItem("attendance_logs")
    const arr = raw ? JSON.parse(raw) : []
    return Array.isArray(arr) ? arr : []
  } catch {
    return []
  }
}
function saveLogs(items: AttendanceLog[]) {
  try { localStorage.setItem("attendance_logs", JSON.stringify(items)) } catch {}
}

export default function AdminHRAttendancePage() {
  const { toast } = useToast()
  const [logs, setLogs] = useState<AttendanceLog[]>([])
  const [manualEmail, setManualEmail] = useState("")
  const [manualType, setManualType] = useState<"check_in" | "check_out">("check_in")
  const [staff, setStaff] = useState<Array<{ name: string; email: string }>>([])
  const [selectedEmail, setSelectedEmail] = useState<string>("")

  useEffect(() => {
    setLogs(loadLogs())
    // Load staff directory (demo fallback if missing)
    try {
      const keys = ["staff_directory", "staffDirectory", "demo_staff_directory"]
      let list: any[] = []
      for (const k of keys) {
        const raw = localStorage.getItem(k)
        if (!raw) continue
        try { const arr = JSON.parse(raw); if (Array.isArray(arr)) { list = arr; break } } catch {}
      }
      if (!list.length) {
        list = [
          { name: "Sarah Johnson", email: "sarah.johnson@example.com" },
          { name: "Michael Chen", email: "michael.chen@example.com" },
        ]
      }
      setStaff(list.map((x) => ({ name: x.name, email: x.email })))
    } catch {}
    // Listen for global scans (from the header scanner)
    function onScan(ev: Event) {
      const detail = (ev as CustomEvent).detail || {}
      const raw = typeof detail === "string" ? detail : JSON.stringify(detail)
      handleScan(raw)
    }
    window.addEventListener("attendance:scan", onScan as any)
    // Keep in sync if storage updated elsewhere
    function onStorage(e: StorageEvent) {
      if (e.key === "attendance_logs") setLogs(loadLogs())
    }
    window.addEventListener("storage", onStorage)
    return () => {
      window.removeEventListener("attendance:scan", onScan as any)
      window.removeEventListener("storage", onStorage)
    }
  }, [])

  function appendLog(entry: AttendanceLog) {
    const next = [entry, ...logs].slice(0, 500)
    setLogs(next)
    saveLogs(next)
  }

  function handleScan(raw: string) {
    // Expect QR content to be staff email or JSON { email, type }
    try {
      let email = ""
      let type: "check_in" | "check_out" = "check_in"
      if (raw.includes("@") && !raw.trim().startsWith("{")) {
        email = raw.trim()
      } else {
        const obj = JSON.parse(raw)
        email = obj.email
        type = obj.type === "check_out" ? "check_out" : "check_in"
      }
      if (!email) throw new Error("No email in QR")
      const entry: AttendanceLog = { id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`, time: new Date().toISOString(), staffEmail: email, type, raw }
      appendLog(entry)
      toast({ title: `Scan: ${type.replace("_"," ")}`, description: email })
    } catch {
      toast({ title: "Invalid QR", description: raw, variant: "destructive" })
    }
  }

  function addManual() {
    const email = selectedEmail || manualEmail
    if (!email) return
    const entry: AttendanceLog = { id: crypto?.randomUUID ? crypto.randomUUID() : `${Date.now()}`, time: new Date().toISOString(), staffEmail: email, type: manualType }
    appendLog(entry)
    setManualEmail("")
  }

  function clearLogs() {
    setLogs([])
    saveLogs([])
  }

  // Compute today's status for each staff
  const todayId = (() => {
    const d = new Date(); const y = d.getFullYear(); const m = String(d.getMonth()+1).padStart(2, "0"); const day = String(d.getDate()).padStart(2, "0");
    return `${y}-${m}-${day}`
  })()
  function statusFor(email: string): "P" | "L" | "A" {
    const todayLogs = logs.filter((l) => l.staffEmail === email && l.time.startsWith(todayId))
    const firstIn = todayLogs.find((l) => l.type === "check_in")
    if (!firstIn) return "A"
    const t = new Date(firstIn.time)
    // Late if after 09:15 local time
    const lateThreshold = new Date(firstIn.time)
    lateThreshold.setHours(9, 15, 0, 0)
    return t > lateThreshold ? "L" : "P"
  }

  return (
    <PermissionGuard resource="hr" action="write">
      <div className="space-y-6 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <QrCode className="h-6 w-6" />
            <h1 className="text-2xl font-bold">Attendance</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="destructive" onClick={clearLogs} className="gap-2"><Trash2 className="h-4 w-4"/> Clear</Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {staff.length === 0 ? (
                  <TableRow><TableCell colSpan={3} className="text-sm text-muted-foreground">No staff found.</TableCell></TableRow>
                ) : (
                  staff.map((s) => {
                    const st = statusFor(s.email)
                    const cls = st === "A" ? "text-red-600 font-semibold" : st === "L" ? "text-amber-600 font-semibold" : "text-green-600 font-semibold"
                    return (
                      <TableRow key={s.email}>
                        <TableCell>{s.name}</TableCell>
                        <TableCell>{s.email}</TableCell>
                        <TableCell className={cls}>{st}</TableCell>
                      </TableRow>
                    )
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Manual Entry</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-3 gap-2">
              <div className="sm:col-span-2">
                <Label>Staff</Label>
                <Select value={selectedEmail} onValueChange={setSelectedEmail}>
                  <SelectTrigger><SelectValue placeholder="Select staff" /></SelectTrigger>
                  <SelectContent>
                    {staff.map((s) => (
                      <SelectItem key={s.email} value={s.email}>{s.name} • {s.email}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <div className="mt-2 text-xs text-muted-foreground">Or paste a JSON payload below if scanning is unavailable.</div>
                <div className="mt-2">
                  <Label className="text-xs">Optional JSON payload</Label>
                  <Input
                    placeholder={`{"email":"staff@example.com","type":"check_in"}`}
                    value={manualEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setManualEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex items-end gap-2">
                <Button onClick={addManual}>Add Check-in</Button>
                <Button variant="outline" onClick={() => { setManualType(manualType === "check_in" ? "check_out" : "check_in") }}>{manualType === "check_in" ? "Switch to Check-out" : "Switch to Check-in"}</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  )
}
