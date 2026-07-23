import Link from 'next/link'
import { UserPlus } from 'lucide-react'
import { ScreenHeader } from '@/components/molecules/screen-header'
import { FriendList } from '@/components/organisms/friend-list'
import { Main } from '@/components/templates/main'
import { Section } from '@/components/templates/section'
import { serverClient } from '@/server/client'
import { createMetadata } from '@/utils/system'

const metadata = createMetadata({
  title: 'Compatibility',
  description: 'See how you match with your friends, and invite the ones not here yet.',
  path: '/friends'
})

const styles = {
  content: 'gap-lg mx-auto flex w-full max-w-2xl flex-col',
  intro: 'flex flex-col gap-1',
  title: 'font-display text-h2 text-foreground',
  desc: 'text-muted-foreground',
  add: 'text-muted-foreground hover:text-foreground transition-colors'
}

const FriendsPage = async () => {
  // render vars
  const { onApp, offApp } = await serverClient.friends.list()

  // jsx
  return (
    <Main>
      <Section id="friends" height="auto" width="md">
        <div className={styles.content}>
          <ScreenHeader
            backHref="/"
            title="compatibility"
            trailing={
              <Link className={styles.add} aria-label="Add friends" href="/friends/add">
                <UserPlus className="size-5" aria-hidden />
              </Link>
            }
          />
          <div className={styles.intro}>
            <h2 className={styles.title}>discover compatibility</h2>
            <p className={styles.desc}>
              pick a friend and we build a compatibility insight for the two of you.
            </p>
          </div>
          <FriendList offApp={offApp} onApp={onApp} />
        </div>
      </Section>
    </Main>
  )
}

export default FriendsPage
export { metadata }
