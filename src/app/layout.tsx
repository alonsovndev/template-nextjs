import type { Metadata } from "next";
import type { ReactNode } from "react";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { AppProviders } from "@/app/providers/AppProviders";
import { AppLayout } from "@/shared/components/AppLayout";
import "./globals.css";

export const metadata: Metadata = {
  title: "Next.js Template",
  description:
    "Production-ready Next.js + TypeScript + Ant Design template following the engineering handbook.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AppProviders>
            <AppLayout>{children}</AppLayout>
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
