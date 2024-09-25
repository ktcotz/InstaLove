import { IndividualModalPost } from "./IndividualModalPost";
import { useGetAllResources } from "./queries/useGetAllResources";

export const MainScreenPosts = () => {
  const { data } = useGetAllResources();

  return (
    <div className="flex flex-col gap-8 ">
      {data?.map((item) => (
        <IndividualModalPost post={item} main={true} />
      ))}
    </div>
  );
};
