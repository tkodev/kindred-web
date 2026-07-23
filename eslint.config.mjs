import { withTkodevConfig } from '@tkodev/eslint-config-next'
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y'

export default withTkodevConfig([
  { ignores: ['.next/', 'out/', 'node_modules/', 'next-env.d.ts'] },
  {
    files: ['src/**/*.{jsx,tsx}'],
    rules: {
      ...jsxA11yPlugin.flatConfigs.strict.rules,
      'jsx-a11y/aria-role': ['error', { ignoreNonDOM: true }],
      'jsx-a11y/no-autofocus': ['error', { ignoreNonDOM: true }]
    }
  },
  {
    files: [
      'src/app/**/{page,layout,template,loading,error,not-found,default,route,sitemap,robots,manifest}.{ts,tsx}',
      '*.config.{ts,mjs}',
      'eslint.config.mjs'
    ],
    rules: { 'import/no-default-export': 'off' }
  }
])
