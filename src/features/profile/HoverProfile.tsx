import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { Loader } from "../../ui/Loader";
import { HiUserAdd } from "react-icons/hi";
import { useProfile } from "./queries/useProfile";
import { useGetPosts } from "../posts/queries/useGetPosts";
import { PrivateProfile } from "./PrivateProfile";

type HoverProfileProps = {
  user_name: string;
};

export const HoverProfile = ({ user_name }: HoverProfileProps) => {
  const { data: user, isLoading } = useProfile(user_name);

  const { data: posts, isLoading: isPostsLoading } = useGetPosts(user?.user_id);

  const loading = isLoading || isPostsLoading;

  if (!user) return null;

  return (
    <div className="absolute bottom-0 -left-8 2xl:left-0 translate-y-full p-6 bg-stone-50 z-50 shadow-lg">
      {loading && <Loader />}
      {!loading && (
        <>
          <div className="flex items-center gap-4 mb-6">
            <CustomLink to={`/dashboard/${user.user_name}`} modifier="avatar">
              <img
                src={`${user.avatar_url}`}
                alt={user.user_name}
                width={48}
                height={48}
                className="rounded-full"
              />
            </CustomLink>
            <div className="flex flex-col">
              <CustomLink
                to={`/dashboard/${user.user_name}`}
                modifier="avatar-name"
              >
                {user.user_name}
              </CustomLink>
              <p className="text-sm text-stone-500">Kamil Naskręt</p>
            </div>
          </div>
          <div className="flex items-center gap-6 mb-4">
            <div className="text-center p-2 2xl:p-4">
              <p className="font-semibold">{posts?.count}</p>
              <h2 className="text-sm text-stone-600">posty</h2>
            </div>
            <div className="text-center p-2 2xl:p-4">
              <p className="font-semibold">322</p>
              <h2 className="text-sm text-stone-600">obserwujący</h2>
            </div>
            <div className="text-center p-2 2xl:p-4">
              <p className="font-semibold">1638</p>
              <h2 className="text-sm text-stone-600">obserwowani</h2>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-1 mb-4">
            {user.type === "public" ? (
              <>
                {isPostsLoading && <Loader />}
                {!isPostsLoading &&
                  posts?.data.slice(0, 3).map((post) => {
                    return (
                      <CustomLink
                        to={`/dashboard/${user_name}/post/${post.id}`}
                        modifier="logo"
                      >
                        <div
                          className="w-full aspect-square bg-center bg-cover"
                          key={post.id}
                          style={{ backgroundImage: `url(${post.post_url})` }}
                        >
                          &nbsp;
                        </div>
                      </CustomLink>
                    );
                  })}
                {!isPostsLoading && posts?.data.length === 0 && (
                  <p className="text-stone-600 text-center col-start-1 -col-end-1">
                    Użytkownik nie ma postów do wyświetlenia
                  </p>
                )}
              </>
            ) : (
              <div className="col-start-1 -col-end-1">
                <PrivateProfile />
              </div>
            )}
          </div>
          <Button modifier="add-user">
            <HiUserAdd />
            Obserwuj
          </Button>
        </>
      )}
    </div>
  );
};
