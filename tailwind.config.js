/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '2rem',
        sm: '2rem',
        lg: '0rem'
      }
    },
    extend: {}
  },
  plugins: []
}
