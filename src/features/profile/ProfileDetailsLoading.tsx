import Skeleton from "react-loading-skeleton";
import { Wrapper } from "../../ui";
import { useTernaryDarkMode } from "usehooks-ts";

export const ProfileDetailsLoading = () => {
  const { isDarkMode } = useTernaryDarkMode();

  return (
    <Wrapper modifier="details">
      <div className="flex flex-col  lg:flex-row gap-16 2xl:gap-32 py-6 md:py-0">
        <div className="self-center sm:self-start">
          <Skeleton
            width={176}
            height={176}
            className="rounded-full"
            baseColor={isDarkMode ? "#000" : "#fff"}
            highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
          />
        </div>
        <div className="flex flex-col gap-12 grow w-full lg:w-auto">
          <div className="flex items-center gap-3 justify-between flex-wrap">
            <Skeleton
              width={150}
              baseColor={isDarkMode ? "#000" : "#fff"}
              highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
            />
          </div>
          <div className="flex  justify-center gap-12 sm:gap-3 sm:items-center sm:justify-between sm:w-3/4">
            <Skeleton
              width={40}
              baseColor={isDarkMode ? "#000" : "#fff"}
              highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
            />
            <Skeleton
              width={40}
              baseColor={isDarkMode ? "#000" : "#fff"}
              highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
            />
            <Skeleton
              width={40}
              baseColor={isDarkMode ? "#000" : "#fff"}
              highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
            />
          </div>
          <div className="py-2">
            <Skeleton
              width={350}
              baseColor={isDarkMode ? "#000" : "#fff"}
              highlightColor={isDarkMode ? "#111" : "#f6f6f6"}
            />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};
