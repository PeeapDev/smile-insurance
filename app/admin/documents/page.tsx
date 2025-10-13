"use client"

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { FileUpload } from '@/components/file-upload'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { FileText, Image, Upload } from 'lucide-react'

type UploadedFile = {
  filename: string
  originalName: string
  size: number
  type: string
  url: string
  folder: string
}

export default function DocumentsPage() {
  const [claimFiles, setClaimFiles] = useState<UploadedFile[]>([])
  const [policyFiles, setPolicyFiles] = useState<UploadedFile[]>([])
  const [memberFiles, setMemberFiles] = useState<UploadedFile[]>([])

  const handleClaimUpload = (files: UploadedFile[]) => {
    setClaimFiles(prev => [...prev, ...files])
  }

  const handlePolicyUpload = (files: UploadedFile[]) => {
    setPolicyFiles(prev => [...prev, ...files])
  }

  const handleMemberUpload = (files: UploadedFile[]) => {
    setMemberFiles(prev => [...prev, ...files])
  }

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-3xl font-bold">Document Management</h1>
        <p className="text-muted-foreground">Upload and manage insurance documents</p>
      </div>

      <Tabs defaultValue="claims" className="space-y-4">
        <TabsList>
          <TabsTrigger value="claims" className="gap-2">
            <FileText className="h-4 w-4" />
            Claims
          </TabsTrigger>
          <TabsTrigger value="policies" className="gap-2">
            <FileText className="h-4 w-4" />
            Policies
          </TabsTrigger>
          <TabsTrigger value="members" className="gap-2">
            <Image className="h-4 w-4" />
            Member Photos
          </TabsTrigger>
        </TabsList>

        <TabsContent value="claims" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Claims Documents</CardTitle>
              <CardDescription>
                Upload claim forms, receipts, medical reports, and supporting documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                folder="claims"
                accept="image/*,.pdf,.doc,.docx"
                multiple={true}
                onUpload={handleClaimUpload}
              />
              
              {claimFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Recent Uploads ({claimFiles.length})</h4>
                  <div className="text-sm text-muted-foreground">
                    Files uploaded to claims folder
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="policies" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Policy Documents</CardTitle>
              <CardDescription>
                Upload policy certificates, terms & conditions, and amendments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                folder="policies"
                accept=".pdf,.doc,.docx"
                multiple={true}
                onUpload={handlePolicyUpload}
              />
              
              {policyFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Recent Uploads ({policyFiles.length})</h4>
                  <div className="text-sm text-muted-foreground">
                    Files uploaded to policies folder
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="members" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Member Photos</CardTitle>
              <CardDescription>
                Upload member profile photos and ID card images
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                folder="members"
                accept="image/*"
                multiple={true}
                maxSize={5}
                onUpload={handleMemberUpload}
              />
              
              {memberFiles.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Recent Uploads ({memberFiles.length})</h4>
                  <div className="grid grid-cols-4 gap-2 mt-2">
                    {memberFiles.slice(0, 8).map((file, index) => (
                      <img
                        key={index}
                        src={file.url}
                        alt={file.originalName}
                        className="w-full h-20 object-cover rounded border"
                      />
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Card>
        <CardHeader>
          <CardTitle>Storage Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div>
              <div className="font-medium">Claims Files</div>
              <div className="text-muted-foreground">{claimFiles.length} files uploaded</div>
            </div>
            <div>
              <div className="font-medium">Policy Files</div>
              <div className="text-muted-foreground">{policyFiles.length} files uploaded</div>
            </div>
            <div>
              <div className="font-medium">Member Photos</div>
              <div className="text-muted-foreground">{memberFiles.length} files uploaded</div>
            </div>
          </div>
          <div className="mt-4 p-3 bg-muted rounded-lg">
            <p className="text-sm">
              <strong>Storage Location:</strong> Files are stored in Docker volumes and persist across container restarts.
              Access files via: <code>/api/files/[folder]/[filename]</code>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
