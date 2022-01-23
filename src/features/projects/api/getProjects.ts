import { axios } from '@/lib/axios';
import { useQuery } from 'react-query';
import { Project } from '../types';

export const getProjects = (): Promise<Project> => {
  return axios.get(`/projects`);
};

export const useProjects = () => {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });
};
