import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateActivity as updateActivityAPI } from "../../services/apiActivities";
import { toast } from "react-hot-toast";

export function useUpdateDonateActivity(onClose) {
  const queryClient = useQueryClient();
  const { mutate: updateActivity, isPending } = useMutation({
    mutationFn: (data) => updateActivityAPI(data),

    onSuccess: () => {
      toast.success(`Cập nhập hoạt động thành công`);
      queryClient.invalidateQueries({
        queryKey: ["hospitalDonateActivities"],
      });
      onClose();
    },
    onError: () => {
      toast.error("Cập nhập hoạt động thất bại");
      onClose();
    },
  });
  return { updateActivity, isPending };
}
