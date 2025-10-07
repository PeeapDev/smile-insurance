"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb"
import Link from "next/link"

export default function EmployeeDashboard({
  params,
}: {
  params: { company: string; employee: string }
}) {
  const { company, employee } = params

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold capitalize">{employee}'s Dashboard</h1>
          <p className="text-muted-foreground">Company: <span className="uppercase font-medium">{company}</span></p>
        </div>
      </div>

      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${company}`}>{company}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href={`/${company}/${employee}`}>{employee}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Dashboard</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Coverage Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is a demo employee dashboard tied to a company and employee name in the URL.
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dependants</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Manage your family dependants from your profile.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Claims</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Submit and track claims here.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
