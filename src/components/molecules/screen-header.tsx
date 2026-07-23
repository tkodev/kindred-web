import Link from 'next/link'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { ChevronLeft } from 'lucide-react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('gap-md flex h-14 w-full items-center justify-between'),
  back: cva('text-muted-foreground hover:text-foreground -ml-1 transition-colors'),
  backIcon: cva('size-6'),
  title: cva('font-display text-title text-foreground'),
  side: cva('flex min-w-10 items-center justify-end')
}

type ScreenHeaderRef = HTMLElement
type ScreenHeaderProps = HTMLAttributes<ScreenHeaderRef> &
  VariantProps<typeof styles.root> & {
    title: string
    /** Route the back chevron links to; omit to hide it. */
    backHref?: string
    /** Content pinned to the right, e.g. a completion percentage. */
    trailing?: ReactNode
  }

/** The in-app sub-header: a back link, a centered title, and an optional trailing slot. */
const ScreenHeader = forwardRef<ScreenHeaderRef, ScreenHeaderProps>((props, ref) => {
  // props
  const { title, backHref, trailing, className, ...rest } = props

  // jsx
  return (
    <nav ref={ref} className={cn(styles.root({ className }))} aria-label={title} {...rest}>
      <span className={cn(styles.side(), 'justify-start')}>
        {backHref && (
          <Link className={cn(styles.back())} aria-label="Back" href={backHref}>
            <ChevronLeft className={cn(styles.backIcon())} aria-hidden />
          </Link>
        )}
      </span>
      <h1 className={cn(styles.title())}>{title}</h1>
      <span className={cn(styles.side())}>{trailing}</span>
    </nav>
  )
})
ScreenHeader.displayName = 'ScreenHeader'

export { ScreenHeader }
export type { ScreenHeaderProps, ScreenHeaderRef }
