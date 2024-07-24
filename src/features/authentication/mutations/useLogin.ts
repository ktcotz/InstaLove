import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginUser } from "../services/services";
import { GlobalRoutes } from "../../../typing/routes";
import { CustomError } from "../../../utils/CustomErrors";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: login,
    isPending: isLogin,
    error: loginError,
  } = useMutation({
    mutationFn: loginUser,
    onSuccess: (user) => {
      queryClient.setQueriesData(
        {
          queryKey: ["user"],
        },
        user.user
      );
      navigate(GlobalRoutes.Dashboard);
    },

    onError: (error: CustomError) => {
      return error;
    },
  });

  return { login, isLogin, loginError } as const;
};
