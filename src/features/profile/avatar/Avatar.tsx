import { useDropzone } from "react-dropzone";
import { FaCamera } from "react-icons/fa6";
import { useProfile } from "../queries/useProfile";
import { Modal } from "../../../ui/modal/Modal";
import { ChangeAvatar } from "./ChangeAvatar";
import { useState } from "react";
import { useProfileParams } from "../queries/useProfileParams";
import { useUser } from "../../authentication/queries/useUser";

type AvatarProps = {
  overlay?: boolean;
  size: number;
};

export const Avatar = ({ overlay = false, size }: AvatarProps) => {
  const { profile } = useProfileParams();
  const { user } = useUser();
  const [preview, setPreview] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const { data: current } = useProfile(
    profile === undefined ? user!.user_metadata.user_name : profile
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setPreview(URL.createObjectURL(file));
      setFile(file);
    },
  });

  return (
    <Modal>
      <div
        {...getRootProps({ className: "dropzone" })}
        className="cursor-pointer"
      >
        <input {...getInputProps()} />
        <Modal.Open>
          <div className="relative rounded-full flex items-center justify-center lg:items-start lg:justify-start">
            <img
              src={current?.avatar_url}
              alt={current?.user_name}
              width={size}
              height={size}
              className={`rounded-full w-[${size}px] h-[${size}px]`}
            />
            {overlay && (
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[178px] h-[178px] lg:w-full lg:h-full flex items-center justify-center bg-stone-500/70 rounded-full cursor-pointer">
                <FaCamera className="text-5xl" aria-label="Add avatar" />
              </div>
            )}
          </div>
        </Modal.Open>
      </div>
      {preview && (
        <Modal.Content>
          <ChangeAvatar
            preview={preview}
            disablePreview={() => setPreview(null)}
            file={file}
            user_id={current!.user_id}
          />
        </Modal.Content>
      )}
    </Modal>
  );
};
