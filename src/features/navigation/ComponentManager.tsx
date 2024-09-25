import { useRef } from "react";
import { DashboardNotifications } from "../../pages/Dashboard/DashboardNotifications";
import { DashboardSearch } from "../../pages/Dashboard/DashboardSearch";
import { NavigationComponent } from "./context/NavigationContext";
import { useNavigationContext } from "./context/useNavigationContext";
import { useOnClickOutside } from "usehooks-ts";

export const ComponentManager = () => {
  const { open, component, close } = useNavigationContext();
  const ref = useRef(null);

  useOnClickOutside(ref, close);

  if (!open || !component) return null;

  const manageComponent: Record<NavigationComponent, JSX.Element | null> = {
    search: <DashboardSearch />,
    notifications: <DashboardNotifications />,
    create: null,
  };

  return (
    <div
      ref={ref}
      className="fixed top-0 left-20 lg:left-60 h-full z-0 w-[300px] animate-fade-left"
    >
      {manageComponent[component]}
    </div>
  );
};
