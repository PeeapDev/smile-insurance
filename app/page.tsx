"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Heart, Users, Calculator, Star, Car } from "lucide-react"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { InsuranceCalculator } from "@/components/insurance-calculator"
import { ChatWidget } from "@/components/chat-widget"
import { motion, useScroll, useTransform } from "framer-motion"
import { Particles } from "@/components/particles"
import { AnimatedCar } from "@/components/animated-car"

const features = [
  {
    icon: Shield,
    title: "Comprehensive Coverage",
    description: "Full protection for you and your family with our extensive healthcare plans.",
  },
  {
    icon: Heart,
    title: "Wellness Programs",
    description: "Preventive care and wellness initiatives to keep you healthy and active.",
  },
  {
    icon: Users,
    title: "Family Plans",
    description: "Affordable family coverage options that grow with your needs.",
  },
  {
    icon: Calculator,
    title: "Cost Calculator",
    description: "Estimate your premiums and out-of-pocket costs with our interactive tool.",
  },
]

const testimonials = [
  {
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content:
      "SMILE Insurance has been a lifesaver for my family. The coverage is comprehensive and the customer service is outstanding.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "Retiree",
    content: "The Medicare supplement plans are exactly what I needed. Easy to understand and great value for money.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Working Parent",
    content:
      "Having reliable health insurance gives me peace of mind. The family plans are affordable and cover everything we need.",
    rating: 5,
  },
]

export default function HomePage() {
  const { scrollY } = useScroll()
  const heroY = useTransform(scrollY, [0, 400], [0, -80])
  const blobScale = useTransform(scrollY, [0, 600], [1, 1.15])

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800">
      {/* Particles background */}
      <Particles className="pointer-events-none absolute inset-0 -z-10 h-full w-full" quantity={80} color="#60a5fa" opacity={0.25} />
      {/* Animated colorful background blobs */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-32 h-96 w-96 rounded-full bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 opacity-30 blur-3xl dark:opacity-40"
        style={{ scale: blobScale }}
        initial={{ rotate: 0 }}
        animate={{ rotate: 360, filter: ["hue-rotate(0deg)", "hue-rotate(90deg)", "hue-rotate(180deg)", "hue-rotate(0deg)"] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 opacity-30 blur-3xl dark:opacity-40"
        style={{ scale: blobScale }}
        initial={{ rotate: 0 }}
        animate={{ rotate: -360, filter: ["hue-rotate(0deg)", "hue-rotate(120deg)", "hue-rotate(240deg)", "hue-rotate(0deg)"] }}
        transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
      />
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-2xl font-bold text-gray-900 dark:text-white">SMILE Insurance</span>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <Link href="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center relative z-10">
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ y: heroY }}
          transition={{ duration: 0.6 }}
        >
          <Badge className="mb-4" variant="secondary">
            Trusted by 50,000+ Members
          </Badge>
          <motion.h1
            className="text-5xl font-bold text-gray-900 dark:text-white mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            Healthcare Coverage You Can <span className="text-blue-600">Trust</span>
          </motion.h1>
          <motion.p
            className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Comprehensive Medicare and health insurance solutions designed to protect you and your loved ones. Get the
            coverage you deserve with SMILE Insurance.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link href="/register">
              <Button size="lg" className="w-full sm:w-auto">
                Get Your Quote
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Member Portal
              </Button>
            </Link>
          </motion.div>

          {/* Image placeholders */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <motion.div
              className="relative h-56 rounded-xl border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="absolute inset-0 grid place-items-center text-gray-500 dark:text-gray-300">
                Image Placeholder
              </div>
            </motion.div>
            <motion.div
              className="relative h-56 rounded-xl border border-white/20 bg-white/60 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              <div className="absolute inset-0 grid place-items-center text-gray-500 dark:text-gray-300">
                Image Placeholder
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Why Choose SMILE Insurance?</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We provide comprehensive healthcare solutions with personalized service and competitive rates.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.08, duration: 0.4 }}
            >
              <Card className="text-center hover:shadow-xl transition-all">
                <CardHeader>
                  <feature.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Motor Insurance Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="mb-12">
          <div className="relative overflow-hidden rounded-2xl border bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-slate-800 dark:to-slate-900">
            <div className="absolute inset-0 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)] pointer-events-none">
              <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-400/20 blur-3xl" />
              <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-400/20 blur-3xl" />
            </div>
            <div className="grid md:grid-cols-2 gap-6 p-6 md:p-10">
              <div className="flex flex-col justify-center text-center md:text-left">
                <div className="inline-flex items-center justify-center md:justify-start gap-2 mb-3">
                  <Car className="h-6 w-6 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700 dark:text-blue-300">Motor Insurance</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
                  Drive with Confidence
                </h2>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  Comprehensive, Third‑Party, and Fire & Theft cover with fast digital issuance. Optional roadside assistance available.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3 md:justify-start justify-center">
                  <Link href="/motor-insurance">
                    <Button size="lg">Explore Motor Insurance</Button>
                  </Link>
                  <Link href="/register">
                    <Button size="lg" variant="outline" className="bg-transparent">Create Account</Button>
                  </Link>
                </div>
              </div>
              <div className="relative">
                <AnimatedCar height={180} speed={9} />
              </div>
            </div>
          </div>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Comprehensive</CardTitle>
              <CardDescription>Accidental damage, theft, fire, vandalism, and more</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                <li>Own damage + third-party liability</li>
                <li>Personal accident cover</li>
                <li>Optional windscreen and accessories</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Third-Party Only</CardTitle>
              <CardDescription>Budget-friendly legal liability protection</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                <li>Injury and property damage to others</li>
                <li>Meets regulatory requirements</li>
                <li>Easy online issuance</li>
              </ul>
            </CardContent>
          </Card>
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle>Fire & Theft</CardTitle>
              <CardDescription>Focused cover for specific high-risk events</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                <li>Fire, theft and attempted theft</li>
                <li>Optional roadside assistance</li>
                <li>Flexible add-ons</li>
              </ul>
            </CardContent>
          </Card>
        </div>
        <div className="text-center mt-8">
          <Link href="/motor-insurance">
            <Button size="lg">Explore Motor Insurance</Button>
          </Link>
        </div>
      </section>

      {/* Insurance Calculator Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">Calculate Your Premium</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Get an instant estimate of your insurance costs with our interactive calculator.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <InsuranceCalculator />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">What Our Members Say</h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied members have to say.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                <CardDescription>{testimonial.role}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 italic">"{testimonial.content}"</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16">
        <Card className="bg-blue-600 text-white border-0">
          <CardContent className="text-center py-12">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              Join thousands of satisfied members who trust SMILE Insurance for their healthcare needs. Get your
              personalized quote today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto">
                  Get Your Quote Now
                </Button>
              </Link>
              <Link href="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
                >
                  Access Member Portal
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 SMILE Insurance. All rights reserved.</p>
          <p className="mt-2">Comprehensive healthcare coverage you can trust.</p>
        </div>
      </footer>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  )
}
