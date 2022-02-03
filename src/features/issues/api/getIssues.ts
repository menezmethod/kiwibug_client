import {useQuery} from 'react-query';

import {axios} from '@/lib/axios';

import {Issue} from '../types';

export const getIssues = (): Promise<Issue> => {
    return axios.get(`/issues`);
};

export const useIssues = () => {
    return useQuery({
        queryKey: ['issues'],
        queryFn: () => getIssues(),
    });
};
