/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'DM Sans'", "sans-serif"],
        serif: ["'Playfair Display'", "serif"],
        mono: ["'DM Mono'", "monospace"],
      },
      colors: {
        cream: {
          50: "#FDFAF5",
          100: "#F7F0E3",
          200: "#EDE0C8",
        },
        ink: {
          900: "#1A1611",
          800: "#2D2820",
          700: "#3D3830",
          500: "#6B6560",
          300: "#A09A94",
        },
        amber: {
          accent: "#C8913A",
          light: "#E8B96A",
          muted: "#F0D5A0",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: "translateY(12px)" }, to: { opacity: 1, transform: "translateY(0)" } },
        scaleIn: { from: { opacity: 0, transform: "scale(0.95)" }, to: { opacity: 1, transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};
