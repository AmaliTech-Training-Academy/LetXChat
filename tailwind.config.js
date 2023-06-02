/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      dropShadow: {
        groupShadow: "-3px 0px 2px -1px rgba(0,0,0,0.25)",
      },
      boxShadow: {
        backgroundShadow: "0px 0px 12px rgba(0, 0, 0, 0.2)",
      },
      colors: {
        primary: "rgba(255, 255, 255, 0.6)",
        link: "#3683F5",
        shadow: "rgba(0, 0, 0, 0.2)",
        placeholder: "rgba(0, 0, 0, 0.8)",
        borderColor: "rgba(83, 53, 45, 0.9)",
        brown: "#53352D",
        error: "#FDA29B",
        hoverColor: "rgba(83, 53, 45, 0.7)",
        errorMessage: "#d32f2f",
      },
      backgroundImage: {
        avatar: "url('../../src/assets/avatar.jpg')",
      },
    },
  },
  plugins: [],
};
