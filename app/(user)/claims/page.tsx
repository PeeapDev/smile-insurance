"use client"

import Link from "next/link"
import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Plus, Info } from "lucide-react"

export type ClaimType =
  | "collision"
  | "comprehensive"
  | "third_party"
  | "uninsured"
  | "pip"

export type ClaimStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "info_requested"
  | "approved"
  | "denied"
  | "settled"
  | "closed"

export type Claim = {
  id: string
  type: ClaimType
  status: ClaimStatus
  incidentDate: string
  incidentLocation: string
  description?: string
  plateNumber?: string
  createdAt: string
  documents?: { name: string; size: number; type: string }[]
}

const STORAGE_KEY = "motorClaims"

export default function ClaimsListPage() {
  const router = useRouter()
  const [claims, setClaims] = useState<Claim[]>([])

  useEffect(() => {
    const raw = typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null
    if (raw) {
      try {
        setClaims(JSON.parse(raw))
      } catch {
        // ignore
      }
    }
  }, [])

  const counts = useMemo(() => {
    const map: Record<ClaimStatus, number> = {
      draft: 0,
      submitted: 0,
      under_review: 0,
      info_requested: 0,
      approved: 0,
      denied: 0,
      settled: 0,
      closed: 0,
    }
    claims.forEach((c) => (map[c.status] = (map[c.status] ?? 0) + 1))
    return map
  }, [claims])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FileText className="h-6 w-6" />
          <h1 className="text-2xl font-bold">My Motor Insurance Claims</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline" className="gap-2">
            <Link href="/claims/guide">
              <Info className="h-4 w-4" /> Guide
            </Link>
          </Button>
          <Button asChild className="gap-2">
            <Link href="/claims/new">
              <Plus className="h-4 w-4" /> New Claim
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Claims</CardTitle>
            <CardDescription>All your submitted and draft claims</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-semibold">{claims.length}</div>
          </CardContent>
        </Card>
        {(["submitted", "under_review", "approved", "denied"] as ClaimStatus[]).map((s) => (
          <Card key={s}>
            <CardHeader>
              <CardTitle className="capitalize">{s.replace("_", " ")}</CardTitle>
              <CardDescription>Count</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold">{counts[s] ?? 0}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Claims</CardTitle>
          <CardDescription>Recent claims</CardDescription>
        </CardHeader>
        <CardContent>
          {claims.length === 0 ? (
            <p className="text-sm text-muted-foreground">No claims yet. Click New Claim to start.</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Claim ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Incident Date</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {claims.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">{c.id}</TableCell>
                      <TableCell className="capitalize">{c.type.replace("_", " ")}</TableCell>
                      <TableCell>{c.incidentDate}</TableCell>
                      <TableCell className="truncate max-w-[220px]">{c.incidentLocation}</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="capitalize">
                          {c.status.replace("_", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button size="sm" variant="outline" onClick={() => router.push(`/claims/${c.id}`)}>
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
