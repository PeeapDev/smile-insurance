"use client"

import { FeatureGate } from "@/components/feature-gate"
import MotorSignupPage from "@/app/motor/page"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function StaffMotorPage() {
  return (
    <FeatureGate feature="staff.motor" resource="otc">
      <div className="p-0">
        {/* Minimal header to indicate staff context */}
        <div className="px-6 pt-6">
          <Card className="border-0 shadow-none">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Motor Insurance</CardTitle>
              <CardDescription>Signup form embedded in staff workspace</CardDescription>
            </CardHeader>
          </Card>
        </div>
        {/* Embed the public motor signup UI so it lives under /staff/motor */}
        <MotorSignupPage />
      </div>
    </FeatureGate>
  )
}
