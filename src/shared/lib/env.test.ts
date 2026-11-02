import { vi } from "vitest";

async function loadEnv() {
  vi.resetModules();
  return (await import("@/shared/lib/env")).env;
}

describe("env", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
  });

  it("strips trailing slashes from the configured API base URL", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "https://api.example.com//");

    expect((await loadEnv()).apiBaseUrl).toBe("https://api.example.com");
  });

  it("falls back to the local API in development when the variable is unset", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "");
    vi.stubEnv("NODE_ENV", "development");

    expect((await loadEnv()).apiBaseUrl).toBe("http://localhost:8080");
  });

  it("refuses to start a production build without the variable", async () => {
    vi.stubEnv("NEXT_PUBLIC_API_BASE_URL", "");
    vi.stubEnv("NODE_ENV", "production");

    await expect(loadEnv()).rejects.toThrow("NEXT_PUBLIC_API_BASE_URL must be set");
  });
});
