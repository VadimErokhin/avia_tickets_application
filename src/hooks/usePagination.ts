import { useCallback, useState } from "react";
import { Flight } from "../types";

const PAGE_LIMIT = 2;

export function usePagination() {
  const [currentPage, setCurrentPage] = useState(0);
  const [visibleResults, setVisibleResults] = useState<Flight[]>(
    [] as Flight[]
  );

  const setFirstPage = function (data: Flight[]) {
    setCurrentPage(1);
    const indexElement = 1 * PAGE_LIMIT - PAGE_LIMIT;

    if (!data) return;

    setVisibleResults(data.slice(indexElement, indexElement + PAGE_LIMIT));
  };

  const handleNextPage = useCallback(
    function (data: Flight[]) {
      const nextPage = currentPage + 1;

      setCurrentPage(nextPage);
      const indexElement = nextPage * PAGE_LIMIT - PAGE_LIMIT;

      if (!data) return;

      setVisibleResults((prev) => [
        ...prev,
        ...data.slice(indexElement, indexElement + PAGE_LIMIT),
      ]);
    },
    [currentPage]
  );

  return {
    visibleResults,
    handleNextPage,
    setFirstPage,
  };
}
