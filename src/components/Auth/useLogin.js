import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginAPI } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useCookies } from "react-cookie";
import { useDispatch } from "react-redux";
import { setInfo } from "./userSlice";

export function useLogin() {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const [, setCookie] = useCookies(["user"]);
  const navigate = useNavigate();

  const { mutate: login, isPending } = useMutation({
    mutationFn: (data) => loginAPI(data),

    onSuccess: (result, payload) => {
      queryClient.setQueryData(["user"], result?.data);

      setCookie("user", result?.data?.jwtToken, {
        maxAge: result?.data.expiresIn,
        path: "/",
      });

      dispatch(
        setInfo({ ...result.data, isAuthenticated: true, roleId: payload.role })
      );

      if (payload.role === 0) navigate("/user/home");
      if (payload.role === 1) navigate("/hospital/home");
      toast.success(`Chào mừng ${result.data.fullName} `);
    },

    onError: () => {
      toast.error("Tài khoản hoặc mật khẩu không khớp");
    },
  });

  return { login, isPending };
}
