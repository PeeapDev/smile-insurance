"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CalendarIcon, CheckCircle } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

export default function CreateCardPage() {
  const [memberName, setMemberName] = useState("")
  const [policyNumber, setPolicyNumber] = useState("")
  const [groupNumber, setGroupNumber] = useState("")
  const [planType, setPlanType] = useState("")
  const [issuer, setIssuer] = useState("SMILE Insurance Medicare")
  const [effectiveDate, setEffectiveDate] = useState<Date | undefined>(undefined)
  const [expirationDate, setExpirationDate] = useState<Date | undefined>(undefined)
  const [cardDesign, setCardDesign] = useState("design1")
  const [deliveryMethod, setDeliveryMethod] = useState("email")
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [emergencyContactName, setEmergencyContactName] = useState("")
  const [emergencyContactPhone, setEmergencyContactPhone] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send this data to your backend API
    console.log({
      memberName,
      policyNumber,
      groupNumber,
      planType,
      issuer,
      effectiveDate: effectiveDate?.toISOString().split("T")[0],
      expirationDate: expirationDate?.toISOString().split("T")[0],
      cardDesign,
      deliveryMethod,
      deliveryAddress: deliveryMethod === "physical" ? deliveryAddress : undefined,
      emergencyContactName,
      emergencyContactPhone,
    })

    toast({
      title: "Card Creation Initiated",
      description: "The new insurance card request has been submitted successfully.",
      action: (
        <div className="flex items-center">
          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
          <span>Success!</span>
        </div>
      ),
    })

    // Reset form
    setMemberName("")
    setPolicyNumber("")
    setGroupNumber("")
    setPlanType("")
    setEffectiveDate(undefined)
    setExpirationDate(undefined)
    setCardDesign("design1")
    setDeliveryMethod("email")
    setDeliveryAddress("")
    setEmergencyContactName("")
    setEmergencyContactPhone("")
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 p-6">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Insurance Card</h1>
        <p className="text-gray-600">Fill in the details to issue a new insurance card for a member.</p>
      </header>

      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>Card Details</CardTitle>
          <CardDescription>Basic information about the new insurance card.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="memberName">Member Name</Label>
                <Input
                  id="memberName"
                  placeholder="John Doe"
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="policyNumber">Policy Number</Label>
                <Input
                  id="policyNumber"
                  placeholder="POL123456789"
                  value={policyNumber}
                  onChange={(e) => setPolicyNumber(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="groupNumber">Group Number (Optional)</Label>
                <Input
                  id="groupNumber"
                  placeholder="GRP123"
                  value={groupNumber}
                  onChange={(e) => setGroupNumber(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="planType">Plan Type</Label>
                <Select value={planType} onValueChange={setPlanType} required>
                  <SelectTrigger id="planType">
                    <SelectValue placeholder="Select plan type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Standard PPO">Standard PPO</SelectItem>
                    <SelectItem value="Basic HMO">Basic HMO</SelectItem>
                    <SelectItem value="Premium POS">Premium POS</SelectItem>
                    <SelectItem value="Medicare Advantage">Medicare Advantage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="issuer">Issuer</Label>
                <Input id="issuer" value={issuer} readOnly />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="effectiveDate">Effective Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !effectiveDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {effectiveDate ? format(effectiveDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={effectiveDate} onSelect={setEffectiveDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label htmlFor="expirationDate">Expiration Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !expirationDate && "text-muted-foreground",
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {expirationDate ? format(expirationDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={expirationDate} onSelect={setExpirationDate} initialFocus />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Card Design & Delivery</h3>
              <div className="space-y-2">
                <Label>Choose Card Design</Label>
                <RadioGroup
                  value={cardDesign}
                  onValueChange={setCardDesign}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
                >
                  <Label
                    htmlFor="design1"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem id="design1" value="design1" className="sr-only" />
                    <img src="/placeholder.svg?height=80&width=128" alt="Classic Design" className="mb-2 rounded-md" />
                    <span>Classic</span>
                  </Label>
                  <Label
                    htmlFor="design2"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem id="design2" value="design2" className="sr-only" />
                    <img src="/placeholder.svg?height=80&width=128" alt="Modern Design" className="mb-2 rounded-md" />
                    <span>Modern</span>
                  </Label>
                  <Label
                    htmlFor="design3"
                    className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-4 hover:bg-accent hover:text-accent-foreground [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem id="design3" value="design3" className="sr-only" />
                    <img src="/placeholder.svg?height=80&width=128" alt="Abstract Design" className="mb-2 rounded-md" />
                    <span>Abstract</span>
                  </Label>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>Delivery Method</Label>
                <RadioGroup value={deliveryMethod} onValueChange={setDeliveryMethod} className="flex space-x-4">
                  <Label
                    htmlFor="email-delivery"
                    className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem id="email-delivery" value="email" />
                    <span>Email (Digital Card)</span>
                  </Label>
                  <Label
                    htmlFor="physical-delivery"
                    className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent [&:has([data-state=checked])]:border-primary"
                  >
                    <RadioGroupItem id="physical-delivery" value="physical" />
                    <span>Physical Mail</span>
                  </Label>
                </RadioGroup>
              </div>

              {deliveryMethod === "physical" && (
                <div className="space-y-2">
                  <Label htmlFor="deliveryAddress">Delivery Address</Label>
                  <Textarea
                    id="deliveryAddress"
                    placeholder="123 Main St, City, State, Zip"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    required={deliveryMethod === "physical"}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Emergency Contact</h3>
              <p className="text-sm text-gray-600">
                Provide details for an emergency contact to be printed on the card.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactName">Name</Label>
                  <Input
                    id="emergencyContactName"
                    placeholder="Jane Doe"
                    value={emergencyContactName}
                    onChange={(e) => setEmergencyContactName(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="emergencyContactPhone">Phone</Label>
                  <Input
                    id="emergencyContactPhone"
                    placeholder="555-123-4567"
                    value={emergencyContactPhone}
                    onChange={(e) => setEmergencyContactPhone(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Card
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
