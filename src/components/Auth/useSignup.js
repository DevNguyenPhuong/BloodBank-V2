import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupAPI } from "../../services/apiAuth";

import { toast } from "react-hot-toast";

export function useSignup() {
  const queryClient = useQueryClient();

  const { mutate: signup, isPending } = useMutation({
    mutationFn: (data) => signupAPI(data),

    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data);
      toast.success(`Tạo tài khoản thành công`);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Tạo tài khoản không thành công");
    },
  });
  return { signup, isPending };
}
