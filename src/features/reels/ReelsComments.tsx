import { Wrapper } from "../../ui/Wrapper";
import { AddComment } from "../posts/AddComment";
import { Comment } from "../posts/Comment";
import { Comment as CommentSchema } from "../posts/schema/CommentSchema";

type ReelsCommentsProps = {
  user_id: string;
  id: number;
  comments: CommentSchema[];
};

export const ReelsComments = ({
  user_id,
  id,
  comments,
}: ReelsCommentsProps) => {
  return (
    <Wrapper modifier="submodal">
      <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100 py-4">
        <div className="w-full text-center py-4 border-b border-stone-300 ">
          <h2 className="font-semibold">Komentarze</h2>
        </div>

        <div className="p-1 sm:p-3 w-full flex flex-col gap-3 mb-4">
          {comments.map((comment) => (
            <Comment {...comment} />
          ))}
        </div>

        <AddComment user_id={user_id} post_id={id} />
      </div>
    </Wrapper>
  );
};
