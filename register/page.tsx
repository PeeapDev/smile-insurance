"use client"

import type React from "react"
import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, User, Briefcase, Shield, FileText } from "lucide-react"
import Link from "next/link"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    // Step 1: Account Information
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    // Step 2: Personal Details
    dateOfBirth: "",
    gender: "",
    phoneNumber: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    // Step 3: Employment & Health
    employmentStatus: "",
    companyName: "",
    jobTitle: "",
    hasPreExistingConditions: false,
    medicalHistoryNotes: "",
    // Step 4: Coverage Preferences
    desiredCoverage: "",
    familyMembers: "1",
    optionalAddOns: [] as string[],
    // Step 5: Document Upload & Review
    idDocument: null as File | null,
    addressProof: null as File | null,
    medicalRecords: null as File | null,
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [registrationSuccess, setRegistrationSuccess] = useState(false)

  const validateStep = () => {
    const currentErrors: Record<string, string> = {}
    let isValid = true

    if (step === 1) {
      if (!formData.firstName) currentErrors.firstName = "First Name is required"
      if (!formData.lastName) currentErrors.lastName = "Last Name is required"
      if (!formData.email) {
        currentErrors.email = "Email is required"
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        currentErrors.email = "Email is invalid"
      }
      if (!formData.password) {
        currentErrors.password = "Password is required"
      } else if (formData.password.length < 6) {
        currentErrors.password = "Password must be at least 6 characters"
      }
      if (formData.password !== formData.confirmPassword) {
        currentErrors.confirmPassword = "Passwords do not match"
      }
    } else if (step === 2) {
      if (!formData.dateOfBirth) currentErrors.dateOfBirth = "Date of Birth is required"
      if (!formData.gender) currentErrors.gender = "Gender is required"
      if (!formData.phoneNumber) currentErrors.phoneNumber = "Phone Number is required"
      if (!formData.address) currentErrors.address = "Address is required"
      if (!formData.city) currentErrors.city = "City is required"
      if (!formData.state) currentErrors.state = "State is required"
      if (!formData.zipCode) currentErrors.zipCode = "Zip Code is required"
    } else if (step === 3) {
      if (!formData.employmentStatus) currentErrors.employmentStatus = "Employment Status is required"
      if (formData.employmentStatus === "employed" && !formData.companyName)
        currentErrors.companyName = "Company Name is required for employed status"
    } else if (step === 4) {
      if (!formData.desiredCoverage) currentErrors.desiredCoverage = "Desired Coverage is required"
    } else if (step === 5) {
      if (!formData.idDocument) currentErrors.idDocument = "ID Document is required"
      if (!formData.addressProof) currentErrors.addressProof = "Proof of Address is required"
      if (!formData.termsAccepted) currentErrors.termsAccepted = "You must accept the terms and conditions"
    }

    setErrors(currentErrors)
    isValid = Object.keys(currentErrors).length === 0
    return isValid
  }

  const handleNext = () => {
    if (validateStep()) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({ ...formData, [field]: e.target.files[0] })
    }
  }

  const handleSubmit = () => {
    if (validateStep()) {
      console.log("Registration Data:", formData)
      // Simulate API call
      setTimeout(() => {
        setRegistrationSuccess(true)
      }, 1500)
    }
  }

  const progressPercentage = (step / 5) * 100

  const coverageOptions = [
    { value: "basic", label: "Basic Coverage ($25,000)", description: "Essential medical coverage" },
    { value: "standard", label: "Standard Coverage ($50,000)", description: "Comprehensive medical coverage" },
    { value: "premium", label: "Premium Coverage ($100,000)", description: "Top-tier coverage with extras" },
  ]

  const addOnOptions = [
    { id: "vision", name: "Vision Insurance", premium: 15, description: "Eye exams, glasses, contacts" },
    { id: "dental", name: "Dental Insurance", premium: 25, description: "Preventive care, fillings, crowns" },
    { id: "critical", name: "Critical Illness", premium: 20, description: "Lump sum for critical conditions" },
  ]

  const toggleAddOn = (addOnId: string) => {
    const updatedAddOns = formData.optionalAddOns.includes(addOnId)
      ? formData.optionalAddOns.filter((id) => id !== addOnId)
      : [...formData.optionalAddOns, addOnId]
    setFormData({ ...formData, optionalAddOns: updatedAddOns })
  }

  if (registrationSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
        <Card className="w-full max-w-md text-center p-8">
          <CheckCircle className="h-20 w-20 text-green-500 mx-auto mb-6" />
          <CardTitle className="text-3xl font-bold mb-4">Registration Successful!</CardTitle>
          <CardDescription className="text-lg text-gray-600 mb-6">
            Thank you for registering with SMILE Insurance Medicare. Your application has been submitted for review.
          </CardDescription>
          <p className="text-gray-700 mb-8">
            You will receive an email confirmation shortly with details on your next steps.
          </p>
          <Button asChild>
            <Link href="/login">Go to Login</Link>
          </Button>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50 p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Register for SMILE Insurance</CardTitle>
          <CardDescription className="text-gray-600">
            Join us in 5 easy steps to get comprehensive healthcare coverage.
          </CardDescription>
          <div className="mt-4">
            <Progress value={progressPercentage} className="w-full h-2" />
            <p className="text-sm text-muted-foreground mt-1">Step {step} of 5</p>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          {step === 1 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center">
                <User className="h-5 w-5 mr-2" />
                Account Information
              </h3>
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="first-name">First Name *</Label>
                    <Input
                      id="first-name"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                    {errors.firstName && <p className="text-red-500 text-xs">{errors.firstName}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="last-name">Last Name *</Label>
                    <Input
                      id="last-name"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                    {errors.lastName && <p className="text-red-500 text-xs">{errors.lastName}</p>}
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john.doe@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password">Confirm Password *</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-xs">{errors.confirmPassword}</p>}
                </div>
                <div className="flex justify-end">
                  <Button type="button" onClick={handleNext}>
                    Next
                  </Button>
                </div>
              </form>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Details
              </h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  />
                  {errors.dateOfBirth && <p className="text-red-500 text-xs">{errors.dateOfBirth}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender *</Label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => setFormData({ ...formData, gender: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.gender && <p className="text-red-500 text-xs">{errors.gender}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber">Phone Number *</Label>
                  <Input
                    id="phoneNumber"
                    type="tel"
                    placeholder="+1 (555) 123-4567"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  />
                  {errors.phoneNumber && <p className="text-red-500 text-xs">{errors.phoneNumber}</p>}
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    placeholder="123 Main St"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                  {errors.address && <p className="text-red-500 text-xs">{errors.address}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    placeholder="Anytown"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                  {errors.city && <p className="text-red-500 text-xs">{errors.city}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    placeholder="CA"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                  {errors.state && <p className="text-red-500 text-xs">{errors.state}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">Zip Code *</Label>
                  <Input
                    id="zipCode"
                    placeholder="90210"
                    value={formData.zipCode}
                    onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                  />
                  {errors.zipCode && <p className="text-red-500 text-xs">{errors.zipCode}</p>}
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Briefcase className="h-5 w-5 mr-2" />
                Employment & Health
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="employmentStatus">Employment Status *</Label>
                  <Select
                    value={formData.employmentStatus}
                    onValueChange={(value) => setFormData({ ...formData, employmentStatus: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select employment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="employed">Employed</SelectItem>
                      <SelectItem value="self-employed">Self-Employed</SelectItem>
                      <SelectItem value="unemployed">Unemployed</SelectItem>
                      <SelectItem value="retired">Retired</SelectItem>
                      <SelectItem value="student">Student</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.employmentStatus && <p className="text-red-500 text-xs">{errors.employmentStatus}</p>}
                </div>
                {formData.employmentStatus === "employed" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        placeholder="Acme Corp"
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      />
                      {errors.companyName && <p className="text-red-500 text-xs">{errors.companyName}</p>}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="jobTitle">Job Title</Label>
                      <Input
                        id="jobTitle"
                        placeholder="Software Engineer"
                        value={formData.jobTitle}
                        onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      />
                    </div>
                  </>
                )}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="hasPreExistingConditions"
                      checked={formData.hasPreExistingConditions}
                      onCheckedChange={(checked) =>
                        setFormData({ ...formData, hasPreExistingConditions: checked as boolean })
                      }
                    />
                    <Label htmlFor="hasPreExistingConditions">I have pre-existing medical conditions</Label>
                  </div>
                </div>
                {formData.hasPreExistingConditions && (
                  <div className="space-y-2">
                    <Label htmlFor="medicalHistoryNotes">Medical History Notes (Optional)</Label>
                    <textarea
                      id="medicalHistoryNotes"
                      rows={3}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Please provide details about your pre-existing conditions..."
                      value={formData.medicalHistoryNotes}
                      onChange={(e) => setFormData({ ...formData, medicalHistoryNotes: e.target.value })}
                    />
                  </div>
                )}
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Coverage Preferences
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="desiredCoverage">Desired Coverage Type *</Label>
                  <Select
                    value={formData.desiredCoverage}
                    onValueChange={(value) => setFormData({ ...formData, desiredCoverage: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select desired coverage" />
                    </SelectTrigger>
                    <SelectContent>
                      {coverageOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col">
                            <span>{option.label}</span>
                            <span className="text-xs text-muted-foreground">{option.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.desiredCoverage && <p className="text-red-500 text-xs">{errors.desiredCoverage}</p>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="familyMembers">Number of Family Members to Cover</Label>
                  <Select
                    value={formData.familyMembers}
                    onValueChange={(value) => setFormData({ ...formData, familyMembers: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select number of members" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">1 (Individual)</SelectItem>
                      <SelectItem value="2">2 (Couple)</SelectItem>
                      <SelectItem value="3">3 (Small Family)</SelectItem>
                      <SelectItem value="4">4 (Family)</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label>Optional Add-ons</Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {addOnOptions.map((addOn) => (
                      <div
                        key={addOn.id}
                        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                          formData.optionalAddOns.includes(addOn.id)
                            ? "border-blue-500 bg-blue-50"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        onClick={() => toggleAddOn(addOn.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-sm">{addOn.name}</p>
                            <p className="text-xs text-gray-600">{addOn.description}</p>
                          </div>
                          <div
                            className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                              formData.optionalAddOns.includes(addOn.id)
                                ? "border-blue-500 bg-blue-500"
                                : "border-gray-300"
                            }`}
                          >
                            {formData.optionalAddOns.includes(addOn.id) && (
                              <div className="w-2 h-2 bg-white rounded-full" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleNext}>Next</Button>
              </div>
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Document Upload & Review
              </h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="idDocument">Upload ID Document (e.g., Passport, Driver's License) *</Label>
                  <Input
                    id="idDocument"
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileChange(e, "idDocument")}
                  />
                  {errors.idDocument && <p className="text-red-500 text-xs">{errors.idDocument}</p>}
                  {formData.idDocument && (
                    <p className="text-green-600 text-sm mt-1">Uploaded: {formData.idDocument.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="addressProof">Upload Proof of Address (e.g., Utility Bill) *</Label>
                  <Input
                    id="addressProof"
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileChange(e, "addressProof")}
                  />
                  {errors.addressProof && <p className="text-red-500 text-xs">{errors.addressProof}</p>}
                  {formData.addressProof && (
                    <p className="text-green-600 text-sm mt-1">Uploaded: {formData.addressProof.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medicalRecords">Upload Medical Records (Optional)</Label>
                  <Input
                    id="medicalRecords"
                    type="file"
                    accept=".pdf,.jpg,.png"
                    onChange={(e) => handleFileChange(e, "medicalRecords")}
                  />
                  {formData.medicalRecords && (
                    <p className="text-green-600 text-sm mt-1">Uploaded: {formData.medicalRecords.name}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Review Your Information</h3>
                <div className="bg-muted/50 p-4 rounded-lg space-y-2 text-sm">
                  <p>
                    <strong>First Name:</strong> {formData.firstName}
                  </p>
                  <p>
                    <strong>Last Name:</strong> {formData.lastName}
                  </p>
                  <p>
                    <strong>Email:</strong> {formData.email}
                  </p>
                  <p>
                    <strong>Date of Birth:</strong> {formData.dateOfBirth}
                  </p>
                  <p>
                    <strong>Coverage Type:</strong> {formData.desiredCoverage}
                  </p>
                  <p>
                    <strong>Family Members:</strong> {formData.familyMembers}
                  </p>
                  {formData.optionalAddOns.length > 0 && (
                    <p>
                      <strong>Add-ons:</strong> {formData.optionalAddOns.join(", ")}
                    </p>
                  )}
                  {/* Add more fields as needed for review */}
                </div>
              </div>

              <div className="flex items-start space-x-2">
                <Checkbox
                  id="termsAccepted"
                  checked={formData.termsAccepted}
                  onCheckedChange={(checked) => setFormData({ ...formData, termsAccepted: checked as boolean })}
                />
                <Label
                  htmlFor="termsAccepted"
                  className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  I agree to the{" "}
                  <Link href="#" className="underline">
                    terms and conditions
                  </Link>{" "}
                  and{" "}
                  <Link href="#" className="underline">
                    privacy policy
                  </Link>
                  . *
                </Label>
              </div>
              {errors.termsAccepted && <p className="text-red-500 text-xs">{errors.termsAccepted}</p>}

              <div className="flex justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleSubmit}>Submit Registration</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
