"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { loadFlags, saveFlags, DEFAULT_FLAGS, type FeatureFlags, type FeatureKey } from "@/lib/feature-flags"

const ENTRIES: { key: FeatureKey; label: string }[] = [
  { key: "staff.members", label: "Staff: Members" },
  { key: "staff.insurance_cards", label: "Staff: Insurance Cards" },
  { key: "staff.claims", label: "Staff: Claims Processing" },
  { key: "staff.underwriting", label: "Staff: Underwriting" },
  { key: "staff.payments", label: "Staff: Payments" },
  { key: "staff.chat", label: "Staff: Chat" },
  { key: "staff.contacts", label: "Staff: Contacts" },
  { key: "staff.invoices", label: "Staff: Invoices" },
  { key: "staff.files", label: "Staff: Files" },
  { key: "staff.companies", label: "Staff: Companies" },
  { key: "staff.hr", label: "Staff: HR" },
  { key: "staff.inventory", label: "Staff: Inventory" },
  { key: "staff.reports", label: "Staff: Reports" },
  { key: "staff.settings", label: "Staff: Settings" },
  { key: "staff.motor", label: "Staff: Motor" },
  { key: "staff.medical", label: "Staff: Medical" },
]

export default function AdminFeatureFlagsPage() {
  const [flags, setFlags] = useState<FeatureFlags>(DEFAULT_FLAGS)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setFlags(loadFlags())
    setMounted(true)
  }, [])

  function toggle(k: FeatureKey, v: boolean) {
    const next = { ...flags, [k]: v }
    setFlags(next)
    saveFlags(next)
  }

  function enableAll() {
    const next: FeatureFlags = Object.fromEntries(Object.keys(flags).map(k => [k, true])) as FeatureFlags
    setFlags(next)
    saveFlags(next)
  }

  function disableAll() {
    const next: FeatureFlags = Object.fromEntries(Object.keys(flags).map(k => [k, false])) as FeatureFlags
    setFlags(next)
    saveFlags(next)
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Features</h1>
          <div className="text-sm text-muted-foreground">Toggle which modules staff can access</div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={disableAll}>Disable All</Button>
          <Button onClick={enableAll}>Enable All</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Staff Modules</CardTitle>
          <CardDescription>Changes take effect immediately</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {ENTRIES.map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between p-3 border rounded-md">
              <Label htmlFor={key}>{label}</Label>
              <Switch id={key} checked={!!flags[key]} onCheckedChange={(v)=>toggle(key, v)} disabled={!mounted} />
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
