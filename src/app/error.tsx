"use client";

import { useEffect } from "react";
import { Button, Result } from "antd";

interface RouteErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Route-level boundary required by the App Router; AppLayout's ErrorBoundary
// catches render errors below the route segment.
export default function RouteError({ error, reset }: RouteErrorProps) {
  useEffect(() => {
    console.error("Unhandled route error", error);
  }, [error]);

  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle="Try again to recover from the error."
      extra={
        <Button type="primary" onClick={reset}>
          Try again
        </Button>
      }
    />
  );
}
