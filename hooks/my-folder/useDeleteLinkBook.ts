import { useMutation } from "@tanstack/react-query";

import { useOpenDialogStore } from "@/store/useDialogStore";

import useSelectLinkBook from "./useSelectLinkBook";
import useUpdateLinkBookCache from "./useUpdateLinkBookCache";
import { toast } from "@/components/notification/toast";
import { apiCall } from "@/utils/error";

export default function useDeleteLinkBook(onSuccessCallback: () => void) {
  const { key } = useOpenDialogStore();
  const { linkBook } = useSelectLinkBook(key);
  const updateCache = useUpdateLinkBookCache();

  return useMutation<undefined, Error>({
    mutationFn: async () => {
      return apiCall(`/api/link-books/${linkBook?.linkBookId}`, {
        method: "DELETE",
      });
    },
    onSuccess: () => {
      updateCache();
      toast({ status: "success", message: "폴더가 삭제되었습니다." });
      onSuccessCallback();
    },
    onError: (error) => {
      toast({ status: "fail", message: error.message });
    },
  });
}
