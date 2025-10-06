"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { FileText, ArrowLeft } from "lucide-react"
import type { Claim } from "../page"

const STORAGE_KEY = "motorClaims"

export default function ClaimDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [claim, setClaim] = useState<Claim | null>(null)

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (!raw) return
    try {
      const arr: Claim[] = JSON.parse(raw)
      const found = arr.find((c) => c.id === params.id) || null
      setClaim(found)
    } catch {}
  }, [params.id])

  if (!claim) {
    return (
      <div className="space-y-4">
        <Button variant="ghost" className="gap-2" asChild>
          <Link href="/claims">
            <ArrowLeft className="h-4 w-4" /> Back to Claims
          </Link>
        </Button>
        <Card>
          <CardHeader>
            <CardTitle>Claim not found</CardTitle>
            <CardDescription>We couldn't find that claim. It may have been removed.</CardDescription>
          </CardHeader>
        </Card>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Claim {claim.id}</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="capitalize">{claim.status.replace("_", " ")}</Badge>
          <Button variant="outline" asChild>
            <Link href="/claims">Back</Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Incident Details</CardTitle>
            <CardDescription>Submitted on {new Date(claim.createdAt).toLocaleString()}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="font-medium capitalize">{claim.type.replace("_", " ")}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Incident Date</div>
                <div className="font-medium">{claim.incidentDate}</div>
              </div>
              <div className="col-span-2">
                <div className="text-sm text-muted-foreground">Location</div>
                <div className="font-medium break-words">{claim.incidentLocation}</div>
              </div>
              {claim.plateNumber && (
                <div>
                  <div className="text-sm text-muted-foreground">Plate</div>
                  <div className="font-medium">{claim.plateNumber}</div>
                </div>
              )}
              {claim.description && (
                <div className="col-span-2">
                  <div className="text-sm text-muted-foreground">Description</div>
                  <div className="font-medium whitespace-pre-wrap">{claim.description}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Documents</CardTitle>
            <CardDescription>Files attached to this claim</CardDescription>
          </CardHeader>
          <CardContent>
            {claim.documents && claim.documents.length > 0 ? (
              <ul className="text-sm space-y-2">
                {claim.documents.map((d, i) => (
                  <li key={i} className="flex items-center justify-between">
                    <span className="truncate max-w-[220px]">{d.name}</span>
                    <span className="text-muted-foreground">{Math.round(d.size / 1024)} KB</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted-foreground">No documents uploaded</p>
            )}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Timeline</CardTitle>
          <CardDescription>Key events for this claim (demo)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="text-sm">Claim {claim.status === "submitted" ? "submitted" : "created"} on {new Date(claim.createdAt).toLocaleString()}</div>
          {/* Additional events will appear here when backend is connected */}
        </CardContent>
      </Card>
    </div>
  )
}
