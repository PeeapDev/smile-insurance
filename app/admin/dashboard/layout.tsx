import type React from "react"

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Use the parent `app/admin/layout.tsx` only. This route-level layout is now a no-op.
  return children
}
