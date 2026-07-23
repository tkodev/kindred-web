import { FC, type HTMLAttributes } from 'react'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('min-size-full h-auto')
}

type MainProps = HTMLAttributes<HTMLDivElement> & VariantProps<typeof styles.root>

const Main: FC<MainProps> = (props) => {
  const { className, children, ...rest } = props

  return (
    <main className={cn(styles.root({ className }))} {...rest}>
      {children}
    </main>
  )
}

export { Main }
