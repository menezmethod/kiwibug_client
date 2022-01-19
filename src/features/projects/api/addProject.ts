import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { setSnackbar } from '@/redux/ducks/snackbar';
import NotificationsStore from '@/redux/NotificationsStore';

import { Project } from '../types';

export type AddProjectDTO = {
  data: {
    projectName: any;
    startDate: Date;
    targetEndDate: Date;
    actualEndDate: Date;
  };
};

export const addProject = ({ data }: AddProjectDTO): Promise<Project> => {
  return axios.post(`/projects`, data);
};

type UseAddProjectOptions = {
  config?: MutationConfig<typeof addProject>;
};

export const useAddProject = ({ config }: UseAddProjectOptions = {}) => {
  return useMutation({
    onMutate: async (newProject) => {
      await queryClient.cancelQueries('projects');

      // const previousProjects = queryClient.getQueryData<Project[]>('projects');

      // queryClient.setQueryData('projects', [...(previousProjects || []), newProject.data]);

      // return { previousProjects };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProjects) {
        queryClient.setQueryData('projects', context.previousProjects);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('projects');
      NotificationsStore.dispatch(setSnackbar(true, 'success', 'Project Added'));
    },
    ...config,
    mutationFn: addProject,
  });
};
