"use client"

import { motion, useAnimation, useMotionValue, useTransform } from "framer-motion"
import { useEffect } from "react"

type AnimatedCarProps = {
  height?: number
  speed?: number // seconds per loop
  pauseOnHover?: boolean
}

export function AnimatedCar({ height = 160, speed = 10, pauseOnHover = true }: AnimatedCarProps) {
  const controls = useAnimation()
  const x = useMotionValue(-100)
  const rotate = useTransform(x, [-100, 100], [-1.5, 1.5])

  useEffect(() => {
    let isMounted = true
    const run = async () => {
      // Ensure the component has mounted and the controls have subscribers
      await new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
      while (isMounted) {
        await controls.start({ x: "100%", transition: { duration: speed, ease: "linear" } })
        if (!isMounted) break
        await controls.set({ x: "-100%" })
      }
    }
    run()
    return () => {
      isMounted = false
      controls.stop()
    }
  }, [controls, speed])

  return (
    <div className="relative w-full" style={{ height }}>
      {/* Road */}
      <div className="absolute bottom-0 left-0 right-0 h-[36%] bg-gradient-to-b from-gray-700 to-gray-900">
        <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-yellow-300 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]"></div>
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1 bg-[repeating-linear-gradient(90deg,_transparent_0_24px,_white_24px_48px)] opacity-60"
          animate={{ x: [0, -48] }}
          transition={{ repeat: Infinity, duration: 0.6, ease: "linear" }}
        />
      </div>

      {/* Moving car */}
      <motion.div
        className="absolute bottom-[28%] left-0 w-64 max-w-[60%]"
        animate={controls}
        style={{ rotate }}
        whileHover={pauseOnHover ? { transition: { duration: 0.2 }, scale: 1.02 } : undefined}
      >
        <motion.svg
          width="100%"
          viewBox="0 0 320 160"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_8px_20px_rgba(0,0,0,0.35)]"
        >
          {/* body */}
          <motion.g initial={{ y: 0 }} animate={{ y: [0, -2, 0] }} transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}>
            <rect x="20" y="60" width="260" height="50" rx="12" fill="#2563eb" />
            <path d="M60 60 C80 20, 200 20, 240 60" fill="#2563eb" />
            <rect x="140" y="52" width="56" height="24" rx="4" fill="#93c5fd" />
            {/* headlight */}
            <g>
              <circle cx="270" cy="86" r="6" fill="#fde68a" />
              <motion.path
                d="M276 82 L316 74 L316 98 L276 90 Z"
                fill="url(#glow)"
                opacity={0.55}
                animate={{ opacity: [0.35, 0.6, 0.35] }}
                transition={{ repeat: Infinity, duration: 1.8 }}
              />
            </g>
            {/* smoke puffs */}
            <motion.circle cx="28" cy="88" r="4" fill="#cbd5e1" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: [0, 0.6, 0], x: [-12, -24], y: [-4, -12], scale: [0.6, 1.2] }} transition={{ repeat: Infinity, duration: 1.4 }} />
            <motion.circle cx="22" cy="92" r="3" fill="#e2e8f0" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: [0, 0.5, 0], x: [-8, -18], y: [-2, -8], scale: [0.6, 1.1] }} transition={{ repeat: Infinity, duration: 1.1, delay: 0.2 }} />
          </motion.g>

          {/* wheels */}
          <motion.g initial={false}>
            <motion.circle cx="96" cy="114" r="20" fill="#111827" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: speed / 2, ease: "linear" }} origin="96 114" />
            <circle cx="96" cy="114" r="10" fill="#6b7280" />
            <motion.circle cx="216" cy="114" r="20" fill="#111827" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: speed / 2, ease: "linear" }} origin="216 114" />
            <circle cx="216" cy="114" r="10" fill="#6b7280" />
          </motion.g>

          <defs>
            <linearGradient id="glow" x1="276" y1="86" x2="316" y2="86" gradientUnits="userSpaceOnUse">
              <stop stopColor="#fde68a" stopOpacity="0.7" />
              <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
            </linearGradient>
          </defs>
        </motion.svg>
      </motion.div>

      {/* sky elements */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[64%] bg-gradient-to-b from-sky-100/70 to-transparent dark:from-slate-700/40"
        aria-hidden
        animate={{ backgroundPositionX: ["0%", "100%"] }}
        transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
      />
      <motion.div
        className="absolute top-4 left-6 h-2 w-10 rounded-full bg-white/70"
        animate={{ x: [0, 10, 0], opacity: [0.8, 1, 0.8] }}
        transition={{ repeat: Infinity, duration: 2.4 }}
      />
      <motion.div
        className="absolute top-10 left-1/2 h-1.5 w-6 rounded-full bg-white/60"
        animate={{ x: [0, -8, 0], opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 2.1, delay: 0.3 }}
      />
    </div>
  )
}

