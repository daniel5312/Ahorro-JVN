/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#9333EA", // morado Astar
        secondary: "#22C55E", // verde ahorro
        darkBg: "#0A0A0B", // fondo base oscuro
      },
      backgroundImage: {
        "radial-gradient":
          "radial-gradient(circle at 20% 30%, #1a1a1a, #000000 90%)",
      },
      boxShadow: {
        glow: "0 0 10px rgba(147, 51, 234, 0.4)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};


