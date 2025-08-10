module.exports = {
  root: true,
  extends: [
    "next",
    "next/core-web-vitals",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "prettier",
  ],
  plugins: ["@typescript-eslint"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: "module",
  },
  rules: {
    // Prettier handles formatting
    "max-len": "off",
    "arrow-body-style": "off",
    "prefer-arrow-callback": "off",
  },
  ignorePatterns: ["node_modules/", ".next/", "dist/", "build/", "public/**/*.js"],
};
