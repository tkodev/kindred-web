import { forwardRef, type HTMLAttributes } from 'react'
import { Sparkle } from 'lucide-react'
import { type SharedQuirk } from '@/types/friends'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('gap-md bg-card border-border flex items-start rounded-lg border p-4'),
  icon: cva('text-primary mt-0.5 size-4 shrink-0'),
  body: cva('flex flex-col gap-1'),
  title: cva('font-display text-title text-foreground'),
  detail: cva('text-muted-foreground text-sm')
}

type QuirkCardRef = HTMLDivElement
type QuirkCardProps = HTMLAttributes<QuirkCardRef> &
  VariantProps<typeof styles.root> & {
    quirk: SharedQuirk
  }

/** A single shared-trait card: a title and one line on how the trait shows up for both. */
const QuirkCard = forwardRef<QuirkCardRef, QuirkCardProps>((props, ref) => {
  // props
  const { quirk, className, ...rest } = props

  // jsx
  return (
    <div ref={ref} className={cn(styles.root({ className }))} {...rest}>
      <Sparkle className={cn(styles.icon())} aria-hidden />
      <span className={cn(styles.body())}>
        <span className={cn(styles.title())}>{quirk.title}</span>
        <span className={cn(styles.detail())}>{quirk.detail}</span>
      </span>
    </div>
  )
})
QuirkCard.displayName = 'QuirkCard'

export { QuirkCard }
export type { QuirkCardProps, QuirkCardRef }
