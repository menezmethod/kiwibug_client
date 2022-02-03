import {BaseEntity} from '@/types';

export type Project = {
    projectName: string;
    startDate: Date;
    targetEndDate: Date;
    actualEndDate: Date;
    createdOn: Date;
    createdBy: string;
    modifiedOn: Date;
    modifiedBy: string;
    map: any;
    length: number;
    filter: any;
} & BaseEntity;
