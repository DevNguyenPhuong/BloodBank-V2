import { useQuery } from "@tanstack/react-query";
import { getBloodRequests as getRequestBloodAPI } from "../../services/apiRequest";

export function useGetBloodRequest(data) {
  const {
    data: requestBloods,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getRequestBloodAPI(data),
    queryKey: ["requestBloods"],
  });

  return { requestBloods, isLoading, error };
}
