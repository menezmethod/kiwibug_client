import { useMutation } from 'react-query';

import  axios  from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
// import { useNotificationStore } from '@/stores/notifications';

import { Project } from '../types';

export type UpdateProjectDTO = {
  data: {
    projectName: any;
    startDate: Date;
    targetEndDate: Date;
    actualEndDate: Date;
  };
  projectId: string;
};

export const updateProject = ({
  data,
  projectId,
}: UpdateProjectDTO): Promise<Project> => {
  return axios.patch(`/project/${projectId}`, data);
};

type UseUpdateProjectOptions = {
  config?: MutationConfig<typeof updateProject>;
};

export const useUpdateProject = ({ config }: UseUpdateProjectOptions = {}) => {
//   const { addNotification } = useNotificationStore();

  return useMutation({
    onMutate: async (updatingProject: any) => {
      await queryClient.cancelQueries(['project', updatingProject?.projectId]);

      const previousProject = queryClient.getQueryData<Project>([
        'project',
        updatingProject?.projectId,
      ]);

      queryClient.setQueryData(['project', updatingProject?.projectId], {
        ...previousProject,
        ...updatingProject.data,
        id: updatingProject.projectId,
      });

      return { previousProject };
    },
    onError: (_, __, context: any) => {
      if (context?.previousProject) {
        queryClient.setQueryData(
          ['project', context.previousProject.id],
          context.previousProject
        );
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['project', data.id]);
    //   addNotification({
    //     type: 'success',
    //     title: 'Project Updated',
    //   });
    },
    ...config,
    mutationFn: updateProject,
  });
};