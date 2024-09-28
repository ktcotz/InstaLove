import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";
import { loginUser } from "../services/services";
import { GlobalRoutes } from "../../../typing/routes";
import { CustomError } from "../../../utils/CustomErrors";
import { useModal } from "../../../ui/modal/ModalContext/useModal";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { reset } = useModal();

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
      reset();
      navigate(GlobalRoutes.Dashboard);
    },

    onError: (error: CustomError) => {
      return error;
    },
  });

  return { login, isLogin, loginError } as const;
};
