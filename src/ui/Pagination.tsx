import { useTranslation } from "react-i18next";
import { Button } from "./Button";
import { GrFormPrevious, GrFormNext } from "react-icons/gr";

type PaginationProps = {
  currentPage: number;
  max: number;
  nextPage: () => void;
  previousPage: () => void;
};

export const Pagination = ({
  currentPage,
  max,
  nextPage,
  previousPage,
}: PaginationProps) => {
  const { t } = useTranslation();

  return (
    <div className="py-3 grid grid-cols-3 place-items-center gap-2 border-t border-stone-300 dark:border-stone-50">
      {currentPage === 1 ? null : (
        <Button
          modifier="pagination"
          aria-label={t("pagination.previous")}
          onClick={previousPage}
        >
          <GrFormPrevious
            aria-label={t("pagination.previous")}
            className="text-xl transition duration-300 hover:-translate-x-[1px]"
          />
        </Button>
      )}
      <p className="text-sm text-stone-950 col-start-2 dark:text-stone-50">
        <span className=" font-medium mr-1">{currentPage}</span>/
        <span className=" font-medium ml-1">{max}</span>
      </p>
      {currentPage === max ? null : (
        <div className="col-start-3 flex items-center justify-center">
          <Button
            modifier="pagination"
            aria-label={t("pagination.next")}
            onClick={nextPage}
          >
            <GrFormNext
              aria-label={t("pagination.next")}
              className="text-xl transition duration-300 hover:translate-x-[1px]"
            />
          </Button>
        </div>
      )}
    </div>
  );
};
