"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateQrDataUrl, buildVerificationUrl } from "@/lib/qr"

export default function StaffCardPage() {
  // Demo staff ID for the logged-in staff
  const staffId = "1234"
  const [qr, setQr] = useState<string>("")
  const url = buildVerificationUrl("staff", staffId)
  useEffect(() => {
    ;(async () => setQr(await generateQrDataUrl(url)))()
  }, [url])

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Staff Card</h1>
      <Card>
        <CardHeader>
          <CardTitle>Staff QR</CardTitle>
          <CardDescription>Present this at the counter or scan using the attendance scanner</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {qr && <img src={qr} alt="Staff QR" className="h-56 w-56 border rounded" />}
          <div className="text-xs break-all">{url}</div>
        </CardContent>
      </Card>
    </div>
  )
}
