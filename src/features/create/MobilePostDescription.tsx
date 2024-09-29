import { ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Button, Loader, Modal } from "../../ui";
import { FaMusic } from "react-icons/fa";
import { AddMusic } from "../stories/AddMusic";
import { MobileMarkDropzone } from "./MobileMarkDropzone";
import { CreatePostFile } from "./CreatePost";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { Textarea } from "../../ui/Textarea";

type MobilePostDescriptionProps = {
  description: string;
  changeDescription: (description: string) => void;
  handleChange: (ev: ChangeEvent<HTMLTextAreaElement>) => void;
  type: "normal" | "storie";
  options: { comments: boolean; likes: boolean };
  changeOptions: (ev: ChangeEvent<HTMLInputElement>) => void;
  handleAddMusic: (music: string) => void;
  showDescription: boolean;
  setFile: (file: CreatePostFile) => void;
  setPreview: (file: string | null) => void;
  file: CreatePostFile;
  preview: string | null;
  uploadProgress: number;
  addPost: () => void;
  isCreatingStorie: boolean;
};

export const MobilePostDescription = ({
  type,
  options,
  changeOptions,
  handleAddMusic,
  showDescription,
  setFile,
  setPreview,
  file,
  preview,
  uploadProgress,
  addPost,
  isCreatingStorie,
  description,
  changeDescription,
  handleChange,
}: MobilePostDescriptionProps) => {
  const { t } = useTranslation();
  const { reset } = useModal();

  return (
    <div className="p-4 col-start-1 col-end-4">
      <div className="py-4 flex flex-col gap-2 mb-4">
        <Textarea
          description={description}
          changeDescription={changeDescription}
          handleChange={handleChange}
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="comments"
            id="comments"
            className="w-4 h-4"
            defaultChecked={options.comments}
            onChange={changeOptions}
          />
          <label
            htmlFor="comments"
            className="text-sm text-stone-600 dark:text-stone-200"
          >
            {t("create.comment")}
          </label>
        </div>
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="likes"
            id="likes"
            className="w-4 h-4"
            defaultChecked={options.likes}
            onChange={changeOptions}
          />
          <label
            htmlFor="likes"
            className="text-sm text-stone-600 dark:text-stone-200"
          >
            {t("create.like")}
          </label>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-start">
        {type === "storie" && (
          <>
            <Modal.Open openClass="add-music">
              <Button modifier="mobile-create">
                <FaMusic /> {t("posts.music")}
              </Button>
            </Modal.Open>
            <Modal.Content
              manageClass="add-music"
              parentClass="w-full max-w-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            >
              <AddMusic handleAddMusic={handleAddMusic} />
            </Modal.Content>
          </>
        )}
        <Modal.Open openClass="mobile-dropzone">
          <Button modifier="mobile-create">
            <FaMusic /> {t("posts.tag")}
          </Button>
        </Modal.Open>
        <Modal.Content
          fullScreen={true}
          manageClass="mobile-dropzone"
          parentClass="w-full grow flex flex-col"
        >
          <MobileMarkDropzone
            showDescription={showDescription}
            setFile={setFile}
            setPreview={setPreview}
            file={file}
            preview={preview}
            uploadProgress={uploadProgress}
          />
        </Modal.Content>
      </div>
      <div className="mt-8 grid grid-cols-2 gap-2">
        <Button onClick={reset}>Zrezygnuj z tworzenia</Button>

        <Button modifier="submit" onClick={addPost}>
          {isCreatingStorie ? <Loader /> : "Stwórz"}
        </Button>
      </div>
    </div>
  );
};
