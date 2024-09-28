import { Button } from "../../ui/Button";
import ReactPlayer from "react-player";
import { useTranslation } from "react-i18next";
import { useModal } from "../../ui/modal/ModalContext/useModal";

type MusicProps = {
  url: string;
  reset: () => void;
  handleAddMusic: (music: string) => void;
  newMusic: (music: string) => void;
};

export const Music = ({ url, reset, handleAddMusic, newMusic }: MusicProps) => {
  const { t } = useTranslation();
  const { close } = useModal();

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-4">
        <ReactPlayer url={`${url}`} height={256} width="100%" />
      </div>
      <Button
        modifier="submit"
        onClick={() => {
          handleAddMusic(`${url}&rel=0&controls=0`);
          newMusic(`${url}&rel=0&controls=0`);
          close();
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
