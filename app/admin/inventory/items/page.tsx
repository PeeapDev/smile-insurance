"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Package, Plus } from "lucide-react"

export default function AdminInventoryItemsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Package className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Items</h1>
        </div>
        <Button className="gap-2"><Plus className="h-4 w-4"/> Add Item</Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Inventory</CardTitle>
          <CardDescription>Demo-only list</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Qty</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>Card Printer</TableCell>
                <TableCell>Equipment</TableCell>
                <TableCell>3</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Blank Cards</TableCell>
                <TableCell>Supplies</TableCell>
                <TableCell>500</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
