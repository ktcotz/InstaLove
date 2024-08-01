import { Wrapper } from "../../ui/Wrapper";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Post } from "./schema/PostsSchema";

type IndividualModalPostProps = {
  post: Post;
};

export const IndividualModalPost = ({ post }: IndividualModalPostProps) => {
  const { user, isLoading } = useUserByID(post.user_id);

  if (!isLoading && !user) return null;

  return (
    <Wrapper>
      <div className="grid grid-cols-5 bg-stone-50 rounded-md shadow-lg h-[700px]">
        <div
          style={{ backgroundImage: `url(${post.post_url})` }}
          className="bg-cover bg-center col-start-1 col-end-4"
        >
          &nbsp;
        </div>
        <div className="col-start-4 -col-end-1 p-4">
          <div className="flex items-center gap-3 border-b border-stone-300 py-5">
            <img
              src={user?.avatar_url}
              alt={user?.fullName}
              width={40}
              height={40}
              className="rounded-full w-10 h-10"
            />
            <h2 className="font-semibold text-sm text-stone-900">
              {user?.user_name}
            </h2>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
