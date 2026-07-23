import { NavEntry } from '@/types/layout'

/** Primary navigation links rendered in the header. */
const headerEntries: NavEntry[] = [
  {
    intent: 'url',
    href: '/friends',
    name: 'compatibility',
    isVisible: true
  },
  {
    intent: 'url',
    href: '/profile',
    name: 'profile',
    isVisible: true
  }
]

/** Utility links rendered in the footer. */
const footerEntries: NavEntry[] = []

export { footerEntries, headerEntries }
