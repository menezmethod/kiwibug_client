import { ContentLayout } from '@/components/Layout/ContentLayout';
import { useAuth } from '@/lib/auth';
import { isMod } from '@/lib/authorization';
import { formatRoleAuth } from '@/utils/format';
import Badge from '@mui/material/Badge';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useIssues } from '@/features/issues/api/getIssues';
import { useUsers } from '@/features/users/api/getUsers';
import { useProjects } from '@/features/projects/api/getProjects';
import { Link } from 'react-router-dom';

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

function createData(
  name: string,
  target: string,
  projectName: string,
  priority: string,
  summary: string
) {
  return { name, target, projectName, priority, summary };
}

const rows = [
  createData(
    'Luis Gimenez',
    'January 17, 2022',
    'Kiwi',
    'Low',
    "I'm trying to have two separate lines of text within one cell, where one line of text is on top of the other, in Material-UI's datagrid ..."
  ),
  createData('Kiwi Husk', 'December 14, 2021', 'Kiwi', '24', 'fgh'),
  createData('Bobby Johnson', 'January 31, 2022', 'Kiwi', '24', '4gfh'),
  createData('Thomas Baker', 'January 21, 2022', 'Kiwi', '24', 'fgdh'),
  createData('Unassigned', 'January 17, 2022', 'Kiwi', '24', 'dfgh'),
];
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

  return (
    <ContentLayout title="Dashboard">
      <ThemeProvider theme={theme}>
        <Typography variant="h3">
          Welcome, {firstName} ({role})
        </Typography>
        {/* {isMod(role) ? 'This is what all moderators see.' : 'This is what regular user sees.'} */}
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
                  {rows.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell>{row.target}</TableCell>
                      <TableCell>{row.projectName}</TableCell>
                      <TableCell>{row.priority}</TableCell>
                      <TableCell>{row.summary}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Item>
        </Grid>

        <Grid item xs={8}>
          <Item>Unassigned Issues</Item>
        </Grid>
      </Grid>
      <br />
      <Grid container columns={1}>
        <Grid item xs={6}>
          <Item>Recently Opened Issues</Item>
        </Grid>
      </Grid>
      <br />
      <Grid container columns={1}>
        <Grid item xs={6}>
          <Item>Open Issues by Project</Item>
        </Grid>
      </Grid>
    </ContentLayout>
  );
};
