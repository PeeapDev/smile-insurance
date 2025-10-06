"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Building2 } from "lucide-react"

export default function CompanySettingsPage() {
  const [departments, setDepartments] = useState<string[]>([
    "Engineering",
    "Marketing",
    "HR",
    "Finance",
  ])
  const [q, setQ] = useState("")
  const [newDept, setNewDept] = useState("")

  const filtered = useMemo(
    () => departments.filter((d) => d.toLowerCase().includes(q.toLowerCase())),
    [departments, q]
  )

  const addDept = () => {
    const name = newDept.trim()
    if (!name) return
    if (departments.some((d) => d.toLowerCase() === name.toLowerCase())) return
    setDepartments((prev) => [...prev, name])
    setNewDept("")
  }

  const removeDept = (name: string) => {
    setDepartments((prev) => prev.filter((d) => d !== name))
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex flex-col gap-1">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">Manage company configuration</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Building2 className="h-5 w-5"/> Departments</CardTitle>
          <CardDescription>Add, search and remove departments</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <Input placeholder="Search departments" value={q} onChange={(e)=>setQ(e.target.value)} />
            <div className="md:col-span-2 flex gap-2">
              <Input placeholder="New department name" value={newDept} onChange={(e)=>setNewDept(e.target.value)} />
              <Button onClick={addDept} className="gap-2"><Plus className="h-4 w-4"/> Add</Button>
            </div>
          </div>
          <div className="rounded-md border overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 px-3">Department</th>
                  <th className="text-left py-2 px-3">Status</th>
                  <th className="text-right py-2 px-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((d) => (
                  <tr key={d} className="border-b last:border-0">
                    <td className="py-3 px-3 font-medium">{d}</td>
                    <td className="py-3 px-3"><Badge variant="secondary">Active</Badge></td>
                    <td className="py-3 px-3 text-right">
                      <Button variant="outline" size="sm" className="gap-2" onClick={()=>removeDept(d)}>
                        <Trash2 className="h-4 w-4"/> Remove
                      </Button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td className="py-6 px-3 text-center text-muted-foreground" colSpan={3}>No departments match your search.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
