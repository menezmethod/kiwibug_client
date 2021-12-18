import { useMutation } from 'react-query';

import axios from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
// import { useNotificationStore } from '@/stores/notifications';

import { Project } from '../types';

export type EditProjectDTO = {
  data: {
    projectName: any;
    startDate: any;
    targetEndDate: any;
    actualEndDate: any;
  };
  projectId: string;
};

export const editProject = ({ data, projectId }: EditProjectDTO): Promise<Project> => {
  return axios.put(`/projects/${projectId}`, data);
};

type UseEditProjectOptions = {
  config?: MutationConfig<typeof editProject>;
};

export const useEditProject = ({ config }: UseEditProjectOptions = {}) => {
  //   const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (editingProject: any) => {
      await queryClient.cancelQueries(['project', editingProject?.projectId]);

      const previousProject = queryClient.getQueryData<Project>([
        'project',
        editingProject?.projectId,
      ]);

      queryClient.setQueryData(['project', editingProject?.projectId], {
        ...previousProject,
        ...editingProject.data,
        id: editingProject.projectId,
      });

      return { previousProject };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProject) {
        queryClient.setQueryData(['project', context.previousProject.id], context.previousProject);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['projects', data.id]);
      queryClient.invalidateQueries(['project', data.id]);
      //   addNotification({
      //     type: 'success',
      //     title: 'Project Updated',
      //   });
    },
    ...config,
    mutationFn: editProject,
  });
};
