"use client"

import { useState, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Upload, X, File, Image } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'

type UploadedFile = {
  filename: string
  originalName: string
  size: number
  type: string
  url: string
  folder: string
}

type FileUploadProps = {
  folder?: string
  accept?: string
  maxSize?: number // in MB
  multiple?: boolean
  onUpload?: (files: UploadedFile[]) => void
  className?: string
}

export function FileUpload({
  folder = 'general',
  accept = 'image/*,.pdf',
  maxSize = 10,
  multiple = false,
  onUpload,
  className = ''
}: FileUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    if (files.length === 0) return

    setUploading(true)
    const uploadedResults: UploadedFile[] = []

    try {
      for (const file of files) {
        // Validate file size
        if (file.size > maxSize * 1024 * 1024) {
          toast({
            title: 'File too large',
            description: `${file.name} exceeds ${maxSize}MB limit`,
            variant: 'destructive'
          })
          continue
        }

        const formData = new FormData()
        formData.append('file', file)
        formData.append('folder', folder)

        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        })

        if (response.ok) {
          const result = await response.json()
          uploadedResults.push(result)
          toast({
            title: 'Upload successful',
            description: `${file.name} uploaded successfully`
          })
        } else {
          const error = await response.json()
          toast({
            title: 'Upload failed',
            description: error.error || `Failed to upload ${file.name}`,
            variant: 'destructive'
          })
        }
      }

      const newFiles = [...uploadedFiles, ...uploadedResults]
      setUploadedFiles(newFiles)
      onUpload?.(uploadedResults)

    } catch (error) {
      toast({
        title: 'Upload error',
        description: 'An unexpected error occurred',
        variant: 'destructive'
      })
    } finally {
      setUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const removeFile = (index: number) => {
    const newFiles = uploadedFiles.filter((_, i) => i !== index)
    setUploadedFiles(newFiles)
  }

  const isImage = (type: string) => type.startsWith('image/')

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <Card className="border-dashed border-2 hover:border-primary/50 transition-colors">
        <CardContent className="p-6">
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <div className="space-y-2">
              <Button
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                variant="outline"
              >
                {uploading ? 'Uploading...' : 'Choose Files'}
              </Button>
              <p className="text-sm text-muted-foreground">
                {accept.includes('image') ? 'Images' : 'Files'} up to {maxSize}MB
                {multiple ? ' (multiple files allowed)' : ''}
              </p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept={accept}
            multiple={multiple}
            onChange={handleFileSelect}
            className="hidden"
          />
        </CardContent>
      </Card>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-medium">Uploaded Files</h4>
          <div className="grid gap-2">
            {uploadedFiles.map((file, index) => (
              <Card key={index} className="p-3">
                <div className="flex items-center gap-3">
                  {isImage(file.type) ? (
                    <div className="flex-shrink-0">
                      <img
                        src={file.url}
                        alt={file.originalName}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </div>
                  ) : (
                    <File className="w-12 h-12 text-muted-foreground" />
                  )}
                  
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{file.originalName}</p>
                    <p className="text-sm text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    {isImage(file.type) && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => window.open(file.url, '_blank')}
                      >
                        <Image className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => removeFile(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
