import { useRoutes, useNavigate } from 'react-router-dom';

import { publicRoutes } from './public';
import { Dashboard } from '@/features/misc/routes/Dashboard';

import { useAuth } from '@/lib/auth';
import { protectedRoutes } from './protected';
import { LoginForm } from '@/features/auth/components/LoginForm';

// import { Users } from '@/features/users/routes/Users';

export const AppRoutes = () => {
  const auth = useAuth();

  const commonRoutes = [{ path: '/', element: <LoginForm onSuccess={() => navigate('/app')}/> }];

  const routes = auth.user ? protectedRoutes : publicRoutes;
  // const routes = protectedRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};