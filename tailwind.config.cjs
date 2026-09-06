module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 40%, 15%)',
        accent: 'hsl(34, 80%, 45%)',
        surface: 'hsla(0, 0%, 100%, 0.8)',
        "surface-dark": 'hsla(0, 0%, 0%, 0.5)',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
