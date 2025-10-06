"use client"

import { FeatureGate } from "@/components/feature-gate"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function StaffCompaniesPage() {
  return (
    <FeatureGate feature="staff.companies" resource="companies">
      <div className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Companies</h1>
          <Link href="/admin/companies/create"><Button>Create Company</Button></Link>
        </div>
        <Link href="/admin/companies"><Button variant="outline">View Companies</Button></Link>
      </div>
    </FeatureGate>
  )
}
