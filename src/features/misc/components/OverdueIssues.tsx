import { formatDateGrid } from '@/utils/format';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Card, CardHeader, createTheme, Divider, IconButton, Paper, Tooltip } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';

type OverdueIssuesProps = {
  data: any;
};

export default function OverdueIssues({ data }: OverdueIssuesProps) {
  return (
    <Card>
      <CardHeader title="Overdue Issues" />
      <Divider />
      <TableContainer component={Paper}>
        <Table aria-label="overdue issues">
          <TableHead>
            <TableRow>
              <TableCell>Assignee</TableCell>
              <TableCell>Target</TableCell>
              <TableCell>Project Name</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Summary</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((row: any) => (
              <TableRow
                key={row?.issueSummary + Math.floor(Math.random() * 100)}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row?.assignedToEmployeeId?.employeeName}
                </TableCell>
                <TableCell>{formatDateGrid(row?.targetResolutionDate)}</TableCell>
                <TableCell>{row?.relatedProjectId?.projectName}</TableCell>
                <TableCell>{row?.priority}</TableCell>
                <TableCell>{row?.issueSummary.trim(30)}</TableCell>

                <TableCell align="right">
                  <Tooltip title="Modify" arrow>
                    <MoreVertIcon fontSize="small" />
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
  );
}
