import { FC, ReactNode } from 'react'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import { Footer } from '@/components/templates/footer'
import { Header } from '@/components/templates/header'
import { Overlay } from '@/components/templates/overlay'
import { Underlay } from '@/components/templates/underlay'
import { defaultMetadata } from '@/constants/system'
import { geistMonoFont, geistSansFont } from '@/fonts/geist'
import { cn, cva } from '@/utils/theme'
import '@/themes/theme.css'

const styles = {
  html: cva([
    'bg-background font-body text-foreground h-auto min-h-full w-full',
    'text-[1rem] antialiased motion-safe:scroll-smooth'
  ]),
  body: cva(['font-body text-foreground flex h-auto min-h-full w-full flex-col', 'text-sm'])
}

type LayoutPageProps = {
  children: ReactNode
}

const LayoutPage: FC<LayoutPageProps> = (props) => {
  const { children } = props
  return (
    <html
      className={cn(styles.html())}
      data-scroll-behavior="smooth"
      lang="en"
      suppressHydrationWarning
    >
      <body
        className={cn(styles.body(), geistSansFont.variable, geistMonoFont.variable)}
        suppressHydrationWarning
      >
        <Underlay />
        <Header />
        {children}
        <Footer />
        <Overlay />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}

export { defaultMetadata as metadata }
export default LayoutPage
