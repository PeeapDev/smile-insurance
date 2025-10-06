"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function VerificationPage() {
  const params = useParams<{ type: string; id: string }>()
  const [status, setStatus] = useState<"active" | "inactive" | "unknown">("unknown")
  const [name, setName] = useState<string>("")
  const [avatarUrl, setAvatarUrl] = useState<string>("")

  const type = params?.type ?? "user"
  const id = params?.id ?? ""

  useEffect(() => {
    // TODO: Replace with Supabase lookups for real entities (users, staff, policies)
    // For now, demo rules: if id is numeric and even -> active, else inactive
    const num = Number(id)
    if (!Number.isNaN(num)) setStatus(num % 2 === 0 ? "active" : "inactive")
    else setStatus("active")
    setName(type === "staff" ? `Staff #${id}` : type === "policy" ? `Policy #${id}` : `User #${id}`)
    setAvatarUrl("/placeholder-user.jpg")
  }, [id, type])

  const color = useMemo(() => (status === "active" ? "bg-green-600" : status === "inactive" ? "bg-red-600" : "bg-gray-500"), [status])

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Verification Result</CardTitle>
          <CardDescription>Type: {String(type)} • ID: {String(id)}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 relative rounded-full overflow-hidden border">
              {/* Placeholder image */}
              <Image src={avatarUrl || "/placeholder-user.jpg"} alt="avatar" fill className="object-cover" />
            </div>
            <div className="space-y-1">
              <div className="text-lg font-semibold">{name}</div>
              <Badge className={`${color} text-white`}>{status.toUpperCase()}</Badge>
            </div>
          </div>
          <div className="text-sm text-muted-foreground">
            {type === "policy" ? (
              <>
                This policy is {status === "active" ? "currently active" : "not active"}. Please contact support for more details.
              </>
            ) : (
              <>Account is {status === "active" ? "in good standing" : "not in good standing"}. If you believe this is an error, contact support.</>
            )}
          </div>
          <div>
            <Button variant="outline" onClick={() => window.history.back()}>Back</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
