import { useEffect, useRef, useState } from 'react'
import { Player } from '@lordicon/react'

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
  const playerRef = useRef(null)
  const [data, setData] = useState(null)
  const playingRef = useRef(playing)
  playingRef.current = playing

  useEffect(() => {
    let active = true
    preloadLottie(src)
      .then((d) => {
        if (active) setData(d)
      })
      .catch(() => {})
    return () => {
      active = false
    }
  }, [src])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    const lottie = player._lottie
    if (lottie) {
      lottie.loop = loop
      lottie.setSpeed(speed)
    }
  }, [loop, speed, data])

  useEffect(() => {
    const player = playerRef.current
    if (!player) return
    if (playingRef.current) {
      if (loop) {
        player.play()
      } else {
        player.playFromBeginning()
      }
    } else {
      player.goToFirstFrame()
    }
  }, [playing, loop, data])

  if (!data) {
    return <span className={className} style={{ width: size, height: size }} aria-hidden="true" />
  }

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ width: size, height: size, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <Player ref={playerRef} icon={data} size={size} onComplete={() => {
        if (loop) {
          playerRef.current?.playFromBeginning()
        }
      }} />
    </span>
  )
}