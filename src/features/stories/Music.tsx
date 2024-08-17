import { FaPause, FaPlay } from "react-icons/fa";
import { Button } from "../../ui/Button";
import ReactPlayer from "react-player";
import { useState } from "react";

type MusicProps = {
  url: string;
  reset: () => void;
  handleAddMusic: (music: string) => void;
  newMusic: (music: string) => void;
};

export const Music = ({ url, reset, handleAddMusic, newMusic }: MusicProps) => {
  const [played, setPlayed] = useState(false);
  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <ReactPlayer
          url={`${url}&rel=0&controls=0`}
          playing={played}
          height={72}
          width={72}
        />
        <Button modifier="close" onClick={() => setPlayed((prev) => !prev)}>
          {played ? (
            <FaPause className="text-blue-600" />
          ) : (
            <FaPlay className="text-blue-600" />
          )}
        </Button>
      </div>
      <Button
        modifier="submit"
        onClick={() => {
          handleAddMusic(`${url}&rel=0&controls=0`);
          newMusic(`${url}&rel=0&controls=0`);
        }}
      >
        Zaakceptuj!
      </Button>
      <Button modifier="close" onClick={reset}>
        Odrzuć!
      </Button>
    </div>
  );
};
