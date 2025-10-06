"use client"

import { FeatureGate } from "@/components/feature-gate"
import AdminClaimSubmitPage from "@/app/admin/claims/submit/page"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function StaffClaimSubmitPage() {
  return (
    <FeatureGate feature="staff.claims" resource="claims">
      <div className="p-0">
        <div className="px-6 pt-6">
          <Card className="border-0 shadow-none">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Submit Claim</CardTitle>
              <CardDescription>Create a new claim from the staff workspace</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <AdminClaimSubmitPage />
      </div>
    </FeatureGate>
  )
}
