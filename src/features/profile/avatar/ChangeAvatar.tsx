import { Button } from "../../../ui/Button";
import { Loader } from "../../../ui/Loader";
import { useModal } from "../../../ui/modal/ModalContext/useModal";
import { Wrapper } from "../../../ui/Wrapper";
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
    <Wrapper modifier="form">
      <div className="bg-stone-100 rounded-md p-4 shadow-lg flex items-center justify-center flex-col gap-8">
        <h2 className="text-xl font-semibold text-center border-b py-3 border-stone-300 self-stretch">
          Zmień avatar
        </h2>
        <img
          src={preview}
          alt="Avatar"
          width={128}
          height={128}
          className="rounded-full aspect-square"
        />

        <div className="flex flex-col gap-4">
          <Button modifier="submit" onClick={updateAvatar}>
            {isUpdating ? <Loader /> : "Ustaw to zdjęcie jako avatar"}
          </Button>
          <Button onClick={disablePreview}>Nie ustawiaj</Button>
        </div>
      </div>
    </Wrapper>
  );
};
