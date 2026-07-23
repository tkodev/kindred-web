'use client'

import { useEffect, useRef, useState } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva(
    'inline-block tabular-nums transition-[filter,opacity,transform] duration-700 ease-[cubic-bezier(0,0,0.2,1)]',
    {
      variants: {
        hidden: {
          true: 'scale-90 opacity-0 blur-md',
          false: 'blur-0 scale-100 opacity-100'
        }
      },
      defaultVariants: { hidden: false }
    }
  )
}

type ScoreRevealProps = VariantProps<typeof styles.root> & {
  /** The final whole-number score to reveal. */
  value: number
  /** Run the count-up and blur-in when mounted; when false the value shows immediately. */
  active?: boolean
  /** Milliseconds the count-up runs. */
  duration?: number
  className?: string
}

/** A score that counts up from zero and sharpens from a blur on reveal; honors reduced motion. */
const ScoreReveal = (props: ScoreRevealProps) => {
  // props
  const { value, active = true, duration = 900, className } = props

  // hooks
  const [display, setDisplay] = useState(active ? 0 : value)
  const [entered, setEntered] = useState(!active)
  const raf = useRef(0)

  useEffect(() => {
    // The idle case (`active === false`) already shows the final value via initial state.
    if (!active) return undefined

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      // Jump straight to the final value on the next frame (no count-up, no blur).
      const settle = requestAnimationFrame(() => {
        setDisplay(value)
        setEntered(true)
      })
      return () => cancelAnimationFrame(settle)
    }

    // Next frame: flip to the sharp/opaque state so the CSS transition plays.
    const enter = requestAnimationFrame(() => setEntered(true))

    // Count up with an ease-out curve.
    let start: number | null = null
    const tick = (now: number) => {
      start ??= now
      const progress = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(enter)
      cancelAnimationFrame(raf.current)
    }
  }, [active, value, duration])

  // jsx
  return <span className={cn(styles.root({ hidden: !entered }), className)}>{display}</span>
}

export { ScoreReveal }
export type { ScoreRevealProps }
