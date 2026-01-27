/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        // We'll add custom colors here later based on the design
        primary: "#C41E3A", // Updated to match screenshot
      },
    },
  },
  plugins: [],
};
