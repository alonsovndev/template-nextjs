import { http, HttpResponse } from "msw";
import type { ServiceStatus } from "@/features/status";

export const healthyStatus: ServiceStatus = {
  status: "ok",
  version: "1.0.0",
  checks: [
    { name: "database", status: "ok" },
    { name: "cache", status: "degraded" },
  ],
};

export const handlers = [http.get("*/health", () => HttpResponse.json(healthyStatus))];
