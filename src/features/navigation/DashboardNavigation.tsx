import { useMediaQuery } from "usehooks-ts";
import { Logo } from "../../ui/Logo";
import { DashboardNavigationItem } from "./DashboardNavigationItem";
import { dashboardNavigationData, mobileDashboardNavigationData } from "./data";

const MOBILE_VIEWPORT = "768px";

export const DashboardNavigation = () => {
  const matches = useMediaQuery(`(max-width:${MOBILE_VIEWPORT})`);

  return (
    <nav className="flex items-center md:flex-col lg:items-stretch py-6 p-3 relative z-10 bg-stone-50">
      {!matches && (
        <div className="mb-10 px-3">
          <Logo modifier="small-logo" />
        </div>
      )}
      <ul className="flex w-full gap-1 justify-around md:justify-start md:flex-col sm:gap-4 items-center lg:items-stretch">
        {(!matches
          ? mobileDashboardNavigationData
          : dashboardNavigationData
        ).map((navItem) => (
          <DashboardNavigationItem {...navItem} key={navItem.id} />
        ))}
      </ul>
    </nav>
  );
};
