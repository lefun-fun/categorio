import type { Config } from "tailwindcss";

// Max height before we start capping on desktop.
// We optimise this to nicely fit our 10 questions.
const vmd = "740px";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      // vsm: { raw: `(min-height: ${vsm})` },
      vmd: { raw: `(min-height: ${vmd})` },
    },
    extend: {
      fontSize: {
        xxs: "0.675rem",
      },
      colors: {
        primary: "#E00094",
      },
      spacing: {
        // vsm,
        vmd,
      },
    },
  },
  plugins: [],
} satisfies Config;
