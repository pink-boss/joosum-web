import { useState, useMemo, useCallback } from "react";

interface UsePaginationProps {
  items: any[];
  itemsPerPage?: number;
}

interface UsePaginationReturn {
  currentItems: any[];
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  loadNextPage: () => void;
  resetPagination: () => void;
  totalItems: number;
  itemsPerPage: number;
}

export function usePagination({
  items,
  itemsPerPage = 30,
}: UsePaginationProps): UsePaginationReturn {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const hasNextPage = currentPage < totalPages;

  const currentItems = useMemo(() => {
    return items.slice(0, currentPage * itemsPerPage);
  }, [items, currentPage, itemsPerPage]);

  const loadNextPage = () => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const resetPagination = useCallback(() => {
    setCurrentPage(1);
  }, [setCurrentPage]);

  return {
    currentItems,
    currentPage,
    totalPages,
    hasNextPage,
    loadNextPage,
    resetPagination,
    totalItems: items.length,
    itemsPerPage,
  };
}
