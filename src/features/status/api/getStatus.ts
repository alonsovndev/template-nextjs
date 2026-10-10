import { getJson } from "@/shared/lib/http";
import type { ServiceStatus } from "@/features/status/types";

export function getStatus(signal?: AbortSignal): Promise<ServiceStatus> {
  return getJson<ServiceStatus>("/health", signal);
}
