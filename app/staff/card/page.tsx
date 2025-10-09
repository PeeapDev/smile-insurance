"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { generateQrDataUrl } from "@/lib/qr"

// Demo staff data - in production, this would come from auth session
const staffData = {
  id: "STF001",
  name: "John Doe",
  role: "Staff Member",
  department: "Operations",
  email: "john.doe@smileinsurance.com",
  qrCode: "QR:staff-demo", // This matches the desktop app demo QR
  photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  joinDate: "2024"
}

export default function StaffCardPage() {
  const [qr, setQr] = useState<string>("")
  
  useEffect(() => {
    generateQrDataUrl(staffData.qrCode, { width: 200 }).then(setQr)
  }, [])

  const handleDownload = () => {
    // Create a canvas to render the ID card
    const card = document.getElementById('id-card')
    if (!card) return
    
    // You can use html2canvas library here for better quality
    // For now, just prompt user to screenshot
    alert('Please take a screenshot of your ID card (Cmd+Shift+4 on Mac, Win+Shift+S on Windows)')
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-100 to-slate-200">
      <div className="space-y-6 max-w-2xl w-full">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My ID Card</h1>
          <Button onClick={handleDownload} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Screenshot Guide
          </Button>
        </div>

        {/* Staff ID Card */}
        <div 
          id="id-card"
          className="relative w-full max-w-md mx-auto bg-gradient-to-br from-slate-700 to-slate-900 rounded-2xl shadow-2xl overflow-hidden"
          style={{ aspectRatio: '1.586/1' }}
        >
          {/* Header Bar */}
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">SMILE INSURANCE</h2>
                <p className="text-xs text-blue-100">Staff ID Card</p>
              </div>
              <div className="text-xs text-white text-right">
                <p>Member Since</p>
                <p className="font-bold">{staffData.joinDate}</p>
              </div>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-6 space-y-4">
            {/* Photo and Name */}
            <div className="flex items-center gap-4">
              <img 
                src={staffData.photo} 
                alt={staffData.name}
                className="w-20 h-20 rounded-lg border-2 border-slate-600"
              />
              <div className="flex-1">
                <p className="text-xs text-slate-400">STAFF</p>
                <h3 className="text-xl font-bold text-white">{staffData.name}</h3>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-slate-400">Staff ID</p>
                <p className="font-mono font-semibold text-white">{staffData.id}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Role</p>
                <p className="font-semibold text-white">{staffData.role}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Department</p>
                <p className="font-semibold text-white">{staffData.department}</p>
              </div>
              <div>
                <p className="text-xs text-slate-400">Email</p>
                <p className="text-xs font-semibold text-white truncate">{staffData.email}</p>
              </div>
            </div>

            {/* QR Code Section */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-700">
              <div className="flex-1">
                <p className="text-xs text-slate-400 mb-1">Scan for Login/Attendance</p>
                <p className="text-xs font-mono text-slate-500">{staffData.qrCode}</p>
              </div>
              {qr && (
                <div className="bg-white p-2 rounded-lg">
                  <img 
                    src={qr} 
                    alt="QR Code" 
                    className="w-24 h-24"
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-white rounded-lg p-4 shadow">
          <h3 className="font-semibold mb-2">How to use:</h3>
          <ol className="text-sm space-y-1 text-gray-600">
            <li>1. Take a screenshot of your ID card above</li>
            <li>2. Open the desktop app on your computer</li>
            <li>3. Click "Login" to open the camera</li>
            <li>4. Show your ID card QR code to the camera</li>
            <li>5. Enter password: <code className="bg-gray-100 px-2 py-0.5 rounded">staff123</code></li>
          </ol>
        </div>
      </div>
    </div>
  )
}
