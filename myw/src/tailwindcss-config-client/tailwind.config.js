const colors = require('tailwindcss/colors')
const themeKey = process.env.REACT_APP_THEME || 'default';

const navy700 = '#175CD3';
const navy = {
  25: '#F5FAFF',
  50: '#EFF8FF',
  100: '#D1E9FF',
  200: '#B2DDFF',
  300: '#84CAFF',
  400: '#53B1FD',
  500: '#175CD3',
  600: '#1570EF',
  700: navy700,
  800: '#1849A9',
  900: '#194185',
  950: '#102A56',
}


const themeObject = {
  generflow: {
    colors: {
      primary: colors.orange,
      secondary: colors.amber,
    }
  },
  nativeframe: {
    colors: {
      primary: colors.blue,
      secondary: colors.teal,
    }
  },
  default: {
    colors: {
      primary: colors.cyan,
      secondary: colors.indigo,
    }
  },
  'nativeframe-dashboard': {
    colors: {
      // Mapping 500 & 600 to 700 for primary color. True 500 is 450 and 600 is 550
      // Useful for shared components that use 500 or 600 as primary color
      primary: { ...navy, 600: navy700, 500: navy700, 550: navy[600],450: navy[500], },
      secondary: colors.teal,
    }
  }
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  // paths that will be local to client apps (umbrella/clients/*)
  content: [
    '../packages/shared/src/components/**/*.{js,jsx,ts,tsx}',
    '../packages/shared/src/layouts/**/*.{js,jsx,ts,tsx}',
    '../packages/shared/src/features/**/*.{js,jsx,ts,tsx}',
    '../packages/demos/**/*.{js,jsx,ts,tsx}',
    'src/**/*.{js,jsx,ts,tsx}',
    'public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        ...themeObject[themeKey].colors,
        navy,
      },
      borderWidth: {
        '3': '3px',
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      // prevent form input styles from being styled globally
      strategy: 'class',
    }),
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
    require('tailwind-scrollbar-hide'),
  ],
}
