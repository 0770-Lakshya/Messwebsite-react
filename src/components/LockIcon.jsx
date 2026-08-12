import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

const jsonCache = new Map()

export function preloadLottie(src) {
  if (jsonCache.has(src)) return jsonCache.get(src)
  const promise = fetch(src)
    .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load icon: ' + src))))
    .then((data) => {
      jsonCache.set(src, Promise.resolve(data))
      return data
    })
    .catch((err) => {
      jsonCache.delete(src)
      throw err
    })
  jsonCache.set(src, promise)
  return promise
}

export default function LockIcon({
  src = '/lockicon.json',
  size = 96,
  loop = false,
  speed = 1,
  playing = true,
  className = '',
}) {
  const containerRef = useRef(null)
  const instanceRef = useRef(null)

  useEffect(() => {
    let raf = null
    const el = containerRef.current
    preloadLottie(src)
      .then((data) => {
        if (!el || !el.isConnected) return
        const instance = lottie.loadAnimation({
          container: el,
          renderer: 'svg',
          loop,
          autoplay: false,
          animationData: data,
          rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
        })
        instance.setSpeed(speed)
        if (playing) instance.play()
        instanceRef.current = instance
        // Ensure the rendered SVG always fills the box after layout settles.
        raf = requestAnimationFrame(() => {
          const svg = el && el.querySelector('svg')
          if (svg) {
            svg.style.width = '100%'
            svg.style.height = '100%'
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet')
          }
        })
      })
      .catch(() => {})
    return () => {
      if (raf) cancelAnimationFrame(raf)
      if (instanceRef.current) instanceRef.current.destroy()
      instanceRef.current = null
    }
  }, [src, loop, speed])

  useEffect(() => {
    const instance = instanceRef.current
    if (!instance) return
    if (playing) {
      instance.goToAndPlay(0)
    } else {
      instance.goToAndStop(0, true)
    }
  }, [playing])

  return (
    <div
      ref={containerRef}
      className={`lottie-lock inline-block align-middle ${className}`}
      style={{ width: size, height: size, overflow: 'hidden' }}
      aria-hidden="true"
    />
  )
}