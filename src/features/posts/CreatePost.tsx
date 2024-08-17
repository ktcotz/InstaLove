import { Button } from "../../ui/Button";
import { Wrapper } from "../../ui/Wrapper";
import { FaRegImages } from "react-icons/fa6";
import { useDropzone } from "react-dropzone";
import { ChangeEvent, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { CreatePostDescription, MAX_LENGTH } from "./CreatePostDescription";
import { useCreatePost } from "./mutations/useCreatePost";
import { useUser } from "../authentication/queries/useUser";
import { useNavigate } from "react-router";
import { Loader } from "../../ui/Loader";
import { useModal } from "../../ui/modal/ModalContext/useModal";
import { useAddStorie } from "../stories/mutations/useAddStorie";

type CreatePostProps = {
  type: "normal" | "storie";
};

export const CreatePost = ({ type = "normal" }: CreatePostProps) => {
  const navigate = useNavigate();
  const { create, isCreating } = useCreatePost();
  const { createStorie, isCreatingStorie } = useAddStorie();
  const { user } = useUser();
  const [file, setFile] = useState<{ drop: File | null; type: string }>({
    drop: null,
    type: "",
  });
  const [music, setMusic] = useState("");
  const [preview, setPreview] = useState<string | null>(null);
  const [showDescription, setShowDescription] = useState(false);
  const [description, setDescription] = useState("");
  const [options, setOptions] = useState({
    comments: false,
    likes: false,
  });

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
      const dropedFile = files[0];

      const previewFile = URL.createObjectURL(dropedFile);

      setPreview(previewFile);
      setFile({ drop: dropedFile, type: dropedFile.type });
    },
  });

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
          type: file.type === "video/mp4" ? "video" : "post",
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
        type: file.type === "video/mp4" ? "reels" : "posts",
      },
      {
        onSuccess: () => {
          close();
          navigate(`/dashboard/${user.user_metadata.user_name}`);
        },
      }
    );
  };

  return (
    <Wrapper modifier="create">
      <div className="text-center shadow-xl rounded-md bg-stone-50">
        <div className="p-3 border-b border-stone-300 flex items-center justify-center">
          {preview && (
            <div className="mr-auto">
              <Button
                modifier="close"
                onClick={() => {
                  setPreview(null);
                  setShowDescription(false);
                }}
              >
                <IoIosArrowBack aria-label="Remove image" />
              </Button>
            </div>
          )}
          <h1 className={`font-medium ${preview ? "mr-auto" : ""}`}>
            {type === "storie" ? "Utwórz nowe story" : "Utwórz nowy post"}
          </h1>
          {preview && !showDescription && (
            <Button modifier="text" onClick={() => setShowDescription(true)}>
              Dalej
            </Button>
          )}

          {showDescription &&
            (isCreating || isCreatingStorie ? (
              <Loader />
            ) : (
              <Button modifier="text" onClick={() => addPost()}>
                {file.type.includes("image")
                  ? "Udostępnij"
                  : "Udostępnij jako rolkę"}
              </Button>
            ))}
        </div>
        <div className="grid md:grid-cols-3">
          <div
            {...getRootProps({ className: "dropzone" })}
            className={`${
              showDescription
                ? "col-start-1 col-end-3"
                : "col-start-1 col-end-4"
            }`}
          >
            <input {...getInputProps()} />
            <div
              className={`${
                preview ? "h-[300px]" : "h-[600px]"
              } md:h-[600px] bg-cover bg-center relative`}
              style={
                preview && file.type.includes("image")
                  ? {
                      backgroundImage: `url(${preview})`,
                    }
                  : {}
              }
            >
              {!preview && (
                <div className="h-full flex flex-col items-center justify-center gap-6">
                  <FaRegImages aria-label="Post" className="text-6xl" />
                  <h2 className="text-2xl">
                    Przeciągnij zdjęcia i filmy tutaj
                  </h2>
                  <Button modifier="submit">Wybierz z komputera</Button>
                </div>
              )}

              {preview && file.type.includes("video") && (
                <div className="absolute top-0 left-0 h-full w-full">
                  <video
                    autoPlay
                    loop
                    muted
                    className="h-full w-full object-cover"
                  >
                    <source src={preview} type="video/mp4" />
                  </video>
                </div>
              )}
            </div>
          </div>
          {showDescription && (
            <CreatePostDescription
              description={description}
              handleChange={handleChange}
              changeDescription={changeDescription}
              options={options}
              changeOptions={handleOptionsChange}
              handleAddMusic={handleAddMusic}
              type={
                type === "storie" && file.type.includes("image")
                  ? "storie"
                  : "normal"
              }
            />
          )}
        </div>
      </div>
    </Wrapper>
  );
};
