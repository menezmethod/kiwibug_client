import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('yyyy-MM-dd HH:mm:ss');