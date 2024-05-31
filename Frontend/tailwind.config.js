/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
        mytheme: { 
          "primary": "#ef4444",
          "secondary": "#f5f5f4",
          "accent": "#fca5a5",
          "neutral": "#292524",
          "base-100": "#1c1917",
          "info": "#3b82f6",
          "success": "#84cc16",
          "warning": "#fde047",
          "error": "#dc2626",
        },
      }
    ],
  },
  safelist: [
    'alert-info',
    'alert-success',
    'alert-warning',
    'alert-error',
  ],
}