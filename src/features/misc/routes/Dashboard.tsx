import { Link } from 'react-router-dom';

import { ContentLayout } from '@/components/Layout/ContentLayout';
import { useIssues } from '@/features/issues/api/getIssues';
import { useProjects } from '@/features/projects/api/getProjects';
import { useUsers } from '@/features/users/api/getUsers';
import { useAuth } from '@/lib/auth';
import { isMod } from '@/lib/authorization';
import { formatDateGrid, formatRoleAuth } from '@/utils/format';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body1,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const theme = createTheme();

theme.typography.h3 = {
  marginTop: -20,
  fontSize: '0.5rem',
  '@media (min-width:600px)': {
    fontSize: '.8rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1.5rem',
  },
};

export const Dashboard = () => {
  const { user } = useAuth();
  const projectsQuery = useProjects();
  const issuesQuery = useIssues();
  const usersQuery = useUsers();
  const role = formatRoleAuth(user?.authorities);

  let firstName = user?.name.split(' ')[0];

  let projectsData = projectsQuery?.data;
  let issuesData = issuesQuery?.data;
  let usersData = usersQuery?.data;

  const overdueIssues = issuesData?.filter(function (a: any) {
    return a.targetResolutionDate <= new Date().toISOString();
  });

  const recentIssues = issuesData?.filter(function (a: any) {
    let today = new Date();
    today.setDate(today.getDate() - 3);
    return a.createdOn >= today.toISOString();
  });

  const unassignedIssues = issuesData?.filter(function (a: any) {
    return a.assignedToEmployeeId?.employeeName == null;
  });

  // Chart Data

  let pieChartData: any = [];
  let totalIssues = issuesData?.length ?? 1;
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  let pieLabel = function (entry: { name: string; value: string }) {
    return entry.name + ': ' + entry.value + '%';
  };

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
    // console.log(pieChartData);
    return (countOccurrences(pieArray, obj.projectName) / totalIssues) * 100;
  });

  return (
    <ContentLayout title="Dashboard">
      <ThemeProvider theme={theme}>
        <Typography variant="h3">
          Welcome, {firstName} ({role})
        </Typography>
      </ThemeProvider>
      <br />
      <Grid container spacing={3}>
        <Grid item xs>
          <Link to="projects" style={{ textDecoration: 'none' }}>
            <Item variant="outlined" square>
              <Badge color="primary" badgeContent={projectsData?.length}>
                <Typography variant="h6">Projects</Typography>
              </Badge>
            </Item>
          </Link>
        </Grid>
        <Grid item xs>
          <Link to="issues" style={{ textDecoration: 'none' }}>
            <Item variant="outlined" square>
              <Badge color="primary" badgeContent={issuesData?.length}>
                <Typography variant="h6">Issues</Typography>
              </Badge>
            </Item>
          </Link>
        </Grid>
        <Grid item xs>
          <Link to="reports" style={{ textDecoration: 'none' }}>
            <Item variant="outlined" square>
              <Typography variant="h6">Reports</Typography>
            </Item>
          </Link>
        </Grid>
        {isMod(role) ? (
          <Grid item xs>
            <Link to="users" style={{ textDecoration: 'none' }}>
              <Item variant="outlined" square>
                <Badge color="primary" badgeContent={usersData?.length}>
                  <Typography variant="h6">Users</Typography>
                </Badge>
              </Item>
            </Link>
          </Grid>
        ) : (
          ''
        )}
      </Grid>
      <br />
      <Grid container columns={1}>
        <Grid item xs={8}>
          <Item>Overdue Issues</Item>
          <br />
          <Item elevation={0}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Assignee</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Summary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {overdueIssues?.map((row: any) => (
                    <TableRow
                      key={row?.issueSummary}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.assignedToEmployeeId?.employeeName}
                      </TableCell>
                      <TableCell>{formatDateGrid(row?.targetResolutionDate)}</TableCell>
                      <TableCell>{row?.relatedProjectId?.projectName}</TableCell>
                      <TableCell>{row?.priority}</TableCell>
                      <TableCell>{row?.issueSummary.trim(30)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
        <Grid item xs={8}>
          <Item>Unassigned Issues</Item>
          <br />
          <Item elevation={0}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Identified By</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Summary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unassignedIssues?.map((row: any) => (
                    <TableRow
                      key={row?.priority}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.identifiedByEmployeeId?.employeeName}
                      </TableCell>
                      <TableCell>{formatDateGrid(row?.targetResolutionDate)}</TableCell>
                      <TableCell>{row?.relatedProjectId?.projectName}</TableCell>
                      <TableCell>{row?.priority}</TableCell>
                      <TableCell>{row?.issueSummary.trim(30)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
      <br />
      <Grid container columns={1}>
        <Grid item xs={8}>
          <Item>Recent Issues</Item>
          <br />
          <Item elevation={0}>
            <TableContainer component={Paper}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Identified By</TableCell>
                    <TableCell>Target</TableCell>
                    <TableCell>Project Name</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Assigned To</TableCell>
                    <TableCell>Summary</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {recentIssues?.map((row: any) => (
                    <TableRow
                      key={row?.priority}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row?.identifiedByEmployeeId?.employeeName}
                      </TableCell>
                      <TableCell>{formatDateGrid(row?.targetResolutionDate)}</TableCell>
                      <TableCell>{row?.relatedProjectId?.projectName}</TableCell>
                      <TableCell>{row?.priority}</TableCell>
                      <TableCell>{row?.assignedToEmployeeId?.employeeName}</TableCell>
                      <TableCell>{row?.issueSummary.trim(30)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>
      </Grid>
      <br />
      <Grid container columns={1}>
        <Grid item xs={8}>
          <Item>Open Issues by Project</Item>
        </Grid>
        <br />
        <ResponsiveContainer height={300} width="100%">
          <PieChart>
            <Pie
              data={pieChartData}
              isAnimationActive={false}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={pieLabel}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieChartData.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </Grid>
    </ContentLayout>
  );
};
