"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function AttendanceReportsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Attendance Reports</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
          <CardDescription>Date range and staff filter</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-3 gap-3 items-end">
          <div>
            <label className="block text-sm mb-1" htmlFor="from">From</label>
            <Input id="from" type="date" />
          </div>
          <div>
            <label className="block text-sm mb-1" htmlFor="to">To</label>
            <Input id="to" type="date" />
          </div>
          <div className="flex gap-2">
            <Button className="w-full">Run</Button>
            <Button variant="outline" className="w-full">Export CSV</Button>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Results</CardTitle>
          <CardDescription>Placeholder report table</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">No data yet (demo).</div>
        </CardContent>
      </Card>
    </div>
  )
}
