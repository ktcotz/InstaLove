import { Button } from "../../ui/Button";
import { CustomLink } from "../../ui/CustomLink";
import { Loader } from "../../ui/Loader";
import { useUser } from "../authentication/queries/useUser";
import { HiUserAdd } from "react-icons/hi";

export const HoverProfile = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <Loader />;

  if (!user) return null;

  return (
    <div className="absolute bottom-0 -left-8 2xl:left-0 translate-y-full p-6 bg-stone-50 z-50 shadow-lg">
      <div className="flex items-center gap-4 mb-6">
        <CustomLink
          to={`/profile/${user.user_metadata?.user_name}`}
          modifier="avatar"
        >
          <img
            src={`${user.user_metadata?.avatar_url}`}
            alt={user.user_metadata?.user_name}
            width={48}
            height={48}
            className="rounded-full"
          />
        </CustomLink>
        <div className="flex flex-col">
          <CustomLink
            to={`/profile/${user.user_metadata?.user_name}`}
            modifier="avatar-name"
          >
            {user.user_metadata?.user_name}
          </CustomLink>
          <p className="text-sm text-stone-500">Kamil Naskręt</p>
        </div>
      </div>
      <div className="flex items-center gap-6 mb-4">
        <div className="text-center p-2 2xl:p-4">
          <p className="font-semibold">28</p>
          <h2 className="text-sm text-stone-600">posty</h2>
        </div>
        <div className="text-center p-2 2xl:p-4">
          <p className="font-semibold">322</p>
          <h2 className="text-sm text-stone-600">obserwujący</h2>
        </div>
        <div className="text-center p-2 2xl:p-4">
          <p className="font-semibold">1638</p>
          <h2 className="text-sm text-stone-600">obserwowani</h2>
        </div>
      </div>
      <div className="flex items-center gap-1 mb-4">
        <img src="https://picsum.photos/200/200" alt="" className="w-full" />
        <img src="https://picsum.photos/200/200" alt="" className="w-full" />
        <img src="https://picsum.photos/200/200" alt="" className="w-full" />
      </div>
      <Button modifier="add-user">
        <HiUserAdd />
        Obserwuj
      </Button>
    </div>
  );
};
