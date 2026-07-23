import type { Metadata } from 'next'

/** Core site identity: title, name, description, and canonical URL. */
const appdata = {
  title: 'Kindred',
  siteName: 'kindred',
  description: 'See how compatible you really are with the people in your life.',
  url: 'https://example.com'
}

/**
 * Root Next.js metadata: title, description, Open Graph, Twitter, icons. Per-route metadata
 * derives from this through `createMetadata`; add the icon set under `public/images/favicons/`
 * and an OG image before launch.
 */
const defaultMetadata: Metadata = {
  metadataBase: new URL(appdata.url),
  title: appdata.title,
  description: appdata.description,
  alternates: { canonical: appdata.url },
  openGraph: {
    title: appdata.title,
    description: appdata.description,
    url: appdata.url,
    siteName: appdata.siteName,
    locale: 'en_CA',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: appdata.title,
    description: appdata.description
  }
}

export { appdata, defaultMetadata }
