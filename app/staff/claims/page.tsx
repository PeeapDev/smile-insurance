"use client"

import { FeatureGate } from "@/components/feature-gate"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StaffClaimsPage() {
  return (
    <FeatureGate feature="staff.claims">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Claims Processing</h1>
          <Link href="/admin/claims/submit"><Button>Submit Claim</Button></Link>
        </div>
        <p className="text-sm text-muted-foreground">Access the claims list in Admin section.</p>
        <div>
          <Link href="/admin/claims"><Button variant="outline">Go to Admin Claims</Button></Link>
        </div>
      </div>
    </FeatureGate>
  )
}
