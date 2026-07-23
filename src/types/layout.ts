import { SvgComponent } from '@/types/system'

/** One entry in the site's navigation, rendered as a link that carries its intent. */
type NavEntry = {
  /** What activating the entry does: follow a URL, or hold space in the bar. */
  intent: 'url' | 'spacer'
  href?: string
  name?: string
  icon?: SvgComponent
  /** Whether the entry shows in the current nav context. */
  isVisible: boolean
}

/** A single media asset with the real dimensions and alt text the data standard requires. */
type AssetEntry = {
  type: 'image' | 'video'
  /** Site-absolute path under `public/`. */
  src: string
  width: number
  height: number
  alt: string
}

export type { AssetEntry, NavEntry }
