import { useQuery } from "@tanstack/react-query";
import { getDonorsInSessionByActivityId as getDonorsByActivityIdAPI } from "../../services/apiSession";

export function useGetDonorByAcitivities(id) {
  const {
    data: donors,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getDonorsByActivityIdAPI(id),
    queryKey: [`donors ${id}`],
  });

  return { donors, isLoading, error };
}
