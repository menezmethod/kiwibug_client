import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { setSnackbar } from '@/redux/ducks/snackbar';
import Notifications from '@/redux/Notifications';

import { User } from '../types';

export type DeleteUserDTO = {
  employeeId: string;
};

export const deleteUser = ({ employeeId }: DeleteUserDTO) => {
  return axios.delete(`/users/${employeeId}`);
};

type UseDeleteUserOptions = {
  config?: MutationConfig<typeof deleteUser>;
};

export const useDeleteUser = ({ config }: UseDeleteUserOptions = {}) => {
  return useMutation({
    onMutate: async (deletedUser) => {
      await queryClient.cancelQueries('users');

      const previousUsers = queryClient.getQueryData<User[]>('users');

      queryClient.setQueryData(
        'users',
        previousUsers?.filter((user) => user.id !== deletedUser.employeeId)
      );

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('users', context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      Notifications.dispatch(setSnackbar(true, 'success', 'User Deleted'));
    },
    ...config,
    mutationFn: deleteUser,
  });
};
