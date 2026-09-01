/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#EDEAE2",
        charcoal: "#1C1B19",
        steel: "#4E5B60",
        safety: "#F5B700",
        rust: "#B0451C",
        line: "#C9C3B4",
      },
      fontFamily: {
        display: ["'Archivo Expanded'", "sans-serif"],
        body: ["'IBM Plex Sans'", "sans-serif"],
        mono: ["'IBM Plex Mono'", "monospace"],
      },
    },
  },
  plugins: [],
}
