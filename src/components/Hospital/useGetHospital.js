import { useQuery } from "@tanstack/react-query";
import { getHospitalInfoById as getHospitalByIdAPI } from "../../services/apiHospital";

export function useHospital(hospitalId) {
  console.log(hospitalId);
  const {
    data: hospital,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getHospitalByIdAPI(hospitalId),
    queryKey: [`hospital ${hospitalId}`],
  });

  return { hospital, isLoading, error };
}
