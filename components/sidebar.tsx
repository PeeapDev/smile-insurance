"use client"

import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Home,
  Shield,
  Users,
  CreditCard,
  FileText,
  DollarSign,
  Settings,
  MessageSquare,
  BarChart,
  Building,
  LogOut,
  ChevronDown,
  Briefcase,
  Package,
  UserRound,
  Car,
  Stethoscope,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
  SidebarInput,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import type { ComponentType } from "react"
import { useEffect, useState } from "react"
import { can } from "@/lib/rbac"
import { isEnabled } from "@/lib/feature-flags"

interface SidebarProps {
  userRole: "admin" | "user" | "company" | "staff"
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const { state } = useSidebar()
  // Demo company slug; replace with real organization slug from auth/session when available
  const companySlug = "techcorp"
  
  // Avoid hydration mismatch: defer permission checks until client-side mount
  const [hydrated, setHydrated] = useState(false)
  useEffect(() => {
    setHydrated(true)
  }, [])

  type NavSubItem = { title: string; href: string }
  type NavigationItem = {
    title: string
    href: string
    icon: ComponentType<any>
    isActive: boolean
    subItems?: NavSubItem[]
    badge?: number
  }

  // map route to feature flag key (for staff)
  function routeToFeature(href: string): string | null {
    if (href === "/staff/dashboard") return null
    if (href.includes("/staff/members")) return "staff.members"
    if (href.includes("/staff/insurance-cards")) return "staff.insurance_cards"
    if (href.includes("/staff/claims")) return "staff.claims"
    if (href.includes("/staff/underwriting")) return "staff.underwriting"
    if (href.includes("/staff/payments")) return "staff.payments"
    if (href.includes("/staff/chat")) return "staff.chat"
    if (href.includes("/staff/contacts")) return "staff.contacts"
    if (href.includes("/staff/invoices")) return "staff.invoices"
    if (href.includes("/staff/files")) return "staff.files"
    if (href.includes("/staff/companies")) return "staff.companies"
    if (href.includes("/staff/hr")) return "staff.hr"
    if (href.includes("/staff/inventory")) return "staff.inventory"
    if (href.includes("/staff/reports")) return "staff.reports"
    if (href.includes("/staff/settings")) return "staff.settings"
    if (href.includes("/staff/motor")) return "staff.motor"
    if (href.includes("/staff/medical")) return "staff.medical"
    return null
  }

