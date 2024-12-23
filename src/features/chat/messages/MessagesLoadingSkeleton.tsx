import Skeleton from "react-loading-skeleton";
import { useTernaryDarkMode } from "usehooks-ts";

const MessageSkeleton = ({ isDarkMode }: { isDarkMode: boolean }) => {
  const randomNumber = Math.floor(Math.random() * (200 - 50 + 1) + 50);

  return (
    <Skeleton
      className="w-full h-full "
      height={35}
      width={Math.abs(randomNumber)}
      baseColor={isDarkMode ? "#000" : "#fff"}
      highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
    />
  );
};

export const MessagesLoadingSkeleton = () => {
  const MAX_MESSAGES_LENGTH = 8;
  const { isDarkMode } = useTernaryDarkMode();

  return Array.from({ length: MAX_MESSAGES_LENGTH }, (_, i) => {
    return (
      <div key={i}>
        <MessageSkeleton isDarkMode={isDarkMode} />
      </div>
    );
  });
};
