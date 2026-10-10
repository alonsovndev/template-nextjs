"use client";

import { Button, Result } from "antd";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

// Root boundary: catches errors thrown by the root layout itself, where
// error.tsx does not apply. Must render its own html and body.
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  console.error("Unhandled global error", error);

  return (
    <html lang="en">
      <body style={{ margin: 0 }}>
        <Result
          status="error"
          title="Something went wrong"
          subTitle="Reload the page to try again."
          extra={
            <Button type="primary" onClick={reset}>
              Try again
            </Button>
          }
        />
      </body>
    </html>
  );
}
