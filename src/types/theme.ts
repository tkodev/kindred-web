import { Config } from 'tailwindcss'

/** The Tailwind config's `theme` object, with its optional wrapper removed. */
type Theme = NonNullable<Config['theme']>

/** The two color themes the site defines: dark is active, light serves inverse sections. */
type ThemeMode = 'light' | 'dark'

export type { Theme, ThemeMode }
