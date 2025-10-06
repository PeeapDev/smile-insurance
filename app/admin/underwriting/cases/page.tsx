"use client"

import { PermissionGuard } from "@/components/permission-guard"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function UWAdminCasesPage() {
  const rows = [
    { id: "UW-1001", applicant: "John Doe", product: "Motor", status: "intake", sla: "6h" },
    { id: "UW-1002", applicant: "TechCorp LLC", product: "Travel", status: "awaiting docs", sla: "12h" },
  ]
  return (
    <PermissionGuard resource="underwriting" action="read">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Underwriting Cases</h1>
          <div className="flex gap-2">
            <Input placeholder="Search applicant or case id" className="w-64" />
            <Button variant="outline">Filter</Button>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Cases</CardTitle>
            <CardDescription>Demo list with minimal fields</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>SLA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((r) => (
                  <TableRow key={r.id}>
                    <TableCell>{r.id}</TableCell>
                    <TableCell>{r.applicant}</TableCell>
                    <TableCell>{r.product}</TableCell>
                    <TableCell className="capitalize">{r.status}</TableCell>
                    <TableCell>{r.sla}</TableCell>
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
