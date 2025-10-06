"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { Car, Plus, Trash2 } from "lucide-react"

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

export default function UserMotorPoliciesPage() {
  const [policies, setPolicies] = useState<MotorPolicy[]>([])
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [vehicleYear, setVehicleYear] = useState("")
  const [plateNumber, setPlateNumber] = useState("")
  const [coverage, setCoverage] = useState<MotorPolicy["coverage"]>("Comprehensive")

  useEffect(() => {
    const raw = typeof window !== 'undefined' ? localStorage.getItem('motorPolicies') : null
    if (raw) {
      try { setPolicies(JSON.parse(raw)) } catch {}
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('motorPolicies', JSON.stringify(policies))
    }
  }, [policies])

  function estimatePremium(cov: MotorPolicy["coverage"]) {
    // Simple demo calculation
    const base = 150
    if (cov === "Comprehensive") return base + 120
    if (cov === "Fire & Theft") return base + 60
    return base
  }

  function addPolicy() {
    if (!vehicleMake.trim() || !vehicleModel.trim() || !vehicleYear.trim() || !plateNumber.trim()) return
    const id = crypto.randomUUID()
    const policyNumber = `MTR-${Math.random().toString().slice(2,8).toUpperCase()}`
    const premium = estimatePremium(coverage)
    const p: MotorPolicy = {
      id,
      policyNumber,
      vehicleMake: vehicleMake.trim(),
      vehicleModel: vehicleModel.trim(),
      vehicleYear: vehicleYear.trim(),
      plateNumber: plateNumber.trim().toUpperCase(),
      coverage,
      premium,
    }
    setPolicies(prev => [p, ...prev])
    setVehicleMake("")
    setVehicleModel("")
    setVehicleYear("")
    setPlateNumber("")
    setCoverage("Comprehensive")
  }

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
          <h1 className="text-2xl font-bold">My Motor Insurance</h1>
        </div>
        <div className="flex items-center gap-3">
          <Badge variant="outline">Policies: {policies.length}</Badge>
          <Button asChild className="gap-2"><Link href="/motor/new"><Plus className="h-4 w-4"/> New Policy</Link></Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Create a Motor Policy</CardTitle>
          <CardDescription>Enter vehicle details to generate a quote and create a policy</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Vehicle Make" value={vehicleMake} onChange={(e)=>setVehicleMake(e.target.value)} />
            <Input placeholder="Vehicle Model" value={vehicleModel} onChange={(e)=>setVehicleModel(e.target.value)} />
            <Input placeholder="Year" inputMode="numeric" value={vehicleYear} onChange={(e)=>setVehicleYear(e.target.value)} />
            <Input placeholder="Plate Number" value={plateNumber} onChange={(e)=>setPlateNumber(e.target.value)} />
            <div>
              <Select value={coverage} onValueChange={(v: MotorPolicy["coverage"])=>setCoverage(v)}>
                <SelectTrigger><SelectValue placeholder="Coverage Type"/></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="Third-Party">Third-Party Only</SelectItem>
                  <SelectItem value="Fire & Theft">Fire & Theft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">Estimated monthly premium</div>
            <div className="text-lg font-semibold">${estimatePremium(coverage)}</div>
          </div>
          <div className="flex justify-end mt-4">
            <Button onClick={addPolicy} className="gap-2"><Plus className="h-4 w-4"/> Create Policy</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>My Motor Policies</CardTitle>
          <CardDescription>List of your created motor insurance policies</CardDescription>
        </CardHeader>
        <CardContent>
          {policies.length === 0 ? (
            <p className="text-sm text-muted-foreground">No motor policies yet. Create one above.</p>
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
                          <Button asChild variant="outline" size="sm"><Link href={`/motor/${p.id}`}>View</Link></Button>
                          <Button asChild variant="secondary" size="sm"><Link href={`/motor/${p.id}/edit`}>Edit</Link></Button>
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
