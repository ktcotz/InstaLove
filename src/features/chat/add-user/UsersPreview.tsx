import { IoClose } from "react-icons/io5";
import { Button, CustomLink } from "../../../ui";
import { Profile } from "../../profile/schema/ProfilesSchema";

type UsersPreviewProps = {
  selectedUsers: Profile[];
  handleRemoveUser: (id: string) => void;
};

export const UsersPreview = ({
  selectedUsers,
  handleRemoveUser,
}: UsersPreviewProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      {selectedUsers.map((selectedUser) => (
        <div
          className="px-3 py-1 bg-blue-200 rounded-full flex items-center gap-1"
          key={selectedUser.user_id}
        >
          <CustomLink
            to={`/dashboard/${selectedUser.user_name}`}
            target="_blank"
            modifier="chat-add"
          >
            {selectedUser.user_name}
          </CustomLink>
          <Button
            onClick={() => handleRemoveUser(selectedUser.user_id)}
            className="text-blue-700 hover:text-stone-800 transition"
          >
            <IoClose />
          </Button>
        </div>
      ))}
    </div>
  );
};
