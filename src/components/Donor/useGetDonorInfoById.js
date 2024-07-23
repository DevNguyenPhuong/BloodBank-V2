import { useQuery } from "@tanstack/react-query";
import { getDonorInfoById as getDonorByIdAPI } from "../../services/apiDonors";

export function useGetDonorInfoById(donorId) {
  const {
    data: donor,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getDonorByIdAPI(donorId),
    queryKey: [`donor ${donorId}`],
  });

  return { donor, isLoading, error };
}
