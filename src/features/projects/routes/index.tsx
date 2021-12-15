import { Navigate, Route, Routes } from 'react-router-dom';

import { Project } from './Project';
import { Projects } from './Projects';

export const ProjectsRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Projects />} />
      <Route path=":issueId" element={<Project />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
