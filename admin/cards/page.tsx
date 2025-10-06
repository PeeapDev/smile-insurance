import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreHorizontal, PlusCircle, Search } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"

export default function AdminCardsPage() {
  const cards = [
    {
      id: "1",
      cardNumber: "SIMC1234567890",
      memberName: "John Doe",
      policyNumber: "POL987654321",
      planType: "Standard PPO",
      effectiveDate: "2024-01-01",
      expirationDate: "2025-12-31",
      status: "Active",
    },
    {
      id: "2",
      cardNumber: "SIMC0987654321",
      memberName: "Jane Smith",
      policyNumber: "POL123456789",
      planType: "Basic HMO",
      effectiveDate: "2023-06-15",
      expirationDate: "2024-06-14",
      status: "Expired",
    },
    {
      id: "3",
      cardNumber: "SIMC1122334455",
      memberName: "Robert Johnson",
      policyNumber: "POL555666777",
      planType: "Premium POS",
      effectiveDate: "2024-03-01",
      expirationDate: "2026-02-28",
      status: "Active",
    },
    {
      id: "4",
      cardNumber: "SIMC9988776655",
      memberName: "Emily White",
      policyNumber: "POL112233445",
      planType: "Standard PPO",
      effectiveDate: "2024-01-01",
      expirationDate: "2025-12-31",
      status: "Active",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Insurance Cards Management</h1>
          <p className="text-gray-600">Manage all active and expired insurance cards.</p>
        </div>
        <Button asChild>
          <Link href="/admin/cards/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Card
          </Link>
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>All Insurance Cards</CardTitle>
          <CardDescription>A list of all insurance cards in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search cards by member name or card number..."
                className="w-full rounded-lg bg-background pl-8 md:w-[300px] lg:w-[450px]"
              />
            </div>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Card Number</TableHead>
                <TableHead>Member Name</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Plan Type</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Expiration Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {cards.map((card) => (
                <TableRow key={card.id}>
                  <TableCell className="font-medium">{card.cardNumber}</TableCell>
                  <TableCell>{card.memberName}</TableCell>
                  <TableCell>{card.policyNumber}</TableCell>
                  <TableCell>{card.planType}</TableCell>
                  <TableCell>{card.effectiveDate}</TableCell>
                  <TableCell>{card.expirationDate}</TableCell>
                  <TableCell>
                    <Badge variant={card.status === "Active" ? "default" : "outline"}>{card.status}</Badge>
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
                        <DropdownMenuItem>Edit Card</DropdownMenuItem>
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
