/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss';
const config: Config = {
  content: [
    './src/**/*.{ts,tsx}',
    './index.html'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#009578',
        secondary: '#00af8c',
        danger: '#ff9b91'
      },
    },
  },
  plugins: [],
};

export default config;