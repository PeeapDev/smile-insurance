import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { LayoutGrid } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AdminAttendanceQuick } from "@/components/admin-attendance-quick"
import { ChatWidget } from "@/components/chat-widget"
import { ClientRoleGate } from "@/components/client-role-gate"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar userRole="admin" />
      <SidebarInset>
        <ClientRoleGate allowed={["admin"]}>
        {/* Sticky header with menu + quick attendance (always visible) */}
        <div className="sticky top-0 z-40 flex h-12 items-center gap-2 border-b bg-background px-2 relative">
          <div className="flex items-center gap-2">
            <SidebarTrigger variant="outline" aria-label="Open menu">
              <LayoutGrid className="h-5 w-5" />
            </SidebarTrigger>
            <div className="font-semibold">Admin Dashboard</div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <AdminAttendanceQuick />
          </div>
        </div>
        <div className="p-2 sm:p-3 md:p-4">{children}</div>
        {/* Global chat widget for admin */}
        <ChatWidget />
        </ClientRoleGate>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
