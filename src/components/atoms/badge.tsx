import { forwardRef, type HTMLAttributes } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva(
    'inline-flex items-center justify-center rounded-xl px-3 py-1 text-sm font-bold whitespace-nowrap',
    {
      variants: {
        variant: {
          success: 'bg-success/15 text-success',
          muted: 'bg-muted text-muted-foreground',
          primary: 'bg-primary/15 text-primary',
          outline: 'border-border text-muted-foreground border'
        }
      },
      defaultVariants: { variant: 'muted' }
    }
  )
}

type BadgeRef = HTMLSpanElement
type BadgeProps = HTMLAttributes<BadgeRef> & VariantProps<typeof styles.root>

const Badge = forwardRef<BadgeRef, BadgeProps>((props, ref) => {
  // props
  const { variant, className, children, ...rest } = props

  // jsx
  return (
    <span ref={ref} className={cn(styles.root({ variant, className }))} {...rest}>
      {children}
    </span>
  )
})
Badge.displayName = 'Badge'

export { Badge }
export type { BadgeProps, BadgeRef }
