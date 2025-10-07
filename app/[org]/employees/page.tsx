"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Users, UserPlus, Search, Filter, Mail, Phone, Building as BuildingIcon, Download, Upload, MoreVertical, Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"

type Employee = {
  id: number
  name: string
  email: string
  phone: string
  department: string
  position: string
  hireDate: string
  status: "Active" | "On Leave" | "Inactive"
  avatar?: string
}

const initialEmployees: Employee[] = [
  { id: 1, name: "Sarah Johnson", email: "sarah.johnson@techcorp.com", phone: "(555) 123-4567", department: "Engineering", position: "Senior Developer", hireDate: "2023-01-15", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 2, name: "Michael Chen", email: "michael.chen@techcorp.com", phone: "(555) 234-5678", department: "Marketing", position: "Marketing Manager", hireDate: "2022-08-20", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 3, name: "Emily Rodriguez", email: "emily.rodriguez@techcorp.com", phone: "(555) 345-6789", department: "HR", position: "HR Specialist", hireDate: "2023-03-10", status: "On Leave", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 4, name: "David Wilson", email: "david.wilson@techcorp.com", phone: "(555) 456-7890", department: "Finance", position: "Financial Analyst", hireDate: "2021-11-05", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
  { id: 5, name: "Lisa Thompson", email: "lisa.thompson@techcorp.com", phone: "(555) 567-8901", department: "Engineering", position: "QA Engineer", hireDate: "2024-02-01", status: "Active", avatar: "/placeholder.svg?height=40&width=40" },
]

export default function CompanyEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(initialEmployees)
  const [search, setSearch] = useState("")
  const [department, setDepartment] = useState<string>("all")
  const [status, setStatus] = useState<string>("all")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(8)
  const { toast } = useToast()

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    department: "Engineering",
    position: "",
    hireDate: "",
  })

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const matchesSearch = `${e.name} ${e.email} ${e.position}`.toLowerCase().includes(search.toLowerCase())
      const matchesDept = department === "all" || e.department === department
      const matchesStatus = status === "all" || e.status === status
      return matchesSearch && matchesDept && matchesStatus
    })
  }, [employees, search, department, status])

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize))
  const pageClamped = Math.min(page, totalPages)
  const paged = useMemo(() => {
    const start = (pageClamped - 1) * pageSize
    return filtered.slice(start, start + pageSize)
  }, [filtered, pageClamped, pageSize])

  const stats = useMemo(() => {
    const total = employees.length
    const active = employees.filter((e) => e.status === "Active").length
    const onLeave = employees.filter((e) => e.status === "On Leave").length
    const eng = employees.filter((e) => e.department === "Engineering").length
    return { total, active, onLeave, eng }
  }, [employees])

  const addEmployee = () => {
    if (!form.name || !form.email) return
    setEmployees((prev) => [
      {
        id: prev.length + 1,
        name: form.name,
        email: form.email,
        phone: form.phone || "",
        department: form.department as Employee["department"],
        position: form.position || "Associate",
        hireDate: form.hireDate || new Date().toISOString().slice(0, 10),
        status: "Active",
      },
      ...prev,
    ])
    setForm({ name: "", email: "", phone: "", department: "Engineering", position: "", hireDate: "" })
    toast({ title: "Employee added", description: `${form.name} has been added to ${form.department}.` })
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Employees</h2>
          <p className="text-muted-foreground">Manage your organization’s people and roles</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="gap-2"><Upload className="h-4 w-4"/> Import CSV</Button>
          <Button variant="outline" className="gap-2"><Download className="h-4 w-4"/> Export</Button>
          <Button asChild className="bg-sky-600 hover:bg-sky-700 text-white gap-2"><Link href="./employees/new"><UserPlus className="h-4 w-4"/> Add Employee</Link></Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        <Card className="bg-gradient-to-r from-sky-500 to-indigo-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base font-medium">Total Employees</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{stats.total}</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-emerald-500 to-green-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base font-medium">Active</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{stats.active}</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-amber-500 to-orange-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base font-medium">On Leave</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{stats.onLeave}</CardContent>
        </Card>
        <Card className="bg-gradient-to-r from-violet-500 to-fuchsia-600 text-white">
          <CardHeader className="pb-2"><CardTitle className="text-base font-medium">Engineering</CardTitle></CardHeader>
          <CardContent className="text-3xl font-bold">{stats.eng}</CardContent>
        </Card>
      </div>

      {/* Toolbar */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <div className="relative w-full md:max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input className="pl-9" placeholder="Search name, email, role" value={search} onChange={(e)=>setSearch(e.target.value)} />
              </div>
              <Button variant="outline" className="gap-2"><Filter className="h-4 w-4"/> Filters</Button>
            </div>
            <div className="flex items-center gap-2">
              <Select value={department} onValueChange={setDepartment}>
                <SelectTrigger className="w-[160px]"><SelectValue placeholder="Department" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  <SelectItem value="Engineering">Engineering</SelectItem>
                  <SelectItem value="Marketing">Marketing</SelectItem>
                  <SelectItem value="HR">HR</SelectItem>
                  <SelectItem value="Finance">Finance</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={(v)=>{ setStatus(v); setPage(1) }}>
                <SelectTrigger className="w-[140px]"><SelectValue placeholder="Status" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="On Leave">On Leave</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Directory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5" /> Employee Directory</CardTitle>
          <CardDescription>Browse and manage company employees • {filtered.length} result(s)</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-muted-foreground">
                  <th className="text-left py-2 pr-4">Name</th>
                  <th className="text-left py-2 pr-4">Contact</th>
                  <th className="text-left py-2 pr-4">Department</th>
                  <th className="text-left py-2 pr-4">Position</th>
                  <th className="text-left py-2 pr-4">Status</th>
                  <th className="text-right py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paged.map((e) => (
                  <tr key={e.id} className="border-b last:border-0">
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={e.avatar} alt={e.name} />
                          <AvatarFallback>{e.name.split(" ").map(n=>n[0]).slice(0,2).join("")}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{e.name}</div>
                          <div className="text-xs text-muted-foreground">Hired {e.hireDate}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1"><Mail className="h-3.5 w-3.5"/> {e.email}</div>
                        <div className="flex items-center gap-1"><Phone className="h-3.5 w-3.5"/> {e.phone}</div>
                      </div>
                    </td>
                    <td className="py-3 pr-4">
                      <div className="flex items-center gap-2"><BuildingIcon className="h-4 w-4"/> {e.department}</div>
                    </td>
                    <td className="py-3 pr-4">{e.position}</td>
                    <td className="py-3 pr-4">
                      {e.status === "Active" && <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white">Active</Badge>}
                      {e.status === "On Leave" && <Badge className="bg-amber-600 hover:bg-amber-700 text-white">On Leave</Badge>}
                      {e.status === "Inactive" && <Badge className="bg-slate-400 hover:bg-slate-500 text-white">Inactive</Badge>}
                    </td>
                    <td className="py-3 text-right">
                      <div className="inline-flex items-center gap-1">
                        <Button variant="ghost" size="icon" aria-label="Edit"><Edit className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" aria-label="Delete"><Trash2 className="h-4 w-4"/></Button>
                        <Button variant="ghost" size="icon" aria-label="More"><MoreVertical className="h-4 w-4"/></Button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-muted-foreground">No employees match your filters.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="text-xs text-muted-foreground">Page {pageClamped} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" disabled={pageClamped<=1} onClick={()=>setPage(1)}>First</Button>
              <Button variant="outline" size="sm" disabled={pageClamped<=1} onClick={()=>setPage(p=>Math.max(1, p-1))}>Prev</Button>
              <Button variant="outline" size="sm" disabled={pageClamped>=totalPages} onClick={()=>setPage(p=>Math.min(totalPages, p+1))}>Next</Button>
              <Button variant="outline" size="sm" disabled={pageClamped>=totalPages} onClick={()=>setPage(totalPages)}>Last</Button>
              <Select value={String(pageSize)} onValueChange={(v)=>{ setPageSize(Number(v)); setPage(1) }}>
                <SelectTrigger className="w-[120px]"><SelectValue placeholder="Rows" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 rows</SelectItem>
                  <SelectItem value="8">8 rows</SelectItem>
                  <SelectItem value="12">12 rows</SelectItem>
                  <SelectItem value="20">20 rows</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
