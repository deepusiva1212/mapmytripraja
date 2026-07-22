/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Fraunces', 'ui-serif', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          ink: '#0E2E2B',
          marigold: '#F3A537',
          vermilion: '#C13F2E',
          sage: '#6B8F71',
          sky: '#3E7C8C',
          mist: '#FAF6EF',
          slate: '#44524E',
        },
      },
      spacing: {
        84: '21rem', // matches TripDrawer's desktop sidebar width (w-80 + gutter)
      },
    },
  },
  plugins: [],
};
