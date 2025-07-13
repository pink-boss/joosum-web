const QUERY_KEYS = {
  linkList: {
    byLinkBookId: (linkBookId: string) => ["linkList", linkBookId], // all | linkBookId 조회
    bySearch: (searchKeyword: string, linkBookId?: string) => [
      "linkList",
      "search",
      searchKeyword,
      linkBookId,
    ], // search, all |linkBookId 조회
  },
};

export const getLinkListQueryKey = (
  linkBookId?: string,
  searchKeyword?: string,
) =>
  searchKeyword
    ? QUERY_KEYS.linkList.bySearch(searchKeyword, linkBookId)
    : QUERY_KEYS.linkList.byLinkBookId(linkBookId || "all");
