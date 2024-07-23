import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createActivity as createActivityAPI } from "../../services/apiActivities";
import { toast } from "react-hot-toast";

export function useCreateActivity(onClose) {
  const queryClient = useQueryClient();
  const { mutate: createActivity, isPending } = useMutation({
    mutationFn: (data) => createActivityAPI(data),

    onSuccess: () => {
      toast.success(`Thêm hoạt động thành công`);
      queryClient.invalidateQueries({
        queryKey: ["hospitalDonateActivities"],
      });
      onClose();
    },
    onError: () => {
      toast.error("Thêm hoạt động thất bại");
    },
  });
  return { createActivity, isPending };
}
