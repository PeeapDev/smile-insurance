"use client"

import Link from "next/link"
import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2 } from "lucide-react"

function SuccessInner() {
  const params = useSearchParams()
  const name = params.get("name") || "Your application"

  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-2xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-2 h-12 w-12 rounded-full bg-green-100 text-green-700 grid place-items-center">
            <CheckCircle2 className="h-7 w-7" />
          </div>
          <CardTitle>Submitted Successfully</CardTitle>
          <CardDescription>
            {name} has been received. We'll review and send your quote shortly.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center gap-3">
          <Link href="/motor">
            <Button>Submit Another</Button>
          </Link>
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}

export default function MotorSignupSuccessPage() {
  return (
    <Suspense fallback={<div className="container mx-auto px-4 py-12">Loading...</div>}>
      <SuccessInner />
    </Suspense>
  )
}
