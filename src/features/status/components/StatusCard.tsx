"use client";

import { App, Alert, Button, Card, Tag } from "antd";
import { useStatusQuery } from "@/features/status/api/useStatusQuery";
import type { HealthState } from "@/features/status/types";
import { EmptyState } from "@/shared/components/EmptyState";
import { LoadingState } from "@/shared/components/LoadingState";

const STATE_COLOR: Record<HealthState, string> = { ok: "green", degraded: "orange" };

export function StatusCard() {
  const { message } = App.useApp();
  const { data, isPending, isError, refetch, isFetching } = useStatusQuery();

  async function handleRefresh() {
    const result = await refetch();
    if (result.isSuccess) {
      message.success("Status refreshed");
    }
  }

  if (isPending) {
    return <LoadingState label="Loading status" />;
  }

  if (isError) {
    return (
      <Alert
        type="error"
        showIcon
        title="Could not load the service status"
        action={
          <Button size="small" onClick={() => void handleRefresh()}>
            Retry
          </Button>
        }
      />
    );
  }

  return (
    <Card
      title="Service status"
      extra={
        <Button loading={isFetching} onClick={() => void handleRefresh()}>
          Refresh
        </Button>
      }
    >
      <p>
        <Tag color={STATE_COLOR[data.status]}>{data.status}</Tag> version {data.version}
      </p>
      {data.checks.length === 0 ? (
        <EmptyState description="No checks reported" />
      ) : (
        <ul style={{ margin: 0, paddingLeft: 20 }}>
          {data.checks.map((check) => (
            <li key={check.name}>
              {check.name} <Tag color={STATE_COLOR[check.status]}>{check.status}</Tag>
            </li>
          ))}
        </ul>
      )}
    </Card>
  );
}
