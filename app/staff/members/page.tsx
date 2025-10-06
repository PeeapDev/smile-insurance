"use client"

import { FeatureGate } from "@/components/feature-gate"
import { ROUTES } from "@/lib/routes"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function StaffMembersPage() {
  return (
    <FeatureGate feature="staff.members">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Members</h1>
          <Link href={ROUTES.staff.memberCreate}><Button>Add Member</Button></Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Members workspace</CardTitle>
            <CardDescription>Use Add Member or search from OTC modal</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Coming soon: searchable members directory.</p>
          </CardContent>
        </Card>
      </div>
    </FeatureGate>
  )
}
