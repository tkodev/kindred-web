import { forwardRef, type HTMLAttributes } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('pointer-events-none fixed inset-0')
}

/** The shell's site-wide background slot: ambient layers render here, behind all content. */
type UnderlayRef = HTMLDivElement
type UnderlayProps = HTMLAttributes<UnderlayRef> & VariantProps<typeof styles.root>

const Underlay = forwardRef<UnderlayRef, UnderlayProps>((props, ref) => {
  // props
  const { className, children, ...rest } = props

  // jsx
  return (
    <div ref={ref} className={cn(styles.root({ className }))} aria-hidden {...rest}>
      {children}
    </div>
  )
})
Underlay.displayName = 'Underlay'

export { Underlay }
export type { UnderlayProps, UnderlayRef }
