import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { Toaster } from "@/components/ui/toaster"
import { LayoutGrid } from "lucide-react"
import { AdminAttendanceQuick } from "@/components/admin-attendance-quick"
import { ChatWidget } from "@/components/chat-widget"
import { StaffOtcQuick } from "@/components/staff-otc-quick"

export default function StaffLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <Sidebar userRole="staff" />
      <SidebarInset>
        <div className="sticky top-0 z-40 flex h-12 items-center gap-2 border-b bg-background px-2 relative">
          <div className="flex items-center gap-2">
            <SidebarTrigger variant="outline" aria-label="Open menu">
              <LayoutGrid className="h-5 w-5" />
            </SidebarTrigger>
            <div className="font-semibold">Staff Portal</div>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
            <AdminAttendanceQuick />
            <StaffOtcQuick />
          </div>
        </div>
        <div className="p-2 sm:p-3 md:p-4">{children}</div>
        <ChatWidget />
      </SidebarInset>
      <Toaster />
    </SidebarProvider>
  )
}
