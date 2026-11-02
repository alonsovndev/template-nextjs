import { PageHeader } from "@/shared/components/PageHeader";
import { StatusCard } from "@/features/status";

export default function HomePage() {
  return (
    <>
      <PageHeader title="Welcome" subtitle="Next.js template wired to a FastAPI backend" />
      <StatusCard />
    </>
  );
}
