# Design system

The token contract and the component inventory: color, type, radius, spacing, and the atoms and molecules built on them. Tokens are declared in [`src/themes/theme.css`](../../src/themes/theme.css) and consumed only through the semantic names below. How components are authored is [components.md](../01-standards/components.md)'s concern.

## Intent behind the palette

The audience is 30s-to-40s adults seeking quality friendship and dating, so the system reads warm, considered, and discreet rather than youthful or gamified. Warm ivory and ink carry the base; a terracotta primary does the inviting (human, confident, a little romantic without being pink); sand and soft gold fill the neutrals; a muted sage marks positive and revealed states. Both a light and a dark theme ship, warm on both ends; the source app's cool green is deliberately not used.

## Color tokens

Components consume the semantic names only; the raw hexes live once in `theme.css` and are the only place a value is edited. Every background pairs with its foreground.

| Token | Role |
| --- | --- |
| `background` / `foreground` | Page base and primary text |
| `card` / `card-foreground` | Raised surfaces (entries, sheets) |
| `primary` / `primary-foreground` | Terracotta: primary actions, the brand accent, held in both themes |
| `secondary` / `secondary-foreground` | Warm sand: chips, avatars, quiet buttons |
| `muted` / `muted-foreground` | Backgrounds and secondary text |
| `accent` / `accent-foreground` | Soft gold: subtle emphasis |
| `success` / `success-foreground` | Sage: revealed scores, positive states |
| `destructive` / `destructive-foreground` | Decline and error |
| `border` / `input` / `ring` | Hairlines, fields, focus |

## Typography

Two families: an editorial serif for display (`font-display`), a clean sans for body (`font-body`, Geist). The display serif ships as a system-serif stack (`Newsreader` first) so nothing is fetched at build; a licensed serif drops in later through `next/font`. The named ramp is registered with `cn()`'s twMerge extension in [`src/utils/theme.ts`](../../src/utils/theme.ts), or twMerge reads `text-h1` as a color.

| Utility | Size | Use |
| --- | --- | --- |
| `text-display` | 2.5rem | Hero and screen titles |
| `text-h1` | 2rem | Section leads |
| `text-h2` | 1.5rem | Sub-sections |
| `text-title` | 1.125rem | Row labels, card titles |
| body | inherited | Answers, captions, controls |

## System tokens

Radius (`rounded-xs`..`rounded-xl`) is intentionally soft to suit the warm tone; spacing steps (`gap-xs`..`gap-xl`) and motion easings follow the boilerplate scale. No raw values in JSX.

**Do not use `max-w-{xs,sm,md,lg,xl}` or `w-{xs,sm,md,lg,xl}`.** The named spacing tokens (`--spacing-md`, ...) shadow Tailwind's container t-shirt sizes, so `max-w-md` resolves to the 1rem spacing value, not the 28rem container: a content column silently collapses to `min-content`. For width caps use a non-shadowed container size (`max-w-2xl` and up) or a numeric spacing (`max-w-96`); the small t-shirt names are reserved for `gap-*`, `p-*`, and `rounded-*`.

## Component inventory

Built to the house shape ([components.md](../01-standards/components.md)); content always arrives by props.

| Layer | Components |
| --- | --- |
| atoms | `Avatar`, `Badge`, `Button`, `Chip` |
| molecules | `SectionHeading`, `ScreenHeader`, `QuestionRow`, `EntryCard`, `FriendRow` |
| organisms | `ProfileView`, `FriendList`, `AddFriends` |
| templates | the boilerplate shell: `Header`, `Footer`, `Main`, `Section`, `Underlay`, `Overlay` |
