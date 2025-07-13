import { useSearchLinkFilterStore } from "@/store/link-filter/useSearchStore";
import { useSearchBarStore } from "@/store/useSearchBarStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useSearchBarReset() {
  const pathname = usePathname();
  const { title, setTitle } = useSearchBarStore();
  const { setLinkBookId } = useSearchLinkFilterStore();
  useEffect(() => {
    if (title && pathname !== "/search") {
      setTitle("");
      setLinkBookId("all");
    }
  }, [pathname, setTitle, setLinkBookId]);
}
