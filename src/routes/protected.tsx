import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout/MainLayout';
import { Issue } from '@/features/issues/routes/Issue';
import { Issues } from '@/features/issues/routes/Issues';
import { Project } from '@/features/projects/routes/Project';
import { Projects } from '@/features/projects/routes/Projects';
import { Profile } from '@/features/users';
import { lazyImport } from '@/utils/lazyImport';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

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
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
