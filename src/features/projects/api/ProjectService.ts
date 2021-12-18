import axios from '@/lib/axios';
import { Project } from '../types';


const getAll = () => {
  return axios.get<Array<Project>>('/projects');
};

const get = (id: any) => {
  return axios.get<Project>(`/projects/${id}`);
};

const create = (data: Project) => {
  return axios.post<Project>('/projects', data);
};

const update = (id: any, data: Project) => {
  return axios.put<any>(`/projects/${id}`, data);
};

const remove = (id: any) => {
  return axios.delete<any>(`/projects/${id}`);
};

const removeAll = () => {
  return axios.delete<any>(`/projects`);
};

const findByTitle = (title: string) => {
  return axios.get<Array<Project>>(`/projects?title=${title}`);
};

const ProjectService = {
  getAll,
  get,
  create,
  update,
  remove,
  removeAll,
  findByTitle,
};

export default ProjectService;
