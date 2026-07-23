import { forwardRef, type HTMLAttributes } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('font-display text-title text-muted-foreground italic')
}

type SectionHeadingRef = HTMLHeadingElement
type SectionHeadingProps = HTMLAttributes<SectionHeadingRef> & VariantProps<typeof styles.root>

/** The editorial italic section label (`hobbies`, `questions`) that heads a profile block. */
const SectionHeading = forwardRef<SectionHeadingRef, SectionHeadingProps>((props, ref) => {
  // props
  const { className, children, ...rest } = props

  // jsx
  return (
    <h2 ref={ref} className={cn(styles.root({ className }))} {...rest}>
      {children}
    </h2>
  )
})
SectionHeading.displayName = 'SectionHeading'

export { SectionHeading }
export type { SectionHeadingProps, SectionHeadingRef }
