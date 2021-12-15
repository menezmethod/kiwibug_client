import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import CircularProgress from '@mui/material/CircularProgress';
import { MainLayout } from '@/components/Layout/MainLayout';
import { Box } from '@mui/material';
import { lazyImport } from '@/utils/lazyimports';

const { Dashboard } = lazyImport({ factory: () => import('@/features/misc'), name: 'Dashboard' });
const { ProjectsRoutes } = lazyImport({ factory: () => import('@/features/projects'), name: 'ProjectsRoutes' });
const { IssuesRoutes } = lazyImport({ factory: () => import('@/features/issues'), name: 'IssuesRoutes' });
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
