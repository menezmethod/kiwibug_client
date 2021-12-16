import { Navigate, Route, Routes } from 'react-router-dom';
import { ProjectsList } from '../components/ProjectsList';

import { Project } from './Project';
import { Projects } from './Projects';

export const ProjectsRoutes = () => {
  return (
    <Routes>
      <Route path="projects" element={<ProjectsList />} />
      <Route path="projects/:issueId" element={<Project />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
