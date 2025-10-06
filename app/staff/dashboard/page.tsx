"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function StaffDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Staff Dashboard</h1>
        <Badge variant="outline">Staff</Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Today</CardTitle>
            <CardDescription>Your quick overview</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <div>• Use the camera in the header to clock in/out with your QR.</div>
            <div>• Check messages in Chat.</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shortcuts</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <div>Attendance Scan: header camera or go to Staff → Attendance Scan</div>
            <div>Chat: Staff → Chat</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
