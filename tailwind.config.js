/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
          screens: {
              'xxs': '321px',
              'xs' : '480px',
              '3xl': '1900px',
          },
          fontFamily: {
              vimland: ['Vimland', 'sans-serif'],
              inter: ['Inter', 'sans-serif'],
          },
          colors: {
              'blue-1': '#1e293beb',
              'dark-gray': '#1E1E1E',
          },
          animation: {
              'reverse-spin': 'reverse-spin 1s linear infinite',
          },
          keyframes: {
              'reverse-spin': {
                  from: {
                      transform: 'rotate(360deg)',
                  },
              },
          },
      },
  },
    plugins: [],
  }
  