import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa6";
import { useProfile } from "../queries/useProfile";
import { Modal } from "../../../ui/modal/Modal";
import { ChangeAvatar } from "./ChangeAvatar";
import { useEffect, useState } from "react";
import { useProfileParams } from "../queries/useProfileParams";
import { useUser } from "../../authentication/queries/useUser";
import { useTranslation } from "react-i18next";
import { useModal } from "../../../ui/modal/ModalContext/useModal";

type AvatarProps = {
  overlay?: boolean;
  size: 176 | 48 | 64;
};

export const Avatar = ({ overlay = false, size }: AvatarProps) => {
  const { t } = useTranslation();
  const { profile } = useProfileParams();
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { data: current } = useProfile(
    profile === undefined ? user!.user_metadata.user_name : profile
  );

  const { close } = useModal();

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    maxSize: 2 * 1024 * 1024,
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      setFile(file);
    },
  });

  useEffect(() => {
    if (!preview) {
      close();
    }
  }, [preview]);

  const avatarSizes: Record<typeof size, string> = {
    48: "w-12 h-12 rounded-full object-cover",
    176: "w-44 h-44 rounded-full object-cover",
    64: "w-[64px] h-[64px] rounded-full object-cover",
  };

  return (
    <>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="cursor-pointer rounded-full h-full"
      >
        <input {...getInputProps()} />
        <Modal.Open openClass="avatar">
          <div className="relative rounded-full flex items-center justify-center lg:items-start lg:justify-start">
            <img
              src={current?.avatar_url}
              alt={current?.user_name}
              width={size}
              height={size}
              className={avatarSizes[size]}
            />
            {user?.id === current?.user_id && overlay && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-44 h-44 lg:w-full lg:h-full flex items-center justify-center bg-stone-600/60 rounded-full cursor-pointer">
                <FaCamera className="text-5xl" aria-label={t("avatar.add")} />
              </div>
            )}
          </div>
        </Modal.Open>
      </div>
      {preview && (
        <Modal.Content
          manageClass="avatar"
          parentClass="max-w-lg mx-auto w-full"
        >
          <ChangeAvatar
            preview={preview}
            disablePreview={() => setPreview(null)}
            file={file}
            user_id={current!.user_id}
          />
        </Modal.Content>
      )}
    </>
  );
};
