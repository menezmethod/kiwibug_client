import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('yyyy-MM-dd HH:mm:ss');
export const formatRoleForm = (role: any[]) => {
    if (role.some((roleF: { name: string }) => roleF.name === 'ROLE_ADMIN')) {
        return 'admin';
      } else if (role.some((roleF: { name: string }) => roleF.name === 'ROLE_MANAGER')) {
        return 'manager';
      } else if (role.some((roleF: { name: string }) => roleF.name === 'ROLE_LEAD')) {
        return 'lead';
      } else {
        return 'user';
      }
};
export const formatRoleGrid = (role: any[]) => {
  if (role.some((roleF: { name: string }) => roleF.name === 'ROLE_ADMIN')) {
    return 'Administrator';
  } else if (role.some((roleF: { name: string }) => roleF.name === 'ROLE_MANAGER')) {
    return 'Manager';
  } else if (role.some((roleF: { name: string }) => roleF.name === 'ROLE_LEAD')) {
    return 'Lead';
  } else {
    return 'User';
  }
};
