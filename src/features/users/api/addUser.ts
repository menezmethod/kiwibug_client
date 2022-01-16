import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';

import { User } from '../types';

// import { useNotificationStore } from '@/stores/notifications';
export type AddUserDTO = {
  data: {
    employeeName: string;
    email: string;
    password: string;
    role: 'ADMIN' | 'MANAGER' | 'LEAD' | 'USER';
    username: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    projectName: string;
  };
};

export const addUser = ({ data }: AddUserDTO): Promise<User> => {
  return axios.post(`/auth/signup`, data);
};

type UseAddUserOptions = {
  config?: MutationConfig<typeof addUser>;
};

export const useAddUser = ({ config }: UseAddUserOptions = {}) => {
  //   const { addNotification } = useNotificationStore();
  return useMutation({
    onMutate: async (newUser) => {
      await queryClient.cancelQueries('users');

      const previousUsers = queryClient.getQueryData<User[]>('users');

      // queryClient.setQueryData('users', [...(previousUsers || []), newUser.data]);

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
      //     title: 'User Created',
      //   });
    },
    ...config,
    mutationFn: addUser,
  });
};
