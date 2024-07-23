import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteActivity as deleteActivityAPI } from "../../services/apiActivities";
import { toast } from "react-hot-toast";

export function useDeleteDonateActivity() {
  const queryClient = useQueryClient();
  const { mutate: deleteDonateActivity, isPending } = useMutation({
    mutationFn: (id) => deleteActivityAPI(id),

    onSuccess: (result, payload) => {
      toast.success(`Xoá thành công`);
      queryClient.invalidateQueries({
        queryKey: ["hospitalDonateActivities"],
      });
    },
    onError: (err) => {
      toast.error("Xoá thất bại");
    },
  });
  return { deleteDonateActivity, isPending };
}
