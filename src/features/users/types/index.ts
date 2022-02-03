import {BaseEntity} from '@/types';

export type User = {
    employeeId?: number;
    employeeName?: string;
    email?: string;
    roles?: Roles[];
    username?: string;
    password?: string;
    createdOn?: string;
    createdBy?: any;
    modifiedOn?: string;
    modifiedBy?: any;
    assignedProjects?: any;
    name: string;
    map: any;
    length: number;
} & BaseEntity;

export type Roles = {
    id?: number;
    name?: string;
}