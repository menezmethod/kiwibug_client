import { useNavigate } from 'react-router-dom';
import RegisterForm from '../components/RegisterForm';

export const Register = () => {
  const navigate = useNavigate();

  return (
    <div>
      {/* <RegisterForm onSuccess={() => navigate('/app')} /> */}
    </div>
  );
};
