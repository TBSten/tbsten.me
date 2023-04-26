/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        "xs": "360px",
      },
      colors: {
        "twitter": "#1DA1F2",
        "zenn": "#3ea8ff",
        "qiita": "#55c500",
        "github": "#24292f",
      },
      fontWeight: {
        "normal": "400",
        "bold": "700",
      },
      fontFamily: {
        main: ["var(--font-main)"],
        dot: ["var(--font-dot) "],
      },
      animation: {
        "slide-in-from-left": "slideInFromLeft 0.5s ease 0s forwards",
        "slide-in-from-right": "slideInFromRight 0.5s ease 0s forwards",
      },
      keyframes: {
        slideInFromLeft: {
          "0%": {
            transform: "translateX(-20%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
        },
        slideInFromRight: {
          "0%": {
            transform: "translateX(20%)",
            opacity: "0",
          },
          "100%": {
            transform: "translateX(0%)",
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      {
        tbstenTheme: {
          "primary": "#3b82f6",
          "secondary": "#5b21b6",
          "accent": "#f43f5e",
          "neutral": "#4b5563",
          "base-100": "#FFFFFF",
          "info": "#cffafe",
          "success": "#d1fae5",
          "warning": "#fef3c7",
          "error": "#fee2e2",
          "primary-content": "#FFFFFF",
        },
      },
    ]
  },
}
