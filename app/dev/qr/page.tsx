"use client"

import { useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { generateQrDataUrl, buildVerificationUrl } from "@/lib/qr"

export default function QrDevPage() {
  const [text, setText] = useState("staff:1234")
  const [dataUrl, setDataUrl] = useState<string>("")

  async function makeQr() {
    const url = buildVerificationUrl("staff", text.split(":")[1] ?? text)
    const img = await generateQrDataUrl(url)
    setDataUrl(img)
  }

  useEffect(() => {
    makeQr()
  }, [])

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>QR Test</CardTitle>
          <CardDescription>Generate and preview a QR code for verification</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="staff:1234" />
            <Button onClick={makeQr}>Generate</Button>
          </div>
          {dataUrl && (
            <div className="flex flex-col items-start gap-2">
              <img src={dataUrl} alt="QR" className="h-48 w-48 border" />
              <div className="text-xs break-all">{buildVerificationUrl("staff", text.split(":")[1] ?? text)}</div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
