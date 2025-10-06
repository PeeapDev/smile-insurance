"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import jsQR from "jsqr"

export type DetectorType = "barcode" | "jsqr" | "none"

export function parseScanned(url: string) {
  try {
    const a = document.createElement("a")
    a.href = url
    const parts = a.pathname.split("/").filter(Boolean)
    const [verify, type, id] = parts
    if (verify !== "verify" || !type || !id) return null
    return { type, id }
  } catch {
    return null
  }
}

export function useQrScanner() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number | null>(null)
  const [cameraReady, setCameraReady] = useState(false)
  const [detector, setDetector] = useState<DetectorType>("none")

  const stop = useCallback(() => {
    const stream = videoRef.current?.srcObject as MediaStream | undefined
    stream?.getTracks().forEach((t) => t.stop())
    if (videoRef.current) videoRef.current.srcObject = null
    setCameraReady(false)
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
  }, [])

  useEffect(() => () => stop(), [stop])

  const start = useCallback(async (onDecode: (raw: string) => void) => {
    try {
      // @ts-ignore
      const supported = "BarcodeDetector" in window
      setDetector(supported ? "barcode" : "jsqr")
      const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" }, audio: false })
      if (videoRef.current) {
        videoRef.current.srcObject = stream
        await videoRef.current.play()
        setCameraReady(true)
      }
      const el = videoRef.current
      if (!el) return

      if (supported) {
        // @ts-ignore
        const det = new window.BarcodeDetector({ formats: ["qr_code"] })
        const tick = async () => {
          try {
            // @ts-ignore
            const bitmap = await createImageBitmap(el)
            const codes = await det.detect(bitmap)
            if (codes && codes.length > 0) onDecode(String(codes[0].rawValue || ""))
          } catch {}
          rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
      } else {
        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        const tick = () => {
          try {
            const w = el.videoWidth || 640
            const h = el.videoHeight || 360
            if (w && h && ctx) {
              canvas.width = w; canvas.height = h
              ctx.drawImage(el, 0, 0, w, h)
              const img = ctx.getImageData(0, 0, w, h)
              const code = jsQR(img.data, w, h)
              if (code && code.data) onDecode(code.data)
            }
          } catch {}
          rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
      }
    } catch (e) {
      setDetector("none")
      throw e
    }
  }, [])

  return { videoRef, canvasRef, start, stop, detectorType: detector, cameraReady }
}
