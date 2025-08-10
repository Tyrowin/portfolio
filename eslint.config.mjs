import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  {
    ignores: ["**/node_modules/**", "**/.next/**", "**/dist/**", "**/build/**", "public/**/*.js"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    name: "prettier-overrides",
    rules: {
      // Prettier handles formatting concerns
      "max-len": "off",
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off",
    },
  },
];

export default eslintConfig;
