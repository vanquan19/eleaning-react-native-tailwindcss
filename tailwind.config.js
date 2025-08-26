const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
         primary: {
          DEFAULT: "#6D28D9",
          foreground: "#FFFFFF",
        },
        background: {
          DEFAULT: "#FFFFFF",
          dark: "#0F172A",
          secondary: "#DDD6FE",
        },
        foreground: {
          DEFAULT: "#0F172A",
          dark: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#DDD6FE",
          foreground: "#1E1B4B",
          dark: "#4C1D95",
        },
        destructive: {
          DEFAULT: "#EF4444",
          foreground: "#FFFFFF",
          dark: "#DC2626",
        },
        muted: {
          DEFAULT: "#F3F4F6",
          foreground: "#6B7280",
          dark: "#374151",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          foreground: "#FFFFFF",
          dark: "#7C3AED",
        },
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#0F172A",
          dark: "#1E1B4B",
        },
        border: {
          DEFAULT: "#E5E7EB",
          dark: "#4B5563",
        },
        input: {
          DEFAULT: "#E5E7EB",
          dark: "#374151",
        },
        ring: {
          DEFAULT: "#6D28D9",
          dark: "#8B5CF6",
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
