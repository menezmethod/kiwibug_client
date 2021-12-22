import { BaseEntity } from '@/types';

export type User = {
  employeeName: string;
  email: string;
  role: 'ADMIN' | 'MANAGER' | 'LEAD' | 'USER';
  username: string;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  projectName: string;
  name: string;
  data: {
    employeeName: string;
    email: string;
    roles: 'ADMIN' | 'MANAGER' | 'LEAD' | 'USER' | any;
    username: string;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    projectName: string;
    map: any;
    assignedProjects: any;
  };
} & BaseEntity;
