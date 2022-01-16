import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { Issue } from '../types';

// import { useNotificationStore } from '@/stores/notifications';
export type DeleteIssueDTO = {
  issueId: string;
};

export const deleteIssue = ({ issueId }: DeleteIssueDTO) => {
  return axios.delete(`/issues/${issueId}`);
};

type UseDeleteIssueOptions = {
  config?: MutationConfig<typeof deleteIssue>;
};

export const useDeleteIssue = ({ config }: UseDeleteIssueOptions = {}) => {
  //   const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (deletedIssue) => {
      await queryClient.cancelQueries('issues');

      const previousIssues = queryClient.getQueryData<Issue[]>('issues');

    //   queryClient.setQueryData(
    //     'issues',
    //     previousIssues?.filter((issue) => issue.id !== deletedIssue.issueId)
    //   );
      return { previousIssues };
    },
    onError: (_, __, context: any) => {
      if (context?.previousIssues) {
        queryClient.setQueryData('issues', context.previousIssues);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('issues');
      //   addNotification({
      //     type: 'success',
      //     title: 'Issue Deleted',
      //   });
    },
    ...config,
    mutationFn: deleteIssue,
  });
};
