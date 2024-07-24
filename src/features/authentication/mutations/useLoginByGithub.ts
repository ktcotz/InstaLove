import { useMutation } from "@tanstack/react-query";
import { loginUserByGithub } from "../services/services";
import { CustomError } from "../../../utils/CustomErrors";

export const useLoginByGithub = () => {
  const { mutate: loginByGithub, error: loginProviderError } = useMutation({
    mutationFn: loginUserByGithub,

    onError: (error: CustomError) => {
      return error;
    },
  });

  return { loginByGithub, loginProviderError } as const;
};
