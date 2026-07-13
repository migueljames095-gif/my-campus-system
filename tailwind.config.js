/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#030213',
        secondary: '#0f172a',
        accent: '#3b82f6',
        success: '#22c55e',
        danger: '#ef4444',
        warning: '#facc15',
      },
    },
  },
  plugins: [],
}
