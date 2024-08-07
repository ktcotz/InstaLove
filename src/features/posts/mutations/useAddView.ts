import { useMutation } from "@tanstack/react-query";
import { addViewReel } from "../services/services";

export type AddViewProps = {
  reel_id: number;
  user_id: string;
};

export const useAddView = ({ reel_id, user_id }: AddViewProps) => {
  const { mutate: addView, isPending } = useMutation({
    mutationFn: () => addViewReel({ reel_id, user_id }),
  });

  return { addView, isPending } as const;
};
