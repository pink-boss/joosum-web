import { useMutation, useQueryClient } from '@tanstack/react-query';

import { useGetFolderFromTitle } from '@/services/folder';

import { getLinkListQueryKey } from '@/libs/tanstack-query/query-key';
import { useSearchBarStore, useSearchLinkFilterStore } from '@/libs/zustand/store';
import { toast } from '@/utils/toast';

import { Folder } from '@/types/folder.types';

interface ReassignParams {
  toLinkBookId: Folder['linkBookId'];
  linkIds: string[];
}

interface ReassignResponse {
  toLinkBookId: Folder['linkBookId'];
}

interface BatchResult {
  success: boolean;
  linkId: string;
  error?: any;
}

interface Props {
  onSuccess: () => void;
}

export default function useReassignFolder({ onSuccess }: Props) {
  const queryClient = useQueryClient();

  const { title: searchKeyword } = useSearchBarStore();
  const { folderId: searchFolderId } = useSearchLinkFilterStore();
  const fromFolder = useGetFolderFromTitle();

  return useMutation<ReassignResponse, Error, ReassignParams>({
    mutationFn: async ({ toLinkBookId, linkIds }) => {
      const results: BatchResult[] = [];
      const batchSize = 3;

      for (let i = 0; i < linkIds.length; i += batchSize) {
        const batch = linkIds.slice(i, i + batchSize);
        const batchResults = await Promise.all(
          batch.map(async (linkId) => {
            try {
              const response = await fetch(`/api/links/${linkId}/link-book-id/${toLinkBookId}`, {
                method: 'PUT',
                body: JSON.stringify({
                  linkBookId: toLinkBookId,
                  linkId,
                }),
              });

              if (!response.ok) {
                return { success: false, linkId, error: await response.json() };
              }

              return { success: true, linkId };
            } catch (error) {
              return { success: false, linkId, error };
            }
          }),
        );
        results.push(...batchResults);
      }

      const failedUpdates = results.filter((res) => !res.success);
      if (failedUpdates.length > 0) {
        throw new Error(`${linkIds.length}개 중, ${failedUpdates.length}개의 폴더이동이 실패했습니다.`);
      }

      return { toLinkBookId };
    },
    onSuccess: ({ toLinkBookId }) => {
      queryClient.invalidateQueries({
        queryKey: getLinkListQueryKey(fromFolder?.linkBookId || searchFolderId, searchKeyword),
      });
      queryClient.invalidateQueries({
        queryKey: getLinkListQueryKey(toLinkBookId, searchKeyword),
      });
      toast({ status: 'success', message: '폴더이동이 완료되었습니다.' });
      onSuccess();
    },
    onError: ({ message }) => {
      toast({ status: 'fail', message });
    },
  });
}
