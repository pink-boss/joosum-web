const QUERY_KEYS = {
  linkList: {
    all: ["linkList"] as const,
    byLinkBookId: (linkBookId: string) =>
      [...QUERY_KEYS.linkList.all, linkBookId] as const,
  },
};

export const getLinkListQueryKey = (linkBookId?: string) =>
  linkBookId
    ? QUERY_KEYS.linkList.byLinkBookId(linkBookId)
    : QUERY_KEYS.linkList.all;
