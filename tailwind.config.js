/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#D31820',
          darkRed: '#990B11',
          lightRed: '#FF4D55',
          dark: '#0D0506',
          darker: '#070203',
          card: 'rgba(20, 5, 7, 0.65)',
          border: 'rgba(211, 24, 32, 0.25)',
          accent: '#FF2A35'
        }
      },
      fontFamily: {
        cursive: ['"Dancing Script"', 'cursive'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(211, 24, 32, 0.4)' },
          '100%': { boxShadow: '0 0 35px rgba(255, 77, 85, 0.8)' }
        }
      }
    },
  },
  plugins: [],
}
