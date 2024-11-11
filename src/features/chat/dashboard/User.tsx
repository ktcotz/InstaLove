import { Profile } from "../../profile/schema/ProfilesSchema";

type UserProps = {
  chat_id: string;
  role: string;
  user_id: Profile;
  isLastElement: boolean;
};

export const User = ({ user_id, isLastElement }: UserProps) => {
  const slicedUserName = user_id.user_name.slice(0, 12);
  return (
    <p className="font-semibold text-sm truncate ">
      {user_id.user_name.length >= 12
        ? `${slicedUserName}...`
        : user_id.user_name}
      {isLastElement ? "" : ","}
    </p>
  );
};
