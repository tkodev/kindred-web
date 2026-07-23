'use client'

import { useState } from 'react'
import { Check, Search, X } from 'lucide-react'
import { Button } from '@/components/atoms/button'
import { FriendRow } from '@/components/molecules/friend-row'
import { SectionHeading } from '@/components/molecules/section-heading'
import { type FriendRequest, type FriendSuggestion } from '@/types/friends'
import { client } from '@/utils/orpc'
import { cn, cva } from '@/utils/theme'

const styles = {
  root: cva('gap-lg flex w-full flex-col'),
  search: cva('gap-sm border-border flex items-center rounded-lg border px-4 py-3'),
  searchIcon: cva('text-muted-foreground size-5 shrink-0'),
  searchInput: cva('placeholder:text-muted-foreground w-full bg-transparent outline-none'),
  section: cva('flex flex-col'),
  actions: cva('gap-sm flex items-center'),
  iconButton: cva(
    'border-border flex size-9 items-center justify-center rounded-lg border transition-colors',
    {
      variants: {
        tone: {
          accept: 'text-success hover:bg-success/10',
          decline: 'text-muted-foreground hover:bg-secondary/60'
        }
      }
    }
  ),
  icon: cva('size-4'),
  empty: cva('text-muted-foreground py-3 text-sm')
}

type AddFriendsProps = {
  requests: FriendRequest[]
  suggestions: FriendSuggestion[]
}

/** The add-friends screen: search people, respond to incoming requests, and send requests to
    suggestions. Search and every action call the friends procedures over oRPC. */
const AddFriends = (props: AddFriendsProps) => {
  // props
  const { requests, suggestions } = props

  // hooks
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<FriendSuggestion[]>(suggestions)
  const [handledRequests, setHandledRequests] = useState<Record<string, 'accept' | 'decline'>>({})
  const [requested, setRequested] = useState<Record<string, boolean>>({})

  // handlers
  const onSearch = async (value: string) => {
    setQuery(value)
    const next = await client.friends.suggestions({ query: value })
    setResults(next)
  }

  const onRespond = async (requestId: string, action: 'accept' | 'decline') => {
    setHandledRequests((prev) => ({ ...prev, [requestId]: action }))
    await client.friends.respondRequest({ requestId, action })
  }

  const onRequest = async (userId: string) => {
    setRequested((prev) => ({ ...prev, [userId]: true }))
    await client.friends.sendRequest({ userId })
  }

  // render vars
  const pendingRequests = requests.filter((request) => !handledRequests[request.id])

  // jsx
  return (
    <div className={cn(styles.root())}>
      <label className={cn(styles.search())}>
        <Search className={cn(styles.searchIcon())} aria-hidden />
        <input
          className={cn(styles.searchInput())}
          aria-label="Search people"
          placeholder="search by name"
          value={query}
          onChange={(event) => onSearch(event.target.value)}
        />
      </label>

      {pendingRequests.length > 0 && (
        <div className={cn(styles.section())}>
          <SectionHeading>requests</SectionHeading>
          {pendingRequests.map((request) => (
            <FriendRow
              key={request.id}
              name={request.name}
              detail={`${request.mutuals} mutual friends`}
              initials={request.initials}
              trailing={
                <span className={cn(styles.actions())}>
                  <button
                    type="button"
                    className={cn(styles.iconButton({ tone: 'accept' }))}
                    aria-label={`Accept ${request.name}`}
                    onClick={() => onRespond(request.id, 'accept')}
                  >
                    <Check className={cn(styles.icon())} aria-hidden />
                  </button>
                  <button
                    type="button"
                    className={cn(styles.iconButton({ tone: 'decline' }))}
                    aria-label={`Decline ${request.name}`}
                    onClick={() => onRespond(request.id, 'decline')}
                  >
                    <X className={cn(styles.icon())} aria-hidden />
                  </button>
                </span>
              }
            />
          ))}
        </div>
      )}

      <div className={cn(styles.section())}>
        <SectionHeading>people you may know</SectionHeading>
        {results.length === 0 ? (
          <p className={cn(styles.empty())}>No one found for “{query}”.</p>
        ) : (
          results.map((suggestion) => {
            const isRequested = requested[suggestion.id] ?? suggestion.requested
            return (
              <FriendRow
                key={suggestion.id}
                name={suggestion.name}
                detail={`${suggestion.mutuals} mutual · ${suggestion.reason}`}
                initials={suggestion.initials}
                trailing={
                  <Button
                    disabled={isRequested}
                    size="sm"
                    variant={isRequested ? 'secondary' : 'primary'}
                    onClick={() => onRequest(suggestion.id)}
                  >
                    {isRequested ? 'requested' : 'add'}
                  </Button>
                }
              />
            )
          })
        )}
      </div>
    </div>
  )
}

export { AddFriends }
export type { AddFriendsProps }
