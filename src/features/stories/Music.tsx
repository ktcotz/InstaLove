import { FaPause, FaPlay } from "react-icons/fa";
import { Button } from "../../ui/Button";
import ReactPlayer from "react-player";
import { useState } from "react";
import { useTranslation } from "react-i18next";

type MusicProps = {
  url: string;
  reset: () => void;
  handleAddMusic: (music: string) => void;
  newMusic: (music: string) => void;
};

export const Music = ({ url, reset, handleAddMusic, newMusic }: MusicProps) => {
  const [played, setPlayed] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <ReactPlayer
          url={`${url}&rel=0&controls=0`}
          playing={played}
          height={56}
          width={56}
        />
        <Button
          modifier="close"
          onClick={() => setPlayed((prev) => !prev)}
          aria-label={played ? t("create.musicStop") : t("create.musicStart")}
        >
          {played ? (
            <FaPause
              className="text-blue-600"
              aria-label={t("create.musicStop")}
            />
          ) : (
            <FaPlay
              className="text-blue-600"
              aria-label={t("create.musicStart")}
            />
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
        {t("create.musicAccept")}
      </Button>
      <Button modifier="close" onClick={reset}>
        {t("create.musicRemove")}
      </Button>
    </div>
  );
};
