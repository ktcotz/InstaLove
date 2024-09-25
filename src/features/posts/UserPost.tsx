import { useProfile } from "../profile/queries/useProfile";
import { IndividualModalPost } from "./IndividualModalPost";
import { useGetUserPost } from "./queries/useGetUserPost";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../../typing/routes";
import { Loader } from "../../ui/Loader";

type UserPostProps = {
  postID: string;
  profile: string;
};

export const UserPost = ({ postID, profile }: UserPostProps) => {
  const navigate = useNavigate();
  const { data: user, isLoading: isUserLoading } = useProfile(profile);
  const { data: post, isLoading: isPostLoading } = useGetUserPost({
    post_id: postID,
    user_id: user?.user_id,
  });

  if (isUserLoading || isPostLoading) return <Loader />;

  console.log(post, user);

  if (!post || !user) {
    navigate(GlobalRoutes.Dashboard);
    return null;
  }

  return <IndividualModalPost post={post} />;
};
