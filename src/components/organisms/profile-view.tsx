'use client'

import { useState } from 'react'
import { Button } from '@/components/atoms/button'
import { Chip } from '@/components/atoms/chip'
import { Dialog } from '@/components/atoms/dialog'
import { EntryCard } from '@/components/molecules/entry-card'
import { QuestionRow } from '@/components/molecules/question-row'
import { SectionHeading } from '@/components/molecules/section-heading'
import { type ProfileCategory, type ProfileQuestion } from '@/types/profile'
import { client } from '@/utils/orpc'
import { cn, cva } from '@/utils/theme'

const styles = {
  root: cva('gap-xl flex w-full flex-col'),
  tabs: cva('gap-sm hide-scrollbar -mx-4 flex overflow-x-auto px-4'),
  tab: cva('font-display text-title shrink-0 rounded-lg px-4 py-2 transition-colors', {
    variants: {
      active: {
        true: 'bg-secondary text-secondary-foreground',
        false: 'text-muted-foreground hover:text-foreground'
      }
    },
    defaultVariants: { active: false }
  }),
  completion: cva('text-success text-sm font-bold'),
  section: cva('gap-md flex flex-col'),
  chips: cva('gap-sm flex flex-wrap'),
  rows: cva('divide-border flex flex-col divide-y'),
  entries: cva('gap-sm flex flex-col'),
  field: cva('gap-sm flex flex-col'),
  label: cva('text-muted-foreground text-sm'),
  input: cva(
    'bg-background border-border text-foreground focus:border-ring w-full rounded-lg border px-4 py-3 outline-none'
  ),
  actions: cva('gap-sm mt-md flex justify-end')
}

type ProfileViewProps = {
  categories: ProfileCategory[]
}

/** The profile questionnaire: a category selector over the active category, with editable rows. */
const ProfileView = (props: ProfileViewProps) => {
  // props
  const { categories: initial } = props

  // hooks
  const [categories, setCategories] = useState(initial)
  const [activeId, setActiveId] = useState(initial[0]?.id)
  const [editing, setEditing] = useState<ProfileQuestion | null>(null)
  const [draft, setDraft] = useState('')
  const [saving, setSaving] = useState(false)

  // render vars
  const active = categories.find((category) => category.id === activeId) ?? categories[0]
  const isScale = Boolean(editing?.scale)

  // handlers
  const openEditor = (question: ProfileQuestion) => {
    setEditing(question)
    setDraft(question.scale ? String(question.scale.score) : (question.answer ?? ''))
  }

  const onSave = async () => {
    if (!editing) return
    setSaving(true)
    const payload = editing.scale
      ? { questionId: editing.id, score: Number(draft) || 0 }
      : { questionId: editing.id, answer: draft }
    const updated = await client.profile.setAnswer(payload)
    setCategories(updated.categories)
    setSaving(false)
    setEditing(null)
  }

  // jsx
  return (
    <div className={cn(styles.root())}>
      <div className={cn(styles.tabs())} aria-label="Profile categories" role="tablist">
        {categories.map((category) => (
          <button
            key={category.id}
            type="button"
            className={cn(styles.tab({ active: category.id === active?.id }))}
            aria-selected={category.id === active?.id}
            role="tab"
            onClick={() => setActiveId(category.id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      {active && (
        <>
          <span className={cn(styles.completion())}>{active.completion}% complete</span>
          {active.sections.map((section) => (
            <section key={section.id} className={cn(styles.section())}>
              <SectionHeading>{section.title}</SectionHeading>
              {section.kind === 'questions' && (
                <div className={cn(styles.rows())}>
                  {section.questions.map((question) => (
                    <QuestionRow
                      key={question.id}
                      question={question}
                      onClick={() => openEditor(question)}
                    />
                  ))}
                </div>
              )}
              {section.kind === 'chips' && (
                <div className={cn(styles.chips())}>
                  {section.chips.map((chip) => (
                    <Chip
                      key={chip.id}
                      isFavorite={chip.isFavorite}
                      label={chip.label}
                      selected
                      showChevron
                    />
                  ))}
                </div>
              )}
              {section.kind === 'entries' && (
                <div className={cn(styles.entries())}>
                  {section.entries.map((entry) => (
                    <EntryCard key={entry.id} entry={entry} />
                  ))}
                </div>
              )}
            </section>
          ))}
        </>
      )}

      <Dialog
        description={isScale ? `Rate from 0 to ${editing?.scale?.max}` : undefined}
        open={editing !== null}
        title={editing?.label ?? ''}
        onOpenChange={(open) => !open && setEditing(null)}
      >
        <div className={cn(styles.field())}>
          <label className={cn(styles.label())} htmlFor="answer">
            {isScale ? 'Your rating' : 'Your answer'}
          </label>
          {isScale ? (
            <input
              id="answer"
              type="number"
              className={cn(styles.input())}
              max={editing?.scale?.max}
              min={0}
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          ) : (
            <input
              id="answer"
              type="text"
              className={cn(styles.input())}
              placeholder="Type your answer"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
            />
          )}
        </div>
        <div className={cn(styles.actions())}>
          <Button size="sm" variant="ghost" onClick={() => setEditing(null)}>
            Cancel
          </Button>
          <Button disabled={saving} size="sm" onClick={onSave}>
            {saving ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </Dialog>
    </div>
  )
}

export { ProfileView }
export type { ProfileViewProps }
