import { Tooltip } from "react-tooltip";
import { CustomLink } from "../../../ui";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { ChatSchemaType } from "../schema/ChatSchema";
import { useHover } from "../../profile/hooks/useHover";
import { MessageActions } from "./MessageActions";

type MessageProps = {
  message: string;
  user_id: Profile;
  chat_id: ChatSchemaType;
  created_at: string;
};

export const Message = ({ message, user_id, chat_id }: MessageProps) => {
  const isCreator = user_id.user_id === chat_id.created_by;
  const { hover, isHover, unhover } = useHover();

  return (
    <div
      className={`w-fit flex items-center gap-2 ${
        isCreator ? "self-end" : "self-start"
      }`}
      onMouseEnter={hover}
      onMouseLeave={unhover}
      onTouchStart={hover}
      onTouchEnd={unhover}
    >
      {!isCreator && (
        <>
          <CustomLink
            to={`/dashboard/${user_id.user_name}`}
            modifier="avatar"
            data-tooltip-id={`user-${user_id.user_name}`}
            data-tooltip-place="top"
          >
            <img src={user_id.avatar_url} alt={user_id.user_name} />
          </CustomLink>
          <Tooltip id={`user-${user_id.user_name}`}>
            {user_id.user_name}
          </Tooltip>
        </>
      )}
      <div
        className={`${
          isCreator ? "bg-blue-600 text-white" : "bg-stone-200 text-stone-950"
        } p-2 rounded-md`}
      >
        {message}
      </div>
      {isHover && (
        <div className={`${isCreator ? "-order-1" : ""}`}>
          <MessageActions />
        </div>
      )}
    </div>
  );
};
