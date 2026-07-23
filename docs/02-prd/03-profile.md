# Profile

The self-questionnaire at [`/profile`](../../src/app/profile/page.tsx): what a member answers, how it is organized, and how it renders. The answers are the sole input to matching ([06-matching.md](06-matching.md)); the score never reads anything a member did not enter here.

## Purpose

A member describes themselves once, richly, so every pairwise compatibility insight is computed from real signal. Completeness is visible and encouraged (a per-category percentage), because a thin profile yields a weak score.

## Structure

A profile is a set of fixed **categories**, each a stack of titled **sections**, each section one of three **kinds**. This shape covers every category without special-casing.

| Category | Carries |
| --- | --- |
| `self` | Relationship intent, values, orientation, self-ratings |
| `professional` | Occupation, education, work attitude |
| `interests` | Hobbies and interest tags |
| `music` | Favorite artists |
| `screen` | Favorite films and shows |
| `going out` | Social energy and ideal-night preferences |
| `background` | Languages, upbringing, self-description |

| Section kind | Renders as | Example |
| --- | --- | --- |
| `questions` | Tappable rows: label with an answer or `score / max` beneath | "relationship status → single"; "how driven are you about work → 7 / 10" |
| `chips` | Wrapping tags, each with a favorite star | hobbies, interests, artists, occupation |
| `entries` | Bordered cards with a subtitle and star | universities, films, shows |

## Requirements

1. **The category selector switches sections without a route change.** `ProfileView` is a client component holding the active category; the seed loads server-side and hydrates it.
2. **A starred chip is a weighted signal.** The star marks a favorite or dealbreaker the matcher weights above an ordinary tag ([06-matching.md](06-matching.md) §Signals); it is not decoration.
3. **Scale answers render as `score / max`,** free-text answers as their string, and an unanswered question shows an `add` affordance.
4. **Completion is per category,** shown as a whole percentage; it reflects answered over answerable, and is the nudge toward a matchable profile.
5. **Every label and answer arrives by props.** No copy is hardcoded in a component; the questionnaire is data.

## Data

Types in [`src/types/profile.ts`](../../src/types/profile.ts); seed in [`src/constants/profile.ts`](../../src/constants/profile.ts). Served by `profile.get` ([`src/server/routers/profile.ts`](../../src/server/routers/profile.ts)). Editing procedures (`profile.setAnswer`, `profile.toggleChip`) and persistence land per [07-architecture.md](07-architecture.md); the seed is the contract they must satisfy.
