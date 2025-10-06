"use client"

import { FeatureGate } from "@/components/feature-gate"
import AdminMedicalPage from "@/app/admin/medical/page"
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function StaffMedicalPage() {
  return (
    <FeatureGate feature="staff.medical">
      <div className="p-0">
        <div className="px-6 pt-6">
          <Card className="border-0 shadow-none">
            <CardHeader className="p-0 pb-4">
              <CardTitle>Medical</CardTitle>
              <CardDescription>Embedded medical workspace in staff area</CardDescription>
            </CardHeader>
          </Card>
        </div>
        <AdminMedicalPage />
      </div>
    </FeatureGate>
  )
}
