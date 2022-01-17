import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { setSnackbar } from '@/redux/ducks/snackbar';
import Notifications from '@/redux/Notifications';

import { User } from '../types';

export type AddUserDTO = {
  data: {
    employeeName: string;
    email: string;
    password: string;
    role: 'Admin' | 'User' | 'Lead' | 'Manager';
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
  return useMutation({
    onMutate: async (newUser: AddUserDTO) => {
      await queryClient.cancelQueries('users');

      const previousUsers = queryClient.getQueryData<User[]>('users');

      queryClient.setQueryData('users', [...(previousUsers || []), newUser.data]);

      return { previousUsers };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUsers) {
        queryClient.setQueryData('users', context.previousUsers);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries('users');
      Notifications.dispatch(setSnackbar(true, 'success', 'User Created'));
    },
    mutationFn: addUser,
  });
};
