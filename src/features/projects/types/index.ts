import {BaseEntity} from '@/types';

export type Project = {
    projectId?: number;
    projectName?: string;
    startDate?: string;
    targetEndDate?: string;
    actualEndDate?: any;
    createdOn?: string;
    createdBy?: string;
    modifiedOn?: string;
    modifiedBy?: string;
    map: any;
    length: number;
    filter: any;
} & BaseEntity;
