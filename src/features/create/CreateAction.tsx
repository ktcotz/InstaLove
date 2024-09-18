import { Button } from "../../ui";
import { CreatePostFile } from "./CreatePost";

type CreateActionProps = {
  showDescription: boolean;
  addPost: () => void;
  file: CreatePostFile;
};

export const CreateAction = ({
  showDescription,
  addPost,
  file,
}: CreateActionProps) => {
  return (
    showDescription && (
      <Button modifier="text" onClick={() => addPost()}>
        {file.type.includes("image") ? "Udostępnij" : "Udostępnij jako rolkę"}
      </Button>
    )
  );
};
