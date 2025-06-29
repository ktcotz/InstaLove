import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { MainPost } from "./MainPost";
import { MainScreenPostsSkeleton } from "./MainScreenPostsSkeleton";
import { useGetAllResources } from "./queries/useGetAllResources";

export const MainScreenPosts = () => {
  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useGetAllResources();

  const { t } = useTranslation();
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );

    const loader = loaderRef.current;
    if (loader) observer.observe(loader);
    return () => {
      if (loader) observer.unobserve(loader);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isLoading) {
    return (
      <div className="max-w-xl mx-auto px-4 w-full flex flex-col gap-12">
        <MainScreenPostsSkeleton />
      </div>
    );
  }

  const allPosts = data?.pages.flatMap((page) => page.data) ?? [];

  if (allPosts.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-stone-700 dark:text-stone-300">
        <p>{t("posts.noMainPosts")}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {allPosts.map((item) => (
        <MainPost post={item} key={item.id} />
      ))}

      {isFetchingNextPage && <MainScreenPostsSkeleton />}

      <div ref={loaderRef} className="h-10" />
    </div>
  );
};
