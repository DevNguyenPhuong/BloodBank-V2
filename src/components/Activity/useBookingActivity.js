import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createActivityInSession as createActivityInSessionAPI } from "../../services/apiSession";

export function useBookingActivity() {
  const { mutate: bookActivity, isPending } = useMutation({
    mutationFn: (data) => createActivityInSessionAPI(data),
    onSuccess: (result, payload) => {
      toast.success(`Đặt lịch thành công`);
    },
    onError: (err) => {
      toast.error("Đặt lịch thất bại");
    },
  });
  return { bookActivity, isPending };
}
