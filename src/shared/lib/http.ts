import { env } from "@/shared/lib/env";

export class HttpError extends Error {
  readonly status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

export async function getJson<TResponse>(path: string, signal?: AbortSignal): Promise<TResponse> {
  const response = await fetch(`${env.apiBaseUrl}${path}`, {
    headers: { Accept: "application/json" },
    signal,
  });

  if (!response.ok) {
    throw new HttpError(
      response.status,
      `Request to ${path} failed with status ${response.status}`
    );
  }

  return (await response.json()) as TResponse;
}
