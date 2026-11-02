"use client";

import { useState, type ReactNode } from "react";
import { App as AntApp, ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appTheme } from "@/shared/styles/theme";

// Single client provider boundary: ConfigProvider (theme) > antd App > TanStack Query.
// Keeping exactly one theme-owning ConfigProvider at the root avoids duplicated
// antd style injection under the App Router.
export function AppProviders({ children }: { children: ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({ defaultOptions: { queries: { retry: 1, refetchOnWindowFocus: false } } })
  );

  return (
    <ConfigProvider theme={appTheme}>
      <AntApp>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </AntApp>
    </ConfigProvider>
  );
}
