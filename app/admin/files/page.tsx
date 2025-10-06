"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

// Demo-only local list. Replace with Supabase Storage integration
export default function AdminFilesPage() {
  const [files, setFiles] = useState<Array<{ name: string; size: number }>>([])

  function onUploadChange(list: FileList | null) {
    if (!list) return
    const arr = Array.from(list).map((f) => ({ name: f.name, size: f.size }))
    setFiles((prev) => [...arr, ...prev])
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">File Management</h1>
        <div className="flex items-center gap-2">
          <Input type="file" multiple onChange={(e) => onUploadChange(e.target.files)} />
          <Button disabled variant="outline">Upload</Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Files</CardTitle>
          <CardDescription>Demo list. Will connect to Supabase Storage next.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead className="text-right">Size (KB)</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((f, i) => (
                <TableRow key={`${f.name}-${i}`}>
                  <TableCell>{f.name}</TableCell>
                  <TableCell className="text-right">{Math.round(f.size / 1024)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
