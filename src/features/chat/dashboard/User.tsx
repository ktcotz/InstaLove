import { Profile } from "../../profile/schema/ProfilesSchema";

type UserProps = {
  chat_id: string;
  role: string;
  user_id: Profile;
  isLastElement: boolean;
};

export const User = ({ user_id, isLastElement }: UserProps) => {
  return (
    <p className="font-semibold text-sm">
      {user_id.user_name}
      {isLastElement ? "" : ","}
    </p>
  );
};
