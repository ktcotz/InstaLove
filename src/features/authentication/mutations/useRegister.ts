import { useMutation } from "@tanstack/react-query";
import { registerWithPassword } from "../services/services";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../../../typing/routes";
import { CustomError } from "../../../utils/CustomErrors";

export const useRegister = () => {
  const navigate = useNavigate();

  const {
    mutate: signup,
    isPending: isRegistering,
    error: signupError,
  } = useMutation({
    mutationFn: registerWithPassword,
    onSuccess: () => {
      navigate(GlobalRoutes.Login);
    },

    onError: (error: CustomError) => {
      return error;
    },
  });

  return { signup, isRegistering, signupError } as const;
};
