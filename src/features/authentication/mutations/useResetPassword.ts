import { useMutation } from "@tanstack/react-query";

import { updatePassword } from "../services/services";
import { CustomError } from "../../../utils/CustomErrors";

export const useResetPassword = () => {
  const {
    mutate: resetPassword,
    isPending: isUpdating,
    error: updateError,
  } = useMutation({
    mutationFn: updatePassword,

    onError: (error: CustomError) => {
      return error;
    },
  });

  return { resetPassword, isUpdating, updateError } as const;
};
