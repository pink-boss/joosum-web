const QUERY_KEYS = {
  linkList: {
    all: ["linkList"] as const,
    byLinkBookId: (linkBookId: string) => ["linkList", linkBookId] as const,
  },
};

export const getLinkListQueryKey = (linkBookId?: string) =>
  linkBookId
    ? QUERY_KEYS.linkList.byLinkBookId(linkBookId)
    : QUERY_KEYS.linkList.all;
