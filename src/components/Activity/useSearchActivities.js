import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllActivities as getActivitiesApi } from "../../services/apiActivities";

import { useDispatch } from "react-redux";
import { setSearchActivity } from "../Auth/userSlice";

export function useSearchActivities() {
  const dispatch = useDispatch();
  const { mutate: searchActivities, isPending } = useMutation({
    mutationFn: (data) => getActivitiesApi(data),
    onSuccess: (result) => {
      dispatch(setSearchActivity(result));
    },
    onError: (e) => {
      console.log("Tìm kiếm thất bại");
    },
  });

  return { searchActivities, isPending };
}
