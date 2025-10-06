"use client"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PermissionGuard } from "@/components/permission-guard"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import Link from "next/link"

export default function AdminInvoicesPage() {
  const [invoices] = useState<Array<{ id: string; customer: string; total: number; status: string; date: string }>>([
    { id: "INV-1001", customer: "TechCorp LLC", total: 1200, status: "sent", date: "2025-09-01" },
  ])
  return (
    <PermissionGuard resource="invoices" action="read">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Invoices</h1>
          <Button asChild>
            <Link href="/admin/invoices/new">New Invoice / Quote</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Invoices</CardTitle>
            <CardDescription>Basic list (demo data)</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>{inv.id}</TableCell>
                    <TableCell>{inv.customer}</TableCell>
                    <TableCell>{inv.date}</TableCell>
                    <TableCell className="capitalize">{inv.status}</TableCell>
                    <TableCell className="text-right">${inv.total.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/admin/invoices/${inv.id}`}>Open</Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PermissionGuard>
  )
}
