import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function UserGroupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar userRole="user" />
      <SidebarInset>
        {/* Mobile header with hamburger */}
        <div className="sticky top-0 z-40 flex h-12 items-center gap-2 border-b bg-background px-2 lg:hidden">
          <SidebarTrigger />
          <div className="font-semibold">Dashboard</div>
        </div>
        <div className="p-3 sm:p-4 md:p-6">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
