"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, Phone, Building2 } from "lucide-react"
import { generateQrDataUrl } from "@/lib/qr"

// Demo staff data - in production, this would come from auth session
const staffData = {
  id: "STF001",
  name: "John Doe",
  role: "Staff Member",
  department: "Operations",
  email: "john.doe@smileinsurance.com",
  phone: "+1 (555) 000-1234",
  company: "SMILE Insurance Medicare",
  qrCode: "QR:staff-demo", // This matches the desktop app demo QR
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  joinDate: "2024",
  status: "Active"
}

export default function StaffProfilePage() {
  const [qr, setQr] = useState<string>("")
  
  useEffect(() => {
    generateQrDataUrl(staffData.qrCode, { width: 200 }).then(setQr)
  }, [])

  const handleScreenshotGuide = () => {
    alert('To use your ID card:\n\n1. Take a screenshot (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)\n2. Open the desktop app\n3. Click "Login" to open camera\n4. Show your ID card QR code\n5. Enter password: staff123')
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile</h1>
          <p className="text-muted-foreground">Manage your account information</p>
        </div>
        <Button onClick={handleScreenshotGuide} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Screenshot Guide
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Left Column - Profile Info */}
        <div className="space-y-6">
          {/* Basic Info Card */}
          <Card>
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="h-20 w-20 rounded-full bg-muted flex items-center justify-center overflow-hidden">
                  <img src={staffData.photo} alt={staffData.name} className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <CardTitle>{staffData.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{staffData.role}</p>
                  <Badge variant="outline" className="mt-1 text-green-600">
                    {staffData.status}
                  </Badge>
                  <p className="text-xs text-muted-foreground mt-1">Joined {staffData.joinDate}-01-12</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{staffData.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>{staffData.phone}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Building2 className="h-4 w-4 text-muted-foreground" />
                <span>{staffData.company}</span>
              </div>
            </CardContent>
          </Card>

          {/* Personal Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Details</CardTitle>
              <p className="text-sm text-muted-foreground">Update your contact information</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Full Name</label>
                  <p className="text-sm text-muted-foreground mt-1">{staffData.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <p className="text-sm text-muted-foreground mt-1">{staffData.email}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Phone</label>
                  <p className="text-sm text-muted-foreground mt-1">{staffData.phone}</p>
                </div>
                <div>
                  <label className="text-sm font-medium">Company</label>
                  <p className="text-sm text-muted-foreground mt-1">{staffData.company}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <p className="text-sm text-muted-foreground">Last updates you made</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Updated member profile</span>
                  <span className="ml-auto text-xs text-muted-foreground">2025-08-08</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Approved claim #A1247</span>
                  <span className="ml-auto text-xs text-muted-foreground">2025-08-04</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="h-2 w-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">Generated monthly report</span>
                  <span className="ml-auto text-xs text-muted-foreground">2025-08-01</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - ID Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>My ID Card</CardTitle>
              <p className="text-sm text-muted-foreground">Use this for login and attendance</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* ID Card - Front */}
              <div 
                id="id-card-front"
                className="relative w-full bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl shadow-xl overflow-hidden"
                style={{ aspectRatio: '1.586/1' }}
              >
                {/* Header */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h2 className="text-lg font-bold text-white">SMILE INSURANCE</h2>
                    <p className="text-xs text-blue-100">Staff ID Card</p>
                  </div>
                  <div className="text-xs text-white text-right">
                    <p className="text-blue-100">Member Since</p>
                    <p className="font-bold">{staffData.joinDate}</p>
                  </div>
                </div>

                {/* Chip Icon */}
                <div className="px-4">
                  <div className="inline-flex items-center gap-2">
                    <div className="w-10 h-8 bg-yellow-400 rounded-md" />
                    <div className="text-white">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Staff Info */}
                <div className="px-4 pt-4 space-y-2">
                  <div>
                    <p className="text-xs text-blue-100">STAFF</p>
                    <h3 className="text-xl font-bold text-white">{staffData.name}</h3>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                    <div>
                      <p className="text-xs text-blue-100">Staff ID</p>
                      <p className="font-mono font-semibold text-white">{staffData.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-100">Role</p>
                      <p className="font-semibold text-white">{staffData.role}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-100">Department</p>
                      <p className="font-semibold text-white">{staffData.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-blue-100">Email</p>
                      <p className="text-xs font-semibold text-white truncate">{staffData.email.split('@')[0]}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ID Card - Back */}
              <div 
                id="id-card-back"
                className="relative w-full bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-xl overflow-hidden p-6"
                style={{ aspectRatio: '1.586/1' }}
              >
                <div className="h-full flex flex-col">
                  {/* Magnetic Strip */}
                  <div className="w-full h-12 bg-slate-800 -mx-6 mb-6" />

                  {/* QR Code and Info */}
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex-1 space-y-2">
                      <div>
                        <p className="text-xs text-slate-400">Staff ID</p>
                        <p className="font-mono font-semibold text-white text-lg">{staffData.id}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-400">Role</p>
                        <p className="font-semibold text-white">{staffData.role}</p>
                      </div>
                      <div className="pt-4">
                        <p className="text-xs text-slate-400 mb-1">Scan for Login/Attendance</p>
                        <p className="text-xs font-mono text-slate-500">{staffData.qrCode}</p>
                      </div>
                    </div>
                    
                    {qr && (
                      <div className="bg-white p-3 rounded-lg">
                        <img 
                          src={qr} 
                          alt="QR Code" 
                          className="w-32 h-32"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Instructions */}
              <div className="bg-muted rounded-lg p-4">
                <h3 className="font-semibold mb-2 text-sm">How to use:</h3>
                <ol className="text-xs space-y-1 text-muted-foreground">
                  <li>1. Take a screenshot of your ID card above</li>
                  <li>2. Open the desktop app on your computer</li>
                  <li>3. Click "Login" to open the camera</li>
                  <li>4. Show your ID card QR code to the camera</li>
                  <li>5. Enter password: <code className="bg-background px-2 py-0.5 rounded">staff123</code></li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
