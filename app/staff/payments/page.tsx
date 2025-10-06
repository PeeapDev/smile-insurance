"use client"

import { FeatureGate } from "@/components/feature-gate"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StaffPaymentsPage() {
  return (
    <FeatureGate feature="staff.payments">
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Payments</h1>
        <p className="text-sm text-muted-foreground">Process and view payments.</p>
        <Link href="/user/dashboard/payments"><Button variant="outline">Open Payments (User view)</Button></Link>
      </div>
    </FeatureGate>
  )
}
