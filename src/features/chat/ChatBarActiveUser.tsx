import { useMediaQuery } from "usehooks-ts";
import { Button, Modal } from "../../ui";
import { AddUsers } from "./add-user/AddUsers";
import { ActiveSupabaseUserType } from "./schema/ChatSchema";

type ChatBarActiveUserProps = {
  user: ActiveSupabaseUserType;
};

export const ChatBarActiveUser = ({ user }: ChatBarActiveUserProps) => {
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <>
      <Modal.Open openClass={`active-user-${user?.observe_id.user_id}`}>
        <Button modifier="active">
          <div className="relative">
            <img
              src={user?.observe_id.avatar_url}
              alt={user?.observe_id.fullName}
              width={48}
              height={48}
              className="w-full h-full rounded-full border-2 border-stone-300 dark:border-stone-50"
            />
            <div className="h-4 w-4 rounded-full flex items-center justify-center bg-stone-50 absolute bottom-0 right-0">
              <span className="h-2 w-2 rounded-full bg-green-600"></span>
            </div>
          </div>
          {!isMobile && (
            <p className="text-xs text-stone-950 dark:text-stone-100">
              {user?.observe_id.user_name}
            </p>
          )}
        </Button>
      </Modal.Open>
      <Modal.Content
        manageClass={`active-user-${user?.observe_id.user_id}`}
        parentClass="w-full mx-auto max-w-2xl px-4"
      >
        <AddUsers clickedUser={user?.observe_id} name={null} />
      </Modal.Content>
    </>
  );
};
