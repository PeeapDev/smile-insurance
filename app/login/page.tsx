"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Shield, User, Building, Eye, EyeOff, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface DemoAccount {
  type: "admin" | "user" | "company" | "staff"
  email: string
  password: string
  name: string
  description: string
  icon: React.ComponentType<{ className?: string }>
  color: string
  route: string
}

const demoAccounts: DemoAccount[] = [
  {
    type: "admin",
    email: "admin@example.com",
    password: "admin123",
    name: "Admin Account",
    description: "Full system access and management",
    icon: Shield,
    color: "text-red-600 border-red-200 hover:bg-red-50",
    route: "/admin/dashboard",
  },
  {
    type: "staff",
    email: "staff@example.com",
    password: "staff123",
    name: "Staff Account",
    description: "Staff access to admin portal",
    icon: User,
    color: "text-amber-600 border-amber-200 hover:bg-amber-50",
    route: "/staff/dashboard",
  },
  {
    type: "user",
    email: "user@example.com",
    password: "user123",
    name: "User Account",
    description: "Member dashboard and services",
    icon: User,
    color: "text-blue-600 border-blue-200 hover:bg-blue-50",
    route: "/user/dashboard",
  },
  {
    type: "company",
    email: "company@example.com",
    password: "company123",
    name: "Company Account",
    description: "Organization portal and management",
    icon: Building,
    color: "text-green-600 border-green-200 hover:bg-green-50",
    route: "/techcorp/dashboard",
  },
]

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  const handleDemoLogin = (account: DemoAccount) => {
    setEmail(account.email)
    setPassword(account.password)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Find matching demo account
    const account = demoAccounts.find((acc) => acc.email === email && acc.password === password)

    if (account) {
      try {
        localStorage.setItem("demo_role", account.type)
      } catch {}
      toast({
        title: "Login successful!",
        description: `Welcome to your ${account.name.toLowerCase()}`,
      })
      router.push(account.route)
    } else {
      toast({
        title: "Login failed",
        description: "Invalid email or password. Please try a demo account.",
        variant: "destructive",
      })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <h1 className="text-2xl font-bold">SMILE Insurance</h1>
          </div>
          <p className="text-muted-foreground">Sign in to your account</p>
        </div>

        {/* Login Form */}
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your credentials to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Demo Accounts */}
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Demo Accounts</CardTitle>
            <CardDescription className="text-center">
              Click any account below to auto-fill the login form
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {demoAccounts.map((account) => (
              <Button
                key={account.type}
                variant="outline"
                className={`w-full h-auto p-4 justify-start ${account.color}`}
                onClick={() => handleDemoLogin(account)}
              >
                <div className="flex items-center gap-3 w-full">
                  <account.icon className="h-5 w-5" />
                  <div className="flex-1 text-left">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{account.name}</span>
                      <Badge variant="secondary" className="text-xs">
                        Demo
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{account.description}</p>
                    <p className="text-xs text-muted-foreground mt-1">{account.email}</p>
                  </div>
                </div>
              </Button>
            ))}
          </CardContent>
        </Card>

        <Separator />

        {/* Footer */}
        <div className="text-center text-sm text-muted-foreground">
          <p>
            Don't have an account?{" "}
            <a href="/register" className="text-blue-600 hover:underline">
              Sign up
            </a>
          </p>
          <p className="mt-2">
            <a href="/forgot-password" className="text-blue-600 hover:underline">
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
