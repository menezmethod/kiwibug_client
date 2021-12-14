import axios from '@/lib/axios';
import { User } from '../types';


const getAll = () => {
  return axios.get<Array<User>>('/employees');
};

const get = (id: any) => {
  return axios.get<User>(`/employees/${id}`);
};

const create = (data: User) => {
  return axios.post<User>('/employees', data);
};

const update = (id: any, data: User) => {
  return axios.put<any>(`/employees/${id}`, data);
};

const assignProjectToEmployee = (employeeId: any, projectId: any, data: User) => {
  return axios.put<any>(`/${employeeId}/projects/${projectId}`, data);
};

const remove = (id: any) => {
  return axios.delete<any>(`/employees/${id}`);
};

const removeAll = () => {
  return axios.delete<any>(`/employees`);
};

const findByTitle = (title: string) => {
  return axios.get<Array<User>>(`/employees?title=${title}`);
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
