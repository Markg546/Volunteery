module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        '260px' : '260px',
        '412px' : '412px',
      },
    },
    screens: {
      sm: '340px',
      md: '640px',
    },
    colors: {
      ui: {
        'white': '#ffffff',
        'black': '#000000',
        'accent-10' : '#F2F9FF',
        'accent-30' : '#D8ECFF',
        'blueish-grey' : '#E4EBF3',
        'grey' : '#60758B',
        'black-100' : '#09090F',
        'coal' : '#3A3A3A',
      },
      brand: {
        'dark-blue' : '#258AFF',
      },
    },
    fontSize: {
      'corner-logo' : ['68px', '88px'],
      'h1' : ['48px', '58px'],
      'big-text' : ['112px', '112px'],
      'button-md' : ['14px', '18px'],
      'h3' : ['18px', '24px'],
      'h4' : ['18px', '19px'],
      'hours' : ['16px', '22px'],
      'card-name' : ['20px', '30px'],
      'checkbox' : ['15px', '24px'],
    },
    fontFamily: {
      Gilroy: ['Gilroy', 'sans-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
