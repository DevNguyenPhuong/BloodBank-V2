import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatusRequestBlood as acceptRequestBloodAPI } from "../../services/apiRequest";
import { toast } from "react-hot-toast";

export function useAcceptRequestBlood() {
  const queryClient = useQueryClient();
  const { mutate: acceptRequestBlood, isPending } = useMutation({
    mutationFn: (data) => acceptRequestBloodAPI(data),

    onSuccess: (result, payload) => {
      toast.success(`Đã chấp nhận yêu cầu`);
      queryClient.invalidateQueries({
        queryKey: ["requestBloods"],
      });
    },
    onError: (err) => {
      toast.error("Không đủ máu trong kho");
    },
  });
  return { acceptRequestBlood, isPending };
}
