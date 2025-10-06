import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <Sidebar userRole="company" />
      <SidebarInset>
        {/* Mobile header with hamburger */}
        <div className="sticky top-0 z-40 flex h-12 items-center gap-2 border-b bg-background px-2 lg:hidden">
          <SidebarTrigger />
          <div className="font-semibold">Company</div>
        </div>
        <div className="p-2 sm:p-3 md:p-4">{children}</div>
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
