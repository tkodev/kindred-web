import { type MetadataRoute } from 'next'
import { appdata } from '@/constants/system'

/** Static routes included in the sitemap; dynamic routes append their id lists here. */
const routes = ['/', '/friends', '/friends/add', '/profile']

const sitemap = (): MetadataRoute.Sitemap => {
  return routes.map((route) => ({
    url: `${appdata.url}${route}`
  }))
}

export default sitemap
