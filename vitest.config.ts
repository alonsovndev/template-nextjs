import { fileURLToPath } from "node:url";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    restoreMocks: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    css: true,
    exclude: ["e2e/**", "node_modules/**", ".next/**"],
    env: {
      NEXT_PUBLIC_API_BASE_URL: "http://localhost:8080",
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
      include: ["src/**/*.{ts,tsx}"],
      // Exclusions are limited to code with no logic to test: route/entry wiring,
      // test infrastructure, and type declarations.
      exclude: [
        "src/app/layout.tsx",
        "src/app/page.tsx",
        "src/app/not-found.tsx",
        "src/app/error.tsx",
        "src/app/global-error.tsx",
        "src/app/providers/**",
        "src/mocks/**",
        "src/test/**",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
      ],
      thresholds: {
        lines: 80,
      },
    },
  },
});
