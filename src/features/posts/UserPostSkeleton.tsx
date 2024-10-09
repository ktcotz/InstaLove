import Skeleton from "react-loading-skeleton";
import { useMediaQuery, useTernaryDarkMode } from "usehooks-ts";

export const UserPostSkeleton = () => {
  const { isDarkMode } = useTernaryDarkMode();
  const isMobile = useMediaQuery("(max-width:768px)");

  return (
    <Skeleton
      height={isMobile ? "100vh" : "500px"}
      baseColor={isDarkMode ? "#000" : "#fff"}
      highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
    />
  );
};
