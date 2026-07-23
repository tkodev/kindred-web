import { forwardRef, type HTMLAttributes } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('font-body flex shrink-0 items-center justify-center overflow-hidden font-bold', {
    variants: {
      size: {
        sm: 'size-9 rounded-sm text-sm',
        md: 'text-title size-12 rounded-md'
      },
      tone: {
        neutral: 'bg-secondary text-secondary-foreground',
        primary: 'bg-primary/15 text-primary'
      }
    },
    defaultVariants: { size: 'md', tone: 'neutral' }
  })
}

type AvatarRef = HTMLSpanElement
type AvatarProps = HTMLAttributes<AvatarRef> &
  VariantProps<typeof styles.root> & {
    /** One or two letters shown when there is no photo. */
    initials: string
  }

const Avatar = forwardRef<AvatarRef, AvatarProps>((props, ref) => {
  // props
  const { initials, size, tone, className, ...rest } = props

  // jsx
  return (
    <span ref={ref} className={cn(styles.root({ size, tone, className }))} {...rest}>
      {initials}
    </span>
  )
})
Avatar.displayName = 'Avatar'

export { Avatar }
export type { AvatarProps, AvatarRef }
