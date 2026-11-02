import { Empty } from "antd";

interface EmptyStateProps {
  description: string;
}

export function EmptyState({ description }: EmptyStateProps) {
  return <Empty description={description} image={Empty.PRESENTED_IMAGE_SIMPLE} />;
}
