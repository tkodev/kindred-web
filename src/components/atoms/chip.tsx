import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { ChevronDown, Star } from 'lucide-react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva(
    'gap-sm font-body inline-flex items-center rounded-lg border px-4 py-2.5 transition-colors',
    {
      variants: {
        selected: {
          true: 'border-border bg-secondary text-secondary-foreground',
          false: 'border-border/60 text-muted-foreground hover:text-foreground'
        }
      },
      defaultVariants: { selected: false }
    }
  ),
  star: cva('size-4 shrink-0', {
    variants: {
      favorite: { true: 'fill-primary text-primary', false: 'text-muted-foreground' }
    },
    defaultVariants: { favorite: false }
  }),
  chevron: cva('text-muted-foreground size-4 shrink-0')
}

type ChipRef = HTMLButtonElement
type ChipProps = ButtonHTMLAttributes<ChipRef> &
  VariantProps<typeof styles.root> & {
    label: string
    /** Show a star; filled when the chip is marked a favorite/dealbreaker signal. */
    isFavorite?: boolean
    /** Show a trailing chevron, indicating the chip opens a detail sheet. */
    showChevron?: boolean
  }

const Chip = forwardRef<ChipRef, ChipProps>((props, ref) => {
  // props
  const { label, isFavorite, showChevron, selected, className, ...rest } = props

  // render vars
  const withStar = isFavorite !== undefined

  // jsx
  return (
    <button ref={ref} type="button" className={cn(styles.root({ selected, className }))} {...rest}>
      {withStar && <Star className={cn(styles.star({ favorite: isFavorite }))} aria-hidden />}
      <span>{label}</span>
      {showChevron && <ChevronDown className={cn(styles.chevron())} aria-hidden />}
    </button>
  )
})
Chip.displayName = 'Chip'

export { Chip }
export type { ChipProps, ChipRef }
