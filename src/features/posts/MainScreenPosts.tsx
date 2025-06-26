import { useTranslation } from "react-i18next";
import { MainPost } from "./MainPost";
import { MainScreenPostsSkeleton } from "./MainScreenPostsSkeleton";
import { useGetAllResources } from "./queries/useGetAllResources";

export const MainScreenPosts = () => {
  const { data, isLoading } = useGetAllResources();
  const { t } = useTranslation();

  if (isLoading)
    return (
      <div className="max-w-xl mx-auto px-4 w-full flex flex-col gap-12">
        <MainScreenPostsSkeleton />
      </div>
    );

  if (!isLoading && data && data.length === 0)
    return (
      <div className="p-4 text-center text-sm text-stone-700 dark:text-stone-300">
        <p>{t("posts.noMainPosts")}</p>
      </div>
    );

  return (
    <div className="flex flex-col gap-8 ">
      {data?.map((item) => (
        <MainPost post={item} key={item.id} />
      ))}
    </div>
  );
};
