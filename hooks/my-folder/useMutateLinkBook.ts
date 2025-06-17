import { useMutation } from "@tanstack/react-query";

import { useOpenDialogStore } from "@/store/useDialogStore";
import { useOpenDrawerStore } from "@/store/useDrawerStore";
import { CreateFormState, LinkBook } from "@/types/linkBook.types";
import { Link } from "@/types/link.types";
import { apiCall } from "@/utils/error";

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
    mode,
  } = useOpenDrawerStore();

  const updateDrawerLink = (result: LinkBook) => {
    if (isLinkDrawerOpen && mode === "mutate") {
      openLinkDrawer(true, "mutate", {
        ...drawerLink,
        linkBookId: result.linkBookId,
        linkBookName: result.title,
        updatedAt: new Date().toISOString(),
      } as Link);
    }

    if (isLinkDrawerOpen && mode === "save") {
      openLinkDrawer(true, "save", {
        linkBookId: result.linkBookId,
        linkBookName: result.title,
      } as Link);
    }
  };

  const pathname = linkBook
    ? `/api/link-books/${linkBook.linkBookId}`
    : "/api/link-books";

  return useMutation<LinkBook, Error, CreateFormState>({
    mutationFn: async (state) => {
      return apiCall<LinkBook>(pathname, {
        method: linkBook ? "PUT" : "POST",
        body: JSON.stringify(state),
      });
    },
    onSuccess: (result) => {
      updateCache();
      updateDrawerLink(result);
      toast({ status: "success", message: `폴더가 ${TYPE}되었습니다.` });
      onSuccessCallback();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
