"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Layout, Typography } from "antd";
import { ErrorBoundary } from "@/shared/components/ErrorBoundary";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout.Header style={{ display: "flex", alignItems: "center" }}>
        <Link href="/">
          <Typography.Text strong style={{ color: "#fff", fontSize: 18 }}>
            Next.js Template
          </Typography.Text>
        </Link>
      </Layout.Header>
      <Layout.Content style={{ padding: 24, maxWidth: 960, width: "100%", margin: "0 auto" }}>
        <ErrorBoundary>{children}</ErrorBoundary>
      </Layout.Content>
    </Layout>
  );
}
