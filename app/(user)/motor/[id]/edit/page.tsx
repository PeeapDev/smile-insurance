"use client"

import { useEffect, useMemo, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Car, Save, ArrowLeft } from "lucide-react"
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

export default function EditMotorPolicyPage() {
  const params = useParams() as { id?: string }
  const router = useRouter()
  const id = params?.id || ""

  const [loaded, setLoaded] = useState(false)
  const [vehicleMake, setVehicleMake] = useState("")
  const [vehicleModel, setVehicleModel] = useState("")
  const [vehicleYear, setVehicleYear] = useState("")
  const [plateNumber, setPlateNumber] = useState("")
  const [coverage, setCoverage] = useState<"Comprehensive" | "Third-Party" | "Fire & Theft">("Comprehensive")
  const [policyNumber, setPolicyNumber] = useState("")

  const estimatePremium = (cov: "Comprehensive" | "Third-Party" | "Fire & Theft") => {
    const base = 150
    if (cov === "Comprehensive") return base + 120
    if (cov === "Fire & Theft") return base + 60
    return base
  }

  const isValidYear = (y: string) => /^\d{4}$/.test(y) && Number(y) >= 1980 && Number(y) <= new Date().getFullYear() + 1
  const isValidPlate = (p: string) => /^[A-Za-z0-9\- ]{3,15}$/.test(p)

  const load = useMemo(() => () => {
    try {
      const raw = localStorage.getItem("motorPolicies")
      const list: MotorPolicy[] = raw ? JSON.parse(raw) : []
      const found = list.find(p => p.id === id)
      if (!found) {
        toast({ title: "Not found", description: "Policy does not exist.", variant: "destructive" })
        router.push("/motor")
        return
      }
      setVehicleMake(found.vehicleMake)
      setVehicleModel(found.vehicleModel)
      setVehicleYear(found.vehicleYear)
      setPlateNumber(found.plateNumber)
      setCoverage(found.coverage)
      setPolicyNumber(found.policyNumber)
      setLoaded(true)
    } catch {
      toast({ title: "Error", description: "Could not load policy.", variant: "destructive" })
      router.push("/motor")
    }
  }, [id, router])

  useEffect(() => { if (id) load() }, [id, load])

  function save() {
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

    try {
      const raw = localStorage.getItem("motorPolicies")
      const list: MotorPolicy[] = raw ? JSON.parse(raw) : []
      const premium = estimatePremium(coverage)
      const updated: MotorPolicy = {
        id,
        policyNumber,
        vehicleMake: vehicleMake.trim(),
        vehicleModel: vehicleModel.trim(),
        vehicleYear: vehicleYear.trim(),
        plateNumber: plateNumber.trim().toUpperCase(),
        coverage,
        premium,
      }
      const next = list.map(p => (p.id === id ? updated : p))
      localStorage.setItem("motorPolicies", JSON.stringify(next))
    } catch {
      toast({ title: "Save failed", description: "Could not update policy locally.", variant: "destructive" })
      return
    }

    toast({ title: "Policy updated", description: `${vehicleYear} ${vehicleMake} ${vehicleModel}` })
    router.push(`/motor/${id}`)
  }

  if (!loaded) return null

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Car className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Edit Motor Policy</h1>
        </div>
        <Button variant="outline" onClick={() => router.push(`/motor/${id}`)}><ArrowLeft className="h-4 w-4 mr-2"/>Back</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>{policyNumber}</CardTitle>
          <CardDescription>Update your vehicle details and coverage.</CardDescription>
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
            <Button onClick={save} className="gap-2"><Save className="h-4 w-4"/> Save Changes</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
