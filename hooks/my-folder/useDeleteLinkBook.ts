import { useMutation } from "@tanstack/react-query";

import { useOpenDialogStore } from "@/store/useDialogStore";

import useSelectLinkBook from "./useSelectLinkBook";
import useUpdateLinkBookCache from "./useUpdateLinkBookCache";
import { toast } from "@/components/notification/toast";

export default function useDeleteLinkBook(onSuccessCallback: () => void) {
  const { key } = useOpenDialogStore();
  const { linkBook } = useSelectLinkBook(key);
  const updateCache = useUpdateLinkBookCache();

  return useMutation<undefined, Error>({
    mutationFn: async () => {
      const result = await fetch(`/api/link-books/${linkBook?.linkBookId}`, {
        method: "DELETE",
      });

      if (!result.ok) {
        throw new Error("링크북 삭제에 실패했습니다.");
      }
    },
    onSuccess: () => {
      updateCache();
      toast({ status: "success", message: "링크북이 삭제되었습니다." });
      onSuccessCallback();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
