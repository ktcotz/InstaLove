import { useUser } from "../authentication/queries/useUser";
import { useUserByID } from "../authentication/queries/useUserByID";
import { ChatBarSwipper } from "./ChatBarSwipper";
import { ChatBarUserChats } from "./ChatBarUserChats";

export const ChatBar = () => {
  const { user: current } = useUser();
  const { user } = useUserByID(current?.id);

  if (!user) return null;

  return (
    <div className="p-4 flex flex-col gap-6 border-r border-stone-300 dark:border-stone-50">
      <h2 className="text-stone-950 dark:text-stone-50 font-semibold text-xl">
        {user?.user_name}
      </h2>
      <ChatBarSwipper />
      <ChatBarUserChats />
    </div>
  );
};
