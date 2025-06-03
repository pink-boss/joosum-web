import { useMutation } from "@tanstack/react-query";

import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { CreateFormState, LinkBook } from "@/types/linkBook.types";

import useSelectLinkBook from "./useSelectLinkBook";
import useUpdateLinkBookCache from "./useUpdateLinkBookCache";
import { toast } from "@/components/notification/toast";

export default function useMutateLinkBook(onSuccessCallback: () => void) {
  const { key } = useOpenDialogStore();
  const { linkBook } = useSelectLinkBook(key);
  const updateCache = useUpdateLinkBookCache();
  const TYPE = linkBook ? "수정" : "생성";

  const {
    link: drawerLink,
    isLinkDrawerOpen,
    openLinkDrawer,
  } = useOpenDrawerStore();

  const updateDrawerLink = (result: LinkBook) => {
    if (isLinkDrawerOpen) {
      openLinkDrawer(true, {
        ...drawerLink,
        linkBookId: result.linkBookId,
        linkBookName: result.title,
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const pathname = linkBook
    ? `/api/link-books/${linkBook.linkBookId}`
    : "/api/link-books";

  return useMutation<LinkBook, Error, CreateFormState>({
    mutationFn: async (state) => {
      const result = await fetch(pathname, {
        method: linkBook ? "PUT" : "POST",
        body: JSON.stringify(state),
      });

      if (!result.ok) {
        throw new Error(`링크북 ${TYPE}에 실패했습니다.`);
      }

      return result.json();
    },
    onSuccess: (result) => {
      updateCache();
      updateDrawerLink(result);
      toast({ status: "success", message: `링크북이 ${TYPE}되었습니다.` });
      onSuccessCallback();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
