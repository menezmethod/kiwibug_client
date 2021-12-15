import { useRoutes } from 'react-router-dom';

import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';
import App from '@/App';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <App /> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};