import { useParams } from "react-router";
import { UserPost } from "../../features/posts/UserPost";

export const DashboardIndividualPost = () => {
  const { postID, profile } = useParams();

  if (!postID || !profile) return;

  return (
    <div className="px-4">
      <UserPost postID={postID} profile={profile} />
    </div>
  );
};
