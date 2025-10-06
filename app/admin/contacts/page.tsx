"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Array<{ id: string; name: string; email: string; type: "user" | "organization" }>>([
    { id: "u-1001", name: "Sarah Johnson", email: "sarah@example.com", type: "user" },
    { id: "o-2001", name: "TechCorp LLC", email: "billing@techcorp.com", type: "organization" },
  ])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [type, setType] = useState<"user" | "organization">("user")

  function addContact() {
    if (!name || !email) return
    setContacts((prev) => [{ id: `c-${prev.length + 1}`, name, email, type }, ...prev])
    setName("")
    setEmail("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Contacts</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add Contact</CardTitle>
          <CardDescription>Save recipients for chat and invoices</CardDescription>
        </CardHeader>
        <CardContent className="grid sm:grid-cols-4 gap-2 items-end">
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <select className="h-10 rounded-md border bg-background px-3" value={type} onChange={(e) => setType(e.target.value as any)}>
            <option value="user">User</option>
            <option value="organization">Organization</option>
          </select>
          <Button onClick={addContact}>Add</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Directory</CardTitle>
          <CardDescription>Use contacts when creating invoices or chatting</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Type</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {contacts.map((c) => (
                <TableRow key={c.id}>
                  <TableCell>{c.name}</TableCell>
                  <TableCell>{c.email}</TableCell>
                  <TableCell className="capitalize">{c.type}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
