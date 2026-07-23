import { forwardRef, type HTMLAttributes } from 'react'
import { ChevronDown, Star } from 'lucide-react'
import { type ProfileEntry } from '@/types/profile'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva(
    'gap-md border-border flex w-full items-center justify-between rounded-lg border p-4 text-left'
  ),
  body: cva('flex flex-col gap-0.5'),
  title: cva('gap-sm font-display text-title text-foreground flex items-center'),
  subtitle: cva('text-muted-foreground text-sm'),
  star: cva('fill-primary text-primary size-4'),
  chevron: cva('text-muted-foreground size-5 shrink-0')
}

type EntryCardRef = HTMLButtonElement
type EntryCardProps = HTMLAttributes<EntryCardRef> &
  VariantProps<typeof styles.root> & {
    entry: ProfileEntry
  }

/** A bordered list item (university, film, show): a title with a subtitle and a favorite star. */
const EntryCard = forwardRef<EntryCardRef, EntryCardProps>((props, ref) => {
  // props
  const { entry, className, ...rest } = props

  // jsx
  return (
    <button ref={ref} type="button" className={cn(styles.root({ className }))} {...rest}>
      <span className={cn(styles.body())}>
        <span className={cn(styles.title())}>
          {entry.title}
          {entry.isFavorite && <Star className={cn(styles.star())} aria-hidden />}
        </span>
        {entry.subtitle && <span className={cn(styles.subtitle())}>{entry.subtitle}</span>}
      </span>
      <ChevronDown className={cn(styles.chevron())} aria-hidden />
    </button>
  )
})
EntryCard.displayName = 'EntryCard'

export { EntryCard }
export type { EntryCardProps, EntryCardRef }
