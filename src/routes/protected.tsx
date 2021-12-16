import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Box } from '@mui/material';
import { lazyImport } from '@/utils/lazyImport';
import { Projects } from '@/features/projects/routes/Projects';
import { Issues } from '@/features/issues/routes/Issues';
import { Project } from '@/features/projects/routes/Project';
import { Issue } from '@/features/issues/routes/Issue';
import { Profile } from '@/features/users';
import { AddIssue } from '@/features/issues/routes/AddIssue';
import { EditIssue } from '@/features/issues/routes/EditIssue';

const { Dashboard } = lazyImport({ factory: () => import('@/features/misc'), name: 'Dashboard' });
const { ProjectsRoutes } = lazyImport({
  factory: () => import('@/features/projects'),
  name: 'ProjectsRoutes',
});
const { IssuesRoutes } = lazyImport({
  factory: () => import('@/features/issues'),
  name: 'IssuesRoutes',
});
const { Users } = lazyImport({ factory: () => import('@/features/users'), name: 'Users' });

const App = () => {
  return (
    <MainLayout title="">
      <Suspense
        fallback={
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
    path: '/',
    element: <App />,
    children: [
      { path: '/projects', element: <Projects /> },
      { path: '/project', element: <Project /> },
      { path: '/users', element: <Users /> },
      { path: '/profile', element: <Profile /> },
      { path: '/issues', element: <Issues /> },
      { path: '/issue', element: <Issue /> },
      { path: '/issue/edit', element: <EditIssue /> },
      { path: '/issue/add', element: <AddIssue /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
