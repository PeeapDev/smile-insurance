"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Plus, Trash2 } from "lucide-react"
import { toast } from "@/hooks/use-toast"

 type MotorPolicy = {
  id: string
  policyNumber: string
  vehicleMake: string
  vehicleModel: string
  vehicleYear: string
  plateNumber: string
  coverage: "Comprehensive" | "Third-Party" | "Fire & Theft"
  premium: number
 }

export default function CompanyMotorPoliciesPage() {
  const router = useRouter()
  const params = useParams() as { company?: string }
  const company = params?.company || "company"

  const storageKey = useMemo(() => `motorPolicies:${company}`, [company])
  const [policies, setPolicies] = useState<MotorPolicy[]>([])

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem(storageKey) : null
    if (raw) {
      try { setPolicies(JSON.parse(raw)) } catch {}
    }
  }, [storageKey])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(policies))
    }
  }, [policies, storageKey])

  function removePolicy(id: string) {
    try {
      setPolicies(prev => prev.filter(p => p.id !== id))
      toast({ title: "Policy removed", description: `Policy ${id.slice(0,6)}… deleted.` })
    } catch {
      toast({ title: "Delete failed", description: "Could not remove policy.", variant: "destructive" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          <h1 className="text-2xl font-bold capitalize">{company} Motor Insurance</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">Policies: {policies.length}</Badge>
          <Button className="gap-2" onClick={() => router.push(`/${company}/motor/new`)}>
            <Plus className="h-4 w-4"/> New Policy
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Company Motor Policies</CardTitle>
          <CardDescription>List of motor insurance policies for this company</CardDescription>
        </CardHeader>
        <CardContent>
          {policies.length === 0 ? (
            <p className="text-sm text-muted-foreground">No motor policies yet. Click New Policy to create one.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-muted-foreground">
                    <th className="text-left py-2 pr-4">Policy #</th>
                    <th className="text-left py-2 pr-4">Vehicle</th>
                    <th className="text-left py-2 pr-4">Plate</th>
                    <th className="text-left py-2 pr-4">Coverage</th>
                    <th className="text-left py-2 pr-4">Monthly</th>
                    <th className="text-right py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {policies.map(p => (
                    <tr key={p.id} className="border-b last:border-0">
                      <td className="py-2 pr-4 font-medium">{p.policyNumber}</td>
                      <td className="py-2 pr-4">{p.vehicleYear} {p.vehicleMake} {p.vehicleModel}</td>
                      <td className="py-2 pr-4">{p.plateNumber}</td>
                      <td className="py-2 pr-4">{p.coverage}</td>
                      <td className="py-2 pr-4">${p.premium}</td>
                      <td className="py-2 text-right">
                        <div className="flex justify-end gap-2">
                          <Button asChild variant="outline" size="sm"><Link href={`/${company}/motor/${p.id}`}>View</Link></Button>
                          <Button asChild variant="secondary" size="sm"><Link href={`/${company}/motor/${p.id}/edit`}>Edit</Link></Button>
                          <Button variant="destructive" size="icon" onClick={()=>removePolicy(p.id)} aria-label="Delete">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
