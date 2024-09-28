import { MainPost } from "./MainPost";
import { useGetAllResources } from "./queries/useGetAllResources";

export const MainScreenPosts = () => {
  const { data } = useGetAllResources();

  return (
    <div className="flex flex-col gap-8 ">
      {data?.map((item) => (
        <MainPost post={item} key={item.id} />
      ))}
    </div>
  );
};
