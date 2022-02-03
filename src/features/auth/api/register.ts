import {axios} from '@/lib/axios';

import {UserResponse} from '../types';

export type RegisterCredentialsDTO = {
    email: string;
    password: string;
    name: string;
    createdOn: Date;
};

export const registerWithEmailAndPassword = (
    data: RegisterCredentialsDTO
): Promise<UserResponse> => {
    return axios.post('/auth/signup', data);
};
