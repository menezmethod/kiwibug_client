export type AuthUser = {
    id: string;
    email: string;
    name: string;
    createdOn: Date;
    role: 'ADMIN' | 'USER'| 'LEAD'| 'MANAGER';
  };
  
  export type UserResponse = {
    jwt: string;
    user: AuthUser;
  };