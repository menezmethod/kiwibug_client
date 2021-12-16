import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('yyyy-MM-dd HH:mm:ss');
export const formatDataGridDate = (date: number) => dayjs(date).format('MMMM DD, YYYY');
export const formatStartDate = (date: number) => dayjs(date).format('MMMM DD, YYYY');
export const formatTargetEndDate = (date: number) => dayjs(date).format('MMMM DD, YYYY');
export const formatActualEndDate = (date: number) => dayjs(date).format('MMMM DD, YYYY');