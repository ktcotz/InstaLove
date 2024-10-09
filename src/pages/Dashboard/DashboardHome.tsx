import { useMediaQuery } from "usehooks-ts";
import { Stories } from "../../features/stories/Stories";
import { HomeProfile } from "../../features/profile/HomeProfile";
import { Search } from "../../features/search/Search";
import { CustomLink } from "../../ui/CustomLink";
import { NotificationsCounter } from "../../features/notifications/NotificationsCounter";
import { FaRegHeart } from "react-icons/fa";
import { MainScreenPosts } from "../../features/posts/MainScreenPosts";
import { useEffect } from "react";
import { supabase } from "../../lib/supabase/supabase";
import { useAuth } from "../../features/authentication/context/useAuth";
import { useLoggedOut } from "../../features/authentication/mutations/useLoggedOut";

export const DashboardHome = () => {
  const isLaptop = useMediaQuery("(min-width:1280px)");
  const isMobile = useMediaQuery("(max-width:768px)");
  const { user } = useAuth();
  const { logged } = useLoggedOut();

  useEffect(() => {
    const activeUsers = supabase.channel("active_users", {
      config: { presence: { key: user?.id } },
    });
    activeUsers
      .on("presence", { event: "join" }, ({ newPresences }) => {
        newPresences.forEach((presence) => {
          console.log("User joined:", presence.user_id);
        });
      })
      .on("presence", { event: "leave" }, ({ leftPresences }) => {
        leftPresences.forEach((presence) => {
          logged({ user_id: presence.user_id });
        });
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await activeUsers.track({
            user_id: user?.id,
          });
        }
      });
  }, [user, logged]);

  return (
    <div className="relative grid xl:grid-cols-3 gap-4">
      {isMobile && (
        <div className="border-b border-stone-300 p-2 flex items-center gap-2 justify-between px-4 sm:px-0">
          <div className="grow">
            <Search />
          </div>
          <CustomLink
            modifier="mobile-notification"
            to={"/dashboard/notifications"}
          >
            <FaRegHeart className="dark:fill-stone-50" />
            <NotificationsCounter />
          </CustomLink>
        </div>
      )}
      <div className="xl:col-start-1 xl:col-end-3 overflow-x-hidden flex flex-col gap-6 pb-60">
        <Stories />
        <MainScreenPosts />
      </div>
      {isLaptop && <HomeProfile />}
    </div>
  );
};
