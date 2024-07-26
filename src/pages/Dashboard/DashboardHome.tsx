import { useMediaQuery } from "usehooks-ts";
import { Stories } from "../../features/stories/Stories";
import { Wrapper } from "../../ui/Wrapper";

export const DashboardHome = () => {
  const isLaptop = useMediaQuery("(min-width:1280px)");
  return (
    <Wrapper>
      <div className="relative grid xl:grid-cols-3">
        <div className="xl:col-start-1 xl:col-end-3 overflow-x-hidden">
          <Stories />
        </div>
        {isLaptop && <div>PROFILE</div>}
      </div>
    </Wrapper>
  );
};
