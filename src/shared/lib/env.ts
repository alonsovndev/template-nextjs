const DEV_API_BASE_URL = "http://localhost:8080";

function resolveApiBaseUrl(): string {
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL;
  if (configured) {
    return configured.replace(/\/+$/, "");
  }
  // A production build without this variable would silently call localhost, so fail instead.
  if (process.env.NODE_ENV !== "production") {
    return DEV_API_BASE_URL;
  }
  throw new Error("NEXT_PUBLIC_API_BASE_URL must be set when building for production");
}

// NEXT_PUBLIC_ variables are inlined into the client bundle and are public: never put secrets here.
export const env = {
  apiBaseUrl: resolveApiBaseUrl(),
};
