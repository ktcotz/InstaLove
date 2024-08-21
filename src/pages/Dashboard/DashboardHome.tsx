import { useMediaQuery } from "usehooks-ts";
import { Stories } from "../../features/stories/Stories";
import { Wrapper } from "../../ui/Wrapper";
import { HomeProfile } from "../../features/profile/HomeProfile";
import { Search } from "../../features/search/Search";
import { CustomLink } from "../../ui/CustomLink";
import { NotificationsCounter } from "../../features/notifications/NotificationsCounter";
import { FaHeart } from "react-icons/fa";
import { MainScreenPosts } from "../../features/posts/MainScreenPosts";

export const DashboardHome = () => {
  const isLaptop = useMediaQuery("(min-width:1280px)");
  const isMobile = useMediaQuery("(max-width:768px)");
  return (
    <Wrapper>
      <div className="relative grid xl:grid-cols-3 gap-4">
        {isMobile && (
          <div className="border-b border-stone-300 p-2 flex items-center gap-2 justify-between">
            <div className="grow">
              <Search home={true} />
            </div>
            <CustomLink
              modifier="mobile-notification"
              to={"/dashboard/notifications"}
            >
              <FaHeart />
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
    </Wrapper>
  );
};
