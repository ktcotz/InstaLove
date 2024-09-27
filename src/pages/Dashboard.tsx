import { Outlet } from "react-router";
import { DashboardNavigation } from "../features/navigation/DashboardNavigation";
import { ComponentManager } from "../features/navigation/ComponentManager";
import { MarksContextProvider } from "../features/mark/context/MarksContextProvider";
import { useEffect } from "react";
import { useTernaryDarkMode } from "usehooks-ts";
export const Dashboard = () => {
  const { isDarkMode } = useTernaryDarkMode();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  return (
    <MarksContextProvider>
      <div className="relative h-full">
        <aside className="fixed bottom-0 left-0 w-full border-t border-stone-300 bg-stone-50 dark:bg-stone-950 dark:border-stone-50  z-10 md:h-full md:top-0 md:w-20 md:border-t-0 md:border-r lg:w-60">
          <DashboardNavigation />
          <ComponentManager />
        </aside>
        <main className="flex flex-col relative top-0 min-h-screen pb-24 md:pb-0 md:pl-20 lg:pl-60 bg-stone-50 dark:bg-stone-950">
          <div className="py-0 md:py-12 grow flex flex-col">
            <Outlet />
          </div>
        </main>
      </div>
    </MarksContextProvider>
  );
};
