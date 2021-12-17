import * as React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import BugReportIcon from '@material-ui/icons/BugReport';
import BarChartIcon from '@material-ui/icons/BarChart';
import PeopleIcon from '@material-ui/icons/People';
import AssignmentIcon from '@material-ui/icons/Assignment';

export const mainListItems = (
  <div>
    <ListItem button component="a" href="/">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItem>
    <ListItem button component="a" href="/projects">
      <ListItemIcon>
        <AccountTreeIcon />
      </ListItemIcon>
      <ListItemText primary="Projects" />
    </ListItem>
    <ListItem button component="a" href="/issues">
      <ListItemIcon>
        <BugReportIcon />
      </ListItemIcon>
      <ListItemText primary="Issues" />
    </ListItem>
    {/* <ListItem button component="a" href="/reports">
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Reports" />
    </ListItem> */}
    <ListItem button component="a" href="/users">
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Users" />
    </ListItem>
  </div>
);

export const secondaryListItems = (
  <div>
    <ListSubheader inset>Issues reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current issues" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Unassigned issues" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Performance" />
    </ListItem>
  </div>
);