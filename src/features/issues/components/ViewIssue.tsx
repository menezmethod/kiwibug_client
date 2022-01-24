import LaunchIcon from '@mui/icons-material/Launch';
import {
  Button,
  Container,
  IconButton,
  Paper,
  TableHead,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { useIssue } from '../api/getIssue';
import React, { useEffect } from 'react';
import { formatDateGrid } from '@/utils/format';
import EditIssue from './EditIssue';
import { DeleteIssue } from './DeleteIssue';
import { useNavigate } from 'react-router-dom';
import { useDeleteIssue } from '../api/deleteIssue';

export default function ViewIssue({ issueId }) {
  const issueQuery = useIssue({ issueId });
  const [open, setOpen] = React.useState(false);

  const issueData = issueQuery?.data;

  const theme = useTheme();
  const navigate = useNavigate();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    // setOpen(false);
    return <EditIssue issueId={issueData?.issuesId} show="text" />;
  };

  function createData(name: string, values: any) {
    return { name, values };
  }

  const rows = [
    createData('Summary:', issueData?.issueSummary),
    createData('Description', issueData?.issueDescription),
    createData('Identified Date:', formatDateGrid(issueData?.identifiedDate)),
    createData('Status:', issueData?.status),
    createData('Priority', issueData?.priority),
    createData('Target Resolution Date', formatDateGrid(issueData?.targetResolutionDate)),
    createData('Progress', issueData?.progress),
    createData('Actual Resolution Date', formatDateGrid(issueData?.actualResolutionDate)),
    createData('Identified By:', issueData?.identifiedByEmployeeId?.employeeName),
    createData('Project Name:', issueData?.relatedProjectId?.projectName),
    createData('Assigned To:', issueData?.assignedToEmployeeId?.employeeName),
  ];
  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {rows?.map((row) => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                <strong>{row.name}</strong>
              </TableCell>
              <TableCell>{row.values}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
