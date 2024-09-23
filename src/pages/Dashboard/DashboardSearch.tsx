import { Search } from "../../features/search/Search";

export const DashboardSearch = () => {
  return (
    <div className="bg-stone-50 border-r border-stone-300 dark:bg-stone-950 dark:border-stone-50 h-full overflow-y-scroll">
      <Search />
    </div>
  );
};
