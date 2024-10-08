import { useProfile } from "../profile/queries/useProfile";
import { IndividualModalPost } from "./IndividualModalPost";
import { useGetUserPost } from "./queries/useGetUserPost";
import { useNavigate } from "react-router";
import { GlobalRoutes } from "../../typing/routes";
import { UserPostSkeleton } from "./UserPostSkeleton";

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

  const isLoading = isUserLoading || isPostLoading;

  if (isLoading) return <UserPostSkeleton />;

  if (!post || !user) {
    navigate(GlobalRoutes.Dashboard);
    return null;
  }

  return <IndividualModalPost post={post} />;
};
