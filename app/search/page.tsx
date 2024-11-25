"use client";

import { useSearchBarStore } from "@/store/useSearchBarStore";

export default function Search() {
  const { title, setTitle } = useSearchBarStore();
  return <div className="w-full flex-1">Search page</div>;
}
