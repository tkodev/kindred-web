import Link from 'next/link'
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { Avatar } from '@/components/atoms/avatar'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('gap-md flex w-full items-center justify-between py-3'),
  identity: cva('gap-md flex min-w-0 items-center', {
    variants: {
      link: { true: 'transition-opacity hover:opacity-80', false: '' }
    },
    defaultVariants: { link: false }
  }),
  body: cva('flex min-w-0 flex-col'),
  name: cva('font-display text-title text-foreground truncate'),
  detail: cva('text-muted-foreground truncate text-sm'),
  trailing: cva('flex shrink-0 items-center')
}

type FriendRowRef = HTMLDivElement
type FriendRowProps = HTMLAttributes<FriendRowRef> &
  VariantProps<typeof styles.root> & {
    name: string
    initials: string
    /** Secondary line under the name, e.g. mutual-friend count or a suggestion reason. */
    detail?: string
    /** When set, the avatar and name link here (e.g. the compatibility detail screen). */
    href?: string
    /** Right-aligned control: a score badge, an invite button, accept/decline actions. */
    trailing?: ReactNode
  }

/** A person row: avatar, name, an optional detail line, and a trailing action slot. */
const FriendRow = forwardRef<FriendRowRef, FriendRowProps>((props, ref) => {
  // props
  const { name, initials, detail, href, trailing, className, ...rest } = props

  // render vars
  const identity = (
    <>
      <Avatar initials={initials} size="sm" />
      <span className={cn(styles.body())}>
        <span className={cn(styles.name())}>{name}</span>
        {detail && <span className={cn(styles.detail())}>{detail}</span>}
      </span>
    </>
  )

  // jsx
  return (
    <div ref={ref} className={cn(styles.root({ className }))} {...rest}>
      {href ? (
        <Link className={cn(styles.identity({ link: true }))} href={href}>
          {identity}
        </Link>
      ) : (
        <span className={cn(styles.identity())}>{identity}</span>
      )}
      {trailing && <span className={cn(styles.trailing())}>{trailing}</span>}
    </div>
  )
})
FriendRow.displayName = 'FriendRow'

export { FriendRow }
export type { FriendRowProps, FriendRowRef }
