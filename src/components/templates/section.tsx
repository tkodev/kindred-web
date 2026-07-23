import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('relative flex h-auto w-full overflow-hidden', {
    variants: {
      height: {
        full: 'min-h-[max(1.25rem,100vh)]',
        auto: 'min-h-5'
      }
    },
    defaultVariants: {
      height: 'full'
    }
  }),
  underlay: cva('absolute top-0 left-0 size-full'),
  frame: cva('relative mx-auto w-full max-w-full grow px-4 py-24', {
    variants: {
      width: {
        lg: 'max-w-7xl',
        md: 'max-w-5xl',
        sm: 'max-w-3xl'
      }
    },
    defaultVariants: {
      width: 'lg'
    }
  }),
  content: cva('relative size-full')
}

type SectionRef = HTMLDivElement
type SectionProps = HTMLAttributes<SectionRef> &
  VariantProps<typeof styles.root> &
  VariantProps<typeof styles.frame> & {
    bg?: ReactNode
  }

const Section = forwardRef<SectionRef, SectionProps>((props, ref) => {
  const { bg, height, width, className, children, ...rest } = props

  return (
    <section ref={ref} className={cn(styles.root({ height }))} {...rest}>
      <div className={cn(styles.underlay())}>{bg}</div>
      <div className={cn(styles.frame({ width }))}>
        <div className={cn(styles.content({ className }))}>{children}</div>
      </div>
    </section>
  )
})
Section.displayName = 'Section'

export { Section }
export type { SectionProps, SectionRef }
