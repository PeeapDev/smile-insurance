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
  Car,
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
  SidebarProvider,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
  SidebarInput,
  SidebarMenuBadge,
} from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/theme-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SidebarProps {
  userRole: "admin" | "user" | "company"
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const { state } = useSidebar()

  type NavSubItem = { title: string; href: string }
  type NavItem = {
    title: string
    href: string
    icon: React.ComponentType<any>
    isActive: boolean
    badge?: number
    subItems?: NavSubItem[]
  }

  const userNavigation: NavItem[] = [
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

  const adminNavigation: NavItem[] = [
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
      title: "Payments",
      href: "/admin/payments",
      icon: DollarSign,
      isActive: pathname === "/admin/payments",
    },
    {
      title: "Companies",
      href: "/admin/companies",
      icon: Building,
      isActive: pathname === "/admin/companies",
    },
    {
      title: "Reports",
      href: "/admin/reports",
      icon: BarChart,
      isActive: pathname === "/admin/reports",
    },
    {
      title: "Settings",
      href: "/admin/settings",
      icon: Settings,
      isActive: pathname === "/admin/settings",
    },
  ]

  const companyNavigation: NavItem[] = [
    {
      title: "Dashboard",
      href: "/company/dashboard",
      icon: Home,
      isActive: pathname === "/company/dashboard",
    },
    {
      title: "My Employees",
      href: "/company/employees",
      icon: Users,
      isActive: pathname === "/company/employees",
    },
    {
      title: "Company Policies",
      href: "/company/policies",
      icon: Shield,
      isActive: pathname === "/company/policies",
    },
    {
      title: "Billing",
      href: "/company/billing",
      icon: DollarSign,
      isActive: pathname === "/company/billing",
    },
    {
      title: "Claims Overview",
      href: "/company/claims",
      icon: FileText,
      isActive: pathname === "/company/claims",
    },
    {
      title: "Messages",
      href: "/company/messages",
      icon: MessageSquare,
      isActive: pathname === "/company/messages",
    },
  ]

  const navigation =
    userRole === "admin" ? adminNavigation : userRole === "company" ? companyNavigation : userNavigation

  return (
    <SidebarProvider defaultOpen={true}>
      <ShadcnSidebar collapsible="icon">
        <SidebarHeader>
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Shield className="h-6 w-6 text-blue-600" />
            <span className={cn("transition-opacity", state === "collapsed" && "opacity-0")}>SMILE Insurance</span>
          </Link>
          <SidebarTrigger className={cn("max-lg:hidden", state === "collapsed" && "ml-auto")} />
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarInput placeholder="Search..." className={cn(state === "collapsed" && "hidden")} />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Main Navigation</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {navigation.map((item) => (
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
                            {item.subItems.map((subItem) => (
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
                <ChevronDown
                  className={cn("ml-auto h-4 w-4 transition-opacity", state === "collapsed" && "opacity-0")}
                />
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side="right" align="end" className="w-(--radix-popper-anchor-width)">
              <DropdownMenuItem>
                <Link href="/settings" className="flex items-center w-full">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
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
    </SidebarProvider>
  )
}
