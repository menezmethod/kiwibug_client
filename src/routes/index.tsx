import { useRoutes } from 'react-router-dom';

// import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import App from '@/App';
import { Dashboard } from '@/features/misc/routes/Dashboard';
import { Users } from '@/features/users/routes/Users';

export const AppRoutes = () => {
  // const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <Dashboard /> }];

  // const routes = auth.user ? protectedRoutes : publicRoutes;
  const routes = protectedRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};