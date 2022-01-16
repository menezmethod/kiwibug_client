export type AuthUser = {
  data: {
  id: string;
  email: string;
  username: string;
  name: string;
  role: 'ADMIN' | 'USER' | 'LEAD' | 'MANAGER';
}
};

export type UserResponse = {
  data: {
    accessToken: string;
  };
  user: AuthUser;
};
