import { useMutation } from "@tanstack/react-query";
import { rejectDonor as rejectDonorAPI } from "../../services/apiSession";
import { toast } from "react-hot-toast";

export function useRejectDonor() {
  const { mutate: rejectDonor, isPending } = useMutation({
    mutationFn: (data) => rejectDonorAPI(data),

    onSuccess: (result, payload) => {
      toast.success(`Đã huỷ yêu cầu`);
    },
    onError: (err) => {
      toast.error("huỷ không thành công");
    },
  });
  return { rejectDonor, isPending };
}
