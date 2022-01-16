import { useNavigate, useRoutes } from 'react-router-dom';

import { LoginForm } from '@/features/auth/components/LoginForm';
import { Dashboard } from '@/features/misc/routes/Dashboard';
import { useAuth } from '@/lib/auth';

import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

export const AppRoutes = () => {
  const navigate = useNavigate();

  const auth = useAuth();

  const commonRoutes = [
    { path: '/', element: <LoginForm onSuccess={() => navigate('/')} /> },
  ];

  const routes = auth.user ? protectedRoutes : publicRoutes;
  // const routes = protectedRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};
