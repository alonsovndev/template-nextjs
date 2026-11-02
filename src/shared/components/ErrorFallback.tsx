import { Button, Result } from "antd";

export function ErrorFallback() {
  return (
    <Result
      status="error"
      title="Something went wrong"
      subTitle="Reload the page to try again."
      extra={
        <Button type="primary" onClick={() => window.location.reload()}>
          Reload
        </Button>
      }
    />
  );
}
