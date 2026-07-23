import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva(
    'gap-sm font-body inline-flex items-center justify-center rounded-lg font-bold transition-colors disabled:pointer-events-none disabled:opacity-50',
    {
      variants: {
        variant: {
          primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
          secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
          outline: 'border-border text-foreground hover:bg-secondary/50 border',
          ghost: 'text-muted-foreground hover:text-foreground'
        },
        size: {
          sm: 'h-9 px-4 text-sm',
          md: 'text-title h-11 px-6'
        }
      },
      defaultVariants: { variant: 'primary', size: 'md' }
    }
  )
}

type ButtonRef = HTMLButtonElement
type ButtonProps = ButtonHTMLAttributes<ButtonRef> & VariantProps<typeof styles.root>

const Button = forwardRef<ButtonRef, ButtonProps>((props, ref) => {
  // props
  const { variant, size, type = 'button', className, children, ...rest } = props

  // jsx
  return (
    <button
      ref={ref}
      type={type}
      className={cn(styles.root({ variant, size, className }))}
      {...rest}
    >
      {children}
    </button>
  )
})
Button.displayName = 'Button'

export { Button }
export type { ButtonProps, ButtonRef }
