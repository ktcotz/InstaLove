import { useGetReels } from "../../../features/posts/queries/useGetReels";
import { useProfile } from "../../../features/profile/queries/useProfile";
import { useProfileParams } from "../../../features/profile/queries/useProfileParams";
import { Loader } from "../../../ui/Loader";

export const Reels = () => {
  const { profile } = useProfileParams();
  const { data: user, isLoading } = useProfile(profile);
  const { data: reels, isLoading: isPostsLoading } = useGetReels(user?.user_id);

  if (isLoading || isPostsLoading) return <Loader />;

  return reels!.length > 0 ? (
    reels?.map((reel) => {
      return (
        <div key={reel.id} className="relative aspect-square">
          <video loop muted className="h-full w-full object-cover">
            <source src={reel.video_url} type="video/mp4" />
          </video>
          <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-stone-950/20">
            asd
          </div>
        </div>
      );
    })
  ) : (
    <p className=" text-stone-600 col-start-1 -col-end-1 text-center mt-6">
      No reels were found for your account. Create and publish them to see them
      in this section.
    </p>
  );
};
