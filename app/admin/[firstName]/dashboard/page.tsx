import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminNamedDashboard({
  params,
}: {
  params: { firstName: string }
}) {
  const { firstName } = params
  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-3xl font-bold capitalize">Admin Dashboard - {firstName}</h1>
        <p className="text-muted-foreground">Personalized admin view routed by first name.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              This is a demo page to confirm the personalized admin URL works: /admin/{firstName}/dashboard
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Pending approvals, claims, and reports will appear here.</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shortcuts</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Use the sidebar to navigate to admin features.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
