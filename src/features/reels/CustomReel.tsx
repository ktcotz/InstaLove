import { useState } from "react";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Reel } from "../posts/schema/PostsSchema";
import { GoMute, GoUnmute } from "react-icons/go";
import { ReelActions } from "./ReelActions";
import { Loader } from "../../ui/Loader";

export const CustomReel = ({ video_url, description, user_id, id }: Reel) => {
  const [muted, setMuted] = useState(true);
  const { user, isLoading } = useUserByID(user_id);

  const toggleMuted = () => {
    setMuted((prevMuted) => !prevMuted);
  };

  if (isLoading) return <Loader />;

  return (
    <div className="relative h-[700px] max-h-[700px] grid grid-cols-[1fr_auto]">
      <div className="relative h-full">
        <video
          loop
          muted={muted}
          autoPlay
          className="h-full w-full object-cover cursor-pointer"
        >
          <source src={video_url} type="video/mp4" />
        </video>
        <div className="absolute top-4 right-4">
          <Button
            modifier="reel"
            onClick={toggleMuted}
            aria-label="Unmute video"
          >
            {muted ? <GoMute /> : <GoUnmute />}
          </Button>
        </div>
        <div className="absolute bottom-0 left-0 w-full text-stone-50 p-4">
          <div className="flex items-center gap-3 mb-6">
            <CustomLink modifier="avatar" to={`/dashboard/${user?.user_name}`}>
              <img
                src={user?.avatar_url}
                alt={user?.fullName}
                width={48}
                height={48}
                className="rounded-full w-12 h-12"
              />
            </CustomLink>
            <h2 className="font-semibold">
              <CustomLink modifier="reel" to={`/dashboard/${user?.user_name}`}>
                {user?.user_name}
              </CustomLink>
            </h2>
          </div>
          <p>{description}</p>
        </div>
      </div>
      {user && (
        <div className="col-start-2 self-end px-4">
          <ReelActions user={user} id={id} />
        </div>
      )}
    </div>
  );
};
