import { useMutation } from '@tanstack/react-query';

import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { TQueryThumbnail, TQueryThumbnailArgs } from '@/types/link.types';

export default function useGetLinkThumbnail() {
  return useMutation<ApiError | TQueryThumbnail | undefined, Error, TQueryThumbnailArgs>({
    mutationFn: async (state) => {
      const timeout = 2000;
      return Promise.race<[Promise<ApiError | TQueryThumbnail | undefined>, Promise<ApiError>]>([
        apiCall(`/api/links/thumbnail`, {
          method: 'POST',
          body: JSON.stringify(state),
        }),
        new Promise<ApiError>((_, reject) => setTimeout(() => reject('응답이 없습니다.'), timeout)),
      ]);
    },
    onError: (error) => {
      console.log(error);
      toast({ status: 'fail', message: '썸네일 불러오기를 실패했습니다.' });
    },
  });
}
