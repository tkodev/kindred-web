import { forwardRef, type HTMLAttributes } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('contents')
}

/** The shell's takeover slot: overlays (menus, loading covers, cursors) render here. */
type OverlayRef = HTMLDivElement
type OverlayProps = HTMLAttributes<OverlayRef> & VariantProps<typeof styles.root>

const Overlay = forwardRef<OverlayRef, OverlayProps>((props, ref) => {
  // props
  const { className, children, ...rest } = props

  // jsx
  return (
    <div ref={ref} className={cn(styles.root({ className }))} {...rest}>
      {children}
    </div>
  )
})
Overlay.displayName = 'Overlay'

export { Overlay }
export type { OverlayProps, OverlayRef }
