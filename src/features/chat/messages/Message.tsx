import { CustomLink } from "../../../ui";
import { Profile } from "../../profile/schema/ProfilesSchema";
import { ChatSchemaType } from "../schema/ChatSchema";

type MessageProps = {
  message: string;
  user_id: Profile;
  chat_id: ChatSchemaType;
  created_at: string;
};

export const Message = ({ message, user_id, chat_id }: MessageProps) => {
  const isCreator = user_id.user_id === chat_id.created_by;

  return (
    <div
      className={`w-fit flex items-center gap-2 ${
        isCreator ? "self-end" : "self-start"
      }`}
    >
      {!isCreator && (
        <CustomLink to={`/dashboard/${user_id.user_name}`} modifier="avatar">
          <img src={user_id.avatar_url} alt={user_id.user_name} />
        </CustomLink>
      )}
      <div
        className={`${
          isCreator ? "bg-blue-600 text-white" : "bg-stone-200 text-stone-950"
        } p-2 rounded-md`}
      >
        {message} - {user_id.user_name}
      </div>
    </div>
  );
};
