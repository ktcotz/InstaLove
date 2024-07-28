import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signout } from "../services/services";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../../../typing/routes";
import { useTranslation } from "react-i18next";
import { CustomError } from "../../../utils/CustomErrors";
import toast from "react-hot-toast";

export const useSignout = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { t } = useTranslation();

  const { mutate: signoutUser } = useMutation({
    mutationFn: signout,
    onSuccess: () => {
      navigate(GlobalRoutes.Login);
      queryClient.setQueriesData(
        {
          queryKey: ["user"],
        },
        null
      );
    },

    onError: (error: CustomError) => {
      toast.error(t(error.generateError()));
    },
  });

  return { signoutUser } as const;
};
