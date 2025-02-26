/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Bao gồm tất cả file trong thư mục src
  ],
  theme: {
    extend: {
      backgroundImage: {
        // Tạo một gradient tùy chỉnh
        'custom-gradient': 'linear-gradient(to right, #C8DCF5, #B0BCF5, #EBD0E8)',
      },
      fontFamily: {
        sans: ["Inter", "sans"],
        serif: ["serif"],
      },
    },
  },
  plugins: [],
}

