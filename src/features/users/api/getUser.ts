import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';
import { QueryConfig } from '@/lib/react-query';

import { User } from '../types';

export const getUser = ({ employeeId }: { employeeId: string }): Promise<User> => {
  return axios.get(`/users/${employeeId}`);
};
type UseUserOptions = {
  employeeId: string;
};

export const useUser = ({ employeeId }: UseUserOptions) => {
  return useQuery({
    queryKey: ['user', employeeId],
    queryFn: () => getUser({ employeeId }),
  });
};
