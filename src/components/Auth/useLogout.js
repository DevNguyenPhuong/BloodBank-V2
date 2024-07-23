import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearInfo } from "./userSlice";
import { useCookies } from "react-cookie";

export function useLogout() {
  const [, , removeCookies] = useCookies(["user"]);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: logout, isPending } = useMutation({
    mutationFn: () => {
      return dispatch(clearInfo());
    },
    onSuccess: () => {
      queryClient.removeQueries();
      removeCookies(["user"]);
      navigate("/");
    },
  });

  return { logout, isPending };
}
