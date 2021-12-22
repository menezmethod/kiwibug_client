import { Navigate, Route, Routes } from 'react-router-dom';

import { Issue } from './Issue';
import { Issues } from './Issues';

export const IssuesRoutes = () => {
  return (
    <Routes>
      <Route path="/issue" element={<Issue />} />
      <Route path="issues/:issueId" element={<Issues />} />
      <Route path="*" element={<Navigate to="." />} />
    </Routes>
  );
};
