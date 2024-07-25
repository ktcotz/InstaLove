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

  return manageComponent[component];
};
