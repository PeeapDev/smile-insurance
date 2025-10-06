"use client"

import { useMemo } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedCar } from "@/components/animated-car"
import { motion } from "framer-motion"
import { Car } from "lucide-react"

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number"),
  address: z.string().min(4, "Enter your address"),
  vehicleMake: z.string().min(1, "Required"),
  vehicleModel: z.string().min(1, "Required"),
  vehicleYear: z.coerce.number().int().min(1980).max(new Date().getFullYear()),
  registrationNumber: z.string().min(3, "Enter registration/plate number"),
  usage: z.enum(["private", "commercial"]),
  coverage: z.enum(["comprehensive", "thirdparty", "firetheft"]),
  sumInsured: z.coerce.number().positive("Enter a positive amount").optional(),
  startDate: z.string().min(4, "Select a start date"),
  roadside: z.boolean().optional(),
  windscreen: z.boolean().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export default function MotorSignupPage() {
  const router = useRouter()
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      usage: "private",
      coverage: "comprehensive",
      roadside: true,
      windscreen: false,
    },
  })

  const currentYear = useMemo(() => new Date().getFullYear(), [])

  const onSubmit = (values: FormValues) => {
    // Demo: persist locally and navigate to success
    try {
      const drafts = JSON.parse(localStorage.getItem("motor_signups") || "[]")
      drafts.push({ ...values, createdAt: new Date().toISOString() })
      localStorage.setItem("motor_signups", JSON.stringify(drafts))
    } catch {}
    const name = encodeURIComponent(values.fullName)
    router.push(`/motor/success?name=${name}`)
  }

  return (
    <div className="container mx-auto px-4 py-10 space-y-8">
      <section className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
        <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 w-max">
              <Car className="h-4 w-4" /> Motor Insurance Signup
            </div>
            <h1 className="mt-3 text-3xl font-bold">Get Your Motor Insurance in Minutes</h1>
            <p className="text-muted-foreground">Fill in your vehicle and personal details. We’ll generate a quote and follow up instantly.</p>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.5 }}>
            <AnimatedCar height={180} speed={9} />
          </motion.div>
        </div>
      </section>

      <Card>
        <CardHeader>
          <CardTitle>Signup Form</CardTitle>
          <CardDescription>Provide your details to start your policy application.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6 md:grid-cols-2">
              <FormField name="fullName" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl><Input placeholder="John Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="email" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl><Input type="email" placeholder="john@example.com" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="phone" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl><Input placeholder="+232 77 000000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="address" control={form.control} render={({ field }) => (
                <FormItem className="md:col-span-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl><Input placeholder="123 Main St, Freetown" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="vehicleMake" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Make</FormLabel>
                  <FormControl><Input placeholder="Toyota" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="vehicleModel" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Model</FormLabel>
                  <FormControl><Input placeholder="Corolla" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="vehicleYear" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle Year</FormLabel>
                  <FormControl><Input type="number" placeholder={`${currentYear - 5}`} {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="registrationNumber" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number</FormLabel>
                  <FormControl><Input placeholder="ABC-1234" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="usage" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Usage</FormLabel>
                  <RadioGroup className="flex gap-4" value={field.value} onValueChange={field.onChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="private" id="u1" />
                      <label htmlFor="u1">Private</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="commercial" id="u2" />
                      <label htmlFor="u2">Commercial</label>
                    </div>
                  </RadioGroup>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="coverage" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Coverage</FormLabel>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select coverage" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive</SelectItem>
                      <SelectItem value="thirdparty">Third‑Party Only</SelectItem>
                      <SelectItem value="firetheft">Fire & Theft</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="sumInsured" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Sum Insured (optional)</FormLabel>
                  <FormControl><Input type="number" placeholder="e.g. 500000" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField name="startDate" control={form.control} render={({ field }) => (
                <FormItem>
                  <FormLabel>Start Date</FormLabel>
                  <FormControl><Input type="date" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="roadside" control={form.control} render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel>Roadside Assistance</FormLabel>
                    <p className="text-sm text-muted-foreground">Optional add‑on for breakdown support</p>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="windscreen" control={form.control} render={({ field }) => (
                <FormItem className="flex items-center space-x-3">
                  <FormControl>
                    <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                  </FormControl>
                  <div className="space-y-0.5">
                    <FormLabel>Windscreen Cover</FormLabel>
                    <p className="text-sm text-muted-foreground">Covers windscreen damage/replacement</p>
                  </div>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField name="notes" control={form.control} render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl><Textarea placeholder="Any special info about the vehicle or usage..." {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <div className="md:col-span-2 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => form.reset()}>Reset</Button>
                <Button type="submit" size="lg">Submit Application</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
