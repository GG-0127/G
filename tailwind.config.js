/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        primary: {
          50: '#eef2f7',
          100: '#d4dde9',
          200: '#b0c2d6',
          300: '#8ba6c2',
          400: '#668bae',
          500: '#41709a',
          600: '#2b5580',
          700: '#1a365d',
          800: '#122a4a',
          900: '#0a1d37',
        },
        gold: {
          50: '#fdf8ed',
          100: '#f9edcc',
          200: '#f3db99',
          300: '#ecc766',
          400: '#e6b840',
          500: '#d4a853',
          600: '#b8923a',
          700: '#8f6f2d',
          800: '#6b5222',
          900: '#473617',
        },
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', 'serif'],
        sans: ['"PingFang SC"', '"Microsoft YaHei"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};