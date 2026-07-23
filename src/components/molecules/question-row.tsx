import { forwardRef, type HTMLAttributes } from 'react'
import { ChevronRight } from 'lucide-react'
import { type ProfileQuestion } from '@/types/profile'
import { cn, cva, type VariantProps } from '@/utils/theme'

const styles = {
  root: cva('gap-md flex w-full items-center justify-between py-4 text-left'),
  body: cva('flex flex-col gap-1'),
  label: cva('font-display text-title text-foreground'),
  answer: cva('text-muted-foreground text-sm'),
  chevron: cva('text-muted-foreground size-5 shrink-0')
}

type QuestionRowRef = HTMLButtonElement
type QuestionRowProps = HTMLAttributes<QuestionRowRef> &
  VariantProps<typeof styles.root> & {
    question: ProfileQuestion
  }

/** One questionnaire row: the label with its answer or `score / max` beneath, and a chevron. */
const QuestionRow = forwardRef<QuestionRowRef, QuestionRowProps>((props, ref) => {
  // props
  const { question, className, ...rest } = props

  // render vars
  const detail = question.scale
    ? `${question.scale.score} / ${question.scale.max}`
    : (question.answer ?? 'add')

  // jsx
  return (
    <button ref={ref} type="button" className={cn(styles.root({ className }))} {...rest}>
      <span className={cn(styles.body())}>
        <span className={cn(styles.label())}>{question.label}</span>
        <span className={cn(styles.answer())}>{detail}</span>
      </span>
      <ChevronRight className={cn(styles.chevron())} aria-hidden />
    </button>
  )
})
QuestionRow.displayName = 'QuestionRow'

export { QuestionRow }
export type { QuestionRowProps, QuestionRowRef }
