const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}", // NextUI
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)", // Custom CSS variables
        foreground: "var(--foreground)",
      },
    },
  },
  darkMode: "class", // Enable dark mode support
  plugins: [nextui()], // Add NextUI plugin
};
