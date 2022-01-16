import { useQuery } from 'react-query';

import { axios } from '@/lib/axios';

import { User } from '../types';

export const getUsers = (): Promise<User> => {
  return axios.get(`/users`);
};

export const useUsers = () => {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => getUsers(),
  });
};
