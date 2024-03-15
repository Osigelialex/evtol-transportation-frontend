/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': 'Poppins' 
      },
      backgroundImage: {
        'evtol': "url('/evtol.jpg')"
      }
    },
  },
  plugins: [],
}

