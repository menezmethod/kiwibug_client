import { default as dayjs } from 'dayjs';

export const formatDate = (date: number) => dayjs(date).format('YYYY-MM-DDTHH:mm');

export const formatDateGrid = (date: number) =>
  dayjs(date).subtract(1, 'day').format('MMMM D, YYYY');

// Looks up role and if it finds it, returns the formatted name of the role for forms.
export const formatRoleForm = (role: any[]) => {
  if (role.some((newRole) => newRole.name === 'ROLE_ADMIN')) {
    return 'admin';
  } else if (role.some((newRole) => newRole.name === 'ROLE_MANAGER')) {
    return 'manager';
  } else if (role.some((newRole) => newRole.name === 'ROLE_LEAD')) {
    return 'lead';
  } else {
    return 'user';
  }
};
// Looks up role and if it finds it, returns the formatted name of the role
export const formatRole = (role: any[]) => {
  if (role.some((newRole) => newRole.name === 'ROLE_ADMIN')) {
    return 'Administrator';
  } else if (role.some((newRole) => newRole.name === 'ROLE_MANAGER')) {
    return 'Manager';
  } else if (role.some((newRole) => newRole.name === 'ROLE_LEAD')) {
    return 'Lead';
  } else {
    return 'User';
  }
};
export const formatRoleAuth = (role: any[]) => {
  if (role.some((newRole) => newRole.authority === 'ROLE_ADMIN')) {
    return 'Admin';
  } else if (role.some((newRole) => newRole.authority === 'ROLE_MANAGER')) {
    return 'Manager';
  } else if (role.some((newRole) => newRole.authority === 'ROLE_LEAD')) {
    return 'Lead';
  } else {
    return 'User';
  }
};
