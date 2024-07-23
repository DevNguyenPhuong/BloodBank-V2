import { useQuery } from "@tanstack/react-query";
import { getActivityById as getActivityByIdAPI } from "../../services/apiActivities";

export function useGetDetailActivity(data) {
  const {
    data: activityInfo,
    isLoading,
    error,
  } = useQuery({
    queryFn: () => getActivityByIdAPI(data),
    queryKey: [`activityInfo ${data?.id}`],
  });

  return { activityInfo, isLoading, error };
}
