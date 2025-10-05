import { useCallback, useMemo, useState } from 'react';

interface Props {
  items: any[];
  itemsPerPage?: number;
}

export default function usePagination({ items, itemsPerPage = 30 }: Props) {
  const [currentPage, setCurrentPage] = useState(1);

  const { currentItems, totalPages, hasNextPage } = useMemo(() => {
    const totalPages = Math.ceil(items.length / itemsPerPage);
    const hasNextPage = currentPage < totalPages;

    return { totalPages, hasNextPage, currentItems: items.slice(0, currentPage * itemsPerPage) };
  }, [items, currentPage, itemsPerPage]);

  const loadNextPage = useCallback(() => {
    if (hasNextPage) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [hasNextPage]);

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
