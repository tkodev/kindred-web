import { type Profile } from '@/types/profile'

/**
 * Seed questionnaire returned by `profile.get` until real profiles and persistence land. This is
 * placeholder operational data, not site copy: an authored example that exercises every section
 * kind (questions, chips, entries) across the category set. See docs/02-prd/03-profile.md.
 */
const seedProfile: Profile = {
  displayName: 'You',
  categories: [
    {
      id: 'self',
      name: 'self',
      completion: 100,
      sections: [
        {
          id: 'self-questions',
          title: 'questions',
          kind: 'questions',
          questions: [
            { id: 'relationship', label: 'relationship status', answer: 'single' },
            { id: 'looking-for', label: 'what are you here for', answer: 'friends & dating' },
            { id: 'children', label: 'do you have or want children', answer: 'open to it' },
            {
              id: 'attractive',
              label: 'how attractive do you consider yourself',
              answer: null,
              scale: { score: 7, max: 10 }
            },
            {
              id: 'grounded',
              label: 'how grounded do you feel these days',
              answer: null,
              scale: { score: 8, max: 10 }
            },
            { id: 'religion', label: 'religion', answer: 'spiritual, not religious' },
            { id: 'politics', label: 'politics', answer: 'progressive' },
            { id: 'orientation', label: 'sexual orientation', answer: 'straight' }
          ]
        }
      ]
    },
    {
      id: 'professional',
      name: 'professional',
      completion: 80,
      sections: [
        {
          id: 'occupation',
          title: 'occupation',
          kind: 'chips',
          chips: [
            { id: 'product-lead', label: 'product lead', isFavorite: true },
            { id: 'founder', label: 'founder', isFavorite: false },
            { id: 'consultant', label: 'consultant', isFavorite: false }
          ]
        },
        {
          id: 'education',
          title: 'education',
          kind: 'entries',
          entries: [{ id: 'mcgill', title: 'McGill University', subtitle: 'Canada' }]
        },
        {
          id: 'professional-questions',
          title: 'questions',
          kind: 'questions',
          questions: [
            { id: 'industry', label: 'industry', answer: 'technology' },
            {
              id: 'ambition',
              label: 'how driven are you about work',
              answer: null,
              scale: { score: 7, max: 10 }
            },
            {
              id: 'work-talk',
              label: 'i enjoy talking about work when meeting people',
              answer: null,
              scale: { score: 3, max: 7 }
            }
          ]
        }
      ]
    },
    {
      id: 'interests',
      name: 'interests',
      completion: 100,
      sections: [
        {
          id: 'hobbies',
          title: 'hobbies',
          kind: 'chips',
          chips: [
            { id: 'cooking', label: 'cooking', isFavorite: true },
            { id: 'hiking', label: 'hiking', isFavorite: true },
            { id: 'pottery', label: 'pottery', isFavorite: false },
            { id: 'running', label: 'running', isFavorite: false },
            { id: 'reading', label: 'reading', isFavorite: false },
            { id: 'photography', label: 'photography', isFavorite: false },
            { id: 'gardening', label: 'gardening', isFavorite: false }
          ]
        },
        {
          id: 'topics',
          title: 'interests',
          kind: 'chips',
          chips: [
            { id: 'architecture', label: 'architecture', isFavorite: true },
            { id: 'wellness', label: 'wellness', isFavorite: true },
            { id: 'travel', label: 'slow travel', isFavorite: false },
            { id: 'wine', label: 'natural wine', isFavorite: false },
            { id: 'startups', label: 'startups', isFavorite: false }
          ]
        }
      ]
    },
    {
      id: 'music',
      name: 'music',
      completion: 60,
      sections: [
        {
          id: 'artists',
          title: 'favorite artists',
          kind: 'chips',
          chips: [
            { id: 'bon-iver', label: 'Bon Iver', isFavorite: true },
            { id: 'fkj', label: 'FKJ', isFavorite: false },
            { id: 'hiatus', label: 'Hiatus Kaiyote', isFavorite: false },
            { id: 'khruangbin', label: 'Khruangbin', isFavorite: false },
            { id: 'sault', label: 'SAULT', isFavorite: false }
          ]
        }
      ]
    },
    {
      id: 'screen',
      name: 'screen',
      completion: 40,
      sections: [
        {
          id: 'movies',
          title: 'favorite films',
          kind: 'entries',
          entries: [
            { id: 'past-lives', title: 'Past Lives', subtitle: '2023', isFavorite: true },
            { id: 'her', title: 'Her', subtitle: '2013', isFavorite: true },
            {
              id: 'lost-translation',
              title: 'Lost in Translation',
              subtitle: '2003',
              isFavorite: false
            }
          ]
        },
        {
          id: 'shows',
          title: 'favorite shows',
          kind: 'entries',
          entries: [
            { id: 'the-bear', title: 'The Bear', subtitle: '2022', isFavorite: true },
            { id: 'severance', title: 'Severance', subtitle: '2022', isFavorite: false }
          ]
        }
      ]
    },
    {
      id: 'going-out',
      name: 'going out',
      completion: 100,
      sections: [
        {
          id: 'going-out-questions',
          title: 'questions',
          kind: 'questions',
          questions: [
            { id: 'ideal-night', label: 'wine bar or dinner party', answer: 'dinner party' },
            {
              id: 'loud-settings',
              label: 'i enjoy loud, high-energy settings',
              answer: null,
              scale: { score: 3, max: 7 }
            },
            {
              id: 'spontaneous',
              label: 'spontaneous when going out',
              answer: null,
              scale: { score: 5, max: 7 }
            },
            { id: 'go-to', label: 'my go-to when hosting', answer: 'a long table and a slow menu' }
          ]
        }
      ]
    },
    {
      id: 'background',
      name: 'background',
      completion: 100,
      sections: [
        {
          id: 'background-questions',
          title: 'questions',
          kind: 'questions',
          questions: [
            { id: 'languages', label: 'fluent languages', answer: 'english & french' },
            { id: 'sibling', label: 'sibling order', answer: 'oldest' },
            { id: 'home-country', label: 'home country', answer: 'canada' },
            { id: 'hometown', label: 'hometown', answer: 'Montreal' },
            {
              id: 'upbringing',
              label: 'what shaped you most growing up',
              answer: 'moving cities a lot'
            },
            {
              id: 'describe',
              label: 'describe yourself',
              answer: 'curious, warm, a little contrarian'
            }
          ]
        }
      ]
    }
  ]
}

export { seedProfile }
