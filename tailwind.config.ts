import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        cairo: ["Cairo", "sans-serif"],
        sans: [
          "Cairo",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Oxygen",
          "Ubuntu",
          "Cantarell",
          "Fira Sans",
          "Droid Sans",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#fff0f6", // خلفية فاتحة زهري
        foreground: "#610045", // نص زهري غامق
        primary: {
          DEFAULT: "#ff66b3", // زهري رئيسي
          foreground: "#ffffff",
          hover: "#ff4da6",
        },
        secondary: {
          DEFAULT: "#ff99cc", // زهري ثانوي
          foreground: "#ffffff",
        },
        destructive: {
          DEFAULT: "#ff3366", // للخطأ أو الحذف
          foreground: "#ffffff",
        },
        muted: {
          DEFAULT: "#ffe6f0", // خافت للبطاقات أو الخلفيات الثانوية
          foreground: "#ff66b3",
        },
        accent: {
          DEFAULT: "#ffb3d9",
          foreground: "#610045",
        },
        popover: {
          DEFAULT: "#fff0f6",
          foreground: "#610045",
        },
        card: {
          DEFAULT: "#fff0f6",
          foreground: "#610045",
        },
        sidebar: {
          DEFAULT: "#ffccd9",
          foreground: "#610045",
          primary: "#ff66b3",
          "primary-foreground": "#ffffff",
          accent: "#ff99cc",
          "accent-foreground": "#610045",
          border: "#ffb3d9",
          ring: "#ff99cc",
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
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
