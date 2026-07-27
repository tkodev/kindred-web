# Add friends

The screen at [`/friends/add`](../../src/app/friends/add/page.tsx) that grows the friend graph. This surface is **not in the source app**; it is Kindred's own, added because compatibility is worthless without a graph to compute it over.

## Purpose

Give a member three ways to expand their circle in one place: find a specific person, respond to people who found them, and act on who the app suggests. Every added friend becomes a candidate for a compatibility reveal on the [compatibility](04-compatibility.md) surface.

## Structure

| Block | Rows | Trailing action |
| --- | --- | --- |
| Search | Live results as the query changes | Add / Requested |
| Requests | Incoming requests, with mutual-friend count | Accept / Decline |
| People you may know | Suggestions, each with a reason and mutual count | Add / Requested |

## Requirements

1. **Search narrows suggestions live** through `friends.suggestions({ query })`; an empty query returns the full suggestion set, and a no-match query shows an explicit empty state.
2. **Requests resolve in place.** Accept and decline call `friends.respondRequest`; the row leaves the list optimistically and does not reappear.
3. **Every suggestion states why it surfaced** (mutual friends, a shared reason): trust for this audience comes from provenance, not volume.
4. **Sending a request is optimistic and idempotent-feeling.** The button flips to `requested` immediately and disables; `friends.sendRequest` carries the write.
5. **Mutual-friend counts are the primary trust signal** on every row, shown before anything else about the person.

## Data

Types in [`src/types/friends.ts`](../../src/types/friends.ts); seed in [`src/constants/friends.ts`](../../src/constants/friends.ts). Procedures: `friends.requests`, `friends.suggestions`, `friends.respondRequest`, `friends.sendRequest` ([`src/server/routers/friends.ts`](../../src/server/routers/friends.ts)). Writes echo today and persist per [07-architecture.md](07-architecture.md).
