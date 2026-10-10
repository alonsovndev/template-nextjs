import { useQuery } from "@tanstack/react-query";
import { getStatus } from "@/features/status/api/getStatus";

export const statusQueryKey = ["status"] as const;

export function useStatusQuery() {
  return useQuery({
    queryKey: statusQueryKey,
    queryFn: ({ signal }) => getStatus(signal),
  });
}
