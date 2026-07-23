'use client'

import { type ReactNode } from 'react'
import { X } from 'lucide-react'
import { Dialog as Primitive } from 'radix-ui'
import { cn, cva } from '@/utils/theme'

const styles = {
  overlay: cva('animate-fade-in bg-foreground/40 fixed inset-0 z-40'),
  content: cva(
    'bg-card text-card-foreground animate-fade-in gap-lg border-border fixed top-1/2 left-1/2 z-50 flex w-[calc(100%-2rem)] max-w-96 -translate-x-1/2 -translate-y-1/2 flex-col rounded-lg border p-6 shadow-xl'
  ),
  title: cva('font-display text-h2 text-foreground'),
  description: cva('text-muted-foreground text-sm'),
  close: cva('text-muted-foreground hover:text-foreground absolute top-4 right-4 transition-colors')
}

type DialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description?: string
  children: ReactNode
}

/** A centered modal dialog over a scrim; controlled by `open`. Built on the Radix Dialog primitive. */
const Dialog = (props: DialogProps) => {
  // props
  const { open, onOpenChange, title, description, children } = props

  // jsx
  return (
    <Primitive.Root open={open} onOpenChange={onOpenChange}>
      <Primitive.Portal>
        <Primitive.Overlay className={cn(styles.overlay())} />
        <Primitive.Content className={cn(styles.content())}>
          <Primitive.Title className={cn(styles.title())}>{title}</Primitive.Title>
          {description ? (
            <Primitive.Description className={cn(styles.description())}>
              {description}
            </Primitive.Description>
          ) : (
            <Primitive.Description className="sr-only">{title}</Primitive.Description>
          )}
          {children}
          <Primitive.Close className={cn(styles.close())} aria-label="Close">
            <X className="size-5" aria-hidden />
          </Primitive.Close>
        </Primitive.Content>
      </Primitive.Portal>
    </Primitive.Root>
  )
}

export { Dialog }
export type { DialogProps }
