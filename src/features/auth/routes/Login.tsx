import { Head } from '@/components/Head/Head';
import { useNavigate } from 'react-router-dom';

import { LoginForm } from '../components/LoginForm';

export const Login = () => {
  const navigate = useNavigate();

  return (
    <>
    <Head title="Sign in" />
    <LoginForm onSuccess={() => navigate('/')} />
    </>
);
};
