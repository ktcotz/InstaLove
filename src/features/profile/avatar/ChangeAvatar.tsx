import { useTranslation } from "react-i18next";
import { Button } from "../../../ui/Button";
import { Loader } from "../../../ui/Loader";
import { useModal } from "../../../ui/modal/ModalContext/useModal";
import { useUpdateAvatar } from "./mutations/useUpdateAvatar";

type ChangeAvatarProps = {
  preview: string;
  disablePreview: () => void;
  file: File | null;
  user_id: string;
};

export const ChangeAvatar = ({
  preview,
  disablePreview,
  file,
  user_id,
}: ChangeAvatarProps) => {
  const { update, isUpdating } = useUpdateAvatar();
  const { close } = useModal();
  const { t } = useTranslation();

  const updateAvatar = () => {
    if (!file) return;

    update(
      { file, user_id },
      {
        onSuccess: () => {
          close();
        },
      }
    );
  };

  return (
    <div className="max-w-lg mx-auto">
      <div className="bg-stone-100 rounded-md p-4 shadow-lg flex items-center justify-center flex-col gap-8">
        <h2 className="text-xl font-semibold text-center border-b py-3 border-stone-300 self-stretch">
          {t("avatar.change")}
        </h2>
        <img
          src={preview}
          alt="Avatar"
          width={176}
          height={176}
          className="rounded-full max-w-44 max-h-44 aspect-square"
        />

        <div className="flex flex-col gap-4">
          <Button modifier="submit" onClick={updateAvatar}>
            {isUpdating ? <Loader /> : t("avatar.change")}
          </Button>
          <Button onClick={disablePreview}>{t("avatar.reject")}</Button>
        </div>
      </div>
    </div>
  );
};
