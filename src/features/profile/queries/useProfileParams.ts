import { useParams } from "react-router";
import { z } from "zod";

export const useProfileParams = () => {
  const { profile } = useParams();

  const parsed = z
    .object({
      profile: z.string().optional(),
    })
    .parse({ profile });

  return parsed;
};
