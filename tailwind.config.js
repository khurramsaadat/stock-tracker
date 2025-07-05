/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#181a20',
        card: '#222531',
        positive: '#16c784',
        negative: '#ea3943',
      },
    },
  },
  plugins: [],
}; 