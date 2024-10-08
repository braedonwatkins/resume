/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  purge: ["*.{html,js,jsx,ts,tsx"],
  content: ["*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Ubuntu", "Sans-serif"],
      },
    },
  },
  plugins: [],
};

