import { Navigate, Route, Routes } from 'react-router-dom';

import { Issue } from './Issue';
import { Issues } from './Issues';

export const IssuesRoutes = () => {
  return (
    <Routes>
      <Route path="" element={<Issues />} />
      <Route path=":issueId" element={<Issue />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
