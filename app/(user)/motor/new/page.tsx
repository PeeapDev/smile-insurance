"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Car } from "lucide-react"
import { toast } from "@/hooks/use-toast"

export default function NewMotorPolicyPage() {
  const router = useRouter()
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [vehicleYear, setVehicleYear] = useState("")
  const [plateNumber, setPlateNumber] = useState("")
  const [coverage, setCoverage] = useState<"Comprehensive" | "Third-Party" | "Fire & Theft">("Comprehensive")

  function estimatePremium(cov: "Comprehensive" | "Third-Party" | "Fire & Theft") {
    const base = 150
    if (cov === "Comprehensive") return base + 120
    if (cov === "Fire & Theft") return base + 60
    return base
  }

  const isValidYear = (y: string) => /^\d{4}$/.test(y) && Number(y) >= 1980 && Number(y) <= new Date().getFullYear() + 1
  const isValidPlate = (p: string) => /^[A-Za-z0-9\- ]{3,15}$/.test(p)

  function createPolicy() {
    if (!vehicleMake.trim() || !vehicleModel.trim() || !vehicleYear.trim() || !plateNumber.trim()) {
      toast({ title: "Missing fields", description: "Please fill all vehicle details.", variant: "destructive" })
      return
    }
    if (!isValidYear(vehicleYear)) {
      toast({ title: "Invalid year", description: "Enter a 4-digit year between 1980 and next year.", variant: "destructive" })
      return
    }
    if (!isValidPlate(plateNumber)) {
      toast({ title: "Invalid plate", description: "Plate should be 3-15 chars (letters/numbers/-/space).", variant: "destructive" })
      return
    }
    const id = crypto.randomUUID()
    const policyNumber = `MTR-${Math.random().toString().slice(2,8).toUpperCase()}`
    const premium = estimatePremium(coverage)

    const p = {
      id,
      policyNumber,
      vehicleMake: vehicleMake.trim(),
      vehicleModel: vehicleModel.trim(),
      vehicleYear: vehicleYear.trim(),
      plateNumber: plateNumber.trim().toUpperCase(),
      coverage,
      premium,
    }

    try {
      const raw = localStorage.getItem("motorPolicies")
      const list = raw ? JSON.parse(raw) : []
      list.unshift(p)
      localStorage.setItem("motorPolicies", JSON.stringify(list))
    } catch {
      toast({ title: "Save failed", description: "Could not save policy locally.", variant: "destructive" })
      return
    }

    toast({ title: "Policy created", description: `${vehicleYear} ${vehicleMake} ${vehicleModel} – ${coverage}` })
    router.push("/motor")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Car className="h-6 w-6" />
        <h1 className="text-2xl font-bold">New Motor Policy (Individual)</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Enter Vehicle Details</CardTitle>
          <CardDescription>We’ll generate a quote and create your policy.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input placeholder="Vehicle Make" value={vehicleMake} onChange={(e)=>setVehicleMake(e.target.value)} />
            <Input placeholder="Vehicle Model" value={vehicleModel} onChange={(e)=>setVehicleModel(e.target.value)} />
            <Input placeholder="Year" inputMode="numeric" value={vehicleYear} onChange={(e)=>setVehicleYear(e.target.value)} />
            <Input placeholder="Plate Number" value={plateNumber} onChange={(e)=>setPlateNumber(e.target.value)} />
            <div>
              <Select value={coverage} onValueChange={(v: any)=>setCoverage(v)}>
                <SelectTrigger><SelectValue placeholder="Coverage Type" /></SelectTrigger>
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
            <Button onClick={createPolicy} className="gap-2"><Plus className="h-4 w-4"/> Create Policy</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
