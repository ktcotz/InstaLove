import { useTranslation } from "react-i18next";
import { Button } from "../../ui";
import { PostOptions } from "./types";

type CreateActionProps = {
  showDescription: boolean;
  addPost: () => void;
  type: PostOptions;
};

export const CreateAction = ({
  showDescription,
  addPost,
  type,
}: CreateActionProps) => {
  const { t } = useTranslation();

  return (
    showDescription && (
      <Button modifier="text" onClick={() => addPost()}>
        {type === "normal"
          ? t("create.shareAsPost")
          : t("create.shareAsStorie")}
      </Button>
    )
  );
};
