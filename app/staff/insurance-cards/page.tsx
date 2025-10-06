"use client"

import { FeatureGate } from "@/components/feature-gate"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StaffInsuranceCardsPage() {
  return (
    <FeatureGate feature="staff.insurance_cards" resource="members">
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Insurance Cards</h1>
        <p className="text-sm text-muted-foreground">Issue and manage member cards.</p>
        <div>
          <Link href="/user/dashboard/card"><Button variant="outline">Preview Card Template</Button></Link>
        </div>
      </div>
    </FeatureGate>
  )
}
