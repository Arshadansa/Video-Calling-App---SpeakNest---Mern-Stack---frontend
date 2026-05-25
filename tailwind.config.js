/** @type {import('tailwindcss').Config} */
export default {
  
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: "#7d58c2",
        secondary: "#181310",
        thirdary: "#d1d5dc",
      },
    },
  },

  plugins: [],
  
};
