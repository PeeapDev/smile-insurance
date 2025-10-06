"use client"

import { PermissionGuard } from "@/components/permission-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function UWAdminDashboardPage() {
  return (
    <PermissionGuard resource="underwriting" action="read">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Underwriting Dashboard</h1>
        <div className="grid md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Approval Rate</CardTitle>
              <CardDescription>Last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">78%</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Avg. Turnaround</CardTitle>
              <CardDescription>From intake to decision</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">12h</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Open Cases</CardTitle>
              <CardDescription>All queues</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">42</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PermissionGuard>
  )
}
