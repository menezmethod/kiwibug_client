import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

import { Issue } from '../types';

export const getIssue = ({ issueId }: { issueId: string }): Promise<Issue> => {
  return axios.get(`/issues/${issueId}`);
};
type UseIssueOptions = {
  issueId: string;
};

export const useIssue = ({ issueId }: UseIssueOptions) => {
  return useQuery({
    queryKey: ['issue', issueId],
    queryFn: () => getIssue({ issueId }),
  });
};
