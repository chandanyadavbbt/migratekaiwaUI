/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        customPurple: '#040421',
        customGrey: '#21212E',
        customBlack: '#13131F',
        customTop: '#1C1B37',
        customBottom: '#1A1A31',
        customBorder: '#4E4D9D',
        customTopIn: '#37353F',
        customMiddleIn: '#403A53',
        customBottomIn: '#282636',
        customBorderIn: '#464563',
        customBlue: '#1575BA',

      },
      backgroundImage: {
        'custom-radial': 'radial-gradient(circle, #1575BA, white)',
      },
      rotate:{
        "45":"45deg"
      },
      animation: {
        pulseBlob: 'pulseBlob 2s infinite',
      },
      keyframes: {
        pulseBlob: {
          '0%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0.7)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
          },
          '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          },
        },
      },
    },
  },
  variants: {
    extend: {
      visibility: ['group-hover'],
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
