import { useTranslation } from "react-i18next";
import { Button, Loader } from "../../ui";
import { PostOptions } from "./types";

type CreateActionProps = {
  showDescription: boolean;
  addPost: () => void;
  type: PostOptions;
  isCreatingStorie: boolean;
};

export const CreateAction = ({
  showDescription,
  addPost,
  type,
  isCreatingStorie,
}: CreateActionProps) => {
  const { t } = useTranslation();

  return (
    showDescription && (
      <Button modifier="text" onClick={() => addPost()}>
        {isCreatingStorie && <Loader />}
        {!isCreatingStorie && type === "normal"
          ? t("create.shareAsPost")
          : t("create.shareAsStorie")}
      </Button>
    )
  );
};
