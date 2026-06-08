import type { Config } from 'tailwindcss';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        glow: '0 12px 36px rgba(59, 130, 246, 0.18)'
      }
    }
  },
  plugins: []
} satisfies Config;
