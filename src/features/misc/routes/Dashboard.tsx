import { ContentLayout } from '@/components/Layout/ContentLayout';
import { MainLayout } from '@/components/Layout/MainLayout';
// import { useAuth } from '@/lib/auth';
import { ROLES } from '@/lib/authorization';

export const Dashboard = () => {
  // const { user } = useAuth();
  return (
    <ContentLayout title="Dashboard">
        This is the dashboard... Charts, stats, etc
    </ContentLayout>
  );
};