import { formatDistanceToNow } from "date-fns";
import { useUserByID } from "../../authentication/queries/useUserByID";
import { Storie } from "../schema/StorieSchema";
import { getDateFnsLocaleByActiveLanguage } from "../../posts/helpers/dateLocale";
import { Button } from "../../../ui/Button";
import { FaMusic, FaPlay, FaVolumeMute } from "react-icons/fa";
import { useGetYoutubeTitle } from "../queries/useGetYoutubeTitle";

type ModalStorieProps = {
  active?: boolean;
  mobile?: boolean;
};

export const ModalStorie = ({
  active,
  mobile,
  video_url,
  user_id,
  post_url,
  music,
  created_at,
}: ModalStorieProps & Storie) => {
  const { user } = useUserByID(user_id);
  const { title } = useGetYoutubeTitle(music);

  const formatedDate = created_at
    ? formatDistanceToNow(new Date(created_at), {
        locale: getDateFnsLocaleByActiveLanguage(navigator.language),
        addSuffix: true,
      })
    : null;

  return (
    <div
      style={{
        backgroundImage: `${`linear-gradient(to bottom,rgba(0,0,0,.5),rgba(0,0,0,.5)),url(${post_url})`}`,
      }}
      className={`${active ? "h-[700px] w-full" : "h-[300px] w-full"}
        ${
          (mobile || active) && "h-[700px] w-full"
        } relative transition-all duration-500 bg-no-repeat bg-cover bg-center`}
    >
      {active || mobile ? (
        <div className="relative">
          <div className="z-50 relative top-0 left-0 w-full p-4 flex flex-col gap-3">
            <progress
              value={5}
              max={100}
              className="bg-stone-300 h-[2px] rounded-md accent-stone-50"
            >
              1%
            </progress>
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
                {music && (
                  <p className="text-xs text-stone-50 flex items-center gap-2">
                    <FaMusic />
                    {title.snippet.title}
                  </p>
                )}
              </div>
              <div className="ml-auto flex gap-4">
                <Button modifier="close">
                  <FaPlay className="text-stone-50" />
                </Button>
                <Button modifier="close">
                  <FaVolumeMute className="text-stone-50" />
                </Button>
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
            muted
            className="h-full w-full object-cover pointer-events-none"
          >
            <source src={video_url} type="video/mp4" />
          </video>
        </div>
      ) : null}
    </div>
  );
};
