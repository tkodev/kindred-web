# Compatibility

The friends list at [`/friends`](../../src/app/friends/page.tsx): the app's core surface, where a member sees who they know and reveals how compatible they are with each. The score itself is [06-matching.md](06-matching.md)'s concern; this doc owns the list and the reveal interaction.

## Purpose

Turn the abstract question "are we actually compatible?" into a single tappable act against people a member already trusts. Compatibility is framed per pair and starts hidden: revealing is a small, deliberate moment, not an always-on number.

## Structure

Two groups under a search field:

| Group | Rows | Trailing action |
| --- | --- | --- |
| On the app | Friends with a pairwise score | Reveal (locked) or the score badge (revealed) |
| More friends | Contacts not yet on Kindred | Invite |

## Requirements

1. **Scores start locked and reveal on tap.** A locked row shows a `reveal` button; tapping calls `friends.reveal` over oRPC and flips the row to the sage score badge plus a `revealed` label. The reveal is per pair.
2. **Reveal returns a breakdown, not just a number.** `friends.reveal` yields the headline score and its per-dimension sub-scores ([06-matching.md](06-matching.md) §Dimensions), so the insight can deepen without another call.
3. **Search filters the on-app list client-side** by name; it never blocks on the network.
4. **Off-app contacts are invitable inline,** flipping to `invited` optimistically; the real send goes through `friends.invite`.
5. **Adding friends lives one tap away.** The header links to [`/friends/add`](05-add-friends.md); this surface reads the graph, that one grows it.

## Data

Types in [`src/types/friends.ts`](../../src/types/friends.ts); seed in [`src/constants/friends.ts`](../../src/constants/friends.ts). `friends.list` returns on-app friends and off-app contacts; `friends.reveal` returns a `CompatibilityResult`. Reveal is a read today; when persistence lands ([07-architecture.md](07-architecture.md)) it also records the unlock so a revealed pair stays revealed.
