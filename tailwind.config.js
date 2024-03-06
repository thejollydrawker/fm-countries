/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,vue}"],
  theme: {
    extend: {
      colors: {
        primary: {
          background: "hsl(0, 0%, 98%)",
          text: "hsl(200, 15%, 8%)",
          element: "hsl(0, 0%, 100%)"
        },
        secondary: {
          background: "hsl(207, 26%, 17%)",
          text: "hsl(0, 0%, 100%)",
          element: "hsl(209, 23%, 22%)"
        }

      }
    },
  },
  darkMode: 'selector',
  plugins: [],
}

