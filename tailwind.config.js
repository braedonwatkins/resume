/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx}"],
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};

