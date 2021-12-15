import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Box } from '@mui/material';
import { lazyImport } from '@/utils/lazyimports';

const { Dashboard } = lazyImport(() => import('@/features/misc'), 'Dashboard');
const { ProjectsRoutes } = lazyImport(() => import('@/features/projects'), 'ProjectsRoutes');
const { IssuesRoutes } = lazyImport(() => import('@/features/issues'), 'IssuesRoutes');
const { Users } = lazyImport(() => import('@/features/users'), 'Users');

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
    path: '/app',
    element: <App />,
    children: [
      { path: '/projects/*', element: <ProjectsRoutes /> },
      { path: '/users', element: <Users /> },
      { path: '/issues', element: <IssuesRoutes /> },
      { path: '/', element: <Dashboard /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
