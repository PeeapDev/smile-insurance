"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageSquare, Search, Send } from "lucide-react"

type Thread = { id: string; subject: string; from: string; unread: boolean; category: "Claims"|"Billing"|"Support"; preview: string; date: string }

const threads: Thread[] = [
  { id: "MSG-01", subject: "Policy renewal", from: "support@smile.com", unread: true, category: "Support", preview: "Your policy is up for renewal...", date: "2025-08-01" },
  { id: "MSG-02", subject: "Invoice INV-1010", from: "billing@smile.com", unread: false, category: "Billing", preview: "Your July invoice...", date: "2025-07-31" },
  { id: "MSG-03", subject: "Claim update CLM-2102", from: "claims@smile.com", unread: false, category: "Claims", preview: "Your claim has been approved...", date: "2025-07-21" },
]

export default function CompanyMessagesPage() {
  const [q, setQ] = useState("")
  const [category, setCategory] = useState("all")
  const filtered = useMemo(() => threads.filter(t => (
    (category === "all" || t.category === category) && `${t.subject} ${t.from} ${t.preview}`.toLowerCase().includes(q.toLowerCase())
  )), [q, category])

  const unread = threads.filter(t=>t.unread).length

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Messages</h2>
          <p className="text-muted-foreground">Inbox and notifications</p>
        </div>
        <Badge className="bg-sky-600 text-white">{unread} unread</Badge>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="relative w-full md:max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input className="pl-9" placeholder="Search messages" value={q} onChange={(e)=>setQ(e.target.value)} />
          </div>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[200px]"><SelectValue placeholder="Category"/></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Billing">Billing</SelectItem>
              <SelectItem value="Claims">Claims</SelectItem>
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Threads */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5"/> Inbox</CardTitle>
          <CardDescription>Recent conversations</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="divide-y rounded-md border">
            {filtered.map(t => (
              <div key={t.id} className="flex items-center gap-4 p-4 hover:bg-muted/50">
                <Avatar className="h-9 w-9"><AvatarFallback>{t.from.charAt(0).toUpperCase()}</AvatarFallback></Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate font-medium">{t.subject}</div>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">{t.date}</div>
                  </div>
                  <div className="truncate text-sm text-muted-foreground">{t.preview}</div>
                </div>
                <div className="flex items-center gap-2">
                  {t.unread && <Badge className="bg-sky-600 text-white">Unread</Badge>}
                  <Badge variant="secondary">{t.category}</Badge>
                  <Button variant="outline" size="sm" className="gap-2"><Send className="h-4 w-4"/> Reply</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
