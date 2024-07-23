import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createRequestBlood as requireBloodAPI } from "../../services/apiRequest";
import { toast } from "react-hot-toast";

export function useRequireBlood(onClose) {
  const queryClient = useQueryClient();
  const { mutate: requireBlood, isPending } = useMutation({
    mutationFn: (data) => requireBloodAPI(data),

    onSuccess: (result, payload) => {
      queryClient.invalidateQueries({
        queryKey: ["requestBloods"],
      });
      toast.success(`Yêu cầu thành công`);
      onClose();
    },
    onError: (err) => {
      toast.error("Yêu cầu thất bại");
    },
  });

  return { requireBlood, isPending };
}
