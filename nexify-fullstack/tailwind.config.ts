import type { Config } from "tailwindcss";
const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: { extend: {
    colors: { brand:{DEFAULT:"#6A5AE0",600:"#5648B3"}, surface:{DEFAULT:"#0E0E12",raised:"#14141A",outline:"#232333"} },
    borderRadius: { bubble:"18px" }
  }},
  plugins: []
};
export default config;
