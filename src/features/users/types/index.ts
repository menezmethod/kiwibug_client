import { BaseEntity } from '@/types';

export type User = {
  employeeName: string;
  employeeEmail: string;
  role: 'ADMIN' | 'MANAGER' | 'LEAD' | 'USER';
  username: string;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  projectName: string;
} & BaseEntity;
