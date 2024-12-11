/* eslint-disable @typescript-eslint/no-var-requires */
const { fontFamily } = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      screens: {
        'mobile-s': '320px',
        'mobile-m': '375px',
        'mobile-l': '425px',
        'mobile-demo': '475px',
      },

      fontSize: {
        '2xs': '0.625rem',
      },

      fontFamily: {
        primary: ["'Lexend Exa'", ...fontFamily.sans],
        secondary: ['poppins', ...fontFamily.sans],
      },

      colors: {
        primary: {
          50: 'rgb(var(--tw-color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--tw-color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--tw-color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--tw-color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--tw-color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--tw-color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--tw-color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--tw-color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--tw-color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--tw-color-primary-900) / <alpha-value>)',
        },
        secondary: {
          500: 'rgb(var(--tw-color-secondary-500)) / <alpha-value>',
        },
        dark: '#1A181A',
        light: '#F3F4F6', // Added light background for story backgrounds or light themes
        highlight: '#FF3E00', // Accent color for active stories
      },
      keyframes: {
        flicker: {
          '0%, 19.999%, 22%, 62.999%, 64%, 64.999%, 70%, 100%': {
            opacity: 0.99,
            filter:
              'drop-shadow(0 0 1px rgba(252, 211, 77)) drop-shadow(0 0 15px rgba(245, 158, 11)) drop-shadow(0 0 1px rgba(252, 211, 77))',
          },
          '20%, 21.999%, 63%, 63.999%, 65%, 69.999%': {
            opacity: 0.4,
            filter: 'none',
          },
        },
        shimmer: {
          '0%': {
            backgroundPosition: '-700px 0',
          },
          '100%': {
            backgroundPosition: '700px 0',
          },
        },
        'friends-slider': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(calc(-145px*5))' },
        },
        'story-highlight': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        flicker: 'flicker 3s linear infinite',
        shimmer: 'shimmer 1.3s linear infinite',
        'auto-friends-slider': 'friends-slider 20s linear infinite',
        'highlight-pulse': 'story-highlight 2s infinite',
      },

      spacing: {
        'story-gap': '0.75rem', // Consistent gap between stories
      },

      backgroundImage: {
        'gradient-primary':
          'linear-gradient(111.1deg, rgb(var(--tw-color-primary-500))  7.7%, rgb(var(--tw-color-secondary-500)) 87.64%)',
        'story-border': 'radial-gradient(circle, #FF3E00, #10B981)', // Gradient for story borders
      },

      borderRadius: {
        'story-circle': '50%', // For circular story avatars
      },

      boxShadow: {
        story: '0 4px 6px rgba(0, 0, 0, 0.1)', // Subtle shadow for story cards
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-debug-screens'),
    require('@tailwindcss/forms'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
    function ({ addUtilities }) {
      addUtilities({
        '.inset-center': {
          top: '50%',
          left: '50%',
          '@apply -translate-x-1/2 -translate-y-1/2': {},
        },
        '.inset-x-center': {
          left: '50%',
          '@apply -translate-x-1/2': {},
        },
        '.inset-y-center': {
          top: '50%',
          '@apply -translate-y-1/2': {},
        },
        '.story-avatar': {
          width: '3rem',
          height: '3rem',
          '@apply rounded-story-circle shadow-story': {},
        },
        '.story-active': {
          '@apply border-2 border-highlight animate-highlight-pulse': {},
        },
      });
    },
  ],
};
