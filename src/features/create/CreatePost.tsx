import { Button } from "../../ui/Button";
import { ChangeEvent, useState } from "react";
import { CreatePostDescription } from "./CreatePostDescription";
import { useCreatePost } from "./mutations/useCreatePost";
import { useUser } from "../authentication/queries/useUser";
import { useNavigate } from "react-router";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { useAddStorie } from "../stories/mutations/useAddStorie";
import { DisablePostPreview } from "./DisablePostPreview";
import { useTranslation } from "react-i18next";
import { CreateAction } from "./CreateAction";
import { FileDropzone } from "./FileDropzone";
import { PostOptions, PostPossibilityFileType } from "./types";
import { MAX_LENGTH } from "../../ui/Textarea";
import { AxiosProgressEvent } from "axios";
import { useAddMarks } from "../mark/mutations/useAddMarks";
import { useMarksContext } from "../mark/context/useMarksContext";

export type CreatePostFile = {
  drop: File | null;
  type: PostPossibilityFileType;
};

type CreatePostProps = {
  type: PostOptions;
};

export const CreatePost = ({ type = "normal" }: CreatePostProps) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { mutate } = useAddMarks();
  const { marks, resetMarks } = useMarksContext();
  const { create } = useCreatePost();
  const { createStorie } = useAddStorie();
  const { user } = useUser();
  const [file, setFile] = useState<CreatePostFile>({
    drop: null,
    type: "image",
  });
  const [music, setMusic] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState({
    comments: false,
    likes: false,
  });
  const [uploadProgress, setUploadProgress] = useState(0);

  const { close } = useModal();

  const handleOptionsChange = (ev: ChangeEvent<HTMLInputElement>) => {
    setOptions((prev) => ({
      ...prev,
      [ev.target.name]: ev.target.checked,
    }));
  };

  const handleChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = ev.target.value;

    setDescription(newText.slice(0, MAX_LENGTH));
  };

  const changeDescription = (value: string) => {
    setDescription((prev) => prev + value);
  };

  const handleAddMusic = (music: string) => {
    setMusic(music);
  };

  const handleUploadProgress = (progressEvent: AxiosProgressEvent) => {
    if (!progressEvent.total) return;

    const percentCompleted = Math.round(
      (progressEvent.loaded * 100) / progressEvent.total
    );
    setUploadProgress(percentCompleted);
  };

  const addPost = () => {
    if (!user || !file.drop) return;

    if (type === "storie") {
      return createStorie(
        {
          description,
          disableComments: options.comments,
          disableLike: options.likes,
          user_id: user.id,
          post_image: file.drop,
          type: file.type.startsWith("video") ? "video" : "post",
          music,
        },
        { onSuccess: () => close() }
      );
    }

    create(
      {
        description,
        disableComment: options.comments,
        disableLike: options.likes,
        post_image: file.drop,
        user_id: user.id,
        type: file.type.startsWith("video") ? "reels" : "posts",
        handleUploadProgress,
      },
      {
        onSuccess: (post) => {
          const mappedMarks = marks.map((mark) => {
            return {
              x: mark.x,
              y: mark.y,
              name: mark.name,
              post_id: post![0].id,
              user_id: user.id,
            };
          });

          mutate(mappedMarks);
          close();
          navigate(`/dashboard/${user.user_metadata.user_name}`);
          resetMarks();
        },
      }
    );
  };

  return (
    <div className="mx-auto max-w-xl sm:max-w-5xl">
      <div className="text-center shadow-xl rounded-md bg-stone-50 dark:bg-stone-950">
        <div className="p-3 border-b border-stone-300 dark:border-stone-50 flex items-center justify-center">
          {preview && (
            <DisablePostPreview
              setPreview={setPreview}
              setShowDescription={setShowDescription}
            />
          )}
          <h1
            className={`font-medium dark:text-stone-50 ${
              preview ? "mr-auto" : ""
            }`}
          >
            {type === "storie" ? t("create.asStorie") : t("create.asPost")}
          </h1>
          {preview && !showDescription && (
            <Button
              modifier="text"
              onClick={() => setShowDescription(true)}
              aria-label={t("create.next")}
            >
              {t("create.next")}
            </Button>
          )}

          <CreateAction
            showDescription={showDescription}
            addPost={addPost}
            type={type}
          />
        </div>
        <div className="grid md:grid-cols-3">
          <FileDropzone
            showDescription={showDescription}
            setFile={setFile}
            setPreview={setPreview}
            file={file}
            preview={preview}
            uploadProgress={uploadProgress}
          />

          {showDescription && (
            <CreatePostDescription
              description={description}
              handleChange={handleChange}
              changeDescription={changeDescription}
              options={options}
              changeOptions={handleOptionsChange}
              handleAddMusic={handleAddMusic}
              type={type}
            />
          )}
        </div>
      </div>
    </div>
  );
};
