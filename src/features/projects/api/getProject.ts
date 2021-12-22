import { useQuery } from 'react-query';

import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Project } from '../types';

export const getProject = ({ projectId }: { projectId: string }): Promise<Project> => {
  return axios.get(`/projects/${projectId}`);
};
type UseProjectOptions = {
  projectId: string;
};

export const useProject = ({ projectId }: UseProjectOptions) => {
  return useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject({ projectId }),
  });
};
