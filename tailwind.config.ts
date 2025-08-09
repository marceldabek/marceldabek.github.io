

import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx,mdx}', './content/**/*.{md,mdx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter','ui-sans-serif','system-ui','sans-serif'] },
      colors: { bg: '#F7F8FA', text: '#111827', muted: '#6B7280', accent: '#2563EB' },
      borderRadius: {
        '2xl': '1rem'
      },
      boxShadow: {
        soft: '0 10px 30px rgba(0,0,0,0.25)'
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bullets': 'var(--muted)',
            a: { textDecoration: 'none', fontWeight: '600' },
            'a:hover': { textDecoration: 'underline' },
            img: { borderRadius: '0.75rem', boxShadow: '0 6px 16px rgba(0,0,0,.08)' },
            code: { backgroundColor: 'rgba(0,0,0,.04)', padding: '0.15rem 0.35rem', borderRadius: '0.375rem' },
          }
        }
      }
    }
  },
  plugins: [typography],
} satisfies Config
