export type Company = {
  id: string
  name: string
  industry: string
  employees: number
  activeMembers: number
  monthlyPremium: number
  status: "active" | "pending_renewal" | "suspended" | "inactive"
  joinDate: string
  renewalDate: string
  contactPerson: string
  email: string
  phone: string
  address: string
  logo?: string
  location?: string
  description?: string
  services?: string[]
  planType: string
  claimsRatio: number
  paymentStatus: "current" | "overdue" | "pending"
}

export const companiesData: Company[] = [
  {
    id: "COMP-001",
    name: "TechCorp Inc.",
    industry: "Technology",
    employees: 1250,
    activeMembers: 1180,
    monthlyPremium: 125000,
    status: "active",
    joinDate: "2022-03-15",
    renewalDate: "2024-03-15",
    contactPerson: "Sarah Johnson",
    email: "sarah.johnson@techcorp.com",
    phone: "+1 (555) 123-4567",
    address: "123 Tech Street, Silicon Valley, CA 94105",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Silicon Valley, CA",
    description: "Leading provider of enterprise software and cloud services.",
    services: ["Cloud Hosting", "Cybersecurity", "IT Support"],
    planType: "Premium Corporate",
    claimsRatio: 0.68,
    paymentStatus: "current",
  },
  {
    id: "COMP-002",
    name: "Global Manufacturing",
    industry: "Manufacturing",
    employees: 850,
    activeMembers: 820,
    monthlyPremium: 89000,
    status: "active",
    joinDate: "2021-08-22",
    renewalDate: "2024-08-22",
    contactPerson: "Michael Chen",
    email: "m.chen@globalmanuf.com",
    phone: "+1 (555) 987-6543",
    address: "456 Industrial Blvd, Detroit, MI 48201",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Detroit, MI",
    description: "Global manufacturer of automotive components and heavy machinery.",
    services: ["OEM Parts", "Industrial Fabrication"],
    planType: "Standard Corporate",
    claimsRatio: 0.72,
    paymentStatus: "current",
  },
  {
    id: "COMP-003",
    name: "StartupXYZ",
    industry: "Software",
    employees: 45,
    activeMembers: 42,
    monthlyPremium: 4200,
    status: "active",
    joinDate: "2023-01-10",
    renewalDate: "2024-01-10",
    contactPerson: "Emily Rodriguez",
    email: "emily@startupxyz.com",
    phone: "+1 (555) 456-7890",
    address: "789 Startup Ave, Austin, TX 73301",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Austin, TX",
    description: "SaaS startup building collaboration tools for remote teams.",
    services: ["Project Management", "Team Chat"],
    planType: "Basic Corporate",
    claimsRatio: 0.45,
    paymentStatus: "current",
  },
  {
    id: "COMP-004",
    name: "Retail Solutions Inc.",
    industry: "Retail",
    employees: 2100,
    activeMembers: 1950,
    monthlyPremium: 195000,
    status: "pending_renewal",
    joinDate: "2020-06-01",
    renewalDate: "2024-06-01",
    contactPerson: "David Wilson",
    email: "d.wilson@retailsolutions.com",
    phone: "+1 (555) 321-0987",
    address: "321 Commerce St, New York, NY 10001",
    logo: "/placeholder.svg?height=40&width=40",
    location: "New York, NY",
    description: "Retail technology and supply chain optimization solutions.",
    services: ["POS Systems", "Inventory Analytics"],
    planType: "Premium Corporate",
    claimsRatio: 0.81,
    paymentStatus: "overdue",
  },
  {
    id: "COMP-005",
    name: "Healthcare Partners",
    industry: "Healthcare",
    employees: 650,
    activeMembers: 630,
    monthlyPremium: 78000,
    status: "active",
    joinDate: "2022-11-30",
    renewalDate: "2024-11-30",
    contactPerson: "Lisa Thompson",
    email: "l.thompson@healthpartners.com",
    phone: "+1 (555) 654-3210",
    address: "654 Medical Center Dr, Boston, MA 02101",
    logo: "/placeholder.svg?height=40&width=40",
    location: "Boston, MA",
    description: "Network of specialized clinics and healthcare services.",
    services: ["Primary Care", "Specialty Clinics"],
    planType: "Premium Corporate",
    claimsRatio: 0.59,
    paymentStatus: "current",
  },
]

export const getCompanyById = (id?: string | null) =>
  companiesData.find((c) => c.id === id)
