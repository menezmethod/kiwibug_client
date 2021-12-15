import { lazyImport } from '@/utils/lazyimports';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const publicRoutes = [
  {
    path: '/auth/*',
    element: <AuthRoutes />,
  },
];