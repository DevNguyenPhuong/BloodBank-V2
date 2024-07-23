import { useQuery } from "@tanstack/react-query";
import { getActivitiesInSessionByUserId as getActivitiesInSessionByUserIdAPI } from "../../services/apiSession";

export function useGetDonateActivitiesByUserId(id) {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getActivitiesInSessionByUserIdAPI(id),
    queryKey: ["userDonateActivities"],
  });

  return { activities, isLoading, error };
}
