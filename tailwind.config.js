/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: '#F1F5F9',
        surface: {
          1: '#FFFFFF',
          2: '#F8FAFC',
          3: '#E2E8F0',
          elevated: '#FFFFFF',
        },
        ink: {
          primary: '#0F172A',
          secondary: '#475569',
          tertiary: '#94A3B8',
          faint: '#CBD5E1',
        },
        accent: {
          green: '#10B981',
          'green-light': '#34D399',
          'green-pale': '#A7F3D0',
          red: '#EF4444',
          'red-light': '#F87171',
          purple: '#A78BFA',
          lavender: '#B4A7D6',
          blue: '#60A5FA',
          yellow: '#FBBF24',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'Noto Sans SC', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      borderRadius: {
        'xl': '20px',
        'lg': '16px',
        'md': '12px',
        'sm': '8px',
        'pill': '9999px',
      },
      boxShadow: {
        'card': '0 1px 3px rgba(15,23,42,0.06), 0 6px 20px rgba(15,23,42,0.04)',
        'elevated': '0 8px 32px rgba(15,23,42,0.10)',
      },
    },
  },
  plugins: [],
}
