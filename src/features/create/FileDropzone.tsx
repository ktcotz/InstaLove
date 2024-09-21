import { useDropzone } from "react-dropzone";
import { CreatePostFile } from "./CreatePost";
import { FaRegImages } from "react-icons/fa";
import { Button } from "../../ui";
import { useTranslation } from "react-i18next";
import { PostLoader } from "./PostLoader";
import { MarkUsers } from "../mark/MarkUsers";
import { useMarksContext } from "./context/useMarksContext";

type FileDropzoneProps = {
  showDescription: boolean;
  setFile: (file: CreatePostFile) => void;
  setPreview: (file: string | null) => void;
  file: CreatePostFile;
  preview: string | null;
  uploadProgress: number;
};

export const FileDropzone = ({
  showDescription,
  setFile,
  setPreview,
  file,
  preview,
  uploadProgress,
}: FileDropzoneProps) => {
  const { t } = useTranslation();
  const { open, toggleOpen, resetMarks } = useMarksContext();

  const { getRootProps, getInputProps } = useDropzone({
    maxFiles: 1,
    accept: {
      "image/png": [".png"],
      "image/jpg": [".jpg"],
      "image/jpeg": [".jpeg"],
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
      "audio/webm": [".webm"],
      "audio/flac": [".flac"],
      "audio/x-m4a": [".m4a"],

      "video/mp4": [".mp4"],
      "video/mpeg": [".mpeg"],
      "video/webm": [".webm"],
    },
    onDrop: (files) => {
      const droppedFile = files[0];

      const previewFile = URL.createObjectURL(droppedFile);

      setPreview(previewFile);
      resetMarks();
      setFile({
        drop: droppedFile,
        type: droppedFile.type.startsWith("image") ? "image" : "video",
      });
    },
  });

  return (
    <div
      {...getRootProps({ className: "dropzone" })}
      className={`${
        showDescription ? "col-start-1 col-end-3" : "col-start-1 col-end-4"
      }`}
    >
      <input {...getInputProps()} />
      <div
        className="h-[300px] md:h-[500px] bg-cover bg-center relative"
        style={
          preview && file.type.includes("image")
            ? {
                backgroundImage: `url(${preview})`,
              }
            : {}
        }
      >
        {preview && file.type.includes("image") && (
          <div className="absolute top-4 left-4 z-50">
            <Button
              onClick={(e) => {
                e.stopPropagation();
                toggleOpen();
              }}
              modifier="submit"
            >
              {t("create.tag")}
            </Button>
          </div>
        )}

        {open && file.type.includes("image") && <MarkUsers />}

        {!preview && (
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <FaRegImages
              aria-label={t("create.heading")}
              className="text-6xl"
            />
            <h2 className="text-xl sm:text-2xl">{t("create.heading")}</h2>
            <Button modifier="submit" aria-label={t("create.button")}>
              {t("create.button")}
            </Button>
          </div>
        )}

        {preview && file.type.includes("video") && (
          <div className="absolute top-0 left-0 h-full w-full">
            <video autoPlay loop muted className="h-full w-full object-cover">
              <source src={preview} type="video/mp4" />
            </video>
          </div>
        )}

        {uploadProgress > 0 && <PostLoader uploadProgress={uploadProgress} />}
      </div>
    </div>
  );
};
