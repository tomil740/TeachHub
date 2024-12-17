/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      minHeight: {
        "calc-100dvh-minus-80": "calc(100dvh - 80px)",
        "calc-100vh-minus-80": "calc(100vh - 80px)",
      },
    },
  },
  plugins: [],
};