  const userNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/user/dashboard",
      icon: Home,
      isActive: pathname === "/user/dashboard",
    },
    {
      title: "Motor Insurance",
      href: "/motor",
      icon: Car,
      isActive: pathname === "/motor",
    },
    {
      title: "My Coverage",
      href: "/coverage",
      icon: Shield,
      isActive: pathname === "/coverage",
    },
    {
      title: "My Cards",
      href: "/cards",
      icon: CreditCard,
      isActive: pathname === "/cards",
    },
    {
      title: "Claims",
      href: "/claims",
      icon: FileText,
      isActive: pathname === "/claims",
      badge: 2,
    },
    {
      title: "Billing",
      href: "/billing",
      icon: DollarSign,
      isActive: pathname === "/billing",
    },
    {
      title: "Providers",
      href: "/providers",
      icon: Users,
      isActive: pathname === "/providers",
    },
    {
      title: "Messages",
      href: "/messages",
      icon: MessageSquare,
      isActive: pathname === "/messages",
      badge: 5,
    },
  ]

  const staffNavigation: NavigationItem[] = [
    { title: "Dashboard", href: "/staff/dashboard", icon: Home, isActive: pathname === "/staff/dashboard" },
    { title: "Motor", href: "/staff/motor", icon: Car, isActive: pathname === "/staff/motor" },
    { title: "Medical", href: "/staff/medical", icon: Stethoscope, isActive: pathname === "/staff/medical" },
    {
      title: "Members",
      href: "/staff/members",
      icon: Users,
      isActive: pathname.startsWith("/staff/members"),
      subItems: [
        { title: "View All", href: "/staff/members" },
        { title: "Add New", href: "/staff/members/create" },
      ],
    },
    {
      title: "Insurance Cards",
      href: "/staff/insurance-cards",
      icon: CreditCard,
      isActive: pathname.startsWith("/staff/insurance-cards"),
      subItems: [
        { title: "Manage All", href: "/staff/insurance-cards" },
        { title: "Create New", href: "/staff/insurance-cards/create" },
      ],
    },
    {
      title: "Claims Processing",
      href: "/staff/claims",
      icon: FileText,
      isActive: pathname.startsWith("/staff/claims"),
      subItems: [
        { title: "View All", href: "/staff/claims" },
        { title: "Submit New", href: "/staff/claims/submit" },
      ],
    },
    {
      title: "Underwriting",
      href: "/staff/underwriting",
      icon: FileText,
      isActive: pathname.startsWith("/staff/underwriting"),
      subItems: [
        { title: "Overview", href: "/staff/underwriting" },
        { title: "Rules", href: "/staff/underwriting/rules" },
      ],
    },
    { title: "Payments", href: "/staff/payments", icon: DollarSign, isActive: pathname === "/staff/payments" },
    { title: "Chat", href: "/staff/chat", icon: MessageSquare, isActive: pathname.startsWith("/staff/chat") },
    { title: "Contacts", href: "/staff/contacts", icon: Users, isActive: pathname.startsWith("/staff/contacts") },
    {
      title: "Invoices",
      href: "/staff/invoices",
      icon: FileText,
      isActive: pathname.startsWith("/staff/invoices"),
      subItems: [
        { title: "All Invoices", href: "/staff/invoices" },
        { title: "New Invoice / Quote", href: "/staff/invoices/new" },
      ],
    },
    { title: "Files", href: "/staff/files", icon: Package, isActive: pathname.startsWith("/staff/files") },
    { title: "Companies", href: "/staff/companies", icon: Building, isActive: pathname === "/staff/companies" },
    {
      title: "HR",
      href: "/staff/hr",
      icon: Briefcase,
      isActive: pathname.startsWith("/staff/hr"),
      subItems: [
        { title: "Overview", href: "/staff/hr" },
        { title: "Staff", href: "/staff/hr/staff" },
        { title: "Attendance", href: "/staff/hr/attendance" },
        { title: "Attendance Scan", href: "/staff/hr/attendance/scan" },
        { title: "Payroll", href: "/staff/hr/payroll" },
        { title: "Finance", href: "/staff/hr/finance" },
      ],
    },
    {
      title: "Inventory",
      href: "/staff/inventory",
      icon: Package,
      isActive: pathname.startsWith("/staff/inventory"),
      subItems: [
        { title: "Overview", href: "/staff/inventory" },
        { title: "Items", href: "/staff/inventory/items" },
      ],
    },
    {
      title: "Reports",
      href: "/staff/reports",
      icon: BarChart,
      isActive: pathname.startsWith("/staff/reports"),
      subItems: [
        { title: "Overview", href: "/staff/reports" },
        { title: "Attendance Reports", href: "/staff/reports/attendance" },
      ],
    },
    { title: "Settings", href: "/staff/settings", icon: Settings, isActive: pathname === "/staff/settings" },
  ]

  const adminNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: "/admin/dashboard",
      icon: Home,
      isActive: pathname === "/admin/dashboard",
    },
    {
      title: "Motor",
      href: "/admin/motor",
      icon: Car,
      isActive: pathname === "/admin/motor",
    },
    {
      title: "Medical",
      href: "/admin/medical",
      icon: Stethoscope,
      isActive: pathname === "/admin/medical",
    },
    {
      title: "Members",
      href: "/admin/members",
      icon: Users,
      isActive: pathname.startsWith("/admin/members"),
      subItems: [
        { title: "View All", href: "/admin/members" },
        { title: "Add New", href: "/admin/members/create" },
      ],
    },
    {
      title: "Insurance Cards",
      href: "/admin/cards",
      icon: CreditCard,
      isActive: pathname.startsWith("/admin/cards"),
      subItems: [
        { title: "Manage All", href: "/admin/cards" },
        { title: "Create New", href: "/admin/cards/create" },
      ],
    },
    {
      title: "Claims Processing",
      href: "/admin/claims",
      icon: FileText,
      isActive: pathname.startsWith("/admin/claims"),
      badge: 15,
      subItems: [
        { title: "View All", href: "/admin/claims" },
        { title: "Submit New", href: "/admin/claims/submit" },
      ],
    },
    {
      title: "Underwriting",
      href: "/admin/underwriting/dashboard",
      icon: FileText,
      isActive: pathname.startsWith("/admin/underwriting"),
      subItems: [
        { title: "Dashboard", href: "/admin/underwriting/dashboard" },
        { title: "Cases", href: "/admin/underwriting/cases" },
        { title: "Rules", href: "/admin/underwriting/rules" },
      ],
    },
    {
      title: "Payments",
      href: "/admin/payments",
      icon: DollarSign,
      isActive: pathname === "/admin/payments",
    },
    {
      title: "Chat",
      href: "/admin/chat",
      icon: MessageSquare,
      isActive: pathname.startsWith("/admin/chat"),
    },
    {
      title: "Contacts",
      href: "/admin/contacts",
      icon: Users,
      isActive: pathname.startsWith("/admin/contacts"),
    },
    {
      title: "Invoices",
      href: "/admin/invoices",
      icon: FileText,
      isActive: pathname.startsWith("/admin/invoices"),
      subItems: [
        { title: "All Invoices", href: "/admin/invoices" },
        { title: "New Invoice / Quote", href: "/admin/invoices/new" },
      ],
    },
    {
      title: "Files",
      href: "/admin/files",
      icon: Package,
      isActive: pathname.startsWith("/admin/files"),
    },
    {
      title: "Companies",
      href: "/admin/companies",
      icon: Building,
      isActive: pathname === "/admin/companies",
    },
    {
      title: "HR",
      href: "/admin/hr",
      icon: Briefcase,
      isActive: pathname.startsWith("/admin/hr"),
      subItems: [
        { title: "Overview", href: "/admin/hr" },
        { title: "Staff", href: "/admin/hr/staff" },
        { title: "Attendance", href: "/admin/hr/attendance" },
        { title: "Attendance Scan", href: "/admin/hr/attendance/scan" },
        { title: "Payroll", href: "/admin/hr/payroll" },
        { title: "Finance", href: "/admin/hr/finance" },
      ],
    },
    {
      title: "Inventory",
      href: "/admin/inventory",
      icon: Package,
      isActive: pathname.startsWith("/admin/inventory"),
      subItems: [
        { title: "Overview", href: "/admin/inventory" },
        { title: "Items", href: "/admin/inventory/items" },
      ],
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart,
      isActive: pathname.startsWith("/admin/reports"),
      subItems: [
        { title: "Overview", href: "/admin/reports" },
        { title: "Attendance Reports", href: "/admin/reports/attendance" },
      ],
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      isActive: pathname === "/admin/settings",
    },
  ]

  const companyNavigation: NavigationItem[] = [
    {
      title: "Dashboard",
      href: `/${companySlug}/dashboard`,
      icon: Home,
      isActive: pathname === `/${companySlug}/dashboard`,
    },
    {
      title: "Motor Insurance",
      href: `/${companySlug}/motor`,
      icon: Car,
      isActive: pathname === `/${companySlug}/motor`,
    },
    {
      title: "My Employees",
      href: `/${companySlug}/employees`,
      icon: Users,
      isActive: pathname === `/${companySlug}/employees`,
    },
    {
      title: "Company Policies",
      href: `/${companySlug}/policies`,
      icon: Shield,
      isActive: pathname === `/${companySlug}/policies`,
    },
    {
      title: "Billing",
      href: `/${companySlug}/billing`,
      icon: DollarSign,
      isActive: pathname === `/${companySlug}/billing`,
    },
    {
      title: "Claims Overview",
      href: `/${companySlug}/claims`,
      icon: FileText,
      isActive: pathname === `/${companySlug}/claims`,
    },
    {
      title: "Messages",
      href: `/${companySlug}/messages`,
      icon: MessageSquare,
      isActive: pathname === `/${companySlug}/messages`,
    },
    {
      title: "Settings",
      href: `/${companySlug}/settings`,
      icon: Settings,
      isActive: pathname === `/${companySlug}/settings`,
    },
  ]

  // select navigation by role
  const navigation =
    userRole === "admin"
      ? adminNavigation
      : userRole === "company"
      ? companyNavigation
      : userRole === "staff"
      ? staffNavigation
      : userNavigation

  // map route to rbac resource key
  function routeToResource(href: string): string {
    if (href.includes("/claims")) return "claims"
    if (href.includes("/payments")) return "payments"
    if (href.includes("/invoices")) return "invoices"
    if (href.includes("/files")) return "files"
    if (href.includes("/reports")) return "reports"
    if (href.includes("/settings")) return "settings"
    if (href.includes("/hr")) return "hr"
    if (href.includes("/attendance")) return "attendance"
    if (href.includes("/contacts")) return "members"
    if (href.includes("/members")) return "members"
    if (href.includes("/companies")) return "companies"
    if (href.includes("/inventory")) return "inventory"
    if (href.includes("/chat")) return "chat"
    if (href.includes("/underwriting")) return "underwriting"
    if (href.startsWith("/staff")) return "otc"
    if (href.startsWith("/admin")) return "dashboard"
    return "dashboard"
  }

  return (
    <ShadcnSidebar collapsible="icon">
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <Shield className="h-6 w-6 text-blue-600" />
          <span className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>SMILE Insurance</span>
        </Link>
        <SidebarTrigger className={cn("lg:hidden", state === "collapsed" && "ml-auto")} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarInput placeholder="Search..." className={cn(state === "collapsed" && "hidden")} />
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigation
                .filter((item) => {
                  if (!hydrated) return true
                  const hasPerm = can(routeToResource(item.href), "read", userRole)
                  if (userRole === "staff") {
                    const fk = routeToFeature(item.href)
                    return hasPerm && (fk ? isEnabled(fk as any) : true)
                  }
                  return hasPerm
                })
                .map((item) => (
                <SidebarMenuItem key={item.title}>
                  {item.subItems ? (
                    <Collapsible defaultOpen={item.isActive} className="group/collapsible w-full">
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton isActive={item.isActive} tooltip={item.title}>
                          <item.icon />
                          <span className={cn(state === "collapsed" && "hidden")}>{item.title}</span>
                          {item.badge && (
                            <SidebarMenuBadge className={cn(state === "collapsed" && "hidden")}>
                              {item.badge}
                            </SidebarMenuBadge>
                          )}
                          <ChevronDown
                            className={cn(
                              "ml-auto h-4 w-4 transition-transform",
                              state === "collapsed" && "hidden",
                              item.isActive && "group-data-[state=open]/collapsible:rotate-180",
                            )}
                          />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {item.subItems
                            .filter((subItem) => !hydrated || can(routeToResource(subItem.href), "read", userRole))
                            .map((subItem: { title: string; href: string }) => (
                            <SidebarMenuSubButton key={subItem.title} asChild isActive={pathname === subItem.href}>
                              <Link href={subItem.href}>
                                <span>{subItem.title}</span>
                              </Link>
                            </SidebarMenuSubButton>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </Collapsible>
                  ) : (
                    <SidebarMenuButton asChild isActive={item.isActive} tooltip={item.title}>
                      <Link href={item.href}>
                        <item.icon />
                        <span className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>
                          {item.title}
                        </span>
                        {item.badge && (
                          <SidebarMenuBadge className={cn(state === "collapsed" && "opacity-0")}>
                            {item.badge}
                          </SidebarMenuBadge>
                        )}
                      </Link>
                    </SidebarMenuButton>
                  )}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton tooltip="Profile & Settings">
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <span className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>
                {userRole === "admin" ? "Admin User" : userRole === "company" ? "Company Admin" : "John Doe"}
              </span>
              <ChevronDown className={cn("ml-auto h-4 w-4 transition-opacity", state === "collapsed" && "opacity-0")} />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="right" align="end" className="w-(--radix-popper-anchor-width)">
            <DropdownMenuItem>
              <Link href="/admin/profile" className="flex items-center w-full">
                <UserRound className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/login" className="flex items-center w-full">
                <LogOut className="h-4 w-4 mr-2" />
                Log Out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className={cn("flex justify-center p-2", state === "collapsed" && "hidden")}>
          <ThemeToggle />
        </div>
      </SidebarFooter>
      <SidebarRail />
    </ShadcnSidebar>
  )
}
