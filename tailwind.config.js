
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'zoom-in': 'zoomIn linear 5s 1s forwards',
        'zoom-out': 'zoomOut linear 2.4s forwards',
        "scale-up-center": "scale-up-center 0.2s cubic-bezier(0.390, 0.575, 0.565, 1.000)   both"
      },
      keyframes: {
        "scale-up-center": {
          "0%": {
            transform: "scale(.5)"
          },
          to: {
            transform: "scale(1)"
          }
        },
        'zoomIn': {
          to: {
            transform: 'scale(3)',
            'opacity': '0'
          },
          from: {
            transform: 'scale(1)'
          },
        },
        'zoomOut': {
          to: {
            'opacity': '1'
          },
          from: {
            'opacity': '0'
          },
        },
      }
    },
  },
  plugins: [],
}

