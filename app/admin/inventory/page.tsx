"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, ArrowRight } from "lucide-react"

export default function AdminInventoryOverviewPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center gap-2">
        <Package className="h-6 w-6" />
        <h1 className="text-2xl font-bold">Inventory</h1>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Items</CardTitle>
            <CardDescription>Manage physical resources</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-between items-end">
            <div className="text-sm text-muted-foreground">Track and update items</div>
            <Link href="/admin/inventory/items"><Button variant="secondary" className="gap-2">Open <ArrowRight className="h-4 w-4"/></Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
