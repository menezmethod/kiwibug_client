import { formatDateGrid } from '@/utils/format';
import LaunchIcon from '@mui/icons-material/Launch';
import { Card, CardHeader, Divider, IconButton, Paper } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
import { useNavigate } from 'react-router-dom';

type RecentIssuesProps = {
  data: any;
};

export default function RecentIssues({ data }: RecentIssuesProps) {
  const navigate = useNavigate();

  return (
    <Card style={{ backgroundColor: '#1976d2', color: 'white' }}>
      <CardHeader title="Recent Issues" />
      <Divider />
      <TableContainer component={Paper}>
        <Table aria-label="recent issues">
          <TableHead sx={{ borderRadius: 0, textTransform: 'uppercase', fontWeight: 100 }}>
            <TableRow>
              <TableCell>Identified By</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Assigned To</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow
                key={row?.issuesId}
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
                <TableCell align="right" color="primary">
                  <IconButton
                    color="primary"
                    aria-label="view issue"
                    component="span"
                    onClick={() => navigate('/issue/' + row.issuesId)}
                  >
                    <LaunchIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
