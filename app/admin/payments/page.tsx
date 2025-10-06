"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { PermissionGuard } from "@/components/permission-guard"

function loadMonimeLocal() {
  try {
    return {
      apiKey: localStorage.getItem("monime_api_key") || "",
      spaceId: localStorage.getItem("monime_space_id") || "",
      apiVersion: localStorage.getItem("monime_api_version") || "",
      apiBase: localStorage.getItem("monime_api_base") || "https://api.monime.io",
      webhookSecret: localStorage.getItem("monime_webhook_secret") || "",
    }
  } catch {
    return { apiKey: "", spaceId: "", apiVersion: "", apiBase: "https://api.monime.io", webhookSecret: "" }
  }
}

export default function PaymentsSettingsPage() {
  const { toast } = useToast()
  const [apiKey, setApiKey] = useState("")
  const [spaceId, setSpaceId] = useState("")
  const [apiVersion, setApiVersion] = useState("")
  const [apiBase, setApiBase] = useState("https://api.monime.io")
  const [webhookSecret, setWebhookSecret] = useState("")
  const [testing, setTesting] = useState(false)

  useEffect(() => {
    const v = loadMonimeLocal()
    setApiKey(v.apiKey)
    setSpaceId(v.spaceId)
    setApiVersion(v.apiVersion)
    setApiBase(v.apiBase)
    setWebhookSecret(v.webhookSecret)
  }, [])

  function saveLocal() {
    try {
      localStorage.setItem("monime_api_key", apiKey)
      localStorage.setItem("monime_space_id", spaceId)
      localStorage.setItem("monime_api_version", apiVersion)
      localStorage.setItem("monime_api_base", apiBase)
      localStorage.setItem("monime_webhook_secret", webhookSecret)
      toast({ title: "Saved", description: "Monime credentials saved locally (demo)" })
    } catch (e: any) {
      toast({ title: "Save failed", description: String(e), variant: "destructive" })
    }
  }

  async function testConnection() {
    try {
      setTesting(true)
      const res = await fetch("/api/monime/test", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ apiKey, spaceId, apiVersion, apiBase }),
      })
      if (!res.ok) throw new Error(await res.text())
      const data = await res.json()
      toast({ title: "Connection OK", description: `Environment: ${data?.status?.environment || "?"}` })
    } catch (e: any) {
      toast({ title: "Test failed", description: String(e?.message || e), variant: "destructive" })
    } finally {
      setTesting(false)
    }
  }

  return (
    <PermissionGuard resource="payments" action="read">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Payments</h1>
        <Card>
          <CardHeader>
            <CardTitle>Monime Credentials</CardTitle>
            <CardDescription>Enter your Monime API details. Use a test token (mon_test_...) in development.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="monimeApiKey">API Key</Label>
                <Input id="monimeApiKey" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="mon_test_... or mon_..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monimeSpaceId">Space ID</Label>
                <Input id="monimeSpaceId" value={spaceId} onChange={(e) => setSpaceId(e.target.value)} placeholder="space_..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monimeApiVersion">API Version (optional)</Label>
                <Input id="monimeApiVersion" value={apiVersion} onChange={(e) => setApiVersion(e.target.value)} placeholder="e.g. caph.2025-08-23" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="monimeApiBase">API Base</Label>
                <Input id="monimeApiBase" value={apiBase} onChange={(e) => setApiBase(e.target.value)} placeholder="https://api.monime.io" />
              </div>
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="monimeWebhookSecret">Webhook Secret</Label>
                <Input id="monimeWebhookSecret" value={webhookSecret} onChange={(e) => setWebhookSecret(e.target.value)} placeholder="For verifying Monime webhooks" />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={saveLocal}>Save</Button>
              <Button variant="outline" onClick={testConnection} disabled={testing}>Test Connection</Button>
            </div>
            <Separator />
            <div className="text-sm text-muted-foreground">
              For production, set environment variables on your hosting platform: <code>MONIME_API_KEY</code>, <code>MONIME_SPACE_ID</code>, <code>MONIME_WEBHOOK_SECRET</code>, optional <code>MONIME_API_VERSION</code>.
            </div>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  )
}
