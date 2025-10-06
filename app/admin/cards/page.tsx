"use client"

import Link from "next/link"
import { useMemo, useState } from "react"
import { CreditCard, Plus, Search, ShieldCheck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

export default function AdminCardsPage() {
  // Demo dataset; replace with real data fetch later
  const cards = [
    {
      id: "CARD-1001",
      member: "Sarah Johnson",
      plan: "Premium",
      status: "Active",
      issued: "2024-11-01",
      expires: "2026-11-01",
    },
    {
      id: "CARD-1002",
      member: "Michael Chen",
      plan: "Standard",
      status: "Active",
      issued: "2024-09-12",
      expires: "2026-09-12",
    },
    {
      id: "CARD-1003",
      member: "Emily Rodriguez",
      plan: "Standard",
      status: "Suspended",
      issued: "2023-05-04",
      expires: "2025-05-04",
    },
  ]

  const [query, setQuery] = useState("")
  const [tab, setTab] = useState("all")

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim()
    const byQuery = (c: typeof cards[number]) =>
      !q ||
      c.id.toLowerCase().includes(q) ||
      c.member.toLowerCase().includes(q) ||
      c.plan.toLowerCase().includes(q)

    const now = new Date()
    const in60 = new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)

    return cards.filter((c) => {
      if (!byQuery(c)) return false
      if (tab === "active") return c.status === "Active"
      if (tab === "suspended") return c.status !== "Active"
      if (tab === "expiring") {
        const exp = new Date(c.expires)
        return exp <= in60
      }
      return true
    })
  }, [cards, query, tab])

  const DirectoryTable = () => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Member</TableHead>
          <TableHead>Plan</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Issued</TableHead>
          <TableHead>Expires</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {filtered.map((c) => (
          <TableRow key={c.id}>
            <TableCell className="font-medium">{c.id}</TableCell>
            <TableCell>{c.member}</TableCell>
            <TableCell>{c.plan}</TableCell>
            <TableCell>
              {c.status === "Active" ? (
                <Badge variant="outline">Active</Badge>
              ) : (
                <Badge variant="destructive">Suspended</Badge>
              )}
            </TableCell>
            <TableCell className="text-muted-foreground">{c.issued}</TableCell>
            <TableCell className="text-muted-foreground">{c.expires}</TableCell>
            <TableCell className="text-right">
              <Link href={`/admin/cards/${c.id}`}>
                <Button variant="outline" size="sm">Details</Button>
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CreditCard className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Insurance Cards</h1>
        </div>
        <div className="flex gap-2">
          <Input
            placeholder="Search cards…"
            className="w-64"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <Button variant="outline" size="icon" aria-label="Search">
            <Search className="h-4 w-4" />
          </Button>
          <Link href="/admin/cards/create">
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Create Card
            </Button>
          </Link>
        </div>
      </div>

      {/* Overview cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Cards</CardDescription>
            <CardTitle className="text-3xl">12,845</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">+210 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active</CardDescription>
            <CardTitle className="text-3xl">11,963</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">93.1% of total</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Suspended</CardDescription>
            <CardTitle className="text-3xl">182</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">ID verification pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Expiring Soon</CardDescription>
            <CardTitle className="text-3xl">76</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Within 60 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Directory */}
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <div>
              <CardTitle>Cards Directory</CardTitle>
              <CardDescription>Manage member insurance cards</CardDescription>
            </div>
            <Badge variant="secondary" className="gap-1">
              <ShieldCheck className="h-3 w-3" /> Secure
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="suspended">Suspended</TabsTrigger>
              <TabsTrigger value="expiring">Expiring</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <DirectoryTable />
            </TabsContent>
            <TabsContent value="active">
              <DirectoryTable />
            </TabsContent>
            <TabsContent value="suspended">
              <DirectoryTable />
            </TabsContent>
            <TabsContent value="expiring">
              <DirectoryTable />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
