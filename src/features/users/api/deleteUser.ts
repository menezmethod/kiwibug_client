import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { User } from '../types';

// import { useNotificationStore } from '@/stores/notifications';
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
  //   const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (deletedUser) => {
      await queryClient.cancelQueries('users');

      const previousUsers = queryClient.getQueryData<User[]>('users');

    //   queryClient.setQueryData(
    //     'users',
    //     previousUsers?.filter((user) => user.id !== deletedUser.employeeId)
    //   );
      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('users', context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      //   addNotification({
      //     type: 'success',
      //     title: 'User Deleted',
      //   });
    },
    ...config,
    mutationFn: deleteUser,
  });
};
