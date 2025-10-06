"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import {
  CreditCard,
  User,
  Shield,
  CalendarIcon,
  Upload,
  Eye,
  Download,
  Check,
  AlertCircle,
  Sparkles,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

const cardTemplates = [
  {
    id: "premium",
    name: "Premium Gold",
    description: "Premium card with gold accents",
    color: "from-yellow-400 to-yellow-600",
    textColor: "text-white",
  },
  {
    id: "standard",
    name: "Standard Blue",
    description: "Classic blue design",
    color: "from-blue-500 to-blue-700",
    textColor: "text-white",
  },
  {
    id: "corporate",
    name: "Corporate Silver",
    description: "Professional silver theme",
    color: "from-gray-400 to-gray-600",
    textColor: "text-white",
  },
  {
    id: "modern",
    name: "Modern Gradient",
    description: "Contemporary gradient design",
    color: "from-purple-500 to-pink-500",
    textColor: "text-white",
  },
]

export default function CardIssuancePage() {
  const [selectedTemplate, setSelectedTemplate] = useState("premium")
  const [formData, setFormData] = useState({
    memberName: "",
    memberId: "",
    company: "",
    planType: "",
    effectiveDate: undefined as Date | undefined,
    expirationDate: undefined as Date | undefined,
    groupNumber: "",
    policyNumber: "",
    copay: "",
    deductible: "",
    emergencyContact: "",
    specialInstructions: "",
    rushOrder: false,
    digitalOnly: false,
  })

  const [previewMode, setPreviewMode] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const selectedTemplateData = cardTemplates.find((t) => t.id === selectedTemplate)

  return (
    <div className="flex-1 space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Insurance Card Issuance</h1>
          <p className="text-muted-foreground">Create and customize new insurance cards for members</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" onClick={() => setPreviewMode(!previewMode)}>
            <Eye className="h-4 w-4 mr-2" />
            {previewMode ? "Edit Mode" : "Preview"}
          </Button>
          <Button>
            <CreditCard className="h-4 w-4 mr-2" />
            Issue Card
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Form Section */}
        <div className="lg:col-span-2 space-y-6">
          {!previewMode ? (
            <>
              {/* Member Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="h-5 w-5 mr-2" />
                    Member Information
                  </CardTitle>
                  <CardDescription>Basic member details for the insurance card</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="memberName">Full Name *</Label>
                      <Input
                        id="memberName"
                        placeholder="John Doe"
                        value={formData.memberName}
                        onChange={(e) => handleInputChange("memberName", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="memberId">Member ID *</Label>
                      <Input
                        id="memberId"
                        placeholder="MEM-2024-001"
                        value={formData.memberId}
                        onChange={(e) => handleInputChange("memberId", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Select value={formData.company} onValueChange={(value) => handleInputChange("company", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="techcorp">TechCorp Inc.</SelectItem>
                          <SelectItem value="startupxyz">StartupXYZ</SelectItem>
                          <SelectItem value="global">Global Solutions</SelectItem>
                          <SelectItem value="manufacturing">Manufacturing Co.</SelectItem>
                          <SelectItem value="retail">Retail Chain</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="planType">Plan Type</Label>
                      <Select value={formData.planType} onValueChange={(value) => handleInputChange("planType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select plan" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="premium">Premium Plan</SelectItem>
                          <SelectItem value="standard">Standard Plan</SelectItem>
                          <SelectItem value="basic">Basic Plan</SelectItem>
                          <SelectItem value="family">Family Plan</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Policy Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="h-5 w-5 mr-2" />
                    Policy Information
                  </CardTitle>
                  <CardDescription>Insurance policy details and coverage information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Effective Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.effectiveDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.effectiveDate ? format(formData.effectiveDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.effectiveDate}
                            onSelect={(date) => handleInputChange("effectiveDate", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div>
                      <Label>Expiration Date *</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !formData.expirationDate && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {formData.expirationDate ? format(formData.expirationDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={formData.expirationDate}
                            onSelect={(date) => handleInputChange("expirationDate", date)}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="groupNumber">Group Number</Label>
                      <Input
                        id="groupNumber"
                        placeholder="GRP-12345"
                        value={formData.groupNumber}
                        onChange={(e) => handleInputChange("groupNumber", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="policyNumber">Policy Number</Label>
                      <Input
                        id="policyNumber"
                        placeholder="POL-67890"
                        value={formData.policyNumber}
                        onChange={(e) => handleInputChange("policyNumber", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="copay">Copay Amount</Label>
                      <Input
                        id="copay"
                        placeholder="$25"
                        value={formData.copay}
                        onChange={(e) => handleInputChange("copay", e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="deductible">Deductible</Label>
                      <Input
                        id="deductible"
                        placeholder="$1,000"
                        value={formData.deductible}
                        onChange={(e) => handleInputChange("deductible", e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Additional Options */}
              <Card>
                <CardHeader>
                  <CardTitle>Additional Options</CardTitle>
                  <CardDescription>Special instructions and delivery preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="emergencyContact">Emergency Contact</Label>
                    <Input
                      id="emergencyContact"
                      placeholder="Emergency contact information"
                      value={formData.emergencyContact}
                      onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="specialInstructions">Special Instructions</Label>
                    <Textarea
                      id="specialInstructions"
                      placeholder="Any special instructions for card issuance..."
                      value={formData.specialInstructions}
                      onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Rush Order</Label>
                      <p className="text-sm text-muted-foreground">Expedite card production (+$15 fee)</p>
                    </div>
                    <Switch
                      checked={formData.rushOrder}
                      onCheckedChange={(checked) => handleInputChange("rushOrder", checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Digital Only</Label>
                      <p className="text-sm text-muted-foreground">Issue digital card only (no physical card)</p>
                    </div>
                    <Switch
                      checked={formData.digitalOnly}
                      onCheckedChange={(checked) => handleInputChange("digitalOnly", checked)}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            /* Preview Section */
            <Card>
              <CardHeader>
                <CardTitle>Card Preview</CardTitle>
                <CardDescription>Review the card design before issuance</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {/* Card Preview */}
                  <div className="flex justify-center">
                    <div
                      className={cn(
                        "w-96 h-60 rounded-xl p-6 bg-gradient-to-br shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300",
                        selectedTemplateData?.color,
                        selectedTemplateData?.textColor,
                      )}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-lg font-bold">SMILE Insurance</h3>
                          <p className="text-sm opacity-90">{formData.planType || "Premium Plan"}</p>
                        </div>
                        <Shield className="h-8 w-8 opacity-80" />
                      </div>
                      <div className="space-y-2 mb-4">
                        <p className="text-xl font-bold">{formData.memberName || "John Doe"}</p>
                        <p className="text-sm opacity-90">ID: {formData.memberId || "MEM-2024-001"}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="opacity-75">Group</p>
                          <p className="font-medium">{formData.groupNumber || "GRP-12345"}</p>
                        </div>
                        <div>
                          <p className="opacity-75">Copay</p>
                          <p className="font-medium">{formData.copay || "$25"}</p>
                        </div>
                      </div>
                      <div className="mt-4 text-xs opacity-75">
                        Valid: {formData.effectiveDate ? format(formData.effectiveDate, "MM/yy") : "01/24"} -{" "}
                        {formData.expirationDate ? format(formData.expirationDate, "MM/yy") : "12/24"}
                      </div>
                    </div>
                  </div>

                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium mb-2">Member Details</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Name: {formData.memberName || "Not specified"}</p>
                        <p>ID: {formData.memberId || "Not specified"}</p>
                        <p>Company: {formData.company || "Not specified"}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Policy Details</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>Plan: {formData.planType || "Not specified"}</p>
                        <p>Deductible: {formData.deductible || "Not specified"}</p>
                        <p>Rush Order: {formData.rushOrder ? "Yes" : "No"}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Template Selection & Actions */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Sparkles className="h-5 w-5 mr-2" />
                Card Templates
              </CardTitle>
              <CardDescription>Choose a design template for the insurance card</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {cardTemplates.map((template) => (
                <div
                  key={template.id}
                  className={cn(
                    "p-3 rounded-lg border-2 cursor-pointer transition-all",
                    selectedTemplate === template.id
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300",
                  )}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <div className="flex items-center space-x-3">
                    <div className={cn("w-12 h-8 rounded bg-gradient-to-r", template.color)} />
                    <div>
                      <p className="font-medium">{template.name}</p>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Upload className="h-4 w-4 mr-2" />
                Upload Member Photo
              </Button>
              <Button variant="outline" className="w-full justify-start bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                Download Template
              </Button>
              <Separator />
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-500" />
                  <span className="text-sm">Member verified</span>
                </div>
                <div className="flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm">Pending approval</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Issuance Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm">Base Fee</span>
                <span className="text-sm">$5.00</span>
              </div>
              {formData.rushOrder && (
                <div className="flex justify-between">
                  <span className="text-sm">Rush Order</span>
                  <span className="text-sm">$15.00</span>
                </div>
              )}
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${formData.rushOrder ? "20.00" : "5.00"}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
