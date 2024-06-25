/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      light: {
        background: "#e0f2fe",
        nav: "#93c5fd",
        primary: "#000000",
        secondary: "#ffffff",
        link: "#4392ff",
        hover: "#5779a7",
        card: "#a1c8f6",
        border: "#001d40",
      },
      dark: {
        background: "#152545",
        nav: "#142444",
        primary: "#94a3b8",
        secondary: "#fffbeb",
        link: "#7587ed",
        font_hover: "#65707e",
        card: "#293959",
        border: "#525967",
        card_stats: "#444a55",
        pagination: "#2563eb",
        button: "#1e3a8a",
      },
      heart: "#f87171",
    },
    extend: {},
  },
  darkMode: "class",
  plugins: [],
};
