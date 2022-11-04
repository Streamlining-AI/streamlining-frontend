
module.exports = {
  // mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'sl-orange' : '#FF985F',
      },
      fontFamily: {
        Jua: ['Jua', 'Inter'],
      },
    },
  },
  variants: {
    extend: {
      textColor: ['active'],
    },
  },
  plugins: [],
};