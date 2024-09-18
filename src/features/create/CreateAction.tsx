import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();

  return (
    showDescription && (
      <Button modifier="text" onClick={() => addPost()}>
        {file.type.includes("image")
          ? t("create.shareAsPost")
          : t("create.shareAsStorie")}
      </Button>
    )
  );
};
