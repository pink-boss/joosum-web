import { Link } from "@/types/link.types";

export function sortByKeywordPosition(items: Link[], keyword: string): Link[] {
  return [...items].sort((a, b) => {
    const score = (text: string) => {
      const lowerText = text.toLowerCase();
      const lowerKeyword = keyword.toLowerCase();
      const index = lowerText.indexOf(lowerKeyword);
      const matchRatio = lowerKeyword.length / lowerText.length;
      return index === -1 ? Infinity : index - matchRatio;
    };

    return score(a.title) - score(b.title);
  });
}
