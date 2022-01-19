import { BaseEntity } from '@/types';

export type Issue = {
  issueSummary: string;
  issueDescription: string;
  identifiedDate: Date;
  status: 'OPEN' | 'ONHOLD' | 'CLOSED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  targetResolutionDate: Date;
  progress: string;
  actualResolutionDate: Date;
  resolutionSummary: string;
  createdOn: Date;
  createdBy: string;
  modifiedOn: Date;
  employeeName: string;
  projectName: string;
  assignedToEmployeeId: {
    assignedToEmployeeId: bigint;
    employeeName: string;
    employeeId: any;
  };
  identifiedByEmployeeId: {
    identifiedByEmployeeId: bigint;
    employeeName: string;
    employeeId: any;
  };
  relatedProjectId: {
    relatedProjectId: bigint;
    projectName: string;
    projectId: any;
  };
  map: any;
  length: number;
} & BaseEntity;
