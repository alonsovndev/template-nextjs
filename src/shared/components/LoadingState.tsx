import { Flex, Spin, Typography } from "antd";

interface LoadingStateProps {
  label?: string;
}

export function LoadingState({ label = "Loading" }: LoadingStateProps) {
  return (
    <Flex vertical justify="center" align="center" gap={12} style={{ padding: 48 }} role="status">
      <Spin size="large" />
      <Typography.Text type="secondary">{label}</Typography.Text>
    </Flex>
  );
}
