import { BaseEntity } from '@/types';

export type Project = {
  projectName: string;
  startDate: any;
  targetEndDate: any;
  actualEndDate: any;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  modifiedBy: string;
  data: {
    projectName: string;
    startDate: any;
    targetEndDate: any;
    actualEndDate: any;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
  };
} & BaseEntity;
