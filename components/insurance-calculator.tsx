"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calculator } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"

export function InsuranceCalculator() {
  const [age, setAge] = useState(30)
  const [coverageType, setCoverageType] = useState("individual")
  const [annualCoverage, setAnnualCoverage] = useState(25000)
  const [addDental, setAddDental] = useState(false)
  const [addVision, setAddVision] = useState(false)
  const [premium, setPremium] = useState(0)

  const calculatePremium = () => {
    let basePremium = 0

    // Base premium based on age
    if (age < 30) {
      basePremium = 50
    } else if (age >= 30 && age < 50) {
      basePremium = 80
    } else {
      basePremium = 120
    }

    // Adjust for coverage type
    if (coverageType === "family") {
      basePremium *= 1.8
    }

    // Adjust for annual coverage limit
    if (annualCoverage === 50000) {
      basePremium += 30
    } else if (annualCoverage === 100000) {
      basePremium += 70
    }

    // Add-ons
    if (addDental) {
      basePremium += 15
    }
    if (addVision) {
      basePremium += 10
    }

    setPremium(Math.round(basePremium))
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calculator className="h-5 w-5" />
          Insurance Premium Calculator
        </CardTitle>
        <CardDescription>Estimate your monthly insurance premium.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
              min="18"
              max="99"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="coverage-type">Coverage Type</Label>
            <Select value={coverageType} onValueChange={setCoverageType}>
              <SelectTrigger id="coverage-type">
                <SelectValue placeholder="Select coverage type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          <Label htmlFor="annual-coverage">Annual Coverage Limit: ${annualCoverage.toLocaleString()}</Label>
          <Slider
            id="annual-coverage"
            min={25000}
            max={100000}
            step={25000}
            value={[annualCoverage]}
            onValueChange={(value) => setAnnualCoverage(value[0])}
            className="w-full"
          />
          <div className="flex justify-between text-sm text-gray-500">
            <span>$25,000</span>
            <span>$50,000</span>
            <span>$75,000</span>
            <span>$100,000</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Optional Add-ons</Label>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="dental"
                checked={addDental}
                onChange={(e) => setAddDental(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="dental">Dental Coverage</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="vision"
                checked={addVision}
                onChange={(e) => setAddVision(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <Label htmlFor="vision">Vision Coverage</Label>
            </div>
          </div>
        </div>

        <Button onClick={calculatePremium} className="w-full">
          Calculate Premium
        </Button>

        {premium > 0 && (
          <div className="mt-6 text-center">
            <h3 className="text-2xl font-bold text-gray-900">Estimated Monthly Premium:</h3>
            <p className="text-5xl font-extrabold text-blue-600 mt-2">${premium}</p>
            <p className="text-sm text-gray-500">This is an estimate. Final premium may vary.</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
