import { Logo } from "../../ui/Logo";
import { DashboardNavigationItem } from "./DashboardNavigationItem";
import { dashboardNavigationData } from "./data";

export const DashboardNavigation = () => {
  return (
    <nav className="py-6 p-3 relative z-10 bg-stone-50">
      <div className="mb-10 px-3">
        <Logo modifier="small-logo" />
      </div>
      <ul className="flex flex-col gap-4">
        {dashboardNavigationData.map((navItem) => (
          <DashboardNavigationItem {...navItem} key={navItem.id} />
        ))}
      </ul>
    </nav>
  );
};
