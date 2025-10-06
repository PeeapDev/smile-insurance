import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Car, PlusCircle } from "lucide-react"

export default function AdminMotorPage() {
  const stats = {
    activeMotorPolicies: 1240,
    monthlyPremiums: "$82,450",
    openClaims: 37,
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold flex items-center gap-2"><Car className="h-7 w-7 text-blue-600" /> Motor Insurance</h1>
        <p className="text-gray-600">Admin view for managing motor insurance policies and claims.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Motor Policies</CardTitle>
            <CardDescription>Total currently active</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-600">{stats.activeMotorPolicies}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Monthly Premiums</CardTitle>
            <CardDescription>All motor products</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-600">{stats.monthlyPremiums}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Open Claims</CardTitle>
            <CardDescription>Pending processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-orange-600">{stats.openClaims}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Create and manage motor policies</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/admin/cards/create"><PlusCircle className="mr-2 h-4 w-4" /> Issue Motor Card</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin/claims">View Motor Claims</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
