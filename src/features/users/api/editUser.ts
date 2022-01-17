import { useMutation } from 'react-query';

import { axios } from '@/lib/axios';
import { MutationConfig, queryClient } from '@/lib/react-query';
import { setSnackbar } from '@/redux/ducks/snackbar';
import Notifications from '@/redux/Notifications';

import { User } from '../types';

export type EditUserDTO = {
  data: {
    userName: any;
    startDate: Date;
    targetEndDate: Date;
    actualEndDate: Date;
  };
  employeeId: string;
};

export const editUser = ({ data, employeeId }: EditUserDTO): Promise<User> => {
  return axios.patch(`/users/${employeeId}`, data);
};

type UseEditUserOptions = {
  config?: MutationConfig<typeof editUser>;
};

export const useEditUser = ({ config }: UseEditUserOptions = {}) => {
  return useMutation({
    onMutate: async (editingUser: any) => {
      await queryClient.cancelQueries(['user', editingUser?.employeeId]);

      const previousUser = queryClient.getQueryData<User>(['user', editingUser?.employeeId]);

      queryClient.setQueryData(['user', editingUser?.employeeId], {
        ...previousUser,
        ...editingUser.data,
        id: editingUser.employeeId,
      });

      return { previousUser };
    },
    onError: (_, __, context: any) => {
      if (context?.previousUser) {
        queryClient.setQueryData(['user', context.previousUser.id], context.previousUser);
      }
    },
    onSuccess: (data) => {
      queryClient.refetchQueries(['users', data.id]);
      queryClient.invalidateQueries(['user', data.id]);
      Notifications.dispatch(setSnackbar(true, 'success', 'User Updated'));
    },
    ...config,
    mutationFn: editUser,
  });
};
