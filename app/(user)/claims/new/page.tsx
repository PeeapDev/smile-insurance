"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { FileText, Save, Send } from "lucide-react"
import type { Claim, ClaimStatus, ClaimType } from "../page"

const STORAGE_KEY = "motorClaims"

const schema = z.object({
  type: z.enum(["collision", "comprehensive", "third_party", "uninsured", "pip"], {
    required_error: "Select a claim type",
  }),
  incidentDate: z.string().min(1, "Incident date is required"),
  incidentLocation: z.string().min(3, "Location is required"),
  description: z.string().min(10, "Provide a short description"),
  plateNumber: z.string().optional(),
})

export default function NewClaimPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<{ name: string; size: number; type: string }[]>([])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "collision",
      incidentDate: "",
      incidentLocation: "",
      description: "",
      plateNumber: "",
    },
  })

  function persist(claim: Claim) {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    let arr: Claim[] = []
    if (raw) {
      try {
        arr = JSON.parse(raw)
      } catch {}
    }
    const existingIdx = arr.findIndex((x) => x.id === claim.id)
    if (existingIdx >= 0) arr[existingIdx] = claim
    else arr.unshift(claim)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(arr))
  }

  const onSubmit = (values: z.infer<typeof schema>, status: ClaimStatus) => {
    const id = crypto.randomUUID()
    const now = new Date().toISOString()
    const claim: Claim = {
      id,
      type: values.type as ClaimType,
      status,
      incidentDate: values.incidentDate,
      incidentLocation: values.incidentLocation,
      description: values.description,
      plateNumber: values.plateNumber,
      createdAt: now,
      documents,
    }
    persist(claim)
    if (status === "submitted") router.push(`/claims/${id}`)
    else router.push(`/claims`)
  }

  function onFilesSelected(files: FileList | null) {
    if (!files) return
    const list: { name: string; size: number; type: string }[] = []
    Array.from(files).forEach((f) => list.push({ name: f.name, size: f.size, type: f.type }))
    setDocuments((prev) => [...list, ...prev])
  }

  useEffect(() => {
    // optional: load draft autosave later
  }, [])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-bold">New Motor Insurance Claim</h1>
        </div>
      </div>

      <form
        onSubmit={handleSubmit((v) => onSubmit(v, "submitted"))}
        className="grid gap-6 md:grid-cols-2"
      >
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
            <CardDescription>Provide the basic details of the incident</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">Claim Type</label>
              <Select defaultValue="collision" onValueChange={(v) => reset((old) => ({ ...old, type: v as any }))}>
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="collision">Collision</SelectItem>
                  <SelectItem value="comprehensive">Comprehensive</SelectItem>
                  <SelectItem value="third_party">Third-Party Liability</SelectItem>
                  <SelectItem value="uninsured">Uninsured/Underinsured</SelectItem>
                  <SelectItem value="pip">Personal Injury Protection (PIP)</SelectItem>
                </SelectContent>
              </Select>
              {errors.type && <p className="text-xs text-red-600 mt-1">{errors.type.message}</p>}
            </div>
            <div>
              <label className="text-sm font-medium">Incident Date</label>
              <Input type="date" {...register("incidentDate")} />
              {errors.incidentDate && (
                <p className="text-xs text-red-600 mt-1">{errors.incidentDate.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Incident Location</label>
              <Input placeholder="Address or description of location" {...register("incidentLocation")} />
              {errors.incidentLocation && (
                <p className="text-xs text-red-600 mt-1">{errors.incidentLocation.message}</p>
              )}
            </div>
            <div className="md:col-span-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea rows={5} placeholder="Describe what happened" {...register("description")} />
              {errors.description && (
                <p className="text-xs text-red-600 mt-1">{errors.description.message}</p>
              )}
            </div>
            <div>
              <label className="text-sm font-medium">Vehicle Plate (optional)</label>
              <Input placeholder="ABC-1234" {...register("plateNumber")} />
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Upload photos, police report, medical notes, or estimates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input type="file" multiple onChange={(e) => onFilesSelected(e.target.files)} />
            {documents.length > 0 && (
              <ul className="text-sm list-disc pl-5 space-y-1">
                {documents.map((d, i) => (
                  <li key={i}>
                    {d.name} ({Math.round(d.size / 1024)} KB)
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        <div className="md:col-span-2 flex items-center justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            className="gap-2"
            onClick={handleSubmit((v) => onSubmit(v, "draft"))}
            disabled={isSubmitting}
          >
            <Save className="h-4 w-4" /> Save Draft
          </Button>
          <Button type="submit" className="gap-2" disabled={isSubmitting}>
            <Send className="h-4 w-4" /> Submit Claim
          </Button>
        </div>
      </form>
    </div>
  )
}
