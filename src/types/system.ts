import { ForwardRefExoticComponent, RefAttributes, SVGProps } from 'react'

/** A ref-forwarding SVG React component, the shape `lucide-react` and local icons export. */
type SvgComponent = ForwardRefExoticComponent<
  Omit<SVGProps<SVGSVGElement>, 'ref'> & RefAttributes<SVGSVGElement>
>

/** The props an App Router page receives: route params and query, both async in Next.js 16. */
type PageProps = {
  params: Promise<{ [key: string]: string }>
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

/** An Open Graph image: its absolute URL and pixel dimensions. */
type OgImage = {
  url: string
  width: number
  height: number
}

export type { OgImage, PageProps, SvgComponent }
