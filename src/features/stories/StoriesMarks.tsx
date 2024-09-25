import { Mark } from "../mark/Mark";
import { useGetAllMarksOnPost } from "../mark/queries/useGetAllMarksOnPost";

type StoriesMarksProps = {
  user_id: string;
  post_id: number;
};

export const StoriesMarks = ({ user_id, post_id }: StoriesMarksProps) => {
  const { marks } = useGetAllMarksOnPost({ post_id, user_id });

  return marks?.map((mark) => <Mark {...mark} key={mark.id} />);
};
