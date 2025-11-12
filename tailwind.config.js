export default {
  content: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          darkest: "#100033",
          dark: "#1b074b",
          purple: "#20004b",
          "purple-light": "#3c0074",
        },
        accent: {
          yellow: "#fcd34d", // yellow-300
        },
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(to bottom, #20004b, #3c0074)",
        "brand-gradient-r": "linear-gradient(to right, #1b074b, #100033)",
      },
    },
  },
  plugins: [],
};
