import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from 'react-query';

import { Issue } from '../types';

// import { useNotificationStore } from '@/stores/notifications';
export type EditIssueDTO = {
  data: {
    issueSummary: string;
    issueDescription: string;
    identifiedDate: Date;
    status: 'OPEN' | 'ONHOLD' |'CLOSED';
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
    targetResolutionDate: Date;
    progress: string;
    actualResolutionDate: Date;
    resolutionSummary: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    employeeName: string;
    projectName: string;
  };
  issueId: string;
};

export const editIssue = ({ data, issueId }: EditIssueDTO): Promise<Issue> => {
  return axios.put(`/issues/${issueId}`, data);
};

type UseEditIssueOptions = {
  config?: MutationConfig<typeof editIssue>;
};

export const useEditIssue = ({ config }: UseEditIssueOptions = {}) => {
  //   const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (editingIssue: any) => {
      await queryClient.cancelQueries(['issue', editingIssue?.issueId]);

      const previousIssue = queryClient.getQueryData<Issue>([
        'issue',
        editingIssue?.issueId,
      ]);

      queryClient.setQueryData(['issue', editingIssue?.issueId], {
        ...previousIssue,
        ...editingIssue.data,
        id: editingIssue.issueId,
      });

      return { previousIssue };
    },
    onError: (_, __, context: any) => {
      if (context?.previousIssue) {
        queryClient.setQueryData(['issue', context.previousIssue.id], context.previousIssue);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['issues', data.id]);
      queryClient.invalidateQueries(['issue', data.id]);
      //   addNotification({
      //     type: 'success',
      //     title: 'Issue Updated',
      //   });
    },
    ...config,
    mutationFn: editIssue,
  });
};
