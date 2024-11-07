/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/Components/Pages/MyBookings.tsx",
    "./src/Components/Pages/*.tsx",
    "./src/Components/Layouts/*.tsx"
  ],
  theme: {
    // screens: {
    //   'xs': '480px',
    //   'sm': '600px',
    //   'md': '768px',
    //   'lg': '1024px'
    // },
    extend: {
      clipPath: {
        'custom-polygon' : 'polygon(100% 100%, 0% 100%, 100% 0%)',
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-in forwards',
        'slide-in-left': 'slideInFromLeft 1s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0'},
          '100%': { opacity: '1'},
        },
        slideInFromLeft: {
          '0%': {
            transform: 'translateX(-100%)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateX(0)',
            opacity: '1',
          },
        },
      },
    },
  },
  plugins: [
    require('tailwind-clip-path')
  ],
}