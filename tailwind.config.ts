import type { Config } from 'tailwindcss'

export default {
  content: [
    "./public/**/*.{html,ts}",
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config

