import { ContentLayout } from '@/components/Layout/ContentLayout';
import { useAuth } from '@/lib/auth';
import { formatRoleAuth } from '@/utils/format';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { createTheme, styled, ThemeProvider } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

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
  const role = formatRoleAuth(user?.authorities);

  console.log(role);
  return (
    <ContentLayout title="Dashboard">
      <ThemeProvider theme={theme}>
        <Typography variant="h3">
          Welcome, {user?.name} ({role})
        </Typography>
      </ThemeProvider>
      <br />
      <Grid container spacing={3}>
      <Grid item xs>
          <Item variant="outlined" square>
            Projects
          </Item>
        </Grid>
        <Grid item xs>
          <Item variant="outlined" square>
            Issues
          </Item>
        </Grid>
        <Grid item xs>
          <Item variant="outlined" square>
            Reports
          </Item>
        </Grid>
        <Grid item xs>
          <Item variant="outlined" square>
            Users
          </Item>
        </Grid>
      </Grid>
      <br />
      <Grid container spacing={2} columns={16}>
        <Grid item xs={8}>
          <Item>Overdue Issues</Item>
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
      </Grid>{' '}
      <br />
      <Grid container columns={1}>
        <Grid item xs={6}>
          <Item>Open Issues by Project</Item>
        </Grid>
      </Grid>
    </ContentLayout>
  );
};
