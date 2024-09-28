import { Button } from "../../ui";
import { CreatePostFile } from "./CreatePost";
import { FileDropzone } from "./FileDropzone";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { IoIosCheckmark } from "react-icons/io";

type MobileMarkDropzoneProps = {
  showDescription: boolean;
  setFile: (file: CreatePostFile) => void;
  setPreview: (file: string | null) => void;
  file: CreatePostFile;
  preview: string | null;
  uploadProgress: number;
};

export const MobileMarkDropzone = ({
  showDescription,
  setFile,
  setPreview,
  file,
  preview,
  uploadProgress,
}: MobileMarkDropzoneProps) => {
  const { close } = useModal();
  return (
    <div className="relative flex flex-col grow">
      <div className="flex items-center justify-end gap-4 p-3">
        <Button modifier="close" onClick={close}>
          <IoIosCheckmark className="text-2xl" />
        </Button>
      </div>
      <div className="grow flex flex-col">
        <FileDropzone
          showDescription={showDescription}
          setFile={setFile}
          setPreview={setPreview}
          file={file}
          preview={preview}
          uploadProgress={uploadProgress}
          mark={true}
        />
      </div>
    </div>
  );
};
