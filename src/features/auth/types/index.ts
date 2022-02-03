export type AuthUser = {
    id: string;
    email: string;
    username: string;
    name: string;
    authorities: any;
    role: 'Admin' | 'User' | 'Lead' | 'Manager';
};

export type UserResponse = {
    accessToken: string;
    user: AuthUser;
};
