import { Profile } from "../../profile/schema/ProfilesSchema";

type UsersPreviewProps = {
  selectedUsers: Profile[];
};

export const UsersPreview = ({ selectedUsers }: UsersPreviewProps) => {
  return (
    <div>
      {selectedUsers.map((selectedUser) => (
        <div>{selectedUser.user_name}</div>
      ))}
    </div>
  );
};
