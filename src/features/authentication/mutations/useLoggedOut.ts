import { useMutation } from "@tanstack/react-query";
import { loggedOut } from "../services/services";

export const useLoggedOut = () => {
  const { mutate: logged, isPending } = useMutation({
    mutationFn: loggedOut,
  });

  return { logged, isPending } as const;
};
