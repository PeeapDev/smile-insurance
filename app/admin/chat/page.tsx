"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChatConsole } from "@/components/chat-console"

export default function AdminChatPage() {
  const me = (typeof window !== "undefined" ? localStorage.getItem("current_user_email") : null) || "admin@example.com"
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Chat</h1>
      <Card>
        <CardHeader>
          <CardTitle>Direct Messages</CardTitle>
        </CardHeader>
        <CardContent>
          <ChatConsole currentUserEmail={me} role="admin" />
        </CardContent>
      </Card>
    </div>
  )
}
