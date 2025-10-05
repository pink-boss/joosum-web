import { useMutation } from '@tanstack/react-query';

import { apiCall } from '@/utils/error';
import { toast } from '@/utils/toast';

import { Link } from '@/types/link.types';

import useUpdateLinkCache from './use-update-link-cache';

interface Props {
  link: Link;
}

export default function useUpdateViewCount({ link }: Props) {
  const updateCache = useUpdateLinkCache();

  const mutation = useMutation<undefined, Error>({
    mutationFn: async () => {
      return apiCall(`/api/links/${link.linkId}/read-count`, {
        method: 'PUT',
      });
    },
    onSuccess: () => {
      updateCache();
      window.open(link.url, '_blank');
    },
    onError: (error) => {
      toast({ status: 'fail', message: error.message });
    },
  });

  return mutation;
}
