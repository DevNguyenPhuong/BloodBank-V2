import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteActivityInSesstionById as deleteActivityInSesstionByIdAPI } from "../../services/apiSession";
import { toast } from "react-hot-toast";

export function useCancelUserActivity() {
  const queryClient = useQueryClient();
  const { mutate: cancelActivity, isPending } = useMutation({
    mutationFn: (id) => deleteActivityInSesstionByIdAPI(id),

    onSuccess: (result, payload) => {
      toast.success(`Huỷ thành công`);
      queryClient.invalidateQueries({
        queryKey: ["userDonateActivities"],
      });
    },
    onError: (err) => {
      toast.error("Huỷ thất bại");
    },
  });
  return { cancelActivity, isPending };
}
