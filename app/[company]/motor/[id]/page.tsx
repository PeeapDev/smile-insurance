"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Car, Pencil, ArrowLeft } from "lucide-react"
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

export default function ViewCompanyMotorPolicyPage() {
  const params = useParams() as { id?: string, company?: string }
  const router = useRouter()
  const id = params?.id || ""
  const company = params?.company || "company"

  const storageKey = useMemo(() => `motorPolicies:${company}`, [company])
  const [policy, setPolicy] = useState<MotorPolicy | null>(null)

  const load = useMemo(() => () => {
    try {
      const raw = localStorage.getItem(storageKey)
      const list: MotorPolicy[] = raw ? JSON.parse(raw) : []
      const found = list.find(p => p.id === id) || null
      setPolicy(found)
      if (!found) toast({ title: "Not found", description: "Policy does not exist.", variant: "destructive" })
    } catch {
      toast({ title: "Error", description: "Could not load policy.", variant: "destructive" })
    }
  }, [id, storageKey])

  useEffect(() => { if (id) load() }, [id, load])

  if (!id) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          <h1 className="text-2xl font-bold capitalize">{company} Motor Policy Details</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline"><Link href={`/${company}/motor`}><ArrowLeft className="h-4 w-4 mr-2"/>Back</Link></Button>
          {policy && (
            <Button asChild><Link href={`/${company}/motor/${policy.id}/edit`}><Pencil className="h-4 w-4 mr-2"/> Edit</Link></Button>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{policy?.policyNumber ?? "Unknown Policy"}</CardTitle>
          <CardDescription>Company motor insurance policy</CardDescription>
        </CardHeader>
        <CardContent>
          {!policy ? (
            <p className="text-sm text-muted-foreground">Loading policy...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-muted-foreground">Vehicle</div>
                <div className="font-medium">{policy.vehicleYear} {policy.vehicleMake} {policy.vehicleModel}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Plate</div>
                <div className="font-medium">{policy.plateNumber}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Coverage</div>
                <div className="font-medium">{policy.coverage}</div>
              </div>
              <div>
                <div className="text-xs text-muted-foreground">Monthly Premium</div>
                <div className="font-medium">${policy.premium}</div>
              </div>
              <div className="col-span-full"><Badge variant="outline">ID: {policy.id}</Badge></div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
