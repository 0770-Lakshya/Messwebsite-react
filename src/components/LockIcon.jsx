import { useCallback, useEffect, useRef, useState } from 'react'
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

  const applyState = useCallback(() => {
    const player = playerRef.current
    if (!player) return
    const lottie = player._lottie
    if (lottie) {
      lottie.loop = loop
      lottie.setSpeed(speed)
    }
    if (playingRef.current) {
      if (loop) {
        player.play()
      } else {
        player.playFromBeginning()
      }
    } else {
      player.goToFirstFrame()
    }
  }, [loop, speed])

  // Apply immediately when props/data change.
  useEffect(() => {
    applyState()
  }, [applyState, playing, data])

  // Self-heal: the Player creates its animation with loop=false and
  // autoplay=false, and React StrictMode remounts can leave a freshly
  // re-created instance paused at frame 0 (applyState runs before the ref is
  // valid). Keep loop and speed in sync until it is actually playing.
  useEffect(() => {
    if (!data) return
    const id = setInterval(() => {
      const player = playerRef.current
      if (!player || !player._lottie) return
      const lottie = player._lottie
      if (lottie.loop !== loop) {
        lottie.loop = loop
      }
      if (lottie.playSpeed !== speed) {
        lottie.setSpeed(speed)
      }
      if (playingRef.current && lottie.isPaused) {
        if (loop) {
          player.play()
        } else if (lottie.currentFrame === 0) {
          player.playFromBeginning()
        }
      }
    }, 250)
    return () => clearInterval(id)
  }, [data, loop, speed])

  const containerStyle = {
    width: size,
    height: size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    verticalAlign: 'middle',
  }

  if (!data) {
    return <span className={className} style={containerStyle} aria-hidden="true" />
  }

  return (
    <span
      ref={containerRef}
      className={className}
      style={{ ...containerStyle, overflow: 'hidden' }}
      aria-hidden="true"
    >
      <Player
        ref={playerRef}
        icon={data}
        size={size}
        onReady={applyState}
        onComplete={() => {
          if (loop) {
            playerRef.current?.playFromBeginning()
          }
        }}
      />
    </span>
  )
}
