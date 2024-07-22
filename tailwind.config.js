/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "sans-serif"],
        hand: ["Caveat Brush", "sans-serif"],
      },
      animation: {
        "fade-image": "fadeInOut 9s infinite;",
        "fade-left": "fadeFromLeft 1s ease-in-out",
        "fade-right": "fadeFromRight 1s ease-in-out",
        "fade-bottom": "fadeFromBottom 1s ease-in-out",
      },
      keyframes: {
        fadeFromLeft: {
          "0%": { opacity: 0, transform: "translateX(-3rem)" },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        fadeFromBottom: {
          "0%": { opacity: 0, transform: "translateY(3rem)" },
          "100%": {
            opacity: 1,
            transform: "translateY(0)",
          },
        },
        fadeFromRight: {
          "0%": { opacity: 0, transform: "translateX(3rem)" },
          "100%": {
            opacity: 1,
            transform: "translateX(0)",
          },
        },
        fadeInOut: {
          "0%": { opacity: 0 },
          "10%": { opacity: 1 },
          "30%": { opacity: 1 },
          "40%": { opacity: 0 },
          "100%": { opacity: 0 },
        },
      },
    },
  },
  plugins: [],
};
