import {axios} from '@/lib/axios';
import {MutationConfig, queryClient} from '@/lib/react-query';
import createStore from '@/redux/createStore';
import {setSnackbar} from '@/redux/models/snackbar';
import {useMutation} from 'react-query';

export type DeleteIssueDTO = {
    issueId: string;
};

export const deleteIssue = ({issueId}: DeleteIssueDTO) => {
    return axios.delete(`/issues/${issueId}`);
};

type UseDeleteIssueOptions = {
    config?: MutationConfig<typeof deleteIssue>;
};

export const useDeleteIssue = ({config}: UseDeleteIssueOptions = {}) => {
    return useMutation({
        onMutate: async (deletedIssue) => {
            await queryClient.cancelQueries('issues');

            // const previousIssues = queryClient.getQueryData<Issue[]>('issues');

            // queryClient.setQueryData(
            //   'issues',
            //   previousIssues?.filter((issue) => issue.id !== deletedIssue.issueId)
            // );
            // return { previousIssues };
        },
        onError: (_, __, context: any) => {
            if (context?.previousIssues) {
                queryClient.setQueryData('issues', context.previousIssues);
            }
        },
        onSuccess: () => {
            queryClient.invalidateQueries('issues');
            createStore.dispatch(setSnackbar(true, 'success', 'Issue Deleted'));
        },
        ...config,
        mutationFn: deleteIssue,
    });
};
