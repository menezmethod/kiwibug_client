import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { useMutation } from 'react-query';

import { Project } from '../types';

// import { useNotificationStore } from '@/stores/notifications';
export type DeleteProjectDTO = {
  projectId: string;
};

export const deleteProject = ({ projectId }: DeleteProjectDTO) => {
  return axios.delete(`/projects/${projectId}`);
};

type UseDeleteProjectOptions = {
  config?: MutationConfig<typeof deleteProject>;
};

export const useDeleteProject = ({ config }: UseDeleteProjectOptions = {}) => {
  //   const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (deletedProject) => {
      await queryClient.cancelQueries('projects');

      const previousProjects = queryClient.getQueryData<Project[]>('projects');

    //   queryClient.setQueryData(
    //     'projects',
    //     previousProjects?.filter((project) => project.id !== deletedProject.projectId)
    //   );
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
      //     title: 'Project Deleted',
      //   });
    },
    ...config,
    mutationFn: deleteProject,
  });
};
