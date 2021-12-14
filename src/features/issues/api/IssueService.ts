import axios from '@/lib/axios';
import { Issue } from '../types';


const getAll = () => {
  return axios.get<Array<Issue>>('/issues');
};

const get = (id: any) => {
  return axios.get<Issue>(`/issues/${id}`);
};

const create = (data: Issue) => {
  return axios.post<Issue>('/issues', data);
};

const update = (id: any, data: Issue) => {
  return axios.put<any>(`/issues/${id}`, data);
};

const remove = (id: any) => {
  return axios.delete<any>(`/issues/${id}`);
};

const removeAll = () => {
  return axios.delete<any>(`/issues`);
};

const findByTitle = (title: string) => {
  return axios.get<Array<Issue>>(`/issues?title=${title}`);
};

const IssueService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default IssueService;
