import { AppProvider } from '@/providers/app';
import { AppRoutes } from '@/routes';
import { LoginForm } from './features/auth/components/LoginForm';
import { Register } from './features/auth/routes/Register';

export default function App() {
  return (
    <AppProvider>
      {/* {user ? <AppRoutes /> : <LoginForm onSuccess={() => location.reload()} />}{' '} */}
      <AppRoutes />
    </AppProvider>
  );
}
