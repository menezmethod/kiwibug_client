import { useMutation } from 'react-query';

import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
// import { useNotificationStore } from '@/stores/notifications';

import { Project } from '../types';

export type CreateProjectDTO = {
  data: {
    projectName: any;
    startDate: Date;
    targetEndDate: Date;
    actualEndDate: Date;
  };
};

export const createProject = ({ data }: CreateProjectDTO): Promise<Project> => {
  return axios.post(`/projects`, data);
};

type UseCreateProjectOptions = {
  config?: MutationConfig<typeof createProject>;
};

export const useCreateProject = ({ config }: UseCreateProjectOptions = {}) => {
//   const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newProject) => {
      await queryClient.cancelQueries('projects');

      const previousProjects = queryClient.getQueryData<Project[]>('projects');

      queryClient.setQueryData('projects', [...(previousProjects || []), newProject.data]);

      return { previousProjects };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProjects) {
        queryClient.setQueryData('projects', context.previousProjects);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
    //   addNotification({
    //     type: 'success',
    //     title: 'Project Created',
    //   });
    },
    ...config,
    mutationFn: createProject,
  });
};