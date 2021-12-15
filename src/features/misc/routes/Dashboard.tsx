import { MainLayout } from '@/components/Layout/MainLayout';
import { useAuth } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

export const Dashboard = () => {
  const { user } = useAuth();
  return (
    <MainLayout title="Dashboard">
        This is the dashboard... Charts, stats, etc
    </MainLayout>
  );
};