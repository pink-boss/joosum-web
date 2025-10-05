const QUERY_KEYS = {
  linkList: {
    byLinkBookId: (linkBookId: string) => ['linkList', linkBookId], // all | linkBookId 조회
    bySearch: (searchKeyword: string, linkBookId?: string) => ['linkList', 'search', searchKeyword, linkBookId], // search, all |linkBookId 조회
  },
  tags: {
    sortUsed: () => ['tags', 'used'],
    sortCreated: () => ['tags', 'created'],
  },
};

export const getLinkListQueryKey = (linkBookId?: string, searchKeyword?: string) =>
  searchKeyword
    ? QUERY_KEYS.linkList.bySearch(searchKeyword, linkBookId || 'all')
    : QUERY_KEYS.linkList.byLinkBookId(linkBookId || 'all');

export const getTagsQueryKey = (sort: 'created' | 'used') =>
  sort === 'used' ? QUERY_KEYS.tags.sortUsed() : QUERY_KEYS.tags.sortCreated();
