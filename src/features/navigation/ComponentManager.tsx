import { DashboardNotifications } from "../../pages/Dashboard/DashboardNotifications";
import { DashboardSearch } from "../../pages/Dashboard/DashboardSearch";
import { NavigationComponent } from "./context/NavigationContext";
import { useNavigationContext } from "./context/useNavigationContext";

export const ComponentManager = () => {
  const { open, component } = useNavigationContext();

  if (!open || !component) return null;

  const manageComponent: Record<NavigationComponent, JSX.Element> = {
    search: <DashboardSearch />,
    notifications: <DashboardNotifications />,
  };

  return (
    <div className="fixed top-0 left-60 h-full z-0 w-[300px] animate-fade-left">
      {manageComponent[component]}
    </div>
  );
};
