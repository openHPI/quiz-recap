/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  important: '.quiz-recap',
  prefix: 'qr-',
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-dark': 'var(--color-primary-dark)',

        neutral: 'var(--color-neutral)',
        'neutral-light': 'var(--color-neutral-light)',

        success: 'var(--color-success)',
        'success-dark': 'var(--color-success-dark)',

        danger: 'var(--color-danger)',
        'danger-dark': 'var(--color-danger-dark)',
      },
    },
  },
  plugins: [],
};
