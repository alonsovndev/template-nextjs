import { http, HttpResponse } from "msw";
import { server } from "@/mocks/server";
import { getJson, HttpError } from "@/shared/lib/http";

describe("getJson", () => {
  it("returns the parsed body for a successful response", async () => {
    server.use(http.get("*/ping", () => HttpResponse.json({ pong: true })));

    await expect(getJson<{ pong: boolean }>("/ping")).resolves.toEqual({ pong: true });
  });

  it("throws an HttpError carrying the status for a failed response", async () => {
    server.use(http.get("*/ping", () => new HttpResponse(null, { status: 503 })));

    await expect(getJson("/ping")).rejects.toMatchObject({
      name: "HttpError",
      status: 503,
    });
    await expect(getJson("/ping")).rejects.toBeInstanceOf(HttpError);
  });
});
