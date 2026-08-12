import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'

export default function LockIcon({ src = '/lockicon.json', size = 96, loop = false, className = '' }) {
  const containerRef = useRef(null)

  useEffect(() => {
    let instance = null
    let raf = null
    fetch(src)
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error('Failed to load lock icon'))))
      .then((data) => {
        if (!containerRef.current) return
        instance = lottie.loadAnimation({
          container: containerRef.current,
          renderer: 'svg',
          loop,
          autoplay: true,
          animationData: data,
          rendererSettings: { preserveAspectRatio: 'xMidYMid meet' },
        })
        // Ensure the rendered SVG always fills the box after layout settles.
        raf = requestAnimationFrame(() => {
          const svg = containerRef.current && containerRef.current.querySelector('svg')
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
      if (instance) instance.destroy()
    }
  }, [src, loop])

  return (
    <div
      ref={containerRef}
      className={`lottie-lock inline-block align-middle ${className}`}
      style={{ width: size, height: size, overflow: 'hidden' }}
      aria-hidden="true"
    />
  )
}
