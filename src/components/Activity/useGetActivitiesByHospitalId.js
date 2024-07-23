import { useQuery } from "@tanstack/react-query";
import { getAcitivitiesByHospitalId as getAcitivitiesByHospitalIdAPI } from "../../services/apiActivities";

export function useGetAcitivitiesByHospitalId(hospitalId, status) {
  const {
    data: hospitalDonateActivities,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getAcitivitiesByHospitalIdAPI(hospitalId, status),
    queryKey: ["hospitalDonateActivities"],
  });

  return { hospitalDonateActivities, isLoading, error };
}
