import { useQuery } from "@tanstack/react-query";
import { getDonateHistoriesByDonorId as getDonateHistoriesByDonorIdAPI } from "../../services/apiHistories";

export function useGetDonateHistory(userId) {
  const {
    data: histories,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getDonateHistoriesByDonorIdAPI(userId),
    queryKey: ["histories"],
  });

  return { histories, isLoading, error };
}
