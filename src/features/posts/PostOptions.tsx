import { useTranslation } from "react-i18next";
import { Button, CustomLink, Modal } from "../../ui";
import { GeneralPost } from "./schema/PostsSchema";
import { Profile } from "../profile/schema/ProfilesSchema";
import { useUser } from "../authentication/queries/useUser";
import { DeletePostConfirmation } from "./DeletePostConfirmation";

type PostOptionsProps = {
  post: GeneralPost;
  user: Profile;
};

export const PostOptions = ({ post, user }: PostOptionsProps) => {
  const { user: current } = useUser();
  const { t } = useTranslation();

  return (
    <div className="bg-stone-50 dark:bg-stone-950 rounded-md shadow-md text-stone-950 dark:text-stone-50">
      <ul className="flex flex-col  text-center divide-y-1 divide-stone-300 dark:divide-stone-50">
        <li className="p-3">
          <CustomLink
            modifier="avatar-name"
            to={`/dashboard/${user.user_name}/post/${post.id}`}
          >
            {t("posts.goTo")}
          </CustomLink>
        </li>
        {user.user_id === current?.id && (
          <li className="p-3">
            <Modal.Open openClass={`delete`}>
              <Button>{t("posts.delete")}</Button>
            </Modal.Open>
            <Modal.Content
              manageClass={`delete`}
              parentClass="mx-auto max-w-lg "
            >
              <DeletePostConfirmation id={post.id} />
            </Modal.Content>
          </li>
        )}
      </ul>
    </div>
  );
};
