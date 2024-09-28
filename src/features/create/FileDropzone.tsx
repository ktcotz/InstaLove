import { useDropzone } from "react-dropzone";
import { CreatePostFile } from "./CreatePost";
import { FaRegImages } from "react-icons/fa";
import { Button } from "../../ui";
import { useTranslation } from "react-i18next";
import { PostLoader } from "./PostLoader";
import { MarkUsers } from "../mark/MarkUsers";
import { useMarksContext } from "../mark/context/useMarksContext";
import { useMediaQuery } from "usehooks-ts";

type FileDropzoneProps = {
  showDescription: boolean;
  setFile: (file: CreatePostFile) => void;
  setPreview: (file: string | null) => void;
  file: CreatePostFile;
  preview: string | null;
  uploadProgress: number;
  mark?: boolean;
};

export const FileDropzone = ({
  showDescription,
  setFile,
  setPreview,
  file,
  preview,
  uploadProgress,
  mark = false,
}: FileDropzoneProps) => {
  const { t } = useTranslation();
  const { open, toggleOpen, resetMarks } = useMarksContext();
  const isMobile = useMediaQuery("(max-width:576px)");
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
    disabled: showDescription,
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
        showDescription && !isMobile
          ? "col-start-1 col-end-3 h-[200px] sm:h-full row-start-1 -row-end-1"
          : "col-start-1 col-end-4 row-start-1 -row-end-1"
      } ${isMobile && "col-start-1 col-end-4 row-start-1 -row-end-1"} ${
        mark && "grow w-full flex flex-col"
      }`}
    >
      <input {...getInputProps()} />
      <div
        className="h-full bg-cover bg-center relative grow flex flex-col"
        style={
          preview && file.type.includes("image")
            ? {
                backgroundImage: `url(${preview})`,
              }
            : {}
        }
      >
        {preview &&
          file.type.includes("image") &&
          showDescription &&
          !isMobile && (
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

        {(open && file.type.includes("image") && preview) ||
          (mark && (
            <div className="grow">
              <MarkUsers />
            </div>
          ))}

        {!preview && (
          <div className="h-full flex flex-col items-center justify-center gap-6">
            <FaRegImages
              aria-label={t("create.heading")}
              className="text-6xl dark:fill-stone-100"
            />
            <h2 className="text-lg sm:text-2xl dark:text-stone-100">
              {t("create.heading")}
            </h2>
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
