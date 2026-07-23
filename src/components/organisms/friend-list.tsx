'use client'

import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Badge } from '@/components/atoms/badge'
import { Button } from '@/components/atoms/button'
import { ScoreReveal } from '@/components/atoms/score-reveal'
import { FriendRow } from '@/components/molecules/friend-row'
import { SectionHeading } from '@/components/molecules/section-heading'
import { type AppFriend, type OffAppContact } from '@/types/friends'
import { client } from '@/utils/orpc'
import { cn, cva } from '@/utils/theme'

const styles = {
  root: cva('gap-lg flex w-full flex-col'),
  search: cva('gap-sm border-border flex items-center rounded-lg border px-4 py-3'),
  searchIcon: cva('text-muted-foreground size-5 shrink-0'),
  searchInput: cva('placeholder:text-muted-foreground w-full bg-transparent outline-none'),
  section: cva('flex flex-col'),
  score: cva('gap-sm flex items-center')
}

type FriendListProps = {
  onApp: AppFriend[]
  offApp: OffAppContact[]
}

type RevealState = Record<
  string,
  { score: number; status: 'locked' | 'revealing' | 'revealed'; animate: boolean }
>

const initialReveal = (friends: AppFriend[]): RevealState =>
  Object.fromEntries(
    friends.map((friend) => [
      friend.id,
      { score: friend.compatibility.score, status: friend.compatibility.state, animate: false }
    ])
  )

/** The discover-compatibility list: search, friends on the app with revealable scores, and
    off-app contacts to invite. Reveals call the friends.reveal procedure over oRPC. */
const FriendList = (props: FriendListProps) => {
  // props
  const { onApp, offApp } = props

  // hooks
  const [query, setQuery] = useState('')
  const [reveal, setReveal] = useState<RevealState>(() => initialReveal(onApp))
  const [invited, setInvited] = useState<Record<string, boolean>>({})

  // render vars
  const visible = useMemo(() => {
    const term = query.trim().toLowerCase()
    if (!term) return onApp
    return onApp.filter((friend) => friend.name.toLowerCase().includes(term))
  }, [onApp, query])

  // handlers
  const onReveal = async (friendId: string) => {
    setReveal((prev) => ({ ...prev, [friendId]: { ...prev[friendId], status: 'revealing' } }))
    const result = await client.friends.reveal({ friendId })
    setReveal((prev) => ({
      ...prev,
      [friendId]: { score: result.score, status: 'revealed', animate: true }
    }))
  }

  // jsx
  return (
    <div className={cn(styles.root())}>
      <label className={cn(styles.search())}>
        <Search className={cn(styles.searchIcon())} aria-hidden />
        <input
          className={cn(styles.searchInput())}
          aria-label="Find a friend"
          placeholder="find a friend"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>

      <div className={cn(styles.section())}>
        <SectionHeading>on the app</SectionHeading>
        {visible.map((friend) => {
          const state = reveal[friend.id]
          return (
            <FriendRow
              key={friend.id}
              name={friend.name}
              initials={friend.initials}
              href={`/friends/${friend.id}`}
              trailing={
                state.status === 'revealed' ? (
                  <span className={cn(styles.score())}>
                    <Badge variant="success">
                      <ScoreReveal active={state.animate} value={state.score} />
                    </Badge>
                    <span className="text-muted-foreground text-sm">revealed</span>
                  </span>
                ) : (
                  <Button
                    disabled={state.status === 'revealing'}
                    size="sm"
                    variant="outline"
                    onClick={() => onReveal(friend.id)}
                  >
                    {state.status === 'revealing' ? 'revealing…' : 'reveal'}
                  </Button>
                )
              }
            />
          )
        })}
      </div>

      {offApp.length > 0 && (
        <div className={cn(styles.section())}>
          <SectionHeading>more friends</SectionHeading>
          {offApp.map((contact) => {
            const isInvited = invited[contact.id] ?? contact.invited
            return (
              <FriendRow
                key={contact.id}
                name={contact.name}
                initials={contact.initials}
                trailing={
                  <Button
                    disabled={isInvited}
                    size="sm"
                    variant="secondary"
                    onClick={() => setInvited((prev) => ({ ...prev, [contact.id]: true }))}
                  >
                    {isInvited ? 'invited' : 'invite'}
                  </Button>
                }
              />
            )
          })}
        </div>
      )}
    </div>
  )
}

export { FriendList }
export type { FriendListProps }
