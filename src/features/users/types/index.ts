import { BaseEntity } from '@/types';

export type User = {
  employeeName: string;
  email: string;
  roles: any;
  username: string;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  projectName: string;
  name: string;
  assignedProjects: any;
  map: any;
} & BaseEntity;
