import { useSearchBarStore } from "@/store/useSearchBarStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function useSearchBarReset() {
  const pathname = usePathname();
  const { title, setTitle } = useSearchBarStore();
  useEffect(() => {
    if (title && pathname !== "/search") {
      setTitle("");
    }
  }, [pathname, setTitle]);
}
