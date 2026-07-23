'use client'

import Link from 'next/link'
import { type FC } from 'react'
import { Main } from '@/components/templates/main'
import { Section } from '@/components/templates/section'

const styles = {
  content: 'flex h-full flex-col items-center justify-center gap-md text-center',
  title: 'text-4xl font-bold',
  desc: 'text-muted-foreground',
  buttons: 'flex flex-wrap items-center justify-center gap-md',
  link: 'underline underline-offset-4'
}

type ErrorPageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const ErrorPage: FC<ErrorPageProps> = (props) => {
  // props
  const { error, reset } = props

  // render vars
  const digest = error.digest ?? 'unlogged'

  // jsx
  return (
    <Main>
      <Section id="error">
        <div className={styles.content}>
          <h1 className={styles.title}>Something went wrong</h1>
          <p className={styles.desc}>An unhandled exception occurred. Reference: {digest}</p>
          <div className={styles.buttons}>
            <button type="button" className={styles.link} onClick={reset}>
              Try again
            </button>
            <Link className={styles.link} href="/">
              Return home
            </Link>
          </div>
        </div>
      </Section>
    </Main>
  )
}

export default ErrorPage
