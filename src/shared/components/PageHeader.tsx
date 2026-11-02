"use client";

import { Typography } from "antd";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <header style={{ marginBottom: 24 }}>
      <Typography.Title level={2} style={{ marginBottom: subtitle ? 4 : 0 }}>
        {title}
      </Typography.Title>
      {subtitle ? <Typography.Text type="secondary">{subtitle}</Typography.Text> : null}
    </header>
  );
}
