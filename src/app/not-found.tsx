import { type Metadata } from 'next'
import Link from 'next/link'
import { Main } from '@/components/templates/main'
import { Section } from '@/components/templates/section'

const metadata: Metadata = {
  title: 'Not found',
  description: 'The requested page does not exist.',
  robots: { index: false }
}

const styles = {
  content: 'flex h-full flex-col items-center justify-center gap-md text-center',
  title: 'text-4xl font-bold',
  desc: 'text-muted-foreground',
  link: 'underline underline-offset-4'
}

const NotFoundPage = () => {
  // jsx
  return (
    <Main>
      <Section id="not-found">
        <div className={styles.content}>
          <h1 className={styles.title}>404</h1>
          <p className={styles.desc}>The page you requested does not exist.</p>
          <Link className={styles.link} href="/">
            Return home
          </Link>
        </div>
      </Section>
    </Main>
  )
}

export default NotFoundPage
export { metadata }
