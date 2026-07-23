import { notFound } from 'next/navigation'
import { Avatar } from '@/components/atoms/avatar'
import { ScoreReveal } from '@/components/atoms/score-reveal'
import { DimensionBar } from '@/components/molecules/dimension-bar'
import { QuirkCard } from '@/components/molecules/quirk-card'
import { ScreenHeader } from '@/components/molecules/screen-header'
import { SectionHeading } from '@/components/molecules/section-heading'
import { Main } from '@/components/templates/main'
import { Section } from '@/components/templates/section'
import { serverClient } from '@/server/client'
import { createMetadata } from '@/utils/system'

type DetailPageProps = {
  params: Promise<{ id: string }>
}

const generateMetadata = async (props: DetailPageProps) => {
  const { id } = await props.params
  const insight = await serverClient.friends.insight({ friendId: id })
  return createMetadata({
    title: insight ? `You & ${insight.name}` : 'Compatibility',
    description: insight?.headline ?? 'A compatibility insight for the two of you.',
    path: `/friends/${id}`
  })
}

const styles = {
  content: 'gap-xl mx-auto flex w-full max-w-2xl flex-col',
  hero: 'flex flex-col items-center gap-md text-center',
  pair: 'gap-md flex items-center',
  headline: 'font-display text-h2 text-foreground',
  scoreRow: 'flex items-baseline gap-1',
  score: 'font-display text-display text-primary',
  percent: 'font-display text-h1 text-primary',
  compatible: 'text-muted-foreground',
  narrative: 'text-title text-foreground/90 text-center',
  section: 'gap-md flex flex-col',
  quirks: 'gap-sm flex flex-col'
}

const DetailPage = async (props: DetailPageProps) => {
  // render vars
  const { id } = await props.params
  const insight = await serverClient.friends.insight({ friendId: id })
  if (!insight) notFound()

  // jsx
  return (
    <Main>
      <Section id="compatibility-detail" height="auto" width="md">
        <div className={styles.content}>
          <ScreenHeader backHref="/friends" title="compatibility" />

          <div className={styles.hero}>
            <span className={styles.pair}>
              <Avatar initials="Y" tone="primary" />
              <Avatar initials={insight.initials} />
            </span>
            <span className={styles.scoreRow}>
              <ScoreReveal className={styles.score} value={insight.score} />
              <span className={styles.percent}>%</span>
            </span>
            <span className={styles.compatible}>compatible with {insight.name}</span>
            <h1 className={styles.headline}>{insight.headline}</h1>
          </div>

          <p className={styles.narrative}>{insight.narrative}</p>

          <section className={styles.section}>
            <SectionHeading>how you line up</SectionHeading>
            {insight.dimensions.map((dimension) => (
              <DimensionBar key={dimension.label} dimension={dimension} />
            ))}
          </section>

          <section className={styles.section}>
            <SectionHeading>shared quirks</SectionHeading>
            <div className={styles.quirks}>
              {insight.sharedQuirks.map((quirk) => (
                <QuirkCard key={quirk.title} quirk={quirk} />
              ))}
            </div>
          </section>
        </div>
      </Section>
    </Main>
  )
}

export default DetailPage
export { generateMetadata }
