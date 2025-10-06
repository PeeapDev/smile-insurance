"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { MapPin, Search, Star, Phone, Clock, Calendar, Stethoscope, Heart, Eye, Pill, Building } from 'lucide-react'

export default function ProviderPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")

  const providers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialty: "Cardiology",
      type: "Specialist",
      rating: 4.9,
      reviews: 156,
      distance: "1.2 miles",
      address: "123 Medical Center Dr, Suite 200",
      phone: "(555) 123-4567",
      acceptingPatients: true,
      nextAvailable: "Tomorrow",
      image: "/placeholder.svg?height=80&width=80",
      hospital: "City General Hospital",
      languages: ["English", "Spanish"],
      insuranceAccepted: true,
    },
    {
      id: 2,
      name: "Metro Urgent Care",
      specialty: "Urgent Care",
      type: "Facility",
      rating: 4.6,
      reviews: 89,
      distance: "0.8 miles",
      address: "456 Main Street",
      phone: "(555) 987-6543",
      acceptingPatients: true,
      nextAvailable: "Walk-ins welcome",
      image: "/placeholder.svg?height=80&width=80",
      hospital: "Metro Health Network",
      languages: ["English"],
      insuranceAccepted: true,
    },
    {
      id: 3,
      name: "Dr. Michael Chen",
      specialty: "Primary Care",
      type: "Primary Care Physician",
      rating: 4.8,
      reviews: 203,
      distance: "2.1 miles",
      address: "789 Health Plaza, Floor 3",
      phone: "(555) 456-7890",
      acceptingPatients: true,
      nextAvailable: "Next week",
      image: "/placeholder.svg?height=80&width=80",
      hospital: "Community Health Center",
      languages: ["English", "Mandarin"],
      insuranceAccepted: true,
    },
    {
      id: 4,
      name: "Vision Plus Center",
      specialty: "Ophthalmology",
      type: "Specialist",
      rating: 4.7,
      reviews: 124,
      distance: "1.5 miles",
      address: "321 Eye Care Blvd",
      phone: "(555) 321-0987",
      acceptingPatients: true,
      nextAvailable: "This week",
      image: "/placeholder.svg?height=80&width=80",
      hospital: "Vision Care Network",
      languages: ["English"],
      insuranceAccepted: true,
    },
    {
      id: 5,
      name: "City General Hospital",
      specialty: "Hospital",
      type: "Hospital",
      rating: 4.5,
      reviews: 445,
      distance: "2.3 miles",
      address: "100 Hospital Way",
      phone: "(555) 100-2000",
      acceptingPatients: true,
      nextAvailable: "Emergency 24/7",
      image: "/placeholder.svg?height=80&width=80",
      hospital: "City General Hospital",
      languages: ["English", "Spanish", "French"],
      insuranceAccepted: true,
    },
  ]

  const specialties = [
    { value: "all", label: "All Specialties" },
    { value: "primary-care", label: "Primary Care" },
    { value: "cardiology", label: "Cardiology" },
    { value: "urgent-care", label: "Urgent Care" },
    { value: "ophthalmology", label: "Ophthalmology" },
    { value: "hospital", label: "Hospital" },
  ]

  const getSpecialtyIcon = (specialty: string) => {
    switch (specialty.toLowerCase()) {
      case "cardiology":
        return Heart
      case "ophthalmology":
        return Eye
      case "primary care":
        return Stethoscope
      case "urgent care":
        return Clock
      case "hospital":
        return Building
      default:
        return Stethoscope
    }
  }

  const filteredProviders = providers.filter((provider) => {
    const matchesSearch =
      provider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      provider.hospital.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSpecialty =
      selectedSpecialty === "all" || provider.specialty.toLowerCase().replace(/\s+/g, "-") === selectedSpecialty
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Find Providers</h1>
          <p className="text-muted-foreground">Search for in-network healthcare providers near you</p>
        </div>
        <Button variant="outline">
          <MapPin className="w-4 h-4 mr-2" />
          Change Location
        </Button>
      </div>

      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by provider name, specialty, or hospital..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Select specialty" />
              </SelectTrigger>
              <SelectContent>
                {specialties.map((specialty) => (
                  <SelectItem key={specialty.value} value={specialty.value}>
                    {specialty.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Distance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any distance</SelectItem>
                <SelectItem value="5">Within 5 miles</SelectItem>
                <SelectItem value="10">Within 10 miles</SelectItem>
                <SelectItem value="25">Within 25 miles</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        {filteredProviders.map((provider) => {
          const SpecialtyIcon = getSpecialtyIcon(provider.specialty)
          return (
            <Card key={provider.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-shrink-0">
                    <img
                      src={provider.image || "/placeholder.svg?height=80&width=80&query=doctor"}
                      alt={provider.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-xl font-semibold">{provider.name}</h3>
                          {provider.acceptingPatients && (
                            <Badge variant="default" className="text-xs">
                              Accepting Patients
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground mb-1">
                          <SpecialtyIcon className="w-4 h-4" />
                          <span>{provider.specialty}</span>
                          <span>•</span>
                          <span>{provider.type}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{provider.hospital}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium">{provider.rating}</span>
                          <span className="text-sm text-muted-foreground">({provider.reviews})</span>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{provider.distance}</p>
                          <p className="text-muted-foreground">{provider.address}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{provider.phone}</p>
                          <p className="text-muted-foreground">Call for appointment</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{provider.nextAvailable}</p>
                          <p className="text-muted-foreground">Next available</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {provider.languages.map((language) => (
                        <Badge key={language} variant="outline" className="text-xs">
                          {language}
                        </Badge>
                      ))}
                      {provider.insuranceAccepted && (
                        <Badge variant="default" className="text-xs">
                          Insurance Accepted
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline">View Details</Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-2xl">
                          <DialogHeader>
                            <DialogTitle>{provider.name}</DialogTitle>
                            <DialogDescription>
                              {provider.specialty} • {provider.hospital}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="font-medium">Address</p>
                                <p className="text-muted-foreground">{provider.address}</p>
                              </div>
                              <div>
                                <p className="font-medium">Phone</p>
                                <p className="text-muted-foreground">{provider.phone}</p>
                              </div>
                              <div>
                                <p className="font-medium">Distance</p>
                                <p className="text-muted-foreground">{provider.distance}</p>
                              </div>
                              <div>
                                <p className="font-medium">Rating</p>
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span>
                                    {provider.rating} ({provider.reviews} reviews)
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div>
                              <p className="font-medium">Languages</p>
                              <p className="text-muted-foreground">{provider.languages.join(", ")}</p>
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>

                      <Button>
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>

                      <Button variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {filteredProviders.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Providers Found</h3>
            <p className="text-muted-foreground">Try adjusting your search criteria or expanding your search area</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Clock className="w-6 h-6" />
              Find Urgent Care
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Building className="w-6 h-6" />
              Locate Hospital
            </Button>
            <Button variant="outline" className="h-20 flex-col gap-2">
              <Pill className="w-6 h-6" />
              Find Pharmacy
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
