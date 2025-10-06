"use client"

import { FeatureGate } from "@/components/feature-gate"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StaffUnderwritingPage() {
  return (
    <FeatureGate feature="staff.underwriting">
      <div className="p-6 space-y-4">
        <h1 className="text-2xl font-bold">Underwriting</h1>
        <div className="flex gap-2">
          <Link href="/admin/underwriting/rules"><Button variant="outline">Rules</Button></Link>
          <Link href="/admin/underwriting/dashboard"><Button variant="outline">Dashboard</Button></Link>
        </div>
      </div>
    </FeatureGate>
  )
}
