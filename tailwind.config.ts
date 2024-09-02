import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
	],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    screens: {
      "csxxs": "353px",
      "csz": "450px",
      "cs": "530px",
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1400px",
      "3xl": "1600px",
      
    },
    extend: {
      
      fontSize:{
        "display-large": ["3.25rem",{lineHeight: "130%"}], //52px
        "display-small": ["2.75rem",{lineHeight: "130%"}], //44px
        "h1-d": ["2.5rem",{lineHeight: "130%"}], 
        "h2-d": ["2.25rem",{lineHeight: "130%"}], 
        "h3-d": ["2rem",{lineHeight: "130%"}], 
        "h4-d": ["1.75rem",{lineHeight: "130%"}],
        "h5-d": ["1.5rem",{lineHeight: "130%"}], 
        "h6-d": ["1.25rem",{lineHeight: "130%"}], 
        "h1-m": ["2.25rem",{lineHeight: "130%"}], 
        "h2-m": ["2rem",{lineHeight: "130%"}], 
        "h3-m": ["1.75rem",{lineHeight: "130%"}], 
        "h4-m": ["1.5rem",{lineHeight: "130%"}], 
        "h5-m": ["1.25rem",{lineHeight: "130%"}], 
        "h6-m": ["1.125rem",{lineHeight: "130%"}],
        "p-l": ["1.125rem",{lineHeight: "160%"}],
        "p-n": ["1rem",{lineHeight: "160%"}],
        "p-s": ["0.875rem",{lineHeight: "160%"}],
        "p-x-small": ["0.75rem",{lineHeight: "160%"}],
        "label-n": ["1rem", {lineHeight: "110%"}],
        "label-s": ["0.875rem", {lineHeight: "110%"}],
        "label-x-small": ["0.75rem", {lineHeight: "110%"}],
        "label-xx-small": ["0.625rem", {lineHeight: "110%"}],
      },
      colors: {
        "c-red-100": "#fdcad1",
        "c-red-200": "#fbb0ba",
        "c-red-300": "#fa8c9b",
        "c-red-400": "#f97587",
        "c-red-500": "#F75369",
        "c-red-600": "#e14c60",
        "c-red-700": "#AF3B4B",
        "c-red-800": "#882e3a",
        "c-red-900": "#68232c",
        "n-10": "#fafafa",
        "n-20": "#f6f6f6",
        "n-30": "#ededed",
        "n-40": "#e1e1e1",
        "n-50": "#c5c5c6",
        "n-60": "#b7b7b8",
        "n-70": "#acacad",
        "n-80": "#9e9e9f",
        "n-90": "#909092",
        "n-100": "#828284",
        "n-200": "#747476",
        "n-300": "#676769",
        "n-400": "#5b5b5d",
        "n-500": "#4d4d4f",
        "n-600": "#424244",
        "n-700": "#313134",
        "n-800": "#242426",
        "n-900": "#18181b",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'translate-y-fade-in': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        },
        'translate-y-fade-in-fast': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0%)', opacity: '1' }
        },
        'float': {
          '0%. 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(50px)' },
        },
        'fast-float':{
          '0%. 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(50px)' },
        },
        'fade-in': {
          '0%': {opacity: '0'},
          '100%':{opacity: '1'},
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 1s ease-out",
        "translate-y-fade-in-fast-then-float": "translate-y-fade-in-fast 800ms ease-in-out forwards",
        "translate-y-fade-in-then-float": "translate-y-fade-in 900ms ease-in-out 400ms forwards",
        "float": "float 4.5s ease-in-out 1.3s infinite",
        "fast-float": "fast-float 4.5s ease-in-out 1.4s infinite",
      },
      
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config