import { BaseEntity } from '@/types';

export type User = {
  employeeName: string;
  employeeEmail: string;
  employeeRole: 'CEO' | 'MANAGER' | 'LEAD' | 'MEMBER';
  username: string;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  projectName: string;
} & BaseEntity;
