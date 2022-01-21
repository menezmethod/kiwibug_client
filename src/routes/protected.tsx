import { Suspense } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

import { MainLayout } from '@/components/Layout/MainLayout';
import { Issue } from '@/features/issues/routes/Issue';
import { Issues } from '@/features/issues/routes/Issues';
import { Project } from '@/features/projects/routes/Project';
import { Projects } from '@/features/projects/routes/Projects';
import AssignIssues from '@/features/reports/routes/AssignIssues';
import AvgDaysToResolve from '@/features/reports/routes/AvgDaysToResolve';
import ResolvedByMonth from '@/features/reports/routes/ResolvedByMonth';
import SummaryByProject from '@/features/reports/routes/SummaryByProject';
import TargetDates from '@/features/reports/routes/TargetDates';
import { Profile } from '@/features/users';
import { lazyImport } from '@/utils/lazyImport';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

const { Dashboard } = lazyImport({ factory: () => import('@/features/misc'), name: 'Dashboard' });
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
      // Issues, projects & users
      { path: '/projects', element: <Projects /> },
      { path: '/project', element: <Project /> },
      { path: '/users', element: <Users /> },
      { path: '/profile', element: <Profile /> },
      { path: '/issues', element: <Issues /> },
      { path: '/issue', element: <Issue /> },
      // Reports
      { path: '/reports/assignissues', element: <AssignIssues /> },
      { path: '/reports/avgdaystoresolve', element: <AvgDaysToResolve /> },
      { path: '/reports/resolvedbymonth', element: <ResolvedByMonth /> },
      { path: '/reports/summarybyproject', element: <SummaryByProject /> },
      { path: '/reports/targetdates', element: <TargetDates /> },
      // Dashboard
      { path: '/', element: <Dashboard /> },
      { path: '/', element: <App /> },
      { path: '*', element: <Navigate to="." /> },
    ],
  },
];
