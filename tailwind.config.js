/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        chewy: ["Chewy", "cursive"], // 👈 custom font class
        poppins: ["Nunito", "sans-serif"],
      },
    },
  },
  plugins: [],
}


