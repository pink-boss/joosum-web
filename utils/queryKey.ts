const QUERY_KEYS = {
  linkList: {
    all: ["linkList"],
    byLinkBookId: (linkBookId: string) => ["linkList", linkBookId],
  },
};

export const getLinkListQueryKey = (linkBookId?: string) =>
  linkBookId
    ? QUERY_KEYS.linkList.byLinkBookId(linkBookId)
    : QUERY_KEYS.linkList.all;
