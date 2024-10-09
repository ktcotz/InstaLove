import { useMutation } from "@tanstack/react-query";
import { loggedIn } from "../services/services";

export const useLoggedIn = () => {
  const { mutate: logged, isPending } = useMutation({
    mutationFn: loggedIn,
  });

  return { logged, isPending } as const;
};
