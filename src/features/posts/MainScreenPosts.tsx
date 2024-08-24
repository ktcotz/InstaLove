import { Wrapper } from "../../ui/Wrapper";
import { useUser } from "../authentication/queries/useUser";
import { IndividualModalPost } from "./IndividualModalPost";
import { useGetPosts } from "./queries/useGetPosts";

export const MainScreenPosts = () => {
  const { user } = useUser();
  const { data } = useGetPosts(user!.id, true);

  console.log(data);

  return (
    <Wrapper modifier="details">
      <div className="flex flex-col gap-12">
        <div className="border-b border-stone-300">
          {data?.data.map((item) => (
            <IndividualModalPost post={item} main={true} />
          ))}
        </div>
      </div>
    </Wrapper>
  );
};
