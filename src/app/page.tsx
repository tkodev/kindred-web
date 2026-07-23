import Link from 'next/link'
import { AuthPanel } from '@/components/organisms/auth-panel'
import { Main } from '@/components/templates/main'
import { Section } from '@/components/templates/section'
import { appdata } from '@/constants/system'
import { serverClient } from '@/server/client'
import { createMetadata } from '@/utils/system'

const metadata = createMetadata({
  title: appdata.title,
  description: appdata.description,
  path: '/'
})

const styles = {
  content: 'flex h-full flex-col items-center justify-center gap-md text-center',
  title: 'font-display text-display text-foreground',
  desc: 'text-muted-foreground max-w-2xl text-title',
  actions: 'mt-md flex flex-wrap items-center justify-center gap-md',
  primary: 'bg-primary text-primary-foreground rounded-lg px-6 py-3 font-bold',
  secondary: 'border border-border text-foreground rounded-lg px-6 py-3 font-bold',
  greeting: 'text-muted-foreground'
}

const HomePage = async () => {
  // render vars
  const user = await serverClient.auth.me()

  // jsx
  return (
    <Main>
      <Section id="intro">
        <div className={styles.content}>
          <h1 className={styles.title}>{appdata.title}</h1>
          <p className={styles.desc}>{appdata.description}</p>
          {user ? (
            <>
              <p className={styles.greeting}>Signed in as @{user.username}</p>
              <div className={styles.actions}>
                <Link className={styles.primary} href="/friends">
                  See your compatibility
                </Link>
                <Link className={styles.secondary} href="/profile">
                  Edit your profile
                </Link>
              </div>
            </>
          ) : (
            <div className={styles.actions}>
              <AuthPanel />
            </div>
          )}
        </div>
      </Section>
    </Main>
  )
}

export default HomePage
export { metadata }
