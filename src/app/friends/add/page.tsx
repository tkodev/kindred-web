import { ScreenHeader } from '@/components/molecules/screen-header'
import { AddFriends } from '@/components/organisms/add-friends'
import { Main } from '@/components/templates/main'
import { Section } from '@/components/templates/section'
import { serverClient } from '@/server/client'
import { createMetadata } from '@/utils/system'

const metadata = createMetadata({
  title: 'Add friends',
  description: 'Find people, respond to requests, and grow your circle.',
  path: '/friends/add'
})

const styles = {
  content: 'gap-lg mx-auto flex w-full max-w-2xl flex-col'
}

const AddFriendsPage = async () => {
  // render vars
  const [requests, suggestions] = await Promise.all([
    serverClient.friends.requests(),
    serverClient.friends.suggestions()
  ])

  // jsx
  return (
    <Main>
      <Section id="add-friends" height="auto" width="md">
        <div className={styles.content}>
          <ScreenHeader backHref="/friends" title="add friends" />
          <AddFriends requests={requests} suggestions={suggestions} />
        </div>
      </Section>
    </Main>
  )
}

export default AddFriendsPage
export { metadata }
