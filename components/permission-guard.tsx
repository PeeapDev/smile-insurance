"use client"

import { can } from "@/lib/rbac"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export function PermissionGuard({ resource, action = "read", children }: { resource: string; action?: "read" | "write" | "del"; children: React.ReactNode }) {
  const allowed = can(resource, action)
  if (!allowed) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>403 Forbidden</CardTitle>
          <CardDescription>You do not have permission to access this resource.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">Ask an administrator to grant {action} access to {resource}.</div>
        </CardContent>
      </Card>
    )
  }
  return <>{children}</>
}
