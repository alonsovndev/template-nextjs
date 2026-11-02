import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
    "next-env.d.ts",
  ]),
  {
    files: ["{src,e2e}/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-non-null-assertion": "error",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      ...jsxA11y.configs.recommended.rules,

      "no-console": ["warn", { allow: ["error", "warn"] }],
      "no-debugger": "error",
    },
  },
  {
    // Root config files run in Node, not the browser.
    files: ["*.ts", "*.mjs"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/test/**", "src/mocks/**", "e2e/**"],
    languageOptions: { globals: { ...globals.node, ...globals.vitest } },
  },
  prettier,
]);
