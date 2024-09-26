import { useParams } from "react-router";
import { UserPost } from "../../features/posts/UserPost";

export const DashboardIndividualPost = () => {
  const { postID, profile } = useParams();

  if (!postID || !profile) return;

  return (
    <div className="mx-auto max-w-6xl p-4">
      <UserPost postID={postID} profile={profile} />
    </div>
  );
};
