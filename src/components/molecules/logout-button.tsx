'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { client } from '@/utils/orpc'
import { cn, cva } from '@/utils/theme'

const styles = {
  root: cva('text-muted-foreground hover:text-foreground text-sm transition-colors')
}

/** Ends the session and refreshes the shell so server components re-read the (now empty) cookie. */
const LogoutButton = () => {
  // hooks
  const router = useRouter()
  const [busy, setBusy] = useState(false)

  // handlers
  const onClick = async () => {
    setBusy(true)
    await client.auth.logout()
    router.refresh()
  }

  // jsx
  return (
    <button type="button" className={cn(styles.root())} disabled={busy} onClick={onClick}>
      log out
    </button>
  )
}

export { LogoutButton }
