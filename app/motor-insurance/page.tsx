"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Car, Shield, Sparkles } from "lucide-react"
import { AnimatedCar } from "@/components/animated-car"
import { motion } from "framer-motion"

export default function MotorInsuranceLandingPage() {
  return (
    <div className="container mx-auto px-4 py-10 space-y-10">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
        <motion.div
          className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)] pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute -left-16 -top-20 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
          <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10">
          <motion.header
            className="flex flex-col justify-center text-center md:text-left"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center justify-center md:justify-start gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-950/40 dark:text-blue-300">
              <Car className="h-4 w-4" /> Motor Insurance
            </div>
            <h1 className="mt-3 text-4xl font-bold">Protect Your Vehicle with Confidence</h1>
            <p className="mt-2 text-muted-foreground max-w-2xl md:max-w-none">
              Choose from Comprehensive, Third‑Party, or Fire & Theft cover. Quick quotes, instant digital policy, and optional roadside assistance.
            </p>
            <div className="mt-4 flex gap-3 justify-center md:justify-start">
              <Link href="/motor">
                <Button size="lg" className="gap-2"><Shield className="h-4 w-4"/> Get a Motor Quote</Button>
              </Link>
              <Link href="/register">
                <Button size="lg" variant="outline" className="gap-2 bg-transparent"><Sparkles className="h-4 w-4"/> Create Account</Button>
              </Link>
            </div>
          </motion.header>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <AnimatedCar height={200} speed={8} />
          </motion.div>
        </div>
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Comprehensive</CardTitle>
            <CardDescription>Maximum protection for your vehicle</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>Own damage + third party liability</li>
              <li>Fire, theft, vandalism, and weather</li>
              <li>Personal accident cover</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Third‑Party Only</CardTitle>
            <CardDescription>Meets legal requirements at a low cost</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>Injury and property damage to others</li>
              <li>Fast digital issuance</li>
              <li>Ideal for older vehicles</li>
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Fire & Theft</CardTitle>
            <CardDescription>Focused protection for key risks</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 text-sm text-muted-foreground space-y-2">
              <li>Fire and (attempted) theft</li>
              <li>Optional roadside assistance</li>
              <li>Flexible add‑ons</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
        <Card className="bg-blue-600 text-white border-0">
          <CardContent className="py-10 text-center space-y-3">
            <h2 className="text-2xl font-semibold">Ready to drive with peace of mind?</h2>
            <p className="text-blue-100">Create your first motor policy in minutes.</p>
            <Link href="/motor">
              <Button size="lg" variant="secondary">Start Now</Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
