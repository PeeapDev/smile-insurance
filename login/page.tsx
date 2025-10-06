"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Shield, Building } from "lucide-react"

type DemoAccount = {
  type: "Admin" | "User" | "Company" | "Employee" | "Admin Staff"
  email: string
  password: string
  icon: any
  description: string
  color: string
  // Optional routing context
  company?: string
  employeeFirstName?: string
  adminFirstName?: string
}

const demoAccounts: DemoAccount[] = [
  {
    type: "Admin",
    email: "admin@example.com",
    password: "admin123",
    icon: Shield,
    description: "Full system access",
    color: "bg-red-100 text-red-800 hover:bg-red-200",
  },
  {
    type: "Admin Staff",
    email: "mary.admin@example.com",
    password: "mary123",
    icon: Shield,
    description: "Superadmin staff personalized dashboard",
    color: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    adminFirstName: "mary",
  },
  {
    type: "User",
    email: "user@example.com",
    password: "user123",
    icon: User,
    description: "Member dashboard",
    color: "bg-blue-100 text-blue-800 hover:bg-blue-200",
  },
  {
    type: "Company",
    email: "company@example.com",
    password: "company123",
    icon: Building,
    description: "Organization portal",
    color: "bg-green-100 text-green-800 hover:bg-green-200",
  },
  {
    type: "Employee",
    email: "john@techcorp.com",
    password: "john123",
    icon: User,
    description: "Company employee portal (TechCorp / John)",
    color: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    company: "techcorp",
    employeeFirstName: "john",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)

  const fillDemoCredentials = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    const acct = demoAccounts.find((a) => a.email === email && a.password === password)
    if (!acct) {
      setError("Invalid credentials. Use one of the demo accounts below.")
      return
    }

    // Persist a lightweight user session for demo purposes
    const firstName =
      acct.type === "Admin Staff" && acct.adminFirstName
        ? acct.adminFirstName
        : acct.type === "Employee" && acct.employeeFirstName
          ? acct.employeeFirstName
          : acct.type === "User"
            ? "John"
            : "Admin"

    const session = {
      email: acct.email,
      role: acct.type,
      company: acct.company || null,
      firstName,
    }
    try {
      localStorage.setItem("smile_user", JSON.stringify(session))
    } catch {}

    // Route based on account type
    if (acct.type === "Admin") {
      router.push("/admin/dashboard")
    } else if (acct.type === "Admin Staff" && acct.adminFirstName) {
      router.push(`/admin/${acct.adminFirstName}/dashboard`)
    } else if (acct.type === "Company") {
      router.push("/company/dashboard")
    } else if (acct.type === "Employee" && acct.company && acct.employeeFirstName) {
      router.push(`/${acct.company}/${acct.employeeFirstName}/dashboard`)
    } else if (acct.type === "User") {
      router.push("/user/dashboard")
    } else {
      router.push("/")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Login to SMILE Insurance</CardTitle>
          <CardDescription>Enter your credentials to access your account.</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className="text-sm text-red-600">{error}</div>}
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <Separator className="my-6" />

          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Demo Accounts</h3>
              <p className="text-xs text-gray-500 mb-4">Click to auto-fill credentials</p>
            </div>

            <div className="grid gap-2">
              {demoAccounts.map((account) => {
                const IconComponent = account.icon
                return (
                  <button
                    key={account.type}
                    type="button"
                    onClick={() => fillDemoCredentials(account.email, account.password)}
                    className={`w-full p-3 rounded-lg border border-gray-200 hover:border-gray-300 transition-all duration-200 ${account.color}`}
                  >
                    <div className="flex items-center gap-3">
                      <IconComponent className="h-4 w-4" />
                      <div className="flex-1 text-left">
                        <div className="font-medium text-sm">{account.type} Account</div>
                        <div className="text-xs opacity-75">{account.description}</div>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Demo
                      </Badge>
                    </div>
                    <div className="mt-2 text-xs font-mono opacity-60">{account.email}</div>
                  </button>
                )
              })}
            </div>
          </div>

          <Separator className="my-6" />

          <div className="space-y-3 text-center text-sm">
            <div className="text-gray-600">
              Don't have an account?{" "}
              <Link href="/register" className="font-medium text-blue-600 hover:underline">
                Register here
              </Link>
            </div>
            <div>
              <Link href="/forgot-password" className="font-medium text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
