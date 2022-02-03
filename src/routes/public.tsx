import {lazyImport} from '@/utils/lazyImport';

const {AuthRoutes} = lazyImport({factory: () => import('@/features/auth'), name: 'AuthRoutes'});

export const publicRoutes = [
    {
        path: '/auth/*',
        element: <AuthRoutes/>,
    },
];