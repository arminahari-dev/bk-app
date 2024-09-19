import daisyui from "daisyui"
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'mobile-s': '320px',
      'mobile-m': '375px',
      'mobile': '425px',
      'tablet': '768px',
      'laptop': '1024px',
      'desktop': '1440px',
      'desktop-large': '2560px',
    },
    extend: {},
  },
  plugins: [
    daisyui,
  ]
}