/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  // NOTE: This project uses Halstack (DXC Design System), not Tailwind CSS
  // This config exists only to suppress PostCSS warnings from Vite
}
