"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export function RoleGuard({ allowed }: { allowed: ("admin" | "staff" | "user" | "company")[] }) {
  const router = useRouter()
  const [ok, setOk] = useState(false)

  useEffect(() => {
    try {
      const raw = localStorage.getItem("demo_role")
      const role = (raw as any) || "user"
      if (!allowed.includes(role)) {
        router.replace("/login")
      } else {
        setOk(true)
      }
    } catch {
      router.replace("/login")
    }
  }, [allowed, router])

  if (!ok) return null
  return null
}
