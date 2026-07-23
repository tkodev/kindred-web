'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/atoms/button'
import { client } from '@/utils/orpc'
import { cn, cva } from '@/utils/theme'

const styles = {
  root: cva(
    'gap-md bg-card border-border mx-auto flex w-full max-w-96 flex-col rounded-lg border p-6 text-left'
  ),
  label: cva('text-muted-foreground text-sm'),
  input: cva(
    'bg-background border-border text-foreground focus:border-ring w-full rounded-lg border px-4 py-3 outline-none'
  ),
  error: cva('text-destructive text-sm'),
  hint: cva('text-muted-foreground text-sm')
}

/**
 * Username-only sign-in: one field, one action. Tries to sign in; if the name is new, creates the
 * member. No passwords. On success the session cookie is set server-side and the page refreshes.
 */
const AuthPanel = () => {
  // hooks
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  // handlers
  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setError('')
    setBusy(true)
    try {
      try {
        await client.auth.login({ username })
      } catch {
        await client.auth.signup({ username })
      }
      router.refresh()
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : 'Could not sign in')
      setBusy(false)
    }
  }

  // jsx
  return (
    <form className={cn(styles.root())} onSubmit={onSubmit}>
      <label className={cn(styles.label())} htmlFor="username">
        Pick a username to continue
      </label>
      <input
        id="username"
        className={cn(styles.input())}
        autoComplete="off"
        placeholder="e.g. tkodev"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      {error && <p className={cn(styles.error())}>{error}</p>}
      <Button type="submit" disabled={busy || username.trim().length < 2}>
        {busy ? 'One moment…' : 'Continue'}
      </Button>
      <p className={cn(styles.hint())}>No password. New names create an account.</p>
    </form>
  )
}

export { AuthPanel }
