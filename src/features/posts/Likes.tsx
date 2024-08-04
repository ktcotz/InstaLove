import { Wrapper } from "../../ui/Wrapper";
import { Like } from "./Like";
import { Likes as LikesSchema } from "./schema/LikeSchema";

type LikesProps = {
  likes: LikesSchema;
};

export const Likes = ({ likes }: LikesProps) => {
  console.log(likes);
  return (
    <Wrapper modifier="likes">
      <div className="flex flex-col items-center justify-center rounded-md shadow-lg bg-stone-100">
        <div className="w-full text-center py-4 border-b border-stone-300 ">
          <h2 className="font-semibold">Polubienia</h2>
        </div>
        <div className="p-1 sm:p-3 w-full flex flex-col gap-3">
          {likes.map((like) => (
            <Like key={like.id} {...like} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
