"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateQrDataUrl, buildVerificationUrl } from "@/lib/qr"

export default function StaffSarahPage() {
  const staffId = "1234"
  const [qr, setQr] = useState<string>("")
  const url = buildVerificationUrl("staff", staffId)
  useEffect(() => {
    ;(async () => setQr(await generateQrDataUrl(url)))()
  }, [url])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Sarah Johnson</h1>
      <Card>
        <CardHeader>
          <CardTitle>Staff ID QR</CardTitle>
          <CardDescription>Scan this QR at the attendance scanner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {qr && <img src={qr} alt="Staff QR" className="h-56 w-56 border rounded" />}
          <div className="text-xs break-all">{url}</div>
        </CardContent>
      </Card>
    </div>
  )
}
