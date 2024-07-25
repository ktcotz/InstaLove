import { Outlet } from "react-router";
import { DashboardNavigation } from "../layout/DashboardNavigation/DashboardNavigation";

export const Dashboard = () => {
  return (
    <div className="relative h-full">
      <aside className="fixed bottom-0 left-0 w-full border-t border-stone-300 bg-stone-50 z-10 md:h-full md:top-0 md:w-60 md:border-t-0 md:border-r">
        <DashboardNavigation />
      </aside>
      <main className="relative top-0 min-h-screen  pl-60 bg-green-800">
        <Outlet />
      </main>
    </div>
  );
};
