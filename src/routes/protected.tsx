import {MainLayout} from '@/components/Layout/MainLayout';
import LoaderSuspense from '@/components/LoaderSuspense';
import {Issue} from '@/features/issues/routes/Issue';
import {Issues} from '@/features/issues/routes/Issues';
import {Project} from '@/features/projects/routes/Project';
import {Projects} from '@/features/projects/routes/Projects';
import AssignIssues from '@/features/reports/routes/AssignIssues';
import ResolvedByMonth from '@/features/reports/routes/ResolvedByMonth';
import SummaryByProject from '@/features/reports/routes/SummaryByProject';
import TargetDates from '@/features/reports/routes/TargetDates';
import {Profile} from '@/features/users';
import {lazyImport} from '@/utils/lazyImport';
import {Suspense} from 'react';
import {Navigate, Outlet} from 'react-router-dom';

const {Dashboard} = lazyImport({factory: () => import('@/features/misc'), name: 'Dashboard'});
const {Users} = lazyImport({factory: () => import('@/features/users'), name: 'Users'});

const App = () => {
    return (
        <MainLayout title="">
            <Suspense fallback={<LoaderSuspense/>}>
                <Outlet/>
            </Suspense>
        </MainLayout>
    );
};

export const protectedRoutes = [
    {
        path: '/',
        element: <App/>,
        children: [
            // Issues, projects & users
            {path: '/projects', element: <Projects/>},
            {path: '/project', element: <Project/>},
            {path: '/users', element: <Users/>},
            {path: '/profile', element: <Profile/>},
            {path: '/issues', element: <Issues/>},
            {path: '/issue/:id', element: <Issue/>},
            // Reports
            {path: '/reports/assignissues', element: <AssignIssues/>},
            {path: '/reports/resolvedbymonth', element: <ResolvedByMonth/>},
            {path: '/reports/summarybyproject', element: <SummaryByProject/>},
            {path: '/reports/targetdates', element: <TargetDates/>},
            // Dashboard
            {path: '/', element: <Dashboard/>},
            {path: '/', element: <App/>},
            {path: '*', element: <Navigate to="."/>},
        ],
    },
];
