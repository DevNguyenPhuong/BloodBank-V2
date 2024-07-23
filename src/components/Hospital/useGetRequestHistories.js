import { useQuery } from "@tanstack/react-query";
import { getBloodRequestHistory as getRequestHistoryAPI } from "../../services/apiRequest";

export function useGetRequestHistories(data) {
  const {
    data: requestHistories,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getRequestHistoryAPI(data),
    queryKey: ["requestHistory"],
  });

  return { requestHistories, isLoading, error };
}
