import { Button } from "../../../ui/Button";
import { Storie } from "../schema/StorieSchema";

type ModalStorieProps = {
  active?: boolean;
  mobile?: boolean;
};

export const ModalStorie = ({
  active,
  mobile,
  video_url,
  post_url,
}: ModalStorieProps & Storie) => {
  return (
    <div
      style={{
        backgroundImage: `${
          active
            ? `url(${post_url})`
            : `linear-gradient(to right bottom,rgba(0,0,0,.4),rgba(0,0,0,.4)),url(${post_url})`
        }`,
      }}
      className={`${active ? "h-[600px] w-full" : "h-[300px]"}
        ${
          mobile && "h-[600px] w-full"
        } transition-all duration-500 bg-no-repeat bg-cover bg-center`}
    >
      {video_url ? (
        <video
          loop
          muted
          autoPlay
          className="h-full w-full object-cover pointer-events-none"
        >
          <source src={video_url} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
};
