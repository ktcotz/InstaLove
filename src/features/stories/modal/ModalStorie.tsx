import { formatDistanceToNow } from "date-fns";
import { useUserByID } from "../../authentication/queries/useUserByID";
import { Storie } from "../schema/StorieSchema";
import { getDateFnsLocaleByActiveLanguage } from "../../posts/helpers/dateLocale";
import { Button } from "../../../ui/Button";
import { FaMusic, FaPause, FaPlay } from "react-icons/fa";
import { useGetYoutubeTitle } from "../queries/useGetYoutubeTitle";
import ReactPlayer from "react-player";
import { GoMute, GoUnmute } from "react-icons/go";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener, useMediaQuery } from "usehooks-ts";
import ProgressBar from "@ramonak/react-progress-bar";
import { StoriesMarks } from "../StoriesMarks";
import { useAddWatched } from "../mutations/useAddWatched";
import { NestedProgressBar } from "./NestedProgressbar";
import { useAuth } from "../../authentication/context/useAuth";

type ModalStorieProps = {
  active?: boolean;
  mobile?: boolean;
  handleChangePlaying: () => void;
  timer: number;
  nested?: boolean;
  nestedStories?: number;
  nestedStorie?: number;
};

export const ModalStorie = ({
  id,
  active,
  mobile,
  video_url,
  user_id,
  post_url,
  music,
  created_at,
  timer,
  handleChangePlaying,
  nested = false,
  nestedStories,
  nestedStorie,
}: ModalStorieProps & Storie & { id: number }) => {
  const { user: current } = useAuth();
  const ref = useRef(document.body);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [muted, setMuted] = useState(true);
  const [played, setPlayed] = useState(false);
  const { user } = useUserByID(user_id);
  const { title, isLoading } = useGetYoutubeTitle(music);
  const { addWatchedStorie } = useAddWatched();
  const minimumMobile = useMediaQuery("(max-width:576px)");

  const handlePlayPause = () => {
    const toggled = !played;
    setPlayed(toggled);
    setupVideo(toggled);
  };

  const setupVideo = useCallback((play: boolean) => {
    if (!videoRef) return;

    if (play) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, []);

  const formatedDate = created_at
    ? formatDistanceToNow(new Date(created_at), {
        locale: getDateFnsLocaleByActiveLanguage(navigator.language),
        addSuffix: true,
      })
    : null;

  useEffect(() => {
    setMuted(true);
    setPlayed(!!active);
    setupVideo(!!active);
  }, [active, setupVideo]);

  useEventListener(
    "keydown",
    ({ key }) => {
      if (key === "m" || key === "M") setMuted((prev) => !prev);
    },
    ref
  );

  useEffect(() => {
    if (!active || !current) return;

    addWatchedStorie({
      storie_id: id,
      current_id: current.id,
      user_id: user_id,
      watched: true,
    });
  }, [current, user_id, addWatchedStorie, active, id]);

  return (
    <div
      style={{
        backgroundImage: `${`linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${post_url})`}`,
      }}
      className={`h-[350px] ${(active || mobile || nested) && "h-[700px]"} ${
        minimumMobile ? "absolute top-0 left-0 h-screen" : "relative"
      } w-full  transition-all ease-linear duration-700 bg-no-repeat bg-cover bg-center`}
    >
      {post_url && active && <StoriesMarks user_id={user_id} post_id={id} />}
      {active || mobile ? (
        <div className="relative">
          <div className="z-50 relative top-0 left-0 w-full p-4 flex flex-col gap-3">
            {!nested || !nestedStories ? (
              <ProgressBar
                completed={timer}
                maxCompleted={25}
                baseBgColor="#eee"
                bgColor="#bbb"
                customLabel=" "
                height="4px"
                transitionTimingFunction="linear"
              />
            ) : (
              <NestedProgressBar
                nestedStorie={nestedStorie}
                timer={timer}
                nestedStories={nestedStories}
              />
            )}
            <div className="flex items-center gap-2">
              <img
                src={user?.avatar_url}
                alt={user?.user_name}
                className="rounded-full w-8 h-8"
              />
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm font-semibold text-stone-50">
                    {user?.user_name}
                  </h2>
                  <p className="text-xs text-stone-50">{formatedDate}</p>
                </div>
                {music && !isLoading && (
                  <>
                    <p className="text-xs text-stone-50 flex items-center gap-2">
                      <FaMusic />
                      {title?.snippet?.title ?? "Loading.."}
                    </p>
                    <ReactPlayer
                      url={music}
                      height={0}
                      width={0}
                      muted={muted}
                      playing={played}
                    />
                  </>
                )}
              </div>
              <div className="ml-auto flex gap-4">
                <Button
                  modifier="close"
                  onClick={() => {
                    handlePlayPause();
                    handleChangePlaying();
                  }}
                >
                  {played ? (
                    <FaPause className="text-stone-50" />
                  ) : (
                    <FaPlay className="text-stone-50" />
                  )}
                </Button>
                {(video_url || music) && (
                  <Button
                    modifier="close"
                    onClick={() => setMuted((prev) => !prev)}
                  >
                    {muted ? (
                      <GoMute className="text-stone-50" />
                    ) : (
                      <GoUnmute className="text-stone-50" />
                    )}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="z-50 relative top-0 left-0 w-full h-full flex flex-col gap-3 items-center justify-center">
          <img
            src={user?.avatar_url}
            alt={user?.user_name}
            className="rounded-full w-14 h-14 border border-blue-600"
          />
          <h2 className="text-sm font-semibold text-stone-50">
            {user?.user_name}
          </h2>
          <p className="text-xs text-stone-50">{formatedDate}</p>
        </div>
      )}
      {video_url ? (
        <div
          className="absolute top-0 left-0 w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(to bottom,rgba(0,0,0,.9),rgba(0,0,0,.9))",
          }}
        >
          <video
            loop
            muted={muted}
            ref={videoRef}
            className="h-full w-full object-cover pointer-events-none"
          >
            <source src={video_url} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
};
