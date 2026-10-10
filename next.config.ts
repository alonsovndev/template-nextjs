import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Cache Components is disabled because @ant-design/nextjs-registry inserts
  // styles with Math.random() during prerender, which Cache Components rejects
  // on every route. Revisit when antd's registry supports it (ADR-001).
  cacheComponents: false,
  partialPrefetching: false,
};

export default nextConfig;
