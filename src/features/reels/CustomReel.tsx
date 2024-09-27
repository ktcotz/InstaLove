import { useRef, useState } from "react";
import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { useUserByID } from "../authentication/queries/useUserByID";
import { Reel } from "../posts/schema/PostsSchema";
import { GoMute, GoUnmute } from "react-icons/go";
import { ReelActions } from "./ReelActions";
import { Loader } from "../../ui/Loader";
import { useTranslation } from "react-i18next";
import { ReelMutedData } from "./Reels";
import { FaPlay } from "react-icons/fa";

type CustomReelProps = {
  muted: ReelMutedData;
  toggleMuted: ({ id, isMuted }: ReelMutedData) => void;
};

export const CustomReel = ({
  video_url,
  description,
  user_id,
  id,
  muted,
  toggleMuted,
}: Reel & CustomReelProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { user, isLoading } = useUserByID(user_id);
  const { t } = useTranslation();
  const [played, setPlayed] = useState(true);

  const handleMuted = () => {
    toggleMuted({ id, isMuted: !muted.isMuted });
  };

  const handleVideoPlaying = () => {
    if (!videoRef.current) return;

    const isPlaying = !played;

    if (isPlaying) videoRef.current.play();
    if (!isPlaying) videoRef.current.pause();

    setPlayed(isPlaying);
  };

  if (isLoading) return <Loader />;

  const isMuted = id === muted.id ? muted.isMuted : true;

  return (
    <div className="relative h-[500px] max-h-[500px] sm:h-[700px] sm:max-h-[700px] grid grid-cols-[1fr_auto]  overflow-hidden">
      <div className="relative max-h-[500px] sm:max-h-[700px]">
        <div className="h-full w-full ">
          <video
            loop
            muted={isMuted}
            autoPlay
            className="h-full w-full object-cover cursor-pointer rounded-xl"
            onClick={handleVideoPlaying}
            ref={videoRef}
            aria-label={description}
          >
            <source src={video_url} type="video/mp4" />
            <p>{description}</p>
          </video>
          <div className="bg-black/20 h-full w-full absolute top-0 left-0 rounded-xl"></div>
        </div>
        <div className="absolute top-4 right-4">
          <Button
            modifier="reel"
            onClick={handleMuted}
            aria-label={isMuted ? t("reels.unmute") : t("reels.mute")}
          >
            {isMuted ? (
              <GoMute aria-label={t("reels.mute")} />
            ) : (
              <GoUnmute aria-label={t("reels.unmute")} />
            )}
          </Button>
        </div>
        {!played && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ">
            <Button
              modifier="video-play"
              onClick={handleVideoPlaying}
              aria-label={t("reels.play")}
            >
              <FaPlay aria-label={t("reels.play")} />
            </Button>
          </div>
        )}
        <div className="absolute bottom-0 left-0 w-full text-stone-50 p-4">
          <div className="flex items-center gap-3 mb-6">
            <CustomLink modifier="avatar" to={`/dashboard/${user?.user_name}`}>
              <img
                src={user?.avatar_url}
                alt={user?.fullName}
                width={32}
                height={32}
                className="rounded-full w-8 h-8"
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
        <div className="text-stone-50 sm:text-stone-950 absolute bottom-0 right-0 sm:col-start-2 sm:self-end sm:static p-4 bg-black/25 rounded-md sm:bg-transparent">
          <ReelActions user={user} id={id} />
        </div>
      )}
    </div>
  );
};
