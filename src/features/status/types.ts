export type HealthState = "ok" | "degraded";

export interface ServiceCheck {
  name: string;
  status: HealthState;
}

export interface ServiceStatus {
  status: HealthState;
  version: string;
  checks: ServiceCheck[];
}
