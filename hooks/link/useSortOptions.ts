import { sortOptions } from "@/app/link-book/constants";
import { usePathname } from "next/navigation";

export default function useSortOptions() {
  const pathname = usePathname();

  const relevanceOption = { label: "관련도순", value: "relevance" };
  return pathname.startsWith("/search")
    ? [relevanceOption, ...sortOptions]
    : sortOptions;
}
