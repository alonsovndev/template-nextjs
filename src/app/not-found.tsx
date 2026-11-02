"use client";

import { Result } from "antd";

export default function NotFoundPage() {
  return (
    <Result
      status="404"
      title="Page not found"
      subTitle="Sorry, the page you visited does not exist."
    />
  );
}
