import { Profile } from "../../profile/schema/ProfilesSchema";

type MessageProps = {
  message: string;
  user_id: Profile;
  chat_id: number;
  created_at: string;
};

export const Message = ({ created_at, message, user_id }: MessageProps) => {
  return (
    <div>
      {message} - {user_id.user_name} - {created_at}
    </div>
  );
};
