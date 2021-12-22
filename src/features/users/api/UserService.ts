import axios from '@/lib/axios';

import { User } from '../types';

const getAll = () => {
  return axios.get<Array<User>>('/users');
};

const get = (id: any) => {
  return axios.get<User>(`/users/${id}`);
};

const create = (data: User) => {
  return axios.post<User>('/users', data);
};

const update = (id: any, data: User) => {
  return axios.put<any>(`/users/${id}`, data);
};

const assignProjectToEmployee = (employeeId: any, projectId: any, data: User) => {
  return axios.put<any>(`/${employeeId}/projects/${projectId}`, data);
};

const remove = (id: any) => {
  return axios.delete<any>(`/users/${id}`);
};

const removeAll = () => {
  return axios.delete<any>(`/users`);
};

const findByTitle = (title: string) => {
  return axios.get<Array<User>>(`/users?title=${title}`);
};

const UserService = {
  getAll,
  get,
  create,
  update,
  assignProjectToEmployee,
  remove,
  removeAll,
  findByTitle,
};

export default UserService;
