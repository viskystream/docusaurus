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
  default: {
    colors: {
      primary: colors.cyan,
      secondary: colors.indigo,
    }
  },
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  corePlugins: {
    // preflight: false,
    // container: false,
  },
  // paths that will be local to client apps (umbrella/clients/*)
  content: [
    './src/**/*.{js,jsx,ts,tsx,html}',
    './docs/**/*.{md,mdx}',
    './markdoc/**/*.{md,mdx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './plugins/**/*.{js,jsx,ts,tsx}',
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
