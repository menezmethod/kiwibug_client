import { ContentLayout } from '@/components/Layout/ContentLayout';
import LoaderSuspense from '@/components/LoaderSuspense';
import { useIssues } from '@/features/issues/api/getIssues';
import { useProjects } from '@/features/projects/api/getProjects';
import { useUsers } from '@/features/users/api/getUsers';
import { useAuth } from '@/lib/auth';
import { isMod } from '@/lib/authorization';
import { formatRoleAuth } from '@/utils/format';
import { Card, CardHeader, Divider } from '@mui/material';
import Badge from '@mui/material/Badge';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import OpenIssuesChart from '../components/OpenIssuesChart';
import OverdueIssues from '../components/OverdueIssues';
import RecentIssues from '../components/RecentIssues';
import UnassignedIssues from '../components/UnassignedIssues';

const TopBoxes = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

export const Dashboard = () => {
  const { user } = useAuth();
  const projectsQuery = useProjects();
  const issuesQuery = useIssues();
  const usersQuery = useUsers();
  const role = formatRoleAuth(user?.authorities);

  let firstName = user?.name.split(' ')[0];

  if (issuesQuery.isLoading || projectsQuery.isLoading || usersQuery.isLoading) {
    return <LoaderSuspense />;
  }

  // Data from React Query / API
  let projectsData = projectsQuery?.data;
  let issuesData = issuesQuery?.data;
  let usersData = usersQuery?.data;

  const overdueIssues = issuesData?.filter(function (a: any) {
    return a.targetResolutionDate <= new Date().toISOString();
  });

  const recentIssues = issuesData?.filter(function (a: any) {
    let today = new Date();
    today.setDate(today.getDate() - 7);
    return a.createdOn >= today.toISOString();
  });

  const unassignedIssues = issuesData?.filter(function (a: any) {
    return a.assignedToEmployeeId?.employeeName == null;
  });

  // Chart Data
  let pieChartData: { name: string; value: number }[] = [];

  let totalIssues = issuesData?.length ?? 1;

  const pieArray: any[] = [];

  const countOccurrences = (arr: any[], val: any) =>
    arr.reduce((a, v) => (v === val ? a + 1 : a), 0);

  issuesData?.map((obj: any) => {
    pieArray.push(obj?.relatedProjectId?.projectName);
    return obj?.relatedProjectId?.projectName;
  });

  projectsData?.map((obj: any) => {
    let pieLoad = {
      name: obj.projectName,
      value: Math.round((countOccurrences(pieArray, obj.projectName) / totalIssues) * 100),
    };
    pieChartData.push(pieLoad);
    return (countOccurrences(pieArray, obj.projectName) / totalIssues) * 100;
  });
  // console.log(pieChartData);

  return (
    <ContentLayout title="Dashboard">
      <Container maxWidth={false}>
        <Typography variant="h4" component="h4" gutterBottom>
          Welcome, {firstName} ({role})
        </Typography>
        <Grid container direction="row" justifyContent="center" alignItems="stretch" spacing={3}>
          <Grid item xs={12} md={3}>
            <Link to="projects" style={{ textDecoration: 'none' }}>
              <TopBoxes variant="outlined">
                <Badge sx={{ width: '100%' }} color="primary" badgeContent={projectsData?.length}>
                  <Typography variant="h6">Projects</Typography>
                </Badge>
              </TopBoxes>
            </Link>
          </Grid>
          <Grid item xs={12} md={3}>
            <Link to="issues" style={{ textDecoration: 'none' }}>
              <TopBoxes variant="outlined">
                <Badge sx={{ width: '100%' }} color="primary" badgeContent={issuesData?.length}>
                  <Typography variant="h6">Issues</Typography>
                </Badge>
              </TopBoxes>
            </Link>
          </Grid>
          {isMod(role) ? (
            <Grid item xs={12} md={3}>
              <Link to="users" style={{ textDecoration: 'none' }}>
                <TopBoxes variant="outlined">
                  <Badge sx={{ width: '100%' }} color="primary" badgeContent={usersData?.length}>
                    <Typography variant="h6">Users</Typography>
                  </Badge>
                </TopBoxes>
              </Link>
            </Grid>
          ) : (
            ''
          )}
          <Grid item xs={12} md={3}>
            <Link to="reports" style={{ textDecoration: 'none' }}>
              <TopBoxes variant="outlined">
                <Typography variant="h6">Reports</Typography>
              </TopBoxes>
            </Link>
          </Grid>
          <Grid item xs={12} md={6}>
            <OverdueIssues data={overdueIssues} />
          </Grid>
          <Grid item xs={12} md={6}>
            <UnassignedIssues data={unassignedIssues} />
          </Grid>
          <br />
          <Grid item xs={12} md={8}>
            <RecentIssues data={recentIssues} />
          </Grid>
          <Grid item xs={12} md={4}>
            <Card style={{ backgroundColor: '#1976d2', color: 'white' }}>
              <CardHeader title="Open Issues by Project" />
              <Divider />
              <TopBoxes sx={{ width: '100%' }}>
                <OpenIssuesChart data={pieChartData} />
              </TopBoxes>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ContentLayout>
  );
};
