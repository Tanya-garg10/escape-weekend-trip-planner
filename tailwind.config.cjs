/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: 'hsl(34, 82%, 50%)', // amber accent
        ink: 'hsl(220, 30%, 10%)',
        cream: 'hsl(40, 28%, 97%)',
        surface: 'hsl(0, 0%, 100%)',
        border: 'hsl(220, 15%, 92%)',
      },
      borderRadius: {
        card: '0.75rem',
        btn: '0.75rem',
        pill: '9999px',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['"DM Serif Display"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0,0,0,0.08)',
        cardHover: '0 8px 20px rgba(0,0,0,0.12)',
      },
      animation: {
        fadeUp: 'fadeUp 0.5s cubic-bezier(.22,1,.36,1) both',
        fadeIn: 'fadeIn 0.4s ease both',
        scaleIn: 'scaleIn 0.35s cubic-bezier(.22,1,.36,1) both',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        scaleIn: {
          from: { opacity: '0', transform: 'scale(0.94)' },
          to: { opacity: '1', transform: 'scale(1)' },
        },
      },
    },
  },
  plugins: [],
};
