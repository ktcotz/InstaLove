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
  return (
    <div className="py-3 grid grid-cols-3 place-items-center gap-2 border-t border-stone-300">
      {currentPage === 1 ? null : (
        <Button
          modifier="pagination"
          aria-label="Previous page"
          onClick={previousPage}
        >
          <GrFormPrevious
            aria-label="Previous page"
            className="text-xl transition duration-300 hover:-translate-x-[1px]"
          />
        </Button>
      )}
      <p className="text-sm text-stone-950 col-start-2">
        {currentPage}/{max}
      </p>
      {currentPage === max ? null : (
        <div className="col-start-3">
          <Button
            modifier="pagination"
            aria-label="Next page"
            onClick={nextPage}
          >
            <GrFormNext
              aria-label="Next page"
              className="text-xl transition duration-300 hover:translate-x-[1px]"
            />
          </Button>
        </div>
      )}
    </div>
  );
};
