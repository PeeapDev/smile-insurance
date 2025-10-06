"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Briefcase, UserPlus } from "lucide-react"

export default function AdminHRStaffPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Briefcase className="h-6 w-6" />
          <h1 className="text-2xl font-bold">Staff</h1>
        </div>
        <Button asChild className="gap-2"><Link href="/admin/hr/staff/create"><UserPlus className="h-4 w-4"/> Add Staff</Link></Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Directory</CardTitle>
          <CardDescription>Demo-only list</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Role</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Link href="/admin/hr/staff/sarah-johnson" className="underline-offset-2 hover:underline">
                    Sarah Johnson
                  </Link>
                </TableCell>
                <TableCell>TechCorp Inc.</TableCell>
                <TableCell>HR Manager</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Link href="/admin/hr/staff/michael-chen" className="underline-offset-2 hover:underline">
                    Michael Chen
                  </Link>
                </TableCell>
                <TableCell>Global Manufacturing</TableCell>
                <TableCell>Supervisor</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
