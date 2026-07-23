import { ScreenHeader } from '@/components/molecules/screen-header'
import { ProfileView } from '@/components/organisms/profile-view'
import { Main } from '@/components/templates/main'
import { Section } from '@/components/templates/section'
import { serverClient } from '@/server/client'
import { createMetadata } from '@/utils/system'

const metadata = createMetadata({
  title: 'Your profile',
  description: 'Answer the questionnaire that drives your matches.',
  path: '/profile'
})

const styles = {
  content: 'gap-lg mx-auto flex w-full max-w-2xl flex-col'
}

const ProfilePage = async () => {
  // render vars
  const profile = await serverClient.profile.get()

  // jsx
  return (
    <Main>
      <Section id="profile" height="auto" width="md">
        <div className={styles.content}>
          <ScreenHeader backHref="/" title="profile" />
          <ProfileView categories={profile.categories} />
        </div>
      </Section>
    </Main>
  )
}

export default ProfilePage
export { metadata }
