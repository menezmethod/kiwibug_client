import { useNavigate } from 'react-router-dom';

import { useAuth } from '@/lib/auth';

import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <LoginForm onSuccess={() => navigate('/app')} />
  );
};
