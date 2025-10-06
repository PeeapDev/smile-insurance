"use client"

import { isEnabled, type FeatureKey } from "@/lib/feature-flags"
import { can, currentRole } from "@/lib/rbac"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

type Props = {
  feature: FeatureKey
  resource?: string // RBAC resource key (e.g., "claims", "members")
  children: React.ReactNode
}

export function FeatureGate({ feature, resource, children }: Props) {
  const enabled = isEnabled(feature)
  const role = currentRole()
  const allowed = resource ? can(resource, "read", role) : true

  if (enabled && allowed) return <>{children}</>

  const title = !allowed ? "Permission required" : "Feature unavailable"
  const desc = !allowed
    ? "Your role does not have permission to access this module."
    : "This section is disabled by the administrator."

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{desc}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">
          {!allowed
            ? "Ask an administrator to grant access in Admin → Settings (Roles & Permissions)."
            : "Ask an administrator to enable the feature in Admin → Settings → Features."}
        </p>
        <div className="pt-3"><Button variant="outline" disabled>Request Access</Button></div>
      </CardContent>
    </Card>
  )
}
