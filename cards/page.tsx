"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Share2, Printer, QrCode, Mail, Truck, FileText } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Shield } from "lucide-react"

export default function CardsPage() {
  const router = useRouter()
  const insuranceCard = {
    memberName: "John Doe",
    policyNumber: "SIM-2024-123456",
    groupNumber: "GRP-7890",
    effectiveDate: "2024-01-01",
    expirationDate: "2025-12-31",
    planType: "Standard PPO",
    issuer: "SMILE Insurance Medicare",
    cardNumber: "SIMC1234567890",
    emergencyContact: {
      name: "Jane Doe",
      phone: "555-123-4567",
    },
    design: "/placeholder.svg?height=200&width=320", // Placeholder for card design
  }

  useEffect(() => {
    // Redirect to admin cards page
    router.push("/admin/cards")
  }, [router])

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Insurance Cards</h1>
        <p className="text-gray-600">Manage and access your digital and physical insurance cards.</p>
      </header>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Current Card Display */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Your Current Insurance Card</CardTitle>
            <CardDescription>Details of your active policy card.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative w-full aspect-[1.6/1] rounded-lg overflow-hidden shadow-lg bg-gradient-to-br from-blue-500 to-blue-700 text-white p-4 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">{insuranceCard.issuer}</h3>
                  <p className="text-sm">{insuranceCard.planType}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-200" />
              </div>
              <div>
                <p className="text-xl font-mono tracking-wider mb-2">{insuranceCard.cardNumber}</p>
                <div className="flex justify-between text-sm">
                  <div>
                    <p>Member Name:</p>
                    <p className="font-semibold">{insuranceCard.memberName}</p>
                  </div>
                  <div className="text-right">
                    <p>Effective Date:</p>
                    <p className="font-semibold">{insuranceCard.effectiveDate}</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <div>
                    <p>Policy No:</p>
                    <p className="font-semibold">{insuranceCard.policyNumber}</p>
                  </div>
                  <div className="text-right">
                    <p>Expires:</p>
                    <p className="font-semibold">{insuranceCard.expirationDate}</p>
                  </div>
                </div>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Group Number:</p>
                <p className="font-medium">{insuranceCard.groupNumber}</p>
              </div>
              <div>
                <p className="text-gray-600">Emergency Contact:</p>
                <p className="font-medium">{insuranceCard.emergencyContact.name}</p>
                <p className="font-medium">{insuranceCard.emergencyContact.phone}</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button variant="outline" className="flex-1 min-w-[150px] bg-transparent">
                <Download className="mr-2 h-4 w-4" /> Download PDF
              </Button>
              <Button variant="outline" className="flex-1 min-w-[150px] bg-transparent">
                <Printer className="mr-2 h-4 w-4" /> Print Card
              </Button>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="flex-1 min-w-[150px] bg-transparent">
                    <Share2 className="mr-2 h-4 w-4" /> Share Card
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Share Your Insurance Card</DialogTitle>
                    <DialogDescription>Choose how you'd like to share your digital insurance card.</DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="flex items-center space-x-4">
                      <QrCode className="h-8 w-8 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">QR Code</h4>
                        <p className="text-sm text-gray-500">Generate a QR code for quick scanning.</p>
                      </div>
                      <Button className="ml-auto">Generate</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-4">
                      <Mail className="h-8 w-8 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">Email</h4>
                        <p className="text-sm text-gray-500">Send card details to an email address.</p>
                      </div>
                      <Button className="ml-auto">Send Email</Button>
                    </div>
                    <Separator />
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-gray-600" />
                      <div>
                        <h4 className="font-semibold">SMS</h4>
                        <p className="text-sm text-gray-500">Send card details via text message.</p>
                      </div>
                      <Button className="ml-auto">Send SMS</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>

        {/* Request New Card / Design Options */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Request a New Card or Design</CardTitle>
            <CardDescription>Order a new physical card or customize your digital design.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full">Request New Physical Card</Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Request Physical Card</DialogTitle>
                  <DialogDescription>Please confirm your delivery details and choose a design.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Delivery Address</Label>
                    <Input
                      id="address"
                      placeholder="123 Main St"
                      defaultValue="123 Health Ave, Medical City, MC 12345"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Delivery Notes (Optional)</Label>
                    <Textarea id="notes" placeholder="Leave at front desk" />
                  </div>
                  <div className="space-y-2">
                    <Label>Card Design</Label>
                    <RadioGroup defaultValue="design1" className="grid grid-cols-2 gap-4">
                      <Label
                        htmlFor="design1"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="design1" value="design1" className="sr-only" />
                        <img
                          src="/placeholder.svg?height=80&width=128"
                          alt="Classic Design"
                          className="mb-2 rounded-md"
                        />
                        <span>Classic</span>
                      </Label>
                      <Label
                        htmlFor="design2"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="design2" value="design2" className="sr-only" />
                        <img
                          src="/placeholder.svg?height=80&width=128"
                          alt="Modern Design"
                          className="mb-2 rounded-md"
                        />
                        <span>Modern</span>
                      </Label>
                    </RadioGroup>
                  </div>
                  <div className="space-y-2">
                    <Label>Delivery Method</Label>
                    <RadioGroup defaultValue="standard" className="flex space-x-4">
                      <Label
                        htmlFor="standard"
                        className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="standard" value="standard" />
                        <Truck className="h-5 w-5" />
                        <span>Standard (5-7 days)</span>
                      </Label>
                      <Label
                        htmlFor="express"
                        className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="express" value="express" />
                        <Truck className="h-5 w-5" />
                        <span>Express (2-3 days)</span>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
                <Button className="w-full">Submit Request</Button>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full bg-transparent">
                  Customize Digital Card Design
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Customize Digital Card</DialogTitle>
                  <DialogDescription>Select a new design for your digital insurance card.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label>Choose a Design</Label>
                    <RadioGroup defaultValue="design1" className="grid grid-cols-2 gap-4">
                      <Label
                        htmlFor="digital-design1"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="digital-design1" value="design1" className="sr-only" />
                        <img
                          src="/placeholder.svg?height=80&width=128"
                          alt="Digital Classic Design"
                          className="mb-2 rounded-md"
                        />
                        <span>Classic Digital</span>
                      </Label>
                      <Label
                        htmlFor="digital-design2"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="digital-design2" value="design2" className="sr-only" />
                        <img
                          src="/placeholder.svg?height=80&width=128"
                          alt="Digital Modern Design"
                          className="mb-2 rounded-md"
                        />
                        <span>Modern Digital</span>
                      </Label>
                      <Label
                        htmlFor="digital-design3"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="digital-design3" value="design3" className="sr-only" />
                        <img
                          src="/placeholder.svg?height=80&width=128"
                          alt="Digital Abstract Design"
                          className="mb-2 rounded-md"
                        />
                        <span>Abstract Digital</span>
                      </Label>
                      <Label
                        htmlFor="digital-design4"
                        className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                      >
                        <RadioGroupItem id="digital-design4" value="design4" className="sr-only" />
                        <img
                          src="/placeholder.svg?height=80&width=128"
                          alt="Digital Minimalist Design"
                          className="mb-2 rounded-md"
                        />
                        <span>Minimalist Digital</span>
                      </Label>
                    </RadioGroup>
                  </div>
                </div>
                <Button className="w-full">Apply Design</Button>
              </DialogContent>
            </Dialog>

            <Separator />

            <div className="space-y-2">
              <h3 className="font-semibold text-gray-800">Emergency Contact Information</h3>
              <p className="text-sm text-gray-600">Update your emergency contact details for your card.</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergency-name">Name</Label>
                  <Input id="emergency-name" defaultValue={insuranceCard.emergencyContact.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergency-phone">Phone</Label>
                  <Input id="emergency-phone" defaultValue={insuranceCard.emergencyContact.phone} />
                </div>
              </div>
              <Button size="sm" className="w-full">
                Save Emergency Contact
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Card History / Previous Cards */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Card History</CardTitle>
          <CardDescription>View your past and expired insurance cards.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* Example Past Card */}
            <div className="relative w-full aspect-[1.6/1] rounded-lg overflow-hidden shadow-md bg-gray-300 text-gray-700 p-4 flex flex-col justify-between opacity-70">
              <Badge variant="destructive" className="absolute top-2 right-2">
                Expired
              </Badge>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold">SMILE Insurance</h3>
                  <p className="text-sm">Basic HMO</p>
                </div>
                <Shield className="h-8 w-8 text-gray-400" />
              </div>
              <div>
                <p className="text-xl font-mono tracking-wider mb-2">SIMC0987654321</p>
                <div className="flex justify-between text-sm">
                  <div>
                    <p>Member Name:</p>
                    <p className="font-semibold">John Doe</p>
                  </div>
                  <div className="text-right">
                    <p>Effective Date:</p>
                    <p className="font-semibold">2023-01-01</p>
                  </div>
                </div>
                <div className="flex justify-between text-sm mt-1">
                  <div>
                    <p>Policy No:</p>
                    <p className="font-semibold">POL012345678</p>
                  </div>
                  <div className="text-right">
                    <p>Expires:</p>
                    <p className="font-semibold">2023-12-31</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Add more past cards as needed */}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
