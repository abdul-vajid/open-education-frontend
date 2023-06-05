export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        light_primary: "#2b6cb0",
        light_primary_text: "#2d3748",
        light_primary_btn_text: "#eef2f7",
        light_primary_bg: "#bcdbdf",
        light_secondary_text: "#4a5567",
        light_secondary_bg: "#d3d6db",
        dark_primary: "#81e6d9",
        dark_primary_text: "#e2e8f0",
        dark_primary_btn_text: "#273040",
        dark_primary_bg: "#171e2c",
        dark_secondary_text: "#f6f9fb",
        dark_secondary_bg: "#272f3f",
        fade_text:"#848b9a"
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["hover"],
    },
  },
  plugins: [],
};
