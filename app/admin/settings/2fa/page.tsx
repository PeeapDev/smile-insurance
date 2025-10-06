"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import Link from "next/link"
import { Shield, QrCode, Copy, CheckCircle2, ArrowLeft } from "lucide-react"

export default function TwoFactorSettingsPage() {
  const { toast } = useToast()

  const secret = "JBSWY3DPEHPK3PXP" // demo secret
  const backupCodes = [
    "F4K9-2LMQ-0ZV8",
    "HX2N-9QTY-33PA",
    "M7WD-1KLS-8RRC",
    "B6ZA-5PPQ-2TTN",
    "VV3N-7YQF-4MME",
  ]

  const copy = (text: string, label = "Copied to clipboard") => {
    navigator.clipboard.writeText(text)
    toast({ title: label })
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Shield className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Two‑Factor Authentication</h1>
        </div>
        <Button variant="outline" asChild className="gap-2">
          <Link href="/admin/profile"><ArrowLeft className="h-4 w-4"/>Back to Profile</Link>
        </Button>
      </div>

      {/* Step 1: Scan QR */}
      <Card className="bg-gradient-to-br from-indigo-50 to-white dark:from-indigo-950/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5"/> Step 1 — Scan the QR</CardTitle>
          <CardDescription>Use Google Authenticator, 1Password, Authy, or compatible app</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col sm:flex-row gap-6 items-center">
          <div className="grid place-items-center h-40 w-40 rounded-md border bg-white">
            {/* Placeholder QR */}
            <div className="text-xs text-muted-foreground">QR Code (demo)</div>
          </div>
          <div className="space-y-2 w-full">
            <Label>Secret Key (manual setup)</Label>
            <div className="flex items-center gap-2">
              <Input readOnly value={secret} />
              <Button variant="secondary" onClick={() => copy(secret)} className="gap-2"><Copy className="h-4 w-4"/>Copy</Button>
            </div>
            <p className="text-sm text-muted-foreground">Keep this secret safe. Do not share it.</p>
          </div>
        </CardContent>
      </Card>

      {/* Step 2: Verify */}
      <Card>
        <CardHeader>
          <CardTitle>Step 2 — Verify your code</CardTitle>
          <CardDescription>Enter the 6‑digit code from your authenticator app</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-end gap-3">
            <div className="space-y-2">
              <Label htmlFor="code">6‑digit code</Label>
              <Input id="code" placeholder="123 456" className="max-w-[200px]" />
            </div>
            <Button
              onClick={() => toast({ title: "Two‑factor enabled", description: "2FA has been enabled (demo)" })}
              className="gap-2"
            >
              <CheckCircle2 className="h-4 w-4"/> Enable 2FA
            </Button>
            <Button
              variant="secondary"
              onClick={() => toast({ title: "Two‑factor disabled", description: "2FA has been disabled (demo)" })}
            >
              Disable
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Backup Codes */}
      <Card>
        <CardHeader>
          <CardTitle>Backup Codes</CardTitle>
          <CardDescription>Use when you lose access to your authenticator</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-3">
            {backupCodes.map((c) => (
              <div key={c} className="flex items-center justify-between rounded-md border px-3 py-2 text-sm">
                <span>{c}</span>
                <Button size="sm" variant="ghost" onClick={() => copy(c, "Code copied")}>Copy</Button>
              </div>
            ))}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="secondary" onClick={() => toast({ title: "Regenerated", description: "New backup codes generated (demo)" })}>Regenerate</Button>
            <Button onClick={() => toast({ title: "Downloaded", description: "Codes downloaded (demo)" })}>Download</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
