export const krDateFormatter = (date: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));

export const dateFormatter = (date: string) =>
  new Intl.DateTimeFormat("ko-KR", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    formatMatcher: "best fit",
  })
    .format(new Date(date))
    .slice(0, -1);
