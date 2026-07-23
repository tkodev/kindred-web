import { forwardRef, type HTMLAttributes } from 'react'
import { type CompatibilityDimension } from '@/types/friends'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('gap-sm flex w-full flex-col'),
  head: cva('flex items-baseline justify-between'),
  label: cva('font-display text-title text-foreground'),
  score: cva('text-muted-foreground text-sm font-bold'),
  track: cva('bg-secondary h-2 w-full overflow-hidden rounded-xl'),
  fill: cva('bg-success h-full rounded-xl')
}

type DimensionBarRef = HTMLDivElement
type DimensionBarProps = HTMLAttributes<DimensionBarRef> &
  VariantProps<typeof styles.root> & {
    dimension: CompatibilityDimension
  }

/** One compatibility axis as a labeled progress bar filled to its sub-score. */
const DimensionBar = forwardRef<DimensionBarRef, DimensionBarProps>((props, ref) => {
  // props
  const { dimension, className, ...rest } = props

  // render vars
  const width = `${Math.max(0, Math.min(100, dimension.score))}%`

  // jsx
  return (
    <div ref={ref} className={cn(styles.root({ className }))} {...rest}>
      <div className={cn(styles.head())}>
        <span className={cn(styles.label())}>{dimension.label}</span>
        <span className={cn(styles.score())}>{dimension.score}</span>
      </div>
      <div
        className={cn(styles.track())}
        aria-label={dimension.label}
        aria-valuemax={100}
        aria-valuemin={0}
        aria-valuenow={dimension.score}
        role="meter"
      >
        <div className={cn(styles.fill())} style={{ width }} />
      </div>
    </div>
  )
})
DimensionBar.displayName = 'DimensionBar'

export { DimensionBar }
export type { DimensionBarProps, DimensionBarRef }
