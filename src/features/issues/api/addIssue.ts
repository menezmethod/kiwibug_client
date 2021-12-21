import { useMutation } from 'react-query';

import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
// import { useNotificationStore } from '@/stores/notifications';

import { Issue } from '../types';

export type AddIssueDTO = {
  data: {
    issueId: string;
    employeeId: string;
    issueSummary: string;
    issueDescription: string;
    identifiedDate: Date;
    status: 'OPEN' | 'ONHOLD' | 'CLOSED';
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
};

export const addIssue = ({ data }: AddIssueDTO): Promise<Issue> => {
  return axios.post(`/issues`, data);
};

type UseAddIssueOptions = {
  config?: MutationConfig<typeof addIssue>;
};

export const useAddIssue = ({ config }: UseAddIssueOptions = {}) => {
  //   const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newIssue) => {
      await queryClient.cancelQueries('issues');

      const previousIssues = queryClient.getQueryData<Issue[]>('issues');

      // queryClient.setQueryData('issues', [...(previousIssues || []), newIssue.data]);

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
      //     title: 'Issue Created',
      //   });
    },
    ...config,
    mutationFn: addIssue,
  });
};
