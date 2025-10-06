"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function ClientRoleGate({ allowed, children }: { allowed: ("admin" | "staff" | "user" | "company")[]; children: React.ReactNode }) {
  const router = useRouter()
  const [ok, setOk] = useState<boolean | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("demo_role")
      const role = (raw as any) || "user"
      if (!allowed.includes(role)) {
        setOk(false)
        router.replace("/login")
      } else {
        setOk(true)
      }
    } catch {
      setOk(false)
      router.replace("/login")
    }
  }, [allowed, router])

  if (ok === null) return null
  if (!ok) return null
  return <>{children}</>
}
