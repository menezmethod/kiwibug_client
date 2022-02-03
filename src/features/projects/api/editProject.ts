import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';
import {setSnackbar} from '@/redux/models/snackbar';
import createStore from '@/redux/createStore'
import {useMutation} from 'react-query';
import {Project} from '../types';


export type EditProjectDTO = {
    data: {
        projectName: any;
        startDate: Date;
        targetEndDate: Date;
        actualEndDate: Date;
    };
    projectId: string;
};

export const editProject = ({data, projectId}: EditProjectDTO): Promise<Project> => {
    return axios.patch(`/projects/${projectId}`, data);
};

type UseEditProjectOptions = {
    config?: MutationConfig<typeof editProject>;
};

export const useEditProject = ({config}: UseEditProjectOptions = {}) => {
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

            return {previousProject};
        },
        onError: (_, __, context: any) => {
            if (context?.previousProject) {
                queryClient.setQueryData(['project', context.previousProject.id], context.previousProject);
            }
        },
        onSuccess: (data) => {
            queryClient.refetchQueries(['projects', data.id]);
            queryClient.invalidateQueries(['project', data.id]);
            createStore.dispatch(setSnackbar(true, 'success', 'Project Updated'));
        },
        ...config,
        mutationFn: editProject,
    });
};
