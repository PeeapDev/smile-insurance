"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatConsole } from "@/components/chat-console"

export default function StaffChatPage() {
  const me = (typeof window !== "undefined" ? localStorage.getItem("current_user_email") : null) || "sarah.johnson@example.com"
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chat</h1>
      <Card>
        <CardHeader>
          <CardTitle>Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ChatConsole currentUserEmail={me} role="staff" />
        </CardContent>
      </Card>
    </div>
  )
}
