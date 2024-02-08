/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        'primary-light': 'var(--color-primary-light)',

        neutral: 'var(--color-neutral)',
        'neutral-light': 'var(--color-neutral-light)',

        success: 'var(--color-success)',
        'success-light': 'var(--color-success-light)',

        danger: 'var(--color-danger)',
        'danger-light': 'var(--color-danger-light)',
      },
    },
  },
  plugins: [],
};
