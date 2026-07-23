import Link from 'next/link'
import { forwardRef, type HTMLAttributes } from 'react'
import { formatInTimeZone } from 'date-fns-tz'
import { appTimeZone } from '@/constants/date'
import { footerEntries } from '@/constants/layout'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('w-full border-t'),
  bar: cva('gap-lg mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4'),
  copy: cva('text-muted-foreground'),
  nav: cva('gap-md flex items-center'),
  link: cva('text-muted-foreground hover:text-foreground transition-colors')
}

type FooterRef = HTMLElement
type FooterProps = HTMLAttributes<FooterRef> & VariantProps<typeof styles.root>

const Footer = forwardRef<FooterRef, FooterProps>((props, ref) => {
  // props
  const { className, ...rest } = props

  // render vars
  const year = formatInTimeZone(new Date(), appTimeZone, 'yyyy')
  const entries = footerEntries.filter((entry) => entry.isVisible)

  // jsx
  return (
    <footer ref={ref} className={cn(styles.root({ className }))} {...rest}>
      <div className={cn(styles.bar())}>
        <span className={cn(styles.copy())}>© {year}</span>
        {entries.length > 0 && (
          <nav className={cn(styles.nav())} aria-label="Footer">
            {entries.map((entry) => (
              <Link key={entry.href} className={cn(styles.link())} href={entry.href ?? '/'}>
                {entry.name}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </footer>
  )
})
Footer.displayName = 'Footer'

export { Footer }
export type { FooterProps, FooterRef }
