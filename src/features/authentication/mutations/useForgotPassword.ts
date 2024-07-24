import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../services/services";
import toast from "react-hot-toast";
import { useTranslation } from "react-i18next";
import { CustomError } from "../../../utils/CustomErrors";

export const useForgotPassword = () => {
  const { t } = useTranslation();

  const {
    mutate: forgot,
    isPending: isForgotLoading,
    error: forgotError,
  } = useMutation({
    mutationFn: forgotPassword,

    onSuccess: () => {
      toast.success(t("supabase.forgot-toast"));
    },

    onError: (error: CustomError) => {
      return error;
    },
  });

  return { forgot, isForgotLoading, forgotError } as const;
};
