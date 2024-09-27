import { formatDistanceToNow } from "date-fns";
import { useUserByID } from "../authentication/queries/useUserByID";
import { StorieAvatar } from "../profile/avatar/StorieAvatar";
import { GeneralPost } from "./schema/PostsSchema";
import { useTranslation } from "react-i18next";
import { getDateFnsLocaleByActiveLanguage } from "./helpers/dateLocale";
import { CustomLink } from "../../ui";
import { useHover } from "../profile/hooks/useHover";
import { HoverProfile } from "../profile/HoverProfile";
import { StoriesMarks } from "../stories/StoriesMarks";
import { MainPostActions } from "./MainPostActions";
import { useUser } from "../authentication/queries/useUser";
import { PostsContextProvider } from "./context/PostsContext";

type MainPostProps = {
  post: GeneralPost;
};

export const MainPost = ({ post }: MainPostProps) => {
  const { i18n } = useTranslation();
  const { user } = useUserByID(post.user_id);
  const { hover, unhover, isHover } = useHover();
  const { user: current } = useUser();

  if (!user || !current) return null;

  const formatedDate = post.created_at
    ? formatDistanceToNow(new Date(post.created_at), {
        locale: getDateFnsLocaleByActiveLanguage(i18n.language),
        addSuffix: true,
      })
    : null;

  return (
    <PostsContextProvider>
      <div className="mx-auto max-w-xl px-4 w-full">
        <div
          className="relative flex  gap-3 py-3 "
          onMouseLeave={() => unhover()}
        >
          <StorieAvatar profile={user} size={40} />
          <div>
            <div className="flex gap-2 items-center">
              <CustomLink
                to={`/dashboard/${user.user_name}`}
                modifier="avatar-name"
                onMouseEnter={() => hover()}
              >
                {user.user_name}
              </CustomLink>
              <p className="text-xs text-stone-700 dark:text-stone-300">
                {formatedDate}
              </p>
            </div>
            <p className="text-sm text-stone-900 dark:text-stone-300">
              {user.fullName}
            </p>
          </div>
          {isHover && <HoverProfile user_name={user.user_name} />}
        </div>
        <div
          className="relative max-h-[700px] h-[500px] rounded-md bg-cover bg-center"
          style={
            "post_url" in post
              ? { backgroundImage: `url(${post.post_url})` }
              : {}
          }
        >
          {post.video_url && (
            <video
              loop
              muted
              autoPlay
              className="h-full w-full object-cover rounded-md"
            >
              <source src={post.video_url} type="video/mp4" />
            </video>
          )}
          <StoriesMarks post_id={post.id} user_id={user.user_id} />
        </div>
        <MainPostActions post={post} user_id={current.id} />
      </div>
    </PostsContextProvider>
  );
};
