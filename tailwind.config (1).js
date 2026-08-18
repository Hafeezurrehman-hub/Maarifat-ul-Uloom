/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    screens: {
      xs: "400px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        navy: {
          900: "#1F2A44",
          800: "#242F4E",
          700: "#2C3A5C",
          600: "#374873",
          500: "#455A8C",
          DEFAULT: "#1F2A44",
        },
        gold: {
          700: "#C9973B",
          500: "#D4A843",
          400: "#E0BB60",
          300: "#EDD080",
          200: "#F5E4B0",
          100: "#FBF3D8",
          DEFAULT: "#D4A843",
        },
        cream: {
          DEFAULT: "#F3E7CF",
          light: "#F8F0E1",
        },
        shadow: "#2C2F38",
        offwhite: "#FAF9F6",
      },
      fontFamily: {
        display: ["Cinzel", "serif"],
        heading: ["Cinzel", "serif"],
        subheading: ["Poppins", "sans-serif"],
        body: ["Poppins", "sans-serif"],
        arabic: ["Amiri", "serif"],
      },
      transitionTimingFunction: {
        premium: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      boxShadow: {
        card: "0 4px 24px rgba(10,22,40,0.08)",
        "card-hover": "0 12px 40px rgba(10,22,40,0.14)",
        gold: "0 8px 30px rgba(201,151,59,0.25)",
        "3d": "0 2px 0 rgba(10,22,40,0.06), 0 20px 40px -12px rgba(10,22,40,0.22), 0 8px 16px -6px rgba(10,22,40,0.12)",
        "3d-hover": "0 2px 0 rgba(10,22,40,0.06), 0 32px 60px -14px rgba(10,22,40,0.30), 0 12px 24px -8px rgba(10,22,40,0.16)",
        "gold-3d": "0 1px 0 rgba(255,255,255,0.4) inset, 0 6px 0 rgba(154,108,30,0.35), 0 14px 28px -8px rgba(201,151,59,0.45)",
        "gold-3d-active": "0 1px 0 rgba(255,255,255,0.4) inset, 0 2px 0 rgba(154,108,30,0.35), 0 6px 14px -6px rgba(201,151,59,0.4)",
        glass: "0 8px 32px rgba(10,22,40,0.10), inset 0 1px 0 rgba(255,255,255,0.5)",
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        gradientMove: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 18s ease-in-out infinite",
        "float-slow": "float 24s ease-in-out infinite",
        shimmer: "shimmer 8s ease-in-out infinite",
        "gradient-move": "gradientMove 20s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

