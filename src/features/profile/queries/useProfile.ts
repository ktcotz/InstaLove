import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../services/services";

export const useProfile = (user_name: string) => {
  const { data, isLoading } = useQuery({
    queryKey: ["profile", user_name],
    queryFn: () => getProfile({ user_name }),
  });

  return { data, isLoading } as const;
};
