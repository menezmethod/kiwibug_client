import { useQuery } from 'react-query';

import axios from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { Project } from '../types';

export const getProjects = (): Promise<Project[]> => {
  return axios.get(`/projects`);
};

// const getProjects = () => {
//   return axios.get<Array<Project>>('/projects');
// };

type UseProjectsOptions = {
  config?: QueryConfig<typeof getProjects>;
};

export const useProjects = ({ config }: UseProjectsOptions = {}) => {
  return useQuery({
    ...config,
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
};
