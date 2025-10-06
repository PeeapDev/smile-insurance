"use client"

import { isEnabled, type FeatureKey } from "@/lib/feature-flags"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function FeatureGate({ feature, children }: { feature: FeatureKey; children: React.ReactNode }) {
  const enabled = isEnabled(feature)
  if (enabled) return <>{children}</>
  return (
    <Card>
      <CardHeader>
        <CardTitle>Feature unavailable</CardTitle>
        <CardDescription>This section is disabled by the administrator</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">Ask an admin to enable the feature in Settings → Features.</p>
        <div className="pt-3"><Button variant="outline" disabled>Request Access</Button></div>
      </CardContent>
    </Card>
  )
}
