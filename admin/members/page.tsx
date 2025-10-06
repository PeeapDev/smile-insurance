import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function AdminMembersPage() {
  const members = [
    {
      id: "1",
      name: "John Doe",
      email: "john.doe@example.com",
      policyNumber: "POL987654321",
      planType: "Standard PPO",
      status: "Active",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      policyNumber: "POL123456789",
      planType: "Basic HMO",
      status: "Inactive",
    },
    {
      id: "3",
      name: "Robert Johnson",
      email: "robert.j@example.com",
      policyNumber: "POL555666777",
      planType: "Premium POS",
      status: "Active",
    },
    {
      id: "4",
      name: "Emily White",
      email: "emily.w@example.com",
      policyNumber: "POL112233445",
      planType: "Standard PPO",
      status: "Active",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Member Management</h1>
          <p className="text-gray-600">Manage all registered members and their policy details.</p>
        </div>
        <Button asChild>
          <Link href="/admin/members/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add New Member
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Members</CardTitle>
          <CardDescription>A list of all members registered in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search members by name or email..."
                className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[450px]"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.email}</TableCell>
                  <TableCell>{member.policyNumber}</TableCell>
                  <TableCell>{member.planType}</TableCell>
                  <TableCell>
                    <Badge variant={member.status === "Active" ? "default" : "outline"}>{member.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Details</DropdownMenuItem>
                        <DropdownMenuItem>Edit Member</DropdownMenuItem>
                        <DropdownMenuItem>Deactivate</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
