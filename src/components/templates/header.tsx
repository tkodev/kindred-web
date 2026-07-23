import Link from 'next/link'
import { LogoutButton } from '@/components/molecules/logout-button'
import { headerEntries } from '@/constants/layout'
import { serverClient } from '@/server/client'
import { cn, cva } from '@/utils/theme'

const styles = {
  root: cva('w-full border-b'),
  bar: cva('gap-lg mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4'),
  brand: cva('font-body font-bold'),
  nav: cva('gap-md flex items-center'),
  link: cva('text-muted-foreground hover:text-foreground transition-colors'),
  user: cva('gap-md flex items-center'),
  handle: cva('text-foreground text-sm font-bold')
}

/** The persistent top bar: brand, primary nav, and the signed-in member with a log-out action. */
const Header = async () => {
  // render vars
  const entries = headerEntries.filter((entry) => entry.isVisible)
  const user = await serverClient.auth.me()

  // jsx
  return (
    <header className={cn(styles.root())}>
      <div className={cn(styles.bar())}>
        <Link className={cn(styles.brand())} href="/">
          Kindred
        </Link>
        <nav className={cn(styles.nav())} aria-label="Primary">
          {entries.map((entry) => (
            <Link key={entry.href} className={cn(styles.link())} href={entry.href ?? '/'}>
              {entry.name}
            </Link>
          ))}
          {user && (
            <span className={cn(styles.user())}>
              <span className={cn(styles.handle())}>@{user.username}</span>
              <LogoutButton />
            </span>
          )}
        </nav>
      </div>
    </header>
  )
}

export { Header }
