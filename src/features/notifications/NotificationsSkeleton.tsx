import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const SKELETON_ITEMS = 6;

export const NotificationsSkeleton = () => {
  return Array.from({ length: SKELETON_ITEMS }, (_, i) => {
    return (
      <div className="flex items-center gap-3 mb-6" key={i}>
        <Skeleton className="w-10 h-10 rounded-full" />
        <div className="text-xs">
          <p className="text-xs">
            <Skeleton width={45} />
          </p>
          <Skeleton width={150} />
          <Skeleton width={65} />
        </div>
      </div>
    );
  });
};
