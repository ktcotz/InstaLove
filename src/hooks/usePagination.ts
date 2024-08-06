import { useState } from "react";

export const usePagination = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const nextPage = (max: number) => {
    if (currentPage === max) return;

    setCurrentPage((prevPage) => prevPage + 1);
  };

  const previousPage = () => {
    if (currentPage === 1) return;

    setCurrentPage((prevPage) => prevPage - 1);
  };

  return { currentPage, nextPage, previousPage } as const;
};
